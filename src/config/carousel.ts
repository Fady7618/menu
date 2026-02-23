import { type SwiperOptions } from 'swiper/types';

/**
 * Carousel Configuration
 * Reusable Swiper settings for consistent carousel behavior
 */

/**
 * Home page carousel configuration (scattered plates replacement)
 */
export const homeCarouselConfig: SwiperOptions = {
  modules: [],
  slidesPerView: 1.2,
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  speed: 600,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 24,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 28,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
      centeredSlides: false,
    },
  },
};

/**
 * Menu page category carousel configuration
 */
export const menuCategoryCarouselConfig: SwiperOptions = {
  modules: [],
  slidesPerView: 1,
  spaceBetween: 16,
  loop: false,
  speed: 400,
  navigation: {
    enabled: true,
  },
  pagination: {
    clickable: true,
    dynamicBullets: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 28,
    },
  },
};

/**
 * Virtual carousel config for large datasets (50+ items)
 */
export const virtualCarouselConfig: SwiperOptions = {
  ...menuCategoryCarouselConfig,
  virtual: {
    enabled: true,
    addSlidesBefore: 2,
    addSlidesAfter: 2,
  },
};

/**
 * Performance-optimized carousel settings
 */
export const performanceConfig = {
  // Lazy load images when they're within this distance (px)
  lazyLoadOffset: 300,
  
  // Preload this many images ahead
  preloadImages: 3,
  
  // Enable virtual slides for categories with this many items
  virtualThreshold: 20,
  
  // Cache timeout for menu data (ms)
  cacheTimeout: 15 * 60 * 1000, // 15 minutes
};