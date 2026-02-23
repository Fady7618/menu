import React, { useRef } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SectionHeading from '../../common/heading/SectionHeading';
import { EVENTS } from '../../../config/content';
import type { Event } from '../../../config/content';

interface EventsSectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
  events?: readonly Event[];
}

/**
 * EventsSection - Refactored with DRY components
 * - Uses useScrollAnimation hook
 * - Uses SectionHeading component
 * - Events come from config with prop override support
 */
const EventsSection: React.FC<EventsSectionProps> = ({
  sectionIndex: _sectionIndex,
  registerAnimateIn,
  events = EVENTS,
}) => {
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    ref: photoRef,
    config: {
      from: { opacity: 0, x: 80 },
      to: { opacity: 1, x: 0 },
      duration: 1,
    },
    registerAnimateIn,
  });

  useScrollAnimation({
    ref: cardRef,
    config: {
      from: { opacity: 0, x: -80 },
      to: { opacity: 1, x: 0 },
      duration: 1,
      delay: 0.2,
    },
    registerAnimateIn,
  });

  return (
    <div className="w-full h-full bg-bg flex items-center">
      <div className="w-full h-full flex flex-col-reverse md:flex-row">
        {/* Left — ivory event card */}
        <div className="relative flex items-center justify-end md:w-1/2 px-0 md:px-12 py-12">
          <div
            ref={cardRef}
            className="bg-ivory text-bg p-10 md:p-12 max-w-lg w-full shadow-2xl md:translate-x-16"
          >
            <SectionHeading
              eyebrow="Upcoming Events"
              title={<>Reserve your<br />experience</>}
              eyebrowClassName="text-rust mb-4"
              titleClassName="text-bg mb-8"
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
        <div ref={photoRef} className="relative w-full md:w-1/2 h-96 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80&fit=crop"
            alt="Special Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bg/20" />
        </div>
      </div>
    </div>
  );
};

export default EventsSection;