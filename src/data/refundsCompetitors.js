/* ═══════════════════════════════════════════════════════════════
   Dragon Refunds competitor comparison pages.
   Each entry powers a /vs/:slug page rendered by VsRefundsCompetitor —
   a Dragon-Refunds-branded, succinct comparison (NOT the DragonBot
   VsCompetitor template). These pages are linked ONLY from the /refunds
   footer, never the navbar.

   The feature matrix mirrors the on-page ReimbursementComparePanel in
   LandingV4 (REIMB_COMPARE_GROUPS): every `values` pair is
   [Dragon Refunds, <this competitor>]. Keep the two in sync.

   Cell values: 'yes' | 'no' | 'partial' | { t: 'free text' }.
   ═══════════════════════════════════════════════════════════════ */

export const refundsCompetitors = {
  'getida': {
    name: 'GETIDA',
    metaTitle: 'Dragon Refunds vs GETIDA: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and GETIDA for Amazon FBA reimbursements. GETIDA files your claims and takes ~25%. Dragon Refunds shows you every recoverable dollar, lets you file free and keep 100%, or hands it off for 15%.',
    eyebrow: 'Dragon Refunds vs GETIDA',
    h1: {
      plain: 'GETIDA files your claims and keeps 25%.',
      accent: 'Dragon Refunds shows you every dollar — and charges 15%.',
    },
    subhead:
      'GETIDA is the most established name in FBA reimbursements — a fully managed service with a team of case managers. Dragon Refunds is a transparent reimbursement platform: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for 15% instead of 25%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose GETIDA if you want the longest-running, most recognized name in FBA reimbursements behind your claims, and you are comfortable paying ~25% of everything recovered for that established brand.',
      us:
        'Choose Dragon Refunds if you want to see exactly where every dollar came from, keep the option to file yourself for free, and pay 15% — not 25% — when you do want it handled for you.',
    },
    compare: [
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'partial'] },
        ],
      },
      {
        label: 'What we recover',
        rows: [
          { feature: 'Lost / damaged shipments', values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'no'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'yes'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '~25%' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'The longest track record',
        desc:
          'GETIDA is one of the most established names in FBA reimbursements — an Amazon Selling Partner Network member with years of operating history. If tenure is what reassures you, few can match it.',
      },
      {
        title: 'Trusted brand and reviews',
        desc:
          'GETIDA has recovered large aggregate sums for a big base of sellers and carries extensive public reviews. That depth of social proof is hard for a newer service to match.',
      },
      {
        title: 'Deep dispute experience',
        desc:
          'Years of filing and escalating Amazon cases at high volume mean GETIDA\'s team has seen the messy, non-standard disputes before — the ones that do not resolve on the first attempt.',
      },
    ],
    usWins: [
      {
        title: 'You see where every dollar came from',
        desc:
          'GETIDA hands you a recovered total. Dragon Refunds itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'GETIDA files everything and takes a cut of all of it. Dragon Refunds has a free tier: it finds the money and hands you a step-by-step SOP so you can file the easy claims yourself and keep every dollar.',
      },
      {
        title: '15% managed, not ~25%',
        desc:
          'When you do want it handled for you, Dragon Refunds files for 15% of what it recovers. On $10,000 recovered that is $1,000 more in your pocket than a 25% service.',
      },
      {
        title: 'Recovers claim types GETIDA skips',
        desc:
          'Dragon Refunds also chases warehouse-damaged and destroyed inventory and COGS / sourcing-cost errors — categories a standard discrepancy service leaves on the table.',
      },
    ],
    commission: { us: '15%', them: '~25%' },
    faq: [
      {
        q: 'How much cheaper is Dragon Refunds than GETIDA?',
        a: 'Dragon Refunds charges 15% of what it recovers for you, versus roughly 25% for a typical managed service like GETIDA. On $10,000 recovered you keep $8,500 instead of $7,500 — an extra $1,000. And any claim you file yourself through the free tier costs nothing at all.',
      },
      {
        q: 'Can I really file claims myself for free?',
        a: 'Yes. Dragon Refunds\' free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file it through Seller Central yourself. You keep 100%. Hand off only the claims you would rather not do — for 15%.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant.',
      },
      {
        q: 'What can Dragon Refunds recover that GETIDA doesn\'t?',
        a: 'On top of the standard lost-and-damaged and fee-overcharge claims, Dragon Refunds also surfaces warehouse-damaged and destroyed inventory and COGS / sourcing-cost errors — where Amazon reimburses lost units below their true value.',
      },
      {
        q: 'I already use GETIDA — is switching hard?',
        a: 'No. Connect Dragon Refunds in about two minutes over the official API and it audits your entire reimbursement history — including what your current process quietly missed. You can run both side by side while you decide.',
      },
    ],
  },

  'seller-investigators': {
    name: 'Seller Investigators',
    metaTitle: 'Dragon Refunds vs Seller Investigators: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Seller Investigators for Amazon FBA reimbursements. Seller Investigators files your claims for ~25%. Dragon Refunds shows you every recoverable dollar, lets you file free and keep 100%, or hands it off for 15%.',
    eyebrow: 'Dragon Refunds vs Seller Investigators',
    h1: {
      plain: 'Seller Investigators files your claims and keeps 25%.',
      accent: 'Dragon Refunds shows you every dollar — and charges 15%.',
    },
    subhead:
      'Seller Investigators is a fully managed FBA reimbursement service — a team that files claims on your behalf for a commission. Dragon Refunds is a transparent reimbursement platform: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for 15% instead of 25%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Seller Investigators if you want a provider narrowly specialized in claim recovery, and you are comfortable paying ~25% of what is recovered for their team to file on your behalf.',
      us:
        'Choose Dragon Refunds if you want to see exactly where every dollar came from, keep the option to file yourself for free, and pay 15% — not 25% — when you do want it handled for you.',
    },
    compare: [
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'partial'] },
        ],
      },
      {
        label: 'What we recover',
        rows: [
          { feature: 'Lost / damaged shipments', values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'yes'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'yes'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '~25%' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'A focused specialist',
        desc:
          'Seller Investigators does one thing — recover FBA reimbursements. If you specifically want a provider narrowly specialized in claims and nothing else, that focus is their pitch.',
      },
      {
        title: 'Experienced recovery team',
        desc:
          'They have filed a high volume of FBA discrepancy claims and know the categories well, including the manual cases that need documentation and follow-up.',
      },
      {
        title: 'Established reputation',
        desc:
          'Seller Investigators has a track record and seller reviews behind it. If you weigh word-of-mouth and time in market heavily, that history counts.',
      },
    ],
    usWins: [
      {
        title: 'You see where every dollar came from',
        desc:
          'Seller Investigators hands you a recovered total. Dragon Refunds itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Seller Investigators files everything and takes a cut of all of it. Dragon Refunds has a free tier: it finds the money and hands you a step-by-step SOP so you can file the easy claims yourself and keep every dollar.',
      },
      {
        title: '15% managed, not ~25%',
        desc:
          'When you do want it handled for you, Dragon Refunds files for 15% of what it recovers. On $10,000 recovered that is $1,000 more in your pocket than a 25% service.',
      },
      {
        title: 'Recovers COGS & sourcing-cost errors',
        desc:
          'Beyond the standard discrepancy claims, Dragon Refunds also catches COGS / sourcing-cost errors — where Amazon reimburses lost units below their true value — a category most managed services leave untouched.',
      },
    ],
    commission: { us: '15%', them: '~25%' },
    faq: [
      {
        q: 'How much cheaper is Dragon Refunds than Seller Investigators?',
        a: 'Dragon Refunds charges 15% of what it recovers for you, versus roughly 25% for a typical managed service like Seller Investigators. On $10,000 recovered you keep $8,500 instead of $7,500 — an extra $1,000. And any claim you file yourself through the free tier costs nothing at all.',
      },
      {
        q: 'Can I really file claims myself for free?',
        a: 'Yes. Dragon Refunds\' free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file it through Seller Central yourself. You keep 100%. Hand off only the claims you would rather not do — for 15%.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant.',
      },
      {
        q: 'What can Dragon Refunds recover that Seller Investigators doesn\'t?',
        a: 'Dragon Refunds additionally surfaces COGS / sourcing-cost errors — cases where Amazon reimburses lost or damaged units below their true sourcing value — a category standard discrepancy services typically miss.',
      },
      {
        q: 'I already use Seller Investigators — is switching hard?',
        a: 'No. Connect Dragon Refunds in about two minutes over the official API and it audits your entire reimbursement history — including what your current process quietly missed. You can run both side by side while you decide.',
      },
    ],
  },
};

export function getRefundsCompetitor(slug) {
  return refundsCompetitors[slug] || null;
}

export function getRefundsCompetitorSlugs() {
  return Object.keys(refundsCompetitors);
}
