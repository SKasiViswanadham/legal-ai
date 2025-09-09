import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Scale, Shield, FileText, Brain } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${API}${endpoint}`, {
        email,
        password
      });

      onLogin(response.data.access_token, response.data.user_id);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Hero Content */}
        <div className="hidden lg:block space-y-8 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800">
                Legal<span className="text-gradient">AI</span>
              </h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                Transform Complex Legal Documents into 
                <span className="text-gradient"> Clear Insights</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Upload any legal document and get instant AI-powered analysis, summaries in plain English, 
                risk assessments, and fraud detection.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-sm hover-lift">
                  <Brain className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-800">AI Analysis</h3>
                  <p className="text-sm text-slate-600">Advanced AI breaks down complex legal jargon</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-sm hover-lift">
                  <Shield className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-slate-800">Risk Detection</h3>
                  <p className="text-sm text-slate-600">Identifies potential fraud and risky clauses</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-sm hover-lift">
                  <FileText className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-slate-800">Multiple Formats</h3>
                  <p className="text-sm text-slate-600">Supports PDF, Word, and text documents</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-sm hover-lift">
                  <Scale className="h-8 w-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-slate-800">Letter Generation</h3>
                  <p className="text-sm text-slate-600">Generates professional reply letters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="animate-slide-in">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl inline-block mb-4">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-slate-600 mt-2">
                {isLogin ? 'Sign in to analyze your documents' : 'Create your account to begin'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  By using LegalAI, you agree to our terms of service and privacy policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;