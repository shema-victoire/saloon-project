
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
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
import { DEFAULT_SERVICES, DEFAULT_GALLERY, DEFAULT_CONTACT } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    services: DEFAULT_SERVICES,
    gallery: DEFAULT_GALLERY,
    contact: DEFAULT_CONTACT,
    bookings: []
  });
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial setup
    cmsService.testConnection();

    // Listen for Auth changes
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      // Logic: Only allow specific email as admin
      const isUserAdmin = user?.email === 'shemavictoirebigshark@gmail.com' && user?.emailVerified;
      setIsAdmin(!!isUserAdmin);
      setLoading(false);
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    // Listen for Data changes (Public)
    const unsubData = cmsService.subscribeToAppState((partialState) => {
      setAppState(prev => ({ ...prev, ...partialState }));
    });

    // Listen for Booking changes (Admin only)
    let unsubBookings: (() => void) | undefined;
    if (isAdmin) {
      unsubBookings = cmsService.subscribeToBookings((bookings) => {
        setAppState(prev => ({ ...prev, bookings }));
      });
      // Seed initial data if DB is empty (only admin has write permissions)
      cmsService.seedData();
    }

    return () => {
      unsubData();
      if (unsubBookings) unsubBookings();
    };
  }, [isAdmin]);

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="font-serif italic text-stone-400 animate-pulse">Keza Glam Hub is loading...</div>
      </div>
    );
  }

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
          element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => {}} />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            isAdmin ? (
              <AdminDashboard 
                state={appState} 
                onUpdate={() => {}} 
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
