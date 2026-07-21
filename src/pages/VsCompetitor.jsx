import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Check, Play } from 'lucide-react';
import { getCompetitor } from '../data/competitors';
import { sellerVideos } from '../data/sellerVideos';
import CompareDropdown, { CompareDropdownMobile } from '../components/CompareDropdown';

/* ─── Fonts ─── */
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

/* ─── Navbar ─── */
const navLinks = [
  { label: 'Product', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Privacy', href: '/privacy', newTab: true },
  { label: 'Support', href: '/support', newTab: true },
];

function Navbar({ activeSlug }) {
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
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="font-bold text-[28px] text-white" style={{ lineHeight: '1' }}>
              get<span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span><span className="text-white">.com</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} {...(l.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors"
                style={{ fontFamily: monoFont }}>{l.label}</a>
            ))}
            <CompareDropdown activeSlug={activeSlug} />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://app.getdragonbot.com/sign-up"
              className="px-5 py-2.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-sm font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-lg hover:shadow-[#2F7D4F]/25">
              Get it free
            </a>
          </div>
          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
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
              <CompareDropdownMobile activeSlug={activeSlug} onItemClick={() => setMobileOpen(false)} />
              <a href="https://app.getdragonbot.com/sign-up" onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] text-[#0F0F0F] text-center font-semibold uppercase tracking-wide rounded-lg">
                Get it free
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
    <section id={id} className={`py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

/* ─── Eyebrow ─── */
function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F7D4F]/15 rounded-full text-sm font-medium text-white mb-6">
      <span className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse shrink-0" />
      <span>{children}</span>
    </span>
  );
}

/* ─── Yes/No/Partial cell ─── */
function FeatureCell({ value, theirs }) {
  if (value === 'yes') {
    return <Check className={`w-5 h-5 ${theirs ? 'text-white/70' : 'text-[#98CC65]'} mx-auto`} />;
  }
  if (value === 'no') {
    return <X className="w-5 h-5 text-[#F87171] mx-auto" />;
  }
  if (value === 'partial') {
    return <span className="text-xs font-semibold text-[#FFA94D] uppercase tracking-wider">Partial</span>;
  }
  if (typeof value === 'object' && value !== null) {
    return (
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-semibold text-white/90">{value.main}</span>
        {value.sub && <span className="text-[11px] text-[#98CC65] mt-0.5">{value.sub}</span>}
      </div>
    );
  }
  return <span className="text-sm text-white/80">{value}</span>;
}

/* ─── Workflow comparison row ─── */
function WorkflowRow({ task, them, us, themLabel, themLogo }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4" style={{ fontFamily: monoFont }}>{task}</p>
      <div className="grid md:grid-cols-2 gap-5">
        {/* Them */}
        <div className="bg-red-950/20 rounded-2xl p-6 border border-red-900/30">
          <div className="flex items-center gap-2.5 mb-3 h-8">
            {themLogo && <img src={themLogo} alt={themLabel} className="w-5 h-5 object-contain" />}
            <p className="text-sm font-semibold text-white/70">{themLabel}</p>
          </div>
          <div className="text-white/70 text-base leading-relaxed">
            {them.map((item, i) => (
              <div key={i}>{item.h ? <span className="font-bold text-[#F87171]">{item.t}</span> : item.t}</div>
            ))}
          </div>
        </div>
        {/* Us */}
        <div className="bg-[#2F7D4F]/10 rounded-2xl p-6 border border-[#2F7D4F]/30">
          <div className="flex items-center gap-2.5 mb-3 h-8">
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="w-8 h-8 object-contain"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <p className="text-sm font-semibold text-[#98CC65]">DragonBot</p>
          </div>
          <div className="text-white/90 text-base leading-relaxed">
            {us.map((item, i) => (
              <div key={i}>{item.h ? <span className="font-bold text-[#98CC65]">{item.t}</span> : item.t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function VsCompetitor() {
  const { slug } = useParams();
  const c = getCompetitor(slug);

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
  }, [c]);

  if (!c) return <Navigate to="/" replace />;

  return (
    <div className="vs-page min-h-screen bg-[#0F0F0F] text-white" style={{ fontFamily: sysFont }}>
      <style>{`
        .vs-page h1,.vs-page h2,.vs-page h3,.vs-page h4,.vs-page h5,.vs-page h6{font-family:inherit!important}
      `}</style>
      <Navbar activeSlug={slug} />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>{c.eyebrow}</Eyebrow>

            {/* Versus logos */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-14"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
              <span className="text-2xl font-bold text-white/30" style={{ fontFamily: monoFont }}>vs</span>
              <img src={c.logo} alt={c.name} className="h-12 object-contain" />
            </div>

            <h1 className="font-extrabold text-[48px] sm:text-[64px] lg:text-[88px] text-white leading-[1.05] tracking-[-0.035em] mb-6">
              {c.h1.plain}{' '}
              <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">{c.h1.accent}</span>
            </h1>

            <p className="text-[17px] sm:text-[19px] text-white/60 max-w-2xl mx-auto mb-10 leading-[1.6]">
              {c.subhead}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <a href="https://app.getdragonbot.com/sign-up"
                className="px-10 py-5 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3">
                Get it free <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/"
                className="px-10 py-5 text-lg bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all flex items-center gap-3">
                More info
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] font-medium text-white/40">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />Free Forever Plan</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />No Credit Card Required</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2F7D4F]" />Amazon TOS Compliant</span>
            </div>
          </motion.div>

          {/* Built by sellers strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 text-center">
            <p className="text-[15px] font-semibold text-white/60 mb-2">We sell on Amazon too</p>
            <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">10 years on Amazon · 8 figures sold · DragonBot is the employee we always wanted</p>
          </motion.div>
        </div>
      </section>

      {/* ─── TL;DR VERDICT ─── */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-white/40 uppercase tracking-widest mb-6" style={{ fontFamily: monoFont }}>The TL;DR</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <img src={c.logo} alt={c.name} className="w-5 h-5 object-contain" />
                <p className="text-sm font-semibold text-white/70">Choose {c.name} if</p>
              </div>
              <p className="text-white/80 text-base leading-relaxed">{c.tldr.them}</p>
            </div>
            <div className="bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-2xl p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="w-7 h-7 object-contain"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
                <p className="text-sm font-semibold text-[#98CC65]">Choose DragonBot if</p>
              </div>
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
          <p className="mt-3 text-white/55 max-w-xl mx-auto">A feature-by-feature comparison.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_120px] sm:grid-cols-[1fr_180px_180px]">
            {/* Header */}
            <div className="p-4 border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-widest" style={{ fontFamily: monoFont }}>Feature</div>
            <div className="p-4 border-b border-l border-white/10 text-center">
              <img src={c.logo} alt={c.name} className="h-6 object-contain mx-auto" />
            </div>
            <div className="p-4 border-b border-l border-white/10 text-center">
              <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-7 object-contain mx-auto"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            </div>

            {/* Rows */}
            {c.comparisonTable.map((row, i) => (
              <div key={i} className="contents">
                <div className={`p-4 text-sm text-white/80 ${i < c.comparisonTable.length - 1 ? 'border-b border-white/10' : ''}`}>{row.feature}</div>
                <div className={`p-4 border-l border-white/10 flex items-center justify-center ${i < c.comparisonTable.length - 1 ? 'border-b' : ''}`}>
                  <FeatureCell value={row.them} theirs />
                </div>
                <div className={`p-4 border-l border-white/10 flex items-center justify-center bg-[#2F7D4F]/5 ${i < c.comparisonTable.length - 1 ? 'border-b' : ''}`}>
                  <FeatureCell value={row.us} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── WORKFLOWS ─── */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            How the work actually gets done
          </h2>
          <p className="mt-3 text-white/55 max-w-2xl mx-auto">
            The same task, both tools. Pay attention to who is doing the work.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {c.workflows.map((w, i) => (
            <WorkflowRow key={i} task={w.task} them={w.them} us={w.us} themLabel={c.name} themLogo={c.logo} />
          ))}
        </div>
      </Section>

      {/* ─── WHERE THEY WIN ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Where <span className="text-white">{c.name}</span> wins
          </h2>
          <p className="mt-3 text-white/55 max-w-2xl mx-auto">
            We're not pretending {c.name} is a bad product. Here's where it's genuinely better.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {c.themWins.map((w, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2 text-white">{w.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── WHERE WE WIN ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Where <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span> wins
          </h2>
          <p className="mt-3 text-white/55 max-w-2xl mx-auto">
            The reasons sellers switch.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
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

      {/* ─── SELLER VIDEOS ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            See what <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">Amazon Sellers</span> have been building with{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sellerVideos.map(v => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-white/10 hover:border-[#2F7D4F]/40 transition-all hover:shadow-lg hover:shadow-[#2F7D4F]/10 group">
              <div className="relative aspect-video">
                <img src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#2F7D4F] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                {v.duration && (
                  <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white bg-black/80 px-1.5 py-0.5 rounded">
                    {v.duration}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-white/80 leading-snug">{v.title}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* ─── PRICING COMPARISON ─── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Pricing
          </h2>
        </div>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4" style={{ fontFamily: monoFont }}>{c.name}</p>
            <ul className="space-y-3">
              {c.pricingComparison.themItems.map((item, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{item.label}</span>
                  <span className="font-bold text-[#F87171]">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-2xl p-6">
            <p className="text-xs font-semibold text-[#98CC65] uppercase tracking-widest mb-4" style={{ fontFamily: monoFont }}>DragonBot</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">{c.pricingComparison.usItem.price}</span>
            </div>
            <p className="text-sm text-white/70 mb-4">{c.pricingComparison.usItem.label}</p>
            {c.pricingComparison.usItem.note && (
              <p className="text-xs text-white/50">{c.pricingComparison.usItem.note}</p>
            )}
          </div>
        </div>
        {c.pricingComparison.footnote && (
          <p className="text-center text-sm text-white/55 mt-8 max-w-2xl mx-auto leading-relaxed">{c.pricingComparison.footnote}</p>
        )}
      </Section>

      {/* ─── FAQ ─── */}
      <Section>
        <div className="text-center mb-12">
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
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#0F3D2E] to-[#1A1A1A] border border-[#2F7D4F]/30 rounded-3xl p-12">
          <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-16 mx-auto mb-6"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] mb-4">
            Ready to stop doing the work?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Free forever. No credit card. Connect to Amazon in 2 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://app.getdragonbot.com/sign-up"
              className="inline-flex items-center gap-3 px-10 py-5 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5">
              Get it free <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/"
              className="inline-flex items-center gap-3 px-10 py-5 text-lg bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all">
              More info
            </a>
          </div>
        </div>
      </Section>

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