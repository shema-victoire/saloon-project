
import React from 'react';
import { ContactInfo } from '../types';
import { Phone, Mail, MapPin, MessageSquare, Clock, Instagram, Facebook } from 'lucide-react';

interface ContactProps {
  contact: ContactInfo;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <div className="bg-brand-black min-h-screen py-32 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-32 max-w-3xl mx-auto space-y-8">
          <span className="text-brand-pink uppercase tracking-[0.4em] text-[10px] font-bold block">Contact</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-light">The <span className="italic">Concierge</span></h1>
          <p className="text-slate-400 font-light italic leading-loose">
            Visit us in our serene Kigali location or reach out through any of our channels. We look forward to welcoming you to the hub.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Phone, title: "Phone", value: contact.phone, color: "text-white" },
                { icon: Mail, title: "Email", value: contact.email, color: "text-white" },
                { icon: MessageSquare, title: "WhatsApp", value: "Chat With Us", color: "text-brand-pink", link: `https://wa.me/${contact.whatsapp.replace('+', '')}` },
                { icon: Clock, title: "Hours", value: "Mon-Sat: 9am - 8pm", color: "text-white" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-10 flex flex-col items-center text-center group hover:bg-white/[0.04] transition-all">
                  <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mb-6 text-brand-pink group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-500 mb-3">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className={`${item.color} font-serif text-lg italic hover:underline`}>
                      {item.value}
                    </a>
                  ) : (
                    <p className={`${item.color} font-serif text-lg italic`}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-12 lg:p-16">
              <h3 className="text-3xl font-serif text-white mb-8 flex items-center italic">
                <MapPin className="mr-6 text-brand-pink" size={32} /> Our Location
              </h3>
              <p className="text-slate-400 mb-12 leading-loose font-light italic text-lg">
                {contact.address}
              </p>
              <div className="flex space-x-12 pt-8 border-t border-white/10">
                <a href="#" className="flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 hover:text-brand-pink transition-colors">
                  <Instagram size={20} className="mr-4" /> Instagram
                </a>
                <a href="#" className="flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 hover:text-brand-pink transition-colors">
                  <Facebook size={20} className="mr-4" /> Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-[500px] lg:h-auto min-h-[600px] bg-white/[0.02] border border-white/5 relative overflow-hidden grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 shadow-2xl">
            <iframe 
              src={contact.mapsEmbed}
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
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
