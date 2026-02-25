import React, { useRef } from 'react';
import Button from '../../common/button/Button';
import { useTimelineAnimation } from '../../../hooks/useScrollAnimation';
import { HERO_CONTENT } from '../../../config/content';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  ctaButtons?: Array<{ text: string; href: string }>;
}

/**
 * HeroSection - Refactored to use ScrollTrigger
 * - Removed registerAnimateIn prop (uses ScrollTrigger now)
 * - Content comes from config with prop overrides
 * - Uses useTimelineAnimation with ScrollTrigger
 * - Improved responsive design
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title = HERO_CONTENT.title,
  subtitle = HERO_CONTENT.subtitle,
  eyebrow = HERO_CONTENT.eyebrow,
  ctaButtons = HERO_CONTENT.ctaButtons,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    scrollTrigger: {
      trigger: containerRef.current || undefined,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-screen flex items-center justify-center overflow-hidden relative py-12 md:py-0"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left column - Text content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p 
              ref={eyebrowRef} 
              className="font-serif text-rust text-base sm:text-lg md:text-xl italic mb-3 md:mb-4"
            >
              {eyebrow}
            </p>
            <h1
              ref={headingRef}
              className="font-display font-bold text-white leading-[1.1] mb-4 md:mb-6"
              style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}
            >
              {title}
            </h1>
            <p 
              ref={subRef} 
              className="font-sans font-light text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-10 max-w-md mx-auto md:mx-0"
            >
              {subtitle}
            </p>
            <div 
              ref={ctaRef} 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
            >
              {ctaButtons.map((button, index) => (
                <Button 
                  key={button.href}
                  href={button.href}
                  variant={index === 0 ? 'primary' : 'ghost'}
                  className="w-full sm:w-auto"
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Right column - Circular image */}
          <div 
            ref={panRef} 
            className="relative flex items-center justify-center order-1 md:order-2 mb-4 md:mb-0"
          >
            {/* Main circular image */}
            <div
              className="relative rounded-full overflow-hidden shadow-2xl"
              style={{ 
                width: 'clamp(240px, 70vw, 460px)', 
                height: 'clamp(240px, 70vw, 460px)',
                maxWidth: '100%'
              }}
            >
              <img
                src="sections/hero.png"
                alt="Signature dish"
                className="w-full h-full object-cover"
              />
              {/* Subtle rim shadow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] md:shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 md:h-32 bg-linear-to-t from-bg to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;