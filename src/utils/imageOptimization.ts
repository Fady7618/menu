/**
 * Image Optimization Utilities
 * Handles lazy loading, responsive sizing, and performance optimization
 */

/**
 * Generate a simple blur placeholder for images
 */
export const generateBlurPlaceholder = (width: number = 40, height: number = 40): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8duzYfwAGtAL2PF4BjQAAAABJRU5ErkJggg=='/%3E%3C/svg%3E`;
};

/**
 * Get responsive image size based on viewport
 */
export const getResponsiveImageSize = (): { width: number; quality: number } => {
  if (typeof window === 'undefined') {
    return { width: 800, quality: 75 };
  }

  const screenWidth = window.innerWidth;

  if (screenWidth < 640) {
    return { width: 400, quality: 70 };
  } else if (screenWidth < 1024) {
    return { width: 600, quality: 75 };
  } else {
    return { width: 800, quality: 80 };
  }
};

/**
 * Optimize Unsplash image URL with responsive parameters
 */
export const optimizeImageUrl = (url: string, width?: number, quality?: number): string => {
  if (!url) return '';

  const size = getResponsiveImageSize();
  const w = width || size.width;
  const q = quality || size.quality;

  // Check if it's an Unsplash URL
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${w}&q=${q}&fit=crop&auto=format`;
  }

  return url;
};

/**
 * Preload critical images (first few slides)
 */
export const preloadImages = (urls: string[], count: number = 3): void => {
  urls.slice(0, count).forEach((url) => {
    const img = new Image();
    img.src = optimizeImageUrl(url);
  });
};

/**
 * Check if image is in viewport (for custom lazy loading logic)
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};