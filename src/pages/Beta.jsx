import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

const sysFont = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const monoFont = "'Roboto Mono', monospace";

export default function Beta() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center px-6" style={{ fontFamily: sysFont }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full"
      >
        <div className="flex items-center justify-center mb-10">
          <motion.img
            src="/DragonBot-logo.png"
            alt="DragonBot"
            className="h-12"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-bold text-[28px] text-white ml-3" style={{ lineHeight: '1' }}>
            get<span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">DragonBot</span>
            <span className="text-white">.com</span>
          </span>
        </div>

        <div className="border border-white/10 rounded-2xl p-10 bg-white/[0.02] backdrop-blur-sm">
          <div className="inline-block px-3 py-1 rounded-full border border-[#98CC65]/30 bg-[#98CC65]/10 text-[11px] font-semibold uppercase tracking-wider text-[#98CC65] mb-6" style={{ fontFamily: monoFont }}>
            Private Beta
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            DragonBot is currently in <span className="bg-gradient-to-r from-[#2F7D4F] to-[#98CC65] bg-clip-text text-transparent">private beta</span>.
          </h1>

          <p className="text-white/70 text-base leading-relaxed mb-8">
            We are onboarding a limited number of Amazon sellers while we polish the experience. If you would like access, send us a note and we will follow up with next steps.
          </p>

          <a
            href="mailto:info@getdragonbot.com?subject=DragonBot%20beta%20access%20request"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-[#F5F3F1] to-[#F5F3F1] hover:from-[#2F7D4F] hover:to-[#98CC65] text-[#0F0F0F] font-semibold uppercase tracking-wide rounded-lg transition-all hover:shadow-xl hover:shadow-[#2F7D4F]/25"
            style={{ fontFamily: monoFont }}
          >
            <Mail className="w-4 h-4" />
            info@getdragonbot.com
          </a>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
