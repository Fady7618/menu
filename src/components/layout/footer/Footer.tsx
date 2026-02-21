import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold mb-2">
              <span className="text-4xl">🍽️</span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Delicious
              </span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Experience the finest cuisine with fresh ingredients and authentic flavors.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-xl hover:bg-red-500 hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-xl hover:bg-red-500 hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-xl hover:bg-red-500 hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-white/80 hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="text-white/80 hover:text-red-500 transition-colors">Menu</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-white/80 leading-relaxed">📍 123 Food Street, City</li>
              <li className="text-white/80 leading-relaxed">📞 +1 (555) 123-4567</li>
              <li className="text-white/80 leading-relaxed">✉️ info@delicious.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Opening Hours</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-white/80"><span className="text-white font-semibold">Mon - Fri:</span> 11AM - 10PM</li>
              <li className="text-white/80"><span className="text-white font-semibold">Saturday:</span> 10AM - 11PM</li>
              <li className="text-white/80"><span className="text-white font-semibold">Sunday:</span> 10AM - 9PM</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {currentYear} Delicious Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;