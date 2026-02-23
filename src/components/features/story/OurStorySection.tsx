import React, { useRef } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SectionHeading from '../../common/heading/SectionHeading';
import ImageOverlay from '../../common/overlay/ImageOverlay';
import Button from '../../common/button/Button';
import { STORY_CONTENT } from '../../../config/content';

interface OurStorySectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
  eyebrow?: string;
  title?: string;
  body?: string[];
  image?: string;
  imageAlt?: string;
}

/**
 * OurStorySection - Refactored with DRY components
 * - Uses useScrollAnimation hook
 * - Uses SectionHeading component
 * - Uses ImageOverlay component
 * - Content comes from config
 */
const OurStorySection: React.FC<OurStorySectionProps> = ({
  sectionIndex: _sectionIndex,
  registerAnimateIn,
  eyebrow = STORY_CONTENT.eyebrow,
  title = STORY_CONTENT.title,
  body = STORY_CONTENT.body,
  image = STORY_CONTENT.image,
  imageAlt = STORY_CONTENT.imageAlt,
}) => {
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    ref: photoRef,
    config: {
      from: { opacity: 0, x: -80 },
      to: { opacity: 1, x: 0 },
      duration: 1,
    },
    registerAnimateIn,
  });

  useScrollAnimation({
    ref: cardRef,
    config: {
      from: { opacity: 0, x: 80 },
      to: { opacity: 1, x: 0 },
      duration: 1,
      delay: 0.2,
    },
    registerAnimateIn,
  });

  return (
    <div className="w-full h-full bg-bg flex items-center">
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left — full-bleed photo */}
        <div ref={photoRef} className="relative w-full md:w-1/2 h-64 md:h-full">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          <ImageOverlay opacity={0.3} />
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