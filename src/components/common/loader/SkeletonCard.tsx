import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

/**
 * SkeletonCard - Loading placeholder for menu items
 * Matches MenuItemCard dimensions for smooth transition
 */
const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white/5 border border-white/10 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative overflow-hidden aspect-square bg-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          </div>

          {/* Content skeleton */}
          <div className="p-5 flex flex-col gap-3">
            {/* Category */}
            <div className="h-4 bg-white/10 rounded w-1/3" />
            
            {/* Title */}
            <div className="h-6 bg-white/15 rounded w-3/4" />
            
            {/* Description */}
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-white/10 rounded w-full" />
              <div className="h-3 bg-white/10 rounded w-5/6" />
            </div>
            
            {/* Price section */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
              <div className="h-5 bg-white/15 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;