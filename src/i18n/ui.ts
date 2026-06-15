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
    'nav.github': 'GitHub',

    'hero.eyebrow': 'Bondage Studio',
    'hero.title': 'Tools & mods for the Bondage Club community',
    'hero.subtitle':
      'An open-source collective building extensions, clients, and utilities around Bondage Club. Crafted by the community, for the community.',
    'hero.cta.projects': 'Explore projects',
    'hero.cta.github': 'View on GitHub',

    'projects.title': 'Projects',
    'projects.subtitle': 'A few things we are working on.',

    'footer.tagline': 'Made with consent, care, and curly braces.',
    'footer.rights': 'Content is community-maintained and open source.',

    'lang.label': 'Language',
    'notfound.title': 'Page not found',
    'notfound.home': 'Back home',
  },
  zh: {
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.docs': '文档',
    'nav.github': 'GitHub',

    'hero.eyebrow': 'Bondage Studio',
    'hero.title': '为 Bondage Club 社区打造的工具与模组',
    'hero.subtitle':
      '一个开源社区，围绕 Bondage Club 构建扩展、客户端与各类实用工具。由社区创造，服务社区。',
    'hero.cta.projects': '浏览项目',
    'hero.cta.github': '在 GitHub 查看',

    'projects.title': '项目',
    'projects.subtitle': '我们正在进行的一些工作。',

    'footer.tagline': '以知情同意、用心与花括号构建。',
    'footer.rights': '所有内容由社区维护并开源。',

    'lang.label': '语言',
    'notfound.title': '页面未找到',
    'notfound.home': '返回首页',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
