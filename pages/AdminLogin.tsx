
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ADMIN_CREDENTIALS } from '../constants';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLogin();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
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
          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-4 border border-red-100 flex items-center animate-in fade-in slide-in-from-top-2">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300">
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 focus:bg-white focus:border-stone-900 focus:outline-none transition-all text-sm"
                    placeholder="admin@kezaglamhub.com"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300">
                    <Lock size={18} />
                  </span>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 focus:bg-white focus:border-stone-900 focus:outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all flex items-center justify-center group"
            >
              Authenticate <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="flex flex-col items-center space-y-4 pt-4 border-t border-stone-50">
            <Link to="/" className="text-stone-400 hover:text-stone-900 transition-colors flex items-center text-[10px] uppercase tracking-[0.2em] font-bold">
              <ArrowLeft size={14} className="mr-2" /> Back to Website
            </Link>
            <p className="text-center text-[10px] text-stone-300 uppercase tracking-widest">
              Protected area for salon administrators only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
