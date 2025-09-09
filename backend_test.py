import requests
import sys
import json
import tempfile
import os
from datetime import datetime

class LegalAITester:
    def __init__(self, base_url="https://legalai-digest.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.document_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
            
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers)
            elif method == 'POST':
                if files:
                    # Remove Content-Type for file uploads
                    if 'Content-Type' in test_headers:
                        del test_headers['Content-Type']
                    response = requests.post(url, files=files, headers=test_headers)
                else:
                    response = requests.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        success, response = self.run_test(
            "API Health Check",
            "GET",
            "/",
            200
        )
        return success

    def test_user_registration(self):
        """Test user registration"""
        test_email = f"test_user_{datetime.now().strftime('%H%M%S')}@example.com"
        test_password = "TestPass123!"
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "/auth/register",
            200,
            data={"email": test_email, "password": test_password}
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.user_id = response['user_id']
            print(f"   Registered user: {test_email}")
            print(f"   User ID: {self.user_id}")
            return True
        return False

    def test_user_login(self):
        """Test user login with existing credentials"""
        # First register a user
        test_email = f"login_test_{datetime.now().strftime('%H%M%S')}@example.com"
        test_password = "LoginTest123!"
        
        # Register
        success, response = self.run_test(
            "User Registration for Login Test",
            "POST",
            "/auth/register",
            200,
            data={"email": test_email, "password": test_password}
        )
        
        if not success:
            return False
            
        # Now test login
        success, response = self.run_test(
            "User Login",
            "POST",
            "/auth/login",
            200,
            data={"email": test_email, "password": test_password}
        )
        
        if success and 'access_token' in response:
            print(f"   Login successful for: {test_email}")
            return True
        return False

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        success, response = self.run_test(
            "Invalid Login",
            "POST",
            "/auth/login",
            401,
            data={"email": "nonexistent@example.com", "password": "wrongpassword"}
        )
        return success

    def create_test_document(self):
        """Create a test document for upload"""
        test_content = """
        SAMPLE LEGAL DOCUMENT
        
        This is a test legal document for AI analysis.
        
        TERMS AND CONDITIONS:
        1. Payment terms: Net 30 days
        2. Interest rate: 5% per annum
        3. Late fees: $50 per occurrence
        
        RISK FACTORS:
        - This document contains standard terms
        - No unusual clauses identified
        
        This document is for testing purposes only.
        """
        
        # Create temporary file
        temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False)
        temp_file.write(test_content)
        temp_file.close()
        
        return temp_file.name

    def test_document_upload(self):
        """Test document upload"""
        if not self.token:
            print("❌ No authentication token available")
            return False
            
        # Create test document
        test_file_path = self.create_test_document()
        
        try:
            with open(test_file_path, 'rb') as f:
                files = {'file': ('test_document.txt', f, 'text/plain')}
                
                success, response = self.run_test(
                    "Document Upload",
                    "POST",
                    "/documents/upload",
                    200,
                    files=files
                )
                
                if success and 'document_id' in response:
                    self.document_id = response['document_id']
                    print(f"   Document ID: {self.document_id}")
                    return True
                    
        finally:
            # Clean up temp file
            os.unlink(test_file_path)
            
        return False

    def test_invalid_file_upload(self):
        """Test upload with invalid file type"""
        if not self.token:
            print("❌ No authentication token available")
            return False
            
        # Create invalid file (e.g., image)
        temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.jpg', delete=False)
        temp_file.write("fake image content")
        temp_file.close()
        
        try:
            with open(temp_file.name, 'rb') as f:
                files = {'file': ('test_image.jpg', f, 'image/jpeg')}
                
                success, response = self.run_test(
                    "Invalid File Upload",
                    "POST",
                    "/documents/upload",
                    400,
                    files=files
                )
                return success
                
        finally:
            os.unlink(temp_file.name)

    def test_get_documents(self):
        """Test getting user documents"""
        if not self.token:
            print("❌ No authentication token available")
            return False
            
        success, response = self.run_test(
            "Get User Documents",
            "GET",
            "/documents",
            200
        )
        
        if success:
            print(f"   Found {len(response)} documents")
            return True
        return False

    def test_get_document_analysis(self):
        """Test getting document analysis"""
        if not self.token or not self.document_id:
            print("❌ No authentication token or document ID available")
            return False
            
        # Wait a bit for analysis to potentially complete
        import time
        print("   Waiting 5 seconds for analysis to process...")
        time.sleep(5)
        
        success, response = self.run_test(
            "Get Document Analysis",
            "GET",
            f"/documents/{self.document_id}/analysis",
            200
        )
        
        if success:
            document = response.get('document', {})
            analysis = response.get('analysis', {})
            print(f"   Document status: {document.get('analysis_status', 'unknown')}")
            print(f"   Analysis type: {analysis.get('document_type', 'unknown')}")
            return True
        return False

    def test_unauthorized_access(self):
        """Test accessing protected endpoints without token"""
        # Temporarily remove token
        original_token = self.token
        self.token = None
        
        success, response = self.run_test(
            "Unauthorized Document Access",
            "GET",
            "/documents",
            401
        )
        
        # Restore token
        self.token = original_token
        return success

    def test_generate_reply_letter(self):
        """Test reply letter generation"""
        if not self.token or not self.document_id:
            print("❌ No authentication token or document ID available")
            return False
            
        user_responses = {
            "question_0": "I agree with the terms",
            "question_1": "The payment schedule works for me",
            "question_2": "I have no concerns about the contract"
        }
        
        success, response = self.run_test(
            "Generate Reply Letter",
            "POST",
            f"/documents/{self.document_id}/reply",
            200,
            data=user_responses
        )
        
        if success and 'letter' in response:
            print(f"   Generated letter length: {len(response['letter'])} characters")
            return True
        return False

def main():
    print("🚀 Starting Legal AI Backend API Tests")
    print("=" * 50)
    
    tester = LegalAITester()
    
    # Test sequence
    tests = [
        ("API Health Check", tester.test_health_check),
        ("User Registration", tester.test_user_registration),
        ("User Login", tester.test_user_login),
        ("Invalid Login", tester.test_invalid_login),
        ("Document Upload", tester.test_document_upload),
        ("Invalid File Upload", tester.test_invalid_file_upload),
        ("Get Documents", tester.test_get_documents),
        ("Document Analysis", tester.test_get_document_analysis),
        ("Unauthorized Access", tester.test_unauthorized_access),
        ("Generate Reply Letter", tester.test_generate_reply_letter),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        try:
            if not test_func():
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    print(f"Total tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {len(failed_tests)}")
    
    if failed_tests:
        print(f"\n❌ Failed tests:")
        for test in failed_tests:
            print(f"   - {test}")
    else:
        print(f"\n✅ All tests passed!")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"\nSuccess rate: {success_rate:.1f}%")
    
    return 0 if len(failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())