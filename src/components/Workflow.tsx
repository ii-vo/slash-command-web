import { PlusCorner } from "./PlusCorner";

export function Workflow() {
  return (
    <section className="relative px-6 py-16 border-t border-zinc-200 dark:border-zinc-800">
      <PlusCorner position="bottom-left" className="m-4" />
      <PlusCorner position="bottom-right" className="m-4" />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-8 text-center">
          Workflow
        </h2>

        {/* Desktop: Horizontal flow */}
        <pre className="hidden md:block font-mono text-xs md:text-sm text-center text-zinc-600 dark:text-zinc-400 overflow-x-auto">
          {`┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────────┐
│  RESEARCH   │    PLAN     │  IMPLEMENT  │   VERIFY    │    DELIVER      │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────────┤
│ /research_  │ /create_    │ /implement_ │ /validate_  │ /commit         │
│  codebase   │  plan       │  plan       │  plan       │ /describe_pr    │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────────┘`}
        </pre>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
          <div className="border border-zinc-300 dark:border-zinc-700 p-3">
            <div className="font-bold mb-1">RESEARCH</div>
            <div>/research_codebase</div>
          </div>
          <div className="text-center text-zinc-400">↓</div>
          <div className="border border-zinc-300 dark:border-zinc-700 p-3">
            <div className="font-bold mb-1">PLAN</div>
            <div>/create_plan</div>
          </div>
          <div className="text-center text-zinc-400">↓</div>
          <div className="border border-zinc-300 dark:border-zinc-700 p-3">
            <div className="font-bold mb-1">IMPLEMENT</div>
            <div>/implement_plan</div>
          </div>
          <div className="text-center text-zinc-400">↓</div>
          <div className="border border-zinc-300 dark:border-zinc-700 p-3">
            <div className="font-bold mb-1">VERIFY</div>
            <div>/validate_plan</div>
          </div>
          <div className="text-center text-zinc-400">↓</div>
          <div className="border border-zinc-300 dark:border-zinc-700 p-3">
            <div className="font-bold mb-1">DELIVER</div>
            <div>/commit /describe_pr</div>
          </div>
        </div>
      </div>
    </section>
  );
}
