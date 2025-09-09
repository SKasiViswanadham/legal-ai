import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Shield,
  Eye,
  Calendar
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await axios.post(`${API}/documents/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchDocuments(); // Refresh the list
      
      // Navigate to upload page or analysis after successful upload
      navigate(`/document/${response.data.document_id}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'analyzing':
        return <AlertCircle className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'analyzing':
        return 'status-analyzing';
      case 'completed':
        return 'status-completed';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.analysis_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDocumentStats = () => {
    const total = documents.length;
    const completed = documents.filter(doc => doc.analysis_status === 'completed').length;
    const analyzing = documents.filter(doc => doc.analysis_status === 'analyzing').length;
    const failed = documents.filter(doc => doc.analysis_status === 'failed').length;
    
    return { total, completed, analyzing, failed };
  };

  const stats = getDocumentStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-slate-600">
            Upload and analyze your legal documents with AI-powered insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="bg-blue-100 p-3 rounded-xl inline-block mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
            <div className="text-slate-600 text-sm">Total Documents</div>
          </div>
          
          <div className="card text-center">
            <div className="bg-green-100 p-3 rounded-xl inline-block mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{stats.completed}</div>
            <div className="text-slate-600 text-sm">Completed Analysis</div>
          </div>
          
          <div className="card text-center">
            <div className="bg-yellow-100 p-3 rounded-xl inline-block mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{stats.analyzing}</div>
            <div className="text-slate-600 text-sm">Currently Analyzing</div>
          </div>
          
          <div className="card text-center">
            <div className="bg-red-100 p-3 rounded-xl inline-block mb-3">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{stats.failed}</div>
            <div className="text-slate-600 text-sm">Failed Analysis</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Upload Area */}
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Upload New Document
            </h2>
            
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                  <p className="text-slate-600 font-medium">Uploading and analyzing...</p>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-700 font-medium mb-2">Drop files here or click to browse</p>
                  <div className="flex justify-center space-x-4 text-xs text-slate-400">
                    <span>PDF</span>
                    <span>•</span>
                    <span>Word</span>
                    <span>•</span>
                    <span>Text</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/upload')}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Advanced Upload
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/upload')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-slate-800">Upload Document</span>
                </div>
                <span className="text-slate-400">→</span>
              </button>
              
              <button
                onClick={() => navigate('/features')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-slate-800">Explore Features</span>
                </div>
                <span className="text-slate-400">→</span>
              </button>
              
              <button
                onClick={() => navigate('/support')}
                className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-slate-800">Get Support</span>
                </div>
                <span className="text-slate-400">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Your Documents
            </h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 py-2 text-sm w-64"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field pl-10 py-2 text-sm appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="analyzing">Analyzing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  {documents.length === 0 ? 'No documents uploaded yet' : 'No documents match your search'}
                </h3>
                <p className="text-slate-500 mb-6">
                  {documents.length === 0 
                    ? 'Upload your first legal document to get started with AI analysis'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                {documents.length === 0 && (
                  <button
                    onClick={() => navigate('/upload')}
                    className="btn-primary"
                  >
                    Upload Your First Document
                  </button>
                )}
              </div>
            ) : (
              filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  onClick={() => document.analysis_status === 'completed' && navigate(`/document/${document.id}`)}
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="bg-white p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-slate-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-800 truncate">
                        {document.filename}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                        <span>{formatFileSize(document.file_size)}</span>
                        <span>•</span>
                        <span>{formatDate(document.uploaded_at)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${getStatusClass(document.analysis_status)}`}>
                      {getStatusIcon(document.analysis_status)}
                      <span className="capitalize text-sm">
                        {document.analysis_status}
                      </span>
                    </div>
                    
                    {document.analysis_status === 'completed' && (
                      <div className="text-sm text-blue-600 font-medium">
                        View Analysis →
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;