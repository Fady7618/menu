import React, { useRef } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SectionHeading from '../../common/heading/SectionHeading';
import Button from '../../common/button/Button';
import { STORY_CONTENT } from '../../../config/content';

interface OurStorySectionProps {
  eyebrow?: string;
  title?: string;
  body?: string[];
  image?: string;
  imageAlt?: string;
}

/**
 * OurStorySection - Refactored with ScrollTrigger
 * - Removed sectionIndex and registerAnimateIn props
 * - Uses ScrollTrigger for scroll-based animations
 * - Content comes from config
 */
const OurStorySection: React.FC<OurStorySectionProps> = ({
  eyebrow = STORY_CONTENT.eyebrow,
  title = STORY_CONTENT.title,
  body = STORY_CONTENT.body,
  image = STORY_CONTENT.image,
  imageAlt = STORY_CONTENT.imageAlt,
}) => {
  const plateRef = useRef<HTMLImageElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    ref: photoRef,
    config: {
      from: { opacity: 0, x: -80 },
      to: { opacity: 1, x: 0 },
      duration: 1,
    },
    scrollTrigger: {
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  useScrollAnimation({
    ref: cardRef,
    config: {
      from: { opacity: 0, x: 80 },
      to: { opacity: 1, x: 0 },
      duration: 1,
      delay: 0.2,
    },
    scrollTrigger: {
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  useScrollAnimation({
    ref: plateRef,
    config: {
      from: { rotation: 0 },
      to: { rotation: 90 },
      duration: 1,
      ease: 'power1.inOut',
      // delay: 0.4,
    },
    scrollTrigger: {
      start: 'top 70%',
      toggleActions: 'play none none none',
      scrub: true, // Scrub animation to scroll position
    },
  });

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">
        {/* Left — full-bleed photo */}
        <div ref={photoRef} className="relative bg-[url(/2.png)] bg-no-repeat bg-contain bg-center bg-size-[60%] w-full md:w-1/2 h-64 md:h-full flex items-center justify-center ">
          <img
            src={image}
            alt={imageAlt}
            ref={plateRef}
            className="w-[70%] h-auto md:w-[60%] md:h-[60%] object-cover"
          />
        </div>

        {/* Right — ivory card overlapping photo */}
        <div className="relative flex items-center justify-start md:w-1/2 px-0 md:px-12 py-12">
          <div
            ref={cardRef}
            className="bg-ivory text-bg p-10 md:p-14 max-w-lg w-full shadow-2xl md:-translate-x-16"
          >
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              eyebrowClassName="text-rust mb-4"
              titleClassName="text-bg mb-6"
            />
            {body.map((paragraph, index) => (
              <p key={index} className="font-sans font-light text-bg/70 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
            <Button href="/about" variant="secondary">
              Read Full Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStorySection;