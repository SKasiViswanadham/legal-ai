import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Calculator,
  MessageSquare,
  Eye,
  HelpCircle,
  Scale,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DocumentAnalysis = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const [replyQuestions, setReplyQuestions] = useState({});
  const [generatingReply, setGeneratingReply] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');

  useEffect(() => {
    fetchAnalysis();
  }, [documentId]);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(`${API}/documents/${documentId}/analysis`);
      setData(response.data);
    } catch (err) {
      setError('Failed to load document analysis');
      console.error('Error fetching analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReply = async () => {
    if (Object.keys(replyQuestions).length === 0) {
      alert('Please answer at least one question to generate a reply');
      return;
    }

    setGeneratingReply(true);
    try {
      const response = await axios.post(`${API}/documents/${documentId}/reply`, replyQuestions);
      setGeneratedReply(response.data.letter);
      setActiveTab('reply');
    } catch (err) {
      console.error('Error generating reply:', err);
      alert('Failed to generate reply. Please try again.');
    } finally {
      setGeneratingReply(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'risk-low';
      case 'medium':
        return 'risk-medium';
      case 'high':
        return 'risk-high';
      default:
        return 'risk-medium';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Analysis Not Available</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { document, analysis } = data;

  const tabs = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'terms', label: 'Key Terms', icon: Eye },
    { id: 'calculations', label: 'Calculations', icon: Calculator },
    { id: 'risks', label: 'Risk Assessment', icon: Shield },
    { id: 'fraud', label: 'Fraud Detection', icon: AlertTriangle },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
    { id: 'reply', label: 'Generate Reply', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 truncate max-w-md">
                    {document.filename}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {formatDate(document.uploaded_at)} • {analysis.document_type}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysis.risk_assessment?.overall_risk)}`}>
                Risk: {analysis.risk_assessment?.overall_risk || 'Unknown'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2 sticky top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6 animate-fade-in">
              
              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Document Summary</h2>
                  </div>
                  
                  <div className="prose max-w-none">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {analysis.summary}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Terms Tab */}
              {activeTab === 'terms' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <Eye className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Key Terms Explained</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {analysis.key_terms && analysis.key_terms.length > 0 ? (
                      analysis.key_terms.map((term, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-4">
                          <h3 className="font-semibold text-slate-800 mb-2">{term.term}</h3>
                          <p className="text-slate-600">{term.explanation}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">No key terms identified in this document.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Calculations Tab */}
              {activeTab === 'calculations' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <Calculator className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Financial Calculations</h2>
                  </div>
                  
                  {analysis.calculations?.has_calculations ? (
                    <div className="space-y-4">
                      {analysis.calculations.financial_details?.map((detail, index) => (
                        <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-green-800 capitalize">
                              {detail.type?.replace('_', ' ')}
                            </h3>
                            <span className="text-xl font-bold text-green-700">
                              {detail.amount}
                            </span>
                          </div>
                          <p className="text-green-700">{detail.explanation}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No financial calculations found in this document.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Risk Assessment Tab */}
              {activeTab === 'risks' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Risk Assessment</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-700">Overall Risk Level</span>
                      <div className={getRiskColor(analysis.risk_assessment?.overall_risk)}>
                        {analysis.risk_assessment?.overall_risk || 'Unknown'}
                      </div>
                    </div>

                    {analysis.risk_assessment?.risk_factors && analysis.risk_assessment.risk_factors.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Risk Factors</h3>
                        <div className="space-y-2">
                          {analysis.risk_assessment.risk_factors.map((factor, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <p className="text-orange-800">{factor}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysis.risk_assessment?.recommendations && analysis.risk_assessment.recommendations.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Recommendations</h3>
                        <div className="space-y-2">
                          {analysis.risk_assessment.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-blue-800">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fraud Detection Tab */}
              {activeTab === 'fraud' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Fraud Detection</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {analysis.fraud_indicators && analysis.fraud_indicators.length > 0 ? (
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Potential Fraud Indicators</h3>
                        <div className="space-y-3">
                          {analysis.fraud_indicators.map((indicator, index) => (
                            <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                              <p className="text-red-800">{indicator}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-700 mb-2">No Fraud Indicators Detected</h3>
                        <p className="text-green-600">This document appears to be legitimate with no obvious red flags.</p>
                      </div>
                    )}

                    {analysis.unusual_clauses && analysis.unusual_clauses.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Unusual Clauses</h3>
                        <div className="space-y-3">
                          {analysis.unusual_clauses.map((clause, index) => (
                            <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <p className="text-yellow-800">{clause}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Questions Tab */}
              {activeTab === 'questions' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <HelpCircle className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Suggested Questions</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {analysis.suggested_questions && analysis.suggested_questions.length > 0 ? (
                      analysis.suggested_questions.map((question, index) => (
                        <div key={index} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <p className="text-indigo-800 font-medium">{question}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">No suggested questions available for this document.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Reply Generation Tab */}
              {activeTab === 'reply' && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Generate Reply Letter</h2>
                  </div>
                  
                  {!generatedReply ? (
                    <div className="space-y-6">
                      <p className="text-slate-600">
                        Answer the following questions to generate a professional reply letter:
                      </p>
                      
                      <div className="space-y-4">
                        {analysis.suggested_questions && analysis.suggested_questions.slice(0, 5).map((question, index) => (
                          <div key={index} className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                              {question}
                            </label>
                            <textarea
                              value={replyQuestions[`question_${index}`] || ''}
                              onChange={(e) => setReplyQuestions({
                                ...replyQuestions,
                                [`question_${index}`]: e.target.value
                              })}
                              className="input-field h-24 resize-none"
                              placeholder="Your response..."
                            />
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={handleGenerateReply}
                        disabled={generatingReply}
                        className="btn-primary disabled:opacity-50"
                      >
                        {generatingReply ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating Reply...
                          </div>
                        ) : (
                          'Generate Reply Letter'
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Your Reply Letter</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(generatedReply)}
                            className="btn-secondary"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Copy
                          </button>
                          <button
                            onClick={() => setGeneratedReply('')}
                            className="btn-secondary"
                          >
                            Generate New
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 rounded-lg p-6 border">
                        <pre className="whitespace-pre-wrap text-slate-700 font-mono text-sm leading-relaxed">
                          {generatedReply}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalysis;