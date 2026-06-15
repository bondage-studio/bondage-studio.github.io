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

    // Userscript install guide (rendered by remark-userscript-install).
    // {name} {manager} {managerLink} {install} are filled in by the plugin.
    'userscript.managerTitle': 'Install a userscript manager',
    'userscript.managerDesc': 'A userscript manager runs the script in your browser. {managerLink} is recommended (Chrome, Edge, Firefox).',
    'userscript.installTitle': 'Open the install link',
    'userscript.installTitleNamed': 'Open the install link for {name}',
    'userscript.installDesc': 'Click the button below. Your userscript manager will intercept it and open its install page.',
    'userscript.button': 'Install {name}',
    'userscript.buttonGeneric': 'Install userscript',
    'userscript.installWord': 'Install',
    'userscript.linkLabel': 'Direct link',
    'userscript.confirmTitle': 'Confirm the installation',
    'userscript.confirmDesc': 'Review the script details and click {install} in {manager}. Updates are handled automatically afterwards.',

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

    // 用户脚本安装引导（由 remark-userscript-install 渲染）。
    // {name} {manager} {managerLink} {install} 由插件填充。
    'userscript.managerTitle': '安装用户脚本管理器',
    'userscript.managerDesc': '用户脚本管理器负责在浏览器中运行脚本。推荐使用 {managerLink}（支持 Chrome、Edge、Firefox）。',
    'userscript.installTitle': '打开安装链接',
    'userscript.installTitleNamed': '打开 {name} 的安装链接',
    'userscript.installDesc': '点击下方按钮，用户脚本管理器会拦截该链接并打开安装页面。',
    'userscript.button': '安装 {name}',
    'userscript.buttonGeneric': '安装用户脚本',
    'userscript.installWord': '安装',
    'userscript.linkLabel': '直接链接',
    'userscript.confirmTitle': '确认安装',
    'userscript.confirmDesc': '检查脚本信息，然后在 {manager} 中点击 {install}。之后更新会自动完成。',

    'lang.label': '语言',
    'notfound.title': '页面未找到',
    'notfound.home': '返回首页',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
