# Mattia Patruno — CV

Static bilingual Astro portfolio with a hand-authored Materia-inspired visual system.

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

During development open `http://localhost:4321/` (anche `http://localhost:4321/cv` è disponibile per comodità). Production builds default to `https://m3ttiw.github.io/cv`; set `SITE_URL` when deploying to a custom domain and Astro will build links from the domain root.

All CV copy lives in `src/data/cv.ts`. Replace the empty contact values and the monogram fallback when the real links and profile image are available.
