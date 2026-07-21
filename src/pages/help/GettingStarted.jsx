import HelpLayout from './HelpLayout';

export default function GettingStarted() {
  return (
    <HelpLayout title="Getting started">
      <section>
        <h2 className="font-bold text-xl text-white mb-3">1. Add DragonBot to Slack</h2>
        <p>DragonBot is currently in private beta. <a href="/beta" className="text-[#98CC65] underline">Request access here</a> and we'll follow up with onboarding steps for your Slack workspace. Once you're in, DragonBot will appear as an app in your Slack sidebar — you can mention it in any channel or DM it directly.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">2. Connect your Amazon account</h2>
        <p>Once DragonBot is in your Slack, type <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot connect amazon</code>. DragonBot will send you a secure link to authorize access via Amazon's official SP-API. This is a read-only OAuth connection — we never see your Amazon password.</p>
        <p className="mt-3">The authorization takes about 30 seconds. Once connected, DragonBot can pull your orders, listings, PPC data, and more.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">3. Connect other tools</h2>
        <p>DragonBot integrates with 3,000+ tools. Common ones for Amazon sellers:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li>Google Sheets & Drive — for reports and spreadsheets</li>
          <li>Notion — for SOPs, return policies, knowledge bases</li>
          <li>Google Ads / Meta Ads — for ad management</li>
          <li>Shopify — for D2C store data</li>
        </ul>
        <p className="mt-3">Type <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot connect</code> to see all available integrations.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">4. Start your first task</h2>
        <p>Just talk to DragonBot like a colleague. Some things to try:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li>"Audit our PPC spend for last month"</li>
          <li>"Do keyword research on these ASINs: B0CK5LRQX7, B0D3FHYMN1"</li>
          <li>"Check if any of our listings are suppressed"</li>
          <li>"Build me a weekly ops report"</li>
        </ul>
        <p className="mt-3">DragonBot will ask clarifying questions if needed, then get to work. Results are delivered right in Slack — spreadsheets, PDFs, reports, or just a summary.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">5. Set up scheduled tasks</h2>
        <p>DragonBot can run tasks on a schedule. For example:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li>"Check our listings every hour and alert me if anything goes down"</li>
          <li>"Send a PPC performance report to #ppc every Monday at 9am"</li>
          <li>"Monitor competitor prices daily"</li>
        </ul>
        <p className="mt-3">DragonBot handles scheduling automatically — you can view and manage all scheduled tasks at any time.</p>
      </section>
    </HelpLayout>
  );
}