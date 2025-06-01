import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { BrandingPage } from './pages/BrandingPage';
import { ClientsPage } from './pages/ClientsPage';
import { TicketsPage } from './pages/TicketsPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CompanyProvider } from './contexts/CompanyContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clients" 
              element={
                <ProtectedRoute>
                  <ClientsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tickets" 
              element={
                <ProtectedRoute>
                  <TicketsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/feedback" 
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/branding" 
              element={
                <ProtectedRoute>
                  <BrandingPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </Router>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;