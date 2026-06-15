---
title: Project name
description: One sentence describing what this project is.
order: 1
---

Start the body at level-two headings — the page `<h1>` is rendered from the
`title` above.

## Overview

What this project does and who it's for.

## Installation

For a userscript, use the shared install-guide block (renders the
Tampermonkey-install steps + button, localized automatically) — don't hand-write
the steps:

```userscript-install
url: https://bondage-studio.github.io/<name>/Script.user.js
name: Project name
```

Otherwise, list the commands:

```bash
# commands here
```

## Usage

Walk through the common workflow. Link to other pages in this project with
relative paths, e.g. [guides/usage](guides/usage), or to other org projects with
absolute site paths, e.g. [/headless-client/](/headless-client/).

> Tip: leave a locale absent rather than guessing a translation — the site falls
> back to English automatically.
