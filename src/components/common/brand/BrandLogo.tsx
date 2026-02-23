import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../../config/content';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * BrandLogo - Now uses centralized brand config
 */
const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <Link
      to="/"
      className={`font-display font-bold text-white tracking-wide hover:opacity-80 transition-opacity ${sizes[size]} ${className}`}
    >
      {BRAND.name.split(' & ').map((part, index) => (
        <React.Fragment key={part}>
          {index > 0 && <span className="text-rust"> &amp; </span>}
          {part}
        </React.Fragment>
      ))}
    </Link>
  );
};

export default BrandLogo;