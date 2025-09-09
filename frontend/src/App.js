import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FeaturesPage from './components/FeaturesPage';
import AboutPage from './components/AboutPage';
import SupportPage from './components/SupportPage';
import ContactPage from './components/ContactPage';
import PricingPage from './components/PricingPage';
import UseCasesPage from './components/UseCasesPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import DocumentAnalysis from './components/DocumentAnalysis';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Set up axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set auth header if token exists
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const handleLogin = (accessToken, userId) => {
    setToken(accessToken);
    setUserId(userId);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', userId);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <HomePage />
              <Footer />
            </>
          } />
          
          <Route path="/features" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <FeaturesPage />
              <Footer />
            </>
          } />
          
          <Route path="/about" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <AboutPage />
              <Footer />
            </>
          } />
          
          <Route path="/support" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <SupportPage />
              <Footer />
            </>
          } />
          
          <Route path="/contact" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <ContactPage />
              <Footer />
            </>
          } />
          
          <Route path="/pricing" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <PricingPage />
              <Footer />
            </>
          } />
          
          <Route path="/use-cases" element={
            <>
              <Header isAuthenticated={!!token} onLogout={handleLogout} />
              <UseCasesPage />
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            !token ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            token ? (
              <>
                <Header isAuthenticated={true} onLogout={handleLogout} />
                <Dashboard onLogout={handleLogout} />
                <Footer />
              </>
            ) : <Navigate to="/login" />
          } />
          
          <Route path="/upload" element={
            token ? (
              <>
                <Header isAuthenticated={true} onLogout={handleLogout} />
                <UploadPage />
                <Footer />
              </>
            ) : <Navigate to="/login" />
          } />
          
          <Route path="/document/:documentId" element={
            token ? (
              <>
                <Header isAuthenticated={true} onLogout={handleLogout} />
                <DocumentAnalysis />
                <Footer />
              </>
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;