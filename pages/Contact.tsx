
import React from 'react';
import { ContactInfo } from '../types';
import { Phone, Mail, MapPin, MessageSquare, Clock, Instagram, Facebook } from 'lucide-react';

interface ContactProps {
  contact: ContactInfo;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-24 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <span className="text-stone-500 uppercase tracking-[0.4em] text-xs mb-4 block">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8">Contact Us</h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Visit us in our serene Kigali location or reach out through any of our channels. We look forward to welcoming you to the hub.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4 text-stone-900">
                  <Phone size={20} />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Phone</h3>
                <p className="text-stone-900 font-medium">{contact.phone}</p>
              </div>

              <div className="bg-white p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4 text-stone-900">
                  <Mail size={20} />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Email</h3>
                <p className="text-stone-900 font-medium">{contact.email}</p>
              </div>

              <div className="bg-white p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-4 text-[#25D366]">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">WhatsApp</h3>
                <a href={`https://wa.me/${contact.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="text-stone-900 font-medium hover:underline">
                  Chat With Us
                </a>
              </div>

              <div className="bg-white p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4 text-stone-900">
                  <Clock size={20} />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Working Hours</h3>
                <p className="text-stone-900 font-medium text-sm">Mon-Sat: 9am - 8pm</p>
              </div>
            </div>

            <div className="bg-white p-10 shadow-sm border border-stone-100">
              <h3 className="text-2xl font-serif text-stone-900 mb-6 flex items-center">
                <MapPin className="mr-3" size={24} /> Our Location
              </h3>
              <p className="text-stone-500 mb-8 leading-relaxed">
                {contact.address}
              </p>
              <div className="flex space-x-4 pt-4 border-t border-stone-50">
                <a href="#" className="flex items-center text-xs uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors">
                  <Instagram size={18} className="mr-2" /> Instagram
                </a>
                <a href="#" className="flex items-center text-xs uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors">
                  <Facebook size={18} className="mr-2" /> Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-[400px] lg:h-full min-h-[500px] bg-stone-200 relative overflow-hidden shadow-xl">
            <iframe 
              src={contact.mapsEmbed}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Keza Glam Hub Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
