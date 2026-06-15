import { defaultLocale, isLocale, locales, type Locale } from './config';
import { ui, type UIKey } from './ui';

/**
 * Extract the active locale from a request URL. The default locale is served
 * unprefixed (e.g. `/about`), other locales are prefixed (e.g. `/zh/about`).
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (maybeLocale && isLocale(maybeLocale)) return maybeLocale;
  return defaultLocale;
}

/**
 * Returns a translator bound to `locale`. Missing keys fall back to the
 * default locale, so a partially-translated language still renders.
 */
export function getTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key];
  };
}

/** Prefix a path with the locale (default locale stays unprefixed). */
export function localizePath(path: string, locale: Locale): string {
  const clean = `/${path}`.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Parse a content-collection entry id into its locale and locale-independent
 * URL path.
 *
 * Disk layout:
 *   src/content/docs/<locale>/<...path>          → locally authored content
 *   src/content/docs/_ext/<section>/<locale>/... → content synced from other
 *                                                  org repos (see scripts/sync-content.mjs)
 *
 * The `_ext/<section>` prefix keeps each external repo namespaced both on disk
 * and in the URL (e.g. `/bcx/getting-started`).
 */
export function parseDocId(id: string): {
  locale: Locale;
  /** locale-independent url path, e.g. "about" or "bcx/getting-started" */
  urlPath: string;
} {
  const parts = id.split('/').filter(Boolean);
  if (parts[0] === '_ext') {
    const [, section, locale, ...rest] = parts;
    return {
      locale: isLocale(locale) ? locale : defaultLocale,
      urlPath: [section, ...rest].join('/'),
    };
  }
  const [locale, ...rest] = parts;
  return {
    locale: isLocale(locale) ? locale : defaultLocale,
    urlPath: rest.join('/'),
  };
}

export { defaultLocale, locales };
export type { Locale };
