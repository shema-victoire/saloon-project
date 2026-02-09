
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { cmsService } from './services/cmsService';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(cmsService.getState());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('keza_admin_auth') === 'true';
  });

  const refreshState = () => {
    setAppState(cmsService.getState());
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('keza_admin_auth', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('keza_admin_auth');
  };

  useEffect(() => {
    // Scroll to top on route change handled by Router automatically in most SPA shells
    // But manual trigger just in case
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout contact={appState.contact}>
            <Home services={appState.services} />
          </Layout>
        } />
        <Route path="/services" element={
          <Layout contact={appState.contact}>
            <Services services={appState.services} />
          </Layout>
        } />
        <Route path="/gallery" element={
          <Layout contact={appState.contact}>
            <Gallery images={appState.gallery} />
          </Layout>
        } />
        <Route path="/book" element={
          <Layout contact={appState.contact}>
            <Booking services={appState.services} contact={appState.contact} />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout contact={appState.contact}>
            <Contact contact={appState.contact} />
          </Layout>
        } />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleAdminLogin} />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            isAdmin ? (
              <AdminDashboard 
                state={appState} 
                onUpdate={refreshState} 
                onLogout={handleAdminLogout} 
              />
            ) : (
              <Navigate to="/admin" />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
