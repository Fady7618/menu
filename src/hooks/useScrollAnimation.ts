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

interface ScrollTriggerConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  markers?: boolean;
}

interface UseScrollAnimationOptions {
  ref: RefObject<HTMLElement | null>;
  config: AnimationConfig;
  registerAnimateIn?: (fn: () => void) => void;
  scrollTrigger?: ScrollTriggerConfig;
}

/**
 * useScrollAnimation - Centralized GSAP scroll animation hook
 * 
 * Supports both manual triggering (via registerAnimateIn) and ScrollTrigger-based animations
 * 
 * Usage with ScrollTrigger:
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
 *   scrollTrigger: {
 *     trigger: cardRef.current,
 *     start: 'top 80%',
 *     toggleActions: 'play none none none',
 *   },
 * });
 * ```
 */
export const useScrollAnimation = ({
  ref,
  config,
  registerAnimateIn,
  scrollTrigger,
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

  // Setup animation - either with ScrollTrigger or manual registration
  useEffect(() => {
    if (!ref.current) return;

    // ScrollTrigger mode (new behavior)
    if (scrollTrigger) {
      const animation = gsap.fromTo(
        ref.current,
        from,
        {
          ...to,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: scrollTrigger.trigger || ref.current,
            start: scrollTrigger.start || 'top 80%',
            end: scrollTrigger.end,
            scrub: scrollTrigger.scrub,
            toggleActions: scrollTrigger.toggleActions || 'play none none none',
            markers: scrollTrigger.markers || false,
          },
        }
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }

    // Manual registration mode (legacy behavior)
    if (registerAnimateIn) {
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
    }
  }, [ref, registerAnimateIn, from, to, duration, delay, ease, scrollTrigger]);
};

/**
 * useScrollAnimationMultiple - Animate multiple elements with staggered timing
 * 
 * Usage with ScrollTrigger:
 * ```tsx
 * const refs = [ref1, ref2, ref3];
 * useScrollAnimationMultiple({
 *   refs,
 *   config: {
 *     from: { opacity: 0, y: 20 },
 *     to: { opacity: 1, y: 0 },
 *     stagger: 0.2,
 *   },
 *   scrollTrigger: {
 *     trigger: containerRef.current,
 *     start: 'top 80%',
 *   },
 * });
 * ```
 */
interface UseScrollAnimationMultipleOptions {
  refs: RefObject<HTMLElement | null>[];
  config: AnimationConfig & { stagger?: number };
  registerAnimateIn?: (fn: () => void) => void;
  scrollTrigger?: ScrollTriggerConfig;
}

export const useScrollAnimationMultiple = ({
  refs,
  config,
  registerAnimateIn,
  scrollTrigger,
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

  // Setup animation
  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter((el) => el !== null);

    if (elements.length === 0) return;

    // ScrollTrigger mode
    if (scrollTrigger) {
      const animation = gsap.fromTo(
        elements,
        from,
        {
          ...to,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: scrollTrigger.trigger || elements[0],
            start: scrollTrigger.start || 'top 80%',
            end: scrollTrigger.end,
            scrub: scrollTrigger.scrub,
            toggleActions: scrollTrigger.toggleActions || 'play none none none',
            markers: scrollTrigger.markers || false,
          },
        }
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }

    // Manual registration mode
    if (registerAnimateIn) {
      const animateIn = () => {
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
    }
  }, [refs, registerAnimateIn, from, to, duration, delay, ease, stagger, scrollTrigger]);
};

/**
 * useTimelineAnimation - Create complex multi-step animations
 * 
 * For components that need sequential or overlapping animations
 * 
 * Usage with ScrollTrigger:
 * ```tsx
 * useTimelineAnimation({
 *   steps: [
 *     { ref: headingRef, from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, duration: 0.8 },
 *     { ref: subRef, from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, duration: 0.6, position: '-=0.4' },
 *   ],
 *   scrollTrigger: {
 *     trigger: containerRef.current,
 *     start: 'top 80%',
 *   },
 * });
 * ```
 */
interface TimelineStep {
  ref: RefObject<HTMLElement | null>;
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
  scrollTrigger?: ScrollTriggerConfig;
}

export const useTimelineAnimation = ({
  steps,
  registerAnimateIn,
  autoPlay = false,
  autoPlayDelay = 500,
  scrollTrigger,
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
    const createTimeline = () => {
      const tl = gsap.timeline(
        scrollTrigger
          ? {
              scrollTrigger: {
                trigger: scrollTrigger.trigger,
                start: scrollTrigger.start || 'top 80%',
                end: scrollTrigger.end,
                scrub: scrollTrigger.scrub,
                toggleActions: scrollTrigger.toggleActions || 'play none none none',
                markers: scrollTrigger.markers || false,
              },
            }
          : {}
      );

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

      return tl;
    };

    // ScrollTrigger mode
    if (scrollTrigger) {
      const tl = createTimeline();
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }

    // Auto-play mode
    if (autoPlay) {
      const timer = setTimeout(() => {
        createTimeline();
      }, autoPlayDelay);
      return () => clearTimeout(timer);
    }

    // Manual registration mode
    if (registerAnimateIn) {
      registerAnimateIn(createTimeline);
    }
  }, [steps, registerAnimateIn, autoPlay, autoPlayDelay, scrollTrigger]);
};

export default useScrollAnimation;