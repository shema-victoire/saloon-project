
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
      <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-stone-900 leading-none">KEZA GLAM HUB</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">Beauty Salon & Spa</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/" className="text-sm uppercase tracking-widest hover:text-stone-500 transition-colors">Home</Link>
              <Link to="/services" className="text-sm uppercase tracking-widest hover:text-stone-500 transition-colors">Services</Link>
              <Link to="/gallery" className="text-sm uppercase tracking-widest hover:text-stone-500 transition-colors">Gallery</Link>
              <Link to="/contact" className="text-sm uppercase tracking-widest hover:text-stone-500 transition-colors">Contact</Link>
              <Link to="/book" className="px-6 py-2.5 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors">Book Now</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-stone-900 focus:outline-none">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-stone-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-serif">Home</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-serif">Services</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-serif">Gallery</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-lg font-serif">Contact</Link>
              <Link to="/book" onClick={() => setIsOpen(false)} className="block w-full py-3 bg-stone-900 text-white text-center uppercase tracking-widest">Book Now</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-white text-2xl font-serif">KEZA GLAM HUB</h3>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                Excellence in hair, nails, and skin care. We are committed to providing a luxury experience for the modern professional.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
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
