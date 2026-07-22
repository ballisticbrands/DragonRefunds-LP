import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, ArrowRight, Check, BadgeCheck, ExternalLink,
  Database, Zap, BookOpen, Server, Brain, Sparkles, Clock, Shield,
  TrendingUp, BarChart3, MessageSquare, Star, Package, FileText, Search, DollarSign, Play, Sun, Moon,
  AlertTriangle, Table2, RotateCcw, Truck, Ruler,
} from 'lucide-react';
import { sellerVideos } from '../data/sellerVideos';

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

/* ─── Hosts ─── */
const HOSTS = [
  { id: 'claude', label: 'Claude', logo: '/logo-claude.png' },
  { id: 'chatgpt', label: 'ChatGPT', logo: '/logo-chatgpt.svg', invert: true },
  { id: 'cursor', label: 'Cursor', mark: 'C' },
  { id: 'other', label: 'Any MCP client' },
];

/* ─── Works-with dropdown ─── */
function WorksWithDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-[13px] font-medium text-white/50 hover:text-[#98CC65] transition-colors"
        style={{ fontFamily: monoFont }}
        onClick={() => setOpen(o => !o)}
      >
        Works with <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -8, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 pt-3 w-[260px]"
          >
            <div className="bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col">
              {HOSTS.map(h => (
                <a
                  key={h.id}
                  href="/beta"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white rounded-md transition-colors"
                >
                  <HostMark host={h} size={18} />
                  <span className="font-medium">{h.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorksWithDropdownMobile({ onItemClick }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center gap-2 text-lg font-medium text-white"
        onClick={() => setOpen(o => !o)}
      >
        Works with <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pt-3 pl-3 flex flex-col gap-3 border-l border-white/10 ml-2">
              {HOSTS.map(h => (
                <a key={h.id} href="/beta" onClick={onItemClick} className="flex items-center gap-3 text-base text-white/70">
                  <HostMark host={h} size={20} />
                  <span>{h.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── HostMark — small visual mark for a host (logo or letter tile) ─── */
function HostMark({ host, size = 20 }) {
  if (host.logo) {
    return (
      <img
        src={host.logo}
        alt={host.label}
        style={{ width: size, height: size }}
        className={`object-contain shrink-0 ${host.invert ? 'invert brightness-200' : ''}`}
      />
    );
  }
  if (host.mark) {
    return (
      <div
        className="rounded shrink-0 flex items-center justify-center font-extrabold text-white"
        style={{ width: size, height: size, backgroundColor: '#0F0F0F', border: '1px solid rgba(255,255,255,0.2)', fontSize: size * 0.55, fontFamily: monoFont }}
      >
        {host.mark}
      </div>
    );
  }
  return (
    <div
      className="rounded shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: '#0F0F0F', border: '1px dashed rgba(152,204,101,0.4)' }}
    >
      <Server size={size * 0.55} className="text-[#98CC65]" />
    </div>
  );
}

/* ─── Navbar ─── */
const navLinks = [
  { label: 'Product', href: '/', active: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Privacy', href: '/privacy', newTab: true },
  { label: 'Support', href: '/support', newTab: true },
];

/* Reimbursements sandbox runs a self-contained nav: on-page anchors only, no
   cross-site links and no Works-with dropdown. */
const REIMB_NAV_LINKS = [
  { label: 'Calculator', href: '#calculator' },
  { label: 'Shipment refunds', href: '#shipment-refunds' },
  { label: 'More refunds', href: '#more-refunds' },
  { label: 'Automated workflow', href: '#automated-workflow' },
  { label: 'vs. others', href: '#vs-others' },
];

function Navbar({ light, onToggle, links = navLinks, showWorksWith = true, ctaLabel = 'Get it free', brand = null }) {
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
            {brand || (
              <span className="font-bold text-[28px] text-white" style={{ lineHeight: '1' }}>dragon<span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">refunds</span><span className="text-white">.com</span></span>
            )}
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.label} href={l.href} {...(l.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`text-[13px] font-medium transition-colors ${l.active ? 'text-white bg-white/10 px-3 py-1.5 rounded-md' : 'text-white/50 hover:text-[#98CC65]'}`} style={{ fontFamily: monoFont }}>{l.label}</a>
            ))}
            {showWorksWith && <WorksWithDropdown />}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button type="button" onClick={onToggle} aria-label="Toggle light and dark theme"
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="https://app.dragonrefunds.com/sign-up"
              className="px-5 py-2.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-sm font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-lg hover:shadow-[#2F7D4F]/25">
              {ctaLabel}
            </a>
          </div>
          <div className="md:hidden flex items-center gap-1">
            <button type="button" onClick={onToggle} aria-label="Toggle light and dark theme" className="p-2 text-white/60">
              {light ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#0F0F0F] pt-20 px-6">
            <div className="flex flex-col gap-6">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-white">{l.label}</a>
              ))}
              {showWorksWith && <WorksWithDropdownMobile onItemClick={() => setMobileOpen(false)} />}
              <a href="https://app.dragonrefunds.com/sign-up" onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-center font-semibold uppercase tracking-wide rounded-lg transition-all">
                {ctaLabel}
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
    <section id={id} className={`py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}

/* ─── Eyebrow label ─── */
function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F7D4F]/10 rounded-full text-sm font-medium text-white mb-6 max-w-[90vw]">
      <span className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse shrink-0" />
      <span>{children}</span>
    </span>
  );
}

/* ─── Chat demo — single unified DragonBot chat UI (host-agnostic).
   Message shapes: {who:'user'|'host', text, stats?} and the tool-call
   {who:'tool', text} where backtick-wrapped tokens become chips, e.g.
   'Running the `PPC audit` skill for the last `30 days`'. ─── */
const CHAT_SCRIPT = [
  { who: 'user', text: 'Audit my Amazon PPC for the last 30 days.' },
  { who: 'tool', text: 'Running the `PPC audit` skill for the last `30 days`' },
  { who: 'host', text: <>Done — pulled spend across 47 campaigns. <strong>Top finding:</strong> 23 keywords burning $1,840/mo with 0 conversions (paused, projected ACoS ↓ from 38% → 26%). Full breakdown:<div className="mt-2 grid grid-cols-2 gap-2 text-[12px]"><div className="px-2.5 py-1.5 bg-white/5 rounded border border-white/10"><div className="font-bold text-[#98CC65]">$1,840</div><div className="text-white/50">wasted/mo</div></div><div className="px-2.5 py-1.5 bg-white/5 rounded border border-white/10"><div className="font-bold text-[#98CC65]">−12pt</div><div className="text-white/50">projected ACoS</div></div><div className="px-2.5 py-1.5 bg-white/5 rounded border border-white/10"><div className="font-bold text-[#98CC65]">23</div><div className="text-white/50">keywords paused</div></div><div className="px-2.5 py-1.5 bg-white/5 rounded border border-white/10"><div className="font-bold text-[#98CC65]">$60/d</div><div className="text-white/50">reallocated</div></div></div></> },
  { who: 'user', text: 'Now check listing health — anything suppressed?' },
  { who: 'tool', text: 'Running the `account health` check' },
  { who: 'host', text: <>1 listing suppressed: <code className="px-1.5 py-0.5 rounded bg-white/10 text-[#98CC65] text-[11px]">B0CK5LRQX7</code> — backend image URL returned 404. Re-uploaded the image and submitted reinstatement. Should be back within 2 hours. Want me to schedule hourly health checks?</> },
];

function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
      <div className="flex items-center gap-2">
        <img src="/DragonBot-avatar.png" alt="DragonBot" className="w-[18px] h-[18px] object-contain" />
        <span className="text-[13px] font-semibold text-white/80">DragonBot</span>
      </div>
      <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 uppercase tracking-widest" style={{ fontFamily: monoFont }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#98CC65]" /> Amazon connected
      </span>
    </div>
  );
}

/* backtick `tokens` → green mono chips */
function renderToolText(text) {
  return text.split('`').map((seg, i) =>
    i % 2 === 1
      ? <code key={i} className="text-[#98CC65] bg-[#2F7D4F]/15 px-1 py-0.5 rounded" style={{ fontFamily: monoFont }}>{seg}</code>
      : <span key={i}>{seg}</span>
  );
}

function ToolMessage({ text }) {
  return (
    <div className="flex gap-2.5 px-4 py-1">
      <div className="shrink-0 w-7" />
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#2F7D4F]/25 bg-[#2F7D4F]/[0.08] max-w-full">
        <Sparkles className="w-3 h-3 text-[#98CC65] shrink-0" />
        <span className="text-[11px] text-white/60 leading-relaxed">{renderToolText(text)}</span>
      </div>
    </div>
  );
}

function ChatBubble({ msg }) {
  if (msg.who === 'tool') return <ToolMessage text={msg.text} />;
  const isUser = msg.who === 'user';
  return (
    <div className={`flex gap-2.5 px-4 py-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold overflow-hidden"
        style={{ backgroundColor: isUser ? '#3A3A3A' : '#0F0F0F', border: isUser ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(152,204,101,0.3)' }}>
        {isUser ? 'You' : <img src="/DragonBot-avatar.png" alt="DragonBot" className="w-5 h-5 object-contain" />}
      </div>
      <div className={`flex-1 min-w-0 max-w-[calc(100%-2.5rem)] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block text-left rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${isUser ? 'bg-[#2F7D4F]/15 text-white' : 'bg-white/5 text-white/85 border border-white/10'}`}>
          {typeof msg.text === 'string' ? msg.text : <div>{msg.text}</div>}
          {msg.quote && (
            <div className="mt-2 border-l-2 border-white/20 pl-3 text-[12px] text-white/60 leading-relaxed">
              {msg.quote.order && <div><span className="text-white/40">Order:</span> <span className="text-[#7BA9E0]">{msg.quote.order}</span></div>}
              {msg.quote.product && <div><span className="text-white/40">Product:</span> {msg.quote.product}</div>}
              {msg.quote.body && <div className="mt-1 italic">“{msg.quote.body}”</div>}
            </div>
          )}
          {msg.note && <div className="mt-2 text-[12px] text-white/70">{msg.note}</div>}
          {msg.draft && (
            <div className="mt-2 rounded-md bg-[#2F7D4F]/10 border border-[#2F7D4F]/20 px-2.5 py-2 text-[12px] text-white/75 leading-relaxed">
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#98CC65]/70 mb-1" style={{ fontFamily: monoFont }}>Draft reply</div>
              <span className="italic">“{msg.draft}”</span>
            </div>
          )}
          {msg.ask && <div className="mt-2 text-[13px] font-semibold text-white">{msg.ask}</div>}
          {msg.links && (
            <div className="mt-2 flex flex-col gap-1 text-[12px]">
              {msg.links.map((l, i) => <span key={i} className="text-[#7BA9E0]">{l}</span>)}
            </div>
          )}
          {msg.stats && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
              {msg.stats.map((s, i) => (
                <div key={i} className="px-2.5 py-1.5 bg-white/5 rounded border border-white/10">
                  <div className="font-bold text-[#98CC65]">{s.v}</div>
                  <div className="text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatDemo({ script = CHAT_SCRIPT, feature = null }) {
  const [visible, setVisible] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (visible >= script.length) return;
    const delays = [400, 1000, 1500, 500, 1000, 1800];
    const t = setTimeout(() => setVisible(v => v + 1), delays[visible - 1] || 1200);
    return () => clearTimeout(t);
  }, [visible, script.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visible]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] text-center mb-6">
        {feature ? (
          <>Your <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">{feature}</span> with{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span></>
        ) : (
          <>Your <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">AI</span> with{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span></>
        )}
      </h4>
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
        <ChatHeader />
        <div ref={scrollRef} className="flex flex-col py-3 min-h-[420px] sm:min-h-[460px] max-h-[460px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          {script.slice(0, visible).map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <ChatBubble msg={msg} />
            </motion.div>
          ))}
        </div>
        <div className="px-4 pb-3 pt-1 border-t border-white/10">
          <div className="rounded-lg px-3 py-2 text-xs text-white/30 border border-white/10 bg-white/5">
            Message DragonBot…
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Reimbursements dashboard demo (per the DragonBot Reimbursements vision:
   status buckets, per-region/program tables, opportunity detection with $
   value, document submission, free self-file SOP vs 25% managed filing) ─── */
const REIMB_TABS = ['US · FBA', 'US · AWD', 'Canada', 'EU'];
const REIMB_KPIS = [
  { label: 'Recoverable found', value: '$12,847', accent: true },
  { label: 'Open opportunities', value: '23' },
  { label: 'Cases filed', value: '8', warn: true },
  { label: 'Recovered YTD', value: '$9,412', accent: true },
];
const REIMB_TONE = {
  green: { text: 'text-[#98CC65]', dot: 'bg-[#98CC65]', chip: 'bg-[#2F7D4F]/15 border-[#2F7D4F]/30' },
  yellow: { text: 'text-[#F5C451]', dot: 'bg-[#F5C451]', chip: 'bg-[#F5C451]/10 border-[#F5C451]/30' },
  orange: { text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', chip: 'bg-[#F59E0B]/10 border-[#F59E0B]/30' },
  red: { text: 'text-[#F87171]', dot: 'bg-[#F87171]', chip: 'bg-[#F87171]/10 border-[#F87171]/30' },
};
const REIMB_BUCKETS = [
  { label: 'Closed OK', n: 387, tone: 'green' },
  { label: 'Receiving', n: 54, tone: 'yellow' },
  { label: 'Under case', n: 12, tone: 'orange' },
  { label: 'Not received', n: 4, tone: 'red' },
  { label: 'Lost', n: 3, tone: 'red' },
];
const REIMB_ROWS = [
  { id: 'FBA18GTFHBRQ', issue: 'Lost inventory', units: '42', value: '$17,522', status: 'Opportunity', tone: 'green', action: 'sop' },
  { id: 'FBA195XJ7KWP', issue: 'Damaged, no credit', units: '11', value: '$1,328', status: 'Case filed', tone: 'yellow', action: 'details' },
  { id: 'FBA19CBK7592', issue: 'Fee overcharge', units: '—', value: '$459', status: 'Opportunity', tone: 'green', action: 'sop' },
  { id: 'FBA19HL0BQMW', issue: 'Short-received', units: '8', value: '$312', status: 'Docs needed', tone: 'red', action: 'upload' },
  { id: 'FBA19WAB712', issue: 'Unreconciled', units: '15', value: '$588', status: 'Recovered', tone: 'green', action: 'recovered' },
];

function ReimbursementDashboard({ feature = 'Amazon reimbursements' }) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] text-center mb-6">
        Your <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">{feature}</span> with{' '}
        <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
      </h4>
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
        {/* header + region/program tabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src="/DragonBot-avatar.png" alt="DragonBot" className="w-[18px] h-[18px] object-contain" />
            <span className="text-[13px] font-semibold text-white/80">Reimbursements</span>
          </div>
          <div className="flex items-center gap-1">
            {REIMB_TABS.map((t, i) => (
              <span key={t} className={`text-[10px] font-semibold px-2 py-1 rounded ${i === 0 ? 'bg-[#2F7D4F] text-white' : 'text-white/40'}`} style={{ fontFamily: monoFont }}>{t}</span>
            ))}
          </div>
        </div>
        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
          {REIMB_KPIS.map(k => (
            <div key={k.label} className="bg-[#141618] px-4 py-3">
              <div className={`text-lg sm:text-xl font-extrabold ${k.accent ? 'text-[#98CC65]' : k.warn ? 'text-[#F5C451]' : 'text-white'}`}>{k.value}</div>
              <div className="text-[11px] text-white/45 mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>
        {/* status buckets */}
        <div className="flex flex-wrap gap-1.5 px-4 py-3 border-t border-white/10">
          {REIMB_BUCKETS.map(b => (
            <span key={b.label} className={`inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded border ${REIMB_TONE[b.tone].chip}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${REIMB_TONE[b.tone].dot}`} />
              <span className="text-white/70">{b.label}</span>
              <span className={`font-bold ${REIMB_TONE[b.tone].text}`}>{b.n}</span>
            </span>
          ))}
        </div>
        {/* opportunity / shipment table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px] min-w-[560px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: monoFont }}>
                <th className="font-semibold px-4 py-2">Shipment</th>
                <th className="font-semibold px-3 py-2">Issue</th>
                <th className="font-semibold px-3 py-2 text-right">Units</th>
                <th className="font-semibold px-3 py-2 text-right">Potential</th>
                <th className="font-semibold px-3 py-2">Status</th>
                <th className="font-semibold px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {REIMB_ROWS.map(r => (
                <tr key={r.id} className="border-t border-white/[0.06]">
                  <td className="px-4 py-2.5"><span className="inline-flex items-center gap-1 text-[#7BA9E0] font-medium">{r.id}<ExternalLink className="w-3 h-3 opacity-60" /></span></td>
                  <td className="px-3 py-2.5 text-white/70 whitespace-nowrap">{r.issue}</td>
                  <td className="px-3 py-2.5 text-right text-white/60">{r.units}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-white">{r.value}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap"><span className={`inline-flex items-center gap-1.5 ${REIMB_TONE[r.tone].text}`}><span className={`w-1.5 h-1.5 rounded-full ${REIMB_TONE[r.tone].dot}`} />{r.status}</span></td>
                  <td className="px-4 py-2.5 text-right whitespace-nowrap">
                    {r.action === 'sop' && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-white/80 border border-white/15 rounded px-2 py-0.5">Get SOP</span>
                        <span className="text-[11px] font-semibold text-[#0F0F0F] bg-[#98CC65] rounded px-2 py-0.5">File for me</span>
                      </span>
                    )}
                    {r.action === 'details' && <span className="text-[11px] font-semibold text-[#98CC65]">Details →</span>}
                    {r.action === 'upload' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F0F0F] bg-[#F5C451] rounded px-2 py-0.5"><FileText className="w-3 h-3" />Upload POD</span>}
                    {r.action === 'recovered' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#98CC65]"><Check className="w-3.5 h-3.5" />{r.value}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* free vs managed footer */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 px-4 py-3 border-t border-white/10 text-[11px]">
          <span className="flex items-start gap-1.5 text-white/55"><span className="w-1.5 h-1.5 rounded-full bg-[#98CC65] mt-1 shrink-0" /><span><strong className="text-white/80">Free</strong> — opportunity report + step-by-step SOP to file it yourself. Keep 100%.</span></span>
          <span className="flex items-start gap-1.5 text-white/55"><span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1 shrink-0" /><span><strong className="text-white/80">Optional</strong> — we file for you. 25% of what we recover, only if we win.</span></span>
        </div>
      </div>
    </div>
  );
}

/* ─── Reimbursements dashboard demo V2 (sandbox copy for /refunds —
   independent data + component so it can be redesigned without touching the
   live /reimbursement page) ─── */
const REIMB2_TABS = ['US · FBA', 'US · AWD', 'Canada', 'EU'];
const REIMB2_TONE = {
  green:  { text: 'text-[#98CC65]', dot: 'bg-[#98CC65]', chip: 'bg-[#2F7D4F]/15 border-[#2F7D4F]/30' },
  yellow: { text: 'text-[#F5C451]', dot: 'bg-[#F5C451]', chip: 'bg-[#F5C451]/10 border-[#F5C451]/30' },
  orange: { text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', chip: 'bg-[#F59E0B]/10 border-[#F59E0B]/30' },
  red:    { text: 'text-[#F87171]', dot: 'bg-[#F87171]', chip: 'bg-[#F87171]/10 border-[#F87171]/30' },
  white:  { text: 'text-white/80', dot: 'bg-white/50', chip: 'bg-white/5 border-white/15' },
};

/* Shared KPI set — same five cards for every program */
const REIMB2_FBA = {
  unit: 'Units',
  kpis: {
    recoveredYTD: '$9,412',
    recoverableFound: '$12,847',
    needsAction: '$4,300',
    underCase: '$8,547',
  },
  buckets: [
    { label: 'To act on', n: 7, tone: 'red' },
    { label: 'Not received', n: 4, tone: 'red' },
    { label: 'Lost', n: 3, tone: 'red' },
    { label: 'Under case', n: 12, tone: 'orange' },
    { label: 'Receiving', n: 54, tone: 'green' },
    { label: 'Closed OK', n: 387, tone: 'green' },
  ],
  rows: [
    { id: 'FBA18GTFHBRQ', issue: 'Lost inventory',     expected: '42', located: '0',  value: '$2,880',  status: 'Opportunity', tone: 'red',    action: 'sop' },
    { id: 'FBA195XJ7KWP', issue: 'Damaged, no credit', expected: '11', located: '11', value: '$1,328',  status: 'Case filed',  tone: 'orange', action: 'details',   caseId: '21142966791' },
    { id: 'FBA19CBK7592', issue: 'Fee overcharge',     expected: '36', located: '36', value: '$459',    status: 'Opportunity', tone: 'red',    action: 'sop' },
    { id: 'FBA19HL0BQMW', issue: 'Short-received',     expected: '20', located: '12', value: '$312',    status: 'Docs needed', tone: 'red',    action: 'upload' },
    { id: 'FBA19WAB712', issue: 'Customer return',     expected: '24', located: '24', value: '$588',    status: 'Recovered',   tone: 'green',  action: 'recovered', caseId: '21139480255' },
  ],
  ghost: { id: 'FBA1KX7P0N4', expected: '30', located: '27', value: '$690' },
};

/* US · AWD — mirrors US FBA exactly (columns, issues, statuses); only the
   shipment IDs are AWD's and quantities are counted in cartons, not units. */
const REIMB2_AWD = {
  unit: 'Cartons',
  kpis: {
    recoveredYTD: '$2,650',
    recoverableFound: '$4,120',
    needsAction: '$940',
    underCase: '$3,180',
  },
  buckets: [
    { label: 'To act on', n: 2, tone: 'red' },
    { label: 'Not received', n: 1, tone: 'red' },
    { label: 'Lost', n: 1, tone: 'red' },
    { label: 'Under case', n: 2, tone: 'orange' },
    { label: 'Receiving', n: 6, tone: 'green' },
    { label: 'Closed OK', n: 33, tone: 'green' },
  ],
  rows: [
    { id: 'STAR-Q72WHDBJKMRXE', issue: 'Lost inventory',     expected: '18', located: '4',  value: '$580',    status: 'Opportunity', tone: 'red',    action: 'sop' },
    { id: 'STAR-U5KB74Z7FXVWM', issue: 'Damaged, no credit', expected: '25', located: '22', value: '$820',    status: 'Case filed',  tone: 'orange', action: 'details',   caseId: '21150337742' },
    { id: 'STAR-XXWD2RCXYJXYX', issue: 'Short-received',     expected: '9',  located: '6',  value: '$360',    status: 'Docs needed', tone: 'red',    action: 'upload' },
    { id: 'STAR-QFQVEDJ2YJYK2', issue: 'Lost inventory',     expected: '14', located: '9',  value: '$2,360',  status: 'Case filed',  tone: 'orange', action: 'details',   caseId: '21150338106' },
    { id: 'STAR-T26QXT43GDPDQ', issue: 'Customer return',    expected: '30', located: '26', value: '$1,540',  status: 'Recovered',   tone: 'green',  action: 'recovered', caseId: '21150339001' },
    { id: 'STAR-UBWAB2AKJ6WXG', issue: 'Receiving',          expected: '20', located: '0',  value: '—',       status: 'Receiving',   tone: 'green',  action: 'none' },
  ],
  ghost: { id: 'STAR-K3XP7N4WQJYD2', expected: '14', located: '11', value: '$380' },
};

/* Canada · FBA — shipments from the Canada sheet (YEG2/YYZ7/YXU1/YOW3 FCs) */
const REIMB2_CANADA = {
  unit: 'Units',
  kpis: {
    recoveredYTD: '$1,460',
    recoverableFound: '$3,140',
    needsAction: '$420',
    underCase: '$2,720',
  },
  buckets: [
    { label: 'To act on', n: 1, tone: 'red' },
    { label: 'Not received', n: 0, tone: 'red' },
    { label: 'Lost', n: 0, tone: 'red' },
    { label: 'Under case', n: 2, tone: 'orange' },
    { label: 'Receiving', n: 1, tone: 'green' },
    { label: 'Closed OK', n: 79, tone: 'green' },
  ],
  rows: [
    { id: 'FBA197M4QZYB', expected: '80',  located: '76',  value: '$420',   status: 'Opportunity', tone: 'red',    action: 'sop' },
    { id: 'FBA196YCR3X1', expected: '240', located: '240', value: '$1,180', status: 'Case filed',  tone: 'orange', action: 'details',   caseId: '21151002331' },
    { id: 'FBA195XMWJ15', expected: '80',  located: '80',  value: '$260',   status: 'Recovered',   tone: 'green',  action: 'recovered', caseId: '21151002890' },
    { id: 'FBA194T2M1H5', expected: '160', located: '150', value: '$1,540', status: 'Case filed',  tone: 'orange', action: 'details',   caseId: '21151003115' },
    { id: 'FBA194CJ815J', expected: '96',  located: '0',   value: '—',      status: 'Receiving',   tone: 'green',  action: 'none' },
  ],
  ghost: { id: 'FBA193PK7T2Q', expected: '120', located: '112', value: '$540' },
};

/* EU · FBA — shipments from the EU sheet (WRO5/KTW5/LEJ3 FCs) */
const REIMB2_EU = {
  unit: 'Units',
  kpis: {
    recoveredYTD: '$1,240',
    recoverableFound: '$945',
    needsAction: '$725',
    underCase: '$220',
  },
  buckets: [
    { label: 'To act on', n: 2, tone: 'red' },
    { label: 'Not received', n: 0, tone: 'red' },
    { label: 'Lost', n: 0, tone: 'red' },
    { label: 'Under case', n: 1, tone: 'orange' },
    { label: 'Receiving', n: 2, tone: 'green' },
    { label: 'Closed OK', n: 31, tone: 'green' },
  ],
  rows: [
    { id: 'FBA15K40SR0L', expected: '400', located: '399', value: '$85',   status: 'Docs needed', tone: 'red',    action: 'upload' },
    { id: 'FBA15K40SCV4', expected: '48',  located: '32',  value: '$640',  status: 'Opportunity', tone: 'red',    action: 'sop' },
    { id: 'FBA15K09W9XV', expected: '16',  located: '16',  value: '$220',  status: 'Case filed',  tone: 'orange', action: 'details',   caseId: '21152007742' },
    { id: 'FBA15K09N2Z8', expected: '240', located: '240', value: '$980',  status: 'Recovered',   tone: 'green',  action: 'recovered', caseId: '21152008190' },
  ],
  ghost: { id: 'FBA15K08M4RJ', expected: '64', located: '58', value: '$310' },
};

const REIMB2_DATA = {
  'US · FBA': REIMB2_FBA,
  'US · AWD': REIMB2_AWD,
  'Canada': REIMB2_CANADA,
  'EU': REIMB2_EU,
};

function ReimbursementDashboardV2({ feature = 'Amazon reimbursements', showHeading = true }) {
  const [tab, setTab] = useState('US · FBA');
  const data = REIMB2_DATA[tab];
  return (
    <div className="w-full max-w-5xl mx-auto">
      {showHeading && (
        <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] text-center mb-6">
          Your <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">{feature}</span> with{' '}
          <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Dragon Refunds</span>
        </h4>
      )}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
        {/* header + region/program tabs (toggleable) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src="/DragonBot-avatar.png" alt="Dragon Refunds" className="w-[18px] h-[18px] object-contain" />
            <span className="text-[13px] font-semibold text-white/80">Shipment Refunds</span>
          </div>
          <div className="flex items-center gap-1">
            {REIMB2_TABS.map(t => (
              <button key={t} type="button" onClick={() => setTab(t)}
                className={`text-[10px] font-semibold px-2 py-1 rounded transition-colors ${t === tab ? 'bg-[#2F7D4F] text-white' : 'text-white/40 hover:text-white/70'}`}
                style={{ fontFamily: monoFont }}>{t}</button>
            ))}
          </div>
        </div>

        {data ? (
          <>
            {/* KPI strip — Recovered YTD stands alone; Recoverable found = Needs action + Under case */}
            <div className="grid grid-cols-2 sm:flex sm:items-stretch gap-px bg-white/5">
              <div className="bg-[#141618] px-4 py-3 sm:flex-1">
                <div className="text-lg sm:text-xl font-extrabold text-[#98CC65]">{data.kpis.recoveredYTD}</div>
                <div className="text-[11px] text-white/45 mt-0.5">Recovered YTD</div>
              </div>
              <div className="bg-[#141618] px-4 py-3 sm:flex-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{data.kpis.recoverableFound}</div>
                <div className="text-[11px] text-white/45 mt-0.5">Recoverable found</div>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 bg-[#141618] text-white/25 text-xl font-bold">=</div>
              <div className="bg-[#F87171]/[0.06] px-4 py-3 sm:flex-1">
                <div className="text-lg sm:text-xl font-extrabold text-[#F87171]">{data.kpis.needsAction}</div>
                <div className="text-[11px] text-[#F87171]/70 mt-0.5">Needs action</div>
              </div>
              <div className="hidden sm:flex items-center justify-center px-1.5 bg-[#141618] text-white/25 text-xl font-bold">+</div>
              <div className="bg-[#F59E0B]/[0.06] px-4 py-3 sm:flex-1">
                <div className="text-lg sm:text-xl font-extrabold text-[#F59E0B]">{data.kpis.underCase}</div>
                <div className="text-[11px] text-[#F59E0B]/70 mt-0.5">Under case</div>
              </div>
            </div>
            {/* status buckets */}
            <div className="flex flex-wrap gap-1.5 px-4 py-3 border-t border-white/10">
              {data.buckets.map(b => (
                <span key={b.label} className={`inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded border ${REIMB2_TONE[b.tone].chip}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${REIMB2_TONE[b.tone].dot}`} />
                  <span className="text-white/70">{b.label}</span>
                  <span className={`font-bold ${REIMB2_TONE[b.tone].text}`}>{b.n}</span>
                </span>
              ))}
            </div>
            {/* opportunity / shipment table — same columns for every program, plus Case link */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px] min-w-[680px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: monoFont }}>
                    <th className="font-semibold px-4 py-2">Shipment</th>
                    <th className="font-semibold px-3 py-2 text-right">{data.unit} expected</th>
                    <th className="font-semibold px-3 py-2 text-right">{data.unit} located</th>
                    <th className="font-semibold px-3 py-2 text-right">Potential</th>
                    <th className="font-semibold px-3 py-2">Status</th>
                    <th className="font-semibold px-3 py-2">Case</th>
                    <th className="font-semibold px-4 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map(r => (
                    <tr key={r.id} className="border-t border-white/[0.06]">
                      <td className="px-4 py-2.5"><span className="inline-flex items-center gap-1 text-[#7BA9E0] font-medium">{r.id}<ExternalLink className="w-3 h-3 opacity-60" /></span></td>
                      <td className="px-3 py-2.5 text-right text-white/60">{r.expected}</td>
                      <td className="px-3 py-2.5 text-right text-white/60">{r.located}</td>
                      <td className="px-3 py-2.5 text-right font-bold text-white">{r.value}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap"><span className={`inline-flex items-center gap-1.5 ${REIMB2_TONE[r.tone].text}`}><span className={`w-1.5 h-1.5 rounded-full ${REIMB2_TONE[r.tone].dot}`} />{r.status}</span></td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        {r.caseId
                          ? <span className="inline-flex items-center gap-1 text-[#7BA9E0] font-medium">{r.caseId}<ExternalLink className="w-3 h-3 opacity-60" /></span>
                          : <span className="text-white/25">—</span>}
                      </td>
                      <td className="px-4 py-2.5 text-right whitespace-nowrap">
                        {r.action === 'sop' && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-white/80 border border-white/15 rounded px-2 py-0.5">Get SOP</span>
                            <span className="text-[11px] font-semibold text-[#0F0F0F] bg-[#98CC65] rounded px-2 py-0.5">File for me</span>
                          </span>
                        )}
                        {r.action === 'details' && <span className="text-[11px] font-semibold text-[#98CC65]">Details →</span>}
                        {r.action === 'upload' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F0F0F] bg-[#F5C451] rounded px-2 py-0.5"><FileText className="w-3 h-3" />Upload POD</span>}
                        {r.action === 'recovered' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#98CC65]"><Check className="w-3.5 h-3.5" />{r.value}</span>}
                        {r.action === 'none' && <span className="text-white/25">—</span>}
                      </td>
                    </tr>
                  ))}
                  {/* faded ghost row — hints there are more shipments below */}
                  <tr aria-hidden="true" className="border-t border-white/[0.06] select-none"
                      style={{ maskImage: 'linear-gradient(to bottom, #000 0%, transparent 55%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 55%)' }}>
                    <td className="px-4 py-2.5"><span className="inline-flex items-center gap-1 text-[#7BA9E0] font-medium">{data.ghost.id}<ExternalLink className="w-3 h-3 opacity-60" /></span></td>
                    <td className="px-3 py-2.5 text-right text-white/60">{data.ghost.expected}</td>
                    <td className="px-3 py-2.5 text-right text-white/60">{data.ghost.located}</td>
                    <td className="px-3 py-2.5 text-right font-bold text-white">{data.ghost.value}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1.5 text-[#F87171]"><span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />Opportunity</span></td>
                    <td className="px-3 py-2.5 text-white/25">—</td>
                    <td className="px-4 py-2.5 text-right"><span className="text-[11px] font-semibold text-white/80 border border-white/15 rounded px-2 py-0.5">Get SOP</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="px-4 py-16 text-center text-[13px] text-white/40">
            No reimbursement activity synced for <span className="text-white/70 font-semibold">{tab}</span> yet.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Seller credentials band (sandbox /refunds only) ───
   The reimbursement pitch leans on "we're sellers too", so the track record gets
   real typographic weight instead of a line of small caps. The Software Partner
   badge is the one Appstore designation DragonBot actually holds — the <img>
   hides its own link if the asset is missing, so the slot degrades quietly
   rather than rendering a broken image. */
const APPSTORE_URL = 'https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.d78b7343-017b-4e68-92e4-a1defb51aa6f';

function SellerCredBand() {
  return (
    <div className="mt-10 mx-auto max-w-2xl">
      <p className="text-center text-[13px] font-semibold text-white/45 uppercase tracking-[0.15em] mb-4">
        We sell on Amazon too
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-6">
        <a href={APPSTORE_URL} target="_blank" rel="noopener noreferrer"
          title="Dragon Refunds on the Amazon Selling Partner Appstore" className="shrink-0">
          <img src="/logos/badge-amazon-software-partner.svg"
            alt="Amazon Selling Partner Appstore — Software Partner"
            className="h-[124px] w-auto rounded-lg"
            onError={e => { e.currentTarget.parentElement.style.display = 'none'; }} />
        </a>
        <div className="hidden sm:block w-px h-16 bg-white/10" />
        <div className="flex items-center gap-7 sm:gap-9">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.02em]">10 years</div>
            <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/45 mt-1">on Amazon</div>
          </div>
          <div className="w-px h-11 bg-white/10" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">8 figures</div>
            <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/45 mt-1">sold</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Free-audit intro (sandbox /refunds only). Sits directly above the
   V2 dashboard, which acts as the reveal — so the dashboard's own heading is
   suppressed via showHeading={false}. ─── */
const AUDIT_POINTS = [
  { icon: <Package className="w-4 h-4" />, title: 'Every claim type',
    desc: 'Lost, damaged, short-received, fee overcharges, customer returns — across FBA, AWD, and every region you sell in.' },
  { icon: <Clock className="w-4 h-4" />, title: 'What expires first',
    desc: 'Amazon\'s filing windows are short and unforgiving. We rank by deadline, not by dollar value, so nothing ages out unclaimed.' },
  { icon: <BarChart3 className="w-4 h-4" />, title: 'What you already recovered',
    desc: 'Your whole reimbursement history, reconciled — including what your current process quietly missed.' },
  { icon: <DollarSign className="w-4 h-4" />, title: 'A real number',
    desc: 'Not a range and not a teaser. The exact figure Amazon owes you right now, itemized down to the shipment.' },
];

function ReimbursementAuditIntro() {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="text-center">
        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
          Shipment refunds
        </p>
        <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
          Connect your account.{' '}
          <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">See what Amazon owes you.</span>
        </h4>
        <p className="mt-4 text-[15px] text-white/55 max-w-2xl mx-auto leading-relaxed">
          The best way to find out what FBA reimbursements are worth to you is to take a look together.
          Connect in two minutes over Amazon's official API — read-only — and Dragon Refunds audits your entire history.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        {AUDIT_POINTS.map(p => (
          <div key={p.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5">
            <span className="mt-0.5 shrink-0 text-[#98CC65]">{p.icon}</span>
            <span>
              <span className="block text-[13px] font-bold text-white/85">{p.title}</span>
              <span className="block text-[12px] text-white/50 leading-relaxed mt-0.5">{p.desc}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <a href="https://app.dragonrefunds.com/sign-up"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2F7D4F] hover:bg-[#98CC65] hover:text-[#0F0F0F] text-white text-[14px] font-bold transition-colors">
          Get my free audit <ArrowRight className="w-4 h-4" />
        </a>
        <span className="text-[12px] text-white/40">No card. No call. The audit is yours to keep either way.</span>
      </div>
    </div>
  );
}

/* ─── COGS tracking + Amazon's revealed valuation ───
   Since Mar 10 2025 Amazon reimburses lost/damaged FBA units at *sourcing cost*,
   not sale price. Sourcing cost isn't exposed in SP-API — but amount_per_unit on
   a past cash reimbursement IS the stored value, leaked. Diffing that against the
   seller's real COGS (synced from a sheet) shows what every future loss will
   underpay by, while there's still time to correct it in the IDR portal. */
/* Shared demo catalogue — every feature tab draws from the same five products so
   the demo reads as one seller's account rather than four unrelated ones. */
const DEMO_PRODUCTS = {
  cor: { sku: 'Box-Cor1',     img: '/demo-products/42.jpg', name: 'Corrugated Box 11*6*4cm' },
  pgb: { sku: 'Box-PGB_Wide', img: '/demo-products/33.jpg', name: 'Party Gift Black Box 22.5*9.5*4.5cm' },
  jpg: { sku: 'Box-JPG_Mini', img: '/demo-products/19.jpg', name: 'Jewelry Packaging Gift Box 2.5*2.5*3cm' },
  sgb: { sku: 'Box-SGB_Sm',   img: '/demo-products/2.jpg',  name: 'Small Gift Box 5.5*6.5*2.5cm' },
  pje: { sku: 'Box-PJE_Slim', img: '/demo-products/24.jpg', name: 'Paper Jewelry Earring Storage Box' },
};
const ProductCell = ({ p, wrap }) => (
  <span className={`inline-flex items-center gap-2.5 text-white/60 ${wrap ? '' : 'whitespace-nowrap'}`}>
    <img src={p.img} alt="" width="28" height="28" className="w-7 h-7 rounded object-contain bg-white/90 p-0.5 shrink-0" />
    {p.name}
  </span>
);

const COGS_ROWS = [
  { p: DEMO_PRODUCTS.cor, cogs: '$6.00', amz: '$3.75', gap: '−$2.25', pct: '−38%', tone: 'red',    note: 'Under' },
  { p: DEMO_PRODUCTS.pgb, cogs: '$2.71', amz: '$1.90', gap: '−$0.81', pct: '−30%', tone: 'red',    note: 'Under' },
  { p: DEMO_PRODUCTS.jpg, cogs: '$1.30', amz: '$1.28', gap: '−$0.02', pct: '−2%',  tone: 'green',  note: 'Matched' },
  { p: DEMO_PRODUCTS.sgb, cogs: '$1.22', amz: '$1.21', gap: '−$0.01', pct: '−1%',  tone: 'green',  note: 'Matched' },
  { p: DEMO_PRODUCTS.pje, cogs: '—',     amz: '$0.62', gap: '?',      pct: '—',    tone: 'yellow', note: 'No cost on file' },
];

/* ─── Detection features — tabbed. The four claim categories beyond the
   shipments dashboard shown above (shipments IS that dashboard). Each tab is one
   category with its own detection logic and a badge stating how confidently it's
   provable: 'provable' = a contradiction inside Amazon's own data; 'flag' =
   Amazon's number is readable but confirming it needs the seller's real figure
   (COGS, true dimensions). ─── */
const KPI_TONE = { red: 'text-[#F87171]', yellow: 'text-[#F5C451]', green: 'text-[#98CC65]', white: 'text-white' };
const SEG3 = {
  w: 'text-white',
  o: 'bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent',
  g: 'bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent',
};
const FEAT_BADGE = {
  provable: { text: 'Provable from your Amazon data', icon: Check, cls: 'text-[#98CC65] border-[#2F7D4F]/40 bg-[#2F7D4F]/10' },
  flag:     { text: 'Flag — confirm with your numbers', icon: AlertTriangle, cls: 'text-[#F5C451] border-[#F5C451]/30 bg-[#F5C451]/10' },
  confirm:  { text: 'We flag it — you confirm receipt', icon: Clock, cls: 'text-[#7BA9E0] border-[#7BA9E0]/30 bg-[#7BA9E0]/10' },
};
const renderSegs = segs => segs.map((s, i) => <span key={i} className={SEG3[s.c]}>{s.t}</span>);
const Pill = ({ tone, children }) => (
  <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${REIMB2_TONE[tone].text}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${REIMB2_TONE[tone].dot}`} />{children}
  </span>
);
const SolidBtn = ({ children }) => <span className="text-[11px] font-semibold text-[#0F0F0F] bg-[#98CC65] rounded px-2 py-0.5 whitespace-nowrap">{children}</span>;
const GhostBtn = ({ children }) => <span className="text-[11px] font-semibold text-white/80 border border-white/15 rounded px-2 py-0.5 whitespace-nowrap">{children}</span>;
const MonoCell = ({ children }) => <span className="text-[#7BA9E0] font-medium whitespace-nowrap" style={{ fontFamily: monoFont }}>{children}</span>;

function PanelHeader({ feature }) {
  const badge = FEAT_BADGE[feature.badge];
  const Icon = feature.icon;
  const BadgeIcon = badge.icon;
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/10">
      <div className="flex items-center gap-2 min-w-0">
        <Icon className="w-[15px] h-[15px] text-white/50 shrink-0" />
        <span className="text-[13px] font-semibold text-white/80 truncate">{feature.source}</span>
      </div>
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full border shrink-0 ${badge.cls}`}>
        <BadgeIcon className="w-3 h-3" />
        <span className="hidden sm:inline">{badge.text}</span>
      </span>
    </div>
  );
}

/* ─── Removals ───
   Removal claims aren't auto-reimbursed and the window is short (lost-in-transit
   is 15–75 days from the ship date — you can't file before day 15, and you're
   dead after 75), so the list is ranked by what expires first, not by value.
   The dispute form is driven by ORDER TYPE and ORDER SOURCE: a Liquidation ships
   nothing to the seller, so physical-receipt reasons can't apply; an
   Amazon-initiated removal adds "shouldn't have been removed at all". Getting
   this wrong is what makes competitor forms offer six reasons where none fit. */
const DEADLINE_TONE = {
  urgent:  'text-[#F87171] bg-[#F87171]/10 border-[#F87171]/30',
  ok:      'text-[#98CC65] bg-[#2F7D4F]/15 border-[#2F7D4F]/30',
  waiting: 'text-[#7BA9E0] bg-[#7BA9E0]/10 border-[#7BA9E0]/25',
  closed:  'text-white/35 bg-white/5 border-white/10',
};
const REMOVAL_REASONS = {
  Liquidation: ['Units cancelled, never returned to inventory', 'Recovery value never paid', 'Recovery value below policy', 'Processing or referral fee incorrect'],
  Return:      ['Missing units from shipment', 'Entire shipment not delivered', 'Received incorrect units (switcheroo)', 'Damaged units or packaging', 'Units cancelled, never returned to inventory'],
  Disposal:    ['Disposed without authorization', 'Sellable units disposed', 'Units cancelled, never returned to inventory'],
};
const REMOVAL_NOTE = {
  Liquidation: 'Liquidation order — nothing ships to you, so physical-receipt reasons don’t apply and are hidden.',
  Return:      'Return-to-address order — the units were headed to your dock, so receipt reasons apply.',
  Disposal:    'Disposal order — the question is whether it should have been disposed at all.',
};
const REMOVAL_ROWS = [
  {
    id: '2512161K1Z', type: 'Liquidation', source: 'Seller-initiated',
    p: DEMO_PRODUCTS.cor, fnsku: 'X004N77055',
    tracking: 'LIQU2_TLH2_010626_1', submitted: 'Dec 16', qty: '26 ordered · 24 liquidated · 2 cancelled',
    issue: '2 cancelled units never returned to inventory', value: '$48',
    deadline: 'urgent', days: '3 days left', reason: 'Units cancelled, never returned to inventory',
    evidence: [
      { t: 'Removal order detail', have: true },
      { t: 'Inventory ledger — no return of the 2 units', have: true },
      { t: 'Recovery summary for the 24 liquidated units', have: false },
    ],
    draft: 'Removal order 2512161K1Z (Liquidations, seller-initiated), FNSKU X004N77055. Amazon’s removal order detail shows 26 units ordered, 24 completed and 2 cancelled. The 2 cancelled units have not returned to sellable inventory in the inventory ledger as of today, and no recovery value was received for them. Requesting reimbursement for the 2 unaccounted units.',
  },
  {
    id: '2601884PQ2', type: 'Return', source: 'Seller-initiated',
    p: DEMO_PRODUCTS.pgb, fnsku: 'X0047T1DDT',
    tracking: '1Z9V8W770399', submitted: 'Jun 18', qty: '40 requested · 40 shipped · 34 received',
    issue: '6 units short on delivery', value: '$540',
    deadline: 'ok', days: '23 days left', reason: 'Missing units from shipment',
    evidence: [
      { t: 'Removal shipment detail — 40 shipped', have: true },
      { t: 'Carrier tracking — delivered Jul 1', have: true },
      { t: 'Your receiving log for Jul 1', have: false },
      { t: 'Dated carton photos', have: false },
    ],
    draft: 'Removal order 2601884PQ2 (return to address, seller-initiated), FNSKU X0047T1DDT, tracking 1Z9V8W770399. Amazon’s removal shipment detail shows 40 units shipped on Jun 24; carrier tracking marked the shipment delivered Jul 1. On receipt we counted 34 units — 6 units short. Attached: dated receiving photos and our warehouse receiving log for Jul 1. The units were lost after leaving the fulfillment center and were not customer-damaged or defective prior to removal. Requesting reimbursement for the 6 missing units.',
  },
  {
    id: '2607713MX4', type: 'Return', source: 'Seller-initiated',
    p: DEMO_PRODUCTS.sgb, fnsku: 'X004TAUSBJ',
    tracking: '1Z9V8W770412', submitted: 'Jul 2', qty: '25 requested · 25 shipped · not yet delivered',
    issue: 'No carrier movement in 11 days', value: '$180',
    deadline: 'waiting', days: 'Eligible in 4 days', reason: 'Entire shipment not delivered',
    evidence: [
      { t: 'Removal shipment detail — 25 shipped', have: true },
      { t: 'Carrier tracking — last scan Jul 9', have: true },
      { t: 'Amazon requires 15 days from ship date before filing', have: false },
    ],
    draft: 'Amazon requires 15 calendar days from the ship date before a lost-in-transit removal claim can be filed. This shipment left on Jul 9 with no carrier movement since. Dragon Refunds will open the dispute automatically on Jul 24, the first eligible day, and file well inside the 75-day limit.',
  },
  {
    id: '2511339DK8', type: 'Disposal', source: 'Amazon-initiated',
    p: DEMO_PRODUCTS.pje, fnsku: 'X002L5L8WH',
    tracking: '—', submitted: 'Nov 28', qty: '12 disposed · all sellable at disposal',
    issue: 'Sellable units auto-disposed', value: '$310',
    deadline: 'closed', days: 'Closed 118 days ago', reason: 'Disposed without authorization',
    evidence: [],
    draft: '',
  },
];
const reasonsFor = row => {
  const base = REMOVAL_REASONS[row.type] || [];
  return row.source === 'Amazon-initiated'
    ? [...base, 'Removed as expired in error', 'Removed without a request from us']
    : base;
};

function RemovalsPanel({ feature }) {
  const [disputing, setDisputing] = useState(null);
  const row = REMOVAL_ROWS.find(r => r.id === disputing);

  if (row) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/10">
          <button type="button" onClick={() => setDisputing(null)}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/60 hover:text-white transition-colors">
            ← Back to removals
          </button>
          <span className="inline-flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold text-white/45" style={{ fontFamily: monoFont }}>{row.id}</span>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full border border-white/15 bg-white/5 text-white/70">{row.type} · {row.source}</span>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-white/5">
          {[['Product', <ProductCell p={row.p} />], ['FNSKU', row.fnsku], ['Quantities', row.qty], ['Tracking', row.tracking]].map(([k, v]) => (
            <div key={k} className="bg-[#141618] px-4 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: monoFont }}>{k}</div>
              <div className="text-[12px] text-white/75 mt-0.5">{v}</div>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="text-[12px] font-bold text-white/80">Reason for dispute</label>
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${DEADLINE_TONE[row.deadline]}`}>{row.days}</span>
          </div>
          <select defaultValue={row.reason}
            className="w-full bg-[#0F0F0F] border border-white/15 rounded-lg px-3 py-2.5 text-[13px] text-white/85 focus:outline-none focus:border-[#2F7D4F]">
            {reasonsFor(row).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <p className="mt-2 text-[11px] text-white/40 leading-relaxed">{REMOVAL_NOTE[row.type]}</p>
        </div>

        {row.evidence.length > 0 && (
          <div className="px-4 py-3.5 border-t border-white/10">
            <div className="text-[12px] font-bold text-white/80 mb-2.5">Evidence</div>
            <div className="space-y-1.5">
              {row.evidence.map(e => (
                <div key={e.t} className="flex items-start gap-2 text-[12px]">
                  {e.have
                    ? <Check className="w-3.5 h-3.5 text-[#98CC65] mt-0.5 shrink-0" />
                    : <span className="w-3.5 h-3.5 rounded-full border border-[#F5C451]/60 mt-0.5 shrink-0" />}
                  <span className={e.have ? 'text-white/60' : 'text-white/75'}>
                    {e.t}{e.have ? <span className="text-white/30"> · attached automatically</span> : <span className="text-[#F5C451]"> · from you</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-3.5 border-t border-white/10">
          <div className="text-[12px] font-bold text-white/80 mb-2">Drafted claim</div>
          <p className="text-[12px] text-white/55 leading-relaxed bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2.5">{row.draft}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-white/10">
          {row.deadline === 'waiting'
            ? <span className="text-[11px] font-semibold text-[#0F0F0F] bg-[#7BA9E0] rounded px-2.5 py-1">Auto-file on Jul 24</span>
            : <span className="text-[11px] font-semibold text-[#0F0F0F] bg-[#98CC65] rounded px-2.5 py-1">Submit dispute</span>}
          <span className="text-[11px] font-semibold text-white/70 border border-white/15 rounded px-2.5 py-1">Not a problem — close</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
      <PanelHeader feature={feature} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5">
        {[
          { v: '$768', l: 'Open and claimable', tone: 'red' },
          { v: '3 days', l: 'Soonest window closes', tone: 'yellow' },
          { v: '$310', l: 'Already expired — unclaimable', tone: 'white' },
        ].map((k, i) => (
          <div key={k.l} className={`bg-[#141618] px-4 py-3 ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
            <div className={`text-lg sm:text-xl font-extrabold ${KPI_TONE[k.tone]}`}>{k.v}</div>
            <div className="text-[11px] text-white/45 mt-0.5">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px]" style={{ minWidth: 960 }}>
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: monoFont }}>
              <th className="font-semibold px-3 py-2">Removal order</th>
              <th className="font-semibold px-3 py-2">Product</th>
              <th className="font-semibold px-3 py-2">What we found</th>
              <th className="font-semibold px-3 py-2 text-right">Value</th>
              <th className="font-semibold px-3 py-2">Window</th>
              <th className="font-semibold px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {REMOVAL_ROWS.map(r => (
              <tr key={r.id} className="border-t border-white/[0.06]">
                <td className="px-3 py-2.5">
                  <MonoCell>{r.id}</MonoCell>
                  <div className="text-[10px] text-white/35 mt-0.5">{r.type} · {r.source}</div>
                </td>
                <td className="px-3 py-2.5"><ProductCell p={r.p} wrap /></td>
                <td className="px-3 py-2.5 text-white/60">
                  {r.issue}
                  <div className="text-[10px] text-white/30 mt-0.5">{r.qty}</div>
                </td>
                <td className="px-3 py-2.5 text-right font-bold text-white">{r.value}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-1 rounded-full border whitespace-nowrap ${DEADLINE_TONE[r.deadline]}`}>{r.days}</span>
                </td>
                <td className="px-3 py-2.5 text-right whitespace-nowrap">
                  {r.deadline === 'closed'
                    ? <span className="text-[11px] text-white/25">Expired</span>
                    : (
                      <button type="button" onClick={() => setDisputing(r.id)}
                        className={`text-[11px] font-semibold rounded px-2 py-0.5 transition-colors ${r.deadline === 'waiting' ? 'text-white/80 border border-white/15 hover:border-white/30' : 'text-[#0F0F0F] bg-[#98CC65] hover:bg-white'}`}>
                        {r.deadline === 'waiting' ? 'Review' : 'Dispute'}
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-[11px] text-white/40 leading-relaxed">
          Ranked by what expires first — not by value. The $310 disposal above aged out before anyone looked at it.
        </p>
      </div>
    </div>
  );
}

const FEATURE_TABS = [
  {
    key: 'returns', label: 'Customer returns', icon: RotateCcw, badge: 'provable',
    headline: [{ t: 'A refund went out. ', c: 'w' }, { t: 'The item never came back.', c: 'o' }],
    blurb: 'Amazon should charge the customer and repay you 45 days after a refund — and often doesn’t. We match every refund to its return and surface the ones that never closed.',
    source: 'FBA returns · matched to refunds', minW: 860,
    kpis: [
      { v: '$1,240', l: 'Owed on unreturned units', tone: 'red' },
      { v: '6', l: 'Past the 45-day mark', tone: 'red' },
      { v: '2', l: 'Wrong item returned', tone: 'yellow' },
    ],
    rows: [
      { order: '113-7737487-3137815', p: DEMO_PRODUCTS.cor, refunded: 'Jun 2', days: '47', status: 'Not returned', tone: 'red', action: 'claim' },
      { order: '112-5164796-0962633', p: DEMO_PRODUCTS.pgb, refunded: 'May 28', days: '52', status: 'Not returned', tone: 'red', action: 'claim' },
      { order: '111-7711929-8598649', p: DEMO_PRODUCTS.sgb, refunded: 'Jun 24', days: '25', status: 'Wrong item back', tone: 'yellow', action: 'claim' },
      { order: '114-7078152-1818656', p: DEMO_PRODUCTS.jpg, refunded: 'Jul 1', days: '18', status: 'Awaiting return', tone: 'green', action: 'watch' },
    ],
    columns: [
      { label: 'Order', align: 'left', cell: r => <MonoCell>{r.order}</MonoCell> },
      { label: 'Product', align: 'left', cell: r => <ProductCell p={r.p} /> },
      { label: 'Refunded', align: 'left', cell: r => <span className="text-white/50 whitespace-nowrap">{r.refunded}</span> },
      { label: 'Days', align: 'right', cell: r => <span className="text-white/60">{r.days}</span> },
      { label: 'Status', align: 'left', cell: r => <Pill tone={r.tone}>{r.status}</Pill> },
      { label: 'Action', align: 'right', cell: r => r.action === 'watch' ? <span className="text-[11px] text-white/30">Tracking</span> : <SolidBtn>File claim</SolidBtn> },
    ],
  },
  {
    key: 'removals', label: 'Removal orders', icon: Truck, badge: 'confirm',
    headline: [{ t: 'Units leave Amazon ', c: 'w' }, { t: 'and the clock starts.', c: 'o' }],
    blurb: 'Removals aren’t auto-reimbursed, and lost-in-transit claims die 75 days after the ship date. We reconcile what left against what landed, rank by what expires first, and open a dispute that already knows what kind of removal it’s looking at.',
    source: 'Removal orders · reconciled and clocked',
    Component: RemovalsPanel,
  },
  {
    key: 'fees', label: 'Fee overcharges', icon: Ruler, badge: 'flag',
    headline: [{ t: 'Amazon measured your box. ', c: 'w' }, { t: 'It measured wrong.', c: 'o' }],
    blurb: 'A few millimeters over a size-tier line bumps the pick-and-pack fee on every unit you sell. We flag SKUs sitting just over a boundary — you confirm the real dimensions.',
    source: 'Size tier · measured vs charged', minW: 940,
    kpis: [
      { v: '3', l: 'SKUs mis-tiered', tone: 'red' },
      { v: '$0.42', l: 'Overcharge per unit', tone: 'red' },
      { v: '$1,510', l: 'Est. yearly overcharge', tone: 'white' },
    ],
    rows: [
      { p: DEMO_PRODUCTS.pgb, size: '9.1×3.9×2.1"', tier: 'Large standard', fee: '$4.75', should: 'Small standard', tone: 'red', action: 'remeasure' },
      { p: DEMO_PRODUCTS.pje, size: '8.5×2.1×1.1"', tier: 'Large standard', fee: '$4.12', should: 'Small standard', tone: 'red', action: 'remeasure' },
      { p: DEMO_PRODUCTS.cor, size: '4.6×2.6×1.9"', tier: 'Large standard', fee: '$3.86', should: 'Small standard', tone: 'red', action: 'remeasure' },
      { p: DEMO_PRODUCTS.jpg, size: '1.1×1.1×1.3"', tier: 'Small standard', fee: '$3.22', should: 'Correct', tone: 'green', action: 'ok' },
    ],
    columns: [
      { label: 'SKU', align: 'left', cell: r => <MonoCell>{r.p.sku}</MonoCell> },
      { label: 'Product', align: 'left', cell: r => <ProductCell p={r.p} /> },
      { label: 'Amazon’s size', align: 'left', cell: r => <span className="text-white/50 whitespace-nowrap" style={{ fontFamily: monoFont }}>{r.size}</span> },
      { label: 'Tier now', align: 'left', cell: r => <span className={`whitespace-nowrap ${r.tone === 'red' ? 'text-[#F87171]' : 'text-white/60'}`}>{r.tier}</span> },
      { label: 'Fee / unit', align: 'right', cell: r => <span className="font-bold text-white">{r.fee}</span> },
      { label: 'Should be', align: 'left', cell: r => r.action === 'ok' ? <Pill tone="green"><Check className="w-3.5 h-3.5" />Correct</Pill> : <span className="text-white/80 whitespace-nowrap">{r.should}</span> },
      { label: 'Action', align: 'right', cell: r => r.action === 'ok' ? <span className="text-[11px] text-white/30">—</span> : <SolidBtn>Request re-measure</SolidBtn> },
    ],
  },
  {
    key: 'sourcing', label: 'Sourcing cost', icon: Table2, badge: 'flag',
    headline: [{ t: 'Amazon pays your cost, ', c: 'w' }, { t: 'not your price.', c: 'o' }],
    blurb: 'Since March 2025, lost units are repaid at sourcing cost. If yours isn’t on file, Amazon’s estimate is the number they’ll keep paying — link a sheet and we show the gap.',
    source: 'Google Sheet · synced 6m ago', minW: 640,
    kpis: [
      { v: '2', l: 'SKUs under-valued', tone: 'red' },
      { v: '1', l: 'No cost on file', tone: 'yellow' },
      { v: '$1,305', l: 'Annual exposure at current loss rate', tone: 'white' },
    ],
    rows: COGS_ROWS,
    columns: [
      { label: 'SKU', align: 'left', cell: r => <MonoCell>{r.p.sku}</MonoCell> },
      { label: 'Product', align: 'left', cell: r => <ProductCell p={r.p} /> },
      { label: 'Your cost', align: 'right', cell: r => <span className="text-white/70">{r.cogs}</span> },
      { label: 'Amazon’s value', align: 'right', cell: r => <span className="text-white/70">{r.amz}</span> },
      { label: 'Gap / unit', align: 'right', cell: r => (
        <span className="whitespace-nowrap">
          <span className={`font-bold ${REIMB2_TONE[r.tone].text}`}>{r.gap}</span>
          {r.pct !== '—' && <span className="text-white/35 ml-1.5">{r.pct}</span>}
        </span>
      ) },
      { label: 'Action', align: 'right', cell: r => (
        r.note === 'Under' ? <SolidBtn>Fix sourcing cost</SolidBtn>
        : r.note === 'Matched' ? <Pill tone="green"><Check className="w-3.5 h-3.5" />Matched</Pill>
        : <GhostBtn>Add to sheet</GhostBtn>
      ) },
    ],
  },
];

function FeaturePanel({ feature }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
      <PanelHeader feature={feature} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5">
        {feature.kpis.map((k, i) => (
          <div key={k.l} className={`bg-[#141618] px-4 py-3 ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
            <div className={`text-lg sm:text-xl font-extrabold ${KPI_TONE[k.tone]}`}>{k.v}</div>
            <div className="text-[11px] text-white/45 mt-0.5">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px]" style={{ minWidth: feature.minW }}>
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-white/35" style={{ fontFamily: monoFont }}>
              {feature.columns.map(c => (
                <th key={c.label} className={`font-semibold px-3 py-2 ${c.align === 'right' ? 'text-right' : ''}`}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feature.rows.map((r, ri) => (
              <tr key={ri} className="border-t border-white/[0.06]">
                {feature.columns.map(c => (
                  <td key={c.label} className={`px-3 py-2.5 ${c.align === 'right' ? 'text-right' : ''}`}>{c.cell(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReimbursementFeatures() {
  const [active, setActive] = useState(FEATURE_TABS[0].key);
  const f = FEATURE_TABS.find(t => t.key === active);
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
          More Refunds
        </p>
        <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
          Shipments was just the start.{' '}
          <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">4 more ways Amazon keeps your money.</span>
        </h4>
        <p className="mt-4 text-[15px] text-white/55 max-w-2xl mx-auto leading-relaxed">
          You saw shipment refunds above. Amazon quietly holds onto money in four other places too —
          here’s each one, and how sure we are we can get it back.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mb-8">
        {FEATURE_TABS.map(t => {
          const Icon = t.icon;
          const on = t.key === active;
          return (
            <button key={t.key} type="button" onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-2 text-[13px] font-semibold px-3.5 py-2 rounded-lg border transition-colors ${on ? 'bg-[#2F7D4F] text-white border-[#2F7D4F]' : 'text-white/55 border-white/10 hover:text-white/80 hover:border-white/20'}`}>
              <Icon className="w-4 h-4" />{t.label}
            </button>
          );
        })}
      </div>

      <motion.div key={f.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="text-center mb-6 max-w-2xl mx-auto">
          <h5 className="font-extrabold text-xl sm:text-2xl tracking-[-0.02em]">{renderSegs(f.headline)}</h5>
          <p className="mt-2.5 text-[14px] text-white/55 leading-relaxed">{f.blurb}</p>
        </div>
        {f.Component ? <f.Component feature={f} /> : <FeaturePanel feature={f} />}
      </motion.div>
    </div>
  );
}

/* ─── Scheduled reporting: weekly digest + per-win notification.
   Channel-agnostic — the same alert goes to email or Slack, seller's choice. ─── */
const REPORT_CARDS = [
  {
    logo: '/logos/connections/gmail.svg',
    where: 'you@yourbrand.com',
    cadence: 'Weekly · Mondays, 7:00am',
    subject: '$3,140 newly recoverable · 4 claims expire in 11 days',
    lines: [
      { t: 'red',    k: '$725',   v: 'needs action — 2 shipments missing a POD' },
      { t: 'orange', k: '$2,415', v: 'under case — 1 stalled, follow-up sent' },
      { t: 'white',  k: '$1,328', v: 'landed since last Monday' },
    ],
    foot: 'Sorted by deadline, not dollar value — because the window closes either way.',
  },
  {
    logo: '/logos/connections/slack.svg',
    where: '#amazon-reimbursements',
    cadence: 'The moment money lands',
    subject: 'Amazon paid you $1,328',
    lines: [
      { t: 'white',  k: 'FBA195XJ7KWP',     v: 'Damaged, no credit · 11 units' },
      { t: 'green',  k: '$1,328',           v: 'cash · reconciled to your ledger' },
      { t: 'white',  k: 'Case 21142966791', v: 'closed after 34 days' },
    ],
    foot: 'Ping the channel on every win, or roll it into one daily digest. Your call.',
  },
];

/* What the seller can dial in per alert */
const REPORT_CONTROLS = ['Channel', 'Cadence', 'Dollar threshold', 'Which regions', 'Mute anytime'];

function ReimbursementReportsPanel() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-7">
        <p className="text-[10px] font-bold text-white/35 uppercase tracking-[0.2em] mb-2.5" style={{ fontFamily: monoFont }}>
          Reporting
        </p>
        <h5 className="font-extrabold text-xl sm:text-2xl tracking-[-0.02em]">
          You shouldn't have to{' '}
          <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">remember to check.</span>
        </h5>
        <p className="mt-4 text-[15px] text-white/55 max-w-2xl mx-auto leading-relaxed">
          A dashboard only helps the day you open it. Dragon Refunds pushes what changed to your inbox or your Slack —
          what's newly recoverable, what's about to expire, and what actually hit your account.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-2.5 pr-3.5 py-1.5">
            <img src="/logos/connections/gmail.svg" alt="" className="w-4 h-4" />
            <span className="text-[12px] font-semibold text-white/70">Email</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-2.5 pr-3.5 py-1.5">
            <img src="/logos/connections/slack.svg" alt="" className="w-4 h-4" />
            <span className="text-[12px] font-semibold text-white/70">Slack</span>
          </span>
          <span className="text-[12px] text-white/40">— or both</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {REPORT_CARDS.map(c => (
          <div key={c.cadence} className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <img src={c.logo} alt="" className="w-[15px] h-[15px] shrink-0" />
                <span className="text-[13px] font-semibold text-white/80 truncate" style={{ fontFamily: monoFont }}>{c.where}</span>
              </div>
              <span className="text-[10px] font-semibold text-white/40 shrink-0 ml-2" style={{ fontFamily: monoFont }}>{c.cadence}</span>
            </div>
            <div className="px-4 py-3.5 border-b border-white/[0.06]">
              <p className="text-[14px] font-bold text-white/90 leading-snug">{c.subject}</p>
            </div>
            <div className="px-4 py-3 space-y-2">
              {c.lines.map(l => (
                <div key={l.k} className="flex items-baseline gap-2 text-[12px]">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${REIMB2_TONE[l.t].dot}`} />
                  <span className={`font-bold whitespace-nowrap ${REIMB2_TONE[l.t].text}`}>{l.k}</span>
                  <span className="text-white/50">{l.v}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-white/10">
              <p className="text-[11px] text-white/45 leading-relaxed">{c.foot}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        <span className="text-[12px] text-white/45 mr-1">Every alert is yours to set:</span>
        {REPORT_CONTROLS.map(c => (
          <span key={c} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/70 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            <Check className="w-3 h-3 text-[#98CC65]" />{c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Case lifecycle follow-through ─── */
const CASE_ROWS = [
  { id: '21142966791', tone: 'orange', state: 'Stalled', age: '14 days silent',
    detail: 'No Amazon response since Jul 2. Follow-up sent on your behalf, citing the original POD.' },
  { id: '21150337742', tone: 'red', state: 'Denied', age: 'Appeal ready',
    detail: 'Boilerplate denial — "insufficient documentation." Your BOL and packing slip were already on file. Appeal drafted.' },
  { id: '21151003115', tone: 'yellow', state: 'Awaiting you', age: 'Docs needed',
    detail: 'Amazon asked for a supplier invoice. It\'s the only thing standing between this case and $1,540.' },
  { id: '21151002890', tone: 'green', state: 'Approved', age: 'Jul 9',
    detail: '$260 paid in cash and reconciled against your ledger. No reversal so far.' },
];

function ReimbursementCasesPanel() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-7">
        <p className="text-[10px] font-bold text-white/35 uppercase tracking-[0.2em] mb-2.5" style={{ fontFamily: monoFont }}>
          Case follow-through
        </p>
        <h5 className="font-extrabold text-xl sm:text-2xl tracking-[-0.02em]">
          Filing is the easy part.{' '}
          <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Getting paid isn't.</span>
        </h5>
        <p className="mt-4 text-[15px] text-white/55 max-w-2xl mx-auto leading-relaxed">
          Cases stall. Denials arrive as boilerplate. Most money is lost after the claim is filed, not before —
          so Dragon Refunds watches every case until it closes, and tells you the move.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src="/DragonBot-avatar.png" alt="Dragon Refunds" className="w-[18px] h-[18px] object-contain" />
            <span className="text-[13px] font-semibold text-white/80">Open cases</span>
          </div>
          <span className="text-[10px] font-semibold text-white/40" style={{ fontFamily: monoFont }}>4 tracked · 2 need you</span>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {CASE_ROWS.map(c => (
            <div key={c.id} className="flex items-start gap-3 px-4 py-3.5">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${REIMB2_TONE[c.tone].dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#7BA9E0]" style={{ fontFamily: monoFont }}>
                    {c.id}<ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                  <span className={`text-[12px] font-bold ${REIMB2_TONE[c.tone].text}`}>{c.state}</span>
                  <span className="text-[11px] text-white/35">{c.age}</span>
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed mt-1">{c.detail}</p>
              </div>
              <span className="shrink-0 self-center">
                {c.state === 'Stalled' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F59E0B]"><Clock className="w-3.5 h-3.5" />Nudged</span>}
                {c.state === 'Denied' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F0F0F] bg-[#98CC65] rounded px-2 py-0.5"><AlertTriangle className="w-3 h-3" />Appeal</span>}
                {c.state === 'Awaiting you' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F0F0F] bg-[#F5C451] rounded px-2 py-0.5"><FileText className="w-3 h-3" />Upload</span>}
                {c.state === 'Approved' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#98CC65]"><Check className="w-3.5 h-3.5" />Paid</span>}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ─── Reimbursement competitor comparison ─── */
const REIMB_COMPARE_COLS = ['Dragon Refunds', 'GetIDA', 'Seller Investigators'];
const REIMB_COMPARE_GROUPS = [
  {
    label: 'Transparency',
    rows: [
      { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
        values: [{ t: 'Itemized per claim' }, 'partial', 'partial'] },
      { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
        values: ['yes', 'partial', 'partial'] },
    ],
  },
  {
    label: 'What we recover',
    rows: [
      { feature: 'Lost / damaged shipments', values: ['yes', 'yes', 'yes'] },
      { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'no', 'yes'] },
      { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'yes', 'yes'] },
      { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no', 'no'] },
    ],
  },
  {
    label: 'How it works',
    rows: [
      { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
        values: ['yes', 'no', 'no'] },
      { feature: 'Managed commission',
        values: [{ t: '15%' }, { t: '~25%' }, { t: '~25%' }] },
      { feature: 'Who files',
        values: [{ t: 'You, or us' }, { t: 'They do' }, { t: 'They do' }] },
    ],
  },
];

function ReimbCompareCell({ value, isUs }) {
  if (value === 'yes') {
    return <Check className={`w-[18px] h-[18px] mx-auto ${isUs ? 'text-[#98CC65]' : 'text-white/60'}`} />;
  }
  if (value === 'no') {
    return <span className="block text-center text-white/25 text-lg leading-none">–</span>;
  }
  if (value === 'partial') {
    return <span className="block text-center text-[11px] font-semibold text-[#F5C451]">Partial</span>;
  }
  // text value
  return (
    <span className={`block text-center text-[12px] font-semibold ${isUs ? 'text-white' : 'text-white/60'}`}>
      {value.t}
    </span>
  );
}

function ReimbursementComparePanel() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
          How we compare
        </p>
        <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
          Everyone claims to recover your money.{' '}
          <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">We show you where it came from.</span>
        </h4>
        <p className="mt-4 text-[15px] text-white/55 max-w-2xl mx-auto leading-relaxed">
          Most services hand you a number, take 25%, and ask you to trust it. Dragon Refunds pinpoints the exact
          source of every claim — a lost shipment, damaged inventory, a dimension mismatch, a COGS error — keeps the
          whole trail visible, and charges 15% only if you want it filed for you. For operators who want everything
          tracked, not taken on faith.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141618]" style={{ fontFamily: sysFont }}>
        {/* Header row */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-white/10">
          <div className="px-4 py-3.5" />
          {REIMB_COMPARE_COLS.map((c, i) => (
            <div key={c} className={`px-3 py-3.5 text-center ${i === 0 ? 'bg-[#2F7D4F]/15 border-x border-[#2F7D4F]/30' : ''}`}>
              <span className={`text-[13px] font-bold ${i === 0 ? 'text-[#98CC65]' : 'text-white/70'}`}>{c}</span>
            </div>
          ))}
        </div>

        {REIMB_COMPARE_GROUPS.map(group => (
          <div key={group.label}>
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] bg-white/[0.02] border-b border-white/[0.06]">
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35" style={{ fontFamily: monoFont }}>
                {group.label}
              </div>
              <div className="bg-[#2F7D4F]/[0.06] border-x border-[#2F7D4F]/20" />
              <div /><div />
            </div>
            {group.rows.map(row => (
              <div key={row.feature} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center border-b border-white/[0.06] last:border-b-0">
                <div className="px-4 py-3.5">
                  <div className="text-[13px] font-medium text-white/85 leading-snug">{row.feature}</div>
                  {row.note && <div className="text-[11px] text-white/35 mt-0.5">{row.note}</div>}
                </div>
                {row.values.map((v, i) => (
                  <div key={i} className={`px-3 py-3.5 self-stretch flex items-center justify-center ${i === 0 ? 'bg-[#2F7D4F]/[0.06] border-x border-[#2F7D4F]/20' : ''}`}>
                    <div className="w-full"><ReimbCompareCell value={v} isUs={i === 0} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a href="https://app.dragonrefunds.com/sign-up"
          className="px-10 py-5 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3">
          Connect your account <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

/* ─── Reimbursement calculator (refunds page) ─── */
function ReimbursementCalculator() {
  const MIN = 100000, MAX = 10000000;
  const [revenue, setRevenue] = useState(1000000);
  const RATE = 0.015; // ~1.5% of FBA revenue is typically recoverable
  const recoverable = revenue * RATE;
  const fmt = n => '$' + Math.round(n).toLocaleString('en-US');
  const shortUsd = n => n >= 1000000 ? `$${n / 1000000}M` : `$${Math.round(n / 1000)}K`;
  const tiers = [
    { label: 'DIY — file it yourself', fee: 'Free', keep: recoverable, highlight: false },
    { label: 'Done-for-you', fee: '15% fee', keep: recoverable * 0.85, highlight: true },
    { label: 'Typical service', fee: '25% fee', keep: recoverable * 0.75, highlight: false },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
          Reimbursement calculator
        </p>
        <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
          Calculate your{' '}
          <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">potential reimbursement.</span>
        </h4>
        <p className="mt-4 text-[15px] text-white/55 max-w-xl mx-auto leading-relaxed">
          Select your gross annual FBA revenue to see roughly how much Amazon may owe you — and how much of it you keep.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 shadow-2xl bg-[#141618] p-6 sm:p-8" style={{ fontFamily: sysFont }}>
        {/* slider */}
        <div className="flex items-baseline justify-between mb-3">
          <label htmlFor="reimb-calc-range" className="text-[13px] font-semibold text-white/60">FBA revenue range<span className="block text-[11px] font-normal text-white/35">gross annual revenue</span></label>
          <span className="text-2xl font-extrabold text-white tracking-[-0.02em]">{fmt(revenue)}</span>
        </div>
        <input id="reimb-calc-range" type="range" min={MIN} max={MAX} step={50000} value={revenue}
          onChange={e => setRevenue(Number(e.target.value))}
          className="w-full cursor-pointer" style={{ accentColor: '#2F7D4F' }}
          aria-label="FBA revenue range — gross annual revenue" />
        <div className="flex justify-between text-[11px] text-white/35 mt-1" style={{ fontFamily: monoFont }}>
          <span>{shortUsd(MIN)}</span><span>{shortUsd(MAX)}+</span>
        </div>

        {/* headline recoverable */}
        <div className="mt-7 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/45 mb-1">Amount you could recover / year</div>
          <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent tracking-[-0.03em]">
            {fmt(recoverable)}
          </div>
        </div>

        {/* what you keep, per option */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tiers.map(t => (
            <div key={t.label} className={`rounded-xl border px-4 py-4 text-center ${t.highlight ? 'border-[#2F7D4F]/40 bg-[#2F7D4F]/10' : 'border-white/10 bg-white/[0.02]'}`}>
              <div className="text-[12px] font-semibold text-white/70">{t.label}</div>
              <div className="text-[11px] text-white/40 mb-2">{t.fee}</div>
              <div className={`text-xl font-extrabold tracking-[-0.02em] ${t.highlight ? 'text-[#98CC65]' : 'text-white'}`}>{fmt(t.keep)}</div>
              <div className="text-[10px] text-white/35 mt-0.5">you keep</div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-white/35 leading-relaxed">
          Estimate only, based on a typical ~1.5% FBA recovery rate. Your actual recoverable amount depends on your
          shipments, fees, and claim history — run a free audit for the exact figure.
        </p>
      </div>
    </div>
  );
}

/* ─── What's in the box — three pillars ─── */
const PILLARS = [
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Fresh data',
    desc: 'We ETL your Amazon data continuously — orders, ads, inventory, SQP, reviews, messages, account health. Your AI gets sub-second answers instead of waiting on SP-API.',
    badge: 'Updated every few minutes',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Pre-built skills',
    desc: 'Battle-tested workflows your AI can run on command. PPC audits, listing optimization, account health monitoring, weekly reports, and more. No prompt engineering required.',
    badge: 'Discoverable in-chat',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Tutorials',
    desc: 'Step-by-step guides that teach you (and your AI) how to drive the skills. Pick a goal, follow the tutorial, ship the work.',
    badge: 'Updated as Amazon evolves',
  },
];

/* ─── Skills catalog ─── */
const SKILLS = [
  { icon: <BarChart3 className="w-5 h-5" />,    name: 'PPC Audit',              desc: 'Find wasted spend, surface high-converting keywords, get bid-adjustment recommendations.' },
  { icon: <Search className="w-5 h-5" />,       name: 'Keyword Research',       desc: 'Pull relevant keywords from competitor ASINs and your SQP. Output PPC-ready spreadsheets.' },
  { icon: <FileText className="w-5 h-5" />,     name: 'Listing Optimizer',      desc: 'Diagnose title, bullets, A+ content, and backend fields. Suggest revisions grounded in your data.' },
  { icon: <Shield className="w-5 h-5" />,       name: 'Account Health Monitor', desc: 'Watch suppressions, policy warnings, and listing changes. Alert you the moment something breaks.' },
  { icon: <Package className="w-5 h-5" />,      name: 'Inventory Forecast',     desc: 'Project sell-through, flag stock-out risk, and recommend reorder timing per SKU.' },
  { icon: <Star className="w-5 h-5" />,         name: 'Review Monitor',         desc: 'Track new reviews, summarize sentiment trends, and surface complaints worth acting on.' },
  { icon: <TrendingUp className="w-5 h-5" />,   name: 'SQP Analysis',           desc: 'Decode Search Query Performance to find demand you\'re missing and where competitors steal share.' },
  { icon: <DollarSign className="w-5 h-5" />,   name: 'Profit Calculator',      desc: 'True per-unit margin after FBA fees, ads, returns, and storage — by ASIN, by week.' },
  { icon: <MessageSquare className="w-5 h-5" />,name: 'Buyer Message Triage',   desc: 'Classify incoming buyer messages by urgency. Draft replies grounded in your policies.' },
];

function SkillsShowcase() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SKILLS.map((s, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#2F7D4F]/30 hover:bg-white/[0.07] transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#98CC65] bg-[#2F7D4F]/15 border border-[#2F7D4F]/30">
              {s.icon}
            </div>
            <h3 className="font-bold text-base text-white">{s.name}</h3>
          </div>
          <p className="text-[13px] text-white/55 leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECURITY DEMOS — copied from LandingV3 for self-containment
   ═══════════════════════════════════════════════════════════════ */

const AUDIT_ENTRIES = [
  { time: '3:41 PM', action: 'Created FBA shipping plan 6XUQQQ5L',         status: 'done' },
  { time: '3:42 PM', action: 'Rejected: Reduce price B001CUWUO7 → $26.99', status: 'rejected' },
  { time: '3:45 PM', action: 'Paused keyword "garlic press silicone"',     status: 'done' },
  { time: '3:46 PM', action: 'Sent refund $29.99 to Rachel Thompson',      status: 'done' },
  { time: '3:48 PM', action: 'Updated listing images for B0CK5LRQX7',      status: 'done' },
  { time: '3:51 PM', action: 'Generated PPC report — uploaded to Drive',   status: 'done' },
];

function AuditTrailDemo({ light }) {
  return (
    <div className="w-full h-full flex flex-col py-2 px-3" style={{ backgroundColor: light ? '#F1F2F4' : '#2C2A25', borderRadius: '0 0 16px 16px', fontFamily: "'Roboto Mono', monospace" }}>
      {AUDIT_ENTRIES.map((entry, i) => (
        <div key={i} className="flex items-start gap-2 py-1 border-b border-white/10 last:border-0">
          <span className="text-[9px] text-white/70 shrink-0 w-[46px]">{entry.time}</span>
          <span className="text-[9px] text-white flex-1 leading-snug">{entry.action}</span>
          <span className={`text-[8px] font-bold shrink-0 px-1.5 py-px rounded ${
            entry.status === 'done' ? 'bg-[#2F7D4F] text-white' : 'bg-[#DC2626] text-white'
          }`}>
            {entry.status === 'done' ? '✓' : '✗'}
          </span>
        </div>
      ))}
    </div>
  );
}

function SPAPIConnectionDemo({ light }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: light ? '#F1F2F4' : '#1A1D21', borderRadius: '0 0 16px 16px' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative flex items-start justify-between w-full px-6 pb-5" style={{ marginTop: -12 }}>
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-[#3A3A3A] flex items-center justify-center shadow-lg shadow-[#2F7D4F]/20 p-2">
            <img src="/DragonBot-avatar.png" alt="DragonBot" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-semibold text-white/70">DragonBot</span>
        </div>
        <div className="absolute left-[4.5rem] right-[4.5rem] top-6 h-[2px] -translate-y-1/2">
          <div className="absolute inset-0 rounded-full bg-[#98CC65]" style={{ boxShadow: '0 0 6px #98CC65, 0 0 12px #98CC65, 0 0 20px rgba(152,204,101,0.6)' }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0F0F0F] border border-[#2F7D4F]/40 flex items-center justify-center shadow-lg shadow-[#2F7D4F]/30">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6V4a3 3 0 016 0v2" stroke="#98CC65" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="1.5" y="6" width="9" height="7" rx="1.5" fill="#98CC65" />
              <circle cx="6" cy="9.5" r="0.9" fill="#0F0F0F" />
            </svg>
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] border border-[#0F0F0F] flex items-center justify-center shadow-lg p-1">
            <svg viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <text x="20" y="16" fill={light ? '#0F0F0F' : 'white'} fontSize="11" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="-0.4">amazon</text>
              <path d="M6 22 Q 20 27, 34 22" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M31 19.5 L 34 22 L 31.5 24.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <span className="text-[10px] font-semibold text-white/70">Seller Central</span>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#98CC65]/70 whitespace-nowrap" style={{ fontFamily: monoFont, bottom: '22%' }}>
        SP-API · OAuth · Encrypted
      </div>
    </div>
  );
}

const PERMISSION_MODES = [
  { id: 'read-only',  label: 'Read-only',  desc: 'DragonBot can only pull data and generate reports. It cannot make any changes to your accounts.' },
  { id: 'supervised', label: 'Supervised', desc: 'DragonBot can take actions, but asks for your approval first. Nothing happens without your say-so.' },
  { id: 'autonomous', label: 'Autonomous', desc: 'DragonBot handles routine tasks on its own. It only escalates edge cases and high-stakes decisions.' },
];

function PermissionsDemo({ light }) {
  const [selected, setSelected] = useState('read-only');
  const mode = PERMISSION_MODES.find(m => m.id === selected);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col px-4 py-3" style={{ backgroundColor: light ? '#F1F2F4' : '#1A1D21', borderRadius: '0 0 16px 16px', fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AnimatePresence>
        {!clicked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10">
            <span className="text-[#98CC65] text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: monoFont }}>Click here</span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="16" height="18" viewBox="0 0 7 10" fill="none" style={{ imageRendering: 'pixelated' }}>
                <rect x="2" y="0" width="3" height="4" fill="#2E7E4F"/>
                <rect x="0" y="4" width="7" height="1" fill="#2E7E4F"/>
                <rect x="1" y="5" width="5" height="1" fill="#2E7E4F"/>
                <rect x="2" y="6" width="3" height="1" fill="#2E7E4F"/>
                <rect x="3" y="7" width="1" height="1" fill="#2E7E4F"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex rounded-lg overflow-hidden border border-white/10 mb-3">
        {PERMISSION_MODES.map(m => (
          <button key={m.id} onClick={() => { setSelected(m.id); setClicked(true); }}
            className={`flex-1 py-1.5 text-[10px] font-semibold transition-all ${
              selected === m.id ? 'bg-[#2F7D4F] text-white' : 'bg-white/5 text-white/40 hover:text-white/60'
            }`}>
            {m.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={selected} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
          className="text-[11px] leading-relaxed text-white/50">
          {mode.desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const APPROVAL_ACTIONS = [
  { text: 'Creating FBA shipping plan 6XUQQQ5L', time: '3:41 PM' },
  { text: 'Reducing price for "Premium Garlic Pre..." ASIN B001CUWUO7 to $26.99', time: '3:42 PM' },
];

function ApprovalDemo({ light }) {
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const delays = [1500, 800, 600, 1500, 800, 600, 2000];
    const advance = () => {
      setStep(s => {
        const next = s >= 6 ? 0 : s + 1;
        timerRef.current = setTimeout(advance, delays[next] || 1500);
        return next;
      });
    };
    timerRef.current = setTimeout(advance, delays[0]);
    return () => clearTimeout(timerRef.current);
  }, []);

  const containerRef = useRef(null);
  const approveRef = useRef(null);
  const rejectRef = useRef(null);
  const [cursorXY, setCursorXY] = useState({ x: 0, y: 0 });
  const cursorVisible = step === 1 || step === 4;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    if (step === 1 && approveRef.current) {
      const btn = approveRef.current.getBoundingClientRect();
      setCursorXY({ x: btn.left - container.left + btn.width / 2, y: btn.top - container.top + btn.height / 2 });
    } else if (step === 4 && rejectRef.current) {
      const btn = rejectRef.current.getBoundingClientRect();
      setCursorXY({ x: btn.left - container.left + btn.width / 2, y: btn.top - container.top + btn.height / 2 });
    }
  }, [step]);

  const renderAction = (idx, action, decided, isApproved) => (
    <div className="flex gap-2 px-3 py-1.5" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="shrink-0 w-7 h-7 rounded flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#3A3A3A' }}>
        <img src="/DragonBot-avatar.png" className="w-5 h-5 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span className="font-black text-[11px]" style={{ color: light ? '#2B2D31' : '#D1D2D3' }}>DragonBot</span>
          <span className="text-[9px] font-bold px-1 py-px rounded" style={{ backgroundColor: '#2F7D4F', color: '#FFFFFF' }}>APP</span>
          <span className="text-[9px]" style={{ color: light ? '#6B7280' : '#9B9C9E' }}>{action.time}</span>
        </div>
        <div className="text-[11px] leading-relaxed mb-1.5" style={{ color: light ? '#2B2D31' : '#D1D2D3' }}>{action.text}</div>
        <div className="flex gap-1.5">
          {decided ? (
            isApproved ? (
              <>
                <span className="px-3 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: '#2F7D4F', color: '#FFFFFF' }}>✓ Approved</span>
                <span className="px-3 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: light ? '#E4E4E7' : '#3A3A3A', color: light ? '#9CA3AF' : '#6B6B6B' }}>Reject</span>
              </>
            ) : (
              <>
                <span className="px-3 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: light ? '#E4E4E7' : '#3A3A3A', color: light ? '#9CA3AF' : '#6B6B6B' }}>Approve</span>
                <span className="px-3 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: '#DC2626', color: '#FFFFFF' }}>✗ Rejected</span>
              </>
            )
          ) : (
            <>
              <button ref={idx === 0 ? approveRef : null} className="px-3 py-1 rounded text-[10px] font-bold cursor-default" style={{ backgroundColor: '#2F7D4F', color: '#FFFFFF' }}>Approve</button>
              <button ref={idx === 1 ? rejectRef : null} className="px-3 py-1 rounded text-[10px] font-bold cursor-default" style={{ backgroundColor: '#DC2626', color: '#FFFFFF' }}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col justify-end gap-1 py-2" style={{ backgroundColor: light ? '#F1F2F4' : '#1A1D21', borderRadius: '0 0 16px 16px' }}>
      <AnimatePresence mode="popLayout">
        {step >= 0 && (
          <motion.div key="action-0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {renderAction(0, APPROVAL_ACTIONS[0], step >= 2, true)}
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div key="action-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {renderAction(1, APPROVAL_ACTIONS[1], step >= 5, false)}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="absolute pointer-events-none z-10" style={{ left: 0, top: 0 }}
        animate={{ x: cursorXY.x, y: cursorXY.y, opacity: cursorVisible ? 1 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M1 1L1 14.5L4.5 11L8.5 18L10.5 17L6.5 10L11 10L1 1Z" fill={light ? '#374151' : 'white'} stroke={light ? '#F1F2F4' : '#222'} strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── Final dragon CTA (copied from LandingV3) ─── */
const BUBBLE_PHRASES = [
  'What are you waiting for?',
  'Plug me into your AI.',
  'A Dragon\’s work is never done... 🐉',
  'Ready to slay some tasks?',
  'Let’s conquer your to-do list!',
  'DragonBot: because you have better things to do.',
];

/* Refunds page gets its own reimbursement-flavored bubble phrases. */
const REFUND_BUBBLE_PHRASES = [
  'What are you waiting for?',
  'Plug me into your workflow.',
  'A Dragon\’s work is never done... 🐉',
  'Ready to slay some tasks?',
  'Let’s conquer the money Amazon owes you!',
  'Dragon Refunds: because you have better things to do.',
];

function DragonFinalCTA({ phrases = BUBBLE_PHRASES }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % phrases.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="relative mb-2">
        <div className="px-10 py-6 text-2xl font-black uppercase tracking-widest"
          style={{
            backgroundColor: '#FFFFFF', color: '#0F0F0F', fontFamily: monoFont,
            border: '6px solid #0F0F0F', boxShadow: '0 8px 0 0 rgba(0,0,0,0.3)',
            minWidth: '420px', textAlign: 'center',
          }}>
          <AnimatePresence mode="wait">
            <motion.span key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="inline-block">
              {phrases[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
        <svg width="48" height="36" viewBox="0 0 12 9" fill="none" className="absolute -bottom-[30px]"
          style={{ left: '80%', transform: 'translateX(-50%)', imageRendering: 'pixelated' }}>
          <rect x="3" y="0" width="6" height="2" fill="#FFFFFF" />
          <rect x="4" y="2" width="4" height="1" fill="#FFFFFF" />
          <rect x="5" y="3" width="2" height="1" fill="#FFFFFF" />
          <rect x="3" y="0" width="1" height="2" fill="#0F0F0F" />
          <rect x="8" y="0" width="1" height="2" fill="#0F0F0F" />
          <rect x="3" y="2" width="1" height="1" fill="#0F0F0F" />
          <rect x="4" y="2" width="1" height="1" fill="#0F0F0F" />
          <rect x="7" y="2" width="1" height="1" fill="#0F0F0F" />
          <rect x="8" y="2" width="1" height="1" fill="#0F0F0F" />
          <rect x="4" y="3" width="1" height="1" fill="#0F0F0F" />
          <rect x="5" y="3" width="1" height="1" fill="#0F0F0F" />
          <rect x="6" y="3" width="1" height="1" fill="#0F0F0F" />
          <rect x="7" y="3" width="1" height="1" fill="#0F0F0F" />
          <rect x="5" y="4" width="1" height="1" fill="#0F0F0F" />
          <rect x="6" y="4" width="1" height="1" fill="#0F0F0F" />
        </svg>
      </div>
      <img src="/DragonBot-logo.png" alt="Dragon Refunds" className="w-auto" style={{ height: '168px' }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — doubles as the template for Google Ads feature pages.

   Pass a `page` object (from src/data/lpPages.js, template:'feature')
   to override the hero + chat demo while keeping every other section
   identical to the homepage:
     page.hero.segments  → [{ text, color: 'orange'|'white'|'green' }]
     page.hero.paragraph → hero subhead
     page.demo.feature   → "Amazon repricing" (renders "Your X with DragonBot")
     page.demo.script    → chat messages [{who, text, tool?, stats?}]
   ═══════════════════════════════════════════════════════════════ */
const SEG_CLASS = {
  orange: 'bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent',
  green: 'bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent',
  white: 'text-white',
};

export default function LandingV4({ page = null }) {
  // Reimbursements sandbox opens in light theme by default; other pages stay dark.
  const [light, setLight] = useState(page?.demo?.type === 'dashboard2');
  useEffect(() => {
    if (!page) return;
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
    <div className={`v2-page min-h-screen bg-[#0F0F0F] text-white${light ? ' theme-light' : ''}`} style={{ fontFamily: sysFont }}>
      <style>{`
        .v2-page h1,.v2-page h2,.v2-page h3,.v2-page h4,.v2-page h5,.v2-page h6{font-family:inherit!important}
        /* keep anchor targets clear of the 72px fixed navbar */
        .v2-page section[id]{scroll-margin-top:88px}
      `}</style>
      <Navbar light={light} onToggle={() => setLight(v => !v)}
        links={page?.demo?.type === 'dashboard2' ? REIMB_NAV_LINKS : navLinks}
        showWorksWith={page?.demo?.type !== 'dashboard2'}
        ctaLabel={page?.demo?.type === 'dashboard2' ? 'Connect your account' : 'Get it free'}
        brand={page?.demo?.type === 'dashboard2' ? (
          <span className="font-bold text-[22px] sm:text-[25px] text-white whitespace-nowrap" style={{ lineHeight: '1' }}>
            Dragon <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Refunds</span>
          </span>
        ) : null} />

      {/* ─── HERO ─── */}
      <section id="top" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* The AI-hosts eyebrow is the MCP pitch — irrelevant on the
                reimbursements page, which sells a recovery service. */}
            {page?.demo?.type !== 'dashboard2' && (
              <Eyebrow>
                Works with{' '}
                <span style={{ fontWeight: 700 }}>Claude</span>,{' '}
                <span style={{ fontWeight: 700 }}>ChatGPT</span>,{' '}
                <span style={{ fontWeight: 700 }}>Cursor</span>, and any AI
              </Eyebrow>
            )}

            {/* Keyword eyebrow (SEO): keeps the target term prominent above the
                brand-forward headline. Rendered only when a page sets hero.eyebrow. */}
            {page?.hero?.eyebrow && (
              <Eyebrow>{page.hero.eyebrow}</Eyebrow>
            )}

            <h1 className="font-extrabold text-[40px] sm:text-[56px] lg:text-[72px] text-white leading-[1.05] tracking-[-0.035em] mb-6">
              {page?.hero?.segments ? (
                page.hero.segments.map((seg, i) => (
                  <span key={i}>
                    <span className={SEG_CLASS[seg.color] || SEG_CLASS.white}>{seg.text}</span>
                    {i < page.hero.segments.length - 1 ? ' ' : ''}
                  </span>
                ))
              ) : (
                <>
                  Connect your AI to{' '}
                  <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">Amazon Seller Central.</span>{' '}
                  <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Free forever.</span>
                </>
              )}
            </h1>

            <p className="text-[17px] sm:text-[19px] text-white/55 max-w-2xl mx-auto mb-10 leading-[1.6] tracking-[-0.01em]">
              {(page?.hero?.paragraph || 'Give your AI chat secure access to your Amazon data — orders, ads, inventory, reviews, customer messages, and more. Plug DragonBot into Claude, ChatGPT, Cursor, or any MCP client in seconds.')
                .split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
                ))}
            </p>

            {/* Hero CTA: feature pages get a single "Get it free" button;
                the homepage keeps the 4 host connect buttons. */}
            {page ? (
              <div className="flex justify-center mb-10">
                <a href="https://app.dragonrefunds.com/sign-up"
                  className="px-10 py-5 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3">
                  {page?.demo?.type === 'dashboard2' ? 'Connect your account' : 'Get it free'} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-10">
                {HOSTS.map(h => (
                  <a key={h.id} href="https://app.dragonrefunds.com/sign-up"
                    className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-white/5 hover:bg-[#2F7D4F]/15 border border-white/15 hover:border-[#98CC65]/40 rounded-lg transition-all text-[13px] sm:text-sm font-semibold text-white/85 hover:text-white cursor-pointer">
                    <HostMark host={h} size={20} />
                    <span>Connect Amazon Seller Central to {h.id === 'other' ? 'any MCP client' : h.label}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Trust strip — legit reassurance */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-medium tracking-[-0.01em]">
              <a href="https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.d78b7343-017b-4e68-92e4-a1defb51aa6f"
                target="_blank" rel="noopener noreferrer"
                title="View Dragon Refunds on Amazon.com"
                className="flex items-center gap-2 text-[#98CC65] hover:text-white transition-colors">
                <BadgeCheck className="w-4 h-4" />
                <span className="underline decoration-[#98CC65]/40 underline-offset-2">Amazon approved</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="flex items-center gap-2 text-white/50">
                <Shield className="w-4 h-4 text-[#2F7D4F]" />
                Amazon ToS Compliant
              </span>
              {page?.demo?.type !== 'dashboard2' && (
                <span className="flex items-center gap-2 text-white/50">
                  <DollarSign className="w-4 h-4 text-[#2F7D4F]" />
                  Basic plan is <strong className="font-bold text-[#98CC65]" style={{ fontFamily: monoFont }}>FREE FOREVER</strong>
                </span>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className={page?.demo?.type === 'dashboard2' ? '' : 'mt-10 text-center'}>
            {page?.demo?.type === 'dashboard2' ? <SellerCredBand /> : (
              <>
                <p className="text-[15px] font-semibold text-white/60 mb-2">We sell on Amazon too</p>
                <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">10 years on Amazon · 8 figures sold · DragonBot is the employee we always wanted</p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Reimbursement calculator (sandbox /refunds only) — sits between the
           "we sell on Amazon" credentials band and the shipment-refunds dashboard. ─── */}
      {page?.demo?.type === 'dashboard2' && (
        <Section id="calculator" className="!py-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <ReimbursementCalculator />
          </motion.div>
        </Section>
      )}

      {/* ─── YOUR AI WITH DRAGONBOT (chat demo) ─── */}
      <Section id={page?.demo?.type === 'dashboard2' ? 'shipment-refunds' : 'your-ai'} className="!py-16">
        {page?.demo?.type === 'dashboard2' && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <ReimbursementAuditIntro />
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="flex justify-center">
          {page?.demo?.type === 'dashboard'
            ? <ReimbursementDashboard feature={page.demo.feature} />
            : page?.demo?.type === 'dashboard2'
            ? <ReimbursementDashboardV2 feature={page.demo.feature} showHeading={false} />
            : <ChatDemo key={page?.path || 'home'} script={page?.demo?.script || CHAT_SCRIPT} feature={page?.demo?.feature || null} />}
        </motion.div>
      </Section>

      {/* ─── Reimbursement feature deep-dives (sandbox /refunds only) ─── */}
      {page?.demo?.type === 'dashboard2' && (
        <>
          <Section id="more-refunds" className="!py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
              <ReimbursementFeatures />
            </motion.div>
          </Section>
          <Section id="automated-workflow" className="!py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
                Automated workflow
              </p>
              <h4 className="font-extrabold text-3xl sm:text-4xl tracking-[-0.03em]">
                On <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">autopilot.</span>
              </h4>
              <p className="mt-4 text-[15px] text-white/55 leading-relaxed">
                The audit runs once. After that, Dragon Refunds becomes part of how you operate — surfacing what changed
                the moment it changes, and chasing every filed case until it closes. You approve; it does the rest.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
              <ReimbursementReportsPanel />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
              className="mt-16">
              <ReimbursementCasesPanel />
            </motion.div>
          </Section>
          <Section id="vs-others" className="!py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
              <ReimbursementComparePanel />
            </motion.div>
          </Section>
        </>
      )}

      {/* ─── Everything from here to the final dragon CTA is suppressed on the
           reimbursements sandbox: that page ends on the case-follow-through
           section and goes straight to the dragon. ─── */}
      {page?.demo?.type !== 'dashboard2' && (
      <>

      {/* ─── SELLER VIDEOS ─── */}
      <Section id="seller-videos">
        <div className="text-center mb-10">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            See what <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">Amazon Sellers</span> have been building with{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {sellerVideos.map(v => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-white/10 hover:border-[#2F7D4F]/40 transition-all hover:shadow-lg hover:shadow-[#2F7D4F]/10 group">
              <div className="relative aspect-video">
                <img src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#2F7D4F] flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                {v.duration && (
                  <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white bg-black/80 px-1.5 py-0.5 rounded">
                    {v.duration}
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white/80 leading-snug">{v.title}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* ─── WHAT'S IN THE BOX ─── */}
      <Section id="whats-in-the-box">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
            What you get
          </p>
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Here is what{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot gives you.</span>
          </h4>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#2F7D4F]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#2F7D4F]/15 border border-[#2F7D4F]/30 flex items-center justify-center text-[#98CC65] mb-4">
                {p.icon}
              </div>
              <h3 className="font-bold text-xl text-white mb-2">{p.title}</h3>
              <p className="text-[14px] text-white/55 leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#98CC65]/80 bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-full px-2.5 py-1" style={{ fontFamily: monoFont }}>
                {p.badge}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── WHY ETL ─── */}
      <Section id="why-etl">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
            Why ETL?
          </p>
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Other MCP servers wait on SP-API.{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">We don't.</span>
          </h4>
          <p className="mt-4 text-base text-white/50 max-w-2xl mx-auto">
            Live SP-API calls are rate-limited, latent, and brittle. We pre-pull everything so your AI gets answers the moment you ask.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-300/70" style={{ fontFamily: monoFont }}>Other MCP servers</span>
            </div>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Hit SP-API live on every query</li>
              <li className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Burn your SP-API rate limits</li>
              <li className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Multi-second latency per tool call</li>
              <li className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> One report can take minutes</li>
              <li className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> Cross-source joins (SQP + ads + reviews) are slow and clunky</li>
            </ul>
          </div>
          <div className="bg-[#2F7D4F]/10 border border-[#2F7D4F]/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <img src="/DragonBot-logo.png" alt="DragonBot" className="w-5 h-5 object-contain" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#98CC65]" style={{ fontFamily: monoFont }}>DragonBot</span>
            </div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" /> Continuously ETL'd to our warehouse</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" /> Sub-second response per tool call</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" /> Your rate limits stay untouched</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" /> Pre-joined views across orders, ads, SQP, reviews</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" /> Historical depth without re-pulling</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ─── SKILLS ─── */}
      <Section id="skills">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
            Skills
          </p>
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] mb-4">
            Pre-built workflows your{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">AI runs on command.</span>
          </h4>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            Skills wrap real Amazon work — audits, analyses, alerts, reports — so your AI delivers finished output, not a prompt-engineering project.
          </p>
        </div>
        <SkillsShowcase />
      </Section>

      {/* ─── SECURITY ─── */}
      <Section id="security">
        <div className="text-center mb-14">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Let's talk <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">security</span> and <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">accountability</span>
          </h4>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Your Amazon account is your business. We treat it that way.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Check className="w-6 h-6" />, title: 'Amazon SP-API Connection', desc: '100% Amazon terms-of-service compliant. Official SP-API only. No scraping. No gray areas.' },
            { icon: <Brain className="w-6 h-6" />, title: 'Permissions you control', subtitle: '✓ Read-only by default', desc: 'Read-only, supervised, or autonomous. You choose.' },
            { icon: <Zap className="w-6 h-6" />, title: 'Supervised mode', desc: 'DragonBot asks before touching your account. Send a refund? Pause a campaign? You decide.' },
            { icon: <Database className="w-6 h-6" />, title: 'Full audit trail', desc: 'Every action logged — what, when, and why.' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#2F7D4F]/30 hover:shadow-lg hover:shadow-[#2F7D4F]/5 transition-all flex flex-col">
              <div className="p-6 pb-4">
                <h3 className="font-bold text-xl mb-1">{f.title}</h3>
                {f.subtitle && <p className="text-[#98CC65] text-sm font-semibold mb-1">{f.subtitle}</p>}
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
              <div className="mt-auto">
                {f.title === 'Supervised mode' ? (
                  <div className="w-full h-44"><ApprovalDemo light={light} /></div>
                ) : f.title === 'Permissions you control' ? (
                  <div className="w-full h-36"><PermissionsDemo light={light} /></div>
                ) : f.title === 'Full audit trail' ? (
                  <div className="w-full h-52"><AuditTrailDemo light={light} /></div>
                ) : f.title === 'Amazon SP-API Connection' ? (
                  <div className="w-full h-36"><SPAPIConnectionDemo light={light} /></div>
                ) : (
                  <div className="w-full h-36 bg-gradient-to-b from-white/5 to-white/10 flex items-end justify-center">
                    <span className="text-xs text-white/20 mb-4">Illustration</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── PLANS ─── */}
      <Section id="plans">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>
            Plans
          </p>
          <h4 className="font-extrabold text-3xl sm:text-4xl tracking-[-0.03em] leading-tight">
            Start free.{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Upgrade when you're ready.</span>
          </h4>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Forever */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>Basic</p>
              <h3 className="font-extrabold text-2xl text-white mb-1">Free forever</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-white/40 text-sm">/ month</span>
              </div>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">
                Read-only access. Pull data, run analyses, build reports — as much as you want.
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                'Every skill, read-only',
                'Always-fresh ETL\'d data',
                'Amazon SP-API connection',
                'Works with Claude, ChatGPT, Cursor, any MCP client',
                'No credit card required',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="https://app.dragonrefunds.com/sign-up"
              className="block text-center px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all">
              Get it free
            </a>
          </div>

          {/* Read + Write (Beta) — emphasized */}
          <div className="relative bg-gradient-to-b from-[#2F7D4F]/15 to-[#0F0F0F] border-2 border-[#2F7D4F]/50 rounded-2xl p-8 flex flex-col shadow-2xl shadow-[#2F7D4F]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] text-[#0F0F0F] text-[10px] font-bold uppercase tracking-widest rounded-full" style={{ fontFamily: monoFont }}>
              Private beta
            </div>
            <div className="mb-6">
              <p className="text-[11px] font-bold text-[#98CC65] uppercase tracking-[0.2em] mb-3" style={{ fontFamily: monoFont }}>Read + Write</p>
              <h3 className="font-extrabold text-2xl text-white mb-1">Take actions on Amazon</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">$50</span>
                <span className="text-white/40 text-sm">/ month</span>
              </div>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">
                Everything in Free, plus your AI can take action — pause campaigns, send refunds, edit listings, and more.
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                'Everything in Free forever',
                'Write operations on Seller Central',
                'Supervised mode (approval-gated)',
                'Autonomous mode for routine actions',
                'Full audit trail',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                  <Check className="w-4 h-4 text-[#98CC65] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="/beta"
              className="block text-center px-6 py-3 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25">
              Request beta access
            </a>
          </div>
        </div>
      </Section>

      </>
      )}

      {/* ─── FINAL DRAGON CTA ─── */}
      <section className="pt-0 pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
          <DragonFinalCTA phrases={page?.demo?.type === 'dashboard2' ? REFUND_BUBBLE_PHRASES : undefined} />
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0F3D2E] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <img src="/DragonBot-logo.png" alt="Dragon Refunds" className="h-8" />
              <span className="font-bold text-lg text-white">{page?.demo?.type === 'dashboard2' ? 'Dragon Refunds' : 'DragonBot'}</span>
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
