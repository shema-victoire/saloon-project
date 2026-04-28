
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
    <div className="animate-in fade-in duration-1000 bg-brand-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Studio" 
            className="w-full h-full object-cover grayscale brightness-[0.4] scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/10 via-brand-black/40 to-brand-black"></div>
          
          {/* Subtle Atmospheric Accents */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[160px] animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[140px] delay-700 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.03] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="h-[1px] w-12 bg-brand-pink/30"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-pink">Excellence & Glamour Only</span>
            <div className="h-[1px] w-12 bg-brand-pink/30"></div>
          </div>

          <h1 className="title-massive flex flex-col items-center select-none">
            <span className="text-white drop-shadow-2xl">KEZ</span>
            <span className="text-brand-pink mt-[-0.15em] italic font-black translate-x-4">A.</span>
          </h1>

          <div className="max-w-2xl mx-auto mt-[-2rem]">
            <p className="text-sm md:text-base text-slate-400 font-light leading-loose tracking-wide italic">
              Rwanda's most exclusive beauty destination. Uncompromising artistry for <br className="hidden md:block" /> the elite who demand nothing but perfection.
            </p>
          </div>

          <div className="pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Link to="/book" className="btn-brand !py-6 !px-16 !text-sm group relative overflow-hidden transition-transform active:scale-95 shadow-[0_0_40px_-10px_rgba(255,43,133,0.3)]">
              <span className="relative z-10">Make An Appointment</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-30 select-none">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-brand-black border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200" 
                  alt="Elite Ambience" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="absolute top-1/2 -right-12 hidden lg:block -translate-y-1/2">
                <div className="bg-brand-pink p-12 shadow-2xl">
                  <span className="text-7xl font-serif font-black block mb-2 leading-none">10</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/80">Years Expertise</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="space-y-8">
                <span className="text-brand-pink uppercase tracking-[0.4em] text-[10px] font-bold flex items-center">
                  <div className="w-8 h-[1px] bg-brand-pink mr-4"></div> The Philosophy
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-white leading-[1.1] font-light">
                  Crafting <span className="text-brand-pink italic font-serif">Confidence</span> Through Artistry.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  Keza Glam Hub is more than a salon; it is a ritual. We believe that true beauty is not manufactured but revealed through meticulous attention and bespoke care.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  { title: "Master Craftsmanship", desc: "Our specialists are masters of their craft, trained internationally to deliver global standards locally." },
                  { title: "Indulgent Atmosphere", desc: "A private santuary where time slows down. Relax with curated jazz and premium refreshments." },
                  { title: "Luxury Product Selection", desc: "Exclusively utilizing elite brands like Mizani, OPI, and MAC for unparalleled results." }
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-default border-l border-white/5 pl-8 hover:border-brand-pink transition-colors">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Menu Preview */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-8 md:space-y-0">
            <div className="space-y-4">
              <span className="text-brand-pink uppercase tracking-[0.4em] text-[10px] font-bold">The Signature Menu</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white font-light uppercase tracking-tighter">Iconic Treatments</h2>
            </div>
            <Link to="/services" className="group flex items-center text-white uppercase tracking-[0.3em] text-[10px] font-bold transition-all hover:text-brand-pink">
              Full Menu <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform text-brand-pink" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="relative group overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 h-[600px]">
                <div className="h-2/3 overflow-hidden">
                  <img 
                    src={service.imageUrl || `https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800`} 
                    alt={service.name} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[1.5s]" 
                  />
                </div>
                <div className="p-10 flex flex-col h-1/3 justify-between">
                  <div>
                    <span className="text-brand-pink text-[9px] uppercase tracking-[0.4em] font-bold mb-3 block">{service.category}</span>
                    <h3 className="text-2xl font-serif text-white group-hover:text-brand-pink transition-colors">{service.name}</h3>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <span className="text-white font-serif font-black text-xl italic">{service.price}</span>
                    <Link to="/book" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-pink group-hover:border-brand-pink transition-all">
                      <ArrowRight size={18} className="text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive CTA */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=2000')] bg-fixed bg-cover bg-center grayscale brightness-[0.2]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-5xl md:text-8xl font-serif text-white font-light italic leading-tight">
            Reserve Your <span className="text-brand-pink not-italic font-black">Indulgence.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-loose font-light">
            Our schedule is curated to provide undivided attention. Secure your preferred slot today.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Link to="/book" className="btn-brand !px-16">
              Book Appointment
            </Link>
            <a href="tel:+250788345678" className="px-16 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-black transition-all">
              The Concierge
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
