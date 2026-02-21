import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from '../../../utils/gsap';

const EVENTS = [
  {
    name: 'Wine & Wagyu Evening',
    date: 'Friday, March 7, 2026',
    time: '7:00 PM — 11:00 PM',
    dressCode: 'Smart Casual',
    description: 'An exclusive four-course pairing of A5 Wagyu selections with hand-chosen Burgundy and Barolo.',
  },
  {
    name: 'Chef\'s Table: Origins',
    date: 'Saturday, March 15, 2026',
    time: '6:30 PM — 10:30 PM',
    dressCode: 'Cocktail Attire',
    description: 'Ten seats. Seven courses. One kitchen counter. Our most intimate dining experience.',
  },
  {
    name: 'Spring Market Dinner',
    date: 'Sunday, April 6, 2026',
    time: '5:00 PM — 9:00 PM',
    dressCode: 'Casual',
    description: 'A seasonal celebration sourcing entirely from local farms, cooked live over hardwood.',
  },
];

interface EventsSectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ sectionIndex, registerAnimateIn }) => {
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set(photoRef.current, { opacity: 0, x: 80 });
    gsap.set(cardRef.current, { opacity: 0, x: -80 });
    }, []);
  
  useEffect(() => {
    const animateIn = () => {
      gsap.fromTo(
        photoRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
    };
    registerAnimateIn?.(animateIn);
  }, [registerAnimateIn]);

  return (
    <div className="w-full h-full bg-bg flex items-center">
      <div className="w-full h-full flex flex-col-reverse md:flex-row">
        {/* Left — ivory event card */}
        <div className="relative flex items-center justify-end md:w-1/2 px-0 md:px-12 py-12">
          <div
            ref={cardRef}
            className="bg-ivory text-bg p-10 md:p-12 max-w-lg w-full shadow-2xl md:translate-x-16"
          >
            <p className="font-serif text-rust text-xl italic mb-4">Upcoming Events</p>
            <h2
              className="font-display font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Reserve your<br />experience
            </h2>
            <div className="space-y-6">
              {EVENTS.map((event) => (
                <div key={event.name} className="border-t border-bg/10 pt-5">
                  <p className="font-display font-bold text-lg text-bg">{event.name}</p>
                  <p className="font-sans font-light text-bg/60 text-sm mt-1">{event.date}</p>
                  <p className="font-sans font-light text-bg/60 text-sm">{event.time}</p>
                  <p className="font-sans text-xs uppercase tracking-widest text-bg/40 mt-1">
                    Dress Code: {event.dressCode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — full-bleed photo */}
        <div ref={photoRef} className="relative w-full md:w-1/2 h-64 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&fit=crop"
            alt="Dining room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bg/20" />
        </div>
      </div>
    </div>
  );
};

export default EventsSection;