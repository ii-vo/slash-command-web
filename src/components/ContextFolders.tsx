export function ContextFolders() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-xl mx-auto">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 text-center">
          Context Management
        </h2>
        <p className="text-sm text-zinc-500 text-center mb-6">
          All output is saved to your repo so Claude can reference it later
        </p>

        <ul className="text-sm space-y-2">
          <li>
            <code className="font-mono">plans/</code> <span className="text-zinc-500">— Step-by-step implementation plans</span>
          </li>
          <li>
            <code className="font-mono">research/</code> <span className="text-zinc-500">— Notes about how your code works</span>
          </li>
          <li>
            <code className="font-mono">handoffs/</code> <span className="text-zinc-500">— Summaries for resuming work later</span>
          </li>
          <li>
            <code className="font-mono">prs/</code> <span className="text-zinc-500">— Pull request descriptions</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
