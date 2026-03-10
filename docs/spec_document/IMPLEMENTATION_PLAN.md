# IMPLEMENTATION_PLAN.md — 实施计划

> 本文件是 **webjianli** 的逐步构建序列。每一步均有明确的动作和交叉引用。**按序执行，完成一步后再进行下一步。**

---

## 阶段概览

| 阶段 | 内容 | 状态 |
|------|------|------|
| **Phase 0** | 基础已完成部分确认 | ✅ 已完成 |
| **Phase 1** | 颜色常量化 | ⬜ 待实现 |
| **Phase 2** | 暗色模式基础设施 | ⬜ 待实现 |
| **Phase 3** | 全站导航栏改造 | ⬜ 待实现 |
| **Phase 4** | 板块色彩身份系统升级 | ⬜ 待实现 |
| **Phase 5** | 子页面视觉重设计（buildaloud 风格） | ⬜ 待实现 |
| **Phase 6** | 全站联调与响应式修复 | ⬜ 待实现 |
| **Phase 7** | Vercel 部署 | ⬜ 待实现 |

---

## Phase 0：基础已完成确认

> 以下内容已在现有代码中完成，无需重复实现。

- [x] **0.1** 项目初始化（Next.js 16.1.6 + React 19 + TypeScript + Tailwind CSS 4）
  - 依据：TECH_STACK §二
- [x] **0.2** 字体配置（Geist Sans / Geist Mono / Noto Serif SC）
  - 位置：`src/app/layout.tsx`
  - 依据：TECH_STACK §六
- [x] **0.3** CSS 变量基础架构（`:root`，4 个板块色变量，`.font-serif-sc`，`::selection`）
  - 位置：`src/app/globals.css`
  - 依据：FRONTEND_GUIDELINES §二
- [x] **0.4** 首页 Bento Grid 布局与动画（ParticleTrail, FloatingShapes, SideNav, MagneticButton, TiltCard, JourneyCard）
  - 位置：`src/app/page.tsx`
  - 依据：PRD §2.1
- [x] **0.5** 所有子页面基础结构（`PageContainer` + 内容组件）
  - 位置：`src/app/about/`, `src/app/experience/`, `src/app/projects/`, `src/app/thoughts/`
  - 依据：PRD §2.2–2.5
- [x] **0.6** 静态数据层
  - 位置：`src/constants/profile.ts`
  - 依据：BACKEND_STRUCTURE §二
- [x] **0.7** `bento-card` hover 效果（OkLab 色彩混合，4 个主题）
  - 位置：`src/app/globals.css`
  - 依据：FRONTEND_GUIDELINES §六.2

---

## Phase 1：颜色常量化

> 依据：PRD §2.7（颜色常量化），FRONTEND_GUIDELINES §一（设计哲学），TECH_STACK §十（禁止硬编码）

### 1.1 创建颜色常量文件

- 新建 `src/constants/theme.ts`
- 定义所有主站功能用到的颜色常量：
  ```typescript
  // 板块色
  export const SECTION_COLORS = {
    pardon: "#FFB800",      // Amber - /about
    journey: "#0EA5E9",     // Sky Blue - /experience
    creations: "#4800ff",   // Indigo - /projects
    creationsDark: "#7C3AED", // Indigo 暗色模式
    thoughts: "#10B981",    // Emerald - /thoughts
  } as const;

  // 语义色
  export const SEMANTIC_COLORS = {
    foreground: "#0f172a",
    accent: "#0f172a",
    muted: "#64748b",
    mutedLight: "#94a3b8",
    // ... 其他语义色
  } as const;

  // 能力雷达色（About 页专用）
  export const CAPABILITY_COLORS = {
    aiProduct: "#4800ff",
    userResearch: "#059669",
    vibeCoding: "#ff4596",
    growth: "#FFB800",
  } as const;

  // 导航项配置
  export const NAV_COLORS = {
    home: "#0f172a",
    about: "#FFB800",
    projects: "#4800ff",
    experience: "#0EA5E9",
    thoughts: "#10B981",
    themeToggle: "#64748b",
  } as const;

  // 首页卡片专用色
  export const CARD_COLORS = {
    amberDark: "#1a0e00",   // About 卡片深棕黑背景文字
    amberText60: "#4a3500",  // About 卡片次要文字
  } as const;
  ```
- 语义色需包含 **亮色 + 暗色** 两套值（用于 `:root/.dark` 注入）
- 依据：FRONTEND_GUIDELINES §二

### 1.2 注入全局 CSS 变量（统一版）

- 修改 `src/app/layout.tsx`：
  - 从 `src/constants/theme.ts` 读取语义色与板块色
  - 注入 `<style>`：生成 `:root` 与 `.dark` 两套变量
- 清理 `src/app/globals.css` 中写死的 Hex，仅保留变量名与工具类结构
- 依据：PRD §2.7（颜色常量化），TECH_STACK §九（统一来源）

### 1.3 替换组件中的硬编码颜色

- 遍历主站功能组件，将所有硬编码 Hex 色值替换为常量引用：
  - `src/app/page.tsx`：卡片背景色、文字色、按钮色
  - `src/app/about/page.tsx`：`themeColor`、边框色、能力雷达色
  - `src/app/experience/page.tsx`：`themeColor`
  - `src/app/projects/page.tsx`：`themeColor`
  - `src/app/thoughts/page.tsx`：`themeColor`
  - `src/components/SideNav.tsx`：`NAV_ITEMS` 颜色
- **范围排除**：`/playground`、Canvas 特效中的动态 `rgba()` 计算（如 ConstellationTrail、AuroraTrail）
- 依据：PRD §2.7（颜色常量化）

### 1.4 验证颜色常量化

- `grep` 搜索主站组件中是否还存在硬编码 Hex 色值（排除 CSS 变量和注释）
- 确认所有颜色值均从 `src/constants/theme.ts` 导入
- `npm run build` 无类型错误

---

## Phase 2：暗色模式基础设施

> 依据：PRD §2.6，TECH_STACK §五，FRONTEND_GUIDELINES §二.2，APP_FLOW §五

### 2.1 安装 `next-themes`

```bash
npm install next-themes@^0.4.4
```

- 安装完成后，将 `"next-themes": "^0.4.4"` 加入 `package.json` dependencies
- 依据：TECH_STACK §五

### 2.2 在 `layout.tsx` 中添加 `ThemeProvider`

- 修改 `src/app/layout.tsx`：
  - 导入 `ThemeProvider` from `next-themes`
  - 将 `<body>` 内容包裹在 `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`
  - 在 `<html>` 上添加 `suppressHydrationWarning`（防止 next-themes 注入导致的 hydration 警告）
- 依据：APP_FLOW §五（防白闪机制）

### 2.3 注入暗色变量（统一版）

- 确认 `src/constants/theme.ts` 已包含暗色语义值与 Indigo 暗色调整
- `layout.tsx` 注入 `.dark` 变量覆盖（不在 `globals.css` 写死 Hex）
- 依据：FRONTEND_GUIDELINES §二.2

### 2.4 将 SideNav 主题切换迁移至 `next-themes`

- 修改 `src/components/SideNav.tsx`：
  - 移除本地 `isDark` state 和手动 `document.documentElement.classList.toggle("dark")` 逻辑
  - 改用 `useTheme` hook from `next-themes`，调用 `setTheme()` 切换主题
  - 添加 `mounted` state 防止 hydration 不一致
- 依据：APP_FLOW §二.3

### 2.5 验证暗色模式基础

- 点击导航栏主题切换按钮，确认亮色/暗色切换正常
- 检查：背景变深色 `#020817`，文字变浅色 `#f8fafc`，卡片边框变 `#1e293b`
- 刷新页面确认主题持久化（localStorage）

---

## Phase 3：全站导航栏改造

> 依据：PRD §2.9，APP_FLOW §二.2，FRONTEND_GUIDELINES §六.4

### 3.1 SideNav 全局化

- 修改 `src/components/SideNav.tsx`：
  - 将组件从仅首页显示改为全站显示
  - 在 `layout.tsx` 中全局挂载 SideNav（移出 `page.tsx`）
  - 导航项颜色从 `src/constants/theme.ts` 导入
- 依据：PRD §2.9（全站导航）

### 3.2 添加当前路由高亮

- 使用 `usePathname` from `next/navigation` 获取当前路由
- 当前页面对应的导航图标：
  - 背景填充板块色
  - 图标颜色变白
- 非当前页面图标保持默认灰色
- 依据：APP_FLOW §二.2（当前路由高亮）

### 3.3 添加移动端底部导航

- 新建 `src/components/BottomNav.tsx`（或在 SideNav 内部条件渲染）：
  - `fixed bottom-0 left-0 right-0 z-50`
  - 背景：`bg-white/80 backdrop-blur-xl border-t border-black/[0.06]`
  - 导航项水平排列，均分空间，仅图标
  - 当前路由高亮（同桌面端规则）
  - 底部安全区域：`pb-[env(safe-area-inset-bottom)]`
- 桌面端：显示 SideNav，隐藏 BottomNav
- 移动端：显示 BottomNav，隐藏 SideNav
- 依据：FRONTEND_GUIDELINES §六.4（移动端底部导航）

### 3.4 移除 BackButton 相关代码

- 修改 `src/components/PageContainer.tsx`：
  - 移除 `BackButton` 组件引用
  - 移除 `hoverColor` prop 传递
- 如果 `BackButton` 是独立组件文件，标记为待删除（或保留但不引用）
- 依据：PRD §2.9（无 BackButton）

### 3.5 验证导航栏

- 桌面端：所有页面左侧可见 SideNav，当前页图标高亮
- 移动端：所有页面底部可见 BottomNav，当前页图标高亮
- 主题切换按钮在两种形态下均可用
- 点击任意导航图标跳转正确

---

## Phase 4：板块色彩身份系统升级

> 依据：PRD §2.7，FRONTEND_GUIDELINES §四，APP_FLOW §三

### 4.1 升级 `PageContainer` 组件以注入板块色 CSS 变量

- 修改 `src/components/PageContainer.tsx`：
  - 在根 `<div>` 上添加 `style` prop：`{ '--section-color': themeColor } as React.CSSProperties`
  - 添加 `className="section-page"`
  - 移除已废弃的 BackButton 相关代码（若 Phase 3 未完成）
- 依据：FRONTEND_GUIDELINES §四（实现方案）

### 4.2 在 `globals.css` 中添加 `.section-page` 板块色规则

- 在 `src/app/globals.css` 中新增：
  ```css
  /* 子页面板块色覆盖 */
  .section-page ::selection {
    background-color: var(--section-color, var(--theme-pardon));
    color: var(--background);
  }
  ```
- 依据：FRONTEND_GUIDELINES §四（文字选中色跟随板块）

### 4.3 为所有子页面 `PageContainer` 传入正确的 `themeColor`

- `/about/page.tsx`：`themeColor={SECTION_COLORS.pardon}` （改为常量引用）
- `/experience/page.tsx`：添加 `themeColor={SECTION_COLORS.journey}` （当前缺失）
- `/projects/page.tsx`：添加 `themeColor={SECTION_COLORS.creations}` （当前缺失）
- `/thoughts/page.tsx`：添加 `themeColor={SECTION_COLORS.thoughts}` （当前缺失）
- 依据：PRD §2.2–2.5

### 4.4 验证板块色注入

- 进入 `/about` 页面，选中任意文字 → 选中底色应为 Amber
- 进入 `/experience` 页面，选中任意文字 → 选中底色应为 Sky Blue
- 进入 `/projects` 页面 → 选中底色应为 Indigo
- 进入 `/thoughts` 页面 → 选中底色应为 Emerald

---

## Phase 5：子页面视觉重设计（buildaloud 风格）

> 依据：PRD §2.2–2.5，FRONTEND_GUIDELINES §六，DESIGN_REFERENCE.md

### 5.1 升级 `/about` 页面视觉

- **5.1.1** 为页面顶部添加板块色横幅或色块背景区域：在 `PageContainer` 的 header 区域注入 Amber 色氛围（背景色使用 `color-mix(in oklab, var(--theme-pardon) 5%, var(--background))`）
- **5.1.2** Section 标题左侧竖线：将 `border-l-4 border-[...]` 改为 `var(--section-color)`
- **5.1.3** 能力雷达卡片 hover 效果升级：使用 `bento-card` class + 对应 `theme-*` class 替换内联 hover 样式
- **5.1.4** 工具栈标签 hover：`hover:border-[var(--section-color)] hover:text-[var(--section-color)]`
- **5.1.5** MBTI 数字颜色使用 `text-[var(--section-color)]` 替换硬编码色值
- 依据：FRONTEND_GUIDELINES §六.3，DESIGN_REFERENCE §二.1

### 5.2 升级 `/experience` 页面视觉

- **5.2.1** 时间线竖线颜色：改为 `var(--section-color)` 半透明（`color-mix(in oklab, var(--section-color) 30%, var(--timeline-line))`）
- **5.2.2** 时间线节点图标色：改为 `text-[var(--section-color)]`（Sky Blue）
- **5.2.3** 时间线卡片 hover border 色：改为 `var(--section-color)`
- **5.2.4** 时间段 badge 背景色：改为 `color-mix(in oklab, var(--section-color) 10%, var(--tag-bg))`
- **5.2.5** 为 `PageContainer` header 添加 Sky Blue 色 `border-b` 分隔线
- 依据：FRONTEND_GUIDELINES §六.5

### 5.3 升级 `/projects` 页面视觉

- **5.3.1** Stats Grid 数字颜色：改为 `text-[var(--section-color)]`（Indigo）
- **5.3.2** 项目名称旁边添加 Indigo 色点（`w-3 h-3 rounded-full bg-[var(--section-color)]`）
- **5.3.3** 技术栈标签 hover：添加 `hover:border-[var(--section-color)] hover:text-[var(--section-color)]`
- **5.3.4** 项目卡片 hover border 色：改为 `var(--section-color)`
- **5.3.5** GitHub / 在线体验 链接颜色：hover 时变为 `var(--section-color)`
- 依据：FRONTEND_GUIDELINES §六.6

### 5.4 升级 `/thoughts` 页面视觉

- **5.4.1** 文章卡片 hover border 色：改为 `var(--section-color)`（Emerald）
- **5.4.2** 日期 badge 背景色：改为 `color-mix(in oklab, var(--section-color) 10%, var(--tag-bg))`
- **5.4.3** 标签统一使用 Emerald 板块色（参考 FRONTEND_GUIDELINES §2.4）
- **5.4.4** "持续更新中" 占位文字颜色使用 `var(--muted-light)`（已有，确认）
- 依据：FRONTEND_GUIDELINES §二.4

---

## Phase 6：全站联调与响应式修复

> 依据：PRD §五（成功标准），FRONTEND_GUIDELINES §七

### 6.1 全站暗色模式视觉审查

- 逐页检查暗色模式下的配色：
  - [ ] 首页：Bento Grid 卡片颜色正确，ParticleTrail 可见
  - [ ] `/about`：Amber 色在暗色背景下清晰
  - [ ] `/experience`：Sky Blue 时间线节点可见
  - [ ] `/projects`：Indigo Stats Grid 数字可读
  - [ ] `/thoughts`：Emerald 卡片边框可见，标签色彩正确
  - [ ] 导航栏：桌面端 + 移动端在暗色模式下可读
- 检查 `globals.css` 中 `.dark` 变量是否全部覆盖

### 6.2 响应式断点检查

- 在 375px（iPhone SE）宽度下检查：
  - [ ] 首页 Bento Grid 退化为单列
  - [ ] 底部导航栏正常显示，SideNav 隐藏
  - [ ] 所有子页面无横向溢出
  - [ ] PageContainer `px-6` 内边距正常
  - [ ] 大号衬线标题不溢出（添加 `break-keep` 或 `word-break`）
  - [ ] 底部导航栏不遮挡页面内容（页面底部有足够 padding）
- 在 768px（Tablet）宽度下检查：
  - [ ] SideNav 显示，BottomNav 隐藏
  - [ ] Bento Grid 3 列布局正确

### 6.3 动画性能检查

- 确认所有 Framer Motion 动画在移动端无卡顿
- 检查导航栏 Dock 动画在桌面端流畅

### 6.4 颜色常量化审查

- `grep` 搜索主站组件，确认无硬编码 Hex 色值残留（排除 CSS 变量、注释和 `/playground`）

### 6.5 `next build` 构建验证

- 执行 `npm run build`，确认：
  - [ ] 无 TypeScript 类型错误
  - [ ] 无 ESLint 报错
  - [ ] 所有页面成功静态生成（`.next/server/app/` 下有对应 HTML 文件）
  - [ ] `"use client"` 边界正确（含 useState/useEffect/framer-motion 的组件已标记）

---

## Phase 7：Vercel 部署

> 依据：PRD §一（部署平台），TECH_STACK §八

### 7.1 确认 `next.config.ts` 配置

- 检查 `next.config.ts`，确认无需特殊配置（纯静态站无需 `rewrites`/`redirects`/`env`）
- 若有 Turbopack 相关实验性配置，确认与 Vercel 兼容

### 7.2 推送代码到 GitHub

- 确认 `.gitignore` 包含 `.next/`、`node_modules/`
- 执行 `git add . && git commit -m "feat: 完成 buildaloud 风格重设计 + 暗色模式"`
- 推送到 GitHub 仓库 `phdwdm-lang/webjianli`（若仓库尚未创建则先创建）

### 7.3 在 Vercel 创建项目

- 登录 [vercel.com](https://vercel.com)
- 点击 "New Project" → Import `webjianli` 仓库
- Framework Preset：**Next.js**（Vercel 自动识别）
- Build Command：`npm run build`（默认）
- Output Directory：`.next`（默认）
- Node.js Version：**20.x**（在 Project Settings > General 中设置）
- 无需添加任何 Environment Variables（全静态站）

### 7.4 部署验证

- 部署完成后访问 Vercel 提供的 `.vercel.app` URL
- 逐项验证 PRD §五（成功标准）：
  - [ ] 首页动画正常
  - [ ] 4 个板块色彩身份正确
  - [ ] 暗色模式切换无白闪
  - [ ] Mobile 端响应式正常
  - [ ] 外部链接（GitHub / wolf-cha.com）可正常跳转
  - [ ] 构建时间 < 3 分钟

### 7.5 记录部署 URL

- 将 Vercel 提供的 `.vercel.app` URL 更新到 `README.md` 和 `src/app/layout.tsx` 的 `metadataBase`

---

## 实施顺序汇总

```
Phase 0（已完成）
    ↓
Phase 1（颜色常量化）                            ← 先做，是后续所有颜色引用的基础
    ↓
Phase 2（安装 next-themes + 暗色 CSS 变量 + 主题切换迁移）
    ↓
Phase 3（全站导航栏改造：全局化 + 路由高亮 + 移动端底部 + 移除 BackButton）
    ↓
Phase 4（PageContainer 注入板块色 CSS 变量）   ← 是 Phase 5 所有 var(--section-color) 的前提
    ↓
Phase 5（子页面视觉升级，4 页）
    ↓
Phase 6（全站联调 + 响应式 + 颜色审查 + 构建验证）
    ↓
Phase 7（Vercel 部署）
```

---

*文档版本：v2.0 | 更新日期：2026-03-04*
*交叉引用：PRD 全文，APP_FLOW 全文，TECH_STACK 全文，FRONTEND_GUIDELINES 全文，BACKEND_STRUCTURE §二*
