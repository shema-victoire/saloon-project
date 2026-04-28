
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { ArrowRight, Search } from 'lucide-react';

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="bg-brand-black min-h-screen py-32 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-32 max-w-3xl mx-auto space-y-8">
          <span className="text-brand-pink uppercase tracking-[0.4em] text-[10px] font-bold block">The Full Menu</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-light">Salon <span className="italic">Services</span></h1>
          <p className="text-slate-400 leading-loose font-light italic">
            From essential maintenance to indulgent transformations, our menu of services is designed to meet the highest standards of beauty care.
          </p>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-12 mb-24 border-b border-white/5 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all pb-4 border-b-2 ${
                activeCategory === cat 
                  ? 'border-brand-pink text-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredServices.map((service) => (
            <div key={service.id} className="flex flex-col md:flex-row group bg-white/[0.02] border border-white/5 p-8 hover:bg-white/[0.04] transition-all duration-500">
              {service.imageUrl && (
                <div className="w-full md:w-56 h-56 mb-8 md:mb-0 md:mr-10 flex-shrink-0 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
              )}
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-serif text-white group-hover:text-brand-pink transition-colors leading-tight">{service.name}</h3>
                    <span className="text-brand-pink font-serif font-black text-xl italic whitespace-nowrap ml-6">{service.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light line-clamp-3 italic">
                    {service.description}
                  </p>
                </div>
                <Link 
                  to={`/book?service=${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center text-white uppercase tracking-[0.3em] text-[10px] font-bold group/link"
                >
                  <span className="border-b border-transparent group-hover/link:border-brand-pink transition-all">Book Service</span>
                  <ArrowRight size={14} className="ml-4 text-brand-pink group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-40 text-slate-600">
            <Search size={64} className="mx-auto mb-6 opacity-10" />
            <p className="text-xl font-serif italic">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
