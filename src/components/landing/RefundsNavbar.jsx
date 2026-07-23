import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

/* ─── Shared Dragon Refunds header ───
   Used by the /vs/* comparison pages and the /pricing page so every page
   carries the identical header (brand, nav links back to the main page's
   sections, working light/dark toggle, and CTA). */

const monoFont = "'Roboto Mono', monospace";
export const REFUNDS_SIGNUP_URL = 'https://app.dragonrefunds.com/sign-up';

export const DragonRefundsBrand = () => (
  <span className="font-bold text-[22px] sm:text-[25px] text-white whitespace-nowrap" style={{ lineHeight: '1' }}>
    Dragon <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">Refunds</span>
  </span>
);

const navLinks = [
  { label: 'Calculator', href: '/#calculator' },
  { label: 'Features', href: '/#shipment-refunds' },
  { label: 'Automated workflow', href: '/#automated-workflow' },
  { label: 'vs. others', href: '/#vs-others' },
];

export default function RefundsNavbar({ light, onToggle }) {
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
            <a href={REFUNDS_SIGNUP_URL}
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
              <a href={REFUNDS_SIGNUP_URL} onClick={() => setMobileOpen(false)}
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
