/* Post-build: turn the single-page-app build into per-route STATIC HTML.
 *
 * Two jobs, and the second is why this file matters:
 *
 *  1. Give every SPA route a real index.html so GitHub Pages serves it with
 *     HTTP 200 instead of the 404.html fallback (renders fine but returns a
 *     404 status — bad for Google Ads destination checks and SEO).
 *
 *  2. PRERENDER each route's <title>, meta description, canonical, OG tags and
 *     a real content block into #root.
 *
 *     ⚠️ WHY (added 2026-08-04): every route used to be a byte-identical copy
 *     of the same 3.9 KB shell. `/vs/getida/` contained the word "getida" zero
 *     times; the raw HTML held ~270 chars of comments and no content. Google
 *     Ads scored **landing page experience BELOW_AVERAGE on 16 of 18 keywords**,
 *     pinning Quality Scores at 1–3/10, which inflates CPC and suppresses
 *     impressions. Server speed was never the problem (TTFB ~0.4s) — the pages
 *     were empty. Same defect made every URL identical to Google's index.
 *
 *     The injected block is built from the SAME data files the React app
 *     renders from, so this is prerendering, not cloaking. React's
 *     createRoot().render() replaces #root's children on mount, so real users
 *     get the app; crawlers and no-JS clients get the content.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { lpPages } from '../src/data/lpPages.js';
import { competitors } from '../src/data/competitors.js';
import { refundsCompetitors } from '../src/data/refundsCompetitors.js';
import { AUDIT_POINTS_COPY, CLAIM_TYPES_COPY } from '../src/data/refundsCopy.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const srcFile = join(dist, 'index.html');

if (!existsSync(srcFile)) {
  console.error('postbuild: dist/index.html not found — run vite build first');
  process.exit(1);
}
const SHELL = readFileSync(srcFile, 'utf8');
const SITE = 'https://dragonrefunds.com';
const SIGNUP = 'https://app.dragonrefunds.com/sign-up';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const flat = (s = '') => String(s).replace(/\s+/g, ' ').trim();

/* ── Route → { title, description, eyebrow, h1, intro, bullets[], sections[] } ── */
const meta = {};

/* The product copy the main LP renders, from ../src/data/refundsCopy.js — the
 * SAME module LandingV4.jsx reads, so this stays prerendering, not cloaking.
 * Without it the homepage prerendered at 46 crawler-visible words. */
const PRODUCT_SECTIONS = [
  { h: 'What the free audit finds', items: AUDIT_POINTS_COPY.map(p => `${p.title}. ${p.desc}`) },
  { h: 'Reimbursement types we recover', items: CLAIM_TYPES_COPY.map(c => `${c.headline} ${c.blurb}`) },
];

const STATIC = {
  '/':        { title: 'Dragon Refunds — Get Back What Amazon Owes You',
                description: 'Dragon Refunds finds every FBA reimbursement Amazon owes you — lost shipments, damaged inventory, fee overcharges. File the claims yourself and keep 100%, or hand them off for 15%.' },
  '/pricing': { title: 'Pricing — Free Detection, 15% Only If We File | Dragon Refunds',
                description: 'Free forever reimbursement detection. File the claims yourself and keep 100%, or hand them off for 15% — not the 25% most services charge.' },
  '/privacy': { title: 'Privacy Policy | Dragon Refunds', description: 'How Dragon Refunds collects, uses, and protects your data.' },
  '/tos':     { title: 'Terms of Service | Dragon Refunds', description: 'The terms governing your use of Dragon Refunds.' },
  '/support': { title: 'Support | Dragon Refunds', description: 'Help and documentation for Dragon Refunds.' },
};
for (const [path, m] of Object.entries(STATIC)) {
  meta[path] = { ...m, h1: m.title.split(/[—|]/)[0].trim(), intro: m.description };
}
/* '/' and '/pricing' are the main ad destinations — give them the product copy. */
meta['/'].sections = PRODUCT_SECTIONS;
meta['/pricing'].sections = PRODUCT_SECTIONS;

/* Data-driven LP pages (feature / alt templates). */
for (const p of lpPages) {
  const h1 = p.hero?.segments?.map(s => s.text).join(' ') || p.metaTitle || '';
  meta[p.path] = {
    title: p.metaTitle || h1,
    description: p.metaDescription || flat(p.hero?.paragraph),
    eyebrow: p.hero?.eyebrow,
    h1,
    intro: flat(p.hero?.paragraph),
    sections: PRODUCT_SECTIONS,
  };
}

/* Dragon Refunds /vs/ comparison pages.
 *
 * ⚠️ Emit the FULL comparison copy, not just the TL;DR (changed 2026-08-10).
 * These entries already hold ~650 words each — where-they-win, where-we-win,
 * the pricing line, the feature matrix and 5-6 FAQs — and the prerender was
 * emitting ~40 of them. A 46-word page cannot earn a decent landing-page
 * experience score no matter how correct its <title> is; Quality Score sat at
 * 1-3/10 six days after the routes were de-duplicated. Everything below is
 * rendered by VsRefundsCompetitor.jsx from this same object, so it stays
 * prerendering rather than cloaking. */
for (const [slug, c] of Object.entries(refundsCompetitors)) {
  const cell = v => (v === 'yes' ? 'Yes' : v === 'no' ? 'No' : v === 'partial' ? 'Partial' : v?.t || '');
  meta[`/vs/${slug}`] = {
    title: c.metaTitle || `Dragon Refunds vs ${c.name}`,
    description: c.metaDescription || flat(c.subhead),
    eyebrow: c.eyebrow,
    h1: [c.h1?.plain, c.h1?.accent].filter(Boolean).join(' '),
    intro: flat(c.subhead),
    bullets: [c.tldr?.us, c.tldr?.them].filter(Boolean).map(flat),
    sections: [
      ...(c.compare || []).map(s => ({
        h: s.label,
        items: (s.rows || []).map(r =>
          `${r.feature}${r.note ? ` (${r.note})` : ''} — Dragon Refunds: ${cell(r.values?.[0])}; ${c.name}: ${cell(r.values?.[1])}`),
      })),
      { h: `Where ${c.name} wins`, items: (c.themWins || []).map(w => `${w.title}. ${w.desc}`) },
      { h: 'Where Dragon Refunds wins', items: (c.usWins || []).map(w => `${w.title}. ${w.desc}`) },
      { h: 'Pricing', items: [c.commission?.line].filter(Boolean) },
      { h: 'Frequently asked questions', items: (c.faq || []).map(f => `${f.q} ${f.a}`) },
    ].filter(s => s.items.length),
  };
}

/* Inherited DragonBot /vs/ pages (visible only, and never overwrite a refunds one). */
for (const [slug, c] of Object.entries(competitors)) {
  if (c.hidden || meta[`/vs/${slug}`]) continue;
  const name = c.name || slug;
  meta[`/vs/${slug}`] = {
    title: c.metaTitle || `DragonBot vs ${name}`,
    description: c.metaDescription || '',
    h1: c.h1 ? [c.h1.plain, c.h1.accent].filter(Boolean).join(' ') : `DragonBot vs ${name}`,
    intro: flat(c.subhead || c.metaDescription || ''),
    bullets: [c.tldr?.us, c.tldr?.them].filter(Boolean).map(flat),
    /* same full-copy treatment as the refunds /vs/ pages — these entries carry
     * themWins / usWins / faq / comparisonTable too, and emitting only the h1
     * left them at ~65 words. */
    sections: [
      { h: `Where ${name} wins`, items: (c.themWins || []).map(w => flat(`${w.title || ''}. ${w.desc || ''}`)) },
      { h: 'Where DragonBot wins', items: (c.usWins || []).map(w => flat(`${w.title || ''}. ${w.desc || ''}`)) },
      { h: 'Comparison', items: (c.comparisonTable || []).map(r =>
          flat(`${r.feature || r.label || ''} — DragonBot: ${r.us ?? ''}; ${name}: ${r.them ?? ''}`)) },
      { h: 'Frequently asked questions', items: (c.faq || []).map(f => flat(`${f.q || ''} ${f.a || ''}`)) },
    ].filter(s => s.items.filter(i => i.replace(/[—;:.\s]/g, '')).length),
  };
}

/* Support sub-pages + legacy landing versions. */
for (const r of ['/support/getting-started', '/support/billing-credits', '/support/amazon-integration',
                 '/support/security-privacy', '/support/account-management', '/support/feature-requests']) {
  const name = r.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase());
  meta[r] = { title: `${name} | Dragon Refunds Support`, description: `${name} — Dragon Refunds help documentation.`, h1: name, intro: '' };
}
for (const r of ['/v1', '/v2', '/v3', '/chats']) {
  if (!meta[r]) meta[r] = { ...STATIC['/'], h1: 'Dragon Refunds', intro: STATIC['/'].description };
}

/* ── Routes inherited from DragonBotLP ────────────────────────────────
 * This repo shares LandingV4 + lpPages/competitors with DragonBotLP, so it builds a set
 * of DragonBot feature pages and DragonBot-competitor /vs/ pages that are irrelevant on
 * dragonrefunds.com AND near-duplicates of the same paths on getdragonbot.com. Nothing on
 * this site links to them. They are noindexed here and excluded from the sitemap, so the
 * getdragonbot.com originals are the only indexed copy.
 * Refunds-relevant pages (/refunds, /fba-reimbursement-audit, /lost-inventory-reimbursement,
 * and refundsCompetitors /vs/ pages) are deliberately NOT in this list. */
const INHERITED_FROM_DRAGONBOT = [
  /^\/(amazon-|ai-amazon-agent|analytics|inventory|listing-tools|ppc-tools|research-tools|repricer|discontinued)/,
  /^\/vs\/(helium-10|jungle-scout|sellerise|sellerapp|sellerboard|datadive|threecolts|keepa|chatgpt|claude|viktor|openclaw|jarvio|datadoe|profasee|geenie|agentcentral|aakaar|ai-operators|mcp-tools|amalyzer|hawkways)(\/|$)/,
];
const isInherited = r => INHERITED_FROM_DRAGONBOT.some(re => re.test(r));

/* ── Build one route's HTML from the shell ───────────────────────────── */
function buildHtml(route, m) {
  const url = SITE + (route === '/' ? '/' : route + '/');
  const title = m.title || STATIC['/'].title;
  const desc = m.description || STATIC['/'].description;

  const head = [
    `<meta name="description" content="${esc(desc)}" />`,
    isInherited(route) ? `<meta name="robots" content="noindex, follow" />` : '',
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].filter(Boolean).join('\n    ');

  /* Mirrors the copy React renders. Replaced on mount.
   * Keep this SUBSTANTIVE — see the word-count guard at the bottom of this file. */
  const body = [
    m.eyebrow ? `<p>${esc(m.eyebrow)}</p>` : '',
    `<h1>${esc(m.h1 || title)}</h1>`,
    m.intro ? `<p>${esc(m.intro)}</p>` : '',
    Array.isArray(m.bullets) && m.bullets.length
      ? `<ul>${m.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '',
    ...(m.sections || []).map(s =>
      `<h2>${esc(s.h)}</h2>\n        <ul>${s.items.map(i => `<li>${esc(flat(i))}</li>`).join('')}</ul>`),
    `<p><a href="${SIGNUP}">Start free — no card required</a></p>`,
  ].filter(Boolean).join('\n        ');

  let html = SHELL;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>\n    ${head}`);
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><div data-prerender="1" style="max-width:44rem;margin:0 auto;padding:4rem 1.5rem;font-family:system-ui,sans-serif">\n        ${body}\n      </div></div>`
  );
  return html;
}

/* ── Write every route ───────────────────────────────────────────────── */
const routes = [...new Set(['/', ...Object.keys(meta)])];
let n = 0;
for (const route of routes) {
  const m = meta[route];
  if (!m) continue;
  const dir = route === '/' ? dist : join(dist, ...route.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), buildHtml(route, m));
  n++;
}
/* ── Guard: a thin page cannot earn a decent Ads landing-page score ──────
 * 2026-08-10: per-route titles alone left the homepage at 46 crawler-visible
 * words and Quality Score stuck at 2/10. Fail the build rather than ship thin
 * pages again. Raise MIN_WORDS, never lower it to make a build pass. */
const MIN_WORDS = 120;
/* Only ad/SEO destinations are guarded. Support docs, legal pages and the legacy
 * /v1-/v3 mocks are never ad landing pages, so thin copy there costs nothing. */
const EXEMPT = r =>
  r.startsWith('/support') || ['/privacy', '/tos', '/v1', '/v2', '/v3', '/chats'].includes(r);
const thin = [];
for (const route of routes) {
  if (!meta[route] || EXEMPT(route)) continue;
  const dir = route === '/' ? dist : join(dist, ...route.split('/').filter(Boolean));
  const text = readFileSync(join(dir, 'index.html'), 'utf8')
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS) thin.push(`${route} (${words}w)`);
}
if (thin.length) {
  console.error(`postbuild: ${thin.length} route(s) under ${MIN_WORDS} crawler-visible words:\n  ${thin.join('\n  ')}`);
  console.error('Add real copy to a JSX-free data module and emit it here — see src/data/refundsCopy.js');
  process.exit(1);
}
console.log(`postbuild: prerendered ${n} routes (title + description + canonical + OG + content), all >= ${MIN_WORDS} words`);
