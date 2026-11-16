import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

/**
 * Sites build. Kept separate from `astro.config.mjs` on purpose: the GitHub Pages
 * deploy must keep its `/cv` base and plain static output, while Sites serves the
 * same pages from a Worker at the root of its own domain.
 *
 * Usage: `npm run build:sites` (Astro reads this file through `--config`).
 */
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  outDir: './dist-sites',
  devToolbar: {
    enabled: false,
  },
  site: process.env.SITE_URL?.trim() || 'https://mattia-patruno.pages.dev',
  base: undefined,
});
