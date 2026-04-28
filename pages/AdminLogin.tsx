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
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden border border-stone-200">
        <div className="bg-stone-900 p-10 text-center">
          <h1 className="text-2xl font-serif text-white tracking-widest uppercase">Admin Access</h1>
          <p className="text-stone-400 text-sm mt-2 font-medium tracking-tight">KEZA GLAM HUB CMS</p>
        </div>
        
        <div className="p-10 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              This area is restricted to salon administrators. Please authenticate with your registered Google account.
            </p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-4 border border-red-100 flex items-center animate-in fade-in slide-in-from-top-2">
                <span className="font-bold mr-2">Access Denied:</span> {error}
              </div>
            )}
            
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-white border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mr-2 group-hover:border-white group-hover:border-t-transparent"></div>
                  Verifying...
                </span>
              ) : (
                <>
                  <LogIn size={16} className="mr-2" /> 
                  Sign in with Google
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4 pt-4 border-t border-stone-50">
            <Link to="/" className="text-stone-400 hover:text-stone-900 transition-colors flex items-center text-[10px] uppercase tracking-[0.2em] font-bold">
              <ArrowLeft size={14} className="mr-2" /> Back to Website
            </Link>
            <p className="text-center text-[10px] text-stone-300 uppercase tracking-widest">
              Secured with Firebase Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
