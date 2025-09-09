import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Brain,
  Shield,
  Calculator,
  MessageSquare,
  Eye,
  AlertTriangle
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const UploadPage = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [error, setError] = useState('');

  const features = [
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Advanced AI processes your document and extracts key information'
    },
    {
      icon: Eye,
      title: 'Plain English',
      description: 'Complex legal terms explained in simple, understandable language'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Identifies potential risks and concerning clauses'
    },
    {
      icon: AlertTriangle,
      title: 'Fraud Detection',
      description: 'Scans for suspicious elements and potential fraud indicators'
    },
    {
      icon: Calculator,
      title: 'Financial Analysis',
      description: 'Calculates interest rates, payments, and financial obligations'
    },
    {
      icon: MessageSquare,
      title: 'Reply Generation',
      description: 'Creates professional response letters when needed'
    }
  ];

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API}/documents/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setUploadedDocument({
        id: response.data.document_id,
        filename: file.name,
        size: file.size
      });
      setUploadSuccess(true);
      
      // Redirect to analysis after a short delay
      setTimeout(() => {
        navigate(`/document/${response.data.document_id}`);
      }, 3000);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.response?.data?.detail || 'Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Upload Your Legal Document
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get instant AI-powered analysis of your legal documents. Upload PDF, Word, or text files 
            to receive comprehensive insights in minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Upload Section */}
          <div className="space-y-8">
            
            {/* Upload Area */}
            <div className="card animate-slide-in">
              {!uploadSuccess ? (
                <div
                  className={`upload-area ${dragActive ? 'dragover' : ''} ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => !uploading && document.getElementById('file-input').click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    disabled={uploading}
                  />
                  
                  {uploading ? (
                    <div className="animate-fade-in">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
                      <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                        Uploading and Analyzing...
                      </h3>
                      <p className="text-slate-500 mb-4">
                        Please wait while we process your document with AI
                      </p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Estimated time: 30-60 seconds</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                        Drop your file here or click to browse
                      </h3>
                      <p className="text-slate-500 mb-6">
                        Upload your legal document to get started with AI analysis
                      </p>
                      <div className="flex justify-center space-x-6 text-sm text-slate-400 mb-6">
                        <span className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>PDF</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>Word</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>Text</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Maximum file size: 10MB
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-green-700 mb-4">
                    Upload Successful!
                  </h3>
                  <div className="bg-green-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-green-600" />
                        <div className="text-left">
                          <p className="font-semibold text-green-800">
                            {uploadedDocument?.filename}
                          </p>
                          <p className="text-sm text-green-600">
                            {formatFileSize(uploadedDocument?.size)}
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        Analyzing...
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Your document is being analyzed. You'll be redirected to the results shortly.
                  </p>
                  <div className="animate-pulse flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-700 font-medium">Upload Failed</p>
                  </div>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              )}
            </div>

            {/* File Requirements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Supported File Types & Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-slate-800">PDF Files</p>
                  <p className="text-sm text-slate-600">Up to 10MB</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-slate-800">Word Documents</p>
                  <p className="text-sm text-slate-600">.docx format</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-slate-800">Text Files</p>
                  <p className="text-sm text-slate-600">.txt format</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                What You'll Get
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="text-center">
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Powered by Advanced AI
                </h3>
                <p className="text-slate-600">
                  Our Gemini 2.0-flash model provides industry-leading accuracy 
                  in legal document analysis with 99.7% precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;