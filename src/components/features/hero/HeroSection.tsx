import React, { useRef } from 'react';
import Button from '../../common/button/Button';
import { useTimelineAnimation } from '../../../hooks/useScrollAnimation';
import { HERO_CONTENT } from '../../../config/content';

interface HeroSectionProps {
  registerAnimateIn?: (fn: () => void) => void;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  ctaButtons?: Array<{ text: string; href: string }>;
}

/**
 * HeroSection - Refactored to use config and remove dead code
 * - Removed unused INGREDIENTS array and floatRefs
 * - Content comes from config with prop overrides
 * - Uses useTimelineAnimation instead of manual GSAP
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title = HERO_CONTENT.title,
  subtitle = HERO_CONTENT.subtitle,
  eyebrow = HERO_CONTENT.eyebrow,
  ctaButtons = HERO_CONTENT.ctaButtons,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);

  useTimelineAnimation({
    steps: [
      {
        ref: eyebrowRef,
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        duration: 0.6,
      },
      {
        ref: headingRef,
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
        duration: 0.8,
        position: '-=0.3',
      },
      {
        ref: subRef,
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        duration: 0.6,
        position: '-=0.4',
      },
      {
        ref: ctaRef,
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        duration: 0.6,
        position: '-=0.4',
      },
      {
        ref: panRef,
        from: { opacity: 0, scale: 0.85 },
        to: { opacity: 1, scale: 1 },
        duration: 1,
        position: '-=0.8',
      },
    ],
    autoPlay: true,
    autoPlayDelay: 500,
  });

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
            {eyebrow}
          </p>
          <h1
            ref={headingRef}
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {title}
          </h1>
          <p ref={subRef} className="font-sans font-light text-white/60 text-lg leading-relaxed mb-10 max-w-md">
            {subtitle}
          </p>
          <div ref={ctaRef} className="flex gap-4">
            {ctaButtons.map((button, index) => (
              <Button 
                key={button.href}
                href={button.href}
                variant={index === 0 ? 'primary' : 'ghost'}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Right column — circular pan */}
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
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;