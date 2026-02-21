import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-8">
      <p className="font-serif text-rust italic text-2xl mb-4">Lost in the kitchen</p>
      <h1
        className="font-display font-bold text-white/10 leading-none mb-6"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)' }}
      >
        404
      </h1>
      <p className="font-sans font-light text-white/40 text-lg mb-12 max-w-md">
        The page you're looking for has left the building — or perhaps it was never on the menu.
      </p>
      <Link
        to="/"
        className="border border-white text-white bg-transparent px-8 py-3 uppercase tracking-[0.2em] text-xs font-sans hover:bg-white hover:text-bg transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;