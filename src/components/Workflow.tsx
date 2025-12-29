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
              Create a pull request and merge it.
              Automatically cleans up worktrees when done.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
