import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n/config';
import { getTranslations, localizePath, parseDocId } from '../i18n/utils';

type Entry = CollectionEntry<'docs'>;

export interface NavItem {
  title: string;
  description?: string;
  /** locale-independent url path, e.g. "bcx-item-rules/quick-start" */
  urlPath: string;
  /** ready-to-use, locale-prefixed href */
  href: string;
  order: number;
}

export interface NavSection {
  /** `_ext` namespace, or '' for locally authored docs */
  key: string;
  label: string;
  description?: string;
  /** link to the section's landing page, if it has one */
  href?: string;
  order: number;
  items: NavItem[];
}

/**
 * Build the documentation navigation for a locale.
 *
 * Docs are grouped into sections by their `_ext` namespace (locally authored
 * pages share the catch-all "guide" section). Within a section pages are sorted
 * by their `order` front-matter field. Missing translations fall back to the
 * default locale so every section renders in every language.
 */
export async function getNav(locale: Locale): Promise<NavSection[]> {
  const t = getTranslations(locale);
  const docs = await getCollection('docs');

  // Group entries by their locale-independent url path, then pick the localized
  // entry (or the default-locale fallback) for the requested locale.
  const byPath = new Map<string, Partial<Record<Locale, Entry>>>();
  for (const entry of docs) {
    const { locale: l, urlPath } = parseDocId(entry.id);
    if (!urlPath) continue;
    const group = byPath.get(urlPath) ?? {};
    group[l] = entry;
    byPath.set(urlPath, group);
  }

  const sections = new Map<string, NavSection>();
  for (const [urlPath, group] of byPath) {
    const entry = group[locale] ?? group[defaultLocale];
    if (!entry || entry.data.hidden) continue;

    const { section } = parseDocId(entry.id);
    const sec =
      sections.get(section) ??
      ({ key: section, label: '', order: Infinity, items: [] } as NavSection);

    const href = localizePath(urlPath, locale);
    const { title, description, order } = entry.data;

    // A `_ext` section's index page (whose url path equals the section slug)
    // becomes the section header/landing rather than a list item.
    if (section && urlPath === section) {
      sec.label = title;
      sec.description = description;
      sec.href = href;
    } else {
      sec.items.push({ title, description, urlPath, href, order });
    }
    sec.order = Math.min(sec.order, order);
    sections.set(section, sec);
  }

  const result = [...sections.values()];
  for (const sec of result) {
    if (!sec.label) sec.label = sec.key ? prettify(sec.key) : t('nav.guide');
    sec.items.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  }
  result.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  return result;
}

function prettify(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}