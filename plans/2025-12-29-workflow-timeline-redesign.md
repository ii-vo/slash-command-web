# Workflow Timeline Redesign Implementation Plan

## Overview

Replace the ASCII table workflow chart with a smooth horizontal timeline design that shows visual progression from RESEARCH → DELIVER. Keep commands visible but secondary.

## Current State

- Desktop: ASCII box-drawing characters (`┌─┬─┐`) in a `<pre>` block
- Mobile: Stacked bordered cards with `↓` arrows
- Both lack visual flow indication

## Desired End State

- Desktop: Horizontal timeline with connecting line, stages above, commands below
- Mobile: Vertical timeline with line on left side
- Smooth, modern appearance while maintaining simplicity
- Commands visible in muted styling

## What We're NOT Doing

- Adding animations or hover effects
- Changing the stage names or commands
- Adding icons or images
- Changing the overall page layout

## Implementation Approach

Single phase - update the Workflow.tsx component with CSS-based timeline using Tailwind classes.

## Phase 1: Implement Timeline Design

### Overview
Replace ASCII table with flexbox-based timeline using a connecting line element.

### Changes Required:

#### 1. Workflow.tsx - Complete Rewrite

**File**: `src/components/Workflow.tsx`

**Desktop Design:**
- Horizontal flex container with 5 equally-spaced stages
- Single horizontal line behind the stages (using pseudo-element or absolute div)
- Each stage: dot/marker on the line, stage name above, command below
- Stage names: uppercase, medium weight
- Commands: smaller, muted color, mono font

**Mobile Design:**
- Vertical flex container
- Vertical line on the left side
- Each stage aligned to the right of the line
- Dot markers where stage meets line

**Structure:**
```tsx
<section>
  {/* Desktop */}
  <div className="hidden md:flex relative">
    {/* Horizontal connecting line */}
    <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-300" />

    {/* Stages */}
    {stages.map(stage => (
      <div className="flex-1 flex flex-col items-center relative">
        <span className="stage-name">{stage.name}</span>
        <div className="dot" /> {/* On the line */}
        <span className="command">{stage.command}</span>
      </div>
    ))}
  </div>

  {/* Mobile */}
  <div className="md:hidden relative">
    {/* Vertical connecting line */}
    <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-300" />

    {/* Stages stacked vertically */}
    {stages.map(stage => (
      <div className="flex items-center pl-8 py-4">
        <div className="dot absolute left-4" />
        <div>
          <span className="stage-name">{stage.name}</span>
          <span className="command">{stage.command}</span>
        </div>
      </div>
    ))}
  </div>
</section>
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`
- [x] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] Desktop: Horizontal timeline displays correctly at 768px+ width
- [ ] Desktop: All 5 stages evenly spaced with connecting line visible
- [ ] Mobile: Vertical timeline displays at <768px width
- [ ] Mobile: Line on left with stages aligned properly
- [ ] Dark mode: Colors appropriate in dark theme
- [ ] Commands visible and readable in both views

## References

- Current implementation: `src/components/Workflow.tsx:1-54`
