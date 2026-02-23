import { useEffect, type RefObject } from 'react';

interface UseWheelNavigationOptions {
  onNavigate: (direction: 'next' | 'prev') => void;
  isAnimating: RefObject<boolean>;
  disabled?: boolean;
}

/**
 * useWheelNavigation - Handle mouse wheel navigation
 * Extracted from Home.tsx to separate concerns
 */
export const useWheelNavigation = ({
  onNavigate,
  isAnimating,
  disabled = false,
}: UseWheelNavigationOptions): void => {
  useEffect(() => {
    if (disabled) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isAnimating.current) return;

      if (e.deltaY > 0) {
        onNavigate('next');
      } else if (e.deltaY < 0) {
        onNavigate('prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onNavigate, isAnimating, disabled]);
};

export default useWheelNavigation;