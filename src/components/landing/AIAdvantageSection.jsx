import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rotatingPhrases = [
  'creating better listing images than you',
  'responding to customers faster than you',
  'creating better social media content than you',
  'researching more products than you',
  'finding suppliers faster than you',
  'spending less on employees than you',
];

export default function AIAdvantageSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(i => (i + 1) % rotatingPhrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="you-need-ai" className="py-24 bg-[#0F3D2E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#98CC65] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#2F7D4F] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-satoshi font-bold text-sm uppercase tracking-[2px] text-[#D63C3C] mb-3">
            Don't get left behind
          </p>

          <h2 className="font-clash font-semibold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Your business <span className="text-[#D63C3C]">NEEDS</span> AI
          </h2>

          {/* Rotating phrase */}
          <p className="mt-6 text-xl sm:text-2xl text-white/80 font-satoshi leading-relaxed">
            Your competitors are{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="inline-block font-semibold text-[#D63C3C]"
              >
                {rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
            {' '}using AI.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            {[
              {
                stat: '75%',
                label: 'Less employees',
                quote: 'Ecommerce brands and agencies utilizing AI can easily reduce staff by ~75%',
                image: '/people/kevin-king.jpg',
                name: 'Kevin King',
                role: 'Billion Dollar Seller Summit founder',
                source: 'https://amazingwave.digital/2023/11/28/exclusive-interview-kevin-king-on-ai-and-amazon/',
              },
              {
                stat: '85%',
                label: 'Time reduction for repetitive ecommerce tasks',
                quote: "We've seen tasks such as listing creation take us an hour and a half go down to 10-15 minutes",
                image: '/people/yoni-steinschriber.jpg',
                name: 'Yoni Steinschriber',
                role: 'Elev8 Brands founder',
                source: 'https://www.youtube.com/watch?v=RJuuXHv86Ak',
              },
              {
                stat: '15–25%',
                label: 'Increased conversion rate',
                quote: 'Using AI we were able to repetitively optimize Amazon listings and increase conversion by 15-25%',
                image: '/people/david-dwek.jpg',
                name: 'David Dwek',
                role: 'Market Share Growth founder',
                source: 'https://www.youtube.com/watch?v=V7Bx4TZS3YI',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-clash font-bold text-4xl sm:text-5xl text-[#98CC65]">{item.stat}</div>
                <div className="text-sm text-white/60 font-satoshi mt-1 uppercase tracking-wide">{item.label}</div>
                <p className="text-white/70 font-satoshi text-sm italic mt-4 leading-relaxed">"{item.quote}"</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="text-left">
                    {item.name && <div className="text-white/80 font-satoshi text-sm font-medium">{item.name}</div>}
                    {item.role && <div className="text-white/40 font-satoshi text-xs">{item.role}</div>}
                  </div>
                </div>
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-white/30 font-satoshi mt-3 hover:text-white/50 transition-colors underline"
                >
                  Link to source
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}