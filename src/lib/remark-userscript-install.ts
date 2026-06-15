import { defaultLocale, locales, type Locale } from '../i18n/config';

/**
 * Remark plugin: renders a generic "install this userscript" guide.
 *
 * Authors drop a fenced code block tagged `userscript-install` into any doc
 * (works in plain Markdown synced from other org repos):
 *
 * ```userscript-install
 * url: https://example.com/Script.user.js
 * name: My Script            # optional, used in the button + headings
 * manager: Tampermonkey      # optional, defaults to Tampermonkey
 * ```
 *
 * The block is replaced with the rendered output of the real
 * `UserscriptInstall.astro` component (via Astro's Container API), so the markup
 * lives in one normal Astro component instead of hand-built HTML strings. Copy
 * comes from the central i18n table (`src/i18n/ui.ts`, `userscript.*` keys),
 * localized from the doc's path (e.g. `.../zh/...` renders Chinese).
 *
 * If the `url` key is missing the block is left untouched, degrading to a
 * readable code block.
 */

const FENCE_LANG = 'userscript-install';

interface MdNode {
  type: string;
  lang?: string;
  value?: string;
  children?: MdNode[];
}

interface Config {
  url?: string;
  name?: string;
  manager?: string;
}

type AstroContainer = Awaited<
  ReturnType<(typeof import('astro/container'))['experimental_AstroContainer']['create']>
>;

// The Astro container is reused across all docs in a build.
let containerPromise: Promise<AstroContainer> | null = null;

async function getContainer() {
  if (!containerPromise) {
    containerPromise = import('astro/container').then((m) =>
      m.experimental_AstroContainer.create(),
    );
  }
  return containerPromise;
}

export default function remarkUserscriptInstall() {
  return async function (tree: unknown, file: { path?: string; history?: string[] }) {
    const blocks: Array<{ parent: MdNode; index: number; config: Config }> = [];
    collect(tree as MdNode, blocks);
    if (blocks.length === 0) return;

    const locale = detectLocale(file);
    const [{ default: UserscriptInstall }, container] = await Promise.all([
      import('../components/UserscriptInstall.astro'),
      getContainer(),
    ]);

    for (const { parent, index, config } of blocks) {
      const html = await container.renderToString(UserscriptInstall, {
        props: { ...config, locale },
      });
      parent.children![index] = { type: 'html', value: html };
    }
  };
}

function collect(
  node: MdNode,
  out: Array<{ parent: MdNode; index: number; config: Config }>,
): void {
  if (!Array.isArray(node.children)) return;
  node.children.forEach((child, index) => {
    if (child.type === 'code' && child.lang === FENCE_LANG) {
      const config = parseConfig(child.value ?? '');
      if (config.url) {
        out.push({ parent: node, index, config });
        return;
      }
    }
    collect(child, out);
  });
}

function detectLocale(file: { path?: string; history?: string[] }): Locale {
  const path = (file.path ?? file.history?.[0] ?? '').replace(/\\/g, '/');
  for (const seg of path.split('/')) {
    if ((locales as readonly string[]).includes(seg)) return seg as Locale;
  }
  return defaultLocale;
}

function parseConfig(body: string): Config {
  const config: Config = {};
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (key === 'url' || key === 'name' || key === 'manager') config[key] = value;
  }
  return config;
}