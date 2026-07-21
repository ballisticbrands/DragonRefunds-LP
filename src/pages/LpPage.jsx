import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Check, Zap } from 'lucide-react';

/* ─── Fonts (same pattern as VsCompetitor) ─── */
const monoLink = document.querySelector('link[data-roboto-mono]');
if (!monoLink) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap';
  link.dataset.robotoMono = '';
  document.head.appendChild(link);
}
const sysFont = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const monoFont = "'Roboto Mono', monospace";

const SIGNUP = 'https://app.getdragonbot.com/sign-up';

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { label: 'Product', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Support', href: '/support' },
  ];
  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F0F0F]/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-10"
              animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="font-bold text-[24px] sm:text-[28px] text-white" style={{ lineHeight: '1' }}>
              get<span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span><span className="text-white">.com</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.label} href={l.href} className="text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors">{l.label}</a>
            ))}
            <a href={SIGNUP} className="px-5 py-2.5 bg-white/10 hover:bg-gradient-to-r hover:from-[#2F7D4F] hover:to-[#98CC65] text-white text-[13px] font-semibold uppercase tracking-wide rounded-lg transition-all">
              Get it free
            </a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#0F0F0F]/95 backdrop-blur-xl overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-4">
                {links.map(l => (
                  <a key={l.label} href={l.href} className="text-sm text-white/60">{l.label}</a>
                ))}
                <a href={SIGNUP} className="px-5 py-3 bg-[#2F7D4F] text-white text-sm font-semibold uppercase tracking-wide rounded-lg text-center">Get it free</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
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

/* ─── CTA button pair ─── */
function CtaButtons({ big = false }) {
  const base = big ? 'px-10 py-5 text-lg' : 'px-8 py-4';
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a href={SIGNUP}
        className={`${base} bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3`}>
        Get it free <ArrowRight className="w-5 h-5" />
      </a>
      <a href="/"
        className={`${base} bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all flex items-center gap-3`}>
        More info
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE — data-driven landing page for Google Ads (see data/lpPages.js)
   ═══════════════════════════════════════════════════════════════ */
export default function LpPage({ page }) {
  useEffect(() => {
    document.title = page.metaTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', page.metaDescription);
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="lp-page min-h-screen bg-[#0F0F0F] text-white" style={{ fontFamily: sysFont }}>
      <style>{`.lp-page h1,.lp-page h2,.lp-page h3,.lp-page h4{font-family:inherit!important}`}</style>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F7D4F]/15 rounded-full text-sm font-medium text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse shrink-0" />
              {page.eyebrow}
            </span>
            <h1 className="font-extrabold text-[42px] sm:text-[60px] lg:text-[76px] text-white leading-[1.05] tracking-[-0.035em] mb-6">
              {page.hero.segments.map((seg, i) => (
                <span key={i}>
                  <span className={
                    seg.color === 'orange' ? 'bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent'
                    : seg.color === 'green' ? 'bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent'
                    : 'text-white'
                  }>{seg.text}</span>
                  {i < page.hero.segments.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <p className="text-[17px] sm:text-[19px] text-white/60 max-w-2xl mx-auto mb-10 leading-[1.6]">{page.subhead}</p>
            <CtaButtons big />
            <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] font-medium text-white/40 mt-8">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />Free forever plan</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />No credit card required</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />Amazon TOS compliant</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 text-center">
            <p className="text-[15px] font-semibold text-white/60 mb-2">We sell on Amazon too</p>
            <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">10 years on Amazon · 8 figures sold · DragonBot is the employee we always wanted</p>
          </motion.div>
        </div>
      </section>

      {/* ─── BULLETS ─── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.bullets.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#2F7D4F]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#2F7D4F]/15 border border-[#2F7D4F]/30 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-[#98CC65]" />
                </div>
                <h3 className="font-bold text-white mb-2">{b.t}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICE ANCHOR ─── */}
      {page.anchor && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">{page.anchor.title}</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {page.anchor.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-7 py-4 border-b border-white/10">
                  <span className="text-white/70">{item.label}</span>
                  <span className="font-semibold text-white/90" style={{ fontFamily: monoFont }}>{item.price}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-7 py-5 bg-[#2F7D4F]/10">
                <span className="flex items-center gap-2.5 font-semibold text-[#98CC65]">
                  <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="w-7 h-7 object-contain"
                    animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
                  {page.anchor.usNote}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">Up and running in 2 minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: '1', t: 'Sign up free', d: 'No credit card, no sales call. Just an email.' },
              { n: '2', t: 'Connect Amazon', d: 'Official SP-API and Ads OAuth — the same flow every legitimate tool uses. Revocable anytime.' },
              { n: '3', t: 'Put it to work', d: 'Ask questions in Slack or your AI client. Schedule reports. Approve actions when you\'re ready.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] text-[#0F0F0F] font-extrabold flex items-center justify-center mx-auto mb-4" style={{ fontFamily: monoFont }}>{s.n}</div>
                <h3 className="font-bold text-white mb-2">{s.t}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">Frequently asked</h2>
          </div>
          {page.faq.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center bg-gradient-to-br from-[#0F3D2E] to-[#1A1A1A] border border-[#2F7D4F]/30 rounded-3xl p-12">
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-16 mx-auto mb-6"
              animate={{ y: [0, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] mb-4">
              {page.comingSoon ? 'Get in early — free' : 'Ready to stop doing the work?'}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Free forever. No credit card. Connect your Amazon account in 2 minutes.
            </p>
            <CtaButtons big />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
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
              <a href="mailto:info@getdragonbot.com" className="text-sm text-white/50 hover:text-white transition-colors">info@getdragonbot.com</a>
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
