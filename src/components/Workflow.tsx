import { PlusCorner } from "./PlusCorner";

const stages = [
  { name: "RESEARCH", command: "/research_codebase" },
  { name: "PLAN", command: "/create_plan" },
  { name: "IMPLEMENT", command: "/implement_plan" },
  { name: "VERIFY", command: "/validate_plan" },
  { name: "DELIVER", command: "/ship" },
];

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

        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:flex relative justify-between items-center">
          {/* Horizontal connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-300 dark:bg-zinc-700 -translate-y-1/2" />

          {/* Stages */}
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="flex flex-col items-center relative z-10"
            >
              {/* Stage name above */}
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wide mb-3">
                {stage.name}
              </span>

              {/* Dot marker on the line */}
              <div className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-500 border-2 border-white dark:border-zinc-900" />

              {/* Command below */}
              <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono mt-3 text-center whitespace-nowrap">
                {stage.command}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-300 dark:bg-zinc-700" />

          {/* Stages stacked vertically */}
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="relative flex items-start py-4 first:pt-0 last:pb-0"
            >
              {/* Dot marker on the line */}
              <div className="absolute left-[-27px] top-4 first:top-0 w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-500 border-2 border-white dark:border-zinc-900" />

              {/* Stage content */}
              <div>
                <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  {stage.name}
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-500 font-mono mt-1">
                  {stage.command}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
