import React from 'react';
import BrandLogo from '../../common/brand/BrandLogo';
import { NAV_ITEMS } from '../../../config/nav';

const SOCIAL_LINKS = [
  { href: '#', icon: '📘', label: 'Facebook' },
  { href: '#', icon: '📷', label: 'Instagram' },
  { href: '#', icon: '🐦', label: 'Twitter' },
];

const CONTACT_INFO = [
  { icon: '📍', text: '123 Food Street, City' },
  { icon: '📞', text: '+1 (555) 123-4567' },
  { icon: '✉️', text: 'info@delicious.com' },
];

const HOURS = [
  { day: 'Mon - Fri', time: '11AM - 10PM' },
  { day: 'Saturday',  time: '10AM - 11PM' },
  { day: 'Sunday',    time: '10AM - 9PM' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <BrandLogo className="text-white invert-0" />
            <p className="text-white/80 leading-relaxed">
              Experience the finest cuisine with fresh ingredients and authentic flavors.
            </p>
            <div className="flex gap-4 mt-4">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-xl hover:bg-red-500 hover:-translate-y-1 transition-all duration-300"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — driven by the same NAV_ITEMS as Header */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map(({ path, label }) => (
                <li key={path}>
                  <a href={path} className="text-white/80 hover:text-red-500 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              {CONTACT_INFO.map(({ icon, text }) => (
                <li key={text} className="text-white/80 leading-relaxed">{icon} {text}</li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Opening Hours</h3>
            <ul className="flex flex-col gap-3">
              {HOURS.map(({ day, time }) => (
                <li key={day} className="text-white/80">
                  <span className="text-white font-semibold">{day}:</span> {time}
                </li>
              ))}
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