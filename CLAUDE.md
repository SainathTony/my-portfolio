# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio for Sainath Bottupally (senior full-stack engineer, applied AI), built with React 19, TypeScript, Vite and Tailwind CSS 3, deployed to GitHub Pages under `/my-portfolio/`.

The visual identity is **"Lab Notebook"**: warm paper, ink, vermilion and fountain-pen blue, with hand-drawn marks and one real 3D moment (an agent-spec page that folds itself into a paper plane). There is intentionally **no dark mode** — paper is the identity.

## Development Commands

```bash
yarn dev       # dev server
yarn build     # tsc + vite build
yarn preview   # serve the production build
yarn lint      # eslint --fix
yarn format    # prettier
yarn deploy    # build + publish dist/ to gh-pages
```

## Architecture

- `src/App.tsx` — composes `Nav` and the sections in order (Hero, AIWork, Work, Experience, Toolbox, About, Contact, Footer) inside `MotionConfig reducedMotion="user"`.
- `src/data/portfolioData.ts` — **all copy and facts**. Every claim must trace to the résumé; change numbers here only. Types live in `src/types/portfolio.ts`.
- `src/sections/*` — one file per section.
- `src/components/ink.tsx` — paper/ink primitives: `Reveal` (the single entrance animation), `Highlight` (highlighter, metrics only), `HandCircle`, `HandUnderline`, `DrawPath`, `Stamp`, `Tape`, `SectionHeader`. Hand marks measure their own box and draw in real pixels (framer's `pathLength` breaks with `vector-effect: non-scaling-stroke`, so don't use that on animated paths).
- `src/lib/sketch.ts` — seeded generators for wobbly lines, boxes, ellipses, arrows and squiggles (deterministic per seed).
- `src/components/plane/` — the hero 3D:
  - `PaperPlane.tsx` shows a hand-drawn SVG poster, lazy-loads the scene after idle, crossfades to the canvas, and draws the dashed pencil trail to the tail position the scene reports.
  - `paperPlaneScene.ts` is plain three.js (no R3F). A dense sheet mesh is folded by rigid rotations about crease axes; vertices near creases are snapped onto them so folded edges stay straight. The spec text on the page is painted to a CanvasTexture in `drawSpecTexture`. VSM soft shadows land on an invisible ShadowMaterial "page". Rendering pauses off-screen; reduced motion shows the folded plane static.
- `src/components/TiltCard.tsx` — CSS-3D hover tilt for index cards.

## Styling

- Tokens are CSS variables in `src/index.css` mirrored in `tailwind.config.js` (`paper`, `ink`, `vermilion`, `fountain`, `highlight`, …).
- Paper types are component classes: `.sheet`, `.paper-dots`, `.paper-graph`, `.paper-ruled` (+ `.ruled-offset`), `.index-card`, `.tape`, `.hl`, `.curl`.
- Fonts (Google Fonts, linked in `index.html`): Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (labels), Kalam (handwritten annotations only — at most one per viewport).
- Don't rotate sheets that carry body text; get the hand-placed feel from tape, stamps and small offsets.

## Key Dependencies

React 19, framer-motion (all DOM animation), three (hero only, lazy chunk), Tailwind CSS 3.
