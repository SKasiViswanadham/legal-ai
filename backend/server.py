from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import tempfile
import hashlib
from passlib.context import CryptContext
import jwt
import json

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = "your-secret-key-change-in-production"

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# AI Integration
from emergentintegrations.llm.chat import LlmChat, UserMessage, FileContentWithMimeType

# Initialize AI chat
def get_ai_chat():
    return LlmChat(
        api_key=os.environ.get('EMERGENT_LLM_KEY'),
        session_id=str(uuid.uuid4()),
        system_message="""You are a legal document analysis expert. Your role is to analyze legal documents and provide clear, actionable insights. You can:

1. CLASSIFY documents (lease, loan, employment, terms of service, etc.)
2. SUMMARIZE complex legal language into plain English
3. EXPLAIN legal terms and clauses clearly
4. EXTRACT and CALCULATE financial information (interest rates, payments, fees)
5. DETECT potential fraud indicators and unusual clauses
6. ASSESS risk levels and flag concerning terms
7. GENERATE reply letters when needed

Always respond in JSON format with structured data. Be thorough but accessible to non-lawyers."""
    ).with_model("gemini", "gemini-2.0-flash")

# Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Document(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    filename: str
    file_type: str
    file_size: int
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    analysis_status: str = "pending"  # pending, analyzing, completed, failed
    
class DocumentAnalysis(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    document_id: str
    document_type: str
    summary: str
    key_terms: List[Dict[str, str]]
    calculations: Optional[Dict[str, Any]] = None
    risk_assessment: Dict[str, Any]
    fraud_indicators: List[str]
    suggested_questions: List[str]
    unusual_clauses: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReplyLetter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    document_id: str
    user_responses: Dict[str, str]
    generated_letter: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Authentication helpers
def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Authentication routes
@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password and create user
    password_hash = pwd_context.hash(user_data.password)
    user = User(email=user_data.email, password_hash=password_hash)
    await db.users.insert_one(user.dict())
    
    # Create token
    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}

@api_router.post("/auth/login")
async def login(user_data: UserLogin):
    # Find user
    user = await db.users.find_one({"email": user_data.email})
    if not user or not pwd_context.verify(user_data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token
    token = create_access_token({"user_id": user["id"]})
    return {"access_token": token, "token_type": "bearer", "user_id": user["id"]}

# Document routes
@api_router.post("/documents/upload")
async def upload_document(
    file: UploadFile = File(...),
    user_id: str = Depends(verify_token)
):
    # Validate file type
    allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    # Save file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=f"_{file.filename}") as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_file_path = temp_file.name
    
    # Create document record
    document = Document(
        user_id=user_id,
        filename=file.filename,
        file_type=file.content_type,
        file_size=len(content)
    )
    await db.documents.insert_one(document.dict())
    
    # Start analysis (in background)
    try:
        await analyze_document(document.id, temp_file_path, file.content_type)
    except Exception as e:
        logging.error(f"Analysis failed: {e}")
        await db.documents.update_one(
            {"id": document.id},
            {"$set": {"analysis_status": "failed"}}
        )
    finally:
        # Clean up temp file
        os.unlink(temp_file_path)
    
    return {"document_id": document.id, "message": "Document uploaded and analysis started"}

async def analyze_document(document_id: str, file_path: str, content_type: str):
    try:
        # Update status to analyzing
        await db.documents.update_one(
            {"id": document_id},
            {"$set": {"analysis_status": "analyzing"}}
        )
        
        # Get AI chat instance
        chat = get_ai_chat()
        
        # Create file content object
        file_content = FileContentWithMimeType(
            file_path=file_path,
            mime_type=content_type
        )
        
        # Analysis prompt
        analysis_prompt = """
        Analyze this legal document comprehensively and return a JSON response with the following structure:
        {
            "document_type": "string (lease, loan, employment, terms_of_service, contract, etc.)",
            "summary": "string (2-3 paragraph plain English summary)",
            "key_terms": [
                {"term": "legal term", "explanation": "plain English explanation"}
            ],
            "calculations": {
                "has_calculations": boolean,
                "financial_details": [
                    {"type": "interest_rate/payment/fee", "amount": "value", "explanation": "description"}
                ]
            },
            "risk_assessment": {
                "overall_risk": "low/medium/high",
                "risk_factors": ["list of risk factors"],
                "recommendations": ["list of recommendations"]
            },
            "fraud_indicators": ["list of potential fraud indicators found"],
            "unusual_clauses": ["list of unusual or concerning clauses"],
            "suggested_questions": ["list of 5-7 questions user might want to ask about this document"]
        }
        
        Focus on making everything accessible to non-lawyers while being thorough and accurate.
        """
        
        # Send message with file
        user_message = UserMessage(
            text=analysis_prompt,
            file_contents=[file_content]
        )
        
        response = await chat.send_message(user_message)
        
        # Parse JSON response
        import json
        try:
            analysis_data = json.loads(response)
        except json.JSONDecodeError:
            # If response isn't valid JSON, create a basic analysis
            analysis_data = {
                "document_type": "unknown",
                "summary": response,
                "key_terms": [],
                "calculations": {"has_calculations": False, "financial_details": []},
                "risk_assessment": {"overall_risk": "medium", "risk_factors": [], "recommendations": []},
                "fraud_indicators": [],
                "unusual_clauses": [],
                "suggested_questions": []
            }
        
        # Create analysis record
        analysis = DocumentAnalysis(
            document_id=document_id,
            document_type=analysis_data.get("document_type", "unknown"),
            summary=analysis_data.get("summary", ""),
            key_terms=analysis_data.get("key_terms", []),
            calculations=analysis_data.get("calculations"),
            risk_assessment=analysis_data.get("risk_assessment", {}),
            fraud_indicators=analysis_data.get("fraud_indicators", []),
            suggested_questions=analysis_data.get("suggested_questions", []),
            unusual_clauses=analysis_data.get("unusual_clauses", [])
        )
        
        await db.document_analyses.insert_one(analysis.dict())
        
        # Update document status
        await db.documents.update_one(
            {"id": document_id},
            {"$set": {"analysis_status": "completed"}}
        )
        
    except Exception as e:
        logging.error(f"Document analysis failed: {e}")
        await db.documents.update_one(
            {"id": document_id},
            {"$set": {"analysis_status": "failed"}}
        )

@api_router.get("/documents")
async def get_user_documents(user_id: str = Depends(verify_token)):
    documents = await db.documents.find({"user_id": user_id}, {"_id": 0}).sort("uploaded_at", -1).to_list(100)
    return documents

@api_router.get("/documents/{document_id}/analysis")
async def get_document_analysis(document_id: str, user_id: str = Depends(verify_token)):
    # Verify document belongs to user
    document = await db.documents.find_one({"id": document_id, "user_id": user_id})
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    analysis = await db.document_analyses.find_one({"document_id": document_id})
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return {
        "document": document,
        "analysis": analysis
    }

@api_router.post("/documents/{document_id}/reply")
async def generate_reply_letter(
    document_id: str,
    user_responses: Dict[str, str],
    user_id: str = Depends(verify_token)
):
    # Verify document belongs to user
    document = await db.documents.find_one({"id": document_id, "user_id": user_id})
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Get analysis
    analysis = await db.document_analyses.find_one({"document_id": document_id})
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    # Generate reply letter
    chat = get_ai_chat()
    
    reply_prompt = f"""
    Based on the document analysis and user responses, generate a professional reply letter.
    
    Document Type: {analysis['document_type']}
    Document Summary: {analysis['summary']}
    
    User Responses to Questions:
    {json.dumps(user_responses, indent=2)}
    
    Generate a professional, concise reply letter that addresses the key points from the user's responses.
    Format it as a proper business letter with appropriate tone for the document type.
    
    Return only the letter content, no additional formatting or JSON.
    """
    
    user_message = UserMessage(text=reply_prompt)
    generated_letter = await chat.send_message(user_message)
    
    # Save reply letter
    reply = ReplyLetter(
        document_id=document_id,
        user_responses=user_responses,
        generated_letter=generated_letter
    )
    await db.reply_letters.insert_one(reply.dict())
    
    return {"reply_id": reply.id, "letter": generated_letter}

# Health check
@api_router.get("/")
async def root():
    return {"message": "Legal Document Analyzer API", "status": "active"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()