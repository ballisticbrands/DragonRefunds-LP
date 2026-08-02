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
  'refunds-manager': {
    name: 'Refunds Manager',
    metaTitle: 'Dragon Refunds vs Refunds Manager: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Refunds Manager for Amazon FBA reimbursements. Refunds Manager files your claims and takes 25%. Dragon Refunds shows you every recoverable dollar, lets you file free and keep 100%, or hands it off for 15%.',
    eyebrow: 'Dragon Refunds vs Refunds Manager',
    h1: {
      plain: 'Refunds Manager files your claims and keeps 25%.',
      accent: 'Dragon Refunds shows you every dollar — and charges 15%.',
    },
    subhead:
      'Refunds Manager is one of the oldest names in FBA reimbursements — a managed service where real people review and file your cases for a 25% commission. Dragon Refunds is a transparent reimbursement platform: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for 15% instead of 25%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Refunds Manager if you want one of the longest-running reimbursement services with human case-by-case review, and you are comfortable paying 25% of everything recovered with no self-file option.',
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
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'partial'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '25%' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'One of the longest track records',
        desc:
          'Refunds Manager has been filing FBA reimbursement cases since the early days of the industry and is listed in Amazon\'s Appstore. If years-in-market is your main filter, they have plenty.',
      },
      {
        title: 'Human case-by-case review',
        desc:
          'Every case is reviewed and submitted by their staff rather than fired off automatically — a real advantage on messy, non-standard claims that need judgment and documentation.',
      },
      {
        title: 'Simple, hands-off model',
        desc:
          'Connect your account and they handle everything from detection to follow-up. If you never want to think about reimbursements at all, the fully managed model is genuinely simple.',
      },
    ],
    usWins: [
      {
        title: 'You see where every dollar came from',
        desc:
          'Refunds Manager reports what was recovered. Dragon Refunds itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Refunds Manager has no self-serve option — they file, they take 25%. Dragon Refunds has a free tier: it finds the money and hands you a step-by-step SOP so you can file the easy claims yourself and keep every dollar.',
      },
      {
        title: '15% managed, not 25%',
        desc:
          'When you do want it handled for you, Dragon Refunds files for 15% of what it recovers. On $10,000 recovered that is $1,000 more in your pocket than Refunds Manager\'s 25%.',
      },
      {
        title: 'Recovers COGS & sourcing-cost errors',
        desc:
          'Beyond standard discrepancy claims, Dragon Refunds also catches COGS / sourcing-cost errors — where Amazon reimburses lost units below their true value — a category classic reimbursement services leave untouched.',
      },
    ],
    commission: { us: '15%', them: '25%' },
    faq: [
      {
        q: 'How much cheaper is Dragon Refunds than Refunds Manager?',
        a: 'Dragon Refunds charges 15% of what it recovers for you, versus Refunds Manager\'s 25%. On $10,000 recovered you keep $8,500 instead of $7,500 — an extra $1,000. And any claim you file yourself through the free tier costs nothing at all.',
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
        q: 'What can Dragon Refunds recover that Refunds Manager doesn\'t?',
        a: 'On top of the standard lost-and-damaged claims, Dragon Refunds surfaces FBA dimension / weight fee overcharges systematically and catches COGS / sourcing-cost errors — where Amazon reimburses lost units below their true sourcing value.',
      },
      {
        q: 'I already use Refunds Manager — is switching hard?',
        a: 'No. Connect Dragon Refunds in about two minutes over the official API and it audits your entire reimbursement history — including what your current process quietly missed. You can run both side by side while you decide.',
      },
    ],
  },

  'refund-genie': {
    name: 'Refund Genie',
    metaTitle: 'Dragon Refunds vs Refund Genie (Helium 10): FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Helium 10\'s Refund Genie. Refund Genie is a report generator inside a $99+/mo suite — you still file everything yourself. Dragon Refunds finds every dollar free, and files it for you for 15% if you want.',
    eyebrow: 'Dragon Refunds vs Refund Genie',
    h1: {
      plain: 'Refund Genie is one tool inside a $99+/mo suite — and you still file everything yourself.',
      accent: 'Dragon Refunds does the same for free, and files for you when you want.',
    },
    subhead:
      'Refund Genie is Helium 10\'s reimbursement tool: it estimates what Amazon owes you for lost and damaged inventory and generates the case text — but it lives inside a paid Helium 10 subscription, and filing is always on you. Dragon Refunds is a purpose-built reimbursement platform: free detection and self-file SOPs, plus an optional 15% done-for-you filing service. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Refund Genie if you already pay for Helium 10 anyway, only need estimates for the standard lost-and-damaged categories, and are happy filing every case yourself.',
      us:
        'Choose Dragon Refunds if you want reimbursement detection without a $99+/mo suite attached, broader claim coverage, and the option to have the filing handled for you at 15%.',
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
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'no'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', { t: '$99+/mo suite' }] },
          { feature: 'Done-for-you filing available', values: [{ t: 'Yes — 15%' }, { t: 'No — DIY only' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'Always you' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'Included if you already pay for Helium 10',
        desc:
          'If you run your business on Helium 10 Platinum or above, Refund Genie is already in your toolbox at no extra cost. Marginal price of zero is hard to argue with — for the categories it covers.',
      },
      {
        title: 'Part of a full seller suite',
        desc:
          'Refund Genie sits next to keyword research, listing tools, and analytics in one login. If you want one subscription for everything, the bundle is the point.',
      },
      {
        title: 'A big, established brand',
        desc:
          'Helium 10 is one of the most recognized software names in the Amazon seller world, with a huge user base and years of history behind it.',
      },
    ],
    usWins: [
      {
        title: 'No $99+/mo suite required',
        desc:
          'Refund Genie requires a paid Helium 10 plan — roughly $1,200+ a year whether or not it finds anything. Dragon Refunds\' detection and self-file SOPs are free forever. You pay only if you choose managed filing, and only on what it recovers.',
      },
      {
        title: 'Someone will actually file it for you',
        desc:
          'Refund Genie generates estimates and case text — the filing, the follow-ups, and the denials are always your job. Dragon Refunds gives you the choice: file it yourself free, or hand it off and we file, track, and escalate for 15%.',
      },
      {
        title: 'Broader claim coverage',
        desc:
          'Refund Genie focuses on the classic lost-and-damaged categories. Dragon Refunds also chases FBA dimension / weight fee overcharges and COGS / sourcing-cost errors — money a lost-and-damaged-only tool never sees.',
      },
      {
        title: 'A real claim ledger',
        desc:
          'Dragon Refunds keeps the full found → filed → paid → denied history for every claim, so you always know what is outstanding, what was paid, and what needs escalation — not just a one-time estimate report.',
      },
    ],
    commission: {
      us: '15%',
      them: '$99+/mo + DIY',
      themAmount: '$10,000 − sub',
      line:
        'With Refund Genie you pay the Helium 10 subscription all year and still file every case yourself. With Dragon Refunds, detection and DIY filing are free — you keep the full $10,000 — or hand it off for 15% and keep $8,500 without lifting a finger.',
    },
    faq: [
      {
        q: 'Is Refund Genie free?',
        a: 'Not really. Refund Genie is bundled into paid Helium 10 plans (Platinum and up, roughly $99+/mo), so you are paying for the suite whether or not reimbursements are found. Dragon Refunds\' detection and self-file guides are free forever, with no subscription attached.',
      },
      {
        q: 'Does Refund Genie file claims for me?',
        a: 'No. Refund Genie estimates what Amazon owes and generates case text, but you file and follow up on every case yourself. Dragon Refunds lets you choose: file it yourself for free, or have our team file, track, and escalate for 15% of what is recovered.',
      },
      {
        q: 'What does Dragon Refunds recover that Refund Genie doesn\'t?',
        a: 'Refund Genie targets the standard lost-and-damaged inventory categories. Dragon Refunds also surfaces FBA dimension / weight fee overcharges and COGS / sourcing-cost errors — where Amazon reimburses units below their true value.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant.',
      },
      {
        q: 'I already have Helium 10 — should I still use Dragon Refunds?',
        a: 'They coexist fine. Keep Helium 10 for research and listings, and run Dragon Refunds\' free audit alongside it — sellers switching from lost-and-damaged-only tools routinely find fee overcharges and COGS errors those tools never checked. It costs nothing to compare the findings.',
      },
    ],
  },

  'seller-locker': {
    name: 'Seller Locker',
    metaTitle: 'Dragon Refunds vs Seller Locker (DimeTyd): FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Seller Locker, which has been folded into DimeTyd Sellers. Dragon Refunds shows every recoverable dollar, lets you file free and keep 100%, or files for you at a flat 15%.',
    eyebrow: 'Dragon Refunds vs Seller Locker',
    h1: {
      plain: 'Seller Locker became DimeTyd Sellers.',
      accent: 'Dragon Refunds is the transparent, flat-15% way to get your money back.',
    },
    subhead:
      'Seller Locker built its name on FBA fee recovery and reimbursement software — and has since been folded into DimeTyd Sellers, with the old brand winding down. Dragon Refunds is a transparent reimbursement platform: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for a flat 15%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose DimeTyd (formerly Seller Locker) if you want an enterprise-leaning recovery provider with a fee-prevention angle, and you are comfortable with commission-based pricing under a brand that recently changed hands.',
      us:
        'Choose Dragon Refunds if you want to see exactly where every dollar came from, keep the option to file yourself for free, and pay a flat, published 15% when you want it handled — from a product that is actively building, not rebranding.',
    },
    compare: [
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'yes'] },
          { feature: 'Flat, published pricing', values: ['yes', 'no'] },
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
          { feature: 'Managed commission', values: [{ t: 'Flat 15%' }, { t: '% (unpublished)' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'Strong fee-recovery pedigree',
        desc:
          'Seller Locker was one of the first tools to go deep on FBA fee discrepancies — dimension and weight errors — and DimeTyd inherits that focus. Fee prevention, not just recovery, is genuinely their strength.',
      },
      {
        title: 'Enterprise and aggregator depth',
        desc:
          'DimeTyd built its reputation recovering money at enterprise scale — large brands, aggregators, and agencies with sprawling catalogs. If you are a very large operation, that machinery is built for you.',
      },
      {
        title: 'Amazon-approved software roots',
        desc:
          'Seller Locker was among the reimbursement tools listed in Amazon\'s Appstore, and the DimeTyd platform continues to operate through official channels.',
      },
    ],
    usWins: [
      {
        title: 'A stable home, not a rebrand in progress',
        desc:
          'Seller Locker\'s brand, pricing pages, and product have been folded into DimeTyd — links redirect, plans changed, and long-time users have had to re-learn who they are dealing with. Dragon Refunds is one product, one roadmap, actively built.',
      },
      {
        title: 'Flat, published 15% — no sales call required',
        desc:
          'DimeTyd\'s commission is quote-based and leans enterprise. Dragon Refunds\' price is on the website: file yourself free, or 15% managed. You can calculate your cost before you connect.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Like most managed services, they file and take their cut of everything. Dragon Refunds\' free tier finds the money and hands you a step-by-step SOP so the easy claims cost you nothing at all.',
      },
      {
        title: 'Recovers COGS & sourcing-cost errors',
        desc:
          'Beyond discrepancy and fee claims, Dragon Refunds also catches COGS / sourcing-cost errors — where Amazon reimburses lost units below their true value — a category even fee-focused platforms skip.',
      },
    ],
    commission: {
      us: '15%',
      them: '% (unpublished)',
      themAmount: '$10,000 − ?',
      line:
        'DimeTyd\'s cut is quote-based — you find out on a sales call. Dragon Refunds is published and flat: file it yourself free and keep the full $10,000, or hand it off for 15% and keep $8,500. No call required.',
    },
    faq: [
      {
        q: 'What happened to Seller Locker?',
        a: 'Seller Locker was folded into DimeTyd Sellers — the old brand and site now point to DimeTyd, and the product continues under that name with an enterprise-leaning focus. Sellers looking for the old self-serve Seller Locker experience are exactly who Dragon Refunds was built for.',
      },
      {
        q: 'How does Dragon Refunds\' pricing compare?',
        a: 'Dragon Refunds publishes a flat price: detection and self-file guides are free (you keep 100%), and managed filing is 15% of what is recovered. DimeTyd\'s commission is not published — it is quoted per account, typically aimed at larger sellers.',
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
        q: 'I was a Seller Locker user — is switching hard?',
        a: 'No. Connect Dragon Refunds in about two minutes over the official API and it audits your entire reimbursement history — including anything missed during the Seller Locker → DimeTyd transition. The audit is free, so there is nothing to lose by comparing.',
      },
    ],
  },

  'refund-retriever': {
    name: 'Refund Retriever',
    metaTitle: 'Dragon Refunds vs Refund Retriever: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Refund Retriever for Amazon FBA reimbursements. Refund Retriever is a shipping-refund specialist with an FBA add-on. Dragon Refunds is FBA-native: free self-file, or 15% managed.',
    eyebrow: 'Dragon Refunds vs Refund Retriever',
    h1: {
      plain: 'Refund Retriever is a shipping-refund company with an FBA add-on.',
      accent: 'Dragon Refunds is built for FBA reimbursements first.',
    },
    subhead:
      'Refund Retriever made its name auditing UPS and FedEx invoices for late-delivery refunds, and later added Amazon FBA reimbursements as a second line. Dragon Refunds is FBA-native: purpose-built to find every recoverable FBA dollar, let you file it free, or file it for you at a flat 15%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Refund Retriever if your bigger leak is UPS/FedEx shipping charges — parcel invoice auditing is their core business, and FBA recovery comes along as an add-on.',
      us:
        'Choose Dragon Refunds if FBA reimbursements are the point: deeper Amazon claim coverage, a free self-file tier, and a flat published 15% when you want it handled.',
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
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'no'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
          { feature: 'UPS / FedEx parcel refunds', note: 'their core business',
            values: ['no', 'yes'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: 'Flat 15%' }, { t: 'Commission (varies)' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'Parcel auditing is their core craft',
        desc:
          'Refund Retriever has audited UPS and FedEx invoices since 2006. If you ship meaningful volume outside FBA, their late-delivery and billing-error recovery on parcels is a real, adjacent win Dragon Refunds does not touch.',
      },
      {
        title: 'Long operating history',
        desc:
          'Nearly two decades in the refund-recovery business, founded and still run by the same owner. That kind of continuity is rare in this space.',
      },
      {
        title: 'One vendor for parcels + FBA',
        desc:
          'If you want a single provider chasing both your carrier refunds and your FBA reimbursements, their bundle covers both sides in one relationship.',
      },
    ],
    usWins: [
      {
        title: 'FBA-native, not an add-on',
        desc:
          'Dragon Refunds was built for Amazon reimbursements from day one — itemized causes, full claim ledger, and FBA-specific claim categories. For an FBA seller, the specialist beats the bolt-on.',
      },
      {
        title: 'Broader FBA claim coverage',
        desc:
          'Beyond lost-and-damaged, Dragon Refunds systematically chases FBA dimension / weight fee overcharges and COGS / sourcing-cost errors — categories outside a parcel-audit company\'s comfort zone.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Refund Retriever\'s model is managed-only commission. Dragon Refunds\' free tier finds the money and gives you a step-by-step SOP so the easy claims cost you nothing at all.',
      },
      {
        title: 'Flat, published 15%',
        desc:
          'No quote, no negotiation — Dragon Refunds\' managed filing is a flat 15% of what it recovers, published on the site. You know your cost before you connect.',
      },
    ],
    commission: {
      us: '15%',
      them: 'commission (varies)',
      themAmount: '$10,000 − their cut',
      line:
        'Refund Retriever\'s FBA commission is quoted, not published — recovery services typically take 20–30%. Dragon Refunds is flat and public: file it yourself free and keep the full $10,000, or hand it off for 15% and keep $8,500.',
    },
    faq: [
      {
        q: 'What is the main difference between Dragon Refunds and Refund Retriever?',
        a: 'Focus. Refund Retriever is primarily a UPS/FedEx parcel-audit company that also offers FBA reimbursements. Dragon Refunds does one thing: Amazon FBA reimbursements — with deeper claim coverage, a free self-file tier, and a flat 15% managed option.',
      },
      {
        q: 'Should I use Refund Retriever for shipping refunds and Dragon Refunds for FBA?',
        a: 'That combination makes sense for sellers with real UPS/FedEx volume. They audit your carrier invoices; Dragon Refunds audits your FBA account. The two do not overlap or conflict.',
      },
      {
        q: 'Can I really file FBA claims myself for free?',
        a: 'Yes. Dragon Refunds\' free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file it through Seller Central yourself. You keep 100%. Hand off only the claims you would rather not do — for 15%.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant.',
      },
      {
        q: 'What does Dragon Refunds recover that Refund Retriever doesn\'t?',
        a: 'On the FBA side: dimension / weight fee overcharges and COGS / sourcing-cost errors, on top of the standard lost-and-damaged categories. (On the parcel side it is the reverse — UPS/FedEx refunds are their territory, not ours.)',
      },
    ],
  },

  'refully': {
    name: 'Refully',
    metaTitle: 'Dragon Refunds vs Refully: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Refully advertised AI-driven Amazon reimbursements at 18% — but the service appears to have gone offline. Dragon Refunds is the actively maintained alternative: free self-file, or 15% managed filing.',
    eyebrow: 'Dragon Refunds vs Refully',
    h1: {
      plain: 'Refully appears to have gone dark.',
      accent: 'Dragon Refunds is the actively maintained alternative — free DIY, or 15% managed.',
    },
    subhead:
      'Refully pitched AI-driven FBA reimbursements at an 18% commission — undercutting the big 25% services. As of mid-2026, its site and service appear to be offline. If you used Refully or were evaluating it, Dragon Refunds covers the same ground — free detection and self-file, or 15% managed filing — from a product that is actively maintained. Here is the honest comparison.',
    tldr: {
      them:
        'Refully\'s pitch — AI-driven detection at 18% instead of 25% — was genuinely good. But a reimbursement service only pays out if it is running, and Refully currently appears offline with no public roadmap.',
      us:
        'Choose Dragon Refunds for the same idea, alive and cheaper: automated detection you can act on free (keep 100%), or managed filing at 15% — with your claim history safe in an actively maintained product.',
    },
    compare: [
      {
        label: 'The basics',
        rows: [
          { feature: 'Service currently online & maintained', values: ['yes', 'no'] },
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
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'partial'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '18% (offline)' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They did' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'The pricing instinct was right',
        desc:
          'Refully undercut the 25% incumbents at 18% and leaned on automation to do it. That is the correct direction for this industry — Dragon Refunds simply takes it further, at 15% with a free tier.',
      },
      {
        title: 'Automation-first approach',
        desc:
          'Refully bet on automated detection over armies of case managers — scanning orders, returns, and fees algorithmically. The model was sound; the execution just needs a company that is still running.',
      },
      {
        title: 'Broad marketplace coverage',
        desc:
          'Refully advertised support for sellers across 20+ Amazon marketplaces — wider than many US-only services attempted.',
      },
    ],
    usWins: [
      {
        title: 'It exists — and is actively maintained',
        desc:
          'A reimbursement service is a long-running relationship: claims take weeks, windows expire after 18 months, and your history matters. Refully currently appears offline. Dragon Refunds is live, maintained, and building — the boring but decisive advantage.',
      },
      {
        title: 'Cheaper than Refully was',
        desc:
          'Refully charged 18% of everything it recovered. Dragon Refunds is 15% for managed filing — and free if you file yourself, which Refully never offered.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Dragon Refunds\' free tier finds the money and hands you a step-by-step SOP to file through Seller Central yourself — every recovered dollar stays yours.',
      },
      {
        title: 'Recovers COGS & sourcing-cost errors',
        desc:
          'Beyond the standard categories, Dragon Refunds catches COGS / sourcing-cost errors — where Amazon reimburses lost units below their true value — a category Refully\'s scans did not cover.',
      },
    ],
    commission: {
      us: '15%',
      them: '18% (offline)',
      themAmount: '$8,200*',
      line:
        'Refully\'s 18% would have left you $8,200 — but the service appears offline, so today it recovers $0. Dragon Refunds: file it yourself free and keep the full $10,000, or hand it off for 15% and keep $8,500.',
    },
    faq: [
      {
        q: 'Is Refully shut down?',
        a: 'As of mid-2026, refully.ai appears to be offline and unreachable, and there is no public notice of what happened to the service or its users\' pending claims. If you were a Refully user, it is worth re-auditing your account — Dragon Refunds\' free audit covers your full 18-month claim window.',
      },
      {
        q: 'I was using Refully — did I lose my pending claims?',
        a: 'Claims filed in your Seller Central remain yours regardless of what happened to Refully. But anything Refully found-but-had-not-filed, and anything new since it went quiet, is unfiled money. Connect Dragon Refunds and the free audit re-scans your entire recent history so nothing expires unfiled.',
      },
      {
        q: 'How does Dragon Refunds\' pricing compare to Refully\'s?',
        a: 'Refully charged 18% of everything recovered, with no self-serve option. Dragon Refunds\' detection and self-file guides are free — you keep 100% — and managed filing is 15%. Cheaper on both paths.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant.',
      },
      {
        q: 'What happens to my data if a reimbursement service disappears?',
        a: 'It is a real risk, as Refully shows. Dragon Refunds keeps your full claim ledger exportable, connects read-only through Amazon\'s official API, and never holds your money — reimbursements are paid by Amazon directly into your seller account.',
      },
    ],
  },

  'amz-refund': {
    name: 'AMZ Refund',
    metaTitle: 'Dragon Refunds vs AMZ Refund: FBA Reimbursements Compared (2026)',
    metaDescription:
      'AMZ Refund offered FBA reimbursement help at 12% — but the service has shut down. Dragon Refunds is the live alternative: free self-file to keep 100%, or 15% managed filing.',
    eyebrow: 'Dragon Refunds vs AMZ Refund',
    h1: {
      plain: 'AMZ Refund has shut down.',
      accent: 'Dragon Refunds is the live alternative — free DIY, or 15% managed.',
    },
    subhead:
      'AMZ Refund was the budget pick of FBA reimbursements — around 12% commission, manual ToS-compliant filing, loyal users. As of mid-2026 its site is offline and the service appears shut down. If you relied on it or were shopping for it, Dragon Refunds covers the same ground: free detection and self-file to keep 100%, or managed filing at a flat 15%. Here is the honest comparison.',
    tldr: {
      them:
        'AMZ Refund\'s 12% genuinely undercut everyone — including our 15%. If it were still running, it would deserve a spot on your shortlist. It is not: the site is offline and claims are not being filed.',
      us:
        'Choose Dragon Refunds for a service that is actually running — with a free self-file tier that beats any commission (you keep 100%), and 15% managed filing with a full, exportable claim ledger.',
    },
    compare: [
      {
        label: 'The basics',
        rows: [
          { feature: 'Service currently online & maintained', values: ['yes', 'no'] },
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
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'no'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '~12% (shut down)' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They did' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'The lowest commission in the market',
        desc:
          'At roughly 12%, AMZ Refund undercut everyone — including Dragon Refunds\' 15% managed rate. For pure price on managed filing, it was the best deal around while it lasted.',
      },
      {
        title: 'Careful, ToS-safe filing',
        desc:
          'AMZ Refund emphasized manual, human-reviewed case submission that stayed inside Amazon\'s Terms of Service — a real differentiator in an era when sloppy automation got sellers warned.',
      },
      {
        title: 'Honest, no-upfront model',
        desc:
          'You paid nothing until reimbursements were confirmed. That pay-on-results honesty earned it a loyal budget-conscious following.',
      },
    ],
    usWins: [
      {
        title: 'It exists — AMZ Refund does not',
        desc:
          'The 12% rate only matters if someone is filing. AMZ Refund\'s site is offline and claims are not being processed, while FBA claim windows keep expiring at 18 months. Dragon Refunds is live and maintained — file before the window closes.',
      },
      {
        title: 'Free self-file beats any commission',
        desc:
          'Even 12% was more expensive than free. Dragon Refunds\' free tier finds the money and hands you a step-by-step SOP to file yourself — you keep 100% of every dollar, a path AMZ Refund never offered.',
      },
      {
        title: 'Broader claim coverage',
        desc:
          'AMZ Refund focused on lost-and-damaged inventory and incorrect refunds. Dragon Refunds also chases FBA dimension / weight fee overcharges and COGS / sourcing-cost errors — money outside their scan.',
      },
      {
        title: 'A ledger you can take with you',
        desc:
          'AMZ Refund\'s shutdown shows why it matters: Dragon Refunds keeps your full found → filed → paid → denied history exportable, connects read-only via Amazon\'s official API, and Amazon pays reimbursements straight to your seller account.',
      },
    ],
    commission: {
      us: '15%',
      them: '~12% (shut down)',
      themAmount: '$0',
      line:
        'AMZ Refund\'s 12% beat our 15% on paper — but a shut-down service recovers $0. With Dragon Refunds you can file yourself free and keep the full $10,000, or hand it off for 15% and keep $8,500. Both beat nothing.',
    },
    faq: [
      {
        q: 'Is AMZ Refund shut down?',
        a: 'Yes — as of mid-2026, amzrefund.com is offline and the service appears to have shut down, with no public notice for its users. If you used AMZ Refund, your unfiled reimbursement opportunities are aging toward the 18-month claim deadline — a free Dragon Refunds audit will show what is still recoverable.',
      },
      {
        q: 'AMZ Refund charged 12% — why is Dragon Refunds 15%?',
        a: 'Honest answer: on managed filing, AMZ Refund was cheaper. But Dragon Refunds also has a path they never offered — free detection plus self-file SOPs where you keep 100%. Most sellers file the easy claims themselves free and hand off only the messy ones at 15%, ending up ahead of a flat 12% on everything.',
      },
      {
        q: 'I was an AMZ Refund user — what should I do now?',
        a: 'Re-audit your account as soon as possible. Anything their process missed, or anything that has accrued since they went dark, expires 18 months after the event. Connect Dragon Refunds\' free audit and you will see every still-recoverable claim in about two minutes.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant. (AMZ Refund also prided itself on ToS-safe filing — we kept that bar.)',
      },
      {
        q: 'What protects me if a reimbursement service disappears?',
        a: 'Structure. Dragon Refunds never touches your money — Amazon pays reimbursements directly into your seller account. Your claim ledger is exportable at any time, and the connection is read-only through Amazon\'s official API, revocable from Seller Central in one click.',
      },
    ],
  },
  'refunzo': {
    name: 'Refunzo',
    metaTitle: 'Dragon Refunds vs Refunzo: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Refunzo. Both offer free FBA reconciliation and 15% managed filing — so the difference is claim coverage and transparency, not price. Here is the side-by-side.',
    eyebrow: 'Dragon Refunds vs Refunzo',
    h1: {
      plain: 'Refunzo also does free reconciliation and 15% managed filing.',
      accent: 'Dragon Refunds recovers more categories — and shows you every dollar.',
    },
    subhead:
      'Refunzo is the closest match to Dragon Refunds on the market: free lifetime reconciliation, plus optional managed filing at 15%. So price is a tie — which means the real questions are how much each one finds, and how clearly it shows you where the money came from. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Refunzo if you want an established, funded service with offices across the US, UK, Germany and Australia, and a managed fee capped at $5,000 — which makes it cheaper than a flat 15% on very large recoveries.',
      us:
        'Choose Dragon Refunds if you want broader claim coverage — including COGS / sourcing-cost errors most tools skip — and fully itemized transparency, at the same free-plus-15% model.',
    },
    compare: [
      {
        label: 'The model (nearly identical)',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'yes'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '15% (cap $5k)' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'You, or them' }] },
        ],
      },
      {
        label: 'What we recover',
        rows: [
          { feature: 'Lost / damaged shipments', values: ['yes', 'yes'] },
          { feature: 'Fee overcharges', values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'partial'] },
        ],
      },
    ],
    themWins: [
      {
        title: 'Established, funded, and reviewed',
        desc:
          'Refunzo is a real company with offices across the US, UK, Germany, and Australia and a base of public reviews. If operating history and a physical footprint reassure you, they have more of both than a newer product.',
      },
      {
        title: 'The $5,000 fee cap',
        desc:
          'Refunzo caps its managed fee at "15% or $5,000, whichever is lower." For most sellers 15% is the number — but on a very large recovery (say $100k), that cap makes them meaningfully cheaper than a flat 15%. If you recover huge sums, that is a genuine edge.',
      },
      {
        title: '21 documented reconciliation checks',
        desc:
          'They publish a clear list of 21 automated checks across shipments, inventory, payments, fees, and returns. It is a well-defined, transparent scope for the standard categories.',
      },
    ],
    usWins: [
      {
        title: 'Recovers categories Refunzo skips',
        desc:
          'On top of the shared lost-and-damaged and fee-overcharge claims, Dragon Refunds chases COGS / sourcing-cost errors — cases where Amazon reimburses lost units below their true value — and digs into warehouse-damaged and destroyed inventory. More categories checked means more dollars found from the same account.',
      },
      {
        title: 'You see where every dollar came from',
        desc:
          'Both give you a report. Dragon Refunds goes further: it itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible, so you always know what is outstanding vs paid vs denied.',
      },
      {
        title: 'Same free tier, same 15% — no cap games',
        desc:
          'Dragon Refunds matches Refunzo on the parts that matter to most sellers: free self-file to keep 100%, or 15% managed. Flat and published, no whichever-is-lower math to reason about unless you are recovering six figures.',
      },
      {
        title: 'Part of a broader Amazon operator',
        desc:
          'Refunzo does reconciliation and reimbursements. Dragon Refunds is built on the same platform as a full Amazon operator — so as you grow, the reimbursement engine sits alongside the rest of your account instead of being a standalone silo.',
      },
    ],
    commission: {
      us: '15%',
      them: '15%',
      themAmount: '$8,500',
      line:
        'Refunzo matches our 15% managed rate (capped at $5,000 — better than flat 15% only on very large recoveries), and it also has a free self-file tier. So on price it is a tie: file it yourself free and keep the full $10,000 with either. The real difference is how many categories get checked and how clearly each claim is shown.',
    },
    faq: [
      {
        q: 'Is Dragon Refunds cheaper than Refunzo?',
        a: 'On headline price they are the same: both offer free self-file reconciliation (keep 100%) and 15% managed filing. Refunzo caps its managed fee at $5,000, which is cheaper than flat 15% only if you recover very large sums (roughly $33k+). For most sellers the cost is identical — so choose on coverage and transparency, not price.',
      },
      {
        q: 'What can Dragon Refunds recover that Refunzo doesn\'t?',
        a: 'Both cover the standard lost-and-damaged and fee-overcharge categories. Dragon Refunds additionally surfaces COGS / sourcing-cost errors — where Amazon reimburses lost units below their true sourcing value — and digs deeper into warehouse-damaged and destroyed inventory. More categories checked means more recoverable dollars from the same account.',
      },
      {
        q: 'Can I really file claims myself for free with both?',
        a: 'Yes — free self-file is the shared strength here. Dragon Refunds finds every recoverable shipment, fee, and unit and hands you a step-by-step SOP to file through Seller Central yourself, keeping 100%. Hand off only what you would rather not do, for 15%.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant.',
      },
      {
        q: 'I am evaluating both — how do I decide?',
        a: 'Run both free reconciliations side by side — neither charges for detection. Compare what each one finds on your actual account. If Dragon Refunds surfaces COGS and sourcing-cost claims Refunzo misses, that is your answer; if you recover six figures and value the $5k cap, that is theirs. Let the free audits decide.',
      },
    ],
  },
  'refund-hawk': {
    name: 'Refund Hawk',
    metaTitle: 'Dragon Refunds vs Refund Hawk: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Refund Hawk for Amazon FBA reimbursements. Refund Hawk files your claims for an unpublished commission. Dragon Refunds shows you every recoverable dollar, lets you file free and keep 100%, or hands it off for a published 15%.',
    eyebrow: 'Dragon Refunds vs Refund Hawk',
    h1: {
      plain: 'Refund Hawk files your claims for an unpublished commission.',
      accent: 'Dragon Refunds publishes its price: file free yourself, or 15% managed.',
    },
    subhead:
      'Refund Hawk is a full-service recovery agency — a US-based team that manually audits and files cases for Amazon 3P sellers and 1P vendors, plus TikTok Shop and retail deductions. It charges a commission only on what it recovers, but the rate is not published — you find out after the audit call. Dragon Refunds is a transparent reimbursement platform: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for a flat, published 15%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Refund Hawk if you also need 1P vendor recovery — chargebacks, shortages, retail deductions — or TikTok Shop, and you are comfortable with a commission rate that is quoted after a call rather than published on the site.',
      us:
        'Choose Dragon Refunds if FBA reimbursements are the point: see exactly where every dollar came from, keep the option to file yourself for free, and pay a flat, published 15% — no audit call required to learn the price.',
    },
    compare: [
      {
        label: 'Transparency',
        rows: [
          { feature: 'Flat, published pricing', values: ['yes', 'no'] },
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
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'FBA dimension / weight fee overcharges', values: ['yes', 'yes'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
          { feature: '1P vendor chargebacks & retail deductions', note: 'their specialty',
            values: ['no', 'yes'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: 'Flat 15%' }, { t: '% (unpublished)' }] },
          { feature: 'Free audit', values: [{ t: 'Self-serve, ~2 min' }, { t: 'Booked with their team' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
    ],
    themWins: [
      {
        title: '1P vendor and retail recovery',
        desc:
          'Refund Hawk goes where most FBA tools do not: Amazon 1P vendor chargebacks and shortages, plus retail deductions at Walmart and Target and TikTok Shop recovery. If you sell 1P or across channels, that breadth is genuinely theirs.',
      },
      {
        title: 'A real, US-based human team',
        desc:
          'Their pitch is a 100% U.S.-based team of analysts and account specialists who manually audit and submit every case inside Amazon\'s terms of service — a careful, human approach on messy claims that need documentation.',
      },
      {
        title: 'Honest no-win, no-fee structure',
        desc:
          'No subscription, no upfront cost — "only pay if we win." You owe a commission only after the money is back in your account, which keeps their incentives aligned with yours.',
      },
      {
        title: 'Fast turnaround on the audit',
        desc:
          'They advertise completing the initial account audit within 24 hours of connecting, backed by an agency pedigree (associated with the Pirawna Amazon agency and Caldicot Capital).',
      },
    ],
    usWins: [
      {
        title: 'A published price, not a quote',
        desc:
          'Refund Hawk\'s commission is not on their website — you learn the rate after the audit call. Dragon Refunds\' price is public and flat: file it yourself free and keep 100%, or 15% managed. You can calculate your cost before you connect.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Refund Hawk files everything and takes its cut of all of it. Dragon Refunds has a free tier: it finds the money and hands you a step-by-step SOP so you can file the easy claims through Seller Central yourself and keep every dollar.',
      },
      {
        title: 'You see where every dollar came from',
        desc:
          'Refund Hawk gives you a reporting dashboard of recoveries. Dragon Refunds itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible.',
      },
      {
        title: 'Recovers COGS & sourcing-cost errors',
        desc:
          'Refund Hawk\'s 3P scope covers the standard categories — lost and damaged inventory, unreturned refunds, inbound errors, fee miscalculations. Dragon Refunds also catches COGS / sourcing-cost errors, where Amazon reimburses lost units below their true value.',
      },
      {
        title: 'Audit in ~2 minutes, no call required',
        desc:
          'Refund Hawk\'s free audit starts with booking a call with their team. Dragon Refunds connects read-only through Amazon\'s official SP-API and shows your audit results in about two minutes — self-serve, no meeting on your calendar.',
      },
    ],
    commission: {
      us: '15%',
      them: '% (unpublished)',
      themAmount: '$10,000 − their cut',
      line:
        'Refund Hawk charges a percentage of successful recoveries, but the rate is not published — you find out after the audit call. Dragon Refunds is flat and public: file it yourself free and keep the full $10,000, or hand it off for 15% and keep $8,500. No call required.',
    },
    faq: [
      {
        q: 'How much does Refund Hawk charge compared to Dragon Refunds?',
        a: 'Refund Hawk charges a commission on successful recoveries with no monthly fees, but the exact percentage is not published on their site — it is quoted after their free audit call. Dragon Refunds publishes its price: detection and self-file guides are free (you keep 100%), and managed filing is a flat 15% of what is recovered. On $10,000 recovered at 15%, you keep $8,500 — and you know that number before you connect.',
      },
      {
        q: 'Can I really file claims myself for free?',
        a: 'Yes. Dragon Refunds\' free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file it through Seller Central yourself. You keep 100%. Hand off only the claims you would rather not do — for 15%. Refund Hawk has no self-file option: their team files everything and takes the commission on all of it.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant. (Refund Hawk also emphasizes ToS-safe manual filing — that bar is shared.)',
      },
      {
        q: 'What does Refund Hawk cover that Dragon Refunds doesn\'t?',
        a: 'Honest answer: 1P vendor recovery. Refund Hawk handles Amazon Vendor chargebacks and shortages, TikTok Shop recovery, and retail deductions at Walmart and Target. Dragon Refunds is built for Amazon 3P FBA reimbursements. If you are a 1P vendor or need multi-channel deduction recovery, Refund Hawk\'s scope is genuinely broader; if you are an FBA seller, Dragon Refunds checks more FBA claim categories, including COGS / sourcing-cost errors.',
      },
      {
        q: 'I already use Refund Hawk — is switching hard?',
        a: 'No. Connect Dragon Refunds in about two minutes over the official API and it audits your entire reimbursement history — including categories like COGS / sourcing-cost errors that a standard four-category audit skips. You can run both side by side while you decide; the audit is free either way.',
      },
    ],
  },
  'refund-labs': {
    name: 'RefundLabs',
    metaTitle: 'Dragon Refunds vs RefundLabs: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and RefundLabs for Amazon FBA reimbursements. RefundLabs files your claims for an undisclosed commission. Dragon Refunds shows you every recoverable dollar, lets you file free and keep 100%, or hands it off for a published 15%.',
    eyebrow: 'Dragon Refunds vs RefundLabs',
    h1: {
      plain: 'RefundLabs files your claims for an undisclosed commission.',
      accent: 'Dragon Refunds publishes its price: free self-file, or 15% managed.',
    },
    subhead:
      'RefundLabs is a small, fully managed reimbursement service: a Core Engine scans your account, a dedicated Recovery Specialist manually reviews and files every claim, and you pay a commission on each approved reimbursement — but the rate is not published on their site. Dragon Refunds takes the opposite approach: transparent detection, a free self-file tier where you keep 100%, and a flat, published 15% when you want it handled. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose RefundLabs if you want a hands-off boutique service where a human specialist manually reviews and files every claim, you never pay unless Amazon actually pays you, and you are comfortable learning the commission rate after you sign up.',
      us:
        'Choose Dragon Refunds if you want to know the price before you connect — free to self-file and keep 100%, or a published 15% managed — plus coverage of COGS / sourcing-cost errors most services skip.',
    },
    compare: [
      {
        label: 'Pricing and the model',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%, published' }, { t: 'Undisclosed %' }] },
          { feature: 'Price published before you connect', values: ['yes', 'no'] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
        ],
      },
      {
        label: 'What we recover',
        rows: [
          { feature: 'Lost / damaged shipments', values: ['yes', 'yes'] },
          { feature: 'Fee overcharges', values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'partial'] },
        ],
      },
    ],
    themWins: [
      {
        title: 'A human reviews and files every claim',
        desc:
          'RefundLabs assigns a dedicated Recovery Specialist to each account, and every claim is individually reviewed and manually filed. If you want a boutique, done-for-you service with a named person on your account, that is exactly what they sell.',
      },
      {
        title: 'Truly pay-on-success, with no monthly fees',
        desc:
          'It is free to open an account, there are no monthly fees, and you are only charged after Amazon approves a claim they filed. You can even sign up without billing information and see their analysis of your account before entering a payment method.',
      },
      {
        title: 'Broad event detection with per-claim invoicing',
        desc:
          'Their Core Engine analyzes 18 months of account data across 27+ reimbursable event types — including unreturned customer returns — and their invoices itemize what they charged on each individual claim, which is more billing transparency than many managed services offer.',
      },
    ],
    usWins: [
      {
        title: 'You know the price before you connect',
        desc:
          'RefundLabs charges a commission on each approved claim, but the percentage is not published on their site — you find out after signing up. Dragon Refunds publishes its pricing up front: self-file for free and keep 100%, or a flat 15% managed. No surprises after the audit.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'RefundLabs is managed-only: they file, they take a cut of everything. Dragon Refunds has a free tier — it finds every recoverable shipment, fee, and unit and hands you a step-by-step SOP to file through Seller Central yourself, keeping every dollar.',
      },
      {
        title: 'Recovers categories RefundLabs skips',
        desc:
          'Beyond the shared lost-and-damaged and fee-overcharge claims, Dragon Refunds chases COGS / sourcing-cost errors — cases where Amazon reimburses lost units below their true value — and digs into warehouse-damaged and destroyed inventory. More categories checked means more dollars found.',
      },
      {
        title: 'Full ledger, itemized causes',
        desc:
          'RefundLabs shows you the claims they chose to file. Dragon Refunds shows you everything it found — the exact lost shipment, damaged unit, fee mismatch, or COGS error behind each claim — and keeps the full found → filed → paid → denied ledger visible, including what you have not filed yet.',
      },
      {
        title: 'Part of a broader Amazon operator',
        desc:
          'RefundLabs is a standalone recovery service run by a very small team. Dragon Refunds is built on the same platform as a full Amazon operator — reimbursements sit alongside the rest of your account, and Amazon pays recoveries directly to your seller account; we never touch your money.',
      },
    ],
    commission: {
      us: '15%',
      them: 'Undisclosed',
      themAmount: '$10,000 − ?',
      line:
        'RefundLabs charges a commission on each claim Amazon approves — no monthly fees, pay only on success — but the percentage is not published anywhere on their site, so we cannot tell you what you would keep of a $10,000 recovery. With Dragon Refunds the math is public: file it yourself free and keep the full $10,000, or hand it off at 15% and keep $8,500.',
    },
    faq: [
      {
        q: 'Is Dragon Refunds cheaper than RefundLabs?',
        a: 'We honestly cannot compare exact numbers, because RefundLabs does not publish its commission rate — their FAQ confirms they charge a percentage of each approved reimbursement, but the percentage is only disclosed after you sign up. Dragon Refunds publishes its pricing: free self-file (keep 100%) or a flat 15% managed. At minimum, every claim you file yourself with us is cheaper than any commission.',
      },
      {
        q: 'How does RefundLabs pricing actually work?',
        a: 'RefundLabs is free to join with no monthly fees. Their Core Engine analyzes your account, a Recovery Specialist manually files claims, and when Amazon approves a claim they charge a commission on that reimbursement. You can see their analysis before adding billing details — but the commission rate itself is not stated on their public site.',
      },
      {
        q: 'Can I really file claims myself for free with Dragon Refunds?',
        a: 'Yes. The free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file through Seller Central yourself — you keep 100%. RefundLabs has no self-file option; every recovered dollar carries their commission. With us, hand off only what you would rather not do, for 15%.',
      },
      {
        q: 'What can Dragon Refunds recover that RefundLabs doesn\'t?',
        a: 'Both cover lost and damaged inventory, unresolved shipment discrepancies, and fee overcharges. Dragon Refunds additionally surfaces COGS / sourcing-cost errors — where Amazon reimburses lost units below their true sourcing value — and digs deeper into warehouse-damaged and destroyed inventory. RefundLabs advertises 27+ event types, but COGS-level auditing is not among them.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant. The free audit shows results in about two minutes.',
      },
      {
        q: 'I am evaluating both — how do I decide?',
        a: 'Run the Dragon Refunds free audit first — it costs nothing and shows every recoverable claim with its cause in about two minutes. Then, if you want a fully managed human service, ask RefundLabs what their commission rate is before connecting your account, and compare it to our published 15%. If their rate is higher — or you would rather file the easy claims yourself for free — the math decides for you.',
      },
    ],
  },
  'refundpros': {
    name: 'RefundPros',
    metaTitle: 'Dragon Refunds vs RefundPros: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and RefundPros for Amazon FBA reimbursements. RefundPros files your claims for up to 25% of recoveries. Dragon Refunds shows you every recoverable dollar, lets you file free and keep 100%, or hands it off for 15%.',
    eyebrow: 'Dragon Refunds vs RefundPros',
    h1: {
      plain: 'RefundPros files your claims and takes up to 25%.',
      accent: 'Dragon Refunds shows you every dollar — and charges 15%.',
    },
    subhead:
      'RefundPros is a Canadian recovery agency that has audited refunds since 2016 — carrier shipping refunds, Walmart WFS, Amazon Vendor, and Amazon FBA — with an in-house team that files everything for you and keeps up to 25% of what comes back. Dragon Refunds is a transparent FBA reimbursement platform: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for 15%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose RefundPros if you want a hands-off, human-reviewed agency with a 5.0 Trustpilot rating and years of history — especially if you also want UPS/FedEx shipping refunds and Walmart WFS audits handled by the same vendor, and you are fine paying up to 25% of recoveries.',
      us:
        'Choose Dragon Refunds if you want an instant free audit that itemizes every recoverable dollar, the option to file yourself and keep 100%, and a flat published 15% — not a negotiated up-to-25% — when you hand it off.',
    },
    compare: [
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: 'Up to 25%' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
          { feature: 'See results without a sales call', note: 'audit in ~2 minutes',
            values: ['yes', 'no'] },
        ],
      },
      {
        label: 'What we recover',
        rows: [
          { feature: 'Lost / damaged shipments', values: ['yes', 'yes'] },
          { feature: 'FBA fee overcharges', note: 'weight / dimension errors',
            values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'partial'] },
          { feature: 'Published, flat commission rate', values: ['yes', 'no'] },
        ],
      },
    ],
    themWins: [
      {
        title: 'Excellent reviews and a real track record',
        desc:
          'RefundPros has operated since 2016 and holds a 5.0 Trustpilot rating across roughly 150 reviews. Sellers consistently describe the process as effortless and nearly 100% hands-off. That depth of verified social proof is a genuine strength.',
      },
      {
        title: 'One vendor for FBA, Walmart, and shipping refunds',
        desc:
          'Beyond Amazon FBA, RefundPros audits Amazon Vendor Central, Walmart WFS, and carrier invoices — UPS, FedEx, Canada Post, Purolator. If you ship parcels or sell on Walmart too, consolidating recovery with one agency has real appeal. Dragon Refunds is Amazon-only.',
      },
      {
        title: 'Human review before every claim',
        desc:
          'Their in-house team (no offshore outsourcing) manually verifies each case before it is submitted, guarding against duplicate filings and policy conflicts. For sellers nervous about compliance, an expert reviewing every claim is reassuring.',
      },
      {
        title: 'Negotiable rates for large accounts',
        desc:
          'RefundPros\' commission scales with your annual FBA sales volume. A very large seller may negotiate a rate below their standard cut — if you have the volume and the appetite to haggle, that flexibility can work in your favor.',
      },
    ],
    usWins: [
      {
        title: 'File it yourself and keep 100%',
        desc:
          'RefundPros is managed-only: they file everything and take a cut of all of it. Dragon Refunds has a free tier: it finds the money and hands you a step-by-step SOP so you can file claims through Seller Central yourself and keep every dollar.',
      },
      {
        title: 'A flat, published 15% — no negotiation required',
        desc:
          'RefundPros does not publish its rate; it says you keep "a minimum of 75%," which means up to 25% depending on what you negotiate. Dragon Refunds charges a flat 15% for managed filing, published up front. On $10,000 recovered at their standard cut, that is $1,000 more in your pocket — with no haggling.',
      },
      {
        title: 'Instant audit, no discovery call',
        desc:
          'RefundPros\' flow starts with a contact form or a booked call with a specialist. Dragon Refunds connects over Amazon\'s official SP-API and shows your full recoverable amount in about two minutes — before you talk to anyone.',
      },
      {
        title: 'You see where every dollar came from',
        desc:
          'A managed agency hands you a recovered total. Dragon Refunds itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible at all times.',
      },
      {
        title: 'Recovers claim types RefundPros skips',
        desc:
          'Dragon Refunds also chases COGS / sourcing-cost errors — cases where Amazon reimburses lost units below their true sourcing value — and digs into destroyed inventory. More categories checked means more dollars found from the same account.',
      },
    ],
    commission: {
      us: '15%',
      them: 'Up to 25%',
      themAmount: '$7,500',
      line:
        'RefundPros does not publish an exact commission — its site says you keep "a minimum of 75% of every reimbursement," with rates negotiable by annual FBA sales volume. At that standard cut, $10,000 recovered leaves you $7,500 with RefundPros versus $8,500 at Dragon Refunds\' flat 15% — or the full $10,000 if you file it yourself on the free tier.',
    },
    faq: [
      {
        q: 'How much cheaper is Dragon Refunds than RefundPros?',
        a: 'RefundPros does not publish an exact rate — it commits only to leaving you "a minimum of 75% of every reimbursement," meaning up to 25% commission, negotiable by sales volume. Dragon Refunds charges a flat, published 15% for managed filing. On $10,000 recovered at RefundPros\' standard cut you keep $7,500; with Dragon Refunds you keep $8,500 — and any claim you file yourself through the free tier costs nothing at all.',
      },
      {
        q: 'Can I really file claims myself for free?',
        a: 'Yes. Dragon Refunds\' free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file it through Seller Central yourself. You keep 100%. RefundPros has no self-file option — every reimbursement they recover carries their commission.',
      },
      {
        q: 'Doesn\'t RefundPros also handle Walmart and shipping refunds?',
        a: 'Yes — that is their genuine edge. RefundPros audits Amazon Vendor Central, Walmart WFS, and carrier invoices (UPS, FedEx, Canada Post, Purolator) alongside FBA. Dragon Refunds focuses exclusively on Amazon, which is why it goes deeper there: COGS / sourcing-cost errors, destroyed inventory, and a fully itemized claim ledger.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant. RefundPros also uses Amazon\'s App Authorization system, so both are legitimate on this front.',
      },
      {
        q: 'What can Dragon Refunds recover that RefundPros doesn\'t?',
        a: 'Both cover lost inbound shipments, warehouse-damaged goods, return errors, and FBA fee overcharges. Dragon Refunds additionally surfaces COGS / sourcing-cost errors — where Amazon reimburses lost units below their true sourcing value — and digs into destroyed inventory, categories a standard discrepancy audit leaves on the table.',
      },
      {
        q: 'I already use RefundPros — is switching hard?',
        a: 'No. Connect Dragon Refunds in about two minutes over the official API and it audits your entire reimbursement history — including what your current process quietly missed. You can run the free audit alongside RefundPros with zero risk and let the results decide.',
      },
    ],
  },
  'hawkways': {
    name: 'Hawkways',
    metaTitle: 'Dragon Refunds vs Hawkways: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Hawkways for Amazon FBA reimbursements. Hawkways is a full-service agency where reimbursement is one service among many, priced by quote. Dragon Refunds is a dedicated product: free self-file to keep 100%, or 15% managed.',
    eyebrow: 'Dragon Refunds vs Hawkways',
    h1: {
      plain: 'Hawkways is a full-service agency — reimbursements are one service of twelve.',
      accent: 'Dragon Refunds does one thing: get your money back — free DIY, or 15%.',
    },
    subhead:
      'Hawkways is a US-based, full-service Amazon agency: PPC, listings, account management, and — somewhere on the menu — FBA reimbursements, filed manually by their team under quote-based "tailored plans." Dragon Refunds is a dedicated reimbursement product: it pinpoints the source of every claim, lets you file it yourself for free, or hands it off for a flat, published 15%. Here is an honest, side-by-side breakdown.',
    tldr: {
      them:
        'Choose Hawkways if you want one agency running your whole Amazon account — PPC, listings, account management — with reimbursements handled by the same team as part of the relationship, and you are comfortable getting the reimbursement price on a call rather than a pricing page.',
      us:
        'Choose Dragon Refunds if reimbursements are the point: itemized detection you can act on free (keep 100%), broader claim coverage including COGS errors, and a flat published 15% when you want it handled — no retainer, no sales call.',
    },
    compare: [
      {
        label: 'Transparency',
        rows: [
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, 'partial'] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', { t: 'Monthly reports' }] },
          { feature: 'Flat, published pricing', values: ['yes', 'no'] },
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
          { feature: 'Managed commission', values: [{ t: 'Flat 15%' }, { t: 'Quote-based' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'They do' }] },
          { feature: 'Dedicated reimbursement product', values: ['yes', { t: 'Agency side-service' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'One partner for the whole account',
        desc:
          'Hawkways runs PPC, listings, SEO, account management, and reimbursements under one roof. If you want a single agency accountable for everything on Amazon — not just claims — that bundle is genuinely their pitch.',
      },
      {
        title: 'Human, manual filing',
        desc:
          'Their team files claims manually through Seller Support with documentation — they explicitly state they never use prohibited automation or bots. On messy, non-standard cases, experienced human filers are a real asset.',
      },
      {
        title: 'An established agency track record',
        desc:
          'Hawkways reports serving 250+ FBA brands with a 4.9/5 average client rating and a Top Rated Upwork agency profile. If you weigh agency credentials and social proof, they have a real base of it.',
      },
    ],
    usWins: [
      {
        title: 'A dedicated product, not a menu item',
        desc:
          'For Hawkways, reimbursement is one of a dozen services. Dragon Refunds is built for exactly this: it itemizes the cause of every claim — the exact lost shipment, damaged unit, dimension mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible, not a monthly summary.',
      },
      {
        title: 'File it yourself and keep 100%',
        desc:
          'Hawkways audits for free, but the filing is theirs — on a plan. Dragon Refunds has a free tier: it finds the money and hands you a step-by-step SOP so you can file the easy claims yourself through Seller Central and keep every dollar.',
      },
      {
        title: 'Flat, published 15% — no sales call',
        desc:
          'Hawkways prices reimbursements through "tailored plans based on your catalog and recovery volume" — you find out the cost after the audit. Dragon Refunds\' price is on the website: free self-file, or 15% managed. You know your cost before you connect.',
      },
      {
        title: 'Recovers COGS & sourcing-cost errors',
        desc:
          'Hawkways covers the standard categories — lost, damaged, fee errors, unreturned refunds. Dragon Refunds also catches COGS / sourcing-cost errors — where Amazon reimburses lost units below their true value — a category their published scope does not include.',
      },
      {
        title: 'Results in minutes, over the official API',
        desc:
          'Dragon Refunds connects through Amazon\'s official SP-API, read-only by default, and the free audit shows what is recoverable in about two minutes — no onboarding an agency, no waiting on an audit deliverable. And Amazon pays reimbursements straight to your seller account; nobody sits between you and the money.',
      },
    ],
    commission: {
      us: '15%',
      them: 'Quote-based',
      themAmount: '$10,000 − ?',
      line:
        'Hawkways does not publish a reimbursement commission — pricing is a "tailored plan" you learn after the audit. Dragon Refunds is published and flat: file it yourself free and keep the full $10,000, or hand it off for 15% and keep $8,500. No call required.',
    },
    faq: [
      {
        q: 'How much does Hawkways charge for reimbursements, and how does Dragon Refunds compare?',
        a: 'Hawkways does not publish a price for its reimbursement service — the site says plans are "tailored based on your catalog and recovery volume," so you learn the cost after the free audit. Dragon Refunds publishes its pricing: detection and self-file guides are free (you keep 100%), and managed filing is a flat 15% of what is recovered.',
      },
      {
        q: 'Isn\'t it better to have one agency handle everything?',
        a: 'Sometimes — if you also want PPC, listings, and account management handled, an agency retainer bundles it all. But if reimbursements are what you came for, a dedicated product goes deeper: itemized claim causes, a full claim ledger, COGS-error coverage, and a free self-file path no agency offers. The two can also coexist — many Hawkways-style agency clients run their own reimbursement tool.',
      },
      {
        q: 'Can I really file claims myself for free?',
        a: 'Yes. Dragon Refunds\' free tier finds every recoverable shipment, fee, and unit and gives you a step-by-step SOP to file it through Seller Central yourself. You keep 100%. Hand off only the claims you would rather not do — for 15%.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default. No scraping, no gray areas — 100% Amazon Terms of Service compliant. (Hawkways likewise emphasizes manual, bot-free filing — both approaches stay inside Amazon\'s rules.)',
      },
      {
        q: 'What can Dragon Refunds recover that Hawkways doesn\'t?',
        a: 'Hawkways\' published scope covers lost inventory, warehouse damage, dimension and referral fee errors, unrestocked returns, and refunds issued without a return. Dragon Refunds covers those and adds COGS / sourcing-cost errors — cases where Amazon reimburses lost or damaged units below their true sourcing value.',
      },
      {
        q: 'I already work with Hawkways — can I still use Dragon Refunds?',
        a: 'Yes. Connect Dragon Refunds in about two minutes over the official API and the free audit shows every recoverable claim — including anything an agency workflow quietly missed. Keep the agency for PPC and listings if it is working; let the free audit tell you whether the reimbursement side is leaving money on the table.',
      },
    ],
  },
  'refundpad': {
    name: 'RefundPad',
    metaTitle: 'Dragon Refunds vs RefundPad: FBA Reimbursements Compared (2026)',
    metaDescription:
      'RefundPad sold DIY FBA reimbursement reports for $19/mo — but its site now shows only an "under construction" page. Dragon Refunds is the live alternative: free self-file, or 15% managed filing.',
    eyebrow: 'Dragon Refunds vs RefundPad',
    h1: {
      plain: 'RefundPad\'s site now says "under construction."',
      accent: 'Dragon Refunds is the live alternative — free DIY, or 15% managed.',
    },
    subhead:
      'RefundPad was the budget DIY option: upload your Seller Central reports, pay a flat $19/month (or $89/year), get reimbursement reports, and file the claims yourself. As of mid-2026, refundpad.com shows only an "under construction" placeholder on every page — the app, pricing, and blog are all gone. If you used it or were evaluating it, Dragon Refunds covers the same self-file ground for free — no subscription at all — with optional managed filing at 15%. Here is the honest comparison.',
    tldr: {
      them:
        'RefundPad\'s flat $19/mo with no commission was the cheapest math in the industry for DIY sellers, and it never even asked for account access. But its entire site is now a placeholder page — no app, no pricing, no sign-up.',
      us:
        'Choose Dragon Refunds for the same self-file philosophy without the subscription: free detection with step-by-step filing SOPs (keep 100%), automatic SP-API syncing instead of manual report uploads, and optional 15% managed filing — from a product that is live and maintained.',
    },
    compare: [
      {
        label: 'The basics',
        rows: [
          { feature: 'Service currently online & maintained', values: ['yes', 'no'] },
          { feature: 'Connects automatically via Amazon\'s official API', note: 'vs manual report uploads',
            values: [{ t: 'SP-API, read-only' }, { t: 'Manual uploads' }] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', 'no'] },
        ],
      },
      {
        label: 'What we recover',
        rows: [
          { feature: 'Lost / damaged inventory', values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'FBA fee overcharges', values: ['yes', 'no'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'How it works',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', { t: '7-day trial' }] },
          { feature: 'Ongoing cost to detect claims', values: [{ t: 'Free' }, { t: '$19/mo (offline)' }] },
          { feature: 'Optional managed filing', values: [{ t: 'Yes — 15%' }, 'no'] },
        ],
      },
    ],
    themWins: [
      {
        title: 'The cheapest math in the industry — while it worked',
        desc:
          'A flat $19/month with zero commission meant a seller recovering serious money kept essentially all of it. For high-recovery DIY sellers, no percentage-based service could beat that arithmetic.',
      },
      {
        title: 'Never touched your account',
        desc:
          'RefundPad required no API connection and no Seller Central access at all — you downloaded your own reports and uploaded them. For privacy-conscious sellers, that zero-access stance was a genuine comfort.',
      },
      {
        title: 'Self-file, ToS-first philosophy',
        desc:
          'RefundPad deliberately never filed claims on your behalf, keeping the seller in control and squarely inside Amazon\'s Terms of Service. That DIY-first instinct was right — it is the same philosophy behind Dragon Refunds\' free tier.',
      },
    ],
    usWins: [
      {
        title: 'It exists — RefundPad is a placeholder page',
        desc:
          'As of mid-2026, every page on refundpad.com — the app, pricing, even the blog — shows only "We\'re under construction." Meanwhile FBA claim windows keep expiring at 18 months. Dragon Refunds is live and maintained, and the free audit shows results in about two minutes.',
      },
      {
        title: 'Free beats $19/month',
        desc:
          'RefundPad charged the subscription every month — including months where it found nothing. Dragon Refunds\' detection and self-file SOPs are simply free: you keep 100% of every dollar and pay nothing unless you choose managed filing.',
      },
      {
        title: 'Automatic syncing, not CSV homework',
        desc:
          'RefundPad\'s workflow was manual: pull the right reports from Seller Central, upload them, repeat up to four times a month. Dragon Refunds connects once through Amazon\'s official SP-API — read-only by default — and audits your account automatically.',
      },
      {
        title: 'Broader claim coverage',
        desc:
          'RefundPad\'s reports covered lost inventory, damaged inventory, and customer-return discrepancies. Dragon Refunds also chases FBA fee overcharges, destroyed inventory, and COGS / sourcing-cost errors — categories its four reports never scanned.',
      },
      {
        title: 'A managed option when you want it',
        desc:
          'RefundPad was DIY or nothing. Dragon Refunds lets you file the easy claims yourself free and hand off only the messy ones at 15% — with a full found → filed → paid → denied ledger either way.',
      },
    ],
    commission: {
      us: '15%',
      them: '$19/mo flat (offline)',
      themAmount: '$0',
      line:
        'RefundPad charged no commission at all — just $19/month whether it found $10,000 or nothing. While it ran, that flat fee was unbeatable math for DIY sellers. But an offline service recovers $0. Dragon Refunds: file it yourself free and keep the full $10,000 — no subscription — or hand it off at 15% and keep $8,500.',
    },
    faq: [
      {
        q: 'How much did RefundPad cost, and how does Dragon Refunds compare?',
        a: 'RefundPad charged a flat subscription — $19/month or $89/year, with a 7-day free trial limited to its Lost Inventory report — and never took a commission, because you filed everything yourself. Dragon Refunds\' equivalent DIY path costs nothing at all: free detection, free step-by-step filing SOPs, keep 100%. You only ever pay the 15% commission if you opt into managed filing.',
      },
      {
        q: 'Is RefundPad shut down?',
        a: 'It appears so. As of mid-2026, every page on refundpad.com — including the app login, pricing page, and blog — returns only a "We\'re under construction" placeholder, and there is no public notice about what happened. The last archived version of the working product dates to early 2025. We\'d be glad to update this page if it relaunches.',
      },
      {
        q: 'I was a RefundPad subscriber — what should I do now?',
        a: 'First, check whether you are still being billed for the subscription and cancel if so. Then re-audit your account: anything RefundPad\'s reports missed, plus everything that has accrued since it went quiet, expires 18 months after the event. Dragon Refunds\' free audit re-scans your full claim window and shows results in about two minutes.',
      },
      {
        q: 'RefundPad never needed access to my Amazon account — does Dragon Refunds?',
        a: 'Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default, which is what makes the two-minute automatic audit possible — no downloading and uploading reports by hand. The connection is 100% ToS-compliant and revocable from Seller Central at any time, and Dragon Refunds never touches your money: Amazon pays reimbursements directly into your seller account.',
      },
      {
        q: 'Wasn\'t a flat subscription cheaper than a 15% commission?',
        a: 'For DIY filing, yes — RefundPad\'s $19/mo with no commission beat every percentage-based managed service, and we\'ll say so plainly. But Dragon Refunds\' DIY path is cheaper still: $0. Free detection, free self-file SOPs, keep 100%. The 15% only applies if you choose to hand claims off — an option RefundPad never offered at any price.',
      },
    ],
  },
  'amalyzer': {
    name: 'Amalyzer',
    metaTitle: 'Dragon Refunds vs Amalyzer: FBA Reimbursements Compared (2026)',
    metaDescription:
      'Honest comparison of Dragon Refunds and Amalyzer (Amalyzer Pro). Amalyzer is a done-for-you reimbursement service at 25% commission; Dragon Refunds lets you self-file free or hand off at 15%. Side-by-side breakdown.',
    eyebrow: 'Dragon Refunds vs Amalyzer',
    h1: {
      plain: 'Amalyzer files your claims for you — and keeps 25%.',
      accent: 'Dragon Refunds finds the same money free, and files it for 15% if you want.',
    },
    subhead:
      'Amalyzer (Amalyzer Pro) is a hands-off reimbursement service: you sync your Amazon account, their software flags discrepancies, and their team manually files and chases every claim for a 25% cut of what Amazon pays back. No monthly fee, no commitment — but also no self-file option and no published dashboard. Here is how that stacks up against a free audit you control.',
    tldr: {
      them:
        'Choose Amalyzer if you want a fully done-for-you service where a human team files and personally follows up every claim, you never open Seller Central for reimbursements, and you are fine paying 25% of every recovery for that.',
      us:
        'Choose Dragon Refunds if you want to see every recoverable dollar free in about two minutes, file the easy claims yourself and keep 100%, and hand off only the messy ones at 15% — with an itemized ledger of where each dollar came from.',
    },
    compare: [
      {
        label: 'Price & model',
        rows: [
          { feature: 'Free tier — find and file yourself at no cost', note: 'DIY',
            values: ['yes', 'no'] },
          { feature: 'Managed commission', values: [{ t: '15%' }, { t: '25%' }] },
          { feature: 'Monthly fee', values: [{ t: 'None' }, { t: 'None' }] },
          { feature: 'Who files', values: [{ t: 'You, or us' }, { t: 'Their team only' }] },
        ],
      },
      {
        label: 'What gets recovered',
        rows: [
          { feature: 'Lost / damaged shipments', values: ['yes', 'yes'] },
          { feature: 'Fee overcharges', note: 'weight, dimensional, commission fees',
            values: ['yes', 'yes'] },
          { feature: 'Warehouse-damaged & destroyed inventory', values: ['yes', 'partial'] },
          { feature: 'COGS & sourcing-cost errors', values: ['yes', 'no'] },
        ],
      },
      {
        label: 'Experience & transparency',
        rows: [
          { feature: 'How you connect', note: 'and how fast you see results',
            values: [{ t: 'SP-API, results in ~2 min' }, { t: 'Contact form, then sync' }] },
          { feature: 'Shows the cause of each claim', note: 'lost / damaged / dimension / COGS',
            values: [{ t: 'Itemized per claim' }, { t: 'Not published' }] },
          { feature: 'Full claim ledger', note: 'found → filed → paid → denied',
            values: ['yes', { t: 'Not published' }] },
        ],
      },
    ],
    themWins: [
      {
        title: 'Every claim gets a human',
        desc:
          'Amalyzer runs a two-part process: software flags discrepancies, then a team member manually reviews, files, and personally follows up each claim with Amazon — they state outright that they never automate claims. If you want a person chasing every dollar for you, that is exactly what they sell.',
      },
      {
        title: 'Truly zero-effort, zero-risk pricing',
        desc:
          'No monthly fee, no commitment, no upfront cost — Amalyzer only gets paid when you do. You sync your account once and never think about reimbursements again. For a seller who wants reimbursements fully off their plate, the hands-off model is genuinely simple.',
      },
      {
        title: 'Ongoing fee and returns monitoring',
        desc:
          'Beyond one-off claims, Amalyzer audits your account weekly for fee errors — weight, dimensional, and commission overcharges — and tracks customer returns against Amazon\'s 30-day deadline to secure restocking-fee refunds. That returns-tracking angle is a real part of their pitch.',
      },
    ],
    usWins: [
      {
        title: 'Keep 100% — or pay 15 instead of 25',
        desc:
          'Amalyzer\'s only mode is managed filing at 25%. Dragon Refunds finds every claim free and hands you a step-by-step SOP to file through Seller Central yourself, keeping 100%. Prefer to hand it off? Managed filing costs 15% — ten points less on every dollar recovered.',
      },
      {
        title: 'See your money in minutes, not after a sales call',
        desc:
          'Amalyzer\'s onboarding runs through a contact form and a personal follow-up. Dragon Refunds connects through Amazon\'s official SP-API — read-only by default — and shows your full recoverable total in about two minutes, before you commit to anything.',
      },
      {
        title: 'Chases categories Amalyzer doesn\'t list',
        desc:
          'Amalyzer\'s published scope covers lost/damaged inbound inventory, overlooked reimbursements, returns, and fee overcharges. Dragon Refunds also digs into warehouse-damaged and destroyed inventory and COGS / sourcing-cost errors — cases where Amazon reimburses lost units below their true value — a category most services skip entirely.',
      },
      {
        title: 'An itemized ledger, not a black box',
        desc:
          'Amalyzer publishes no dashboard or claim-level reporting. Dragon Refunds itemizes the cause of every claim — the exact lost shipment, damaged unit, fee mismatch, or COGS error — and keeps the full found → filed → paid → denied ledger visible, so you always know what is outstanding, paid, or denied.',
      },
      {
        title: 'Never touches your money',
        desc:
          'With Dragon Refunds, Amazon pays reimbursements directly into your seller account — we never sit in the money flow, and the SP-API connection is read-only and revocable from Seller Central in one click. Plus reimbursements sit inside a broader Amazon operator platform, not a standalone silo.',
      },
    ],
    commission: {
      us: '15%',
      them: '25%',
      themAmount: '$7,500',
      line:
        'On a $10,000 recovery, Amalyzer\'s 25% leaves you $7,500. Dragon Refunds\' managed filing at 15% leaves you $8,500 — and if you file yourself with our free SOPs, you keep the full $10,000. Same money found, up to $2,500 more kept.',
    },
    faq: [
      {
        q: 'How much does Amalyzer cost compared to Dragon Refunds?',
        a: 'Amalyzer\'s official site lists one price: 25% of every reimbursement, with no monthly fee and no commitment. (Some third-party directories show old $19–29/month subscription plans, but the live site says 25% commission.) Dragon Refunds is free to audit and self-file — you keep 100% — with optional managed filing at 15%. On a $10,000 recovery that is $7,500 kept with Amalyzer vs $8,500 managed or $10,000 self-filed with Dragon Refunds.',
      },
      {
        q: 'Does Amalyzer have a free or self-file option?',
        a: 'No. Amalyzer is managed-only: their team files and follows up every claim on your behalf, and 25% comes out of every recovery. Dragon Refunds runs the audit free, shows every recoverable claim with a step-by-step SOP to file it yourself via Seller Central, and only charges (15%) if you choose to hand a claim off.',
      },
      {
        q: 'Is Amalyzer still active?',
        a: 'As of 2026 amalyzerpro.com is online and its contact form works, but the public site is sparse and dated — the footer still reads 2018, some pages are broken, and onboarding runs through a contact form rather than self-serve signup. It appears to operate as a high-touch service. If you want to see results before talking to anyone, Dragon Refunds\' free audit shows your recoverable total in about two minutes.',
      },
      {
        q: 'Is Amalyzer the same as AMALYZE?',
        a: 'No — easy to confuse. AMALYZE is a German Amazon keyword-research and analytics tool. Amalyzer (Amalyzer Pro, amalyzerpro.com) is the FBA reimbursement service compared on this page. If you searched for the keyword tool, this comparison is not about that product.',
      },
      {
        q: 'What does Dragon Refunds recover that Amalyzer doesn\'t list?',
        a: 'Amalyzer\'s published scope is inbound lost/damaged inventory, overlooked transaction reimbursements, customer-return tracking, and fee overcharges. Dragon Refunds also covers warehouse-damaged and destroyed inventory and COGS / sourcing-cost errors — where Amazon reimburses lost units below their true sourcing value — a category most reimbursement services skip.',
      },
      {
        q: 'Is Dragon Refunds Amazon-compliant?',
        a: 'Yes. Dragon Refunds connects through Amazon\'s official Selling Partner API (SP-API), read-only by default — no scraping, no gray areas, 100% Amazon Terms of Service compliant. (Amalyzer also states it never automates claim filing; both approaches respect Amazon\'s rules on claims.)',
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
