import type { Locale } from '../i18n/config';

/**
 * Featured projects shown on the homepage. Descriptions are keyed by locale and
 * fall back to English. Edit this list as the org grows.
 */
export interface Project {
  name: string;
  repo: string; // owner/name on GitHub
  description: Partial<Record<Locale, string>> & { en: string };
  icon?: string;
}

export const projects: Project[] = [
  {
    name: 'BCX',
    repo: 'bondage-studio/BCX-Item-Rules',
    icon: '🧰',
    description: {
      en: 'Extension toolkit adding rules, curses, and quality-of-life features to Bondage Club.',
      zh: '为 Bondage Club 添加规则、诅咒与各种便利功能的扩展工具集。',
    },
  },
  {
    name: 'Headless Client',
    repo: 'bondage-studio/bondage-club-headless-client',
    icon: '🤖',
    description: {
      en: 'A headless Bondage Club client for bots, automation, and integration testing.',
      zh: '用于机器人、自动化与集成测试的无头 Bondage Club 客户端。',
    },
  },
  {
    name: 'Local Client',
    repo: 'bondage-studio/bondage-club-local-client',
    icon: '💻',
    description: {
      en: 'Run Bondage Club locally for development and offline tinkering.',
      zh: '在本地运行 Bondage Club，便于开发与离线折腾。',
    },
  },
];
