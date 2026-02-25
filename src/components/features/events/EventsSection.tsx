import React, { useRef } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SectionHeading from '../../common/heading/SectionHeading';
import { EVENTS } from '../../../config/content';
import type { Event } from '../../../config/content';

interface EventsSectionProps {
  events?: readonly Event[];
}

/**
 * EventsSection - Refactored with ScrollTrigger
 * - Removed sectionIndex and registerAnimateIn props
 * - Uses ScrollTrigger for scroll-based animations
 * - Events come from config with prop override support
 */
const EventsSection: React.FC<EventsSectionProps> = ({
  events = EVENTS,
}) => {
  const plateRef = useRef<HTMLImageElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    ref: photoRef,
    config: {
      from: { opacity: 0, x: 80 },
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
      from: { opacity: 0, x: -80 },
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
    <div className="w-full min-h-screen flex items-center ">
      <div className="w-full h-full flex flex-col-reverse md:flex-row ">
        {/* Left — ivory event card */}
        <div className="relative flex items-center justify-end md:w-1/2 px-0 md:px-12 py-12">
          <div
            ref={cardRef}
            className="bg-rust text-bg p-10 md:p-12 max-w-lg w-full shadow-2xl md:translate-x-16"
          >
            <SectionHeading
              eyebrow="Upcoming Events"
              title={<>Reserve your<br />experience</>}
              eyebrowClassName="text-ivory mb-4"
              titleClassName="text-ivory mb-8"
            />
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="border-t border-bg/10 pt-5">
                  <p className="font-display font-bold text-lg text-bg">{event.name}</p>
                  <p className="font-sans font-light text-bg/60 text-sm mt-1">{event.date}</p>
                  <p className="font-sans font-light text-bg/60 text-sm">{event.time}</p>
                  <p className="font-sans text-xs uppercase tracking-widest text-bg/40 mt-1">
                    {event.dressCode}
                  </p>
                  <p className="font-sans font-light text-bg/70 text-sm mt-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Photo */}
        <div ref={photoRef} className="relative w-full md:w-1/2 h-96 md:h-full flex self-center items-center justify-center bg-[url(/1.png)] bg-no-repeat bg-size-[85%] bg-center">
          <img
            src="sections/events.png"
            alt="Special Events"
            ref={plateRef}
            className="w-[70%] h-auto md:w-[60%] md:h-[60%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EventsSection;