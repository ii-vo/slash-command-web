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

        <div className="font-mono text-sm bg-zinc-900 rounded-lg p-4 mb-6">
          <div className="text-zinc-300">thoughts/</div>
          <div className="ml-4 space-y-1 text-zinc-500">
            <div>├── plans/ <span className="text-zinc-600"># Step-by-step implementation plans</span></div>
            <div>├── research/ <span className="text-zinc-600"># Notes about how your code works</span></div>
            <div>├── handoffs/ <span className="text-zinc-600"># Summaries for resuming work later</span></div>
            <div>├── prs/ <span className="text-zinc-600"># Pull request descriptions</span></div>
            <div>└── notes/ <span className="text-zinc-600"># Personal notes and decisions</span></div>
          </div>
        </div>

        <p className="text-sm text-zinc-500 text-center">
          These directories provide historical context across sessions, enabling Claude to
          resume work with full understanding of past decisions, find similar patterns
          from previous implementations, and reference research when planning new features.
        </p>
      </div>
    </section>
  );
}
