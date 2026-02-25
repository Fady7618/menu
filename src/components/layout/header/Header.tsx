import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from '../../common/brand/BrandLogo';

import { NAV_ITEMS } from '../../../config/nav';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  
  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-100 px-8 py-5 flex items-center justify-between">
        {/* Left — logo */}
        <BrandLogo size="sm" />

        {/* Center — desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-rust'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right — CTA + hamburger */}
        <div className="flex items-center gap-6">
          <Link
            to="/reservations"
            className="hidden md:inline-block border border-white/50 text-white/80 hover:border-white hover:text-white transition-all duration-300 px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans"
          >
            Reserve
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.25 p-1"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
            <span className="block w-6 h-px bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-200 bg-bg p-6 flex flex-col items-center justify-center transition-opacity duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-8 text-white/60 hover:text-white text-2xl"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <BrandLogo size="md" className="mb-16" />

        <nav className="flex flex-col items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-display text-xl text-white hover:text-rust transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/reservations"
            className="mt-4 border border-white text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-sans hover:bg-white hover:text-bg transition-all duration-300"
          >
            Reserve a Table
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;