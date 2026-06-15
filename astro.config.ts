import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { defaultLocale, locales } from './src/i18n/config';

// https://astro.build/config
export default defineConfig({
  // Org/user GitHub Pages site is served from the domain root.
  site: 'https://bondage-studio.github.io',

  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: {
      // English (default) is served unprefixed at the root; other locales are
      // prefixed (/zh/...). Per-page content fallback is handled explicitly in
      // the catch-all route's getStaticPaths.
      prefixDefaultLocale: false,
    },
  },

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
