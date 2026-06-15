import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { defaultLocale, locales } from './src/i18n/config';
import remarkUserscriptInstall from './src/lib/remark-userscript-install';

// https://astro.build/config
export default defineConfig({
  // Org/user GitHub Pages site is served from the domain root.
  site: 'https://bondage-studio.github.io',

  markdown: {
    // Renders ```userscript-install fenced blocks into a localized install
    // guide (see src/lib/remark-userscript-install.ts).
    remarkPlugins: [remarkUserscriptInstall],
  },

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
