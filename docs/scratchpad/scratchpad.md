# Scratchpad — webjianli 项目实时记忆

---

## Current Phase
Phase 5 完成 — 子页面视觉重设计完成，准备 Phase 6

## Active Task
Phase 6：全站联调与响应式修复

## Progress Checklist

### 文档更新
- [x] PRD.md（移除 DarkModeToggle、取消标签多色化、全站导航、颜色常量化）
- [x] APP_FLOW.md（导航全局化、移除 BackButton、路由高亮、移动端底部导航）
- [x] TECH_STACK.md（更新阴影/rgba 策略、移除 DarkModeToggle 引用）
- [x] FRONTEND_GUIDELINES.md（导航规范、颜色常量化、标签多色化移除、阴影策略更新）
- [x] BACKEND_STRUCTURE.md（移除标签颜色映射引用）
- [x] IMPLEMENTATION_PLAN.md（移除 Phase 4/5、合并导航改造、新增颜色常量化步骤）

### 编码实施（文档更新完成后开始）
- [x] Phase 1：颜色常量化（新建 `src/constants/theme.ts`，替换主站硬编码色）
- [x] Phase 2：暗色模式基础设施（next-themes + `.dark` 变量）
- [x] Phase 3：全站导航改造（桌面侧边 + 移动端底部 + next-themes 主题切换）
- [x] Phase 4：板块色彩身份系统升级（PageContainer 注入 `--section-color`）
- [x] Phase 5：子页面视觉重设计（buildaloud 风格，4 页）
- [ ] Phase 6：全站联调与响应式修复（含 build）
- [ ] Phase 7：Vercel 部署

## Recent Decisions

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-03-06 | Phase 5 完成：子页面视觉重设计 | 4 个子页面全部升级为 --section-color 驱动的板块色系统 |
| 2026-03-06 | Phase 4 完成：板块色彩身份系统升级 | PageContainer 注入 --section-color + 文字选中色跟随板块 |
| 2026-03-06 | 所有 issue 已修复（#001-#004），修复率 100% | 用户确认所有问题已解决 |
| 2026-03-06 | 修复 #004 tooltip 统一白字 + 主页底色 | 新增 --nav-home 变量，tooltipBg 与 icon 色分离 |
| 2026-03-06 | 修复 #003 导航栏 tooltip 文字颜色 | 改为黑色文字，在所有板块色上都有足够对比度 |
| 2026-03-06 | Phase 3 完成：全站导航改造 | 桌面侧边导航 + 移动端底部导航 + 路由高亮 + 移除 BackButton |
| 2026-03-06 | 继续优化 #002 暗色模式文字颜色 | 调整 CARD_TOKENS.dark 使用更深的颜色提高对比度 |
| 2026-03-06 | 修复 #001 和 #002 问题 | 主题切换状态同步 + 暗色模式文字可读性优化 |
| 2026-03-06 | 创建 docs/ISSUES.md 追踪文档 | 用户要求记录问题和修复情况 |
| 2026-03-04 | Phase 2 完成：next-themes 集成 | ThemeProvider 使用 attribute="class"，defaultTheme="system"，防白闪已配置 |
| 2026-03-04 | 取消独立 DarkModeToggle 组件 | SideNav 已有主题切换按钮，避免重复 |
| 2026-03-04 | SideNav 全局化（桌面侧边 + 移动端底部固定） | 子页面也需要导航，移动端需要可访问的入口 |
| 2026-03-04 | 移除 BackButton 组件 | 全局导航已覆盖返回首页功能 |
| 2026-03-04 | 导航当前路由高亮 | 用户需要知道当前所在页面 |
| 2026-03-04 | 导航移动端仅图标 | 底部空间有限，文字标签仅在 tooltip 显示 |
| 2026-03-04 | 主题切换按钮保留在导航栏内 | 桌面+移动端均可切换主题 |
| 2026-03-04 | 取消 Thoughts 标签多色化 | 用户决定不需要 |
| 2026-03-04 | 全站主站颜色统一常量化 | 消除硬编码，新建 `src/constants/theme.ts` |
| 2026-03-04 | 阴影策略：保留导航栏和特效阴影 | 零阴影仅适用于内容卡片 |
| 2026-03-04 | rgba()：CSS 中用 `color-mix(in oklab)` 替代，Canvas/SVG 保留 rgba 常量 | 兼顾规范和技术可行性 |
| 2026-03-04 | 颜色常量化采用统一版（theme.ts → layout 注入 :root/.dark） | 统一来源，消除 globals.css Hex |
| 2026-03-04 | 移动端导航仅图标（不显示文字 tooltip） | 移动端空间有限 |
| 2026-03-04 | themeColor 可选，fallback 为 `--theme-pardon` | 灵活性 |
| 2026-03-04 | defaultTheme = "system" | 跟随系统偏好 |
| 2026-03-04 | 不实现 prefers-reduced-motion | 用户决定不需要 |
| 2026-03-04 | metadataBase 等 Vercel URL 确定后再更新 | 当前无域名 |

## Notes

- `/playground` 页面不纳入文档和实施范围，其中的颜色和效果不做常量化
- 颜色常量化范围：仅主站功能（/、/about、/experience、/projects、/thoughts、SideNav、PageContainer）
- Canvas 内的动态 `rgba()` 计算（如 ConstellationTrail、AuroraTrail）保持原样，不做常量化
