import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import HeroSection from '../../components/features/hero/HeroSection';
import OurStorySection from '../../components/features/story/OurStorySection';
import MenuSection from '../../components/features/menu/MenuSection';
import EventsSection from '../../components/features/events/EventsSection';
import IngredientsSection from '../../components/features/ingredients/IngredientsSection';
import ReservationsSection from '../../components/features/reservation/ReservationSection';
import { gsap, isMobile } from '../../utils/gsap';

const NUM_SECTIONS = 6;
const Z_BASE = 10;
const TRANSITION_DURATION = 1; // seconds

const Home: React.FC = () => {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animateInFns = useRef<((() => void) | null)[]>(Array(NUM_SECTIONS).fill(null));
  const currentSection = useRef(0);
  const isAnimating = useRef(false);
  const [activeDot, setActiveDot] = useState(0);

  const registerAnimateIn = (index: number) => (fn: () => void) => {
    animateInFns.current[index] = fn;
  };

  const goToSection = useCallback((index: number) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= NUM_SECTIONS) return;
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
        duration: TRANSITION_DURATION,
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
        duration: TRANSITION_DURATION,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (isMobile()) {
      wrapperRefs.current.forEach((ref) => {
        if (!ref) return;
        ref.style.position = 'static';
        ref.style.height = 'auto';
        ref.style.overflow = 'visible';
        ref.style.zIndex = '';
      });
      setTimeout(() => animateInFns.current.slice(1).forEach((fn) => fn?.()), 400);
      return;
    }

    // Initial state: all sections below except hero
    wrapperRefs.current.slice(1).forEach((ref) => {
      if (ref) gsap.set(ref, { yPercent: 100 });
    });

    // Wheel handler — one wheel event = one section
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (e.deltaY > 0) {
        goToSection(currentSection.current + 1);
      } else {
        goToSection(currentSection.current - 1);
      }
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return; // ignore tiny swipes
      if (delta > 0) {
        goToSection(currentSection.current + 1);
      } else {
        goToSection(currentSection.current - 1);
      }
    };

    // Keyboard arrow keys
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goToSection(currentSection.current + 1);
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goToSection(currentSection.current - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goToSection]);

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
            zIndex: Z_BASE + i * 10,
          }}
        >
          {i === 0 && <HeroSection registerAnimateIn={registerAnimateIn(0)} />}
          {i === 1 && <OurStorySection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 2 && <MenuSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 3 && <EventsSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 4 && <IngredientsSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
          {i === 5 && <ReservationsSection sectionIndex={i} registerAnimateIn={registerAnimateIn(i)} />}
        </div>
      ))}

      {/* Section indicator dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-2">
        {Array.from({ length: NUM_SECTIONS }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSection(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: activeDot === i ? 'white' : 'rgba(255,255,255,0.3)',
            }}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default Home;