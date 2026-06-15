import type { Locale } from './config';

/**
 * UI strings for chrome (nav, hero, footer …). Page/article content lives in
 * content collections instead — see src/content/docs.
 *
 * Keys missing from a non-default locale automatically fall back to English
 * (see getTranslations in ./utils).
 */
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.docs': 'Docs',
    'nav.guide': 'Guide',
    'nav.github': 'GitHub',

    'hero.eyebrow': 'Documentation',
    'hero.title': 'Bondage Studio Docs',
    'hero.subtitle': 'Guides and references for the open-source tools, mods, and clients the Bondage Studio community builds around Bondage Club.',

    'landing.readMore': 'Read more',

    'lang.label': 'Language',
    'notfound.title': 'Page not found',
    'notfound.home': 'Back home',
  },
  zh: {
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.docs': '文档',
    'nav.guide': '指南',
    'nav.github': 'GitHub',

    'hero.eyebrow': '文档',
    'hero.title': 'Bondage Studio 文档',
    'hero.subtitle': 'Bondage Studio 社区围绕 Bondage Club 构建的开源工具、模组与客户端的指南与参考。',

    'landing.readMore': '阅读更多',

    'lang.label': '语言',
    'notfound.title': '页面未找到',
    'notfound.home': '返回首页',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
