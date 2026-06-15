import type { Locale } from '../i18n/config';

/**
 * Featured projects shown on the homepage. Descriptions are keyed by locale and
 * fall back to English. Edit this list as the org grows.
 */
export interface Project {
  name: string;
  repo: string;
  description: Partial<Record<Locale, string>> & { en: string };
  icon?: string;
}

export const projects: Project[] = [
  {
    name: 'BC Mod Manager',
    repo: 'bondage-studio/bc-mod-manager',
    icon: '🧩',
    description: {
      en: 'A FUSAM-compatible mod manager and loader for Bondage Club, with registry management, load-state observability, content-hash update caching, and crash diagnostics.',
      zh: '兼容 FUSAM 的 Bondage Club 模组管理器与加载器，提供 registry 管理、加载状态观测、按内容 hash 的更新缓存与崩溃诊断。',
    },
  },
  {
    name: 'BCX Item Rules',
    repo: 'bondage-studio/BCX-Item-Rules',
    icon: '🧰',
    description: {
      en: 'Links locally registered crafted item names to BCX rules, applying the rule payload through BCX when a matching item is worn.',
      zh: '将本地注册的手工物品名称关联到 BCX 规则；当穿戴匹配物品时通过 BCX 应用对应规则。',
    },
  },
  {
    name: 'Studio Bondage Club',
    repo: 'bondage-studio/studio-bondage-club',
    icon: '💻',
    description: {
      en: 'A local reverse-proxy HTTP cache and admin panel for Bondage Club, written in modern C++ — caches game assets on disk and proxies the game socket so the client can run locally.',
      zh: '为 Bondage Club 打造的本地反向代理 HTTP 缓存与管理面板，使用现代 C++ 编写：将游戏资源缓存到本地磁盘并代理游戏 socket，使客户端可在本地运行。',
    },
  },
];
