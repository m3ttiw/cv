# Mattia Patruno — Portfolio

Bilingual (IT/EN) Astro portfolio for a UI/UX designer and front-end developer with a focus
on AI and process automation.

- **Hero lens**: a small automation web app drawn in HTML/CSS, viewable as finished design,
  wireframe (also revealed under the cursor as an "x-ray" lens) or component code.
- **Command palette**: `Ctrl K` / `⌘K` or `/` to jump to sections and projects, switch
  theme or language, copy the link.
- **Case studies** generated from data, with illustrated covers when no screenshot exists.
- Light and dark themes (following the system preference by default), keyboard friendly,
  reduced-motion aware, almost zero client-side JavaScript.

Type is loaded from Google Fonts: **Geist** (UI), **Instrument Serif** (italic accents) and
**Geist Mono** (labels), with system fallbacks.

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

During development open `http://localhost:4321/`. The default static build targets
`https://m3ttiw.github.io/cv`; set `SITE_URL` when deploying to a custom domain and Astro
builds links from the domain root.

### Sites build (Cloudflare)

```bash
npm run build:sites
```

Uses `astro.config.sites.mjs` with the official Cloudflare adapter and writes to
`dist-sites/`. The GitHub Pages workflow is untouched by this build.

### Social card

```bash
npm run og
```

Regenerates `public/og.png`, used for `og:image` and the Twitter/X card.

## Content

- Profile, services, process, journey, toolkit, contacts and UI copy: `src/data/cv.ts`
- Projects and case studies: `src/data/projects.ts`
- Homepage sections shared by header, footer and palette: `src/data/navigation.ts`

A project only needs `slug`, `stack`, `accent`, `mock` and a localized `title` + `summary`;
every other block (context, problem, solution, role, outcomes, gallery, links) is optional
and is simply not rendered when missing. Set `cover` to a real screenshot (e.g. under
`public/assets/<slug>/`) to replace the illustrated cover.

Contacts list only channels that actually reach Mattia: add email or LinkedIn in
`src/data/cv.ts` when they are ready.
