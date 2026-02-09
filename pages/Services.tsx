
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
    <div className="bg-[#FDFBF7] min-h-screen py-24 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <span className="text-stone-500 uppercase tracking-[0.4em] text-xs mb-4 block">Our Offerings</span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8">Salon Services</h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            From essential maintenance to indulgent transformations, our menu of services is designed to meet the highest standards of beauty care.
          </p>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-xs uppercase tracking-widest font-bold transition-all border-b-2 ${
                activeCategory === cat 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredServices.map((service) => (
            <div key={service.id} className="flex flex-col md:flex-row group bg-white p-6 shadow-sm hover:shadow-md transition-all">
              {service.imageUrl && (
                <div className="w-full md:w-48 h-48 mb-6 md:mb-0 md:mr-8 flex-shrink-0 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
              )}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif text-stone-900">{service.name}</h3>
                    <span className="text-stone-900 font-bold whitespace-nowrap ml-4">{service.price}</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Link 
                  to={`/book?service=${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center text-stone-900 uppercase tracking-widest text-xs font-bold hover:translate-x-1 transition-transform"
                >
                  Book This Service <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
