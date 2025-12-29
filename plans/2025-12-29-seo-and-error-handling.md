# SEO Files & Error Handling Implementation Plan

## Overview

Add Next.js 16 SEO metadata files, error handling pages, and clean up unused default assets to complete best practices compliance. This includes dynamic sitemap, robots.txt, programmatically generated brand assets, and proper error boundaries.

## Current State Analysis

**What exists:**
- Comprehensive metadata in `src/app/layout.tsx` with `metadataBase`, Open Graph, and Twitter cards
- `public/` folder contains 5 unused default create-next-app SVGs

**What's missing:**
- `sitemap.ts` - No sitemap for search engines
- `robots.ts` - No robots.txt for crawler guidance
- `icon.tsx` - No favicon (uses browser default)
- `opengraph-image.tsx` - No OG image for social sharing
- `global-error.tsx` - No root error boundary
- `not-found.tsx` - No custom 404 page

### Key Discoveries:
- Site uses minimalist black/white design with sharp corners (`src/app/globals.css:29-31`)
- `metadataBase` is `https://slash-command.com` (`src/app/layout.tsx:16`)
- Single-page site (only `/` route exists)
- Uses Geist font family via CSS variables

## Desired End State

After implementation:
- `/sitemap.xml` returns valid XML sitemap
- `/robots.txt` returns proper crawler directives
- Favicon appears in browser tabs (32x32 PNG)
- Social shares show branded OG image (1200x630)
- 404 errors show custom not-found page
- Runtime errors show custom error page
- `public/` folder is clean (no unused assets)

### Verification:
- `curl https://slash-command.com/sitemap.xml` returns XML
- `curl https://slash-command.com/robots.txt` returns text
- Browser dev tools shows favicon in Network tab
- Social media debuggers show OG image preview
- Navigating to `/nonexistent` shows 404 page
- Runtime errors trigger error boundary

## What We're NOT Doing

- No `apple-icon.tsx` (can be added later if needed)
- No `twitter-image.tsx` (will use OG image)
- No custom fonts in OG image (system fonts only)
- No dynamic routes in sitemap (single page only)

## Implementation Approach

Use Next.js 16 App Router file conventions for metadata generation. All files go in `src/app/` directory. Brand assets use `ImageResponse` from `next/og` with minimalist black/white design matching site aesthetic.

---

## Phase 1: SEO Metadata Files

### Overview
Create `sitemap.ts` and `robots.ts` for search engine optimization.

### Changes Required:

#### 1. Sitemap

**File**: `src/app/sitemap.ts` (new file)

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://slash-command.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

#### 2. Robots

**File**: `src/app/robots.ts` (new file)

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://slash-command.com/sitemap.xml",
  };
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npx tsc --noEmit`
- [x] Linting passes: `npm run lint`
- [x] Dev server starts: `npm run dev`
- [x] Sitemap accessible: `curl http://localhost:3000/sitemap.xml`
- [x] Robots accessible: `curl http://localhost:3000/robots.txt`

#### Manual Verification:
- [ ] `/sitemap.xml` returns valid XML with correct URL
- [ ] `/robots.txt` returns text with sitemap reference

---

## Phase 2: Brand Assets (Icon & OG Image)

### Overview
Generate favicon and Open Graph image programmatically using `ImageResponse`.

### Changes Required:

#### 1. Favicon

**File**: `src/app/icon.tsx` (new file)

```typescript
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          color: "white",
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        /
      </div>
    ),
    { ...size }
  );
}
```

#### 2. Open Graph Image

**File**: `src/app/opengraph-image.tsx` (new file)

```typescript
import { ImageResponse } from "next/og";

export const alt = "Slash Command - Claude Code Plugin";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "black",
              color: "white",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            /
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "black",
            marginBottom: 16,
          }}
        >
          Slash Command
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#71717a",
          }}
        >
          Structured workflows for Claude Code
        </div>
      </div>
    ),
    { ...size }
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npx tsc --noEmit`
- [x] Linting passes: `npm run lint`
- [x] Dev server starts: `npm run dev`

#### Manual Verification:
- [ ] Favicon visible in browser tab at `http://localhost:3000`
- [ ] `/icon` returns PNG image (32x32, black square with white "/")
- [ ] `/opengraph-image` returns PNG image (1200x630)
- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Phase 3: Error Handling Pages

### Overview
Add custom 404 and global error pages matching site design.

### Changes Required:

#### 1. Not Found Page (404)

**File**: `src/app/not-found.tsx` (new file)

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
```

#### 2. Global Error Handler

**File**: `src/app/global-error.tsx` (new file)

```typescript
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <main className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Error</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Something went wrong
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npx tsc --noEmit`
- [x] Linting passes: `npm run lint`
- [x] Build succeeds: `npm run build`

#### Manual Verification:
- [ ] Navigate to `/nonexistent-page` shows custom 404
- [ ] 404 page styling matches site design (black/white, sharp corners)
- [ ] "Go home" link works correctly

**Note**: `global-error.tsx` is difficult to test manually without intentionally breaking the app. Verify it compiles and has correct structure.

---

## Phase 4: Cleanup Public Folder

### Overview
Remove unused default create-next-app SVG files.

### Changes Required:

**Delete these files from `public/`:**
- `file.svg`
- `globe.svg`
- `next.svg`
- `vercel.svg`
- `window.svg`

**Command:**
```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] No broken imports: `grep -r "file.svg\|globe.svg\|next.svg\|vercel.svg\|window.svg" src/`

#### Manual Verification:
- [ ] `public/` folder is empty or contains only project-specific assets
- [ ] Site renders correctly without errors

---

## Testing Strategy

### Automated Tests:
- TypeScript compilation
- ESLint validation
- Next.js build

### Manual Testing Steps:
1. Start dev server: `npm run dev`
2. Check favicon in browser tab
3. Visit `/sitemap.xml` - should return XML
4. Visit `/robots.txt` - should return text
5. Visit `/opengraph-image` - should return image
6. Visit `/nonexistent` - should show 404 page
7. Run production build: `npm run build && npm run start`
8. Test OG image with social media debugger

## File Summary

**New files to create:**
| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | Dynamic sitemap generation |
| `src/app/robots.ts` | Robots.txt generation |
| `src/app/icon.tsx` | Favicon (32x32 PNG) |
| `src/app/opengraph-image.tsx` | OG image (1200x630 PNG) |
| `src/app/not-found.tsx` | Custom 404 page |
| `src/app/global-error.tsx` | Global error boundary |

**Files to delete:**
| File | Reason |
|------|--------|
| `public/file.svg` | Unused default asset |
| `public/globe.svg` | Unused default asset |
| `public/next.svg` | Unused default asset |
| `public/vercel.svg` | Unused default asset |
| `public/window.svg` | Unused default asset |

## References

- Research document: `research/2025-12-29-nextjs-16-best-practices-evaluation.md`
- Next.js Sitemap docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js Robots docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js OG Image docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Next.js Error Handling: https://nextjs.org/docs/app/api-reference/file-conventions/error
