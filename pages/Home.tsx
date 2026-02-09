
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Heart, Clock, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface HomeProps {
  services: Service[];
}

const Home: React.FC<HomeProps> = ({ services }) => {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Salon Interior" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="uppercase tracking-[0.5em] text-xs font-bold text-stone-300 animate-in slide-in-from-bottom-4 duration-1000">Excellence Defined</span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] animate-in slide-in-from-bottom-6 duration-1000 delay-200">
              Where Beauty <br /><span className="italic text-stone-300">Meets Perfection.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200 font-light leading-relaxed max-w-xl animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              Step into Kigali's most prestigious salon. From signature silk presses to bespoke bridal artistry, we craft experiences that celebrate your unique glow.
            </p>
            <div className="pt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-in slide-in-from-bottom-10 duration-1000 delay-400">
              <Link to="/book" className="px-12 py-5 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all text-center shadow-2xl">
                Book Appointment
              </Link>
              <Link to="/services" className="px-12 py-5 border border-white/40 text-white font-bold uppercase tracking-widest text-xs backdrop-blur-sm hover:bg-white hover:text-stone-900 transition-all text-center">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-full h-full border border-stone-200 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200" 
                alt="Salon Ambience" 
                className="relative z-10 w-full aspect-[4/5] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 bg-stone-900 text-white p-10 hidden md:block z-20">
                <span className="text-4xl font-serif block mb-2">10+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Years of Artistry</span>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-stone-500 uppercase tracking-[0.3em] text-xs font-bold block">The Keza Standard</span>
                <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Elevating Beauty in the Heart of Kigali</h2>
                <p className="text-stone-500 text-lg leading-relaxed">
                  Located in the prestigious Kigali Heights, Keza Glam Hub is more than a salon—it's a sanctuary for the modern professional woman who refuses to compromise on quality.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {[
                  { icon: Sparkles, title: "Premium Global Brands", desc: "We partner with brands like Mizani, OPI, and MAC to ensure your skin and hair receive only the finest ingredients." },
                  { icon: Star, title: "Master Stylists", desc: "Our team is internationally trained and specializes in a wide range of hair textures and skin tones." },
                  { icon: Heart, title: "Curated Experience", desc: "Enjoy premium coffee, serene music, and a private consultation with every session." }
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white border border-stone-100 rounded-full flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-all shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 mb-2 uppercase tracking-widest text-sm">{item.title}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-xl space-y-4">
              <span className="text-stone-500 uppercase tracking-[0.3em] text-xs font-bold block">Refined Selection</span>
              <h2 className="text-4xl md:text-6xl font-serif text-stone-900">Most Loved Treatments</h2>
            </div>
            <Link to="/services" className="mt-8 md:mt-0 flex items-center text-stone-900 uppercase tracking-widest text-xs font-bold group border-b border-stone-300 pb-2">
              View Menu <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={service.imageUrl || `https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800`} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-sm text-stone-900 px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm">
                      {service.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif mb-4 text-stone-900 leading-tight">{service.name}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">{service.description}</p>
                  <div className="flex justify-between items-center border-t border-stone-50 pt-8 mt-auto">
                    <span className="text-stone-900 font-bold tracking-tight">{service.price}</span>
                    <Link to="/book" className="text-stone-400 hover:text-stone-900 transition-colors">
                      <ArrowRight size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="py-32 bg-stone-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full rotate-45">
            <path fill="#FFFFFF" d="M47.5,-52.4C61.4,-44.7,72.4,-30.2,74.7,-14.8C77,0.7,70.5,17,60.8,30.3C51,43.7,38,54.1,23.3,59.3C8.6,64.5,-7.7,64.5,-23.4,59.3C-39.1,54.1,-54.1,43.7,-61.8,29.4C-69.5,15.1,-69.8,-3.2,-64.2,-19.1C-58.6,-35,-47,-48.5,-33.1,-56.3C-19.1,-64.1,-2.9,-66.2,14.8,-63C32.5,-59.8,47.5,-52.4,47.5,-52.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif text-white mb-10 leading-tight italic">Luxury is a phone <br /> call away.</h2>
          <p className="text-stone-400 max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed">
            Our schedule is limited and appointments are highly recommended to ensure you receive the dedicated attention you deserve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/book" className="inline-block px-14 py-6 bg-stone-100 text-stone-900 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl">
              Book Appointment Now
            </Link>
            <a href="tel:+250788345678" className="inline-block px-14 py-6 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all">
              Call The Hub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
