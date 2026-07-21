import HelpLayout from './HelpLayout';

export default function AccountManagement() {
  return (
    <HelpLayout title="Account management">
      <section>
        <h2 className="font-bold text-xl text-white mb-3">Your profile</h2>
        <p>Your DragonBot account is tied to your Slack workspace. Your display name and avatar come from Slack automatically. To update them, change them in your Slack profile.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Team members</h2>
        <p>Anyone in your Slack workspace can use DragonBot — just mention <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot</code> in any channel. There are no per-seat charges. DragonBot maintains context about your whole team while respecting individual workflows.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Managing connected services</h2>
        <p>To see all your connected integrations, type <code className="bg-white/10 px-2 py-0.5 rounded text-[#98CC65] text-sm">@DragonBot connections</code> in Slack. You can disconnect any service at any time.</p>
        <p className="mt-3">To revoke Amazon access specifically, you can also do it directly from Seller Central under Settings → User Permissions → Third Party Apps.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Changing your plan</h2>
        <p>Upgrade, downgrade, or cancel at any time. No commitments, no cancellation fees. Visit our <a href="/pricing" className="text-[#98CC65] underline">pricing page</a> to see available plans, or contact us at <a href="mailto:info@getdragonbot.com" className="text-[#98CC65] underline">info@getdragonbot.com</a>.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Deleting your account</h2>
        <p>To delete your account and all associated data, email us at <a href="mailto:info@getdragonbot.com" className="text-[#98CC65] underline">info@getdragonbot.com</a> with the subject "Delete my account". We will:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li>Revoke all connected service authorizations</li>
          <li>Delete all stored data, reports, and conversation history</li>
          <li>Cancel any active subscription</li>
          <li>Confirm deletion via email within 24 hours</li>
        </ul>
        <p className="mt-3">This action is irreversible.</p>
      </section>
    </HelpLayout>
  );
}