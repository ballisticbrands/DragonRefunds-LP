import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { trackRouteChange } from './lib/track';
// LandingV4 stays eagerly imported: it renders "/" (the primary ad
// destination) plus every 'feature' LP route, so it's on the critical path.
// Every other page is code-split so it no longer ships in the homepage bundle.
import LandingV4 from './pages/LandingV4';
import { lpPages } from './data/lpPages';
import { getRefundsCompetitorSlugs } from './data/refundsCompetitors';

const Home = lazy(() => import('./pages/Home'));
const Chats = lazy(() => import('./pages/Chats'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Support = lazy(() => import('./pages/Support'));
const Pricing = lazy(() => import('./pages/Pricing'));
const GettingStarted = lazy(() => import('./pages/help/GettingStarted'));
const BillingCredits = lazy(() => import('./pages/help/BillingCredits'));
const AmazonIntegration = lazy(() => import('./pages/help/AmazonIntegration'));
const SecurityPrivacy = lazy(() => import('./pages/help/SecurityPrivacy'));
const AccountManagement = lazy(() => import('./pages/help/AccountManagement'));
const FeatureRequests = lazy(() => import('./pages/help/FeatureRequests'));
const LandingV2 = lazy(() => import('./pages/LandingV2'));
const LandingV3 = lazy(() => import('./pages/LandingV3'));
const VsCompetitor = lazy(() => import('./pages/VsCompetitor'));
const VsRefundsCompetitor = lazy(() => import('./pages/VsRefundsCompetitor'));
const LpPage = lazy(() => import('./pages/LpPage'));

// This repo (DragonRefunds-LP) is a single-purpose deployment of the /refunds
// landing page served at the domain root (dragonrefunds.com). Root + unknown
// paths render the refunds feature LP; the other routes are retained so shared
// nav/footer links keep resolving.
const refundsPage = lpPages.find(p => p.path === '/refunds');

// Reports every route to GA4 + the Meta Pixel. Renders nothing; must live
// INSIDE <Router> so useLocation() has a router context. index.html only
// fires a pageview on hard load, so without this every client-side
// navigation goes uncounted — see trackRouteChange() in lib/track.js.
function RouteAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackRouteChange(pathname);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <RouteAnalytics />
      {/* <main> gives the document its one required landmark (a11y
          landmark-one-main); it wraps the routed page, not the chrome. */}
      <main>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingV4 page={refundsPage} />} />
          <Route path="/v1" element={<Home />} />
          <Route path="/v2" element={<LandingV4 />} />
          <Route path="/v2-old" element={<LandingV2 />} />
          <Route path="/v3" element={<LandingV3 />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:chatSlug" element={<Chats />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/tos" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/getting-started" element={<GettingStarted />} />
          <Route path="/support/billing-credits" element={<BillingCredits />} />
          <Route path="/support/amazon-integration" element={<AmazonIntegration />} />
          <Route path="/support/security-privacy" element={<SecurityPrivacy />} />
          <Route path="/support/account-management" element={<AccountManagement />} />
          <Route path="/support/feature-requests" element={<FeatureRequests />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* Google Ads landing pages (data-driven; see data/lpPages.js).
              template 'feature' → the main-LP template (LandingV4) with a
              custom hero + feature chat demo; 'alt' → LpPage comparison
              layout. Static /vs/* entries here outrank /vs/:slug in RRv6. */}
          {lpPages.map(p => (
            <Route key={p.path} path={p.path}
              element={p.template === 'feature' ? <LandingV4 page={p} /> : <LpPage page={p} />} />
          ))}
          {/* Dragon Refunds comparison pages (footer-linked only). These static
              /vs/* entries outrank /vs/:slug in RRv6 and render the
              Dragon-Refunds-branded template, not the DragonBot one. */}
          {getRefundsCompetitorSlugs().map(slug => (
            <Route key={slug} path={`/vs/${slug}`} element={<VsRefundsCompetitor slug={slug} />} />
          ))}
          <Route path="/vs/:slug" element={<VsCompetitor />} />
          <Route path="*" element={<LandingV4 page={refundsPage} />} />
        </Routes>
      </Suspense>
      </main>
    </Router>
  )
}

export default App
