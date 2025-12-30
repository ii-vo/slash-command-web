import { PlusCorner } from "./PlusCorner";

export function Workflow() {
  return (
    <section className="relative px-6 py-16">
      <PlusCorner position="bottom-left" className="m-4" />
      <PlusCorner position="bottom-right" className="m-4" />

      <div className="max-w-xl mx-auto">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 text-center">
          The Workflow
        </h2>
        <p className="text-sm text-zinc-500 text-center mb-8">
          How to build features with Claude Code
        </p>

        <ol className="space-y-6 text-sm">
          <li>
            <code className="font-mono">/research_codebase</code>
            <span className="text-zinc-400 ml-2">(optional)</span>
            <p className="text-zinc-500 mt-1">
              Learn how your code works before making changes.
              Creates notes in research/ you can reference later.
            </p>
          </li>

          <li>
            <code className="font-mono">/create_plan</code>
            <p className="text-zinc-500 mt-1">
              Tell Claude what you want to build.
              It analyzes your code and writes a step-by-step plan in plans/.
            </p>
          </li>

          <li>
            <code className="font-mono">/implement_plan</code>
            <p className="text-zinc-500 mt-1">
              Claude follows the plan and writes the code.
              Creates an isolated worktree by default. Use <code className="font-mono text-xs">--here</code> to implement in place.
            </p>
          </li>

          <li>
            <code className="font-mono">/validate_plan</code>
            <p className="text-zinc-500 mt-1">
              Double-check that everything in the plan is done and working.
            </p>
          </li>

          <li>
            <code className="font-mono">/ship</code>
            <p className="text-zinc-500 mt-1">
              Create a pull request, merge it, and clean up.
              Use <code className="font-mono text-xs">--direct</code> to bypass PR.
            </p>
          </li>
        </ol>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 text-center">
            Shipping Options
          </h3>

          <div className="space-y-4 text-sm">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <code className="font-mono">/yolo</code>
              <span className="text-zinc-400 ml-2">&quot;add feature X&quot;</span>
              <p className="text-zinc-500 mt-1">
                Full auto mode. Plans, implements, commits, and ships with no stops.
                Halts immediately on any failure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <code className="font-mono">/pr</code>
                <p className="text-zinc-500 mt-1">
                  Create or update a PR with a detailed description.
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <code className="font-mono">/merge</code>
                <p className="text-zinc-500 mt-1">
                  Merge an existing PR and clean up branches.
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 text-center">
              <code className="font-mono">/ship</code> = <code className="font-mono">/pr</code> + <code className="font-mono">/merge</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
