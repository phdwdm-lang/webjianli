# TECH_STACK.md — 技术栈锁定文档

> 本文件锁定 **webjianli** 项目所有依赖的确切版本。禁止使用未列明的依赖，禁止升级版本而不更新本文件。

---

## 一、运行环境

| 项目 | 版本 |
|------|------|
| **Node.js** | 20.x LTS（Vercel 默认支持） |
| **包管理器** | npm（使用 `package-lock.json` 锁定） |
| **操作系统** | Windows 11（开发环境） |

---

## 二、核心框架

| 依赖 | 版本 | 用途 |
|------|------|------|
| `next` | `16.1.6` | 全栈框架，App Router 模式 |
| `react` | `19.2.3` | UI 渲染库 |
| `react-dom` | `19.2.3` | React DOM 渲染 |
| `typescript` | `^5.x`（当前解析为 5.x） | 静态类型系统 |

---

## 三、UI 与样式

| 依赖 | 版本 | 用途 |
|------|------|------|
| `tailwindcss` | `^4.x`（当前解析为 4.x） | 原子化 CSS 框架 |
| `@tailwindcss/postcss` | `^4.x` | Tailwind CSS 4 的 PostCSS 插件 |
| `lucide-react` | `^0.576.0` | 图标库（Building2, GraduationCap, ExternalLink 等） |
| `clsx` | `^2.1.1` | className 条件合并工具 |
| `tailwind-merge` | `^3.5.0` | Tailwind className 合并（避免冲突） |

---

## 四、动画

| 依赖 | 版本 | 用途 |
|------|------|------|
| `framer-motion` | `^12.34.4` | 动画库（入场动画、hover、stagger） |

---

## 五、主题切换（待安装）

| 依赖 | 版本 | 用途 |
|------|------|------|
| `next-themes` | `^0.4.4` | 亮色 / 暗色模式切换，防白闪 |
 
> **注意**：`next-themes` 当前尚未安装，需在 IMPLEMENTATION_PLAN §2.1 中执行安装。

---

## 六、字体

| 字体 | 来源 | 变量名 | 用途 |
|------|------|--------|------|
| **Geist Sans** | `next/font/google` | `--font-geist-sans` | 全站正文、UI 文字 |
| **Geist Mono** | `next/font/google` | `--font-geist-mono` | 等宽代码块、标签、数字 |
| **Noto Serif SC** | `next/font/google` | `--font-serif` | 标题衬线字体（中英文混排） |

> 字体加载配置位于 `src/app/layout.tsx`，权重：400 / 500 / 600 / 700 / 900。

---

## 七、开发依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| `eslint` | `^9.x` | 代码检查 |
| `eslint-config-next` | `16.1.6` | Next.js ESLint 规则集 |
| `@types/node` | `^20.x` | Node.js TypeScript 类型 |
| `@types/react` | `^19.x` | React TypeScript 类型 |
| `@types/react-dom` | `^19.x` | React DOM TypeScript 类型 |
| `babel-plugin-react-compiler` | `1.0.0` | React 19 编译器优化插件 |

---

## 八、部署平台

| 项目 | 详情 |
|------|------|
| **平台** | Vercel |
| **框架检测** | Next.js（Vercel 自动识别） |
| **构建命令** | `npm run build`（即 `next build`） |
| **输出目录** | `.next`（Next.js 默认，Vercel 自动处理） |
| **域名** | Vercel 分配的 `.vercel.app` 子域名 |
| **Node.js 版本** | 20.x（在 Vercel 项目设置中指定） |
| **环境变量** | 无（全静态，无需任何 env） |

---

## 九、CSS 架构说明

本项目使用 **Tailwind CSS v4** 的原生 CSS 变量架构（无 `tailwind.config.js` 文件）：

```
src/app/globals.css
└── @import "tailwindcss"          — 引入 Tailwind v4
└── :root { ... }                  — 第2层：语义色变量（亮色）
└── .dark { ... }                  — 第2层：语义色变量（暗色覆盖）
└── @theme inline { ... }          — 第1层：注册为 Tailwind 工具类
└── [Section CSS classes]          — 第3层：板块色彩身份系统
```

**CSS 变量三层架构**（参考 buildaloud.love）：
- **第 1 层（原子色）**：Tailwind 内置色板 + `@theme inline` 注册的自定义色
- **第 2 层（语义色）**：`--background`, `--foreground`, `--accent`, `--muted` 等
- **第 3 层（板块色）**：`--theme-pardon`, `--theme-journey`, `--theme-creations`, `--theme-thoughts`

**颜色值统一来源**：`src/constants/theme.ts` 是唯一真值，`layout.tsx` 注入 `:root/.dark` 变量；`globals.css` 不写死 Hex。

---

## 十、禁止使用的技术

| 禁止项 | 原因 |
|--------|------|
| Redux / Zustand / Jotai | 无复杂全局状态需求，useState 即可 |
| Axios / React Query | 无 API 调用，无需请求库 |
| CSS Modules / Styled Components | 已使用 Tailwind v4，不混用 CSS-in-JS |
| 内容卡片 `box-shadow` | 内容区卡片禁止使用，层级靠颜色区分（导航栏和特效组件允许保留） |
| CSS 中的 `rgba()` 半透明色 | CSS 中使用 `color-mix(in oklab, ...)` 替代；Canvas/SVG 特效中允许使用 `rgba()` 但应统一定义为常量 |
| 组件中硬编码 Hex 色值 | 主站功能颜色必须从 `src/constants/theme.ts` 导入（`/playground` 和 Canvas 动态计算除外） |
| `"latest"` 版本号 | 必须锁定到具体版本 |

---

*文档版本：v2.0 | 更新日期：2026-03-04*
*交叉引用：PRD §2，IMPLEMENTATION_PLAN §1.1*
