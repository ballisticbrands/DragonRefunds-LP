/* Post-build step 2: replace each route's placeholder text block with the REAL
 * rendered React tree.
 *
 * ── Why this exists ──────────────────────────────────────────────────────
 * `postbuild-spa-routes.mjs` (step 1) injects a hand-written plain-text summary
 * into #root so crawlers see content. That fixed Quality Score, but real
 * visitors saw it too: on a cold cache the unstyled text painted immediately
 * and stayed until the JS bundle finished downloading and executing, then got
 * wiped and replaced by the real page. getdragonbot.com ships ~870KB of JS, so
 * on mobile that "glitchy plain text" was visible for seconds.
 *
 * This step loads each built route in headless Chrome, lets React render, and
 * splices the resulting markup back into #root. The first paint is then the
 * actual styled page: no flash, better LCP, and crawlers get the real page
 * instead of a summary of it.
 *
 * ── Design notes ─────────────────────────────────────────────────────────
 * • Only #root's innerHTML is replaced. <head> is left exactly as step 1 wrote
 *   it, so all the title/description/canonical/OG work stays authoritative and
 *   nothing Chrome injected at runtime (analytics iframes, pixels) is baked in.
 * • Analytics hosts are BLOCKED. Without this, building would fire ~50 real
 *   page_view/cta_click hits into GA4, Clarity and the Meta pixel on every
 *   deploy and quietly poison the funnel data.
 * • puppeteer-core + the system Chrome, deliberately: plain `puppeteer` would
 *   pull a ~170MB Chromium on every CI run (setup-node's npm cache does not
 *   cover ~/.cache/puppeteer). ubuntu-latest ships Chrome already.
 * • main.jsx uses hydrateRoot, NOT createRoot. createRoot CLEARS #root before
 *   re-rendering, so the prerendered page collapses and re-expands — that was
 *   measured as CLS 0.377 and cost ~30 performance points.
 * • The snapshot is taken AFTER animations settle, and any residual entry state
 *   is stripped (opacity 0 → 1, translateY → none). Snapshotting React's first
 *   commit instead would make hydration match exactly, but framer-motion starts
 *   at opacity:0, so the prerendered tree would ship invisible — that measured
 *   FCP 5.0s / LCP 7.5s on mobile with nothing render-blocking. Visible content
 *   wins: FCP+LCP are 35 of the 100 performance points, TBT is 30. The residual
 *   hydration mismatch (React #418/#423) is the accepted cost; the real fix is
 *   to stop animating above-the-fold content on entry.
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/* ── Locate Chrome. Env override wins; then the usual per-platform paths. ── */
function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  const found = candidates.find(p => existsSync(p));
  if (!found) {
    console.error('prerender: no Chrome found. Set CHROME_PATH, or install Google Chrome.');
    process.exit(1);
  }
  return found;
}

/* ── Serve dist/ with SPA fallback so client routes resolve. ─────────────── */
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};
function serve() {
  return new Promise(resolve => {
    const server = createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      let file = join(dist, url);
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
      if (!existsSync(file)) file = join(dist, 'index.html');   // SPA fallback
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
      res.end(readFileSync(file));
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

/* Everything step 1 wrote — the authoritative route list, so the two steps
 * cannot drift apart. */
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

const BLOCKED = [
  'google-analytics.com', 'googletagmanager.com', 'analytics.google.com',
  'connect.facebook.net', 'facebook.com/tr', 'clarity.ms',
  'doubleclick.net', 'googleadservices.com',
];

const server = await serve();
const port = server.address().port;
const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const routes = builtRoutes();
let done = 0, failed = 0;

for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.setRequestInterception(true);
  page.on('request', r => {
    if (BLOCKED.some(h => r.url().includes(h))) r.abort().catch(() => {});
    else r.continue().catch(() => {});
  });

  const file = join(dist, route === '/' ? '' : route, 'index.html');
  try {
    // Let animations RUN before snapshotting. Snapshotting React's first
    // commit instead makes hydration match, but framer-motion's initial state
    // is `opacity: 0`, so the prerendered content lands in the DOM invisible —
    // measured FCP 5.0s / LCP 7.5s on mobile with nothing render-blocking,
    // because there was literally nothing to paint. Visible content beats
    // clean hydration: FCP+LCP are 35 of the 100 performance points, TBT is 30.
    await page.goto(`http://127.0.0.1:${port}${route}`, {
      waitUntil: 'networkidle0', timeout: 45_000,
    });
    // React has rendered when #root holds real markup rather than step 1's
    // placeholder. Guards against snapshotting the text block we're replacing.
    await page.waitForFunction(
      () => {
        const r = document.getElementById('root');
        return r && r.children.length > 0 && !r.querySelector('[data-prerender]');
      },
      { timeout: 20_000 },
    );

    let rendered = await page.$eval('#root', el => el.innerHTML);
    // Belt and braces: strip any residual entry-animation state so the
    // prerendered markup can never ship invisible, whatever the timing.
    rendered = rendered
      .replace(/opacity:\s*0(?![.\d])/g, 'opacity: 1')
      .replace(/transform:\s*translateY\([^)]*\)/g, 'transform: none');
    if (!rendered || rendered.length < 200) throw new Error(`suspiciously small (${rendered.length}b)`);

    const html = readFileSync(file, 'utf8');
    // #root is the last element in <body> (Vite puts the module script in
    // <head>), so anchor on </body> and let the greedy match backtrack to the
    // matching close. Anchoring on a following <script> does not work here.
    const out = html.replace(
      /<div id="root">[\s\S]*<\/div>(?=\s*<\/body>)/,
      () => `<div id="root">${rendered}</div>`,
    );
    if (out === html) throw new Error('could not locate #root block to replace');
    writeFileSync(file, out);
    done++;
  } catch (err) {
    // Leave step 1's text block in place for this route — degraded (the old
    // flash) but never blank, and the build still ships.
    console.warn(`prerender: SKIPPED ${route} — ${err.message}`);
    failed++;
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

console.log(`prerender: rendered ${done}/${routes.length} routes with the real React tree` +
            (failed ? ` (${failed} left as placeholder text)` : ''));

// A wholesale failure means every route would ship the plain-text flash — fail
// the build rather than deploy that silently.
if (done === 0) {
  console.error('prerender: NO routes rendered — failing the build.');
  process.exit(1);
}
