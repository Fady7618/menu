import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from '../../../utils/gsap';

interface OurStorySectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
}

const OurStorySection: React.FC<OurStorySectionProps> = ({ sectionIndex, registerAnimateIn }) => {
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set(photoRef.current, { opacity: 0, x: -80 });
    gsap.set(cardRef.current, { opacity: 0, x: 80 });
  }, []);
  
  useEffect(() => {
    const animateIn = () => {
      gsap.fromTo(
        photoRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
    };
    registerAnimateIn?.(animateIn);
  }, [registerAnimateIn]);

  return (
    <div className="w-full h-full bg-bg flex items-center">
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left — full-bleed photo */}
        <div ref={photoRef} className="relative w-full md:w-1/2 h-64 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop"
            alt="Restaurant atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bg/30" />
        </div>

        {/* Right — ivory card overlapping photo */}
        <div className="relative flex items-center justify-start md:w-1/2 px-0 md:px-12 py-12">
          <div
            ref={cardRef}
            className="bg-ivory text-bg p-10 md:p-14 max-w-lg w-full shadow-2xl md:-translate-x-16"
          >
            <p className="font-serif text-rust text-xl italic mb-4">Our Story</p>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Born from the<br />love of fire
            </h2>
            <p className="font-sans font-light text-bg/70 leading-relaxed mb-8">
              In 2009, a single cast-iron pan and an obsession with the Maillard reaction led
              our founder to transform a forgotten warehouse into The Ember &amp; Oak.
              Every dish we serve carries that same singular devotion — to heat, to time,
              and to the integrity of exceptional ingredients.
            </p>
            <a
              href="/about"
              className="font-sans text-sm uppercase tracking-[0.2em] text-bg border-b border-bg/30 pb-0.5 hover:border-rust hover:text-rust transition-colors duration-200"
            >
              — Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStorySection;