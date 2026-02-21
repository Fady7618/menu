import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Button from '../../common/button/Button';
import { gsap } from '../../../utils/gsap';

const INGREDIENTS = [
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=160&q=80&fit=crop',
    alt: 'Garlic',
    style: { top: '12%', left: '56%', width: 90 },
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&q=80&fit=crop',
    alt: 'Tomatoes',
    style: { top: '72%', left: '60%', width: 110 },
    delay: 0.6,
  },
  {
    src: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=160&q=80&fit=crop',
    alt: 'Rosemary',
    style: { top: '20%', right: '5%', width: 80 },
    delay: 1.0,
  },
  {
    src: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=160&q=80&fit=crop',
    alt: 'Wooden spoon',
    style: { bottom: '18%', left: '52%', width: 100 },
    delay: 1.4,
  },
];

interface HeroSectionProps {
  registerAnimateIn?: (fn: () => void) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ registerAnimateIn }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLImageElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    gsap.set([eyebrowRef.current, headingRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 20 });
    gsap.set(headingRef.current, { y: 40 });
    gsap.set(panRef.current, { opacity: 0, scale: 0.85 });
    floatRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.5 });
    });
  }, []);
  
  useEffect(() => {
    const animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline();
      tl.fromTo(eyebrowRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .fromTo(panRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8');

      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.8 + i * 0.2, ease: 'back.out(1.5)' }
        );
        gsap.to(el, {
          y: -15 - i * 5,
          rotation: (i % 2 === 0 ? 1 : -1) * (4 + i * 2),
          duration: 3 + i * 0.7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.2 + i * 0.4,
        });
      });
    };

    // Hero always fires its own animation — don't rely on parent calling it
    const timer = setTimeout(animateIn, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-bg flex items-center justify-center overflow-hidden relative">
      {/* Particle dots background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <p ref={eyebrowRef} className="font-serif text-rust text-xl italic mb-4">
            Discover
          </p>
          <h1
            ref={headingRef}
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Fire-crafted<br />
            <span className="italic">masterpieces</span>
          </h1>
          <p ref={subRef} className="font-sans font-light text-white/60 text-lg leading-relaxed mb-10 max-w-md">
            A culinary journey through smoke, flame, and the finest cuts.
            Where every plate tells a story of obsession and craft.
          </p>
          <div ref={ctaRef} className="flex gap-4">
            <Button href="/menu">Explore Menu</Button>
            <Button href="/about" className="border-white/30 text-white/60 hover:border-white hover:text-white">
              Our Story
            </Button>
          </div>
        </div>

        {/* Right column — circular pan + floating ingredients */}
        <div ref={panRef} className="relative flex items-center justify-center">
          {/* Main circular image */}
          <div
            className="relative rounded-full overflow-hidden"
            style={{ width: 'clamp(280px, 38vw, 460px)', height: 'clamp(280px, 38vw, 460px)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&fit=crop"
              alt="Signature dish"
              className="w-full h-full object-cover"
            />
            {/* Subtle rim shadow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Floating ingredient cutouts */}
          {INGREDIENTS.map((ing, i) => (
            <img
              key={ing.alt}
              ref={(el) => { floatRefs.current[i] = el; }}
              src={ing.src}
              alt={ing.alt}
              className="absolute rounded-full object-cover shadow-2xl"
              style={{
                ...ing.style,
                height: ing.style.width,
                border: 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;