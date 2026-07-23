import React from 'react';

/* ─── Dragon Refunds footer (Jarvio-style columns) ───
   Shared by the /refunds landing page and every /vs/* comparison page.
   Uses the standard dark palette classes so it themes automatically under
   .v2-page.theme-light. On-page anchors are absolute (/#…) so they resolve
   from the comparison pages too. */

const PRODUCT_LINKS = [
  { label: 'All Features', href: '/#shipment-refunds' },
];

const COMPANY_LINKS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Privacy', href: '/privacy', newTab: true },
  { label: 'Terms of Service', href: '/tos', newTab: true },
  { label: 'Support', href: '/support', newTab: true },
];

const RESOURCE_LINKS = [
  { label: 'Dragon Refunds vs GETIDA', href: '/vs/getida' },
  { label: 'Dragon Refunds vs Seller Investigators', href: '/vs/seller-investigators' },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} {...(l.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-sm text-white/50 hover:text-white transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RefundsFooter() {
  return (
    <footer className="bg-[#0F3D2E] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/DragonBot-logo.png" alt="Dragon Refunds" className="h-8" />
              <span className="font-bold text-lg text-white">Dragon Refunds</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[230px]">
              See exactly where Amazon owes you — and recover it. DIY for free, or done-for-you for 15%.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="mailto:info@dragonrefunds.com" className="text-sm text-white/50 hover:text-white transition-colors">
            info@dragonrefunds.com
          </a>
          <div className="text-center md:text-right">
            <p className="text-sm text-white/30">&copy; {new Date().getFullYear()} Chacha Advisory LLC. All rights reserved.</p>
            <p className="text-xs text-white/20 mt-1">30 N Gould St Ste R, Sheridan, WY 82801, USA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
