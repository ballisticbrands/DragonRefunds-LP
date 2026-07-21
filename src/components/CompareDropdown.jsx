import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getAllCompetitorSlugs, competitors } from '../data/competitors';

const monoFont = "'Roboto Mono', monospace";

function buildItems() {
  const all = getAllCompetitorSlugs().map(slug => ({
    slug,
    name: competitors[slug].name,
    logo: competitors[slug].logo,
    category: competitors[slug].category || 'amazon',
  }));
  return {
    amazon: all.filter(i => i.category === 'amazon'),
    ai: all.filter(i => i.category === 'ai'),
  };
}

function Column({ title, items, activeSlug }) {
  return (
    <div>
      <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em]" style={{ fontFamily: monoFont }}>{title}</p>
      <div className="flex flex-col">
        {items.map(item => (
          <a
            key={item.slug}
            href={`/vs/${item.slug}`}
            className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
              item.slug === activeSlug
                ? 'bg-[#2F7D4F]/15 text-[#98CC65]'
                : 'text-white/80 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.logo && <img src={item.logo} alt={item.name} className="w-4 h-4 object-contain shrink-0" />}
            <span className="font-medium whitespace-nowrap">vs. {item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function CompareDropdown({ activeSlug }) {
  const [open, setOpen] = useState(false);
  const { amazon, ai } = buildItems();

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
        Compare <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -8, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full left-1/2 pt-3 ${(amazon.length && ai.length) ? 'w-[440px]' : 'w-[240px]'}`}
          >
            <div className={`bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-2 grid ${(amazon.length && ai.length) ? 'grid-cols-2 gap-x-2 divide-x divide-white/5' : 'grid-cols-1'}`}>
              {amazon.length > 0 && <Column title="Amazon Tools" items={amazon} activeSlug={activeSlug} />}
              {ai.length > 0 && <Column title="AI Tools" items={ai} activeSlug={activeSlug} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CompareDropdownMobile({ activeSlug, onItemClick }) {
  const [open, setOpen] = useState(false);
  const { amazon, ai } = buildItems();

  return (
    <div>
      <button
        className="flex items-center gap-2 text-lg font-medium text-white"
        onClick={() => setOpen(o => !o)}
      >
        Compare <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 pl-3 flex flex-col gap-5 border-l border-white/10 ml-2">
              {[
                { title: 'Amazon Tools', items: amazon },
                { title: 'AI Tools', items: ai },
              ].filter(s => s.items.length > 0).map(section => (
                <div key={section.title}>
                  <p className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: monoFont }}>{section.title}</p>
                  <div className="flex flex-col gap-3">
                    {section.items.map(item => (
                      <a
                        key={item.slug}
                        href={`/vs/${item.slug}`}
                        onClick={onItemClick}
                        className={`flex items-center gap-3 text-base ${
                          item.slug === activeSlug ? 'text-[#98CC65]' : 'text-white/70'
                        }`}
                      >
                        {item.logo && <img src={item.logo} alt={item.name} className="w-5 h-5 object-contain shrink-0" />}
                        <span>vs. {item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}