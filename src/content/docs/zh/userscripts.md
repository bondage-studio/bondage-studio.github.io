---
title: 安装用户脚本
description: 在任意浏览器或设备上配置用户脚本管理器，并解决 Chrome/Edge“脚本不运行”的问题。
order: 3
---

大多数 Bondage Studio 工具（BCX、BCX Item Rules 等）都以**用户脚本**的形式发布。
用户脚本是一小段 JavaScript，由**用户脚本管理器**（俗称“油猴”）加载到游戏中运行。
你只需安装一次管理器、安装一次脚本，之后两者都会自动更新。

本指南会带你在**任意浏览器或设备**上从零搭好环境，并解决最常见的坑——
**Chrome 和 Edge 默认不再运行用户脚本，必须先手动开启该功能。**

> **桌面 Chrome/Edge 赶时间？**
> 1. 安装 [Tampermonkey](https://www.tampermonkey.net/)。
> 2. 打开 `chrome://extensions` -> Tampermonkey -> **详细信息** -> 开启 **允许用户脚本**（Allow user scripts）。
> 3. 打开脚本的安装链接，点击 **安装**。
>
> 本页后续会逐步讲解每一步，并覆盖其他浏览器与手机。

## 第一步 — 安装用户脚本管理器

用户脚本管理器是一个负责运行脚本的浏览器扩展。各平台都推荐
**[Tampermonkey](https://www.tampermonkey.net/)**；如果你偏好开源方案，
[Violentmonkey](https://violentmonkey.github.io/) 也可以。

选择你的浏览器：

| 浏览器 | 安装地址 |
| --- | --- |
| **Chrome** | [Chrome 应用商店中的 Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| **Edge** | [Edge 加载项中的 Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| **Firefox** | [Firefox 附加组件中的 Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| **Safari（macOS）** | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)（免费、开源）或 App Store 中的 Tampermonkey |
| **Brave / Opera / Vivaldi** | 基于 Chromium——使用上方的 **Chrome 应用商店** 链接 |

安装后，浏览器地址栏附近应出现 Tampermonkey 图标（带两个圆圈的黑色方块）。
如果它被收进扩展（拼图）菜单里，建议把它固定出来。

## 第二步 — 仅 Chrome 与 Edge：开启用户脚本

这是最多人漏掉的一步。自从迁移到 Manifest V3 后，**Chrome 和 Edge 默认会拦截用户脚本**——
Tampermonkey 能正常安装，但在你授予权限之前脚本会悄无声息地什么都不做。
Firefox 和 Safari **不需要**这一步。

**Chrome 138+ 及较新的 Edge** —— 打开专门的开关：

1. 在地址栏打开 `chrome://extensions`（Edge 为 `edge://extensions`）。
2. 找到 **Tampermonkey**，点击 **详细信息**。
3. 向下滚动，打开 **允许用户脚本**（Allow user scripts）开关。

**较旧的 Chrome / Edge（还没有该开关时）** —— 改为开启开发者模式：

1. 打开 `chrome://extensions`。
2. 打开右上角的 **开发者模式** 开关。
3. 保持开启——Tampermonkey 需要它才能运行脚本。

> 如果 Tampermonkey 图标出现红色感叹号角标，或你安装的脚本毫无反应，
> 几乎都是这个开关的问题。浏览器大版本更新后它可能被重置，记得重新检查。

## 第三步 — 安装脚本

装好管理器后（Chrome/Edge 还需已允许用户脚本），安装脚本只需一次点击：

1. 打开脚本的**安装链接**——例如本站某个项目的安装页面，或其 `*.user.js` 地址。
2. Tampermonkey 会拦截该链接，并打开安装页面，显示脚本的名称、版本以及它运行的站点。
3. 点击 **安装**。

完成。此后每次打开 Bondage Club 时脚本都会自动运行，Tampermonkey 也会保持其更新。

## 第四步 — 验证是否生效

1. 在受支持的域名（如 `bondageprojects.com`）打开 Bondage Club 并登录。
2. 点开 Tampermonkey 图标——已安装的脚本应在列表中且处于**启用**状态
   （图标上出现数字角标说明脚本已在当前页面激活）。
3. 打开工具的游戏内菜单（对于基于 BCX 的工具，是**扩展设置菜单**）确认其已加载。

## 手机与平板

手机上也能用用户脚本，但浏览器的选择很关键。

### Android

使用支持扩展的浏览器：

- **Firefox for Android** —— 从 [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/tampermonkey/) 安装 Tampermonkey。最省事，无需额外配置。
- **Edge for Android** —— 支持包括 Tampermonkey 在内的一小部分扩展。
- **Kiwi 浏览器** 或其他允许安装 Chrome 应用商店扩展的 Chromium 浏览器 —— 安装 Tampermonkey 后，
  （和桌面 Chrome 一样）在浏览器的 `chrome://extensions` 页面开启 **开发者模式** / **允许用户脚本**，脚本才能运行。

默认的 **Chrome for Android 不支持扩展**，无法运行用户脚本。请改用上面这些浏览器。

### iPhone 与 iPad（iOS / iPadOS）

Safari 通过一个 Safari **网页扩展** App 来支持用户脚本：

1. 从 App Store 安装 **[Userscripts](https://apps.apple.com/app/userscripts/id1463298887)**（免费、开源）。
2. 打开 **设置 -> App -> Safari -> 扩展**（较旧的 iOS：**设置 -> Safari -> 扩展**），
   启用 **Userscripts**，并允许其在 **所有网站** 上运行。
3. 打开 Userscripts App，点击分享/添加按钮，通过脚本的 `*.user.js` 地址添加（或粘贴其内容）。
4. 在 Safari 中打开 Bondage Club —— 点击地址栏的 **ᴀA** 菜单 -> **Userscripts** 确认脚本已激活。

## 排错

**脚本装好了却毫无反应（Chrome/Edge）。** 你几乎肯定漏了[第二步](#第二步--仅-chrome-与-edge开启用户脚本)。
请在扩展页面开启 **允许用户脚本**（或 **开发者模式**）。浏览器更新可能悄悄把它重置——记得重新检查。

**Tampermonkey 出现警告 / 感叹号图标。** 在 Chrome/Edge 上与上面同因：尚未允许用户脚本。

**脚本在游戏页面不运行。** 确认页面域名是脚本的目标站点之一（如 `bondageprojects.com`、
`bondage-europe.com`、`bondage-asia.com`，含 `www.` 变体），并确认脚本在 Tampermonkey 面板中处于**启用**状态。

**同时装了两个管理器。** 不要同时运行 Tampermonkey 和 Violentmonkey（或两份相同的）——它们会冲突，只保留一个。

**还是搞不定？** 在 [GitHub 上的 Bondage Studio 组织](https://github.com/bondage-studio) 对应项目下提交 issue。
