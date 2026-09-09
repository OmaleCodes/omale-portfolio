# PHILIP MOSES OMALE PORTFOLIO

A dark, glassmorphic, "anti-gravity" personal portfolio for an AI & Robotics
engineer, built with Next.js (App Router), Tailwind CSS, Framer Motion, and
Lucide React.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node 18.17+.

## Project structure

```
data.ts                    ← all content lives here (see below)
app/
  layout.tsx                ← fonts, background, navbar shell
  page.tsx                  ← composes the four sections
  globals.css                ← base theme, glass utility classes
components/
  Background.tsx             ← void gradient + canvas particle field
  Navbar.tsx                  ← floating pill nav with active-section tracking
  Float.tsx                   ← reusable "anti-gravity" bob-loop wrapper
  Hero.tsx
  Skills.tsx
  Projects.tsx
  ProjectCard.tsx
  Certifications.tsx
```

## Swapping in real content

Every section reads from **`data.ts`** in the project root — nothing is
hardcoded in the components. To point this at a real backend later:

1. Keep the exported `interface`s in `data.ts` (or move them to a `types.ts`
   and import from there).
2. Replace the exported constants (`heroData`, `socialLinks`,
   `skillClusters`, `projects`, `certifications`) with `async` functions that
   fetch from Sanity, Contentful, or the Notion API and shape the response
   into the same interfaces.
3. Since those fetches become `async`, mark `app/page.tsx` as an async
   Server Component and `await` each call — the section components
   (`Hero`, `Skills`, `Projects`, `Certifications`) already just take
   props/imports shaped like the data file, so nothing else changes.

## Content still to fill in

- `resumeUrl` in `data.ts` points at `/resume.pdf` — drop your actual PDF in
  `public/resume.pdf`.
- `videoEmbedUrl` for each project is a placeholder YouTube embed — swap in
  your own YouTube/Vimeo embed URLs.
- `thumbnail` paths under `public/certs/` are placeholders — add real badge
  images or swap for `<Image>` from a CMS.
- Social links and GitHub URLs in `socialLinks` / `projects` are dummy
  handles — update to yours.

## Performance & accessibility notes

- The particle field and mesh-gradient blobs are paused automatically when
  the tab isn't visible and respect `prefers-reduced-motion`.
- All floating-badge/card loops use `transform`-only animations (no
  layout-triggering properties), so they stay cheap even with many on
  screen at once.
- The certifications carousel is a native horizontal scroll-snap container,
  so it's swipeable on touch devices with no extra JS.
