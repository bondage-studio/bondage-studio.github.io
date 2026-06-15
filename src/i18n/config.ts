/**
 * Single source of truth for the site's languages.
 *
 * To add a new language (e.g. Traditional Chinese or German), add its code to
 * `locales` and a display name to `localeNames`. Everything else — routing,
 * the language picker, the content fallback — derives from this file.
 *
 * English (`defaultLocale`) is the fallback: it is served unprefixed at the
 * site root, and any page missing a translation falls back to its English
 * version.
 */
export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Human-readable names shown in the language picker. */
export const localeNames: Record<string, string> = {
  en: 'English',
  zh: '简体中文',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
