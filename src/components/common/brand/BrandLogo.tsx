import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

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
      The Ember <span className="text-rust">&amp;</span> Oak
    </Link>
  );
};

export default BrandLogo;