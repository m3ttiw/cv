import { defineConfig } from 'astro/config';

const customSite = process.env.SITE_URL?.trim();
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  site: customSite || (isDev ? 'http://localhost:4321' : 'https://m3ttiw.github.io/cv'),
  base: isDev || customSite ? undefined : '/cv',
});
