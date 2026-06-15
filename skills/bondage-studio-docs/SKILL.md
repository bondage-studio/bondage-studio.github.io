---
name: bondage-studio-docs
description: >-
  Onboard a project's documentation into the Bondage Studio website
  (bondage-studio.github.io). Use when a repo in the bondage-studio org needs to
  publish docs to the org site: scaffolding its `site/` directory and localized
  Markdown, registering it as a content source, and wiring the GitHub Actions
  hook that rebuilds the site when docs change. Triggers on requests like "add
  docs to the org website", "publish this project's guide on the studio site",
  or "set up the docs sync hook".
---

# Bondage Studio docs onboarding

This skill sets up a project so its documentation appears on the central org
website **bondage-studio.github.io**. The site (Astro + i18n) aggregates docs
from the `site/` directory of any org repo at build time, namespaced under the
project's own URL path.

## How the system works

- Each source repo keeps its docs in a `site/<locale>/…md` tree.
- The website's sync script shallow-clones each registered repo and copies its
  `site/` into `src/content/docs/_ext/<name>/`, publishing them under
  `https://bondage-studio.github.io/<name>/…` (and `/<locale>/<name>/…`).
- **English (`en`) is the default and fallback locale.** A page missing a
  translation renders its English version at the localized URL.
- A `repository_dispatch` hook from the source repo triggers a site rebuild when
  docs change, so published docs stay current.

Currently active locales: `en` (fallback) and `zh`. The site can add more later
(e.g. `zh-TW`, `de`); author what you have — untranslated pages fall back to
English automatically. **Never** invent translations you can't verify; leave a
locale absent and let it fall back.

## Conventions (follow exactly)

**Directory layout** in the source repo:

```text
site/
├─ en/
│  ├─ index.md            → /<name>/
│  ├─ getting-started.md  → /<name>/getting-started
│  └─ guides/usage.md     → /<name>/guides/usage
└─ zh/
   ├─ index.md            → /zh/<name>/
   └─ getting-started.md  → /zh/<name>/getting-started
```

- `<name>` is the source's registered name (URL namespace), not the repo name —
  keep it short, lowercase, hyphenated (e.g. `bcx`, `headless-client`).
- Mirror the **same relative paths** across locales. A path that exists only in
  `en/` is fine (it falls back); a path that exists only in `zh/` is unreachable
  in English and should be avoided.
- Filenames become URL segments; use lowercase-hyphenated names. `index.md` maps
  to the namespace/section root.

**Frontmatter** — every Markdown file needs this YAML header:

```yaml
---
title: Getting started          # required
description: One-line summary.  # optional, used for <meta> and page subtitle
order: 10                       # optional, lower sorts first in nav
hidden: false                   # optional, keep routable but out of nav
---
```

Body is standard Markdown (headings, lists, code fences, blockquotes, links).
The site styles `h1` from `title`, so start body content at `##`.

## Steps

### 1. Scaffold the `site/` docs

Create `site/en/` (required) and `site/zh/` (if Chinese content exists). At
minimum create `site/en/index.md` as the project's landing page. Use
`templates/example-doc.md` in this skill as a starting point. Translate into
`site/zh/…` only where you have accurate content.

### 2. Add the rebuild hook (GitHub Actions)

Copy `templates/notify-site.yml` into the source repo at
`.github/workflows/notify-site.yml`. It fires a `sync-docs`
`repository_dispatch` to the website repo whenever files under `site/` change on
the default branch.

The dispatch crosses repository boundaries, so the workflow-default
`GITHUB_TOKEN` **cannot** be used (it is scoped to the repo it runs in).
Authenticate with a **GitHub App** instead — short-lived tokens, least
privilege, not tied to a personal account. The workflow mints an installation
token via `actions/create-github-app-token`, then dispatches.

**One-time org setup** (an org owner does this once; all source repos reuse it):

1. Create a GitHub App owned by the org —
   `https://github.com/organizations/bondage-studio/settings/apps/new`
   (it's under **Org Settings → Developer settings → GitHub Apps**, at the very
   bottom of the sidebar, visible to owners only). If you lack owner access, an
   App created under a personal account and installed on the org works
   identically.
   - **Repository permissions → Contents: Read and write** (required to trigger
     `repository_dispatch`); everything else No access.
   - Uncheck **Webhook → Active** (the App only signs tokens).
2. Note the **App ID**; **Generate a private key** and download the `.pem`.
3. **Install App** on the `bondage-studio` org, with access to at least the
   `bondage-studio.github.io` repo.
4. Add credentials (org-level so every source repo inherits them):
   - Variable **`SITE_DISPATCH_APP_ID`** = the App ID
   - Secret **`SITE_DISPATCH_APP_PRIVATE_KEY`** = the full `.pem` contents

If the org has already done this setup for another repo, just add the workflow —
the org-level App ID/key are already in place. Never hardcode the private key.

### 3. Register the source on the website

The website reads `content.sources.json`. Add an entry there (in the
**bondage-studio.github.io** repo — open a PR if you don't have direct access):

```json
{
  "name": "<name>",
  "repo": "bondage-studio/<this-repo>",
  "ref": "main",
  "dir": "site"
}
```

Place it inside the `"sources"` array. Drop any `"$example": true` placeholder.
Choose `<name>` to be unique across all registered sources (it's the URL
namespace). If you cannot edit the website repo in this session, output the exact
JSON snippet and ask the user to add it (or to file the PR).

### 4. Verify

- Confirm every `site/**/*.md` has valid `title` frontmatter.
- Confirm `en/` exists for each path that exists in another locale.
- If you have the website repo checked out, run `npm run sync && npm run build`
  there and check the new routes appear; otherwise note that the deploy workflow
  will surface any issues.

## Checklist

- [ ] `site/en/index.md` exists with valid frontmatter
- [ ] Other pages added; locale trees mirror each other (en is complete)
- [ ] `.github/workflows/notify-site.yml` added to the source repo
- [ ] GitHub App exists + installed on the org; `SITE_DISPATCH_APP_ID` (var) and
      `SITE_DISPATCH_APP_PRIVATE_KEY` (secret) configured (skip if org already did this)
- [ ] Source registered in the website's `content.sources.json` (or snippet handed off)

## Gotchas

- Don't commit machine-translated or guessed locale content — rely on fallback.
- `<name>` collisions silently overwrite another source's docs; keep it unique.
- The hook only triggers on changes under `site/`; unrelated commits won't
  needlessly rebuild the site.
- Synced docs are regenerated on every site build and are git-ignored on the
  website side — never edit `src/content/docs/_ext/` there by hand.
