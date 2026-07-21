/* ═══════════════════════════════════════════════════════════════
   Google Ads landing pages (v2 campaigns).

   Two templates:
     template: 'feature' → rendered by LandingV4 (the main-LP template)
       with a custom hero + "Your <feature> with DragonBot" chat demo.
       Fields: hero.segments [{text, color:'orange'|'white'|'green'}],
               hero.paragraph, demo.feature, demo.script.
     template: 'alt'     → rendered by LpPage (alternative/comparison
       layout with bullets + price-anchor + FAQ).

   Chat demo script messages: { who:'user'|'host', text, tool?:{name,args},
   stats?:[{v,l}] }. KEEP THIS FILE JSX-FREE — it is imported by
   scripts/postbuild-spa-routes.mjs under plain Node.

   Paths must match the ad-group Final URLs in
   DragonBot-marketing/landing_page_map_v2.csv.
   ═══════════════════════════════════════════════════════════════ */



const O = 'orange', W = 'white', G = 'green';

export const lpPages = [
  /* ═══════════════════ C3 — FEATURE PAGES (main-LP template) ═══════════════════ */
  {
    path: '/amazon-ppc',
    template: 'feature',
    metaTitle: 'Amazon PPC. Run by AI. Free Forever | DragonBot',
    metaDescription: 'DragonBot audits your Amazon PPC, cuts wasted spend, and manages bids with AI. Free forever — no percentage of ad spend.',
    hero: {
      segments: [{ text: 'Amazon PPC.', color: O }, { text: 'Run by AI.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'DragonBot audits every campaign, finds the wasted spend, proposes the fixes, and — with your approval — executes them. Unlimited audits, free forever. Never a percentage of your ad spend.',
    },
    demo: {
      feature: 'PPC monitoring',
      script: [
        { who: 'user', text: "How's my PPC doing? Anything bleeding?" },
        { who: 'tool', text: 'Running the `PPC audit` skill for the last `30 days`' },
        { who: 'host', text: 'Found it. 19 keywords are burning spend with zero conversions:', stats: [ { v: '$1,420', l: 'wasted / mo' }, { v: '19', l: 'zero-sale keywords' }, { v: '41%', l: 'current ACoS' }, { v: '28%', l: 'projected ACoS' } ] },
        { who: 'user', text: 'Pause them, and set up a weekly cleanup.' },
        { who: 'tool', text: 'Scheduling a `weekly PPC cleanup`' },
        { who: 'host', text: 'Done. 19 keywords paused (logged in your audit trail). Every Monday 9am I\'ll re-audit, negate new bleeders, and post the summary to Slack — you approve anything non-routine.' },
      ],
    },
  },
  {
    path: '/amazon-seller-software',
    template: 'feature',
    metaTitle: 'All the Amazon Seller Tools You Need, in One. Free Forever | DragonBot',
    metaDescription: 'Replace the tool stack. DragonBot runs PPC, inventory, listings, analytics, and messages with AI — free forever, no credit card.',
    hero: {
      segments: [{ text: 'All of the Amazon seller tools you need', color: O }, { text: 'in one tool.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'Most sellers pay for three or four tools that each do one job. DragonBot is one AI across the whole account — PPC, inventory, listings, analytics, customer messages — free forever.',
    },
    demo: {
      feature: 'Amazon operations',
      script: [
        { who: 'user', text: 'Give me the full picture — sales, ads, inventory. Anything on fire?' },
        { who: 'tool', text: 'Running the `account overview` skill' },
        { who: 'host', text: 'Here\'s your account right now:', stats: [ { v: '$48.2k', l: 'sales (30d, ↑12%)' }, { v: '26%', l: 'ACoS' }, { v: '2 SKUs', l: 'restock needed' }, { v: '1', l: 'suppressed listing' } ] },
        { who: 'user', text: 'Fix the suppressed listing and plan the restocks.' },
        { who: 'tool', text: 'Running `fix suppression` and building a `restock plan`' },
        { who: 'host', text: 'Suppression fixed — image URL 404, re-uploaded, reinstatement submitted. Restock plan drafted: 320 units SKU-A, 180 SKU-B, ship by Friday to avoid stockout. Want this overview every morning at 8?' },
      ],
    },
  },
  {
    path: '/amazon-inventory',
    template: 'feature',
    metaTitle: 'Never Stock Out Again — AI Amazon Inventory. Free Forever | DragonBot',
    metaDescription: 'The only Amazon inventory tool you need. AI demand forecasts and restock alerts from your real sales data — free forever.',
    hero: {
      segments: [{ text: 'Never stock out again.', color: W }, { text: 'The only Amazon inventory tool you need.', color: O }, { text: 'Free forever.', color: G }],
      paragraph: 'DragonBot watches your inventory like a good ops manager — days of cover per SKU, seasonality-aware forecasts, restock flags with your lead times built in. Free forever.',
    },
    demo: {
      feature: 'inventory management',
      script: [
        { who: 'user', text: 'When do I run out of my top sellers?' },
        { who: 'tool', text: 'Running the `inventory forecast` on your `top sellers`' },
        { who: 'host', text: 'Two need attention:', stats: [ { v: '18 days', l: 'Garlic Press — cover left' }, { v: '42 days', l: 'Peeler Set — cover left' }, { v: '320 units', l: 'reorder now (lead time 25d)' }, { v: 'Oct 3', l: 'projected stockout' } ] },
        { who: 'user', text: 'Draft the PO and remind me when the others get close.' },
        { who: 'tool', text: 'Running `draft PO` and turning on `inventory watch`' },
        { who: 'host', text: 'PO drafted for 320 units — in your Slack for approval. I\'m watching every SKU daily; you\'ll get a flag whenever cover drops below lead time + 2 weeks.' },
      ],
    },
  },
  {
    path: '/amazon-listing-optimization',
    template: 'feature',
    metaTitle: 'Amazon Listing Optimization. Run by AI. Free Forever | DragonBot',
    metaDescription: 'DragonBot optimizes titles, bullets, and keywords from your real search-term and conversion data — free forever.',
    hero: {
      segments: [{ text: 'Amazon listing optimization.', color: O }, { text: 'Run by AI.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'Generic AI writes plausible copy. DragonBot writes copy aimed at the search terms you actually win — grounded in your real query, click, and conversion data. Free forever.',
    },
    demo: {
      feature: 'listing optimization',
      script: [
        { who: 'user', text: 'Why is my garlic press getting clicks but no sales?' },
        { who: 'tool', text: 'Running the `listing diagnosis` on `B001CUWUO7`' },
        { who: 'host', text: 'Three findings:', stats: [ { v: '+12%', l: 'priced above market' }, { v: '9', l: 'high-value keywords missing' }, { v: '2.1%', l: 'CVR (niche avg 4.3%)' }, { v: '#4 image', l: 'weakest vs competitors' } ] },
        { who: 'user', text: 'Rewrite the title and bullets with those keywords.' },
        { who: 'tool', text: 'Running the `listing rewrite` on `B001CUWUO7`' },
        { who: 'host', text: 'Draft ready — title now covers all 9 missing terms, bullets lead with the benefits your reviews actually praise. Approve in Slack and I\'ll push it live with full rollback.' },
      ],
    },
  },
  {
    path: '/amazon-listing-generator',
    template: 'feature',
    metaTitle: 'Amazon Listing Generation. Run by AI. Free Forever | DragonBot',
    metaDescription: 'Generate Amazon titles, bullets, and descriptions with AI grounded in real search data — free forever with a DragonBot account.',
    hero: {
      segments: [{ text: 'Amazon listing generation.', color: O }, { text: 'Run by AI.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'Free-floating generators write from vibes. DragonBot generates titles, bullets, and descriptions from real Amazon search data — the queries your niche actually types. Free forever.',
    },
    demo: {
      feature: 'listing generation',
      script: [
        { who: 'user', text: 'Write a full listing for my new bamboo cutting board — 3-piece set, juice grooves.' },
        { who: 'tool', text: 'Running the `listing generator` for a `bamboo cutting board`' },
        { who: 'host', text: 'Generated from real demand data:', stats: [ { v: '1,240', l: 'queries analyzed' }, { v: '184 chars', l: 'title (fully indexed)' }, { v: '5', l: 'benefit-led bullets' }, { v: '38', l: 'backend keywords' } ] },
        { who: 'user', text: 'Make the second bullet about easy cleanup and add "knife-friendly".' },
        { who: 'host', text: 'Updated. Bullet 2 now leads with one-rinse cleanup, "knife-friendly" worked into the title and bullet 4 — it has 2.9k monthly searches in this niche. Want the A+ content brief too?' },
      ],
    },
  },
  {
    path: '/amazon-profit-analytics',
    template: 'feature',
    metaTitle: 'Amazon Profit Analytics. Know Your Real Margin. Free Forever | DragonBot',
    metaDescription: 'See your real Amazon profit after every fee, ad, and cost. Per-SKU P&L, scheduled reports, margin alerts — free forever.',
    hero: {
      segments: [{ text: 'Amazon profit analytics.', color: O }, { text: 'Know your real margin.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'Seller Central shows revenue. DragonBot shows what you kept — after referral fees, FBA fees, storage, refunds, ads, and your COGS — per SKU, per day. Free forever.',
    },
    demo: {
      feature: 'profit analytics',
      script: [
        { who: 'user', text: 'What was my real profit last month?' },
        { who: 'tool', text: 'Running the `profit and loss` skill for `last month`' },
        { who: 'host', text: 'After everything:', stats: [ { v: '$52.4k', l: 'revenue' }, { v: '−$18.1k', l: 'Amazon fees' }, { v: '−$6.2k', l: 'ad spend' }, { v: '$9.8k', l: 'net profit (18.7%)' } ] },
        { who: 'user', text: 'Which SKU dropped the most, and why?' },
        { who: 'tool', text: 'Running the `margin drivers` analysis, `month over month`' },
        { who: 'host', text: 'Garlic Press: margin fell 23% → 16%. Two causes: FBA fee tier change on June 1 (+$0.42/unit) and ad spend creep (+$380 on a broad campaign). Fix the campaign and you recover ~4 points. Want the P&L in Slack every Monday?' },
      ],
    },
  },
  {
    path: '/amazon-fba-calculator',
    template: 'feature',
    metaTitle: 'Amazon FBA Calculator — Real Fees, Real Profit. Free Forever | DragonBot',
    metaDescription: 'Skip the calculator — DragonBot computes actual FBA fees and true per-unit profit from your account, free forever.',
    hero: {
      segments: [{ text: 'Skip the FBA calculator.', color: O }, { text: 'Know your real number.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'Calculators make you type in guesses. DragonBot computes actual profitability — real fees, real ad costs, real returns — per SKU, continuously. Free forever.',
    },
    demo: {
      feature: 'FBA economics',
      script: [
        { who: 'user', text: 'If I sell the cutting board at $24.99, what do I actually keep?' },
        { who: 'tool', text: 'Running the `unit economics` skill at `$24.99`' },
        { who: 'host', text: 'Per unit, with your actual fees:', stats: [ { v: '−$3.75', l: 'referral fee (15%)' }, { v: '−$5.86', l: 'FBA fulfillment' }, { v: '−$0.42', l: 'storage (avg)' }, { v: '$6.71', l: 'net / unit (26.8%)' } ] },
        { who: 'user', text: 'And at $22.99 if volume goes up 15%?' },
        { who: 'host', text: 'Modeled: $5.21/unit margin × 1.15 volume ≈ 11% less total profit — the price cut doesn\'t pay for itself unless volume rises 29%+. I\'d test the higher price with better images first (your #4 image underperforms).' },
      ],
    },
  },
  {
    path: '/ai-amazon-agent',
    template: 'feature',
    metaTitle: 'An AI Agent That Runs Your Amazon Account. Free Forever | DragonBot',
    metaDescription: 'DragonBot is an AI agent for Amazon sellers: PPC, inventory, listings, messages — free forever, actions at a flat $50/mo.',
    hero: {
      segments: [{ text: 'An AI agent that runs your Amazon account.', color: O }, { text: 'Free forever.', color: G }],
      paragraph: 'Not a dashboard. Not a chatbot with opinions. DragonBot connects to Seller Central and Amazon Ads through the official APIs and works your account — supervised or autonomous, with a full audit trail.',
    },
    demo: {
      feature: 'AI employee',
      script: [
        { who: 'user', text: "You're my new Amazon employee. What needs doing today?" },
        { who: 'tool', text: 'Running your `daily review`' },
        { who: 'host', text: 'Three things need attention:', stats: [ { v: '$47/day', l: 'bleeding keyword found' }, { v: '11 days', l: 'cover left on top SKU' }, { v: '2', l: 'buyer messages waiting' }, { v: '1', l: 'new negative review' } ] },
        { who: 'user', text: 'Handle all of it. Ask me before anything irreversible.' },
        { who: 'tool', text: 'Executing everything in `supervised mode`' },
        { who: 'host', text: 'Keyword paused ✓. Restock PO drafted → your approval. Both buyer replies drafted from your policies → your approval. Review response suggested. Everything logged — check the audit trail anytime.' },
      ],
    },
  },
  {
    path: '/amazon-mcp',
    template: 'feature',
    metaTitle: 'Free Amazon MCP Server — Your Account in Claude. Free Forever | DragonBot',
    metaDescription: 'Connect Claude, ChatGPT, or Cursor to your Amazon seller account with DragonBot\'s free MCP server. Free forever.',
    hero: {
      segments: [{ text: 'Your Amazon account, in Claude.', color: O }, { text: 'Or ChatGPT. Or Cursor.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'DragonBot\'s MCP server connects Seller Central and Amazon Ads to any MCP client — clean, always-fresh, ETL\'d data and guardrailed write actions. Free forever.',
    },
    demo: {
      feature: 'Amazon MCP',
      script: [
        { who: 'user', text: 'What can you see now that DragonBot is connected?' },
        { who: 'tool', text: 'Listing the `tools` I expose' },
        { who: 'host', text: 'Full access, sub-second reads:', stats: [ { v: 'Orders', l: '+ sales & refunds' }, { v: 'Ads', l: 'campaigns & search terms' }, { v: 'Inventory', l: '+ fees & finance' }, { v: 'Listings', l: '+ reviews & messages' } ] },
        { who: 'user', text: 'Pull last week\'s orders by SKU and flag anything with refund rate over 5%.' },
        { who: 'tool', text: 'Querying your `orders` from the last `7 days`, flagging `refund rate over 5%`' },
        { who: 'host', text: '312 orders across 14 SKUs. One flag: Peeler Set at 7.1% refunds (9 of 126) — reason codes say "handle broke". Worth a supplier QC check before your next PO. Want me to watch this weekly?' },
      ],
    },
  },
  {
    path: '/amazon-repricer',
    template: 'feature',
    metaTitle: 'Amazon Repricing. Run by AI. Free Forever | DragonBot',
    metaDescription: 'AI Amazon repricing with margin guardrails — win the Buy Box without racing to the bottom. Free forever.',
    hero: {
      segments: [{ text: 'Amazon repricing.', color: O }, { text: 'Run by AI.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'Repricers charge $25 to $800 a month. DragonBot reprices with margin guardrails — it knows your true break-even after every fee, so it never wins the Buy Box at a loss. Free forever.',
    },
    demo: {
      feature: 'Amazon repricing',
      script: [
        { who: 'user', text: 'Reprice my catalog to win the Buy Box — but never below 15% margin.' },
        { who: 'tool', text: 'Setting up the `repricer` with a `15% margin floor`' },
        { who: 'host', text: 'Configured:', stats: [ { v: '84', l: 'SKUs monitored' }, { v: '15%', l: 'margin floor (after ALL fees)' }, { v: '12', l: 'price moves proposed' }, { v: '3', l: 'held — floor would break' } ] },
        { who: 'user', text: 'What did you change today?' },
        { who: 'host', text: 'Three moves: Garlic Press $26.99→$25.49 (competitor restocked, Buy Box recovered), Peeler Set $18.99→$19.49 (no competition, margin up), Cutting Board held — the only path to the Buy Box was below your floor. Every move is in the audit trail.' },
      ],
    },
  },
  {
    path: '/amazon-review-automation',
    template: 'feature',
    metaTitle: 'Amazon Review Automation — Every Order, Every Account. Free Forever | DragonBot',
    metaDescription: 'Automate compliant Amazon review requests across all your accounts, with a summary in your inbox. Free forever.',
    hero: {
      segments: [{ text: 'Amazon review automation.', color: O }, { text: 'Every order. Every account.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'DragonBot fires Amazon\'s official Request-a-Review on every eligible order across all your accounts, and reports back on a schedule. 100% TOS-compliant. Free forever.',
    },
    demo: {
      feature: 'review automation',
      script: [
        { who: 'user', text: 'Send review requests for all eligible orders across all my accounts, and email me a weekly summary.' },
        { who: 'tool', text: 'Setting up `review automation` across `all accounts`, with a `weekly email summary`' },
        { who: 'host', text: 'Live across your whole surface:', stats: [ { v: '3', l: 'accounts connected' }, { v: '412', l: 'eligible orders this week' }, { v: 'Day 8', l: 'optimal request timing' }, { v: 'Mondays', l: 'summary → your inbox' } ] },
        { who: 'user', text: 'Skip any order with an open complaint or return.' },
        { who: 'host', text: 'Already the default — orders with open buyer messages, returns, or refunds are excluded automatically. First summary lands Monday: requests sent, reviews received, and rating movement per account.' },
      ],
    },
  },
  {
    path: '/amazon-reimbursement',
    template: 'feature',
    metaTitle: 'Amazon FBA Reimbursements — Found by AI. Free Forever | DragonBot',
    metaDescription: 'DragonBot tracks every shipment and fee across your regions and flags what Amazon owes you — lost inventory, damaged units, overcharges. File free with a step-by-step SOP and keep 100%, or let us file for 25%.',
    hero: {
      segments: [{ text: 'Amazon FBA reimbursements.', color: O }, { text: 'Every lost dollar, found.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'DragonBot watches every shipment, fee, and unit across your regions and programs — FBA and AWD, US, Canada, EU — and flags what Amazon owes you the moment it\'s recoverable: lost inventory, damaged units, short-received shipments, fee overcharges. File it yourself with a step-by-step SOP and keep 100%, or hand it off and we file for 25% of what we recover. Detection is free forever.',
    },
    demo: { type: 'dashboard', feature: 'Amazon reimbursements' },
  },
  {
    path: '/amazon-product-research',
    template: 'feature',
    metaTitle: 'Amazon Product Research. Real Data. Free Forever | DragonBot',
    metaDescription: 'Research products and niches with AI grounded in real Amazon data — no $129/mo research suite. Free forever.',
    hero: {
      segments: [{ text: 'Amazon product research.', color: O }, { text: 'Without the $129/mo suite.', color: W }, { text: 'Free forever.', color: G }],
      paragraph: 'DragonBot researches niches and products in conversation — market structure, competition, differentiation gaps — grounded in real Amazon data. Free forever.',
    },
    demo: {
      feature: 'product research',
      script: [
        { who: 'user', text: 'Is the "silicone baking mat" niche winnable at my budget?' },
        { who: 'tool', text: 'Running the `niche scan` for `silicone baking mat`' },
        { who: 'host', text: 'The honest picture:', stats: [ { v: '$18–24', l: 'winning price band' }, { v: '4,200+', l: 'reviews on top 3 (moat)' }, { v: '2', l: 'top-10 spots under 500 reviews' }, { v: '$12k+', l: 'est. launch ad budget' } ] },
        { who: 'user', text: 'Where\'s the differentiation gap?' },
        { who: 'host', text: 'Review mining shows two: mats that stay flat in storage (top complaint, 340 mentions) and true half-sheet sizing for EU ovens. Nobody in the top 10 owns either. That\'s your wedge if you go in.' },
      ],
    },
  },

  /* ═══════════ C1 clusters + C2 — ALTERNATIVE pages (feature template,
     switch-from-a-paid-tool angle: same outline as C3, demos framed as
     replacing the incumbent) ═══════════ */
  {
    path: '/vs/ai-operators',
    template: 'feature',
    metaTitle: 'The AI Amazon Operator. Others Charge $49–$698/mo. Free Forever | DragonBot',
    metaDescription: 'Every AI operator for Amazon sellers charges $49–$698/mo. DragonBot does the job free forever.',
    hero: {
      segments: [{ text: 'The AI Amazon operator.', color: 'orange' }, { text: 'Others charge $49–$698/mo.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'The "AI that runs your Amazon account" category is exploding — and every player prices it $49 to $698+ a month, metered by credits or usage tiers. DragonBot gives you unlimited AI access to your account free forever, with a flat $50/mo when you want it taking actions.',
    },
    demo: {
      feature: 'AI operator',
      script: [
        { who: 'user', text: "I'm comparing AI agents for my Amazon business. What do you actually handle?" },
        { who: 'tool', text: 'Listing every `skill` I can run' },
        { who: 'host', text: 'The whole account, one agent:', stats: [ { v: 'PPC', l: 'audits, bids, negations' }, { v: 'Inventory', l: 'forecasts & restocks' }, { v: 'Listings', l: 'optimization & edits' }, { v: 'Messages', l: 'triage & replies' } ] },
        { who: 'user', text: 'And what does it cost as I scale?' },
        { who: 'host', text: 'The same. Unlimited reads free forever — no credits to burn, no usage tiers. Actions are one flat $50/mo whether you do 100 orders or 100,000. Your growth is not a pricing event.' },
      ],
    },
  },
  {
    path: '/vs/mcp-tools',
    template: 'feature',
    metaTitle: 'Amazon MCP for Claude. Others Charge Rent. Free Forever | DragonBot',
    metaDescription: 'Paid Amazon MCPs charge $39–$397/mo to connect your seller account to Claude. DragonBot\'s Amazon MCP is free forever.',
    hero: {
      segments: [{ text: 'Amazon MCP for Claude.', color: 'orange' }, { text: 'Others charge rent.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Connecting Seller Central and Ads to Claude or ChatGPT shouldn\'t cost $39–$397 a month. DragonBot\'s Amazon MCP is free forever — clean ETL\'d data, guardrailed write actions, and Slack on top.',
    },
    demo: {
      feature: 'Amazon MCP',
      script: [
        { who: 'user', text: 'Other Amazon MCPs charge $39–$397/mo. What\'s the catch here?' },
        { who: 'tool', text: 'Listing the `tools` I expose' },
        { who: 'host', text: 'Everything, sub-second, free:', stats: [ { v: 'Orders', l: '+ sales & refunds' }, { v: 'Ads', l: 'campaigns & search terms' }, { v: 'Inventory', l: '+ fees & finance' }, { v: 'Listings', l: '+ reviews & messages' } ] },
        { who: 'user', text: 'Can it write, or read-only like the cheap ones?' },
        { who: 'host', text: 'Both. Reads are unlimited and free forever. Writes — bids, campaigns, listings, refunds — come with approval gates and a full audit trail on the flat $50/mo action plan. No per-order tiers, no per-profile add-on fees.' },
      ],
    },
  },
  {
    path: '/research-tools',
    template: 'feature',
    metaTitle: 'Amazon Research Tools, Replaced by One AI. Free Forever | DragonBot',
    metaDescription: 'Keyword and product research tools charge $49–$279/mo. DragonBot delivers finished research from real Amazon data — free forever.',
    hero: {
      segments: [{ text: 'Amazon research tools.', color: 'orange' }, { text: 'Replaced by one AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Research suites charge $49–$279/mo for dashboards and make you do the digging. DragonBot pulls your real Amazon data — Search Query Performance, Brand Analytics, search terms — and hands you finished research. Free forever.',
    },
    demo: {
      feature: 'keyword research',
      script: [
        { who: 'user', text: "I'm dropping my $129/mo research suite. Can you cover keyword research? Here are 3 competitor ASINs." },
        { who: 'tool', text: 'Running the `keyword harvest` on `3 competitor ASINs`' },
        { who: 'host', text: 'Finished sheet, not a raw export:', stats: [ { v: '847', l: 'keywords pulled' }, { v: '31', l: 'high-value roots' }, { v: '112', l: 'negatives identified' }, { v: '1', l: 'PPC-ready Google Sheet' } ] },
        { who: 'user', text: 'Refresh this every week and flag new terms competitors start ranking for.' },
        { who: 'host', text: 'Scheduled — every Monday, refreshed harvest with a "new this week" section, posted to Slack. Your suite charged $129/mo for the raw data. This is free, and it\'s finished work.' },
      ],
    },
  },
  {
    path: '/analytics',
    template: 'feature',
    metaTitle: 'Amazon Analytics Tools, Replaced by One AI. Free Forever | DragonBot',
    metaDescription: 'Profit dashboards charge $20–$100/mo. DragonBot tracks your real profit — every fee, ad, and cost — free forever.',
    hero: {
      segments: [{ text: 'Amazon analytics tools.', color: 'orange' }, { text: 'Replaced by one AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Profit dashboards charge $20–$100/mo for numbers that come from your own account. DragonBot computes true profit — after every Amazon fee, ad dollar, and cost — and delivers it on schedule, in Slack. Free forever.',
    },
    demo: {
      feature: 'profit analytics',
      script: [
        { who: 'user', text: 'My dashboard tool charges $29/mo to show me my own profit. Show me yours.' },
        { who: 'tool', text: 'Running the `profit and loss` skill for `this month`' },
        { who: 'host', text: 'After every fee, ad, and cost:', stats: [ { v: '$41.7k', l: 'revenue (MTD)' }, { v: '−$14.6k', l: 'Amazon fees' }, { v: '−$5.1k', l: 'ad spend' }, { v: '$8.2k', l: 'net profit (19.6%)' } ] },
        { who: 'user', text: 'Why is that 2 points below last month?' },
        { who: 'host', text: 'Two drivers: a June FBA fee change (+$0.42/unit on your top SKU) and $380 of ad-spend creep on one broad campaign. A dashboard shows you the dip — I just told you why, and I can fix the campaign half if you approve.' },
      ],
    },
  },
  {
    path: '/ppc-tools',
    template: 'feature',
    metaTitle: 'Amazon PPC Tools, Replaced by One AI. Free Forever | DragonBot',
    metaDescription: 'Amazon PPC software charges $78–$799/mo. DragonBot audits and manages your ads with AI — free forever.',
    hero: {
      segments: [{ text: 'Amazon PPC tools.', color: 'orange' }, { text: 'Replaced by one AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Bid-management software charges $78–$799 a month — often a percentage of your ad spend. DragonBot audits your campaigns, finds the waste, and manages the fixes. Free forever, never a % of spend.',
    },
    demo: {
      feature: 'PPC management',
      script: [
        { who: 'user', text: 'My PPC tool costs $249/mo. What would you do differently?' },
        { who: 'tool', text: 'Running the `PPC audit` skill for the last `30 days`' },
        { who: 'host', text: 'Same job, different bill:', stats: [ { v: '$1,180', l: 'wasted spend found' }, { v: '16', l: 'negations proposed' }, { v: '38% → 27%', l: 'projected ACoS' }, { v: '$0', l: 'what this audit cost' } ] },
        { who: 'user', text: 'Take over the weekly management.' },
        { who: 'host', text: 'Done — every Monday: audit, negations, bid rebalancing, all posted to Slack for approval. You keep the $249/mo. When you want fully hands-off execution, that\'s the flat $50/mo action plan.' },
      ],
    },
  },
  {
    path: '/repricer',
    template: 'feature',
    metaTitle: 'Amazon Repricers, Replaced by One AI. Free Forever | DragonBot',
    metaDescription: 'Repricers charge $25–$800/mo. DragonBot reprices with margin guardrails — free forever.',
    hero: {
      segments: [{ text: 'Amazon repricers.', color: 'orange' }, { text: 'Replaced by one AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Rule-based repricers race you to the bottom and bill $25–$800/mo for it. DragonBot reprices with margin guardrails — it knows your true break-even after every fee, so it never wins the Buy Box at a loss. Free forever.',
    },
    demo: {
      feature: 'Amazon repricing',
      script: [
        { who: 'user', text: 'I pay $250/mo for a repricer. Can you replace it — without ever pricing below 15% margin?' },
        { who: 'tool', text: 'Setting up the `repricer` with a `15% margin floor`' },
        { who: 'host', text: 'Configured:', stats: [ { v: '84', l: 'SKUs monitored' }, { v: '15%', l: 'margin floor (after ALL fees)' }, { v: '12', l: 'price moves proposed' }, { v: '$250/mo', l: 'what you just saved' } ] },
        { who: 'user', text: 'What did you change today?' },
        { who: 'host', text: 'Three moves: Garlic Press down $1.50 (competitor restocked — Buy Box recovered), Peeler Set up $0.50 (no competition, free margin), Cutting Board held — the only path to the Buy Box was below your floor. Your old repricer would have taken that loss.' },
      ],
    },
  },
  {
    path: '/inventory',
    template: 'feature',
    metaTitle: 'Amazon Inventory Tools, Replaced by One AI. Free Forever | DragonBot',
    metaDescription: 'Restock and forecasting tools charge $97–$399/mo. DragonBot forecasts demand and flags restocks with AI — free forever.',
    hero: {
      segments: [{ text: 'Amazon inventory tools.', color: 'orange' }, { text: 'Replaced by one AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Inventory software bills $97–$399/mo to watch your own stock levels. DragonBot forecasts demand from your real sales velocity, flags restocks before you run dry, and answers every inventory question. Free forever.',
    },
    demo: {
      feature: 'inventory management',
      script: [
        { who: 'user', text: "I'm replacing my $97/mo restock tool. What needs reordering?" },
        { who: 'tool', text: 'Running the `inventory forecast` across `all SKUs`' },
        { who: 'host', text: 'Two need action:', stats: [ { v: '18 days', l: 'Garlic Press — cover left' }, { v: '320 units', l: 'reorder now (25d lead)' }, { v: '42 days', l: 'Peeler Set — safe' }, { v: 'Oct 3', l: 'projected stockout if idle' } ] },
        { who: 'user', text: 'Draft the PO and watch everything going forward.' },
        { who: 'host', text: 'PO drafted → your Slack for approval. I watch every SKU daily and flag when cover drops below lead time + 2 weeks — including seasonality. Your old tool did this for $1,164/yr. This is free.' },
      ],
    },
  },
  {
    path: '/listing-tools',
    template: 'feature',
    metaTitle: 'Amazon Listing Tools, Replaced by One AI. Free Forever | DragonBot',
    metaDescription: 'Listing optimization tools charge $29–$165/mo. DragonBot optimizes from your real search data — free forever.',
    hero: {
      segments: [{ text: 'Amazon listing tools.', color: 'orange' }, { text: 'Replaced by one AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Listing software sells AI copy and keyword scores for $29–$165/mo. DragonBot optimizes from your real search-term and conversion data — and on the action plan, applies the edits too. Free forever.',
    },
    demo: {
      feature: 'listing optimization',
      script: [
        { who: 'user', text: 'Before I cancel my listing tool — audit my whole catalog.' },
        { who: 'tool', text: 'Running the `catalog audit` across every listing' },
        { who: 'host', text: 'Across 14 listings:', stats: [ { v: '61', l: 'high-value keywords missing' }, { v: '4', l: 'listings below niche CVR' }, { v: '2', l: 'weak main images flagged' }, { v: '#1', l: 'worst offender: Garlic Press' } ] },
        { who: 'user', text: 'Rewrite the worst one first.' },
        { who: 'host', text: 'Draft ready — title covers all 9 missing terms, bullets lead with what your reviews actually praise. Approve and I\'ll push it live with rollback. Then I\'ll work down the list, one approval at a time.' },
      ],
    },
  },
  {
    path: '/amazon-customer-service',
    template: 'feature',
    metaTitle: 'Amazon Customer Service. Run by AI. Free Forever | DragonBot',
    metaDescription: 'DragonBot reads and answers your Amazon buyer messages — triaged, drafted from your policies, approved in one click. Free forever.',
    hero: {
      segments: [{ text: 'Amazon customer service.', color: 'orange' }, { text: 'Run by AI.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'DragonBot reads every buyer message, drafts an on-policy reply, and stages refunds or escalations — across all your accounts, waiting for your one-click approval. Never miss a message again. Free forever.',
    },
    demo: {
      feature: 'customer support',
      script: [
        { who: 'user', text: 'Any buyer messages that need me?' },
        { who: 'tool', text: 'Checking `buyer messages` against your `return policy`' },
        { who: 'host',
          text: '9 messages — I can clear 8 routine ones. This one needs your call:',
          quote: {
            order: '#112-4839201-7756812',
            product: 'Garlic Press Premium Case — 3-Pack',
            body: 'I received my order today but one of the three cases was cracked. I\'d like a refund.',
          },
          note: 'Your return policy: damaged items get a full refund, no return required.',
          draft: 'Hi Rachel, so sorry about that! I\'ve issued a full refund of $29.99 — no need to send the damaged item back. 🙏',
          ask: 'Send this reply and process the $29.99 refund?' },
        { who: 'user', text: 'Yes — send it.' },
        { who: 'tool', text: 'Sending the reply and processing the `$29.99 refund`' },
        { who: 'host', text: 'Done ✅ — and the other 8 replies are drafted for your one-click approval.',
          links: ['📩 Reply sent to Rachel on Amazon', '💰 $29.99 refunded · logged in your audit trail'] },
        { who: 'user', text: 'Auto-handle damaged-item refunds under $30 from now on.' },
        { who: 'host', text: 'Set — damaged-item refunds under $30 now process autonomously with a policy-cited reply. Anything above $30, or outside policy, still comes to you first.' },
      ],
    },
  },
  {
    path: '/reimbursement',
    template: 'feature',
    metaTitle: 'FBA Reimbursement Services, Replaced by One Free Dashboard | DragonBot',
    metaDescription: 'Reimbursement services take 25% — even on claims you could file yourself. DragonBot finds every recoverable dollar free and hands you the SOP to keep 100%, or files for 25% only if you choose.',
    hero: {
      segments: [{ text: 'FBA reimbursement services.', color: 'orange' }, { text: 'Keep 100% instead.', color: 'white' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Reimbursement services take 10–25% of every dollar — even the claims you could file in minutes yourself. DragonBot finds every recoverable shipment, fee, and lost unit for free, and hands you a step-by-step SOP to file and keep 100%. Prefer hands-off? We\'ll file for 25% of what we recover — your call, case by case.',
    },
    demo: { type: 'dashboard', feature: 'Amazon reimbursements' },
  },
  {
    path: '/refunds',
    template: 'feature',
    metaTitle: 'FBA Reimbursements, Fully Transparent — DIY Free or 15% | Dragon Refunds',
    metaDescription: 'FBA reimbursements, made transparent. See exactly where Amazon owes you — lost shipments, damaged inventory, dimension mismatches, COGS errors — and the one action to recover it. DIY free and keep 100%, or hand it off for 15%, not the 25% competitors charge.',
    hero: {
      eyebrow: 'Amazon FBA reimbursements',
      segments: [{ text: 'See where Amazon owes you money.', color: 'orange' }, { text: 'DIY for free, or done-for-you for 15%.', color: 'green' }],
      paragraph: 'Every other reimbursement service hands you a number, takes 25%, and asks you to trust it. Dragon Refunds shows you every place Amazon quietly keeps your money — from lost shipments to COGS errors — and the exact action to recover each one.\n\nDo it yourself in minutes and keep 100%, or hand it off for 15% (not the 25% competitors charge).',
    },
    demo: { type: 'dashboard2', feature: 'Amazon reimbursements' },
  },
  {
    path: '/discontinued',
    template: 'feature',
    metaTitle: 'Your Amazon Tool Shut Down? Meet Your Free Replacement. Free Forever | DragonBot',
    metaDescription: 'Viral Launch, Sellics, Fetcher, and more have shut down. Replace your discontinued Amazon tool with one free AI.',
    hero: {
      segments: [{ text: 'Your tool shut down.', color: 'white' }, { text: 'Meet your free replacement.', color: 'orange' }, { text: 'Free forever.', color: 'green' }],
      paragraph: 'Viral Launch closed. Sellics dissolved. Fetcher, Splitly, Sellzone, Quantify Ninja — gone or absorbed into bundles you didn\'t ask for. DragonBot replaces the job they did — research, analytics, PPC, alerts — with one AI that\'s free forever.',
    },
    demo: {
      feature: 'tool migration',
      script: [
        { who: 'user', text: 'Viral Launch shut down on me. Can you take over what it did?' },
        { who: 'tool', text: 'Mapping `Viral Launch` features to my `skills`' },
        { who: 'host', text: 'Covered, plus what it never did:', stats: [ { v: 'Research', l: 'keywords & competitors ✓' }, { v: 'Tracking', l: 'rank & listing alerts ✓' }, { v: 'PPC', l: 'audits & management ✓' }, { v: 'Messages', l: 'buyer replies (they never did)' } ] },
        { who: 'user', text: 'Do I lose my historical data?' },
        { who: 'host', text: 'No — Amazon has your history, not the dead tool. Connect via the official API and your sales, ads, and search-term history is all here. This is also the last migration you\'ll do because a subscription died: free forever.' },
      ],
    },
  },
];

export function getLpPage(path) {
  return lpPages.find(p => p.path === path) || null;
}
