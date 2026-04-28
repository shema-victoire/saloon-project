
import React, { useState } from 'react';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="bg-brand-black min-h-screen py-32 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <header className="text-center mb-32 max-w-3xl mx-auto space-y-8">
          <span className="text-brand-pink uppercase tracking-[0.4em] text-[10px] font-bold block">Visual Diary</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-light">The <span className="italic">Portfolio</span></h1>
          <p className="text-slate-400 font-light italic leading-loose">
            Explore our curated selection of salon moments and the beautiful transformations we've achieved for our clients.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-12 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all pb-2 border-b ${
                activeCategory === cat 
                  ? 'border-brand-pink text-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="break-inside-avoid relative group overflow-hidden border border-white/5">
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-auto block grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[2s]" 
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-brand-pink text-[9px] uppercase tracking-[0.4em] mb-4 block font-bold">{image.category}</span>
                <h3 className="text-2xl font-serif text-white italic">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
