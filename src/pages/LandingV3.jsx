import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Play, ArrowRight, Zap, Database, Brain, Check } from 'lucide-react';
import { tr } from 'framer-motion/client';
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

/* ─── Navbar (self-contained for this page) ─── */
const navLinks = [
  { label: 'Product', href: '/', active: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Privacy', href: '/privacy', newTab: true },
  { label: 'Support', href: '/support', newTab: true },
];

function NavbarV2() {
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
          <a href="/v3" className="flex items-center gap-3">
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="h-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="font-bold text-[28px] text-white" style={{ lineHeight: '1' }}>get<span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span><span className="text-white">.com</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} {...(l.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`text-[13px] font-medium transition-colors ${l.active ? 'text-white bg-white/10 px-3 py-1.5 rounded-md' : 'text-white/50 hover:text-[#98CC65]'}`} style={{ fontFamily: monoFont }}>{l.label}</a>
            ))}
            <CompareDropdown />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="/beta"
              className="px-5 py-2.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-sm font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-lg hover:shadow-[#2F7D4F]/25">
              Request Access
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#0F0F0F] pt-20 px-6">
            <div className="flex flex-col gap-6">
              {navLinks.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-white">{l.label}</a>
              ))}
              <CompareDropdownMobile onItemClick={() => setMobileOpen(false)} />
              <a href="/beta" onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] text-center font-semibold uppercase tracking-wide rounded-lg transition-all">
                Request Access
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

/* ─── Video placeholder ─── */
function VideoPlaceholder({ label = 'Video coming soon' }) {
  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-[#f4faf6] to-[#e8f5ed] rounded-2xl border border-[#2F7D4F]/10 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0iIzJGN0Q0RiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-50" />
      <div className="flex flex-col items-center gap-3 z-10">
        <div className="w-16 h-16 rounded-full bg-[#2F7D4F] flex items-center justify-center shadow-xl shadow-[#2F7D4F]/25">
          <Play className="w-7 h-7 text-white ml-1" fill="white" />
        </div>
        <span className="text-sm text-[#1A1A1A]/40">{label}</span>
      </div>
    </div>
  );
}

/* ─── Slack demo — per-channel messages ─── */
const SLACK_CHANNELS = ['#general', '#ppc', '#keyword-research', '#product-research', '#customer-support'];
const SLACK_DMS = [
  { name: 'Jake Morrison', initials: 'JM' },
  { name: 'Lisa Kim', initials: 'LK' },
  { name: 'Omer Ben-Ari', initials: 'OB' },
  { name: 'DragonBot', initials: '🐉', isBot: true },
];

const CHANNEL_MSGS = {
  '#general': [
    { who: 'Jake', initials: 'JM', color: '#1264A3', time: '10:07 AM', text: <><span style={{ color: '#1264A3', fontWeight: 700 }}>@here</span> — URGENT! Our Amazon listing got suppressed, we're losing $2K/hour</> },
    { who: 'Omer', initials: 'OB', color: '#E67E22', time: '10:08 AM', text: <>Busy</> },
    { who: 'Lisa', initials: 'LK', color: '#7C3AED', time: '10:08 AM', text: <>I'm on vacation 🏖️</> },
    { who: 'Jake', initials: 'JM', color: '#1264A3', time: '10:10 AM', text: <><span style={{ color: '#1264A3', fontWeight: 700 }}>@DragonBot</span> ?</>, tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '10:13 AM', isBot: true, isThread: true, text: <>Found it — backend image URL returned a 404, triggered an automated suppression. I've re-uploaded the image and submitted a reinstatement request. Listing should be back within 2 hours.<br/><span style={{ color: '#1264A3', fontSize: 13, fontWeight: 600, marginTop: 4, display: 'inline-block' }}>See more</span></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '10:14 AM', isBot: true, isThread: true, text: <>Want me to set up a scheduled task to check all your listings every hour? I'll ping you here immediately if anything goes down 🐉</> },
    { who: 'Jake', initials: 'JM', color: '#1264A3', time: '10:15 AM', isThread: true, text: 'yes please', tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '10:15 AM', isBot: true, isThread: true, text: <>Done. You can see all of my scheduled tasks on <span style={{ color: '#1264A3', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>this page</span>. 🐉</> },
  ],
  '#ppc': [
    { who: 'Lisa', initials: 'LK', color: '#7C3AED', time: '2:15 PM', text: 'Our product launch ACOS is wayy too high, anyone got time to dig in?' },
    { who: 'Lisa', initials: 'LK', color: '#7C3AED', time: '2:16 PM', text: <><span style={{ color: '#1264A3', fontWeight: 700 }}>@DragonBot</span> can you take a look?</>, tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:22 PM', isBot: true, isThread: true, text: <>Found 23 bleeding keywords. Paused them. ACOS projected to go down from 38% to 26%.<br/><span style={{ color: '#9B9C9E', fontSize: 13, fontStyle: 'italic' }}>I'll check again in 24h and report back.</span></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:22 PM', isBot: true, isThread: true, text: <><div style={{ fontWeight: 700, marginBottom: 4 }}>Here's what I did:</div><div style={{ borderLeft: '3px solid #3F4145', paddingLeft: 10, fontSize: 13, color: '#9B9C9E', display: 'flex', flexDirection: 'column', gap: 4 }}><div>🛑 Paused: "garlic press silicone", "garlic mincer cheap", "kitchen tool set garlic" — bleeding $42/day with 0 conversions</div><div>🛑 Paused: "garlic crusher bulk", "garlic peeler press combo" — high impressions, 0.3% CTR, $18/day wasted</div><div>✅ Reallocated $60/day to: "stainless steel garlic press", "garlic press easy clean", "premium garlic crusher", "large garlic press" — all converting at 12%+ ROAS</div></div><div style={{ marginTop: 6, color: '#9B9C9E', fontSize: 13, fontStyle: 'italic' }}>I'll check again in 24h and report back.</div></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:23 PM', isBot: true, isThread: true, text: <>Want me to look into Amazon SQP data to suggest more relevant keywords for our PPC campaign?</> },
    { who: 'Lisa', initials: 'LK', color: '#7C3AED', time: '2:25 PM', isThread: true, text: 'yes please', tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:25 PM', isBot: true, isThread: true, text: <>Give me a minute. Pulling SQP data from Amazon Seller Central.</> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:28 PM', isBot: true, isThread: true, text: <><div style={{ fontWeight: 700, marginBottom: 4 }}>SQP analysis complete. Here's what I found:</div><div style={{ borderLeft: '3px solid #3F4145', paddingLeft: 10, fontSize: 13, color: '#9B9C9E', display: 'flex', flexDirection: 'column', gap: 4 }}><div><strong style={{ color: '#D1D2D3' }}>Top purchase drivers:</strong> "garlic press stainless steel" (23% purchase share), "garlic crusher heavy duty" (18%), "easy clean garlic press" (14%)</div><div><strong style={{ color: '#D1D2D3' }}>We're missing:</strong> "garlic press dishwasher safe" — 9,200 monthly searches, competitors converting at 15%, we have 0 bids on it</div><div><strong style={{ color: '#D1D2D3' }}>Brand comparison:</strong> Shoppers who viewed us also viewed Zulay (34%) and OXO (28%) — we're losing on "premium" keywords they dominate</div></div></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:29 PM', isBot: true, isThread: true, text: <>Want me to put all of this in a Google Sheet so you can share it with the team? I can also set up the new campaigns based on these findings. Just message me anytime 🐉</> },
  ],
  '#keyword-research': [
    { who: 'Omer', initials: 'OB', color: '#E67E22', time: '11:30 AM', text: <><span style={{ color: '#1264A3', fontWeight: 700 }}>@DragonBot</span> do keyword research on these competitor ASINs:<br/>B0CK5LRQX7, B0D3FHYMN1, B0BX1GTNRV, B0CQXG71VB, B0DK7HM3RP</>, tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '11:34 AM', isBot: true, isThread: true, text: <>Done. Full keyword research workbook ready — uploaded to Google Drive:<div style={{ marginTop: 8, border: '1px solid #3F4145', borderRadius: 8, overflow: 'hidden', maxWidth: 380 }}><div style={{ backgroundColor: '#0F9D58', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 18, height: 18, backgroundColor: 'white', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#0F9D58' }}>S</div><span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>Competitor ASIN Analysis — Workbook</span></div><div style={{ padding: '6px 10px', backgroundColor: '#2C2D30', display: 'flex', gap: 3, fontSize: 10, color: '#9B9C9E' }}>{['Raw Data', 'Filtered', 'Root KWs', 'Master List', 'PPC Setup'].map((t, i) => <span key={i} style={{ padding: '2px 6px', backgroundColor: i === 0 ? '#3F4145' : 'transparent', borderRadius: 3, fontWeight: i === 0 ? 600 : 400 }}>{t}</span>)}</div></div><div style={{ marginTop: 6, fontSize: 13, color: '#9B9C9E' }}>1,847 relevant keywords across 5 ASINs. 312 root keywords identified. 89 negative match candidates flagged. PPC Setup tab has suggested campaign structure with bid estimates.</div></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '11:35 AM', isBot: true, isThread: true, text: <>Have a look and let me know if you want any changes — I can keep editing the sheet with you. Just message me here anytime 🐉</> },
  ],
  '#product-research': [
    { who: 'Jake', initials: 'JM', color: '#1264A3', time: '9:15 AM', text: <><span style={{ color: '#1264A3', fontWeight: 700 }}>@DragonBot</span> we're thinking about launching a new garlic press. Can you analyze these 5 competitors?<br/>B0BXDMWJMG, B0CP8BRKJX, B09X1T9FWC, B0CG7GRMP2, B0DFDJFYRN</>, tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '9:22 AM', isBot: true, isThread: true, text: <>Done. Full competitive analysis ready — uploaded to Google Drive:<div style={{ marginTop: 8, border: '1px solid #3F4145', borderRadius: 8, overflow: 'hidden', maxWidth: 420 }}><div style={{ backgroundColor: '#0F9D58', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 18, height: 18, backgroundColor: 'white', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#0F9D58' }}>S</div><span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>Garlic Press — Competitor Analysis</span></div><div style={{ padding: '6px 10px', backgroundColor: '#2C2D30', display: 'flex', gap: 3, fontSize: 10, color: '#9B9C9E' }}>{['Overview', 'Reviews', 'Sales Est.', 'Opportunities'].map((t, i) => <span key={i} style={{ padding: '2px 6px', backgroundColor: i === 0 ? '#3F4145' : 'transparent', borderRadius: 3, fontWeight: i === 0 ? 600 : 400 }}>{t}</span>)}</div></div></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '9:22 AM', isBot: true, isThread: true, text: <><div style={{ fontSize: 13, lineHeight: 1.7, color: '#D1D2D3' }}><div style={{ fontWeight: 700, marginBottom: 4 }}>Quick summary:</div><div style={{ borderLeft: '3px solid #3F4145', paddingLeft: 10, color: '#9B9C9E', display: 'flex', flexDirection: 'column', gap: 6 }}><div><strong style={{ color: '#D1D2D3' }}>B0BXDMWJMG</strong> — ~4,200 units/mo · ⭐ 4.6 (12,847 reviews)<br/>Pros: ergonomic handle, built-in cleaner. Cons: rusts after 3-4 months per reviews.</div><div><strong style={{ color: '#D1D2D3' }}>B0CP8BRKJX</strong> — ~2,800 units/mo · ⭐ 4.4 (3,291 reviews)<br/>Pros: large chamber, dishwasher safe. Cons: hinge feels cheap, multiple complaints.</div><div><strong style={{ color: '#D1D2D3' }}>B09X1T9FWC</strong> — ~1,900 units/mo · ⭐ 4.7 (8,104 reviews)<br/>Pros: stainless steel, premium feel. Cons: priced high at $24.99, small garlic chamber.</div><div><strong style={{ color: '#D1D2D3' }}>B0CG7GRMP2</strong> — ~3,500 units/mo · ⭐ 4.3 (5,672 reviews)<br/>Pros: budget-friendly at $9.99, 2-pack. Cons: weak leverage, not for large cloves.</div></div><div style={{ marginTop: 8, color: '#D1D2D3' }}><strong>🔥 Opportunity:</strong> No one is offering a rust-proof, large-chamber press with a built-in cleaner under $18. That's your gap.</div></div></> },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '9:23 AM', isBot: true, isThread: true, text: <>Have a look at the sheet and let me know if you want any changes — I can keep editing it with you. Just message me here anytime 🐉</> },
  ],
  '#customer-support': [
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:47 PM', isBot: true, text: <><div style={{ fontWeight: 700 }}>🚨 Incoming buyer message — needs attention</div><div style={{ marginTop: 6, borderLeft: '3px solid #3F4145', paddingLeft: 10, fontSize: 13, lineHeight: 1.6, color: '#9B9C9E' }}><div><strong>Order:</strong> <span style={{ color: '#1264A3' }}>#112-4839201-7756812</span></div><div><strong>Product:</strong> Garlic Press Premium Case — 3-Pack</div><div style={{ marginTop: 4, fontStyle: 'italic' }}>"I received my order today but one of the three cases was cracked. I'd like a refund."</div></div><div style={{ marginTop: 6, fontSize: 13 }}><strong>Checked our Notion return policy</strong> — damaged items qualify for full refund, no return required.</div><div style={{ marginTop: 4, padding: '6px 10px', backgroundColor: '#2C2D30', borderRadius: 6, fontSize: 13, fontStyle: 'italic', lineHeight: 1.5, color: '#9B9C9E' }}>"Hi Rachel, I'm so sorry! I've issued a full refund of $29.99. No need to return the damaged item. 🙏"</div><div style={{ marginTop: 6, fontWeight: 700, fontSize: 13 }}>Shall I send this response and process the $29.99 refund?</div></> },
    { who: 'Jake', initials: 'JM', color: '#1264A3', time: '2:49 PM', isThread: true, text: 'approved, please send', tagsBot: true },
    { who: 'DragonBot', initials: '🐉', color: '#2F7D4F', time: '2:49 PM', isBot: true, isThread: true, text: <>Done ✅ Response sent and refund processed.<div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3, fontSize: 13 }}><span style={{ color: '#1264A3' }}>📩 View reply on Amazon →</span><span style={{ color: '#1264A3' }}>💰 View refund → $29.99 refunded</span></div></> },
  ],
};

function SlackMsg({ m }) {
  return (
    <div className={`flex gap-2 md:gap-3 px-3 md:px-4 py-1.5 ${m.isThread ? 'ml-4 md:ml-8 border-l-2 border-[#2F7D4F] pl-2 md:pl-3' : ''}`}>
      <div className="shrink-0 w-[18px] h-[18px] md:w-9 md:h-9 rounded md:rounded-md flex items-center justify-center text-white text-[8px] md:text-sm font-bold overflow-hidden"
        style={{ backgroundColor: m.isBot ? '#3A3A3A' : m.color }}>
        {m.isBot ? <img src="/DragonBot-avatar.png" className="w-3 h-3 md:w-6 md:h-6 object-contain" /> : m.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 md:gap-2 mb-0.5">
          <span className="font-black text-[14px] md:text-base" style={{ color: '#D1D2D3' }}>{m.who}</span>
          {m.isBot && <span className="text-[10px] md:text-xs font-bold text-white px-1.5 py-px rounded" style={{ backgroundColor: '#2F7D4F' }}>APP</span>}
          <span className="text-[12px] md:text-sm" style={{ color: '#9B9C9E' }}>{m.time}</span>
        </div>
        <div className="text-[14px] md:text-base leading-relaxed" style={{ color: '#D1D2D3' }}>{m.text}</div>
        {m.reactions && (
          <div className="flex gap-1.5 mt-1.5">
            {m.reactions.map((r, j) => (
              <span key={j} className="flex items-center gap-1 text-[12px] md:text-sm px-2 py-0.5 rounded-full" style={{ backgroundColor: '#2C2D30', border: '1px solid #3F4145' }}>
                {r} <span style={{ color: '#1264A3', fontWeight: 600 }}>1</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SlackDemo({ activeChannel, setActiveChannel, onPinChange, pinned }) {
  const msgs = CHANNEL_MSGS[activeChannel] || [];
  const wrapperRef = useRef(null);
  const chatRef = useRef(null);
  const pinRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const isAnimated = true;
  const prevChannelRef = useRef(activeChannel);
  const needsResetRef = useRef(false);

  // Track channel changes
  useEffect(() => {
    if (prevChannelRef.current !== activeChannel) {
      needsResetRef.current = true;
      prevChannelRef.current = activeChannel;
      setVisibleCount(1);
    }
  }, [activeChannel]);

  // GSAP ScrollTrigger: pin the slack demo and animate messages via scroll
  useEffect(() => {
    const pin = pinRef.current;
    const chat = chatRef.current;
    if (!pin || !chat) return;

    let ctx;
    import('gsap').then(({ gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const channelMsgs = CHANNEL_MSGS[activeChannel] || [];
        const scrollPerMsg = 150;       // px of page scroll per message reveal
        const scrollEndPause = 300;     // px of extra scroll after last message before unpin
        const scrollAmount = channelMsgs.length * scrollPerMsg + scrollEndPause;

        ctx = gsap.context(() => {
          const st = ScrollTrigger.create({
            trigger: pin,
            start: 'center center',
            end: () => `+=${Math.max(scrollAmount, 1)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.3,
            invalidateOnRefresh: true,
            onToggle: (self) => onPinChange?.(self.isActive),
            onUpdate: (self) => {
              // Messages reveal during the first portion of scroll; the rest is the end pause
              const msgPortion = (channelMsgs.length * scrollPerMsg) / scrollAmount;
              const msgProgress = Math.min(self.progress / msgPortion, 1);
              const count = Math.min(channelMsgs.length, Math.floor(msgProgress * channelMsgs.length) + 1);
              setVisibleCount(count);
            },
          });

          // After new ScrollTrigger is created, scroll to its start
          if (needsResetRef.current) {
            needsResetRef.current = false;
            ScrollTrigger.refresh();
            requestAnimationFrame(() => {
              window.scrollTo({ top: st.start, behavior: 'instant' });
              st.scroll(st.start);
            });
          }
        });
      })
    );

    return () => { if (ctx) ctx.revert(); };
  }, [activeChannel]);

  return (
    <div ref={pinRef}>
    <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] text-center mb-4 mt-8">
      This is your company's <span className="bg-gradient-to-r from-[#9B59B6] to-[#B794F4] bg-clip-text text-transparent">Slack</span> with{' '}
      <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
    </h4>
    <p className="text-center text-xs font-bold uppercase tracking-widest text-white/40 mb-4" style={{ fontFamily: monoFont }}>
      Based on real customer conversations with <span className="text-[#2F7D4F]">DragonBot</span>
    </p>
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {SLACK_CHANNELS.map(ch => (
        <button key={ch} onClick={() => setActiveChannel(ch)}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all ${
            activeChannel === ch
              ? 'bg-[#2F7D4F] text-white shadow-lg shadow-[#2F7D4F]/20'
              : 'bg-[#F5F3F1] text-[#0F0F0F] hover:bg-[#2F7D4F] hover:text-white'
          }`} style={{ fontFamily: monoFont }}>
          {ch}
        </button>
      ))}
    </div>
    <div className="relative">
    <div ref={wrapperRef} className="w-full aspect-[4/5] md:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl text-left" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="flex h-full w-full">
        {/* Sidebar — desktop only */}
        <div className="shrink-0 hidden md:flex flex-col py-3" style={{ width: '20%', backgroundColor: '#4A154B' }}>
          <div className="px-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="text-white text-sm font-black">Garlic Presses LTD</div>
          </div>
          <div className="py-2">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Channels</div>
            {SLACK_CHANNELS.map(ch => (
              <div key={ch} onClick={() => setActiveChannel(ch)} className="px-3 py-0.5 text-xs mx-1.5 rounded cursor-pointer hover:bg-white/5 transition-colors" style={{
                color: ch === activeChannel ? 'white' : 'rgba(255,255,255,0.5)',
                backgroundColor: ch === activeChannel ? 'rgba(255,255,255,0.12)' : 'transparent',
                fontWeight: ch === activeChannel ? 700 : 400,
              }}>{ch}</div>
            ))}
          </div>
          <div className="py-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Direct Messages</div>
            {SLACK_DMS.map(u => (
              <div key={u.name} className="px-3 py-0.5 text-xs mx-1.5 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: u.isBot ? '#98cc65' : '#44B078' }} />
                {u.name}
                {u.isBot && <span className="text-[8px] px-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>APP</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: '#1A1D21' }}>
          {/* Mobile header — purple workspace bar */}
          <div className="md:hidden px-4 py-2 text-white" style={{ backgroundColor: '#4A154B' }}>
            <div className="text-[11px] font-black opacity-90 mb-0.5">Garlic Presses LTD</div>
            <div className="text-sm font-black">{activeChannel}</div>
          </div>
          {/* Desktop header */}
          <div className="hidden md:block px-4 py-2.5" style={{ borderBottom: '1px solid #35373B' }}>
            <span className="text-sm font-black" style={{ color: '#D1D2D3' }}>{activeChannel}</span>
          </div>

          <div ref={chatRef} className="flex-1 flex flex-col justify-end gap-1 overflow-y-auto py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {msgs.map((m, i) => {
              if (isAnimated && i >= visibleCount) return null;
              // Compute reactions: if this message tags the bot, show ⏳+🐉 until bot replies, then just 🐉
              let reactions = m.reactions;
              if (m.tagsBot) {
                const botReplied = msgs.slice(i + 1).some((next, j) => next.isBot && (i + 1 + j) < visibleCount);
                reactions = botReplied ? ['🐉'] : ['⏳', '🐉'];
              }
              return (
                <div key={`${activeChannel}-${i}`} style={isAnimated ? {
                  animation: 'slackMsgIn 0.3s ease-out',
                } : undefined}>
                  <SlackMsg m={{ ...m, reactions }} />
                </div>
              );
            })}
          </div>

          <div className="px-4 pb-3">
            <div className="rounded-lg px-3 py-2 text-xs" style={{ border: '1px solid #565856', backgroundColor: '#222529', color: '#9B9C9E', minHeight: 50 }}>
              Message {activeChannel}
            </div>
          </div>
        </div>
      </div>
    </div>
    <AnimatePresence>
      {pinned && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/2 -translate-y-1/2 -right-32 flex-col items-center gap-2 pointer-events-none hidden lg:flex"
        >
          <span className="text-[#98CC65] text-lg font-medium uppercase tracking-widest leading-tight text-center" style={{ fontFamily: monoFont }}>Keep<br/>scrolling</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="24" viewBox="0 0 7 10" fill="none" style={{ imageRendering: 'pixelated' }}>
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
    {/* Mobile keep-scrolling — below the demo, arrow inline with text */}
    <AnimatePresence>
      {pinned && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden flex flex-row items-center justify-center gap-2 mt-4 pointer-events-none"
        >
          <span className="text-[#98CC65] text-sm font-medium uppercase tracking-widest" style={{ fontFamily: monoFont }}>Keep scrolling</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="18" viewBox="0 0 7 10" fill="none" style={{ imageRendering: 'pixelated' }}>
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
    </div>
    </div>
  );
}

/* ─── Hero video with green play button ─── */
function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    setPlaying(true);
    // small delay so the video element renders with controls
    setTimeout(() => {
      const v = document.getElementById('hero-video');
      if (v) { v.play(); }
    }, 50);
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-[#2F7D4F]/10">
      {!playing ? (
        <>
          <img src="/DragonBotAd-thumb.jpg" alt="Product demo" className="w-full h-full object-cover" />
          <button onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-[#2F7D4F] flex items-center justify-center shadow-2xl shadow-[#2F7D4F]/40 hover:scale-105 transition-transform">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </button>
        </>
      ) : (
        <video id="hero-video" className="w-full h-full object-cover" controls preload="metadata">
          <source src="/DragonBotAd.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

/* ─── Image placeholder ─── */
function ImagePlaceholder({ label = 'Illustration' }) {
  return (
    <div className="w-full h-52 bg-gradient-to-br from-[#f4faf6] to-[#e8f5ed] rounded-xl border border-[#2F7D4F]/10 flex items-center justify-center">
      <span className="text-sm text-[#1A1A1A]/30">{label}</span>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-medium text-[#1A1A1A]">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#1A1A1A]/40 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-[#1A1A1A]/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Competitor logos ─── */
const competitorLogos = {
  ChatGPT: 'https://cdn.worldvectorlogo.com/logos/chatgpt-6.svg',
  Claude: 'https://cdn.worldvectorlogo.com/logos/anthropic-1.svg',
  'Jungle Scout': '/logo-junglescout.png',
  'Helium 10': '/logo-helium10.png',
};

/* ─── Approval animation for security card ─── */
/* ─── Audit trail demo for security card ─── */
const AUDIT_ENTRIES = [
  { time: '3:41 PM', action: 'Created FBA shipping plan 6XUQQQ5L', status: 'done' },
  { time: '3:42 PM', action: 'Rejected: Reduce price B001CUWUO7 → $26.99', status: 'rejected' },
  { time: '3:45 PM', action: 'Paused keyword "garlic press silicone"', status: 'done' },
  { time: '3:46 PM', action: 'Sent refund $29.99 to Rachel Thompson', status: 'done' },
  { time: '3:48 PM', action: 'Updated listing images for B0CK5LRQX7', status: 'done' },
  { time: '3:51 PM', action: 'Generated PPC report — uploaded to Drive', status: 'done' },
];

/* ─── SP-API connection visual: DragonBot <-> Amazon with secure line ─── */
function SPAPIConnectionDemo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#1A1D21', borderRadius: '0 0 16px 16px' }}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative flex items-start justify-between w-full px-6 pb-5" style={{ marginTop: -12 }}>
        {/* DragonBot node (static) */}
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-[#3A3A3A] flex items-center justify-center shadow-lg shadow-[#2F7D4F]/20 p-2">
            <img src="/DragonBot-avatar.png" alt="DragonBot" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-semibold text-white/70">DragonBot</span>
        </div>

        {/* Connection line — neon green with glow + lock — absolutely positioned so it touches the icons */}
        <div className="absolute left-[4.5rem] right-[4.5rem] top-6 h-[2px] -translate-y-1/2">
          {/* Neon green glowing line */}
          <div
            className="absolute inset-0 rounded-full bg-[#98CC65]"
            style={{ boxShadow: '0 0 6px #98CC65, 0 0 12px #98CC65, 0 0 20px rgba(152,204,101,0.6)' }}
          />

          {/* Lock in the middle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0F0F0F] border border-[#2F7D4F]/40 flex items-center justify-center shadow-lg shadow-[#2F7D4F]/30">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 6V4a3 3 0 016 0v2"
                stroke="#98CC65"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <rect x="1.5" y="6" width="9" height="7" rx="1.5" fill="#98CC65" />
              <circle cx="6" cy="9.5" r="0.9" fill="#0F0F0F" />
            </svg>
          </div>
        </div>

        {/* Amazon node (static) */}
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] border border-[#0F0F0F] flex items-center justify-center shadow-lg p-1">
            {/* Amazon "a>" mark — compact SVG that fits inside the square */}
            <svg viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <text
                x="20"
                y="16"
                fill="white"
                fontSize="11"
                fontWeight="800"
                fontFamily="system-ui, -apple-system, sans-serif"
                textAnchor="middle"
                letterSpacing="-0.4"
              >
                amazon
              </text>
              <path
                d="M6 22 Q 20 27, 34 22"
                stroke="#FF9900"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M31 19.5 L 34 22 L 31.5 24.5"
                stroke="#FF9900"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-[10px] font-semibold text-white/70">Seller Central</span>
        </div>
      </div>

      {/* Bottom label — single line */}
      <div className="absolute left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#98CC65]/70 whitespace-nowrap" style={{ fontFamily: monoFont, bottom: '22%' }}>
        SP-API · OAuth · Encrypted
      </div>
    </div>
  );
}

/* ─── Final dragon CTA with alternating speech bubble ─── */
const BUBBLE_PHRASES = [
  'What are you waiting for?',
  'See you on Slack!',
  // 'Let’s get to work 🫡',
  'A Dragon\’s work is never done... 🐉',
  'Ready to slay some tasks?',
  // 'Your new team member is here!',
  // 'Efficiency, meet DragonBot.',
  // 'Unleash the power of automation!',
  // 'From chaos to control with DragonBot.',
  'Let’s conquer your to-do list!',
  // 'DragonBot: your secret weapon for success.',
  // 'Time to level up your workflow!',
  'DragonBot: because you have better things to do.',
  // 'Work smarter, not harder, with DragonBot.',
  // 'Your productivity just found its new best friend.',
];

function DragonFinalCTA() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % BUBBLE_PHRASES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="relative mb-2">
        <div
          className="px-10 py-6 text-2xl font-black uppercase tracking-widest"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#0F0F0F',
            fontFamily: monoFont,
            border: '6px solid #0F0F0F',
            boxShadow: '0 8px 0 0 rgba(0,0,0,0.3)',
            minWidth: '420px',
            textAlign: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {BUBBLE_PHRASES[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* 8-bit tail at 80% horizontal mark */}
        <svg
          width="48" height="36" viewBox="0 0 12 9" fill="none"
          className="absolute -bottom-[30px]"
          style={{ left: '80%', transform: 'translateX(-50%)', imageRendering: 'pixelated' }}
        >
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
      <img
        src="/DragonBot-logo.png"
        alt="DragonBot"
        className="w-auto"
        style={{ height: '168px' }}
      />
    </>
  );
}

function AuditTrailDemo() {
  return (
    <div className="w-full h-full flex flex-col py-2 px-3" style={{ backgroundColor: '#2C2A25', borderRadius: '0 0 16px 16px', fontFamily: "'Roboto Mono', monospace" }}>
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

/* steps: 0=show first msg, 1=cursor moves to approve, 2=first approved, 3=show second msg, 4=cursor moves to reject, 5=second rejected, 6=pause then loop */
/* ─── Permissions demo for security card ─── */
const PERMISSION_MODES = [
  { id: 'read-only', label: 'Read-only', desc: 'DragonBot can only pull data and generate reports. It cannot make any changes to your accounts.' },
  { id: 'supervised', label: 'Supervised', desc: 'DragonBot can take actions, but asks for your approval first. Nothing happens without your say-so.' },
  { id: 'autonomous', label: 'Autonomous', desc: 'DragonBot handles routine tasks on its own. It only escalates edge cases and high-stakes decisions.' },
];

/* ─── Built-for-Amazon connection diagram ─── */
/* 6 nodes placed on a circle around the DragonBot center, evenly spaced at 60°.
   Angles in degrees: 0° = right, 90° = down, 180° = left, 270° = up. */
const BUILT_SOURCES = [
  // All 6 sources are pulled from your authorized Amazon Seller Central via the official SP-API
  { logo: '/logo-amazon.png', label: 'Your sales & orders',           source: 'Amazon SP-API', angle: 220 },             // top-left   (180 + 40)
  { logo: '/logo-amazon.png', label: 'Your inventory & FBA',          source: 'Amazon SP-API', angle: 180, rMul: 1.3 },  // left
  { logo: '/logo-amazon.png', label: 'Your customer messages',        source: 'Amazon SP-API', angle: 140 },             // bot-left   (180 - 40)
  { logo: '/logo-amazon.png', label: 'Your reviews & feedback',       source: 'Amazon SP-API', angle: 320 },             // top-right  (360 - 40)
  { logo: '/logo-amazon.png', label: 'Your ads & PPC',                source: 'Amazon SP-API', angle: 0,   rMul: 1.3 },  // right
  { logo: '/logo-amazon.png', label: 'Your Search Query Performance', source: 'Amazon SP-API', angle: 40  },             // bot-right  (0 + 40)
];

function BuiltForAmazonDiagram() {
  const SVG_W = 1000;
  const SVG_H = 400;
  const CENTER_X = SVG_W / 2;
  const CENTER_Y = SVG_H / 2;
  const RADIUS = 220;
  const LINE_W = 1.5;

  const sources = BUILT_SOURCES.map((s, i) => {
    const rad = (s.angle * Math.PI) / 180;
    const r = RADIUS * (s.rMul || 1);
    const x = CENTER_X + r * Math.cos(rad);
    const cy = CENTER_Y + r * Math.sin(rad);
    // label sits to the right side of the node if node is on the right half
    const side = Math.cos(rad) >= 0 ? 'right' : 'left';
    return { ...s, x, cy, side, pid: `bfa-path-${i}` };
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Mobile layout — stacked cards (option A) */}
      <div className="md:hidden">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0F0F0F', border: '2px solid rgba(152,204,101,0.4)' }}>
            <motion.img
              src="/DragonBot-logo.png"
              alt="DragonBot"
              className="w-16 h-16 object-contain"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'center' }}
            />
          </div>
          <p className="mt-3 text-xs font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: monoFont }}>
            Pulls data from ↓
          </p>
        </div>
        <div className="space-y-3">
          {BUILT_SOURCES.map((s, i) => (
            <div key={`m-${i}`} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
              {(s.logos || [s.logo]).length > 1 ? (
                <div className="flex items-center -space-x-2 shrink-0">
                  {s.logos.map((src, j) => (
                    <div key={j} className="relative w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#1A1A1A', zIndex: j + 1 }}>
                      <img src={src} alt="" className="w-6 h-6 object-contain" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={s.logo} alt={s.source} className="w-7 h-7 object-contain" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white leading-tight">{s.label}</div>
                <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider mt-0.5" style={{ fontFamily: monoFont }}>{s.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — radial diagram */}
      <div className="relative hidden md:block">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ display: 'block' }}>
          <defs>
            <filter id="bfa-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated pulses traveling toward the center (no visible lines) */}
          {sources.map((s, i) => (
            <g key={`line-${i}`}>
              <path id={s.pid} d={`M${s.x},${s.cy} L${CENTER_X},${CENTER_Y}`} fill="none" stroke="none" />
              {[0, 1, 2, 3].map((j) => {
                const dur = 3.6; // 50% slower than before
                const stagger = dur / 4; // 0.9s between pulses on the same path
                const delay = i * 0.45 + j * stagger;
                return (
                  <motion.circle
                    key={`pulse-${i}-${j}`}
                    r="4"
                    fill="#98CC65"
                    filter="url(#bfa-glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
                  >
                    <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite">
                      <mpath href={`#${s.pid}`} />
                    </animateMotion>
                  </motion.circle>
                );
              })}
            </g>
          ))}

          {/* Center DragonBot — pulses as if consuming the data */}
          <circle cx={CENTER_X} cy={CENTER_Y} r="56" fill="#0F0F0F" stroke="rgba(152,204,101,0.4)" strokeWidth="2">
            <animate attributeName="r" values="56;66;56" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <image href="/DragonBot-logo.png" x={CENTER_X - 50} y={CENTER_Y - 50} width="100" height="100">
            <animate attributeName="width" values="100;120;100" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="height" values="100;120;100" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="x" values={`${CENTER_X - 50};${CENTER_X - 60};${CENTER_X - 50}`} dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y" values={`${CENTER_Y - 50};${CENTER_Y - 60};${CENTER_Y - 50}`} dur="1.6s" repeatCount="indefinite" />
          </image>
        </svg>

        {/* Source nodes — overlay HTML on top of SVG so we can render real logos + labels */}
        {sources.map((s, i) => {
          const xPct = (s.x / SVG_W) * 100;
          const yPct = (s.cy / SVG_H) * 100;
          const isLeft = s.side === 'left';
          return (
            <div
              key={`node-${i}`}
              className="absolute"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={`flex items-center gap-3 ${isLeft ? '' : 'flex-row-reverse'}`}>
                {(s.logos || [s.logo]).length > 1 ? (
                  <div className="flex items-center -space-x-2 shrink-0">
                    {s.logos.map((src, j) => (
                      <div key={j} className="relative w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#1A1A1A', zIndex: j + 1 }}>
                        <img src={src} alt="" className="w-6 h-6 object-contain" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={s.logo} alt={s.source} className="w-7 h-7 object-contain" />
                  </div>
                )}
                <div className={`${isLeft ? 'text-left' : 'text-right'} min-w-0`} style={{ width: '160px' }}>
                  <div className="text-sm font-semibold text-white leading-tight">{s.label}</div>
                  <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider mt-0.5" style={{ fontFamily: monoFont }}>{s.source}</div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

function PermissionsDemo() {
  const [selected, setSelected] = useState('read-only');
  const mode = PERMISSION_MODES.find(m => m.id === selected);

  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col px-4 py-3" style={{ backgroundColor: '#1A1D21', borderRadius: '0 0 16px 16px', fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AnimatePresence>
        {!clicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
          >
            <span className="text-[#98CC65] text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: monoFont }}>Click here</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
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
          <button
            key={m.id}
            onClick={() => { setSelected(m.id); setClicked(true); }}
            className={`flex-1 py-1.5 text-[10px] font-semibold transition-all ${
              selected === m.id
                ? 'bg-[#2F7D4F] text-white'
                : 'bg-white/5 text-white/40 hover:text-white/60'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={selected}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[11px] leading-relaxed text-white/50"
        >
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

function ApprovalDemo() {
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
          <span className="font-black text-[11px]" style={{ color: '#D1D2D3' }}>DragonBot</span>
          <span className="text-[9px] font-bold text-white px-1 py-px rounded" style={{ backgroundColor: '#2F7D4F' }}>APP</span>
          <span className="text-[9px]" style={{ color: '#9B9C9E' }}>{action.time}</span>
        </div>
        <div className="text-[11px] leading-relaxed mb-1.5" style={{ color: '#D1D2D3' }}>{action.text}</div>
        <div className="flex gap-1.5">
          {decided ? (
            isApproved ? (
              <>
                <span className="px-3 py-1 rounded text-[10px] font-bold text-white" style={{ backgroundColor: '#2F7D4F' }}>✓ Approved</span>
                <span className="px-3 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: '#3A3A3A', color: '#6B6B6B' }}>Reject</span>
              </>
            ) : (
              <>
                <span className="px-3 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: '#3A3A3A', color: '#6B6B6B' }}>Approve</span>
                <span className="px-3 py-1 rounded text-[10px] font-bold text-white" style={{ backgroundColor: '#DC2626' }}>✗ Rejected</span>
              </>
            )
          ) : (
            <>
              <button ref={idx === 0 ? approveRef : null} className="px-3 py-1 rounded text-[10px] font-bold text-white cursor-default" style={{ backgroundColor: '#2F7D4F' }}>Approve</button>
              <button ref={idx === 1 ? rejectRef : null} className="px-3 py-1 rounded text-[10px] font-bold text-white cursor-default" style={{ backgroundColor: '#DC2626' }}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col justify-end gap-1 py-2" style={{ backgroundColor: '#1A1D21', borderRadius: '0 0 16px 16px' }}>
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
      {/* Animated cursor */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{ left: 0, top: 0 }}
        animate={{
          x: cursorXY.x,
          y: cursorXY.y,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M1 1L1 14.5L4.5 11L8.5 18L10.5 17L6.5 10L11 10L1 1Z" fill="white" stroke="#222" strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── Comparison row ─── */
function SplitSentences({ text }) {
  if (!text) return null;
  const sentences = text.split(/(?<=\.)\s+/);
  return sentences.map((s, i) => <div key={i}>{s}</div>);
}

function ComparisonRow({ task, them, themLabel, themHighlight, us, usHighlight }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-sm font-semibold text-[#1A1A1A]/50 uppercase tracking-widest mb-4">{task}</p>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-red-950/20 rounded-2xl p-6 border border-red-900/20 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3 h-8">
            {competitorLogos[themLabel] && (
              <img src={competitorLogos[themLabel]} alt={themLabel} className={`w-5 h-5 object-contain ${themLabel === 'ChatGPT' ? 'invert brightness-200' : ''}`} />
            )}
            <p className="text-sm font-semibold text-[#1A1A1A]/70">{themLabel}</p>
          </div>
          <div className="text-[#1A1A1A]/70 text-base leading-relaxed">
            {Array.isArray(them)
              ? them.map((item, i) => (
                  <div key={i}>{item.h
                    ? <span className="font-bold text-[#F87171]">{item.t}</span>
                    : item.t
                  }</div>
                ))
              : them.split(/(?<=\.)\s+/).map((s, i) => (
                  <div key={i}>{themHighlight && s.trim() === themHighlight.trim() ? <span className="font-bold text-[#F87171]">{s}</span> : s}</div>
                ))
            }
          </div>
        </div>
        <div className="bg-[#2F7D4F]/5 rounded-2xl p-6 border border-[#2F7D4F]/20 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3 h-8">
            <motion.img src="/DragonBot-logo.png" alt="DragonBot" className="w-8 h-8 object-contain"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <p className="text-sm font-semibold text-[#2F7D4F]">DragonBot</p>
          </div>
          <div className="text-[#1A1A1A] text-base leading-relaxed">
            {usHighlight && (Array.isArray(usHighlight)
              ? usHighlight.map((item, i) => (
                  <div key={i}>{item.h
                    ? <span className="font-bold text-[#98CC65]">{item.t}</span>
                    : item.t
                  }</div>
                ))
              : usHighlight.split(/(?<=\.)\s+/).map((s, i) => (
                  <div key={i}><span className="font-bold text-[#98CC65]">{s}</span></div>
                ))
            )}
            {us && <SplitSentences text={us} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Use-case tab content ─── */
const useCaseTabs = [
  {
    label: 'Product Research',
    intro: 'DragonBot digs through marketplaces, competitors, and trends so you get answers — not homework.',
    features: [
      { title: 'Competitor deep-dives', desc: 'Pulls pricing, reviews, keywords, and listing quality across Amazon, Walmart, and your niche. Delivered as a polished report — not a wall of links.' },
      { title: 'Keyword & search intelligence', desc: 'Researches high-opportunity keywords from competitor ASINs, search volume data, and organic rankings. Exports a ready-to-use spreadsheet with PPC suggestions.' },
      { title: 'Market gap analysis', desc: 'Identifies underserved niches by cross-referencing demand signals, review sentiment, and supply density. Shows you where the opportunity is.' },
      { title: 'Trend monitoring', desc: 'Tracks category trends, pricing shifts, and new entrants on a schedule. Alerts you in Slack when something changes.' },
    ],
  },
  {
    label: 'Amazon PPC',
    intro: 'DragonBot audits your ad spend, optimizes bids, and reports on performance — every single day.',
    features: [
      { title: 'Full ad-spend audit', desc: 'Pulls ACoS, TACoS, ROAS, and spend across all campaigns. Flags wasted budget, identifies winners, and recommends bid adjustments in a board-ready PDF.' },
      { title: 'Campaign optimization', desc: 'Analyzes search term reports, negates bleeding keywords, and surfaces high-converting targets you\'re missing. Delivers actionable changes, not just data.' },
      { title: 'Competitor ad tracking', desc: 'Monitors competitor sponsored placements, estimates their spend, and alerts you when they enter your top keyword territory.' },
      { title: 'Weekly performance reports', desc: 'Builds visual dashboards with spend, sales, and efficiency metrics. Sent to Slack on schedule — no logging into Seller Central.' },
    ],
  },
  {
    label: 'Customer Support',
    intro: 'DragonBot handles the front line — triaging tickets, drafting responses, and escalating what matters.',
    features: [
      { title: 'Intelligent ticket triage', desc: 'Reads incoming support messages, categorizes by urgency and topic, routes to the right person, and drafts a first response — all before a human touches it.' },
      { title: 'Review & feedback monitoring', desc: 'Watches product reviews across Amazon, Trustpilot, and social channels. Flags negative trends and drafts response templates for your team.' },
      { title: 'Knowledge base builder', desc: 'Learns from resolved tickets to build and update FAQ docs and canned responses. Gets smarter with every interaction.' },
      { title: 'Escalation & follow-up', desc: 'Tracks open issues, nudges owners when SLAs are close, and follows up with customers after resolution. Nothing falls through the cracks.' },
    ],
  },
  {
    label: 'Logistics & Ops',
    intro: 'DragonBot eliminates the spreadsheet wrangling, vendor chasing, and report building that eat your ops team alive.',
    features: [
      { title: 'Inventory health checks', desc: 'Pulls stock levels, sell-through rates, and reorder timelines from your systems. Flags items at risk of stocking out or over-ordering.' },
      { title: 'Supplier coordination', desc: 'Tracks PO statuses, follows up with suppliers on delays, and consolidates shipping updates into a single Slack digest.' },
      { title: 'Ops reporting & dashboards', desc: 'Builds weekly ops reports pulling from your 3PL, warehouse, and order management tools. Polished PDFs, not raw exports.' },
      { title: 'Process automation', desc: 'Identifies repetitive manual workflows, proposes automations, and implements them. Reorder alerts, status syncs, and data entry — handled.' },
    ],
  },
];

/* ─── Testimonial placeholder ─── */
const testimonials = [
  { name: 'Sarah M.', role: 'Amazon Seller', avatar: '/avatar-sarah.jpg', text: 'DragonBot audited our PPC in 10 minutes. Took our agency a week to do the same thing — and they missed half the wasted spend.', saved: '40 hrs/month' /*, linkedin: 'https://www.linkedin.com/' */ },
  { name: 'James L.', role: 'eCommerce Founder', avatar: '/avatar-james.jpg', text: 'I asked DragonBot to research a new product niche. It came back with keyword data, competitor analysis, and a margin estimate. Insane.', saved: '25 hrs/month' /*, linkedin: 'https://www.linkedin.com/' */ },
  { name: 'Priya K.', role: 'Operations Lead', avatar: '/avatar-priya.jpg', text: 'Our weekly ops report used to take 4 hours. Now DragonBot sends it to Slack every Monday morning. Zero effort.', saved: '16 hrs/month' /*, linkedin: 'https://www.linkedin.com/' */ },
  { name: 'Mike R.', role: 'Brand Manager', avatar: '/avatar-mike.jpg', text: 'Customer support triage was drowning us. DragonBot drafts first responses and routes tickets instantly. Game changer.', saved: '30 hrs/month' /*, linkedin: 'https://www.linkedin.com/' */ },
  { name: 'Elena V.', role: 'D2C Founder', avatar: '/avatar-elena.jpg', text: 'It connected to our Seller Central, pulled the data, built the report, and sent it to my investor. I didn\'t touch a spreadsheet.', saved: '20 hrs/month' /*, linkedin: 'https://www.linkedin.com/' */ },
  { name: 'David T.', role: 'Supply Chain Manager', avatar: '/avatar-david.jpg', text: 'DragonBot caught a restock issue 3 days before we would have noticed. Saved us from going out of stock on our top SKU.', saved: '$18K/month' /*, linkedin: 'https://www.linkedin.com/' */ },
];

/* ─── FAQ data ─── */
const faqData = [
  { q: 'What is DragonBot, exactly?', a: 'DragonBot is an AI coworker purpose-built for eCommerce and Amazon brands. It connects to your tools, analyzes your data, and delivers real work — reports, audits, dashboards, and automations. Not a chatbot. A colleague.' },
  { q: 'How is DragonBot different from ChatGPT or other AI tools?', a: 'Most AI tools generate text. DragonBot executes. It connects to your actual tools — Seller Central, ad platforms, 3PLs — and performs actions end-to-end. You get a finished PDF, not a prompt to copy-paste from.' },
  { q: 'What can DragonBot actually do?', a: 'Product research, PPC audits, keyword analysis, competitor monitoring, customer support triage, inventory alerts, ops reporting, supplier follow-ups, and more. If you can describe the task, DragonBot can probably do it.' },
  { q: 'What tools does DragonBot connect to?', a: 'Amazon Seller Central, Google Ads, Meta Ads, Shopify, Google Sheets, Slack, Notion, and hundreds more. If your tool has an API, DragonBot can integrate with it.' },
  { q: 'Is my data secure?', a: 'Yes. Each workspace is fully isolated. DragonBot only accesses tools you explicitly connect. Data is encrypted in transit and at rest. We never train on your data.' },
  { q: 'How long does setup take?', a: 'Minutes. Connect DragonBot to Slack, link your tools, and start working. DragonBot handles its own onboarding — it\'ll ask what you need help with first.' },
  { q: 'Can multiple people on my team use DragonBot?', a: 'Yes. DragonBot works across your Slack workspace. Anyone can mention @DragonBot. It maintains context about your whole team while respecting individual workflows.' },
  { q: 'Can DragonBot make mistakes?', a: 'Yes — it\'s capable, not infallible. It double-checks its work and asks for confirmation before high-stakes actions. You stay in control.' },
  { q: 'What if DragonBot can\'t do something?', a: 'It\'ll tell you. If a task requires an integration it doesn\'t have, it\'ll ask you to connect it. If something is outside its capabilities, it says so rather than guessing.' },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function LandingV3() {
  const [slackChannel, setSlackChannel] = useState('#general');
  const [slackPinned, setSlackPinned] = useState(false);

  return (
    <div className="v2-page min-h-screen bg-[#0F0F0F] text-white" style={{ fontFamily: sysFont }}>
      <style>{`
        .v2-page h1,.v2-page h2,.v2-page h3,.v2-page h4,.v2-page h5,.v2-page h6{font-family:inherit!important}
        @keyframes slackMsgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .v2-page .text-\\[\\#1A1A1A\\]{color:#fff!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/70{color:rgba(255,255,255,0.7)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/60{color:rgba(255,255,255,0.6)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/55{color:rgba(255,255,255,0.55)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/50{color:rgba(255,255,255,0.5)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/40{color:rgba(255,255,255,0.4)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/35{color:rgba(255,255,255,0.35)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/30{color:rgba(255,255,255,0.3)!important}
        .v2-page .text-\\[\\#1A1A1A\\]\\/25{color:rgba(255,255,255,0.25)!important}
        .v2-page .bg-white{background:rgba(255,255,255,0.05)!important}
        .v2-page .bg-\\[\\#fafafa\\]{background:rgba(255,255,255,0.03)!important}
        .v2-page .bg-gray-50{background:rgba(255,255,255,0.05)!important}
        .v2-page .bg-gray-100{background:rgba(255,255,255,0.08)!important}
        .v2-page .border-gray-200{border-color:rgba(255,255,255,0.1)!important}
        .v2-page .border-gray-100{border-color:rgba(255,255,255,0.08)!important}
        .v2-page .bg-\\[\\#2F7D4F\\]\\/5{background:rgba(47,125,79,0.15)!important}
        .v2-page .bg-\\[\\#2F7D4F\\]\\/10{background:rgba(47,125,79,0.2)!important}
        .v2-page .border-\\[\\#2F7D4F\\]\\/20{border-color:rgba(47,125,79,0.3)!important}
      `}</style>
      <NavbarV2 />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Connects to <span style={{ fontWeight: 700, textDecoration: 'underline' }}>Amazon Seller Central</span> and 3000+ other tools</Eyebrow>

            <h1 className="font-extrabold text-[48px] sm:text-[64px] lg:text-[88px] text-[#1A1A1A] leading-[1.05] tracking-[-0.035em] mb-6">
              Not a tool.{' '}
              <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">A hire.</span>
            </h1>

            <p className="text-[17px] sm:text-[19px] text-[#1A1A1A]/55 max-w-2xl mx-auto mb-10 leading-[1.6] tracking-[-0.01em]">
              DragonBot is your <span className="underline decoration-[#98CC65]/60 decoration-[2px] underline-offset-4">AI Amazon operator</span> that connects to all your tools and does the work.
              Product research, PPC audits, reports, customer support.
            </p>

            <div className="flex items-center justify-center mb-8">
              <a href="/beta"
                className="px-10 py-5 text-lg bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3">
                Request Access <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] font-medium text-[#1A1A1A]/40 tracking-[-0.01em]">
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
          </motion.div>

          {/* Built by sellers strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center">
            <p className="text-[15px] font-semibold text-white/60 mb-2">We sell on Amazon too</p>
            <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.15em]">10 years on Amazon · 8 figures sold · DragonBot is the employee we always wanted</p>
          </motion.div>

          {/* Slack demos */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 flex justify-center">
            <div className="w-full max-w-[800px] px-4 md:px-0">
              <SlackDemo activeChannel={slackChannel} setActiveChannel={setSlackChannel} onPinChange={setSlackPinned} pinned={slackPinned} />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── SELLER VIDEOS (commented out — kept for reference) ─── */}
      {/*
      <Section id="seller-videos">
        <div className="text-center mb-10">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            See what <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">Amazon Sellers</span> have been building with{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
          </h4>
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
      */}

      {/* ─── BUILT FOR AMAZON ─── */}
      <Section id="built-for-amazon">
        <div className="text-center mb-2">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            AI that's <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">BUILT</span> for <span className="bg-gradient-to-r from-[#FF9900] to-[#FFC266] bg-clip-text text-transparent">Amazon</span>
          </h4>
          <p className="mt-4 text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            DragonBot doesn't just <em>talk</em> about Amazon. It's plugged into the same data the pros pay thousands a month for — and your own seller account.
          </p>
        </div>

        <BuiltForAmazonDiagram />

        <p className="text-center text-xs font-medium text-white/30 uppercase tracking-[0.15em] mt-2" style={{ fontFamily: monoFont }}>
          And 3,000+ more integrations
        </p>

        {/* vs the alternative callout */}
        <div className="max-w-3xl mx-auto mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-2" style={{ fontFamily: monoFont }}>vs. the alternative</p>
          <p className="text-lg text-white/80 leading-relaxed">
            Multiple Amazon tools + manual spreadsheet work = <span className="text-[#F87171] font-bold">hours every week</span>.
            <br />
            DragonBot bundles it into one plan starting at <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent font-bold">$50/mo</span>.
          </p>
        </div>

        {/* Concrete example */}
        <div className="max-w-3xl mx-auto mt-6 bg-[#1A1D21] border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3" style={{ fontFamily: monoFont }}>For example</p>
          <p className="text-base text-white/80 leading-relaxed mb-4">
            Ask DragonBot: <em className="text-white">"Why did our BSR drop on B0CK5LRQX7 last week?"</em>
          </p>
          <p className="text-sm text-white/55 leading-relaxed">
            DragonBot pulls your order history, ad performance, buyer messages, and recent reviews. <span className="text-[#98CC65] font-semibold">Answers in 30 seconds.</span>
          </p>
        </div>
      </Section>

      {/* ─── THE SHIFT (commented out — kept for reference) ─── */}
      {/*
      <Section id="the-shift">
        <div className="text-center mb-14">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            You&rsquo;ve tried the other tools. <span className="bg-gradient-to-r from-[#DC2626] to-[#F87171] bg-clip-text text-transparent">The work is still there.</span>
          </h4>
          <p className="mt-4 text-lg text-[#1A1A1A]/50 max-w-2xl mx-auto">
            ChatGPT. Claude. Zapier. Notion AI. You&rsquo;re already using AI.<br />You&rsquo;re also still doing the work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ComparisonRow task="PPC" themLabel="ChatGPT" them={[
            { t: 'Manually download your PPC reports.', h: true },
            { t: 'Gives you suggestions.' },
            { t: 'Manually make the changes.', h: true },
          ]} usHighlight={[
            { t: 'Audits campaigns every day on its own.', h: true },
            { t: 'Gives you suggestions.' },
            { t: 'Makes the changes for you.', h: true },
          ]} us="" />
          <ComparisonRow task="Product Research" themLabel="Jungle Scout" them={[
            { t: 'Manually browse hundreds of product pages.', h: true },
            { t: 'Export CSVs.' },
            { t: 'Pivot tables.' },
            { t: 'Manually analyze the data.', h: true },
          ]} usHighlight={[
            { t: 'Pulls the data from Amazon.', h: true },
            { t: 'Organizes it.' },
            { t: 'Explains it to you.' },
            { t: 'Brainstorms with you.', h: true },
          ]} us="" />
          <ComparisonRow task="Keyword Research" themLabel="Helium 10" them={[
            { t: 'Manually find competitor ASINs.', h: true },
            { t: 'Export raw keyword lists.' },
            { t: 'Manually find root keywords, negative matches.', },
            { t: 'Spend hours organizing sheets.', h: true },
          ]} usHighlight={[
            { t: 'Helps you find competitor ASINs.', h: true },
            { t: 'Does the keyword research for you.' },
            { t: 'Crafts root keywords, negative matches, PPC setup.' },
            { t: 'Delivers you a Google Sheet.', h: true },
          ]} us="" />
          <ComparisonRow task="Customer Support" themLabel="Claude" them={[
            { t: 'Manually copy/paste customer messages.', h: true },
            { t: 'Drafts a response template.' },
            { t: 'Manually copy/paste reply & process refund.', h: true },
          ]} usHighlight={[
            { t: 'Pulls the message from Amazon.', h: true },
            { t: 'Checks your Notion.' },
            { t: 'Drafts the response.' },
            { t: 'Processes the refund.' },
            { t: 'Sends you the links to the reply and refund.', h: true },
          ]} us="" />
        </div>
      </Section>
      */}

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
            { icon: <Check className="w-6 h-6" />, title: 'Amazon SP-API Connection', desc: '100% Amazon terms-of-service compliant. Official SP-API only. No scraping. No gray areas.', badge: 'SP-API certified' },
            // { icon: <Check className="w-6 h-6" />, title: 'Amazon SP-API Authorized Connection', desc: '100% Amazon terms-of-service compliant. Official SP-API only. No scraping. No gray areas.', badge: 'SP-API certified' },
            { icon: <Brain className="w-6 h-6" />, title: 'Permissions you control', subtitle: '✓ Read-only by default', desc: 'Read-only, supervised, or autonomous. You choose.', badge: 'Read-only → Supervised → Autonomous' },
            { icon: <Zap className="w-6 h-6" />, title: 'Supervised mode', desc: 'DragonBot asks before touching your account. Send a refund? Pause a campaign? You decide.', badge: null },
            { icon: <Database className="w-6 h-6" />, title: 'Full audit trail', desc: 'Every action logged — what, when, and why.', badge: null },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#2F7D4F]/30 hover:shadow-lg hover:shadow-[#2F7D4F]/5 transition-all flex flex-col">
              <div className="p-6 pb-4">
                <h3 className="font-bold text-xl mb-1">{f.title}</h3>
                {f.subtitle && <p className="text-[#98CC65] text-sm font-semibold mb-1">{f.subtitle}</p>}
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
              <div className="mt-auto">
                {f.title === 'Supervised mode' ? (
                  <div className="w-full h-44"><ApprovalDemo /></div>
                ) : f.title === 'Permissions you control' ? (
                  <div className="w-full h-36"><PermissionsDemo /></div>
                ) : f.title === 'Full audit trail' ? (
                  <div className="w-full h-52"><AuditTrailDemo /></div>
                ) : f.title === 'Amazon SP-API Connection' ? (
                // ) : f.title === 'Amazon SP-API Authorized Connection' ? (
                  <div className="w-full h-36"><SPAPIConnectionDemo /></div>
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

      {/* ─── SOCIAL PROOF ─── */}
      <Section>
        <div className="text-center mb-8">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] flex items-center justify-center gap-3 mb-6">
            Brands love
            <motion.img src="/DragonBot-logo.png" alt="" className="h-10 inline"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
          </h4>
          <a href="/beta"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl">
            Request Access <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
              <div className="mb-4">
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1" style={{ fontFamily: monoFont }}>Saved</div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">{t.saved}</div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
                {/* LinkedIn links — uncomment when ready
                {t.linkedin && (
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#0A66C2] transition-colors shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                */}
              </div>
            </div>
          ))}
        </div>

      </Section>

      {/* ─── FAQ ─── */}
      <Section id="faq">
        <div className="text-center mb-14">
          <h4 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.03em]">
            Frequently asked questions
          </h4>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </Section>

      {/* ─── PRICING ─── */}
      <Section id="pricing">
        <div className="text-center mb-12">
          <h4 className="font-extrabold text-3xl sm:text-4xl tracking-[-0.03em] leading-tight">
            Start free.{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Pay only when you're ready.</span>
          </h4>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
          {/* Left: copy + CTAs */}
          <div className="max-w-md">
            <p className="text-lg text-white/55 mb-8 leading-relaxed">
              Every feature. Every integration. $100 in credits on the house.
              No credit card, no sales call, no catch. When you need more, it starts at $50/month.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/beta"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25">
                Request Access <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-semibold uppercase tracking-wide rounded-lg transition-all">
                See all plans
              </a>
            </div>
          </div>

          {/* Right: Features list (no card) */}
          <ul className="space-y-4">
            {[
              '$100 in free credits',
              'Every feature, no limits',
              '3,000+ integrations',
              'Amazon SP-API connection',
              // 'Amazon SP-API authorized connection',
              'Lives on Slack',
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-white/80">
                <Check className="w-5 h-5 text-[#98CC65] mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── FINAL DRAGON CTA ─── */}
      <section className="pt-0 pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
          <DragonFinalCTA />
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