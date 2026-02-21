import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => (
  <Link
    to={ROUTES.HOME}
    className={`flex items-center gap-2 text-2xl font-bold text-gray-800 transition-transform hover:scale-105 ${className}`}
  >
    <span className="text-4xl">🍽️</span>
    <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
      Delicious
    </span>
  </Link>
);

export default BrandLogo;