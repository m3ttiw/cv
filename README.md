# Angular CV Template (overlay for `ng new cv-site`)

This package contains only the **files to add/replace** on top of a fresh Angular app created with the CLI (Angular 17+).

## Quick start

```bash
# 1) Create the base Angular project
npm install -g @angular/cli
ng new cv-site --routing --style=scss
cd cv-site

# 2) Unzip the overlay into the project root (this will add/replace some files)
#    (On macOS/Linux)
unzip ../angular-cv-template.zip -d .
#    (On Windows PowerShell)
#    Expand-Archive -Path ..\angular-cv-template.zip -DestinationPath . -Force

# 3) Install deps and run
npm install
npm run start  # or: ng serve

# 4) (Optional) Deploy with GitHub Actions
#    - Commit & push to a GitHub repo named `cv-site` (or your choice)
#    - In Settings → Pages, set Source: GitHub Actions
#    - Push on main branch; the workflow publishes to GitHub Pages
```

If your repository is not a user/organization page, set `--base-href /<repo-name>/` during build (already handled by the workflow example with `/cv-site/`).

---

## What’s included

- Minimal **routes** with standalone components (Profilo, Esperienza, Progetti, Contatti)
- Clean **layout** and **styles** (SCSS)
- **404.html** redirect for SPA refresh on GitHub Pages
- **GitHub Actions workflow** for automatic deploy to Pages
- Sample **assets** (avatar placeholder + cover)

Customize texts in the components and styles to match your branding.
