import { useEffect, useRef, type RefObject } from 'react';

interface UseTouchNavigationOptions {
  onNavigate: (direction: 'next' | 'prev') => void;
  isAnimating: RefObject<boolean>;
  disabled?: boolean;
  threshold?: number; // Minimum swipe distance in pixels
}

/**
 * useTouchNavigation - Handle touch/swipe navigation
 * Extracted from Home.tsx to separate concerns
 */
export const useTouchNavigation = ({
  onNavigate,
  isAnimating,
  disabled = false,
  threshold = 30,
}: UseTouchNavigationOptions): void => {
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - touchEndY;

      // Ignore small swipes
      if (Math.abs(delta) < threshold) return;

      if (delta > 0) {
        // Swiped up - go to next section
        onNavigate('next');
      } else {
        // Swiped down - go to previous section
        onNavigate('prev');
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onNavigate, isAnimating, disabled, threshold]);
};

export default useTouchNavigation;