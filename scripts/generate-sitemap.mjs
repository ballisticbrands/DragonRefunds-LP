/* Post-build step 3: emit dist/sitemap.xml from the routes that were actually
 * built.
 *
 * ── Why generated, never hand-written ────────────────────────────────────
 * A static public/sitemap.xml goes stale the moment someone adds an entry to
 * src/data/lpPages.js or src/data/refundsCompetitors.js. This script derives
 * the URL list from the SAME source scripts/prerender.mjs uses — every
 * directory under dist/ that holds an index.html — so the sitemap and the
 * prerender cannot drift apart. Adding a route to lpPages.js is enough;
 * nothing here changes.
 *
 * Runs LAST in `npm run build`, after postbuild-spa-routes.mjs has created the
 * per-route directories and prerender.mjs has filled them in.
 *
 * ── Conventions ──────────────────────────────────────────────────────────
 * • URLs carry a trailing slash, matching the <link rel="canonical"> that
 *   postbuild-spa-routes.mjs writes (SITE + route + '/'). A sitemap URL that
 *   disagrees with the page's own canonical is a wasted crawl.
 * • lastmod is the build date. These are marketing pages redeployed on every
 *   content change, so build date is the honest signal.
 * • Nothing here invents URLs: if it isn't in dist/, it isn't in the sitemap.
 */
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://dragonrefunds.com';

if (!existsSync(dist)) {
  console.error('generate-sitemap: dist/ not found — run vite build first');
  process.exit(1);
}

/* Identical walk to prerender.mjs's builtRoutes(): every dist directory that
 * contains an index.html is a real, statically served route. */
function builtRoutes() {
  const out = [];
  const walk = (dir, prefix = '') => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name), `${prefix}/${e.name}`);
      else if (e.name === 'index.html') out.push(prefix === '' ? '/' : prefix + '/');
    }
  };
  walk(dist);
  return out;
}

/* Routes that exist but must not be submitted for indexing.
 *  • app / auth / admin surfaces — the product lives on app.dragonrefunds.com,
 *    but keep the guard so a future in-repo route can't leak in.
 *  • /v1 /v2 /v3 — retained design iterations of the homepage.
 *  • /refunds — on THIS domain App.jsx renders the same refunds LP at "/" and
 *    at /refunds (see the refundsPage constant). Submitting both asks Google to
 *    index the same page twice. The route stays live so inherited links keep
 *    resolving; it just isn't advertised. */
const EXCLUDE = [
  /^\/(app|auth|login|signin|sign-up|signup|admin|dashboard|account|api)(\/|$)/,
  /^\/v[123]\/$/,
  /^\/refunds\/$/,
  /* Inherited from DragonBotLP — irrelevant on this domain and near-duplicates of the same
   * paths on getdragonbot.com. Also noindexed in postbuild-spa-routes.mjs. Keep the two
   * lists in sync. Refunds-relevant pages are deliberately NOT excluded. */
  /^\/(amazon-|ai-amazon-agent|analytics|inventory|listing-tools|ppc-tools|research-tools|repricer|discontinued)/,
  /^\/vs\/(helium-10|jungle-scout|sellerise|sellerapp|sellerboard|datadive|threecolts|keepa|chatgpt|claude|viktor|openclaw|jarvio|datadoe|profasee|geenie|agentcentral|aakaar|ai-operators|mcp-tools|amalyzer|hawkways)(\/|$)/,
];

/* Crawl priority. Relative weights only — Google largely ignores these, but
 * Bing and several smaller crawlers still read them, and they cost nothing. */
function priority(route) {
  if (route === '/') return '1.0';
  if (route === '/pricing/') return '0.9';
  if (route.startsWith('/vs/')) return '0.7';
  if (route.startsWith('/support/')) return '0.5';
  if (route === '/privacy/' || route === '/tos/') return '0.3';
  return '0.8';
}

const routes = builtRoutes()
  .filter(r => !EXCLUDE.some(re => re.test(r)))
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const lastmod = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(r =>
    `  <url><loc>${SITE}${r}</loc><lastmod>${lastmod}</lastmod>` +
    `<priority>${priority(r)}</priority></url>`),
  '</urlset>',
  '',
].join('\n');

writeFileSync(join(dist, 'sitemap.xml'), xml);

/* A sitemap with a handful of URLs means the route walk broke — that ships a
 * near-empty sitemap to Search Console, which is worse than none. */
if (routes.length < 5) {
  console.error(`generate-sitemap: only ${routes.length} route(s) found — failing the build.`);
  process.exit(1);
}

console.log(`generate-sitemap: wrote dist/sitemap.xml with ${routes.length} URLs`);
