import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Play, ArrowRight, Zap, Database, Brain, Check } from 'lucide-react';

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
  { label: 'The Shift', href: '#the-shift' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'FAQ', href: '#faq' },
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
          scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/v2" className="flex items-center gap-2.5">
            <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="h-9" />
            <span className="font-bold text-xl text-[#1A1A1A]" style={{ lineHeight: '1', paddingTop: '2px' }}>DragonBot</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-[13px] font-medium text-[#1A1A1A]/50 hover:text-[#2F7D4F] transition-colors" style={{ fontFamily: monoFont }}>{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="/beta"
              className="px-5 py-2.5 bg-[#2F7D4F]/10 text-[#2F7D4F] text-sm font-semibold uppercase tracking-wide rounded-lg transition-all hover:bg-[#2F7D4F] hover:text-white hover:shadow-lg hover:shadow-[#2F7D4F]/25">
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
            className="fixed inset-0 z-40 bg-white pt-20 px-6">
            <div className="flex flex-col gap-6">
              {navLinks.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-[#1A1A1A]">{l.label}</a>
              ))}
              <a href="/beta" onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-[#2F7D4F]/10 text-[#2F7D4F] text-center font-semibold uppercase tracking-wide rounded-lg transition-all hover:bg-[#2F7D4F] hover:text-white">
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
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2F7D4F]/10 rounded-full text-sm font-medium text-[#2F7D4F] mb-6">
      <span className="w-2 h-2 rounded-full bg-[#98CC65] animate-pulse" />
      {children}
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
  Spreadsheets: 'https://cdn.worldvectorlogo.com/logos/google-sheets-logo-icon.svg',
  'Helpdesk AI': 'https://cdn.worldvectorlogo.com/logos/zendesk-1.svg',
  Zapier: 'https://cdn.worldvectorlogo.com/logos/zapier-1.svg',
};

/* ─── Comparison row ─── */
function ComparisonRow({ task, them, themLabel, us, usHighlight }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-sm font-semibold text-[#1A1A1A]/50 uppercase tracking-widest mb-4">{task}</p>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            {competitorLogos[themLabel] && (
              <img src={competitorLogos[themLabel]} alt={themLabel} className="w-5 h-5 object-contain" />
            )}
            <p className="text-sm font-semibold text-[#1A1A1A]/70">{themLabel}</p>
          </div>
          <p className="text-[#1A1A1A]/70 text-base leading-relaxed">{them}</p>
        </div>
        <div className="bg-[#2F7D4F]/5 rounded-2xl p-6 border border-[#2F7D4F]/20 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="w-5 h-5 object-contain" />
            <p className="text-sm font-semibold text-[#2F7D4F]">DragonBot</p>
          </div>
          <p className="text-[#1A1A1A] text-base leading-relaxed">
            <span className="font-bold bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">{usHighlight}</span>{' '}{us}
          </p>
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
  { name: 'Sarah M.', role: 'Amazon Seller', text: 'DragonBot audited our PPC in 10 minutes. Took our agency a week to do the same thing — and they missed half the wasted spend.' },
  { name: 'James L.', role: 'eCommerce Founder', text: 'I asked DragonBot to research a new product niche. It came back with keyword data, competitor analysis, and a margin estimate. Insane.' },
  { name: 'Priya K.', role: 'Operations Lead', text: 'Our weekly ops report used to take 4 hours. Now DragonBot sends it to Slack every Monday morning. Zero effort.' },
  { name: 'Mike R.', role: 'Brand Manager', text: 'Customer support triage was drowning us. DragonBot drafts first responses and routes tickets instantly. Game changer.' },
  { name: 'Elena V.', role: 'D2C Founder', text: 'It connected to our Seller Central, pulled the data, built the report, and sent it to my investor. I didn\'t touch a spreadsheet.' },
  { name: 'David T.', role: 'Supply Chain Manager', text: 'DragonBot caught a restock issue 3 days before we would have noticed. Saved us from going out of stock on our top SKU.' },
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
export default function LandingV2() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="v2-page min-h-screen bg-white" style={{ fontFamily: sysFont }}>
      <style>{`.v2-page h1,.v2-page h2,.v2-page h3,.v2-page h4,.v2-page h5,.v2-page h6{font-family:inherit!important}`}</style>
      <NavbarV2 />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#98CC65]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[#2F7D4F]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Trusted by Amazon &amp; eCommerce brands</Eyebrow>

            <h1 className="font-extrabold text-[48px] sm:text-[64px] lg:text-[88px] text-[#1A1A1A] leading-[1.05] tracking-[-0.035em] mb-6">
              Not a tool.{' '}
              <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">A hire.</span>
            </h1>

            <p className="text-[17px] sm:text-[19px] text-[#1A1A1A]/55 max-w-2xl mx-auto mb-10 leading-[1.6] tracking-[-0.01em]">
              DragonBot is your <span className="underline decoration-[#2F7D4F]/40 decoration-2 underline-offset-4">AI Amazon operator</span> that connects to all your tools and does the work.
              Product research, PPC audits, reports, customer support.
            </p>

            <div className="flex items-center justify-center mb-8">
              <a href="/beta"
                className="px-10 py-5 text-lg bg-[#2F7D4F]/10 text-[#2F7D4F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:bg-[#2F7D4F] hover:text-white hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5 flex items-center gap-3">
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
                SOC 2 Compliant
              </span>
            </div>
          </motion.div>

          {/* Built by sellers strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center">
            <p className="text-[15px] font-semibold text-[#1A1A1A]/50 mb-2">We sell on Amazon too</p>
            <p className="text-[11px] font-medium text-[#1A1A1A]/35 uppercase tracking-[0.15em]">10 years on Amazon · 8 figures sold · DragonBot is the employee we always wanted</p>
          </motion.div>

          {/* Hero video */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-14">
            <HeroVideo />
          </motion.div>
        </div>
      </section>

      {/* ─── THE SHIFT ─── */}
      <Section id="the-shift" className="bg-[#fafafa]">
        <div className="text-center mb-14">
          <Eyebrow>The Shift</Eyebrow>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            You&rsquo;ve tried the AI tools.<br />The work is still&nbsp;there.
          </h2>
          <p className="mt-4 text-lg text-[#1A1A1A]/50 max-w-2xl mx-auto">
            ChatGPT. Claude. Zapier. Notion AI. You&rsquo;re already using AI. You&rsquo;re also still doing the work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ComparisonRow task="Product Research" themLabel="ChatGPT" them="Tells you how to research your competitors." usHighlight="Researches them." us="Hands you the spreadsheet." />
          <ComparisonRow task="PPC Ad Audit" themLabel="Spreadsheets" them="You pull the data, pivot, and squint at ACoS columns for hours." usHighlight="Audits every campaign." us="Sends you the recommendations." />
          <ComparisonRow task="Customer Support" themLabel="Helpdesk AI" them="Suggests canned responses you still have to send." usHighlight="Triages, drafts, routes, and follows up." us="You just review." />
          <ComparisonRow task="Logistics & Ops" themLabel="Zapier" them="Follows rules you write. Breaks when something changes." usHighlight="Figures out what needs automating" us="and does it." />
        </div>
      </Section>

      {/* ─── THE SOLUTION ─── */}
      <Section id="solution">
        <div className="text-center mb-14">
          <Eyebrow>The Solution</Eyebrow>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            One @mention.{' '}
            <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">
              DragonBot handles&nbsp;it.
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <VideoPlaceholder label="DragonBot in action — coming soon" />
        </div>

        {/* 3 feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Zap className="w-6 h-6" />, title: 'Real Deliverables', desc: 'Board-ready PDFs, Excel reports, keyword spreadsheets, PPC audits, and full dashboards. Not suggestions — finished work.', badge: null },
            { icon: <Database className="w-6 h-6" />, title: 'Deep Integrations', desc: 'Amazon Seller Central, Google Ads, Meta Ads, Shopify, Slack, Notion, Google Sheets, and hundreds more.', badge: null },
            { icon: <Brain className="w-6 h-6" />, title: 'Deep Memory', desc: 'Every conversation makes DragonBot smarter about your business. It remembers what worked, what didn\'t, and how you like things done.', badge: 'Never repeat yourself' },
          ].map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#2F7D4F]/30 hover:shadow-lg hover:shadow-[#2F7D4F]/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#2F7D4F]/10 flex items-center justify-center text-[#2F7D4F] mb-5">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg text-[#1A1A1A] mb-2">{f.title}</h3>
              <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mb-3">{f.desc}</p>
              {f.badge && (
                <span className="inline-block px-3 py-1 bg-[#2F7D4F]/10 rounded-full text-xs font-medium text-[#2F7D4F]">{f.badge}</span>
              )}
              <ImagePlaceholder label={`${f.title} illustration`} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── HOW IT WORKS ─── */}
      <Section id="how-it-works" className="bg-[#fafafa]">
        <div className="text-center mb-14">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            Onboarding a new hire has never been this&nbsp;easy.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Connect', desc: 'Add DragonBot to Slack. Connect your tools — Seller Central, Google Ads, Shopify, whatever you use. Takes 2 minutes.' },
            { step: '02', title: 'Ask', desc: 'Talk to DragonBot like a colleague. "Audit our PPC spend for last month." "Pull competitor keywords for ASIN B0C7X9LQ2M." "Build me a restock report."' },
            { step: '03', title: 'DragonBot delivers', desc: 'DragonBot queries your tools, analyzes data, and delivers real outputs: PDFs, spreadsheets, dashboards, drafted responses. It also proposes automations you didn\'t think to ask for.' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-200">
              <span className="font-bold text-[#2F7D4F] text-sm">/{s.step}</span>
              <h3 className="font-semibold text-xl text-[#1A1A1A] mt-2 mb-3">{s.title}</h3>
              <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mb-5">{s.desc}</p>
              <ImagePlaceholder label={`Step ${s.step}`} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── USE CASES ─── */}
      <Section id="use-cases">
        <div className="text-center mb-14">
          <Eyebrow>Use Cases</Eyebrow>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            What DragonBot can own for your&nbsp;team
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCaseTabs.map((tab, i) => (
            <button key={tab.label} onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === i
                  ? 'bg-[#2F7D4F] text-white shadow-lg shadow-[#2F7D4F]/20'
                  : 'bg-white text-[#1A1A1A]/60 border border-gray-200 hover:border-[#2F7D4F]/30 hover:text-[#2F7D4F]'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="max-w-4xl mx-auto">
          <p className="text-[#1A1A1A]/60 text-center mb-10 leading-relaxed">
            {useCaseTabs[activeTab].intro}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {useCaseTabs[activeTab].features.map((f, i) => (
              <div key={i} className="bg-[#fafafa] rounded-xl p-6 border border-gray-100 hover:border-[#2F7D4F]/20 transition-all">
                <div className="flex items-start gap-3 mb-2">
                  <Check className="w-5 h-5 text-[#2F7D4F] mt-0.5 shrink-0" />
                  <h4 className="font-semibold text-[#1A1A1A]">{f.title}</h4>
                </div>
                <p className="text-[#1A1A1A]/50 text-sm leading-relaxed ml-8">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/beta"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2F7D4F]/10 text-[#2F7D4F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:bg-[#2F7D4F] hover:text-white hover:shadow-xl hover:shadow-[#2F7D4F]/25 hover:-translate-y-0.5">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Section>

      {/* ─── SOCIAL PROOF ─── */}
      <Section className="bg-[#0F3D2E]">
        <div className="text-center mb-14">
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Brands love{' '}
            <span className="inline-flex items-center gap-2">
              <img src="/logos/dragonbot_fire.png" alt="" className="h-10 inline" />
              DragonBot
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2F7D4F] flex items-center justify-center text-white text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="/beta"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold uppercase tracking-wide rounded-lg transition-all hover:bg-white hover:text-[#0F3D2E] hover:shadow-xl">
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section id="faq">
        <div className="text-center mb-14">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0F3D2E] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <img src="/logos/dragonbot_fire.png" alt="DragonBot" className="h-8" />
              <span className="font-bold text-lg text-white">DragonBot</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {['The Shift', 'Solution', 'How It Works', 'Use Cases', 'FAQ'].map(label => (
                <a key={label} href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-sm text-white/50 hover:text-white transition-colors">{label}</a>
              ))}
              <a href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy</a>
            </div>
            <p className="text-sm text-white/30">&copy; 2026 DragonBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}