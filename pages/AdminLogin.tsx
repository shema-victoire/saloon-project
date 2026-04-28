import React, { useState } from 'react';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // App.tsx handles state change and redirection
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in. Please use the registered admin email.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-brand-black shadow-[0_0_100px_-20px_rgba(255,43,133,0.15)] border border-white/5 overflow-hidden">
        <div className="p-16 text-center border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-pink animate-in slide-in-from-left duration-1000"></div>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-brand-pink animate-pulse rounded-full"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-slate-500">Security Check</span>
          </div>
          <h1 className="text-3xl font-serif text-white tracking-widest font-black italic">CON<span className="text-brand-pink not-italic">SOLE</span></h1>
          <p className="text-slate-500 text-[10px] mt-4 uppercase tracking-[0.3em] font-light">KEZA GLAM HUB — RESTRICTED AREA</p>
        </div>
        
        <div className="p-16 space-y-12 backdrop-blur-3xl">
          <div className="text-center">
            <p className="text-xs text-slate-500 leading-relaxed font-light italic">
              Please authenticate using your registered administrative credentials to access the command center.
            </p>
          </div>

          <div className="space-y-8">
            {error && (
              <div className="bg-red-500/10 text-red-500 text-[10px] uppercase tracking-widest p-4 border border-red-500/20 flex items-center animate-in fade-in slide-in-from-top-4">
                <span className="font-black mr-2">Error:</span> {error}
              </div>
            )}
            
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn-brand w-full !py-5 group relative overflow-hidden disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Verifying Identity...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn size={16} className="mr-3 group-hover:translate-x-1 transition-transform" /> 
                  Authorize with Google
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-col items-center space-y-8 pt-8 border-t border-white/5">
            <Link to="/" className="text-slate-500 hover:text-white transition-colors flex items-center text-[10px] uppercase tracking-[0.4em] font-bold">
              <ArrowLeft size={14} className="mr-3" /> Website
            </Link>
            <div className="flex items-center space-x-2 opacity-20">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <p className="text-[8px] text-white uppercase tracking-[0.5em]">End-to-End Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
