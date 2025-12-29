# Landing Page Comprehensive Redesign Implementation Plan

## Overview

Redesign the slash-command landing page to better communicate the claude-meta workflow. The page should help Claude Code users understand the foundational workflow deeply, with expandable details for each step, context management explanation, and extensibility messaging.

## Current State Analysis

The landing page currently has 4 sections:
- **Hero**: Title + generic tagline + vague description + GitHub CTA
- **Workflow**: ASCII table (desktop) / stacked cards (mobile) showing 5 steps without explanation
- **Install**: Copy-to-clipboard commands
- **Footer**: Minimal "Built for Claude Code" + GitHub link

### Key Issues:
- Tagline doesn't communicate the value proposition
- Workflow steps lack explanation of what each command does
- No mention of the folder structure that makes context management work
- No information about agents, outputs, or variants
- Missing handoff workflow (separate use case)
- No extensibility messaging

## Desired End State

A landing page that:
1. Clearly communicates "Structured workflows you can build on"
2. Shows the Feature Development workflow with expandable details
3. Explains that artifacts save to `plans/`, `research/`, `handoffs/`, `prs/`
4. Mentions handoff as a separate use case for session continuity
5. Communicates extensibility in the footer
6. Works well on mobile with everything visible (no hidden content by default)

## What We're NOT Doing

- Adding animations or complex interactions
- Changing the visual design language (sharp corners, monospace, zinc colors)
- Adding images, icons, or illustrations
- Creating separate pages or routing
- Adding documentation beyond what's on the landing page

## Implementation Approach

Six phases, each updating a specific section. Components will use Tailwind CSS with the existing design system. The Workflow section will be a client component for expandable details.

---

## Phase 1: Hero Section Update

### Overview
Update the Hero component with new tagline and description that emphasizes the value proposition.

### Changes Required:

#### 1. Hero.tsx

**File**: `src/components/Hero.tsx`

**Changes**:
- Update tagline from "Structured workflows for Claude Code" to "Structured workflows you can build on"
- Update description to emphasize context management and the workflow value
- Keep PlusCorner decorations and GitHub CTA unchanged

```tsx
<p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-6">
  Structured workflows you can build on
</p>
<p className="text-base text-zinc-500 dark:text-zinc-500 mb-8 max-w-md mx-auto">
  A Claude Code plugin for planning, implementing, and shipping code—with
  artifacts saved for context.
</p>
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Hero displays new tagline correctly
- [ ] Description reads naturally and communicates value
- [ ] Dark mode styling unchanged

---

## Phase 2: Workflow Section Rewrite

### Overview
Replace the ASCII table with a structured workflow component showing the Feature Development flow with expandable details.

### Changes Required:

#### 1. Create WorkflowData

Define the workflow data structure with all step information:

```typescript
const workflowSteps = [
  {
    name: "RESEARCH",
    command: "/research_codebase",
    description: "Explore and document the codebase",
    output: "research/",
    optional: true,
    details: {
      what: "Creates technical documentation about specific areas of your codebase",
      agents: ["codebase-locator", "codebase-analyzer", "notes-locator", "notes-analyzer", "web-search-researcher (optional)"],
      produces: "research/YYYY-MM-DD-description.md"
    }
  },
  {
    name: "PLAN",
    command: "/create_plan",
    description: "Create detailed implementation plans",
    output: "plans/",
    optional: false,
    details: {
      what: "Researches the codebase and creates a phased implementation plan with success criteria",
      agents: ["codebase-locator", "codebase-analyzer", "codebase-pattern-finder", "notes-locator", "notes-analyzer"],
      produces: "plans/YYYY-MM-DD-description.md"
    }
  },
  {
    name: "IMPLEMENT",
    command: "/implement_plan",
    description: "Execute plans phase by phase",
    output: null,
    optional: false,
    details: {
      what: "Reads the plan, implements each phase, runs success criteria, and pauses for human verification",
      agents: null,
      produces: "Code changes + checkmarks in plan file"
    }
  },
  {
    name: "VERIFY",
    command: "/validate_plan",
    description: "Verify implementation against plan",
    output: null,
    optional: false,
    details: {
      what: "Checks that all tasks are complete and success criteria pass",
      agents: null,
      produces: "Verification report"
    }
  },
  {
    name: "SHIP",
    command: "/ship",
    description: "Ship via PR or direct merge",
    output: "prs/",
    optional: false,
    variants: [
      { flag: "(default)", desc: "Create PR, merge, cleanup" },
      { flag: "--pr-only", desc: "Create PR for team review" },
      { flag: "--direct", desc: "Merge directly, no PR" }
    ],
    details: {
      what: "Analyzes changes, creates PR with description, merges, and cleans up branch/worktree",
      agents: null,
      produces: "prs/{number}_description.md"
    }
  }
];
```

#### 2. Workflow.tsx - Complete Rewrite

**File**: `src/components/Workflow.tsx`

**Structure**:
- Client component (needs `"use client"` for expandable state)
- Section header: "The Workflow"
- Desktop: Horizontal flow with connecting line
- Mobile: Vertical flow with connecting line on left
- Each step: name, command, one-liner, output folder indicator
- Expandable "Details" button showing agents and full description
- SHIP step shows variants inline

**Desktop Layout**:
```
[RESEARCH]  ——  PLAN  ——  IMPLEMENT  ——  VERIFY  ——  SHIP
 optional                                            ├ default
                                                     ├ --pr-only
                                                     └ --direct
```

**Key Implementation Details**:
- Use flexbox for horizontal layout on desktop
- Use a horizontal line element behind steps (absolute positioned)
- Each step is a flex column with: name above, dot on line, command + output below
- Optional badge for RESEARCH step
- Expandable details panel below each step
- Mobile: vertical layout with line on left side

```tsx
"use client";

import { useState } from "react";
import { PlusCorner } from "./PlusCorner";

// ... workflowSteps data ...

export function Workflow() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <section className="relative px-6 py-16 border-t border-zinc-200 dark:border-zinc-800">
      <PlusCorner position="bottom-left" className="m-4" />
      <PlusCorner position="bottom-right" className="m-4" />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-12 text-center">
          The Workflow
        </h2>

        {/* Desktop: Horizontal flow */}
        <div className="hidden md:block">
          {/* Timeline with steps */}
          <div className="relative flex justify-between items-start">
            {/* Connecting line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-px bg-zinc-300 dark:bg-zinc-700" />

            {workflowSteps.map((step) => (
              <div key={step.name} className="relative flex flex-col items-center flex-1">
                {/* Step name + optional badge */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {step.name}
                  </span>
                  {step.optional && (
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                      (optional)
                    </span>
                  )}
                </div>

                {/* Dot on line */}
                <div className="w-3 h-3 bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-black mb-3" />

                {/* Command */}
                <code className="text-xs font-mono text-zinc-500 dark:text-zinc-500 mb-1">
                  {step.command}
                </code>

                {/* Output folder */}
                {step.output && (
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                    → {step.output}
                  </span>
                )}

                {/* Variants for SHIP */}
                {step.variants && (
                  <div className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-600 space-y-0.5">
                    {step.variants.map((v) => (
                      <div key={v.flag} className="font-mono">{v.flag}</div>
                    ))}
                  </div>
                )}

                {/* Details toggle */}
                <button
                  onClick={() => setExpandedStep(expandedStep === step.name ? null : step.name)}
                  className="mt-3 text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {expandedStep === step.name ? "Hide details" : "Details"}
                </button>
              </div>
            ))}
          </div>

          {/* Expanded details panel */}
          {expandedStep && (
            <div className="mt-8 p-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              {/* Details content for expanded step */}
            </div>
          )}
        </div>

        {/* Mobile: Vertical flow */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-zinc-300 dark:bg-zinc-700" />

          <div className="space-y-6">
            {workflowSteps.map((step) => (
              <div key={step.name} className="relative pl-8">
                {/* Dot */}
                <div className="absolute left-0 top-1 w-[15px] h-[15px] bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-black" />

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {step.name}
                    </span>
                    {step.optional && (
                      <span className="text-[10px] text-zinc-400">(optional)</span>
                    )}
                  </div>
                  <code className="text-xs font-mono text-zinc-500 block mb-1">
                    {step.command}
                  </code>
                  <p className="text-xs text-zinc-500 mb-1">{step.description}</p>
                  {step.output && (
                    <span className="text-[10px] text-zinc-400">→ {step.output}</span>
                  )}

                  {/* Variants */}
                  {step.variants && (
                    <div className="mt-2 text-[10px] text-zinc-400 space-y-0.5 font-mono">
                      {step.variants.map((v) => (
                        <div key={v.flag}>{v.flag}: {v.desc}</div>
                      ))}
                    </div>
                  )}

                  {/* Expandable details */}
                  <button
                    onClick={() => setExpandedStep(expandedStep === step.name ? null : step.name)}
                    className="mt-2 text-[10px] text-zinc-400 hover:text-zinc-600"
                  >
                    {expandedStep === step.name ? "Hide details" : "See details"}
                  </button>

                  {expandedStep === step.name && (
                    <div className="mt-3 p-3 bg-zinc-100 dark:bg-zinc-900 text-xs">
                      <p className="mb-2">{step.details.what}</p>
                      {step.details.agents && (
                        <div className="mb-2">
                          <span className="text-zinc-400">Agents: </span>
                          <span className="font-mono">{step.details.agents.join(", ")}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-zinc-400">Produces: </span>
                        <span className="font-mono">{step.details.produces}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`
- [x] Dev server runs: `npm run dev`

#### Manual Verification:
- [ ] Desktop: 5 steps display horizontally with connecting line
- [ ] Desktop: RESEARCH shows "(optional)" badge
- [ ] Desktop: SHIP shows variant flags
- [ ] Desktop: "Details" button expands/collapses details panel
- [ ] Desktop: Details show agents (where applicable) and produces
- [ ] Mobile: Vertical layout with line on left
- [ ] Mobile: All steps visible without horizontal scroll
- [ ] Mobile: Details expand inline
- [ ] Dark mode: All elements styled correctly

---

## Phase 3: Context Management Section

### Overview
Add a new section explaining the folder structure that makes context management work.

### Changes Required:

#### 1. Create ContextFolders.tsx

**File**: `src/components/ContextFolders.tsx`

**Structure**:
- Section with header "Context Management"
- Brief explanation
- Visual display of the 4 folders with their purpose

```tsx
export function ContextFolders() {
  const folders = [
    { name: "plans/", purpose: "Implementation plans" },
    { name: "research/", purpose: "Technical documentation" },
    { name: "handoffs/", purpose: "Session context" },
    { name: "prs/", purpose: "PR descriptions" },
  ];

  return (
    <section className="px-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
          Context Management
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          Everything saves to folders you can version and reference
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
            >
              <code className="text-sm font-mono">{folder.name}</code>
              <p className="text-[10px] text-zinc-400 mt-1">{folder.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Section displays with header and explanation
- [ ] 4 folders displayed with names and purposes
- [ ] Responsive layout (wraps on mobile)
- [ ] Dark mode styling correct

---

## Phase 4: Handoff Section

### Overview
Add a brief section for the handoff workflow, positioned as a separate use case for session continuity.

### Changes Required:

#### 1. Create Handoff.tsx

**File**: `src/components/Handoff.tsx`

```tsx
export function Handoff() {
  return (
    <section className="px-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
          Session Continuity
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          Hand off work between sessions with full context
        </p>

        <div className="flex items-center justify-center gap-4 font-mono text-sm">
          <code className="px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            /create_handoff
          </code>
          <span className="text-zinc-400">→</span>
          <code className="px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            /resume_handoff
          </code>
        </div>
      </div>
    </section>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Section displays with header and brief description
- [ ] Two commands shown with arrow between them
- [ ] Responsive on mobile
- [ ] Dark mode styling correct

---

## Phase 5: Footer Update

### Overview
Update the Footer to include extensibility messaging.

### Changes Required:

#### 1. Footer.tsx

**File**: `src/components/Footer.tsx`

**Changes**:
- Add extensibility message above the existing content
- Keep "Built for Claude Code" and GitHub link

```tsx
export function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-zinc-400 dark:text-zinc-600 text-center mb-6">
          These are the essentials. Add your own commands, agents, or skills as you need them.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-500">
          <p>Built for Claude Code</p>
          <a
            href="https://github.com/ii-vo/claude-meta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Extensibility message displays above footer content
- [ ] Existing footer content unchanged
- [ ] Dark mode styling correct

---

## Phase 6: Page Composition Update

### Overview
Update page.tsx to include the new sections in the correct order.

### Changes Required:

#### 1. page.tsx

**File**: `src/app/page.tsx`

```tsx
import { Hero } from "@/components/Hero";
import { Workflow } from "@/components/Workflow";
import { ContextFolders } from "@/components/ContextFolders";
import { Handoff } from "@/components/Handoff";
import { Install } from "@/components/Install";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Workflow />
      <ContextFolders />
      <Handoff />
      <Install />
      <Footer />
    </main>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`
- [x] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] All sections render in correct order
- [ ] Page scrolls smoothly through all sections
- [ ] No visual gaps or overlaps between sections
- [ ] Full page looks cohesive

---

## Testing Strategy

### Automated Tests:
- TypeScript compilation
- ESLint linting
- Build success

### Manual Testing Steps:
1. View page at desktop width (1200px+)
2. View page at tablet width (768px)
3. View page at mobile width (375px)
4. Toggle dark mode and verify all sections
5. Click all "Details" buttons in Workflow section
6. Verify copy button in Install section still works
7. Click GitHub links and verify they open correctly

## Performance Considerations

- Workflow component uses client-side state for expandable details
- All other components are server components (no "use client")
- No external dependencies added
- Minimal DOM elements

## References

- Current implementation: `src/components/*.tsx`
- Design system: `src/app/globals.css` (sharp corners, zinc colors, Geist fonts)
- Previous workflow plan: `plans/2025-12-29-workflow-timeline-redesign.md`
