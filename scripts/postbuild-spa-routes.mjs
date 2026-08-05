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

/* ── Route → { title, description, eyebrow, h1, intro, bullets[] } ────── */
const meta = {};

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

/* Data-driven LP pages (feature / alt templates). */
for (const p of lpPages) {
  const h1 = p.hero?.segments?.map(s => s.text).join(' ') || p.metaTitle || '';
  meta[p.path] = {
    title: p.metaTitle || h1,
    description: p.metaDescription || flat(p.hero?.paragraph),
    eyebrow: p.hero?.eyebrow,
    h1,
    intro: flat(p.hero?.paragraph),
  };
}

/* Dragon Refunds /vs/ comparison pages. */
for (const [slug, c] of Object.entries(refundsCompetitors)) {
  meta[`/vs/${slug}`] = {
    title: c.metaTitle || `Dragon Refunds vs ${c.name}`,
    description: c.metaDescription || flat(c.subhead),
    eyebrow: c.eyebrow,
    h1: [c.h1?.plain, c.h1?.accent].filter(Boolean).join(' '),
    intro: flat(c.subhead),
    bullets: [c.tldr?.us, c.tldr?.them].filter(Boolean).map(flat),
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

/* ── Build one route's HTML from the shell ───────────────────────────── */
function buildHtml(route, m) {
  const url = SITE + (route === '/' ? '/' : route + '/');
  const title = m.title || STATIC['/'].title;
  const desc = m.description || STATIC['/'].description;

  const head = [
    `<meta name="description" content="${esc(desc)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');

  /* Mirrors the copy React renders. Replaced on mount. */
  const body = [
    m.eyebrow ? `<p>${esc(m.eyebrow)}</p>` : '',
    `<h1>${esc(m.h1 || title)}</h1>`,
    m.intro ? `<p>${esc(m.intro)}</p>` : '',
    Array.isArray(m.bullets) && m.bullets.length
      ? `<ul>${m.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '',
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
console.log(`postbuild: prerendered ${n} routes (title + description + canonical + OG + content)`);
