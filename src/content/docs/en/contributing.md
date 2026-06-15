---
title: Contributing & Translations
description: How to add content, translate pages, and pull docs in from other repos.
order: 2
---

This page only exists in English right now. Because English is the fallback
locale, visiting `/zh/contributing` will still render this English content until
a `zh` translation is added — that's the i18n fallback in action.

## Adding a page

Create a Markdown file under `src/content/docs/<locale>/`:

```text
src/content/docs/en/my-page.md   →  /my-page
src/content/docs/zh/my-page.md   →  /zh/my-page
```

Each file needs `title` (and optionally `description`) frontmatter.

## Translating

Copy an English file into the matching locale folder and translate it. Any page
without a translation automatically falls back to English.

## Docs from other org repos

Content can also come from a `site/` directory in **any** repo in the org. List
the repo in `content.sources.json`, and the sync script pulls its `site/`
content in at build time under a namespaced path. See the project README for
details.
