import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Check, Shield, BadgeCheck, ExternalLink, Sun, Moon } from 'lucide-react';
import { getRefundsCompetitor } from '../data/refundsCompetitors';
import RefundsFooter from '../components/landing/RefundsFooter';

/* ─── Fonts ─── */
const monoLink = document.querySelector('link[data-roboto-mono]');
if (!monoLink) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap';
  link.dataset.robotoMono = '';
  document.head.appendChild(link);
}
const sysFont = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const monoFont = "'Roboto Mono', monospace";
const SIGNUP_URL = 'https://app.dragonrefunds.com/sign-up';

const DragonRefundsBrand = () => (
  <span className="font-bold text-[22px] sm:text-[25px] text-white whitespace-nowrap" style={{ lineHeight: '1' }}>
    Dragon <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Refunds</span>
  </span>
);

/* Header mirrors the /refunds navbar: same links (pointing back to the main
   page's sections), same theme toggle, same "Connect your account" CTA. */
const navLinks = [
  { label: 'Calculator', href: '/#calculator' },
  { label: 'Features', href: '/#shipment-refunds' },
  { label: 'Automated workflow', href: '/#automated-workflow' },
  { label: 'vs. others', href: '/#vs-others' },
];

function Navbar({ light, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0F0F0F]/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <motion.img src="/DragonBot-logo.png" alt="Dragon Refunds" className="h-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <DragonRefundsBrand />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors"
                style={{ fontFamily: monoFont }}>{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button type="button" onClick={onToggle} aria-label="Toggle light and dark theme"
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href={SIGNUP_URL}
              className="px-5 py-2.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-sm font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-lg hover:shadow-[#2F7D4F]/25">
              Connect your account
            </a>
          </div>
          <div className="md:hidden flex items-center gap-1">
            <button type="button" onClick={onToggle} aria-label="Toggle light and dark theme" className="p-2 text-white/60">
              {light ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#0F0F0F] pt-20 px-6 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {navLinks.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-white">{l.label}</a>
              ))}
              <a href={SIGNUP_URL} onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] text-[#0F0F0F] text-center font-semibold uppercase tracking-wide rounded-lg">
                Connect your account
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Section wrapper ─── */
function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F7D4F]/15 rounded-full text-sm font-medium text-white mb-6">
      <span className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse shrink-0" />
      <span>{children}</span>
    </span>
  );
}

/* ─── Comparison cell (mirrors ReimbCompareCell in LandingV4) ─── */
function CompareCell({ value, isUs }) {
  if (value === 'yes') {
    return <Check className={`w-[18px] h-[18px] mx-auto ${isUs ? 'text-[#98CC65]' : 'text-white/60'}`} />;
  }
  if (value === 'no') {
    return <span className="block text-center text-white/25 text-lg leading-none">–</span>;
  }
  if (value === 'partial') {
    return <span className="block text-center text-[11px] font-semibold text-[#F5C451]">Partial</span>;
  }
  return (
    <span className={`block text-center text-[12px] font-semibold ${isUs ? 'text-white' : 'text-white/60'}`}>
      {value.t}
    </span>
  );
}

/* ─── FAQ item ─── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-medium text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-white/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE — Dragon Refunds vs <competitor>
   ═══════════════════════════════════════════════════════════════ */
export default function VsRefundsCompetitor({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  const c = getRefundsCompetitor(slug);

  // Match the /refunds page: open in light theme, with a working toggle.
  const [light, setLight] = useState(true);

  useEffect(() => {
    if (!c) return;
    document.title = c.metaTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', c.metaDescription);
    window.scrollTo(0, 0);
  }, [c]);

  if (!c) return <Navigate to="/" replace />;

  return (
    <div className={`v2-page min-h-screen bg-[#0F0F0F] text-white${light ? ' theme-light' : ''}`} style={{ fontFamily: sysFont }}>
      <style>{`
        .v2-page h1,.v2-page h2,.v2-page h3,.v2-page h4,.v2-page h5,.v2-page h6{font-family:inherit!important}
        .v2-page section[id]{scroll-margin-top:88px}
      `}</style>
      <Navbar light={light} onToggle={() => setLight(v => !v)} />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>{c.eyebrow}</Eyebrow>

            {/* Versus lockup */}
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="flex items-center gap-2.5">
                <motion.img src="/DragonBot-logo.png" alt="Dragon Refunds" className="h-10"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
                <DragonRefundsBrand />
              </div>
              <span className="text-xl font-bold text-white/30" style={{ fontFamily: monoFont }}>vs</span>
              <span className="text-[22px] sm:text-[25px] font-bold text-white/70 whitespace-nowrap">{c.name}</span>
            </div>

            <h1 className="font-extrabold text-[36px] sm:text-[52px] lg:text-[64px] text-white leading-[1.06] tracking-[-0.035em] mb-6">
              {c.h1.plain}{' '}
              <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">{c.h1.accent}</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto mb-9 leading-[1.6]">
              {c.subhead}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <a href={SIGNUP_URL}
                className="px-9 py-4 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3">
                Get my free audit <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/"
                className="px-9 py-4 text-lg bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all flex items-center gap-3">
                See how it works
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-medium text-white/50">
              <a href="https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.d78b7343-017b-4e68-92e4-a1defb51aa6f"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#98CC65] hover:text-white transition-colors">
                <BadgeCheck className="w-4 h-4" />
                <span className="underline decoration-[#98CC65]/40 underline-offset-2">Amazon approved</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#2F7D4F]" />Amazon ToS Compliant</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />Free to find what you're owed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TL;DR ─── */}
      <Section className="!pt-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-white/40 uppercase tracking-widest mb-6" style={{ fontFamily: monoFont }}>The TL;DR</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <p className="text-sm font-semibold text-white/70 mb-3">Choose {c.name} if</p>
              <p className="text-white/80 text-base leading-relaxed">{c.tldr.them}</p>
            </div>
            <div className="bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-2xl p-7">
              <p className="text-sm font-semibold text-[#98CC65] mb-3">Choose Dragon Refunds if</p>
              <p className="text-white/90 text-base leading-relaxed">{c.tldr.us}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── COMPARISON TABLE ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Side-by-side
          </h2>
          <p className="mt-3 text-white/55 max-w-xl mx-auto">The same feature, both services.</p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]">
          {/* Header row */}
          <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-white/10">
            <div className="px-4 py-3.5" />
            <div className="px-3 py-3.5 text-center bg-[#2F7D4F]/15 border-x border-[#2F7D4F]/30">
              <span className="text-[13px] font-bold text-[#98CC65]">Dragon Refunds</span>
            </div>
            <div className="px-3 py-3.5 text-center">
              <span className="text-[13px] font-bold text-white/70">{c.name}</span>
            </div>
          </div>

          {c.compare.map(group => (
            <div key={group.label}>
              <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-white/[0.02] border-b border-white/[0.06]">
                <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35" style={{ fontFamily: monoFont }}>
                  {group.label}
                </div>
                <div className="bg-[#2F7D4F]/[0.06] border-x border-[#2F7D4F]/20" />
                <div />
              </div>
              {group.rows.map(row => (
                <div key={row.feature} className="grid grid-cols-[1.6fr_1fr_1fr] items-center border-b border-white/[0.06] last:border-b-0">
                  <div className="px-4 py-3.5">
                    <div className="text-[13px] font-medium text-white/85 leading-snug">{row.feature}</div>
                    {row.note && <div className="text-[11px] text-white/35 mt-0.5">{row.note}</div>}
                  </div>
                  {row.values.map((v, i) => (
                    <div key={i} className={`px-3 py-3.5 self-stretch flex items-center justify-center ${i === 0 ? 'bg-[#2F7D4F]/[0.06] border-x border-[#2F7D4F]/20' : ''}`}>
                      <div className="w-full"><CompareCell value={v} isUs={i === 0} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FEE / SAVINGS CALLOUT ─── */}
      <Section className="!py-10">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#2F7D4F]/30 bg-[#2F7D4F]/10 p-8 text-center">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4" style={{ fontFamily: monoFont }}>
            On $10,000 recovered
          </p>
          <div className="flex items-start justify-center gap-3 sm:gap-6">
            <div className="flex-1 max-w-[200px] flex flex-col items-center">
              <span className="inline-block h-[19px] mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#0F0F0F] bg-[#98CC65] border border-transparent rounded-full px-2 py-0.5" style={{ fontFamily: monoFont }}>Keep 100%</span>
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">$10,000</div>
              <div className="text-[12px] text-white/55 mt-1.5">you keep with <span className="text-white/80 font-semibold">Dragon Refunds DIY</span> (free)</div>
            </div>
            <div className="self-stretch w-px bg-white/10" />
            <div className="flex-1 max-w-[200px] flex flex-col items-center">
              <span className="inline-block h-[19px] mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45 border border-white/20 rounded-full px-2 py-0.5" style={{ fontFamily: monoFont }}>Hands-off</span>
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">$8,500</div>
              <div className="text-[12px] text-white/55 mt-1.5">with <span className="text-white/80 font-semibold">Dragon Refunds</span> done-for-you ({c.commission.us})</div>
            </div>
            <div className="self-stretch w-px bg-white/10" />
            <div className="flex-1 max-w-[200px] flex flex-col items-center">
              <span className="inline-block h-[19px] mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45 border border-white/20 rounded-full px-2 py-0.5" style={{ fontFamily: monoFont }}>Hands-off</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white/50">$7,500</div>
              <div className="text-[12px] text-white/45 mt-1.5">with {c.name} ({c.commission.them})</div>
            </div>
          </div>
          <p className="mt-6 text-[14px] text-white/60 leading-relaxed max-w-xl mx-auto">
            File it yourself through the free tier and keep the full <span className="text-[#98CC65] font-semibold">$10,000</span> — or hand it off for {c.commission.us} and still keep <span className="text-[#98CC65] font-semibold">$1,000 more</span> than a {c.commission.them} service.
          </p>
        </div>
      </Section>

      {/* ─── WHERE THEY WIN ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Where <span className="text-white">{c.name}</span> wins
          </h2>
          <p className="mt-3 text-white/55 max-w-2xl mx-auto">
            We're not pretending {c.name} is a bad service. Here's where it's genuinely a fit.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {c.themWins.map((w, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2 text-white">{w.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── WHERE WE WIN ─── */}
      <Section className="!pt-6">
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Where <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Dragon Refunds</span> wins
          </h2>
          <p className="mt-3 text-white/55 max-w-2xl mx-auto">
            The reasons sellers switch.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {c.usWins.map((w, i) => (
            <div key={i} className="bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-2xl p-6 flex gap-4">
              <Check className="w-6 h-6 text-[#98CC65] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-1.5 text-white">{w.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Frequently asked
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {c.faq.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section>
        <div className="max-w-3xl mx-auto text-center bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-3xl p-12">
          <motion.img src="/DragonBot-logo.png" alt="Dragon Refunds" className="h-16 mx-auto mb-6"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] mb-4">
            See what Amazon owes you.
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Connect in two minutes over Amazon's official API — read-only. The audit is free, and it's yours to keep either way.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={SIGNUP_URL}
              className="inline-flex items-center gap-3 px-9 py-4 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5">
              Get my free audit <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/"
              className="inline-flex items-center gap-3 px-9 py-4 text-lg bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all">
              See how it works
            </a>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <RefundsFooter />
    </div>
  );
}
