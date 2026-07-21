import React from 'react';
import { motion } from 'framer-motion';

const offerings = [
  {
    title: 'A 24/7 Virtual Ecommerce Assistant',
    description: 'DragonBot never sleeps, never takes a day off, and never needs a coffee break. Whether it\'s 3 AM or a holiday weekend, your AI assistant is always on and always ready to help.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#2F7D4F]">
        <circle cx="24" cy="24" r="20"/><path d="M24 14v10l6 6"/>
      </svg>
    ),
  },
  {
    title: 'A Simple Chat Interface',
    description: 'No complicated dashboards or steep learning curves. Just chat naturally with DragonBot like you would with a colleague — and it gets the job done.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#2F7D4F]">
        <rect x="6" y="10" width="36" height="24" rx="4"/><path d="M16 22h16"/><path d="M16 28h10"/>
      </svg>
    ),
  },
  {
    title: 'Guidance on How to Get the Best Out of AI',
    description: 'Advanced AI workflows are what will really take your business forward. We will show you how you can create weekly tasks for your DragonBot to track 100\'s of competitors, find long-tail keywords, optimize listings continuously, and much more.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#2F7D4F]">
        <circle cx="24" cy="24" r="20"/><polygon points="20,16 34,24 20,32" fill="currentColor" stroke="none"/>
      </svg>
    ),
    link: { label: 'See example videos', href: '#' },
  },
  {
    title: 'Human Support — Forever',
    description: 'Need a new tool connected or a workflow tweaked? Our team is always here to help. Real humans, real support, for as long as you use DragonBot.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#2F7D4F]">
        <circle cx="24" cy="16" r="8"/><path d="M10 40c0-8 6-14 14-14s14 6 14 14"/>
      </svg>
    ),
  },
];

export default function OfferSection() {
  return (
    <section id="we-give-you-ai" className="py-24 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-satoshi font-bold text-sm uppercase tracking-[2px] text-[#2F7D4F] mb-3">
            What You Get
          </p>
          <h2 className="font-clash font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            We Help You to <span className="text-[#2F7D4F]">Dominate</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {offerings.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-[20px] p-8 border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 mb-5">
                {item.icon}
              </div>
              <h3 className="font-clash font-semibold text-xl text-[#1A1A1A] leading-snug mb-3">
                {item.title}
              </h3>
              {/* <p className="text-[15px] text-[#1A1A1A]/50 font-satoshi leading-relaxed">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-[#2F7D4F] font-satoshi font-medium mt-3 hover:underline"
                >
                  {item.link.label} →
                </a>
              )} */}
            </motion.div>
          ))}
        </div>

        {/* Demo thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex flex-wrap gap-6"
        >
          <a
            href="/chats/magvault-keyword-research"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-72 rounded-xl overflow-hidden border border-gray-200 bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <img src="/images/thumbnail_kw_research.png" alt="Amazon Keyword Research Using DragonBot" className="w-full h-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="font-satoshi font-semibold text-sm text-[#1A1A1A]">Amazon Keyword Research Using DragonBot</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}