# FRONTEND_GUIDELINES.md — 前端设计规范

> 本文件是 **webjianli** 项目的完整设计系统。所有 UI 组件的颜色、字体、间距、交互必须严格遵循此规范，禁止随机使用未定义的值。

---

## 一、设计哲学（源自 buildaloud.love 移植）

> **"90% 中性灰 + 10% 高饱和板块色 = 极简但不单调"**

核心原则：
- **色彩即导航**：用户无需看导航条，仅凭板块色就知道自己在哪个区域
- **阴影策略**：内容卡片不使用 `box-shadow`，层级靠颜色和边框区分；导航栏和特殊视觉效果组件允许保留阴影
- **衬线张力**：Noto Serif SC 衬线标题 × 高饱和板块色 = 传统×现代视觉张力
- **OkLab 混色**：CSS 中半透明叠色使用 `color-mix(in oklab, ...)`；Canvas/SVG 特效中保留 `rgba()` 但统一定义为常量
- **颜色常量化**：主站功能的所有颜色值必须定义在 `src/constants/theme.ts`，禁止硬编码

---

## 二、调色板

### 2.1 板块色（Section Colors）— 第 3 层

每个子页面拥有唯一板块色，该色渗透到页面所有强调元素。

| 板块 | 变量名 | 亮色 Hex | 暗色 Hex | 用途页面 |
|------|--------|----------|----------|----------|
| 个人介绍 (Pardon) | `--theme-pardon` | `#FFB800` | `#FFB800` | `/about` |
| 学习与工作 (Journey) | `--theme-journey` | `#0EA5E9` | `#0EA5E9` | `/experience` |
| 项目经历 (Creations) | `--theme-creations` | `#4800ff` | `#7C3AED` | `/projects` |
| 日常思考 (Thoughts) | `--theme-thoughts` | `#10B981` | `#10B981` | `/thoughts` |

> 注：Indigo `#4800ff` 在暗色模式下切换为 `#7C3AED`（避免纯靛蓝在深色背景上对比度不足）。
> 所有板块色 Hex 定义在 `src/constants/theme.ts`，由 `layout.tsx` 注入为 CSS 变量。

### 2.2 语义色（Semantic Colors）— 第 2 层

> 语义色定义在 `src/constants/theme.ts`，由 `layout.tsx` 注入 `:root/.dark`，`globals.css` 不写死 Hex。

| 语义变量 | 亮色 | 暗色 | 说明 |
|----------|------|------|------|
| `--background` | `#ffffff` | `#020817` | 页面背景 |
| `--foreground` | `#0f172a` | `#f8fafc` | 主体文字 |
| `--card-bg` | `#ffffff` | `#0f172a` | 卡片背景 |
| `--card-border` | `#e2e8f0` | `#1e293b` | 卡片边框 |
| `--accent` | `#0f172a` | `#f8fafc` | 强调色 |
| `--muted` | `#64748b` | `#94a3b8` | 次要文字 |
| `--muted-light` | `#94a3b8` | `#64748b` | 更弱次要文字 |
| `--tag-bg` | `#f1f5f9` | `#1e293b` | 标签背景 |
| `--timeline-line` | `#e2e8f0` | `#1e293b` | 时间线竖线 |

### 2.3 能力雷达色（Capability Colors）— About 页专用

用于 `/about` 能力雷达 4 个卡片的色点，各自独立颜色：

| 能力 | 颜色 Hex | 说明 |
|------|----------|------|
| AI 产品实战 | `#4800ff` | 靛蓝 |
| 用户研究方法论 | `#059669` | 翠绿 |
| 全链路构建（Vibe Coding） | `#ff4596` | 粉红 |
| 商业化与增长 | `#FFB800` | 琥珀（与 About 板块色一致） |

> 能力雷达色常量统一定义在 `src/constants/theme.ts`。

### 2.4 Thoughts 标签色彩

Thoughts 页的标签统一使用 Emerald 板块色，不做多色化。

| 属性 | 值 |
|------|------|
| 标签背景色 | `color-mix(in oklab, var(--theme-thoughts) 15%, var(--tag-bg))` |
| 标签文字色 | `var(--theme-thoughts)` |

---

## 三、排版系统

### 3.1 字体族

| 变量 | 字体 | 场景 |
|------|------|------|
| `--font-geist-sans` | Geist Sans | 全站默认正文 |
| `--font-geist-mono` | Geist Mono | 等宽：代码、数字、标签标识、`font-mono` |
| `--font-serif` | Noto Serif SC | 衬线标题，使用 `.font-serif-sc` class |

### 3.2 字号规格

| 用途 | Tailwind class | px 值 | 字重 | 字体族 |
|------|----------------|--------|------|--------|
| 首页超大装饰字 | `text-[22rem]` | ~352px | `font-black` (900) | Serif |
| 首页卡片主标题 | `text-3xl` ~ `text-5xl` | 30–48px | `font-bold` (700) | Serif |
| 子页面 Hero 标题 | `text-5xl` ~ `text-7xl` | 48–72px | `font-black` (900) | Serif |
| 子页面 Section 标题 | `text-3xl` ~ `text-4xl` | 30–36px | `font-bold` (700) | Serif |
| 页面 Header（PageContainer） | `text-3xl` | 30px | `font-bold` (700) | Sans |
| Section 小标题 | `text-xl` | 20px | `font-bold` (700) | Serif |
| 正文 | `text-base` | 16px | `font-normal` (400) | Sans |
| 次要正文 | `text-sm` | 14px | `font-medium` (500) | Sans |
| 标签 / 元信息 | `text-xs` | 12px | `font-medium` (500) | Sans |
| 索引标识（如 `01 — PERSONAL`） | `text-[11px]` | 11px | `font-bold` (700) | Mono |

### 3.3 行高

| 场景 | class |
|------|-------|
| 大号标题 | `leading-[1.1]` |
| 正文段落 | `leading-relaxed`（1.625） |
| 卡片描述 | `leading-relaxed` |

### 3.4 字间距

| 场景 | class | 说明 |
|------|-------|------|
| 超大标题 | `tracking-tight` | 压缩间距，增加气势 |
| 索引标识 | `tracking-wider` / hover 时 `tracking-[0.3em]` | 动态扩展，视觉呼吸 |
| 英文小标签 | `tracking-widest` | 全大写 + 最宽间距 |

---

## 四、板块色彩身份系统（核心设计规范）

每个子页面必须实现以下 5 项板块色注入，以该页面的板块色替换：

| 注入点 | 实现方式 | 示例（About 页，板块色 #FFB800） |
|--------|----------|----------------------------------|
| **文字选中色** | `::selection { background-color: var(--section-color); }` | 选中文字变 Amber 底色 |
| **强调色（accent）** | `var(--section-color)` 用于 Section 标题下划线、左侧竖线 | Amber 色竖线 |
| **hover 边框色** | 卡片/标签 hover 时 `border-color` = 板块色 | 工具栈标签 hover 变 Amber 边框 |
| **时间线 / 节点色** | `/experience` 专用，竖线和节点图标色 = Sky Blue | 竖线、图标变 Sky Blue |

### 实现方案：CSS 变量局部覆盖

在每个子页面的根元素上通过内联 style 或页面级 CSS class 覆盖 `--section-color` 变量：

```tsx
// PageContainer 接受 themeColor prop，注入为 CSS 变量
<div style={{ '--section-color': themeColor } as React.CSSProperties}>
  ...
</div>
```

```css
/* globals.css 中统一定义使用 --section-color 的规则 */
.section-page ::selection {
  background-color: var(--section-color);
  color: var(--background);
}
```

---

## 五、间距与布局

### 5.1 容器规则

| 容器 | 规则 | 使用页面 |
|------|------|----------|
| 首页 Bento Grid | `max-w-5xl mx-auto` + `md:ml-16`（为导航栏留白） | `/` |
| 子页面 PageContainer | `max-w-3xl mx-auto px-6 py-12` | 所有子页面 |
| 子页面内容区 | `space-y-16`（section 间距） | 所有子页面 |

### 5.2 间距刻度（常用）

| 用途 | Tailwind class | px 值 |
|------|----------------|--------|
| Bento 卡片间距 | `gap-4 md:gap-5` | 16–20px |
| 卡片内边距（小） | `p-6` | 24px |
| 卡片内边距（大） | `p-8 md:p-10` | 32–40px |
| Section 间距 | `space-y-16` | 64px |
| 卡片内 Section 间距 | `space-y-8` | 32px |
| 标签间距 | `gap-2` ~ `gap-3` | 8–12px |

### 5.3 圆角规则

| 组件 | 圆角 |
|------|------|
| Bento Grid 首页卡片 | `rounded-3xl`（24px） |
| 子页面内容卡片 | `rounded-2xl`（16px） |
| 标签 | `rounded-md`（6px）或 `rounded-full` |
| 时间线节点 | `rounded-full`（圆形） |
| BackButton | `rounded-full` |

---

## 六、组件视觉规范

### 6.1 首页 Bento Grid 卡片

- 背景色：各卡片固定高饱和色（Amber / Indigo / Sky渐变 / Emerald）
- 内容色：白色文字 + 白色/透明装饰
- 悬停效果：
  - Amber 卡片（About）：`radial-gradient` 光晕 + 装饰字母上移
  - Indigo 卡片（Projects）：TiltCard 3D 倾斜 + 圆点背景加深
  - Sky 卡片（Experience）：JourneyCard 组件独立实现
  - Emerald 卡片（Thoughts）：`scale(1.04) y(-8px)` spring 弹性 + 光晕
- 索引标识：`text-[11px] font-mono font-bold text-white/60`，hover 时 `tracking` 扩展

### 6.2 子页面内容卡片

- 背景：`var(--card-bg)`
- 边框：`1px solid var(--card-border)`，hover 时边框变板块色
- 过渡：`transition-all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
- 上移：hover 时 `translateY(-4px)`
- 光晕：`color-mix(in oklab, var(--section-color) 8%~15%, transparent)` 做 radial-gradient

### 6.3 MagneticButton（首页专用）

- 背景：`CARD_COLORS.amberDark`（theme.ts）
- 文字：`SECTION_COLORS.pardon`（theme.ts）
- 磁力吸附半径：80px（通过 `mousemove` 事件计算偏移）
- 圆角：`rounded-full`（通过 className 传入）

### 6.4 全站导航栏（SideNav / BottomNav）

**桌面端（≥ 768px）— 左侧垂直悬浮：**
- 定位：`fixed left-4 top-1/2 -translate-y-1/2 z-50`
- 背景：`bg-white/55 backdrop-blur-2xl border border-black/[0.06]`（暗色模式下调整）
- 圆角：`rounded-[28px]`
- 阴影：允许保留 `box-shadow`（例外于内容卡片零阴影规则）
- 导航图标：`w-10 h-10`，仅图标，桌面 hover 显示 tooltip
- 当前路由高亮：活动图标背景填充板块色，文字变白
- Dock 动画：图标距离鼠标越近尺寸越大（macOS Dock 效果）

**移动端（< 768px）— 底部水平固定：**
- 定位：`fixed bottom-0 left-0 right-0 z-50`
- 背景：`bg-white/80 backdrop-blur-xl border-t border-black/[0.06]`（暗色模式下调整）
- 导航图标：水平排列，均分空间，仅图标（移动端不显示文字 tooltip）
- 当前路由高亮：同桌面端规则
- 安全区域：底部需考虑 `safe-area-inset-bottom`（iOS 全面屏）

**主题切换按钮（集成在导航中）：**
- 图标：亮色模式显示 `Sun`，暗色模式显示 `Moon`（Lucide 图标）
- 文字标签：桌面 hover tooltip 显示“切换主题”
- 使用 `next-themes` 的 `useTheme` hook
- 需处理 SSR hydration：`mounted` state 防止服务端/客户端不一致

**导航项配置（颜色从 `src/constants/theme.ts` 导入）：**

| 导航项 | 图标 | 路由 | 板块色变量 |
|----------|------|------|------------|
| 主页 | `Home` | `/` | `--foreground` |
| 个人信息 | `User` | `/about` | `--theme-pardon` |
| 灵感造物 | `Rocket` | `/projects` | `--theme-creations` |
| 时光足迹 | `Clock` | `/experience` | `--theme-journey` |
| 思想碎片 | `Pen` | `/thoughts` | `--theme-thoughts` |
| 切换主题 | `Sun`/`Moon` | — | `--muted` |

### 6.5 时间线节点（Experience 页专用）

- 竖线：`1px solid var(--timeline-line)`，亮色 `#e2e8f0`，暗色 `#1e293b`
- 节点圆圈：`w-10 h-10 rounded-full`，背景 `var(--card-bg)`，边框 `var(--timeline-line)`
- 节点图标色：`var(--theme-journey)`（Sky Blue `#0EA5E9`）
- hover 时节点边框色变 Sky Blue

### 6.6 Stats Grid（Projects 页专用）

- 布局：`grid-cols-2 sm:grid-cols-4`
- 分隔线：`border-r` + `border-b`（最后一列无右边框）
- 数字：`text-lg font-bold`，颜色 `var(--theme-creations)`（Indigo）
- 标签：`text-xs text-[var(--muted)]`

---

## 七、响应式断点

| 断点名称 | 最小宽度 | Tailwind 前缀 |
|----------|----------|---------------|
| Mobile | 0px | 无前缀（默认） |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide Desktop | 1280px | `xl:` |

### 各页面断点行为

| 页面 | Mobile（< 768px） | Tablet+（≥ 768px） |
|------|--------|---------------|
| 首页 | 单列堆叠，`p-4` | 三列 Bento Grid，`p-10` |
| 导航栏 | 底部水平固定（BottomNav） | 左侧垂直悬浮（SideNav） |
| 子页面 Header | `text-3xl` | 同（无变化） |
| About Hero 标题 | `text-5xl` | `md:text-7xl` |
| Projects Stats | `grid-cols-2` | `sm:grid-cols-4` |
| 时间线卡片元信息 | 竖排 | `sm:flex-row` 横排 |

---

## 八、动画规范

| 动画类型 | 实现方式 | 持续时间 | Easing |
|----------|----------|----------|--------|
| 首页卡片入场（stagger） | Framer Motion `variants` | 0.7s，delay 递增 0.12s | `[0.16, 1, 0.3, 1]`（自定义 cubic-bezier） |
| 子页面 Section 入场 | `opacity: 0→1, y: 20→0`，delay 0.1s 递增 | 0.5s | `ease` |
| 卡片 hover 上移 | CSS `transform: translateY(-4px)` | 0.4s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 首页 Emerald 卡片 hover | Framer Motion `whileHover: {scale: 1.04, y: -8}` | spring `stiffness: 500, damping: 15` | Spring |
| 装饰几何形状旋转 | Framer Motion `animate: {rotate: [0, 20, 0]}` | 8–10s | `easeInOut`，`repeat: Infinity` |
| ParticleTrail 粒子 | 鼠标跟随，CSS transform | 约 0.3s 衰减 | — |
| 导航图标 Dock 效果 | Framer Motion `useTransform` | 实时跟随鼠标 | Spring |
| 首页索引标识 tracking | CSS `transition: letter-spacing` | 0.5s | `ease` |

**硬性限制**：任何用户操作触发的动画 `duration ≤ 0.8s`；无限循环装饰动画除外。

---

## 九、CSS 文件结构

```
src/app/globals.css
├── @import "tailwindcss"
├── :root { ... }               — 亮色语义变量
├── .dark { ... }               — 暗色语义变量覆盖
├── @theme inline { ... }       — Tailwind 工具类注册（--color-background 等）
├── body { ... }                — 基础排版
├── .font-serif-sc { ... }      — 衬线字体 class
├── ::selection { ... }         — 全局选中色（使用 --section-color 或 --theme-pardon）
├── .bento-card { ... }         — 首页 Bento 卡片基础样式
├── .bento-card.theme-* { ... } — 各板块 hover 效果（4个）
├── .section-page { ... }       — 子页面根容器通用样式
├── ::selection 覆盖规则        — 子页面选中色（--section-color）
└── @keyframes / utilities      — 工具动画
```

---

*文档版本：v2.0 | 更新日期：2026-03-04*
*交叉引用：PRD §2.7/§2.9，TECH_STACK §九/§十，APP_FLOW §二/§三*
