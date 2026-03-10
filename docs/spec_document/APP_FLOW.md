# APP_FLOW.md — 应用流程文档

> 本文件描述 **webjianli** 所有页面的导航路径与交互逻辑。所有跳转规则以此为准。

---

## 一、屏幕清单

| 路由 | 页面名称 | 板块色 | 描述 |
|------|----------|--------|------|
| `/` | 首页 Home | 多色（Bento Grid） | 入口页，4 张导航卡片 |
| `/about` | 个人介绍 | Amber `#FFB800` | 自我介绍、能力雷达、MBTI |
| `/experience` | 学习与工作 | Sky Blue `#0EA5E9` | 工作经历与教育背景时间线 |
| `/projects` | 项目经历 | Indigo `#4800ff` | AI 产品项目详情 |
| `/thoughts` | 日常思考 | Emerald `#10B981` | 文章卡片列表 |

> `/playground` 页面存在于代码中，但不纳入本文档规划范围，不放置公开导航入口。

---

## 二、全局导航规则

### 2.1 首页 → 子页面
- 用户点击 Bento Grid 任意卡片 → 跳转至对应子页面（`<Link href="...">` 整卡片可点击区域）
- 跳转方式：Next.js 客户端路由（`<Link>`），无整页刷新

### 2.2 全站导航栏（所有页面均可见）

导航栏在所有页面（首页 + 4 个子页面）始终可见，fixed 定位。

- **桌面端（≥ 768px）**：左侧垂直悬浮导航（SideNav）
- **移动端（< 768px）**：底部水平固定导航栏
- **导航项（6 项）**：主页(Home) / 个人信息(User) / 灵感造物(Rocket) / 时光足迹(Clock) / 思想碎片(Pen) / 切换主题(Sun/Moon)
- **显示形式**：仅图标，桌面端 hover 显示文字 tooltip，移动端不显示文字
- **当前路由高亮**：当前页面对应的导航图标使用该板块色高亮显示（例如在 `/about` 页，User 图标变 Amber 色）
- **主题切换**：导航栏最后一项为 Sun/Moon 图标，桌面端 tooltip 显示“切换主题”，点击切换亮色/暗色主题
- **无 BackButton**：全站导航已覆盖所有页面跳转，不再需要独立的返回按钮

### 2.3 暗色模式切换
- 位置：集成在全站导航栏中（桌面端 + 移动端均可操作）
- 点击 Sun/Moon 图标切换亮色 ↔ 暗色
- 状态持久化：通过 `next-themes` 存储在 `localStorage`
- 所有页面同步继承主题状态（`ThemeProvider` 包裹整个 app）

---

## 三、逐页交互流程

### 3.1 首页（`/`）

**进入流程：**
1. 用户打开网站 URL → 加载首页
2. `next-themes` 读取 `localStorage` 中的主题设置 → 设置 `<html>` 的 `class`（`light` 或 `dark`）
3. Framer Motion `stagger` 动画依次入场：卡片 0 → 卡片 1 → 卡片 2 → 卡片 3（间隔 0.12s，总时长约 0.9s）
4. ParticleTrail 开始响应鼠标移动，粒子跟随鼠标轨迹出现

**用户操作：**
- 鼠标移至任意卡片 → 卡片 hover 效果（各卡片独立动画，详见 FRONTEND_GUIDELINES）
- 点击"01 — Pardon 乌冬面"卡片 → 跳转 `/about`
- 点击"02 — 灵感造物"卡片 → 跳转 `/projects`
- 点击"03 — 时光足迹"（JourneyCard）→ 跳转 `/experience`
- 点击"04 — 思想碎片"卡片 → 跳转 `/thoughts`
- 点击导航栏中的主题切换按钮 → 切换暗色/亮色主题，无页面刷新

**错误情况：**
- 无，首页为静态渲染，无异步操作

---

### 3.2 个人介绍页（`/about`）

**进入流程：**
1. 用户从首页点击 Amber 卡片 → 跳转 `/about`
2. 页面加载，`PageContainer` 渲染（Amber 主题色注入）
3. 4 个 section 依次以 Framer Motion `opacity: 0 → 1, y: 20 → 0` 入场（delay 递增）

**用户操作：**
- 滚动阅读：座右铭 → 姓名与定位 → 工具栈 → 能力雷达 → MBTI
- 鼠标移至工具栈标签 → border 变 Amber，文字变 Amber
- 鼠标移至能力卡片 → border 变对应色（每卡独立色），卡片上移 4px
- 点击导航栏中任意页面图标 → 跳转至对应页面

**错误情况：**
- 无，纯静态内容

---

### 3.3 学习与工作页（`/experience`）

**进入流程：**
1. 用户从首页点击 Sky Blue（JourneyCard）或导航栏 Clock 图标 → 跳转 `/experience`
2. 页面加载，`PageContainer` 渲染（Sky Blue 主题色注入）
3. 时间线节点从上至下依次渲染（已按时间降序排列）
4. 导航栏中 Clock 图标高亮为 Sky Blue

**用户操作：**
- 滚动阅读时间线卡片（从最新工作经历到教育背景）
- 鼠标移至时间线卡片 → border 变 Sky Blue，卡片上移 4px
- 点击导航栏中任意页面图标 → 跳转至对应页面

**错误情况：**
- 无，纯静态内容

---

### 3.4 项目经历页（`/projects`）

**进入流程：**
1. 用户从首页点击 Indigo 卡片或导航栏 Rocket 图标 → 跳转 `/projects`
2. 页面加载，`PageContainer` 渲染（Indigo 主题色注入）
3. 项目卡片按 `PROJECTS` 数组顺序渲染（猹杀 Wolfcha 在前，BBQ Translator 在后）
4. 导航栏中 Rocket 图标高亮为 Indigo

**用户操作：**
- 滚动阅读项目卡片
- 点击 GitHub 链接 → 在新标签页打开 GitHub 仓库（`target="_blank" rel="noopener noreferrer"`）
- 点击"在线体验"链接 → 在新标签页打开项目网站（仅猹杀 Wolfcha 有此链接）
- 点击"演示视频"链接 → 在新标签页打开视频链接（仅 BBQ Translator 有此链接）
- 鼠标移至项目卡片 → border 变 Indigo，卡片上移 4px
- 点击导航栏中任意页面图标 → 跳转至对应页面

**错误情况：**
- 外部链接打开失败（网络问题）→ 浏览器原生处理，本站无需处理

---

### 3.5 日常思考页（`/thoughts`）

**进入流程：**
1. 用户从首页点击 Emerald 卡片或导航栏 Pen 图标 → 跳转 `/thoughts`
2. 页面加载，`PageContainer` 渲染（Emerald 主题色注入）
3. 文章卡片按 `THOUGHTS` 数组顺序渲染（最新在前）
4. 导航栏中 Pen 图标高亮为 Emerald

**用户操作：**
- 滚动阅读文章卡片（日期、标题、摘要、标签）
- 鼠标移至文章卡片 → border 变 Emerald，卡片上移 4px
- 标签为纯展示，无点击筛选功能（Out-of-Scope）、不做多色化，统一使用 Emerald 板块色
- 点击导航栏中任意页面图标 → 跳转至对应页面

**错误情况：**
- 无，纯静态内容

---

## 四、路由总览

```
/                → 首页（Bento Grid）
├── /about       → 个人介绍（Amber 主题）
├── /experience  → 学习与工作（Sky Blue 主题）
├── /projects    → 项目经历（Indigo 主题）
└── /thoughts    → 日常思考（Emerald 主题）
```

**路由规则**：
- 所有路由为 Next.js App Router 的 `page.tsx` 文件
- 无动态路由（无 `[slug]` 参数）
- 无 API Routes
- 无需鉴权，全部公开访问
- 404 页面：Next.js 默认 404（不定制）

---

## 五、主题切换流程

```
用户点击导航栏中的 Sun/Moon 按钮
    ↓
next-themes useTheme().setTheme('dark' | 'light' | 'system')
    ↓
localStorage 写入 'theme' 键值
    ↓
<html> class 切换为 'dark' 或 ''（空字符串代表 light）
    ↓
globals.css .dark { ... } 变量覆盖生效
    ↓
全站颜色实时更新（无页面刷新）
```

**防白闪机制**：
- `next-themes` 的 `ThemeProvider` 自动在 `<html>` 上注入初始主题 class
- 必须在 `layout.tsx` 根部包裹 `ThemeProvider`，使其在任何页面渲染前生效
- `defaultTheme="system"` 使主题默认跟随系统设置

---

*文档版本：v2.0 | 更新日期：2026-03-04*
*交叉引用：PRD §2.9 全站导航栏，FRONTEND_GUIDELINES §四 板块色系统，§六.2 导航栏规范*
