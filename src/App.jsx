import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Pricing from './pages/Pricing';
import GettingStarted from './pages/help/GettingStarted';
import BillingCredits from './pages/help/BillingCredits';
import AmazonIntegration from './pages/help/AmazonIntegration';
import SecurityPrivacy from './pages/help/SecurityPrivacy';
import AccountManagement from './pages/help/AccountManagement';
import FeatureRequests from './pages/help/FeatureRequests';
import LandingV2 from './pages/LandingV2';
import LandingV3 from './pages/LandingV3';
import LandingV4 from './pages/LandingV4';
import VsCompetitor from './pages/VsCompetitor';
import Beta from './pages/Beta';
import LpPage from './pages/LpPage';
import { lpPages } from './data/lpPages';

// This repo (DragonRefunds-LP) is a single-purpose deployment of the /refunds
// landing page served at the domain root (dragonrefunds.com). Root + unknown
// paths render the refunds feature LP; the other routes are retained so shared
// nav/footer links keep resolving.
const refundsPage = lpPages.find(p => p.path === '/refunds');

function App() {
  return (
    <Router>
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
        <Route path="/vs/:slug" element={<VsCompetitor />} />
        <Route path="/beta" element={<Beta />} />
        <Route path="*" element={<LandingV4 page={refundsPage} />} />
      </Routes>
    </Router>
  )
}

export default App