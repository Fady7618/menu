import React from 'react';
import BrandLogo from '../../common/brand/BrandLogo';
import { NAV_ITEMS } from '../../../config/nav';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-auto relative bottom-0 left-0 border-t border-white/10 bg-bg px-8 md:px-16 py-8 z-10 z-50">
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
          © {new Date().getFullYear()} Bistro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;