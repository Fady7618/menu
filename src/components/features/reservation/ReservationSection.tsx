import React, { useRef, useState } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SectionHeading from '../../common/heading/SectionHeading';
import FormInput from '../../common/form/FormInput';
import Button from '../../common/button/Button';
import BrandLogo from '../../common/brand/BrandLogo';
import { NAV_ITEMS } from '../../../config/nav';
import { Link } from 'react-router-dom';
import { RESERVATION_CONTENT } from '../../../config/content';

interface ReservationsSectionProps {
  sectionIndex: number;
  registerAnimateIn?: (fn: () => void) => void;
}

/**
 * ReservationSection - Refactored with DRY components
 * - Uses useScrollAnimation hook
 * - Uses FormInput component
 * - Uses SectionHeading component
 * - Content comes from config
 */
const ReservationsSection: React.FC<ReservationsSectionProps> = ({
  sectionIndex: _sectionIndex,
  registerAnimateIn,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useScrollAnimation({
    ref: formRef,
    config: {
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0 },
      duration: 1,
    },
    registerAnimateIn,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full bg-bg flex flex-col">
      {/* Reservations form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div ref={formRef} className="w-full max-w-xl">
          <SectionHeading
            eyebrow={RESERVATION_CONTENT.eyebrow}
            title={RESERVATION_CONTENT.title}
            align="center"
            className="mb-10"
          />

          {submitted ? (
            <div className="text-center py-12">
              <p className="font-serif text-rust text-2xl italic mb-3">Thank you.</p>
              <p className="font-sans font-light text-white/60">
                {RESERVATION_CONTENT.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  type="text"
                  placeholder="Full Name"
                  required
                />
                <FormInput
                  type="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput type="date" required />
                <FormInput type="time" required />
                <FormInput as="select" required>
                  <option value="">Guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </FormInput>
              </div>
              <FormInput
                multiline
                rows={3}
                placeholder="Special requests (optional)"
              />
              <div className="pt-2">
                <Button type="submit" className="w-full py-4">
                  {RESERVATION_CONTENT.submitButtonText}
                </Button>
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