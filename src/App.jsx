import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HospitalDashboard from './pages/HospitalDashboard';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes for Hospital */}
            <Route element={<ProtectedRoute allowedRoles={['HOSPITAL']} />}>
              <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
            </Route>

            {/* Protected Routes for Donor */}
            <Route element={<ProtectedRoute allowedRoles={['DONOR']} />}>
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
            </Route>

            {/* Protected Routes for Admin */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '16px',
              background: '#333',
              color: '#fff',
            },
          }} 
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
