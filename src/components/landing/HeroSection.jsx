import React from 'react';
import { motion } from 'framer-motion';
import HeroAnimation from './HeroAnimation';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4faf6] via-white to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left - Copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col items-start gap-2 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F7D4F]/10 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse" />
                  <span className="text-xs font-satoshi font-medium text-[#2F7D4F]">Now in early access</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F59E0B]/10 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="text-xs font-satoshi font-medium text-[#B45309]">Only a few spots left — book your call now!</span>
                </div>
              </div>

              <h1 className="font-clash font-semibold text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-[#1A1A1A]">
                Your AI-powered{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">
                    ecommerce assistant
                  </span>
                </span>
                <br />
                that actually gets work done.
              </h1>

              <p className="mt-6 text-lg text-[#1A1A1A]/60 font-satoshi leading-relaxed max-w-md">
                Chat naturally with DragonBot to handle keyword research, customer support, PPC, and more — connected to all your tools.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a
                  href="/beta"
                  className="px-7 py-3.5 bg-[#2F7D4F] hover:bg-[#256B42] text-white font-satoshi font-semibold rounded-full transition-all shadow-xl shadow-[#2F7D4F]/25 hover:shadow-[#2F7D4F]/35 hover:-translate-y-0.5"
                >
                  Request Access →
                </a>
                <a
                  href="#features"
                  className="px-7 py-3.5 border border-[#1A1A1A]/15 text-[#1A1A1A] font-satoshi font-medium rounded-full hover:border-[#2F7D4F]/40 hover:text-[#2F7D4F] transition-all"
                >
                  See it in action
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right - Integration Animation (relative container so content doesn't affect grid row height) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="lg:absolute lg:inset-0 flex flex-col">
              <HeroAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}