import HelpLayout from './HelpLayout';

export default function BillingCredits() {
  return (
    <HelpLayout title="Billing & credits">
      <section>
        <h2 className="font-bold text-xl text-white mb-3">Free credits</h2>
        <p>Every new account starts with $100 in free credits. No credit card required. These credits never expire and give you full access to every feature and integration.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">How credits work</h2>
        <p>Credits represent the actual AI model costs passed through directly — no platform fee on top. Usage varies by task complexity:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li><strong className="text-white">100–300 credits:</strong> Quick tasks — answering a question, checking a metric, drafting a reply</li>
          <li><strong className="text-white">1,000–3,000 credits:</strong> Standard tasks — PPC audit, keyword research, competitor analysis</li>
          <li><strong className="text-white">3,000–5,000 credits:</strong> Full projects — end-to-end product research, full campaign setup</li>
        </ul>
        <p className="mt-3">Smart caching reuses context across conversations, so repeated questions about the same data cost almost nothing.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Plans & pricing</h2>
        <p>When your free credits run out, plans start at $50/month for 20,000 credits. See our <a href="/pricing" className="text-[#98CC65] underline">pricing page</a> for all available tiers.</p>
        <p className="mt-3">Monthly credits refresh each billing cycle and do not roll over. You can upgrade, downgrade, or cancel at any time — no commitments.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Payment methods</h2>
        <p>We accept all major credit cards. Enterprise customers can request invoicing with custom billing terms — contact us at <a href="mailto:info@getdragonbot.com" className="text-[#98CC65] underline">info@getdragonbot.com</a>.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Refunds</h2>
        <p>If you're unhappy with the service, contact us within 14 days of your first paid billing cycle for a full refund. No questions asked.</p>
      </section>
    </HelpLayout>
  );
}