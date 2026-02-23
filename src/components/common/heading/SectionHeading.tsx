import React from 'react';
import { typography } from '../../../config/design-tokens';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;  // Support JSX fragments
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * SectionHeading - Reusable component for consistent section headers
 * Eliminates repeated markup pattern across all sections
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  align = 'left',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignmentClasses[align]} ${className}`}>
      {eyebrow && (
        <p 
          className={`font-serif text-rust text-xl italic mb-4 ${eyebrowClassName}`}
          style={{ fontFamily: typography.fontFamily.serif }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display font-bold text-white leading-tight ${titleClassName}`}
        style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontFamily: typography.fontFamily.display,
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;