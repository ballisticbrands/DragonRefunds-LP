import HelpLayout from './HelpLayout';

export default function FeatureRequests() {
  return (
    <HelpLayout title="Feature requests">
      <section>
        <h2 className="font-bold text-xl text-white mb-3">We'd love to hear from you</h2>
        <p>DragonBot is built by Amazon sellers for Amazon sellers. If there's something you wish DragonBot could do — or something it could do better — we want to know about it.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">How to submit a request</h2>
        <p>Two ways:</p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
          <li><strong className="text-white">In Slack:</strong> Tell DragonBot directly. Type something like <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot I wish you could...</code> and it will log the request for our team.</li>
          <li><strong className="text-white">By email:</strong> Send your idea to <a href="mailto:info@getdragonbot.com" className="text-[#98CC65] underline">info@getdragonbot.com</a> with "Feature request" in the subject line.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">What happens next</h2>
        <p>Every feature request is reviewed by our team. We prioritize based on how many users request the same thing and how well it fits the product direction. We can't promise every feature will be built, but we read every request and many of our best features started as user suggestions.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Popular requests we've shipped</h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Scheduled tasks and automations</li>
          <li>Google Sheets export for keyword research</li>
          <li>Customer support triage with auto-drafted responses</li>
          <li>Competitor price monitoring alerts</li>
        </ul>
      </section>
    </HelpLayout>
  );
}