import { useLayoutEffect, useEffect, type RefObject } from 'react';
import { gsap } from '../utils/gsap';

interface AnimationConfig {
  // Initial state (set immediately before mount)
  from: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
  };
  // Target state (animate to this)
  to: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
  };
  // Animation options
  duration?: number;
  delay?: number;
  ease?: string;
}

interface UseScrollAnimationOptions {
  ref: RefObject<HTMLElement | null>;  // Changed: accept null
  config: AnimationConfig;
  registerAnimateIn?: (fn: () => void) => void;
}

/**
 * useScrollAnimation - Centralized GSAP scroll animation hook
 * 
 * Eliminates duplicated animation code across all section components
 * by providing a consistent pattern for scroll-triggered animations.
 * 
 * Usage:
 * ```tsx
 * const cardRef = useRef<HTMLDivElement>(null);
 * useScrollAnimation({
 *   ref: cardRef,
 *   config: {
 *     from: { opacity: 0, x: -80 },
 *     to: { opacity: 1, x: 0 },
 *     duration: 1,
 *     ease: 'power3.out',
 *   },
 *   registerAnimateIn,
 * });
 * ```
 */
export const useScrollAnimation = ({
  ref,
  config,
  registerAnimateIn,
}: UseScrollAnimationOptions): void => {
  const {
    from,
    to,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
  } = config;

  // Set initial state before mount (prevents flash of unstyled content)
  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, from);
  }, [ref, from]);

  // Register animation function with parent controller
  useEffect(() => {
    if (!ref.current || !registerAnimateIn) return;

    const animateIn = () => {
      if (!ref.current) return;
      
      gsap.fromTo(
        ref.current,
        from,
        {
          ...to,
          duration,
          delay,
          ease,
        }
      );
    };

    registerAnimateIn(animateIn);
  }, [ref, registerAnimateIn, from, to, duration, delay, ease]);
};

/**
 * useScrollAnimationMultiple - Animate multiple elements with staggered timing
 * 
 * Usage:
 * ```tsx
 * const refs = [ref1, ref2, ref3];
 * useScrollAnimationMultiple({
 *   refs,
 *   config: {
 *     from: { opacity: 0, y: 20 },
 *     to: { opacity: 1, y: 0 },
 *     stagger: 0.2,
 *   },
 *   registerAnimateIn,
 * });
 * ```
 */
interface UseScrollAnimationMultipleOptions {
  refs: RefObject<HTMLElement | null>[];  // Changed: accept null
  config: AnimationConfig & { stagger?: number };
  registerAnimateIn?: (fn: () => void) => void;
}

export const useScrollAnimationMultiple = ({
  refs,
  config,
  registerAnimateIn,
}: UseScrollAnimationMultipleOptions): void => {
  const {
    from,
    to,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    stagger = 0,
  } = config;

  // Set initial state for all elements
  useLayoutEffect(() => {
    refs.forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, from);
      }
    });
  }, [refs, from]);

  // Register staggered animation
  useEffect(() => {
    if (!registerAnimateIn) return;

    const animateIn = () => {
      const elements = refs
        .map((ref) => ref.current)
        .filter((el) => el !== null);

      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        from,
        {
          ...to,
          duration,
          delay,
          ease,
          stagger,
        }
      );
    };

    registerAnimateIn(animateIn);
  }, [refs, registerAnimateIn, from, to, duration, delay, ease, stagger]);
};

/**
 * useTimelineAnimation - Create complex multi-step animations
 * 
 * For components that need sequential or overlapping animations
 * 
 * Usage:
 * ```tsx
 * useTimelineAnimation({
 *   steps: [
 *     { ref: headingRef, from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, duration: 0.8 },
 *     { ref: subRef, from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, duration: 0.6, position: '-=0.4' },
 *   ],
 *   registerAnimateIn,
 * });
 * ```
 */
interface TimelineStep {
  ref: RefObject<HTMLElement | null>;  // Changed: accept null
  from: Record<string, any>;
  to: Record<string, any>;
  duration?: number;
  ease?: string;
  position?: string; // GSAP timeline position parameter
}

interface UseTimelineAnimationOptions {
  steps: TimelineStep[];
  registerAnimateIn?: (fn: () => void) => void;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export const useTimelineAnimation = ({
  steps,
  registerAnimateIn,
  autoPlay = false,
  autoPlayDelay = 500,
}: UseTimelineAnimationOptions): void => {
  // Set initial states
  useLayoutEffect(() => {
    steps.forEach(({ ref, from }) => {
      if (ref.current) {
        gsap.set(ref.current, from);
      }
    });
  }, [steps]);

  // Create and register timeline
  useEffect(() => {
    const animateIn = () => {
      const tl = gsap.timeline();

      steps.forEach(({ ref, from, to, duration = 1, ease = 'power3.out', position }) => {
        if (!ref.current) return;

        tl.fromTo(
          ref.current,
          from,
          {
            ...to,
            duration,
            ease,
          },
          position
        );
      });
    };

    if (autoPlay) {
      const timer = setTimeout(animateIn, autoPlayDelay);
      return () => clearTimeout(timer);
    }

    registerAnimateIn?.(animateIn);
  }, [steps, registerAnimateIn, autoPlay, autoPlayDelay]);
};

export default useScrollAnimation;