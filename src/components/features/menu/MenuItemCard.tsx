import React from 'react';
import type { MenuItem } from '../../../types/MenuItem';

interface MenuItemCardProps {
  item: MenuItem;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&fit=crop',
];

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const fallback = FALLBACK_IMAGES[item.name.charCodeAt(0) % FALLBACK_IMAGES.length];

  return (
    <div className="group flex flex-col bg-white/5 border border-white/10 hover:border-rust/40 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.imageUrl || fallback}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="font-serif text-rust italic text-sm">{item.category}</p>
        <h3 className="font-display font-bold text-white text-lg leading-snug">{item.name}</h3>
        {item.description && (
          <p className="font-sans font-light text-white/50 text-sm leading-relaxed flex-1">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <span className="font-sans text-white text-base">
            ${Number(item.price).toFixed(2)}
          </span>
          {!item.isAvailable && (
            <span className="text-xs uppercase tracking-widest text-white/30 font-sans">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;