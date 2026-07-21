import HelpLayout from './HelpLayout';

export default function AmazonIntegration() {
  return (
    <HelpLayout title="Amazon integration">
      <section>
        <h2 className="font-bold text-xl text-white mb-3">Connecting your Amazon account</h2>
        <p>DragonBot connects to Amazon through the official Selling Partner API (SP-API). This is the same API used by major Amazon tools like Helium 10 and Jungle Scout.</p>
        <p className="mt-3">To connect, type <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot connect amazon</code> in Slack. You'll receive a secure authorization link that takes you to Amazon's login page. Sign in and approve the connection.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">What data does DragonBot access?</h2>
        <p>With your authorization, DragonBot can access:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li>Orders and order reports</li>
          <li>Product listings and catalog data</li>
          <li>Inventory and FBA shipment data</li>
          <li>Advertising campaigns, keywords, and spend</li>
          <li>Business reports and sales analytics</li>
          <li>Customer messages (for support triage)</li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Permissions & modes</h2>
        <p>You control how DragonBot interacts with your Amazon account:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li><strong className="text-white">Read-only (default):</strong> DragonBot can only pull data and generate reports. No changes to your account.</li>
          <li><strong className="text-white">Supervised:</strong> DragonBot can take actions but asks for your approval first.</li>
          <li><strong className="text-white">Autonomous:</strong> DragonBot handles routine tasks on its own, escalating edge cases.</li>
        </ul>
        <p className="mt-3">You can change modes at any time in your settings.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">TOS compliance</h2>
        <p>DragonBot is 100% Amazon Terms of Service compliant. We use only the official SP-API — no scraping, no browser automation, no gray-area workarounds. Your account is safe.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Troubleshooting</h2>
        <p><strong className="text-white">Connection failed?</strong> Make sure you're signing in with the correct Amazon account (the one that owns the Seller Central). If you have multiple accounts, check you're authorizing the right one.</p>
        <p className="mt-3"><strong className="text-white">Data not showing up?</strong> It can take a few minutes for Amazon to process the authorization. Try asking DragonBot again after 5 minutes. If it persists, type <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot status</code> to check your connection.</p>
        <p className="mt-3"><strong className="text-white">Revoking access?</strong> You can revoke DragonBot's access at any time from your Amazon Seller Central under Settings → User Permissions → Third Party Apps.</p>
      </section>
    </HelpLayout>
  );
}