import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0F3D2E] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="h-8" />
            <span className="font-clash font-bold text-lg text-white">DragonBot</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {['Features', 'How It Works', 'Pricing'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
                className="text-sm font-satoshi text-white/50 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm font-satoshi text-white/30">
            © 2026 DragonBot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}