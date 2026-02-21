import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/button/Button';
import { ROUTES } from '../../../config/routes';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-400 pt-32 pb-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Delicious
              </span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-10 opacity-95">
              Experience culinary excellence with our carefully crafted dishes made from the finest ingredients
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.MENU}>
                <Button size="large" className="w-full sm:w-auto">View Menu</Button>
              </Link>
              <Link to={ROUTES.ABOUT}>
                <Button variant="outline" size="large" className="w-full sm:w-auto">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center animate-fade-in-right">
            <div className="relative w-full max-w-md aspect-square">
              <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-8xl md:text-9xl shadow-2xl animate-float">
                🍕🍔🍰
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24 md:h-32">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;