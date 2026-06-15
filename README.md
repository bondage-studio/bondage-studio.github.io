# bondage-studio.github.io

The website for the [**Bondage Studio**](https://github.com/bondage-studio) GitHub
organization — a community building open-source tools and mods for the
[Bondage Club](https://www.bondageprojects.com/) community.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com),
deployed to GitHub Pages via GitHub Actions.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # syncs external docs, then builds to ./dist
npm run preview    # preview the production build
npm run check      # astro + TypeScript checks
```

## Project layout

```
src/
├─ i18n/
│  ├─ config.ts          # languages live here — single source of truth
│  ├─ ui.ts              # UI strings (nav, hero, footer …) per locale
│  └─ utils.ts           # translator, path helpers, doc-id parsing
├─ content/docs/
│  ├─ en/  zh/  …        # locally authored pages, one folder per locale
│  └─ _ext/<name>/…      # docs synced from other org repos (git-ignored)
├─ content.config.ts     # the `docs` content collection + schema
├─ components/           # Header, Footer, LanguagePicker, Home …
├─ layouts/BaseLayout.astro
├─ data/projects.ts      # featured projects on the homepage
└─ pages/[...slug].astro # one catch-all route → homepage + all docs, all locales
scripts/sync-content.mjs  # pulls docs from other repos' site/ dirs
content.sources.json      # which repos to pull docs from
.github/workflows/deploy.yml
```

## Internationalization

English is the **default and fallback** locale; it is served unprefixed
(`/about`). Other locales are path-prefixed (`/zh/about`).

- **Languages are defined in one place:** [`src/i18n/config.ts`](src/i18n/config.ts).
  To add Traditional Chinese or German, add the code to `locales` and a name to
  `localeNames` — routing, the language picker, and fallback all follow.
- **UI strings** live in [`src/i18n/ui.ts`](src/i18n/ui.ts). Missing keys fall
  back to English automatically.
- **Pages** are Markdown in `src/content/docs/<locale>/`. A page that has no
  translation in the active locale renders its English version at the localized
  URL (e.g. `/zh/contributing` serves the English `contributing.md` until a `zh`
  version exists).

### Authoring a page

```text
src/content/docs/en/guides/setup.md   →  /guides/setup
src/content/docs/zh/guides/setup.md   →  /zh/guides/setup
```

Frontmatter:

```yaml
---
title: Setup guide
description: Optional short summary.
order: 10        # optional — lower sorts first
hidden: false    # optional — keep routable but out of generated nav
---
```

## Docs from other org repos

Any repo in the org can ship its own docs in a `site/` directory and have them
appear on this site, namespaced under its own path.

**Convention** — in the source repo:

```text
site/en/getting-started.md
site/zh/getting-started.md
```

**Register it** in [`content.sources.json`](content.sources.json):

```json
{
  "sources": [
    { "name": "bcx", "repo": "bondage-studio/BCX-Item-Rules", "ref": "main", "dir": "site" }
  ]
}
```

At build time `npm run sync` shallow-clones each source (sparse-checking out only
`dir`) into `src/content/docs/_ext/<name>/`, so the example above publishes:

```text
/bcx/getting-started        (English)
/zh/bcx/getting-started     (Chinese, or English fallback)
```

Synced content is git-ignored — it is regenerated on every build. Run it
manually with `npm run sync`, or clear it with `npm run sync -- --clean`. Use
`--strict` to fail the build if a source can't be fetched. Private source repos
are supported via a `GITHUB_TOKEN`/`SYNC_TOKEN` env var (the workflow sets this).

### Auto-rebuild when a source repo changes

Add a step to the **source** repo's CI to ping this site after its docs change:

```yaml
- uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ secrets.SITE_DISPATCH_TOKEN }}   # PAT with repo scope on the site
    repository: bondage-studio/bondage-studio.github.io
    event-type: sync-docs
```

The deploy workflow listens for the `sync-docs` `repository_dispatch` event.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which installs, syncs external docs, builds, and publishes to GitHub Pages.

**One-time setup:** in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**.
