---
title: Installing Userscripts
description: Set up a userscript manager on any browser or device, and fix the Chrome/Edge "scripts won't run" problem.
order: 3
---

Most Bondage Studio tools (BCX, BCX Item Rules, and others) ship as **userscripts**.
A userscript is a small piece of JavaScript that a **userscript manager** loads
into the game for you. You install the manager once, install the script once, and
both update themselves afterwards.

This guide gets you from nothing to a working setup on **any browser or device**,
and fixes the most common snag — **Chrome and Edge no longer run userscripts until
you turn the feature on.**

> **In a hurry on desktop Chrome/Edge?**
> 1. Install [Tampermonkey](https://www.tampermonkey.net/).
> 2. Open `chrome://extensions` -> Tampermonkey -> **Details** -> enable **Allow user scripts**.
> 3. Open the script's install link and click **Install**.
>
> The rest of this page explains each step and covers other browsers and phones.

## Step 1 — Install a userscript manager

A userscript manager is a browser extension that runs scripts. **[Tampermonkey](https://www.tampermonkey.net/)**
is the recommended choice everywhere; [Violentmonkey](https://violentmonkey.github.io/)
also works if you prefer open source.

Pick your browser:

| Browser | What to install |
| --- | --- |
| **Chrome** | [Tampermonkey on the Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| **Edge** | [Tampermonkey on the Edge Add-ons store](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| **Firefox** | [Tampermonkey on Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| **Safari (macOS)** | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) (free, open source) or Tampermonkey from the App Store |
| **Brave / Opera / Vivaldi** | Chromium-based — use the **Chrome Web Store** link above |

After installing, you should see the Tampermonkey icon (a black square with two
circles) near your browser's address bar. Pin it if it's hidden in the
extensions (puzzle-piece) menu.

## Step 2 — Chrome & Edge only: turn on userscripts

This is the step most people miss. Since the move to Manifest V3, **Chrome and
Edge block userscripts by default** — Tampermonkey installs fine but scripts
silently do nothing until you grant permission. Firefox and Safari do **not**
need this step.

**Chrome 138+ and current Edge** — turn on a dedicated toggle:

1. Open `chrome://extensions` (Edge: `edge://extensions`) in the address bar.
2. Find **Tampermonkey** and click **Details**.
3. Scroll down and switch on **Allow user scripts**.

**Older Chrome / Edge (before the toggle existed)** — enable Developer mode instead:

1. Open `chrome://extensions`.
2. Toggle **Developer mode** on (top-right corner).
3. Leave it on — Tampermonkey needs it to run scripts.

> If you ever see Tampermonkey show a red exclamation badge, or a script you
> installed does nothing, this toggle is almost always the cause. Re-check it
> after major browser updates, which can reset it.

## Step 3 — Install the script

With the manager in place (and userscripts allowed on Chrome/Edge), installing a
script is one click:

1. Open the script's **install link** — for example, from a project's install
   page on this site, or its `*.user.js` URL.
2. Tampermonkey intercepts the link and opens an install page showing the
   script's name, version, and the sites it runs on.
3. Click **Install**.

That's it. The script now runs automatically whenever you open Bondage Club, and
Tampermonkey keeps it up to date.

## Step 4 — Verify it works

1. Open Bondage Club on a supported domain (e.g. `bondageprojects.com`) and log in.
2. Open the Tampermonkey icon — the installed script should be listed and
   **enabled** (a number badge on the icon means scripts are active on the page).
3. Open the tool's in-game menu (for BCX-based tools, the **extension settings
   menu**) to confirm it loaded.

## Phones & tablets

Userscripts work on mobile, but the browser choice matters.

### Android

Use a browser that supports extensions:

- **Firefox for Android** — install [Tampermonkey from Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/). Easiest option, no extra configuration.
- **Edge for Android** — supports a small set of extensions including Tampermonkey.
- **Kiwi Browser** or other Chromium-based browsers that allow Chrome Web Store
  extensions — install Tampermonkey, then (as on desktop Chrome) enable
  **Developer mode** / **Allow user scripts** in the browser's `chrome://extensions`
  page so scripts can run.

The default **Chrome for Android does not support extensions** — it can't run
userscripts. Use one of the browsers above instead.

### iPhone & iPad (iOS / iPadOS)

Safari supports userscripts through a Safari **web-extension** app:

1. Install **[Userscripts](https://apps.apple.com/app/userscripts/id1463298887)**
   (free, open source) from the App Store.
2. Open **Settings -> Apps -> Safari -> Extensions** (older iOS: **Settings -> Safari -> Extensions**),
   enable **Userscripts**, and allow it to run on **All Websites**.
3. Open the Userscripts app, tap the share/add button, and add the script by its
   `*.user.js` URL (or paste its contents).
4. Open Bondage Club in Safari — tap the **ᴀA** menu in the address bar ->
   **Userscripts** to confirm the script is active.

## Troubleshooting

**The script installed but nothing happens (Chrome/Edge).** You almost certainly
skipped [Step 2](#step-2--chrome--edge-only-turn-on-userscripts). Enable **Allow
user scripts** (or **Developer mode**) on the extensions page. A browser update
can silently reset this — re-check it.

**Tampermonkey shows a warning / exclamation icon.** Same cause as above on
Chrome/Edge: userscripts aren't allowed yet.

**The script doesn't run on the game page.** Confirm the page's domain is one the
script targets (e.g. `bondageprojects.com`, `bondage-europe.com`,
`bondage-asia.com`, including `www.` variants), and that the script is **enabled**
in the Tampermonkey dashboard.

**Two managers installed at once.** Don't run Tampermonkey and Violentmonkey (or
two copies) together — they conflict. Keep one.

**Still stuck?** Open an issue on the relevant project in the
[Bondage Studio organization on GitHub](https://github.com/bondage-studio).
