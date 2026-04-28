
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { ContactInfo } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  contact: ContactInfo;
}

const Layout: React.FC<LayoutProps> = ({ children, contact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between h-24 items-center">
            {/* Logo */}
            <Link to="/" className="flex flex-col group">
              <span className="text-2xl font-serif font-black tracking-[0.1em] text-white leading-none group-hover:text-brand-pink transition-colors">
                KEZA<span className="text-brand-pink">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-brand-pink/60 font-bold mt-1">GLAM HUB</span>
            </Link>

            {/* Center Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-12">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/gallery" className="nav-link">Gallery</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>

            {/* Right Action */}
            <div className="hidden md:block">
              <Link to="/book" className="btn-brand !py-2.5 !px-6 text-[10px]">
                Book
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white hover:text-brand-pink transition-colors focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden bg-brand-black border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="px-6 pt-4 pb-12 space-y-6 text-center">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-2xl font-serif uppercase tracking-tight">Home</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="block text-2xl font-serif uppercase tracking-tight">Services</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-2xl font-serif uppercase tracking-tight">Gallery</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-2xl font-serif uppercase tracking-tight">Contact</Link>
              <Link to="/book" onClick={() => setIsOpen(false)} className="btn-brand block w-full mt-4">Book Appointment</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 bg-brand-black text-white">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 text-slate-400 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-white text-3xl font-serif font-black tracking-widest">KEZA<span className="text-brand-pink">.</span></h3>
              <p className="text-sm leading-relaxed font-light">
                Rwanda's premier luxury beauty destination. Excellence in aesthetics, uncompromising quality, and an atmosphere of pure indulgence.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-white/60 hover:text-brand-pink transition-colors"><Instagram size={18} /></a>
                <a href="#" className="text-white/60 hover:text-brand-pink transition-colors"><Facebook size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link to="/book" className="hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{contact.address}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="flex-shrink-0" />
                  <span>{contact.phone}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="flex-shrink-0" />
                  <span>{contact.email}</span>
                </li>
              </ul>
            </div>

            {/* Working Hours */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-6">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>8:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Keza Glam Hub. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/admin" className="hover:text-white flex items-center bg-stone-800/50 px-3 py-1.5 rounded border border-stone-700 transition-all">
                ADMIN LOGIN
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
