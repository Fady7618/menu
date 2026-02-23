import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import type { MenuItem } from '../../../types/MenuItem';
import { MENU_FALLBACK_IMAGES } from '../../../config/content';
import { optimizeImageUrl, generateBlurPlaceholder } from '../../../utils/imageOptimization';

interface MenuItemCardProps {
  item: MenuItem;
  priority?: boolean; // For above-fold images
}

/**
 * MenuItemCard - Optimized with lazy loading and memoization
 */
const MenuItemCard: React.FC<MenuItemCardProps> = React.memo(({ item, priority = false }) => {
  const fallback = MENU_FALLBACK_IMAGES[item.name.charCodeAt(0) % MENU_FALLBACK_IMAGES.length];
  const imageUrl = item.imageUrl || fallback;
  const optimizedUrl = optimizeImageUrl(imageUrl);

  return (
    <div className="group flex flex-col bg-white/5 border border-white/10 hover:border-rust/40 transition-all duration-300">
      {/* Image with lazy loading */}
      <div className="relative overflow-hidden aspect-square bg-white/5">
        <LazyLoadImage
          src={optimizedUrl}
          alt={item.name}
          effect="blur"
          placeholderSrc={generateBlurPlaceholder()}
          threshold={300}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          wrapperClassName="w-full h-full"
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="font-serif text-rust italic text-sm">{item.category}</p>
        <h3 className="font-display font-bold text-white text-lg leading-snug">{item.name}</h3>
        {item.description && (
          <p className="font-sans font-light text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <span className="font-sans text-white text-base">
            ${Number(item.price).toFixed(2)}
          </span>
          {item.isAvailable === false && (
            <span className="text-xs uppercase tracking-wider text-red-400">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo optimization
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.isAvailable === nextProps.item.isAvailable &&
    prevProps.priority === nextProps.priority
  );
});

MenuItemCard.displayName = 'MenuItemCard';

export default MenuItemCard;