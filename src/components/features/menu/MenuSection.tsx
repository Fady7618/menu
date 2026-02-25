import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { useMenu } from '../../../hooks/useMenu';
import { homeCarouselConfig } from '../../../config/carousel';
import { optimizeImageUrl, preloadImages } from '../../../utils/imageOptimization';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PLATE_IMAGES } from '../../../config/content';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

/**
 * MenuSection - Refactored with ScrollTrigger
 * - Removed sectionIndex and registerAnimateIn props
 * - Uses useScrollAnimation with ScrollTrigger
 */
const MenuSection: React.FC = () => {
  const { data: items } = useMenu({ availableOnly: true });
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const displayed = (items ?? []).slice(0, 8);

  // Preload first few images for better performance
  useEffect(() => {
    if (displayed.length > 0) {
      const imageUrls = displayed
        .slice(0, 4)
        .map(item => item.imageUrl || PLATE_IMAGES[0]);
      preloadImages(imageUrls, 3);
    }
  }, [displayed]);

  useScrollAnimation({
    ref: headingRef,
    config: {
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 },
      duration: 0.8,
    },
    scrollTrigger: {
      // trigger removed - hook uses ref.current automatically
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  useScrollAnimation({
    ref: carouselRef,
    config: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
      duration: 0.9,
      delay: 0.3,
    },
    scrollTrigger: {
      // trigger removed
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  return (
    <div ref={sectionRef} className="w-full min-h-screen overflow-hidden relative flex flex-col">
      {/* Heading */}
      <div className="pt-14 pb-8 text-center z-10">
        <p className="font-serif text-rust text-xl italic mb-2">Curated for you</p>
        <h2
          ref={headingRef}
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Our Menu
        </h2>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} className="flex-1 flex items-center px-4 md:px-8 lg:px-16">
        <div className="w-full py-4">
          <Swiper
            {...homeCarouselConfig}
            modules={[Autoplay, Pagination, Navigation]}
            className="menu-carousel"
          >
            {displayed.map((item, index) => {
              const imgSrc = item?.imageUrl || PLATE_IMAGES[index];
              const optimizedSrc = optimizeImageUrl(imgSrc, 400, 80);

              return (
                <SwiperSlide key={item.id} className="pb-12">
                  <div className="flex flex-col items-center">
                    {/* Circular plate image */}
                    <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl transition-all delay-50 duration-300 ease-in-out hover:scale-[0.95]">
                      <LazyLoadImage
                        src={optimizedSrc}
                        alt={item.name}
                        effect="blur"
                        threshold={200}
                        className="w-full h-full object-cover"
                        wrapperClassName="w-full h-full"
                        loading={index < 3 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none" />
                    </div>

                    {/* Item info */}
                    <div className="mt-4 text-center max-w-xs px-4">
                      <p className="font-serif text-rust italic text-sm mb-1">{item.category}</p>
                      <p className="font-display text-white text-lg md:text-xl font-semibold mb-1">
                        {item.name}
                      </p>
                      <p className="font-sans text-rust text-base md:text-lg font-medium">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      {item.description && (
                        <p className="font-sans text-white/60 text-xs md:text-sm mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* CTA */}
      <div className="pb-12 flex justify-center z-10">
        <Link
          to="/menu"
          className="border border-white text-white bg-transparent px-8 py-3 uppercase tracking-[0.2em] text-xs font-sans hover:bg-white hover:text-bg transition-all duration-300"
        >
          Full Menu
        </Link>
      </div>

      {/* Custom pagination styling */}
      <style>{`
        .menu-carousel .swiper-pagination-bullet {
          background: rgba(245, 240, 235, 0.3);
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .menu-carousel .swiper-pagination-bullet-active {
          background: #b5724a;
          width: 24px;
          border-radius: 4px;
        }
        .menu-carousel .swiper-pagination {
          bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default MenuSection;