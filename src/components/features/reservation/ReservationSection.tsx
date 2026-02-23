import React, { useRef, useState } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SectionHeading from '../../common/heading/SectionHeading';
import FormInput from '../../common/form/FormInput';
import Button from '../../common/button/Button';
import { RESERVATION_CONTENT } from '../../../config/content';

interface ReservationsSectionProps {}

/**
 * ReservationSection - Refactored with ScrollTrigger
 * - Removed sectionIndex and registerAnimateIn props
 * - Uses ScrollTrigger for scroll-based animations
 * - Content comes from config
 */
const ReservationsSection: React.FC<ReservationsSectionProps> = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useScrollAnimation({
    ref: formRef,
    config: {
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0 },
      duration: 1,
    },
    scrollTrigger: {
      trigger: formRef.current || undefined,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen  flex flex-col">
      {/* Reservations form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div ref={formRef} className="w-full max-w-xl bg-white/5 backdrop-blur-sm rounded-lg p-8">
          <SectionHeading
            eyebrow={RESERVATION_CONTENT.eyebrow}
            title={RESERVATION_CONTENT.title}
            eyebrowClassName='text-rust'
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
    </div>
  );
};

export default ReservationsSection;