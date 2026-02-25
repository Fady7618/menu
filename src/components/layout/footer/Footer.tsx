import React from 'react';
import BrandLogo from '../../common/brand/BrandLogo';
import { NAV_ITEMS } from '../../../config/nav';
import { FOOTER_CONFIG } from '../../../config/content';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

// Icon mapping
const iconMap = {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-auto relative bottom-0 left-0 border-t border-white/10 bg-bg px-8 md:px-16 py-12 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="col-span-1">
            <BrandLogo size="sm" />
            <p className="font-sans text-sm text-white/50 mt-4">
              {FOOTER_CONFIG.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/70 mb-4">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/70 mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              {FOOTER_CONFIG.contact.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div key={item.id} className="flex items-start gap-2">
                    {IconComponent && <IconComponent className="w-4 h-4 text-white/60 mt-0.5" />}
                    <span className="font-sans text-sm text-white/40">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/70 mb-4">Hours</h3>
            <div className="flex flex-col gap-2">
              {FOOTER_CONFIG.hours.map((item) => (
                <div key={item.id} className="font-sans text-sm text-white/40">
                  <span className="text-white/60">{item.day}:</span> {item.time}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {FOOTER_CONFIG.social.map((social) => {
              const IconComponent = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </a>
              );
            })}
          </div>

          {/* Built By - Centered */}
          <div className="text-center">
            <p className="font-sans text-xs text-white/30">
              Built by <span className="text-rust">Your Name</span>
            </p>
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-white/30">
            {FOOTER_CONFIG.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;