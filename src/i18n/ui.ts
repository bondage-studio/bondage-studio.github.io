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

    // Userscript install guide (rendered by components/UserscriptInstall.astro).
    // {name} {manager} {managerLink} {install} {guideLink} are filled in by the component.
    'userscript.managerTitle': 'Install a userscript manager',
    'userscript.managerDesc': 'A userscript manager runs the script in your browser. {managerLink} is recommended — it works on Chrome, Edge, Firefox, Safari, and Android.',
    'userscript.enableTitle': 'Chrome &amp; Edge: turn on userscripts',
    'userscript.enableDesc': 'Chrome and Edge no longer run userscripts until you allow it. Open your browser’s <strong>Extensions</strong> page (<code>chrome://extensions</code> or <code>edge://extensions</code>), find {manager}, open <strong>Details</strong>, and switch on <strong>Allow user scripts</strong>. On older versions, turn on <strong>Developer mode</strong> instead. Firefox and Safari need no extra step.',
    'userscript.installTitle': 'Open the install link',
    'userscript.installTitleNamed': 'Open the install link for {name}',
    'userscript.installDesc': 'Click the button below. Your userscript manager will intercept it and open its install page.',
    'userscript.button': 'Install {name}',
    'userscript.buttonGeneric': 'Install userscript',
    'userscript.installWord': 'Install',
    'userscript.confirmTitle': 'Confirm the installation',
    'userscript.confirmDesc': 'Review the script details and click {install} in {manager}. Updates are handled automatically afterwards.',
    'userscript.guideText': 'On a phone, on Safari, or the script will not run? See the full {guideLink}.',
    'userscript.guideLinkText': 'cross-device install &amp; troubleshooting guide',

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

    // 用户脚本安装引导（由 components/UserscriptInstall.astro 渲染）。
    // {name} {manager} {managerLink} {install} {guideLink} 由组件填充。
    'userscript.managerTitle': '安装用户脚本管理器',
    'userscript.managerDesc': '用户脚本管理器负责在浏览器中运行脚本。推荐使用 {managerLink}——它支持 Chrome、Edge、Firefox、Safari 与 Android。',
    'userscript.enableTitle': 'Chrome 与 Edge：开启用户脚本',
    'userscript.enableDesc': 'Chrome 和 Edge 默认不再运行用户脚本，需要你手动允许。打开浏览器的<strong>扩展</strong>页面（<code>chrome://extensions</code> 或 <code>edge://extensions</code>），找到 {manager}，进入<strong>详细信息</strong>，打开 <strong>允许用户脚本</strong>（Allow user scripts）开关。较旧的版本请改为打开<strong>开发者模式</strong>。Firefox 和 Safari 无需此步骤。',
    'userscript.installTitle': '打开安装链接',
    'userscript.installTitleNamed': '打开 {name} 的安装链接',
    'userscript.installDesc': '点击下方按钮，用户脚本管理器会拦截该链接并打开安装页面。',
    'userscript.button': '安装 {name}',
    'userscript.buttonGeneric': '安装用户脚本',
    'userscript.installWord': '安装',
    'userscript.confirmTitle': '确认安装',
    'userscript.confirmDesc': '检查脚本信息，然后在 {manager} 中点击 {install}。之后更新会自动完成。',
    'userscript.guideText': '在手机上、使用 Safari，或者脚本无法运行？请查看完整的{guideLink}。',
    'userscript.guideLinkText': '跨设备安装与排错指南',

    'lang.label': '语言',
    'notfound.title': '页面未找到',
    'notfound.home': '返回首页',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
