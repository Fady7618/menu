import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import MenuItemCard from '../../components/features/menu/MenuItemCard';
import SkeletonCard from '../../components/common/loader/SkeletonCard';
import { useMenu } from '../../hooks/useMenu';
import { getCategories } from '../../services/menuService';
import { menuCategoryCarouselConfig, virtualCarouselConfig, performanceConfig } from '../../config/carousel';
import type { MenuCategory } from '../../types/MenuCategory';
import type { MenuItem } from '../../types/MenuItem';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/virtual';

const Menu: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  const { data: items, loading, error } = useMenu({
    category,
    availableOnly: true,
  });

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    if (!items) return new Map<string, MenuItem[]>();

    const grouped = new Map<string, MenuItem[]>();
    items.forEach((item) => {
      const cat = item.category;
      if (!grouped.has(cat)) {
        grouped.set(cat, []);
      }
      grouped.get(cat)!.push(item);
    });

    return grouped;
  }, [items]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-20 px-4 md:px-8 lg:px-16">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-12">
        <p className="font-serif text-rust italic text-xl mb-3">
          {category ? `Browsing` : `Explore all`}
        </p>
        <h1
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          {category ? category : 'Our Menu'}
        </h1>
      </div>

      {/* Category tabs - Horizontal scroll on mobile, flex wrap on desktop */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex md:flex-wrap gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => navigate('/menu')}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans border transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                !category
                  ? 'border-rust text-rust'
                  : 'border-white/20 text-white/50 hover:border-white/60 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/menu/${encodeURIComponent(cat.name)}`)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans border transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  category === cat.name
                    ? 'border-rust text-rust'
                    : 'border-white/20 text-white/50 hover:border-white/60 hover:text-white'
                }`}
              >
                {cat.name} <span className="text-white/30 ml-1">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SkeletonCard count={8} />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="font-serif text-rust italic text-2xl mb-3">Something went wrong.</p>
          <p className="font-sans font-light text-white/40">{error.message}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && items?.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="font-serif text-rust italic text-2xl">Nothing here yet.</p>
        </div>
      )}

      {/* Category Carousels/Grids */}
      {!loading && !error && items && items.length > 0 && (
        <div className="max-w-7xl mx-auto space-y-16">
          {category ? (
            // Single category view
            <div>
              <CategoryCarousel
                categoryName={category}
                items={items}
                expanded={expandedCategories.has(category)}
                onToggle={() => toggleCategory(category)}
                isMobile={isMobile}
              />
            </div>
          ) : (
            // All categories view
            Array.from(itemsByCategory.entries()).map(([catName, catItems]) => (
              <div key={catName}>
                <CategoryCarousel
                  categoryName={catName}
                  items={catItems}
                  expanded={expandedCategories.has(catName)}
                  onToggle={() => toggleCategory(catName)}
                  isMobile={isMobile}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* Custom carousel navigation styling + Hide scrollbar */}
      <style>{`
        .category-carousel .swiper-button-next,
        .category-carousel .swiper-button-prev {
          color: #b5724a;
          background: rgba(26, 26, 26, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(245, 240, 235, 0.2);
        }
        .category-carousel .swiper-button-next:after,
        .category-carousel .swiper-button-prev:after {
          font-size: 16px;
        }
        .category-carousel .swiper-button-next:hover,
        .category-carousel .swiper-button-prev:hover {
          background: rgba(181, 114, 74, 0.2);
          border-color: #b5724a;
        }
        .category-carousel .swiper-pagination-bullet {
          background: rgba(245, 240, 235, 0.3);
          opacity: 1;
        }
        .category-carousel .swiper-pagination-bullet-active {
          background: #b5724a;
        }
        .category-carousel .swiper-button-disabled {
          opacity: 0.3;
        }
        
        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

interface CategoryCarouselProps {
  categoryName: string;
  items: MenuItem[];
  expanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = React.memo(
  ({ categoryName, items, expanded, onToggle, isMobile }) => {
    const itemCount = items.length;
    const useVirtual = itemCount >= performanceConfig.virtualThreshold;
    const config = useVirtual ? virtualCarouselConfig : menuCategoryCarouselConfig;

    // On mobile, always show grid. On desktop, respect expanded state
    const showGrid = isMobile || expanded;
    const displayItems = showGrid ? items : items.slice(0, 12);
    const hasMore = itemCount > 12;

    return (
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-white text-2xl md:text-3xl font-bold">
            {categoryName}
            <span className="text-white/40 text-lg ml-3">({itemCount})</span>
          </h2>
          {/* Show "View All" button only on desktop when there are more items */}
          {hasMore && !isMobile && (
            <button
              onClick={onToggle}
              className="text-rust text-sm font-sans uppercase tracking-wider hover:text-white transition-colors"
            >
              {expanded ? 'View Less' : 'View All'}
            </button>
          )}
        </div>

        {/* Grid on mobile, Carousel or Grid on desktop based on expanded state */}
        {showGrid ? (
          // Grid view (mobile always, desktop when expanded)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {displayItems.map((item, index) => (
              <MenuItemCard key={item.id} item={item} priority={index < 4} />
            ))}
          </div>
        ) : (
          // Carousel view (desktop only when not expanded)
          <Swiper
            {...config}
            modules={useVirtual ? [Navigation, Pagination, Virtual] : [Navigation, Pagination]}
            className="category-carousel"
          >
            {displayItems.map((item, index) => (
              <SwiperSlide key={item.id} virtualIndex={index}>
                <MenuItemCard item={item} priority={index < 3} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    );
  }
);

CategoryCarousel.displayName = 'CategoryCarousel';

export default Menu;