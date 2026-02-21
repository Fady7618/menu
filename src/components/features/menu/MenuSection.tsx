import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsap';
import { useMenu } from '../../../hooks/useMenu';

const PLATE_POSITIONS = [
  { top: '12%', left: '8%',  size: 200 },
  { top: '8%',  left: '35%', size: 220 },
  { top: '5%',  left: '63%', size: 190 },
  { top: '42%', left: '18%', size: 210 },
  { top: '48%', left: '48%', size: 230 },
  { top: '38%', left: '74%', size: 200 },
  { top: '72%', left: '10%', size: 190 },
  { top: '70%', left: '58%', size: 210 },
];

// Fallback plate images for items without images
const PLATE_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80&fit=crop',
];

interface MenuSectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ sectionIndex, registerAnimateIn }) => {
  const { data: items } = useMenu({ availableOnly: true });
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const displayed = (items ?? []).slice(0, 8);

  useLayoutEffect(() => {
    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    plateRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0 });
    });
    }, []);
  
  useEffect(() => {
    const animateIn = () => {
    gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
        plateRefs.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.7)', delay: 0.3 }
    );
    };
    registerAnimateIn?.(animateIn);
  }, [registerAnimateIn]);

  // Scroll-rotation for each plate
  useEffect(() => {
    if (!items) return;
    const scrollStart = sectionIndex * window.innerHeight;
    const scrollEnd = (sectionIndex + 1) * window.innerHeight;

    const triggers: ScrollTrigger[] = [];
    plateRefs.current.forEach((el, i) => {
      if (!el) return;
      const direction = i % 2 === 0 ? 360 : -360;
      const t = ScrollTrigger.create({
        start: scrollStart,
        end: scrollEnd,
        scrub: true,
        onUpdate: (self) => {
          gsap.set(el, { rotation: direction * self.progress });
        },
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [items, sectionIndex]);

  return (
    <div ref={sectionRef} className="w-full h-full bg-bg overflow-hidden relative">
      {/* Heading */}
      <div className="absolute top-14 left-0 w-full text-center z-10 pointer-events-none">
        <p className="font-serif text-rust text-xl italic mb-2">Curated for you</p>
        <h2
          ref={headingRef}
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Our Menu
        </h2>
      </div>

      {/* Scattered plates */}
      <div className="absolute inset-0">
        {PLATE_POSITIONS.map((pos, i) => {
          const item = displayed[i];
          const imgSrc = item?.imageUrl || PLATE_IMAGES[i];
          const size = pos.size;

          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ top: pos.top, left: pos.left }}
            >
              <div
                ref={(el) => { plateRefs.current[i] = el; }}
                className="rounded-full overflow-hidden shadow-2xl"
                style={{ width: size, height: size }}
              >
                <img
                  src={imgSrc}
                  alt={item?.name ?? `Dish ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {item && (
                <div className="mt-3 text-center" style={{ maxWidth: size + 20 }}>
                  <p className="font-serif text-rust italic text-sm">{item.category}</p>
                  <p className="font-sans font-light text-white/80 text-sm mt-0.5">{item.name}</p>
                  <p className="font-sans text-rust text-sm mt-0.5">${Number(item.price).toFixed(2)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center z-10">
        <a
          href="/menu"
          className="border border-white text-white bg-transparent px-8 py-3 uppercase tracking-[0.2em] text-xs font-sans hover:bg-white hover:text-bg transition-all duration-300"
        >
          Full Menu
        </a>
      </div>
    </div>
  );
};

export default MenuSection;