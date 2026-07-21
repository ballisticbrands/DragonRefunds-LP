import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Demo Call',
    price: '$0',
    period: '',
    highlight: false,
    badge: null,
    description: 'See if DragonBot is right for your business.',
    features: [
      'Live 30-min demo with our team',
      'See DragonBot handle your real data',
      'Get a custom ROI estimate',
      'No commitment, no pressure',
    ],
    cta: 'Get Started',
    ctaStyle: 'border border-[#2F7D4F] text-[#2F7D4F] hover:bg-[#2F7D4F]/5',
  },
  {
    name: 'Starter',
    price: '$39',
    period: '/mo',
    highlight: true,
    badge: 'Most Popular',
    strikeSetup: '$150',
    setupLabel: 'FREE setup',
    description: '3-month commitment. Perfect for solo sellers.',
    features: [
      'Placeholder feature 1',
      'Placeholder feature 2',
      'Placeholder feature 3',
      'Placeholder feature 4',
      'Placeholder feature 5',
    ],
    cta: 'Get Started',
    ctaStyle: 'bg-[#2F7D4F] text-white hover:bg-[#256B42] shadow-xl shadow-[#2F7D4F]/25',
  },
  {
    name: 'Pro',
    price: '$129',
    period: '/mo',
    highlight: false,
    badge: null,
    strikeSetup: '$150',
    setupLabel: 'FREE setup',
    description: '3-month commitment. For growing brands.',
    features: [
      'Everything in Starter',
      'Placeholder feature 1',
      'Placeholder feature 2',
      'Placeholder feature 3',
      'Placeholder feature 4',
      'Placeholder feature 5',
    ],
    cta: 'Get Started',
    ctaStyle: 'border border-[#2F7D4F] text-[#2F7D4F] hover:bg-[#2F7D4F]/5',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-satoshi font-bold text-sm uppercase tracking-[2px] text-[#2F7D4F] mb-3">
            Pricing
          </p>
          <h2 className="font-clash font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            Choose Your <span className="text-[#2F7D4F]">Plan</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? 'bg-white border-2 border-[#2F7D4F] shadow-2xl shadow-[#2F7D4F]/10 scale-[1.02]'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2F7D4F] text-white text-xs font-satoshi font-semibold rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-clash font-semibold text-xl text-[#1A1A1A] mb-2">{plan.name}</h3>

                {plan.strikeSetup && (
                  <div className="text-sm font-satoshi text-[#1A1A1A]/50 mb-2">
                    <span className="line-through text-[#1A1A1A]/30">{plan.strikeSetup}</span>{' '}
                    <span className="text-[#D63C3C] font-semibold">{plan.setupLabel}</span>
                  </div>
                )}

                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-clash font-bold text-5xl text-[#1A1A1A]">{plan.price}</span>
                  {plan.period && (
                    <span className="text-[#1A1A1A]/40 font-satoshi text-lg">{plan.period}</span>
                  )}
                </div>

                <p className="text-sm text-[#1A1A1A]/40 font-satoshi mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check size={16} className="text-[#2F7D4F] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1A1A1A]/70 font-satoshi">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/beta"
                className={`block w-full py-3 rounded-full font-satoshi font-semibold text-sm text-center transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}