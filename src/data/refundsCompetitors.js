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
};

export function getRefundsCompetitor(slug) {
  return refundsCompetitors[slug] || null;
}

export function getRefundsCompetitorSlugs() {
  return Object.keys(refundsCompetitors);
}
