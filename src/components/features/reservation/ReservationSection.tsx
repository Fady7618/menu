import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { gsap } from '../../../utils/gsap';
import BrandLogo from '../../common/brand/BrandLogo';
import { NAV_ITEMS } from '../../../config/nav';
import { Link } from 'react-router-dom';

interface ReservationsSectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
}

const inputClass =
  'w-full bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm font-sans font-light focus:outline-none focus:border-rust transition-colors duration-200';

const ReservationsSection: React.FC<ReservationsSectionProps> = ({ sectionIndex, registerAnimateIn }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    gsap.set(formRef.current, { opacity: 0, y: 40 });
    }, []);
  
  useEffect(() => {
    const animateIn = () => {
  gsap.fromTo(
    formRef.current,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  );
};
    registerAnimateIn?.(animateIn);
  }, [registerAnimateIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full bg-bg flex flex-col">
      {/* Reservations form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div ref={formRef} className="w-full max-w-xl">
          <p className="font-serif text-rust text-xl italic mb-3 text-center">Join us</p>
          <h2
            className="font-display font-bold text-white text-center mb-10"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Reserve a Table
          </h2>

          {submitted ? (
            <div className="text-center py-12">
              <p className="font-serif text-rust text-2xl italic mb-3">Thank you.</p>
              <p className="font-sans font-light text-white/60">
                We'll confirm your reservation within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className={inputClass} />
                <input type="email" placeholder="Email Address" required className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="date" required className={`${inputClass} col-span-1`} />
                <input type="time" required className={`${inputClass} col-span-1`} />
                <select required className={`${inputClass} col-span-1`}>
                  <option value="" className="bg-bg">Guests</option>
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n} className="bg-bg">{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <textarea
                rows={3}
                placeholder="Special requests (optional)"
                className={`${inputClass} resize-none`}
              />
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full border border-white text-white bg-transparent py-4 uppercase tracking-[0.2em] text-xs font-sans hover:bg-white hover:text-bg transition-all duration-300"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 md:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <BrandLogo size="sm" />
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-sans text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="font-sans text-xs text-white/30">
            © 2026 The Ember &amp; Oak. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationsSection;