export function Handoff() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-xl mx-auto">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 text-center">
          Session Continuity
        </h2>
        <p className="text-sm text-zinc-500 text-center mb-6">
          Pick up where you left off in a new conversation
        </p>

        <ol className="text-sm space-y-2">
          <li>
            <code className="font-mono">/create_handoff</code> <span className="text-zinc-500">— Save what you were working on</span>
          </li>
          <li>
            <code className="font-mono">/resume_handoff</code> <span className="text-zinc-500">— Continue from that point</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
