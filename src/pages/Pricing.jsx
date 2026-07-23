import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Shield, BadgeCheck } from 'lucide-react';
import RefundsNavbar, { REFUNDS_SIGNUP_URL } from '../components/landing/RefundsNavbar';
import RefundsFooter from '../components/landing/RefundsFooter';

const sysFont = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const monoFont = "'Roboto Mono', monospace";

const monoLink = document.querySelector('link[data-roboto-mono]');
if (!monoLink) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap';
  link.dataset.robotoMono = '';
  document.head.appendChild(link);
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-medium">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-white/55 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const pricingFaq = [
  { q: 'What does the free DIY plan include?', a: 'A full audit of your reimbursement history — every recoverable shipment, fee, and lost unit, itemized by cause — plus a step-by-step SOP to file each claim through Seller Central yourself. You keep 100% of what you recover. No card required.' },
  { q: 'How does the 15% hands-free fee work?', a: 'When you want a claim handled for you, Dragon Refunds files it and follows it to close. You pay 15% of what we actually recover on that claim — only if we win. There is no monthly fee and nothing up front.' },
  { q: 'How is this cheaper than GETIDA or Seller Investigators?', a: 'Managed reimbursement services typically take around 25% of everything recovered. Dragon Refunds charges 15% for the same done-for-you filing — and $0 for any claim you file yourself. On $10,000 recovered, that is up to $1,000–$2,500 more in your pocket.' },
  { q: 'Can I mix DIY and hands-free?', a: 'Yes. Decide claim by claim. File the easy ones yourself for free and hand off the messier ones for 15%. You are never locked into one or the other.' },
  { q: 'Is there a monthly subscription?', a: 'No. Finding what Amazon owes you is free forever. You only ever pay the 15% commission on claims you choose to have us file — and only when they are recovered.' },
];

const plans = [
  {
    name: 'DIY',
    price: '$0',
    unit: 'free forever',
    tagline: 'Find every recoverable claim yourself and keep 100% of what you recover.',
    cta: 'Get my free audit',
    highlight: false,
    features: [
      'Full audit of your reimbursement history',
      'Every claim type, itemized by cause',
      'Step-by-step SOP to file each claim',
      'Keep 100% of what you recover',
      'No credit card required',
    ],
  },
  {
    name: 'Hands-free',
    price: '15%',
    unit: 'of what we recover',
    tagline: 'We file every claim for you and chase it to close. Pay only on what we actually recover.',
    cta: 'Connect your account',
    highlight: true,
    badge: 'Done-for-you',
    features: [
      'Everything in DIY',
      'We file and follow every claim to close',
      'Full case tracking and audit trail',
      'Only 15% — not the 25% others charge',
      'Pay only on successful recoveries',
    ],
  },
];

export default function Pricing() {
  const [light, setLight] = useState(true);
  return (
    <div className={`v2-page min-h-screen bg-[#0F0F0F] text-white${light ? ' theme-light' : ''}`} style={{ fontFamily: sysFont }}>
      <style>{`.v2-page h1,.v2-page h2,.v2-page h3,.v2-page h4,.v2-page h5,.v2-page h6{font-family:inherit!important}`}</style>
      <RefundsNavbar light={light} onToggle={() => setLight(v => !v)} />

      {/* Hero */}
      <section className="relative pt-36 pb-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="font-extrabold text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.035em] mb-6">
            Find it for <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">free.</span>
            <br />Hand it off for <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">15%.</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto mb-8 leading-[1.6]">
            No subscription. See exactly where Amazon owes you at no cost, and file it yourself to keep 100% —
            or let us do it for 15% of what we recover, not the 25% competitors charge.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-medium text-white/50">
            <a href="https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.d78b7343-017b-4e68-92e4-a1defb51aa6f"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#98CC65] hover:text-white transition-colors">
              <BadgeCheck className="w-4 h-4" /><span className="underline decoration-[#98CC65]/40 underline-offset-2">Amazon approved</span>
            </a>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#2F7D4F]" />Amazon ToS Compliant</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />No monthly fee</span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map(plan => (
              <div key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${plan.highlight
                  ? 'bg-gradient-to-b from-[#2F7D4F]/15 to-[#0F0F0F] border-2 border-[#2F7D4F]/50 shadow-2xl shadow-[#2F7D4F]/10'
                  : 'bg-white/5 border border-white/10'}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] text-[#0F0F0F] text-[10px] font-bold uppercase tracking-widest rounded-full" style={{ fontFamily: monoFont }}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-bold text-2xl mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-white/50 text-sm">{plan.unit}</span>
                </div>
                <p className="text-white/55 text-sm mb-6 leading-relaxed">{plan.tagline}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/75">
                      <Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={REFUNDS_SIGNUP_URL}
                  className={`flex items-center justify-center gap-2 px-7 py-3.5 font-semibold uppercase tracking-wide rounded-lg transition-all ${plan.highlight
                    ? 'bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] hover:shadow-xl hover:shadow-[#2F7D4F]/25'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30'}`}>
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-white/50 mt-8 max-w-xl mx-auto leading-relaxed">
            Either way, the audit is free and yours to keep. You only pay when you choose to have us file — and only on what we recover.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="font-bold text-xl text-center mb-10">Pricing FAQ</h3>
          {pricingFaq.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <RefundsFooter />
    </div>
  );
}
