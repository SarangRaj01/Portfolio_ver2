# Sarang Raj — Interactive Resume

React 19 + TypeScript + Vite 8, Tailwind CSS 4, Anime.js 4 (scroll observer, timelines, splitText, stagger), Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
```

## Editing content

All personal and professional details live in `src/content/resume.ts` (sourced from the resume PDF).
Replace `public/Sarang_Raj_Resume.pdf` to update the download.

## Structure

- `src/components/` — Nav, Hero, About, Skills, Projects/ProjectCard, Education, Contact, Footer, SectionHeading, TickRing
- `src/motion/setup.ts` — every Anime.js animation; `tokens.ts` — durations, easings, thresholds
- `src/index.css` — design tokens and styles

Motion is failure-safe (nothing is hidden in CSS), respects `prefers-reduced-motion`, and only pins the skills stage on large screens.
