import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import HeroSection from '../../components/features/hero/HeroSection';
import OurStorySection from '../../components/features/story/OurStorySection';
import MenuSection from '../../components/features/menu/MenuSection';
import EventsSection from '../../components/features/events/EventsSection';
import ReservationsSection from '../../components/features/reservation/ReservationSection';
import { gsap, isMobile } from '../../utils/gsap';
import { useWheelNavigation } from '../../hooks/useWheelNavigation';
import { useTouchNavigation } from '../../hooks/useTouchNavigation';

// Configuration constants
const TOTAL_SECTIONS = 6;
const Z_INDEX_BASE = 10;
const Z_INDEX_INCREMENT = 10;
const TRANSITION_DURATION_SECONDS = 1;
const MOBILE_AUTO_ANIMATE_DELAY = 400;

const Home: React.FC = () => {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animateInFns = useRef<((() => void) | null)[]>(Array(TOTAL_SECTIONS).fill(null));
  const currentSection = useRef(0);
  const isAnimating = useRef(false);
  const [activeDot, setActiveDot] = useState(0);
  const isMobileDevice = isMobile();

  const registerAnimateIn = (index: number) => (fn: () => void) => {
    animateInFns.current[index] = fn;
  };

  const goToSection = useCallback((index: number) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= TOTAL_SECTIONS) return;
    if (index === currentSection.current) return;

    isAnimating.current = true;
    const prev = currentSection.current;
    const next = index;
    currentSection.current = next;
    setActiveDot(next);

    if (next > prev) {
      // Slide next section up from below
      gsap.set(wrapperRefs.current[next], { yPercent: 100 });
      gsap.to(wrapperRefs.current[next], {
        yPercent: 0,
        duration: TRANSITION_DURATION_SECONDS,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimating.current = false;
          animateInFns.current[next]?.();
        },
      });
    } else {
      // Slide current section back down to reveal previous
      gsap.to(wrapperRefs.current[prev], {
        yPercent: 100,
        duration: TRANSITION_DURATION_SECONDS,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }
  }, []);

  const handleNavigate = useCallback((direction: 'next' | 'prev') => {
    const delta = direction === 'next' ? 1 : -1;
    goToSection(currentSection.current + delta);
  }, [goToSection]);

  // Mobile layout setup and animation
  useLayoutEffect(() => {
    if (isMobileDevice) {
      wrapperRefs.current.forEach((ref) => {
        if (!ref) return;
        ref.style.position = 'static';
        ref.style.height = 'auto';
        ref.style.overflow = 'visible';
        ref.style.zIndex = '';
      });
      
      // Trigger all animations after a delay on mobile
      setTimeout(() => {
        animateInFns.current.slice(1).forEach((fn) => fn?.());
      }, MOBILE_AUTO_ANIMATE_DELAY);
      
      return;
    }

    // Desktop: Initial state - all sections below viewport except hero
    wrapperRefs.current.slice(1).forEach((ref) => {
      if (ref) gsap.set(ref, { yPercent: 100 });
    });
  }, [isMobileDevice]);

  // Navigation hooks (only active on desktop)
  useWheelNavigation({
    onNavigate: handleNavigate,
    isAnimating,
    disabled: isMobileDevice,
  });

  useTouchNavigation({
    onNavigate: handleNavigate,
    isAnimating,
    disabled: isMobileDevice,
  });


  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          ref={(el) => { wrapperRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100dvh',
            overflow: 'hidden',
            zIndex: Z_INDEX_BASE + i * Z_INDEX_INCREMENT,
          }}
        >
          {i === 0 && <HeroSection registerAnimateIn={registerAnimateIn(0)} />}
          {i === 1 && <OurStorySection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 2 && <MenuSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 3 && <EventsSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 5 && <ReservationsSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
        </div>
      ))}

      {/* Section indicator dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-2">
        {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeDot === i ? 'bg-rust scale-150' : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default Home;