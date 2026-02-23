import React from 'react';
import BrandLogo from '../../common/brand/BrandLogo';
import { NAV_ITEMS } from '../../../config/nav';
import { FOOTER_CONFIG } from '../../../config/content';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <BrandLogo className="text-white invert-0" />
            <p className="text-white/80 leading-relaxed">
              {FOOTER_CONFIG.description}
            </p>
            <div className="flex gap-4 mt-4">
              {FOOTER_CONFIG.social.map(({ id, href, icon, label }) => (
                <a
                  key={id}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-xl hover:bg-red-500 hover:-translate-y-1 transition-all duration-300"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
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
              {FOOTER_CONFIG.contact.map(({ id, icon, text }) => (
                <li key={id} className="text-white/80 leading-relaxed">
                  {icon} {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Opening Hours</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_CONFIG.hours.map(({ id, day, time }) => (
                <li key={id} className="text-white/80">
                  <span className="text-white font-semibold">{day}:</span> {time}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/60">
          <p>{FOOTER_CONFIG.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;