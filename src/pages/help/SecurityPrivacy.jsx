import HelpLayout from './HelpLayout';

export default function SecurityPrivacy() {
  return (
    <HelpLayout title="Security & privacy">
      <section>
        <h2 className="font-bold text-xl text-white mb-3">Data protection</h2>
        <p>All data is encrypted in transit (TLS) and at rest. We store only secure OAuth tokens — never your passwords or raw credentials. Each workspace is fully isolated — your data is never shared or mixed with other users.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Amazon TOS compliance</h2>
        <p>DragonBot connects through the official Amazon SP-API. No scraping, no browser automation, no gray-area workarounds. We are fully compliant with Amazon's Terms of Service, Data Protection Policy, and Acceptable Use Policy.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Permission controls</h2>
        <p>You choose how DragonBot operates:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
          <li><strong className="text-white">Read-only (default):</strong> DragonBot can only pull data and generate reports</li>
          <li><strong className="text-white">Supervised:</strong> DragonBot asks before taking any action on your accounts</li>
          <li><strong className="text-white">Autonomous:</strong> DragonBot handles routine tasks, escalating edge cases</li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Data retention</h2>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Amazon Customer PII:</strong> Retained max 30 days after order delivery, for fulfillment and tax compliance only</li>
          <li><strong className="text-white">Amazon non-PII data:</strong> Deleted within 18 months</li>
          <li><strong className="text-white">Account data:</strong> Retained while your account is active, deleted on closure</li>
          <li><strong className="text-white">Security logs:</strong> Retained 12 months minimum for incident response</li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Audit trail</h2>
        <p>Every action DragonBot takes is logged — what it did, when, and why. You can review the full audit trail at any time. Nothing happens without a record.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">Your rights</h2>
        <p>You can access, correct, delete, or export your data at any time. You can also revoke DragonBot's access to any connected service instantly. See our full <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#98CC65] underline">Privacy & Data Protection Policy</a> for details.</p>
      </section>

      <section>
        <h2 className="font-bold text-xl text-white mb-3">We don't train on your data</h2>
        <p>Your data is used solely to provide services to you. We do not use your data to train AI models. We do not sell your data. Period.</p>
      </section>
    </HelpLayout>
  );
}