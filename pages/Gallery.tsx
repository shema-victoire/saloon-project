
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
    <div className="bg-[#FDFBF7] min-h-screen py-24 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="text-stone-500 uppercase tracking-[0.4em] text-xs mb-4 block">Visual Diary</span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8">Our Gallery</h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of salon moments, artistry, and the beautiful transformations we've achieved for our clients.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs uppercase tracking-widest transition-all rounded-full border ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white border-stone-900' 
                  : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="break-inside-avoid relative group overflow-hidden bg-stone-100">
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-auto block group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">{image.category}</span>
                <h3 className="text-xl font-serif">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
