import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsap';

const INGREDIENTS = [
  { src: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&q=80&fit=crop', alt: 'Steak', style: { top: '28%', left: '38%', width: 240 }, direction: 1 },
  { src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&q=80&fit=crop', alt: 'Tomatoes', style: { top: '15%', left: '12%', width: 120 }, direction: -1 },
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80&fit=crop', alt: 'Herbs', style: { top: '10%', left: '65%', width: 100 }, direction: 1 },
  { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&q=80&fit=crop', alt: 'Pepper', style: { top: '50%', left: '10%', width: 110 }, direction: -1 },
  { src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200&q=80&fit=crop', alt: 'Garlic', style: { top: '55%', left: '72%', width: 100 }, direction: 1 },
  { src: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=200&q=80&fit=crop', alt: 'Rosemary', style: { top: '20%', right: '4%', width: 90 }, direction: -1 },
];

const AMBIANCE_PHOTOS = [
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&fit=crop',
];

interface IngredientsSectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ sectionIndex, registerAnimateIn }) => {
  const ingredientRefs = useRef<(HTMLImageElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const animateIn = () => {
    gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
        ingredientRefs.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
    );
    };
    registerAnimateIn?.(animateIn);
  }, [registerAnimateIn]);

  useLayoutEffect(() => {
    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    ingredientRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0 });
    });
    }, []);
  
  // Scroll-rotation
  useEffect(() => {
    const scrollStart = sectionIndex * window.innerHeight;
    const scrollEnd = (sectionIndex + 1) * window.innerHeight;
    const triggers: ScrollTrigger[] = [];

    ingredientRefs.current.forEach((el, i) => {
      if (!el) return;
      const dir = INGREDIENTS[i]?.direction ?? 1;
      const t = ScrollTrigger.create({
        start: scrollStart,
        end: scrollEnd,
        scrub: true,
        onUpdate: (self) => { gsap.set(el, { rotation: dir * 360 * self.progress }); },
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [sectionIndex]);

  return (
    <div className="w-full h-full bg-bg flex flex-col">
      {/* Top — heading */}
      <div className="text-center pt-14 pb-4 px-8 z-10 relative">
        <p className="font-serif text-rust text-xl italic mb-2">From the source</p>
        <h2
          ref={headingRef}
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Best Ingredients
        </h2>
        <p className="font-sans font-light text-white/50 mt-3 max-w-xl mx-auto text-base">
          We travel to find them. We age, cure, and select with obsession.
          Only the finest reaches your plate.
        </p>
      </div>

      {/* Middle — floating ingredients */}
      <div className="relative flex-1 overflow-hidden">
        {INGREDIENTS.map((ing, i) => (
          <img
            key={ing.alt}
            ref={(el) => { ingredientRefs.current[i] = el; }}
            src={ing.src}
            alt={ing.alt}
            className="absolute rounded-full object-cover shadow-2xl"
            style={{
              ...ing.style,
              height: ing.style.width,
            }}
          />
        ))}
      </div>

      {/* Bottom — ambiance strip */}
      <div className="flex h-36 shrink-0">
        {AMBIANCE_PHOTOS.map((src, i) => (
          <div key={i} className="flex-1 overflow-hidden">
            <img
              src={src}
              alt={`Restaurant ${i + 1}`}
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsSection;