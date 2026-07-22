import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import CompareDropdown from '../components/CompareDropdown';

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
            <p className="pb-5 text-white/50 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const pricingFaq = [
  { q: 'What can I do with $100 in free credits?', a: 'A lot. A full PPC audit costs about 2,000–3,000 credits. Keyword research on 5 ASINs is around 1,500. Customer support triage is 100–300 per ticket. You can run several real tasks before needing to add credits.' },
  { q: 'How do credits work?', a: 'Credits represent the actual AI model costs passed through directly — no platform fee on top. Quick tasks like answering a question cost 100–300 credits. Full projects like a competitor analysis or PPC audit cost 2,000–5,000 credits.' },
  { q: 'Do unused credits roll over?', a: 'Monthly credits refresh each billing cycle and do not roll over. Your free $100 in credits never expire.' },
  { q: 'Is there a per-seat charge?', a: 'No. DragonBot works across your entire Slack workspace. Everyone on your team can use it — pricing is based on usage, not seats.' },
  { q: 'Can I change plans anytime?', a: 'Yes. Upgrade, downgrade, or cancel at any time. No commitments, no cancellation fees.' },
  { q: 'What integrations are included?', a: 'All of them. Amazon Seller Central, Google Ads, Meta Ads, Shopify, Google Sheets, Slack, Notion, and 3,000+ more. Every plan gets full access.' },
  { q: 'How does DragonBot reduce my costs?', a: 'Smart caching reuses context across conversations, so repeated questions about the same data cost almost nothing. Scheduled tasks run efficiently by batching operations.' },
];

const teamPlans = [
  { credits: '20,000', price: 50 },
  { credits: '50,000', price: 100 },
  { credits: '100,000', price: 180 },
  { credits: '250,000', price: 400 },
  { credits: '500,000', price: 700 },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  return (
    <div className="db-page min-h-screen bg-[#0F0F0F] text-white" style={{ fontFamily: sysFont }}>
      <style>{`.db-page h1,.db-page h2,.db-page h3,.db-page h4,.db-page h5,.db-page h6{font-family:inherit!important}`}</style>
      {/* Nav */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="font-bold text-[28px] text-white" style={{ lineHeight: '1' }}>get<span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span><span className="text-white">.com</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors" style={{ fontFamily: monoFont }}>Product</a>
            <a href="/pricing" className="text-[13px] font-medium text-white bg-white/10 px-3 py-1.5 rounded-md" style={{ fontFamily: monoFont }}>Pricing</a>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors" style={{ fontFamily: monoFont }}>Privacy</a>
            <a href="/support" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors" style={{ fontFamily: monoFont }}>Support</a>
            <CompareDropdown />
          </div>
          <a href="/beta"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-sm font-semibold uppercase tracking-wide rounded-lg transition-all">
            Request Access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-extrabold text-[48px] sm:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.035em] mb-6">
            We'll front you <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">$100.</span>
            <br />Put <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span> to work.
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] font-medium text-white/40 tracking-[-0.01em] mb-4">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2F7D4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              $100 in Free Credits
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2F7D4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              No Credit Card Required
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2F7D4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Amazon TOS Compliant
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Team */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="font-bold text-2xl mb-3">Team</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-extrabold">${teamPlans[selectedPlan].price}</span>
                <span className="text-white/50">/month</span>
              </div>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">Shared across your workspace. No per-seat charges.</p>
              {/* Plan selector dropdown */}
              <div className="relative mb-5">
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(Number(e.target.value))}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-semibold text-sm cursor-pointer hover:border-white/20 transition-colors focus:outline-none focus:border-[#2F7D4F]"
                  style={{ fontFamily: monoFont }}
                >
                  {teamPlans.map((p, i) => (
                    <option key={i} value={i} className="bg-[#1A1A1A] text-white">
                      {p.credits} credits/mo — ${p.price}/month
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <a href="/beta"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 mb-3">
                Request Access <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-center text-xs text-white/30 mb-6">$100 in free credits included — no card required</p>
              <ul className="space-y-3 flex-1">
                {[
                  'Every feature, every integration',
                  'Slack-native — works in threads & mentions',
                  '3,000+ integrations (Amazon, Shopify, Google Ads, etc.)',
                  'Persistent workspace context & deep memory',
                  'Scheduled tasks & automations',
                  'Reports, spreadsheets, dashboards',
                  'Supervised, read-only, or autonomous modes',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white/5 border border-[#2F7D4F]/30 rounded-2xl p-8 flex flex-col">
              <h3 className="font-bold text-2xl mb-1">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold">Custom</span>
              </div>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">For teams that need more credits, custom billing, or dedicated support.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Team',
                  'Custom credit limits',
                  'Invoicing with custom billing terms',
                  'Security review & DPA support',
                  'SLA with priority support',
                  'Dedicated onboarding',
                  'Tailored permissions & controls',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:info@dragonrefunds.com"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all">
                Contact Sales
              </a>
            </div>
          </div>

          {/* Credit explainer */}
          <div className="mt-16 text-center">
            <h3 className="font-bold text-xl mb-6">How credits work</h3>
            <p className="text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
              Credits represent actual AI model costs passed through directly — no platform fee on top. Smart caching reuses context across conversations, keeping your costs low.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { range: '100–300', label: 'Quick tasks', desc: 'Answer a question, check a metric, draft a reply' },
                { range: '1,000–3,000', label: 'Standard tasks', desc: 'PPC audit, keyword research, competitor analysis' },
                { range: '3,000–5,000', label: 'Full projects', desc: 'End-to-end product research, full campaign setup' },
              ].map((t, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent mb-1">{t.range}</div>
                  <div className="text-sm font-semibold mb-1">{t.label}</div>
                  <div className="text-xs text-white/40">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
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

      {/* Footer */}
      <footer className="bg-[#0F3D2E] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <img src="/DragonBot-logo.png" alt="DragonBot" className="h-8" />
              <span className="font-bold text-lg text-white">DragonBot</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="/" className="text-sm text-white/50 hover:text-white transition-colors">Product</a>
              <a href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Privacy</a>
              <a href="/tos" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Terms</a>
              <a href="/support" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Support</a>
              <a href="mailto:info@dragonrefunds.com" className="text-sm text-white/50 hover:text-white transition-colors">info@dragonrefunds.com</a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-white/30">&copy; {new Date().getFullYear()} Chacha Advisory LLC. All rights reserved.</p>
              <p className="text-xs text-white/20 mt-1">30 N Gould St Ste R, Sheridan, WY 82801, USA</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}