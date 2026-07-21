/* Post-build: give every SPA route a real static index.html in dist/ so
   GitHub Pages serves it with HTTP 200 instead of the 404.html fallback
   (which renders fine but returns a 404 status — bad for Google Ads
   destination checks and SEO).

   Routes are derived from the app's own data files (lpPages + visible
   competitors) plus the static site routes, so new pages added to either
   data file get their 200s automatically on the next build. */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { lpPages } from '../src/data/lpPages.js';
import { competitors } from '../src/data/competitors.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const src = join(dist, 'index.html');

if (!existsSync(src)) {
  console.error('postbuild: dist/index.html not found — run vite build first');
  process.exit(1);
}

const staticRoutes = [
  '/v1', '/v2', '/v3', '/chats', '/privacy', '/tos', '/pricing', '/beta',
  '/support', '/support/getting-started', '/support/billing-credits',
  '/support/amazon-integration', '/support/security-privacy',
  '/support/account-management', '/support/feature-requests',
];

const lpRoutes = lpPages.map(p => p.path);
const vsRoutes = Object.entries(competitors)
  .filter(([, c]) => !c.hidden)
  .map(([slug]) => `/vs/${slug}`);

const routes = [...new Set([...staticRoutes, ...lpRoutes, ...vsRoutes])];

let n = 0;
for (const route of routes) {
  const dir = join(dist, ...route.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  copyFileSync(src, join(dir, 'index.html'));
  n++;
}
console.log(`postbuild: wrote ${n} route index.html files into dist/ (${lpRoutes.length} LP + ${vsRoutes.length} vs + ${staticRoutes.length} static)`);
