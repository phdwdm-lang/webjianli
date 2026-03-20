# 工作经历页面改造方案

> 变更记录（由 plan-review-reviser 自动添加）
>
> - 2026-03-20：补充了与现有 `experience/page.tsx`、主题系统的对齐说明；将部分 CSS 设计从 `theme()` 辅助函数调整为更适合当前 Tailwind v4 + CSS 变量的实现建议；明确推荐优先复用 `PageContainer` + `CSS_VARS.themeJourney` 和现有 `--timeline-line` 变量，而不是在全局重新定义颜色。
> - 2026-03-20：澄清组件拆分范围，建议先将「侧滑抽屉」实现为局部组件或内联实现，再视后续复用需求抽离为 `ProjectDrawer` 组件，避免一次性抽象过度。

---

### ⚠️ 审核意见（2026-03-20）

以下问题需在开发前确认或修正：

| # | 问题 | 原因 | 建议修改 |
|---|------|------|----------|
| 1 | **`highlightKeyNumbers` 函数存在 Bug** | 使用 `pattern.test(part)` 判断匹配，但带 `g` 标志的正则每次调用 `test()` 后会修改 `lastIndex`，导致匹配结果不稳定。 | 改用索引判断：`split(pattern)` 后匹配内容在奇数索引位置，直接用 `index % 2 === 1` 判断。参考修正代码见下方。 |
| 2 | **CSS 变量命名不一致** | 3.3.1 中 hover 状态使用了 `--theme-journey`，但其他地方使用 `--section-color`。`--section-color` 是 `PageContainer` 动态注入的，更具语义一致性。 | 统一使用 `--section-color` 替代 `--theme-journey`，确保与 PageContainer 主题机制对齐。 |
| 3 | **3.1 组件清单与 Phase 1 存在冲突** | 3.1 列出了 `ProjectDrawer` 等 4 个组件路径，但 Phase 1 说"先不抽离 `ProjectDrawer` 到独立文件"。 | 在 3.1 中添加说明："以下为最终目标结构，Phase 1 可先内联实现，Phase 2 再拆分"。 |
| 4 | **`--on-color-border` 语义不适用** | 3.3.1 dark mode 中使用了 `--on-color-border`，该变量设计用于"on-color"背景（如主题色卡片上的元素），在普通页面上下文中语义不准确。 | 改用 `var(--card-border)` 或 `color-mix(in oklab, var(--card-border) 50%, transparent)`。 |
| 5 | **`color-mix()` 浏览器兼容性风险未提及** | 风险表中未列出 `color-mix()` 的兼容性。该函数在 Chrome 111+、Safari 16.2+、Firefox 113+ 支持，老旧浏览器可能失效。 | 在"五、风险与注意事项"中补充一行：`color-mix()` 兼容性 → 提供 fallback 或接受不支持的浏览器降级。 |
| 6 | **抽屉无障碍实现细节缺失** | 提到 ESC 关闭、焦点陷阱，但 Phase 1 未说明具体实现方式。 | Phase 1 补充："使用 `useEffect` 监听 `keydown` 事件实现 ESC 关闭；打开时将 `document.body` 设置 `overflow: hidden`"。焦点陷阱可延至 Phase 4 或引入 `@radix-ui/react-dialog`。 |

#### 修正后的 `highlightKeyNumbers` 实现

```tsx
const highlightKeyNumbers = (text: string) => {
  const pattern = /(\d+[\d,]*\+?[万亿]?(?:份|次|个|人|%|项|家)?)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    // split 使用捕获组时，匹配内容在奇数索引
    index % 2 === 1 ? (
      <span key={index} className="text-[var(--section-color)] font-semibold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};
```

---

> 参考设计：`timeline-demo.html`
> 目标页面：`src/app/experience/page.tsx`
> 状态：**方案已通过初步评审，可进入开发（建议按 Phase 分步实施）**

---

## 一、现状分析

### 1.1 当前页面结构
| 层级 | 文件 | 职责 |
|------|------|------|
| 页面入口 | `src/app/experience/page.tsx` | 整合数据、渲染时间轴 |
| 数据源 | `src/constants/profile.ts` | `WORK_EXPERIENCE` + `EDUCATION` 常量 |
| 容器组件 | `src/components/PageContainer.tsx` | 页面外壳、标题、主题色 |

### 1.2 当前交互模式
- **项目展示方式**：使用 HTML `<details>` 折叠面板，点击展开项目列表
- **信息层次**：公司卡片内嵌项目卡片，展开后信息密度较高
- **时间轴样式**：左侧单列时间轴 + 右侧卡片，Dot 尺寸 40px

### 1.3 存在的问题
1. **信息过载**：展开后项目详情直接平铺在卡片内，页面纵向延伸过长
2. **视觉层次弱**：关键数据（如"2200万+活跃用户"、"1173份问卷"）未做高亮，用户难以快速抓取重点
3. **交互体验一般**：`<details>` 折叠缺乏动画，展开/收起略显生硬
4. **时间展示单调**：时间以小型胶囊标签形式放在卡片右上角，不够醒目

---

## 二、目标设计（参考 Demo）

### 2.1 核心设计语言
| 特性 | 描述 |
|------|------|
| **玻璃拟态（Glassmorphism）** | 卡片采用 `backdrop-filter: blur(12px)` 毛玻璃效果 |
| **侧滑抽屉（Side Drawer）** | 项目详情不再内嵌，点击项目标签后从右侧滑出抽屉展示 |
| **关键词高亮** | 使用 `<strong class="text-primary">` 高亮数字，`<strong class="text-white">` 高亮成果 |
| **单行时间轴** | 桌面端左侧独立展示 `YYYY.MM - YYYY.MM`，与卡片平行排列 |
| **深浅主题适配** | 完整支持 Light / Dark Mode 切换 |

### 2.2 布局对比

| 维度 | 当前实现 | 目标设计 |
|------|----------|----------|
| 时间轴位置 | 左侧 19px，Dot 40px | 左侧 190px（桌面端），Dot 48px |
| 时间显示位置 | 卡片内右上角胶囊 | 卡片左侧独立区域（桌面端） |
| 内容区域 | `pl-12` (~48px) | `pl-[270px]`（桌面端） |
| 项目详情 | 卡片内 `<details>` 折叠 | 侧滑抽屉 (Drawer) |
| 卡片样式 | 普通边框卡片 | Glassmorphism 毛玻璃卡片 |

### 2.3 交互流程

```
┌─────────────────────────────────────────────────────────┐
│                    页面默认状态                          │
│  ┌─────┐                                                │
│  │2024 │  ┌────────────────────────────────────────┐   │
│  │  -  │  │ 公司名称              [职位胶囊]        │   │
│  │2025 │  │ 公司层面描述（含高亮关键词）            │   │
│  │     │  │ [项目标签1] [项目标签2] [项目标签3]     │   │
│  └─────┘  └────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼ 点击项目标签
┌─────────────────────────────────────────────────────────┐
│                    抽屉打开状态                          │
│  ┌────────────────────┐ ┌──────────────────────────┐   │
│  │ (背景遮罩层)        │ │ ✕ 项目详情               │   │
│  │ 点击关闭            │ │ 项目名称                 │   │
│  │                    │ │ [时间胶囊] [角色胶囊]    │   │
│  │                    │ │ 项目背景                 │   │
│  │                    │ │ 核心贡献（列表形式）     │   │
│  └────────────────────┘ └──────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 三、技术实现方案

### 3.1 新增组件清单

| 组件名 | 路径建议 | 职责 |
|--------|----------|------|
| `TimelineCard` | `src/components/experience/TimelineCard.tsx` | 单个时间轴卡片（公司/学校） |
| `ProjectTag` | `src/components/experience/ProjectTag.tsx` | 项目标签按钮 |
| `ProjectDrawer` | `src/components/experience/ProjectDrawer.tsx` | 侧滑抽屉组件 |
| `TimelineDot` | `src/components/experience/TimelineDot.tsx` | 时间轴节点（带图标、光晕效果） |

> 说明：以上组件结构是**最终目标形态**。在 Phase 1 中，可以先在 `experience/page.tsx` 内联实现 Drawer 和 Timeline 结构，等交互与样式稳定后，再在 Phase 2 抽离为上述独立组件，避免过早抽象。

### 3.2 状态管理

```tsx
// 使用 React useState 管理抽屉状态
const [activeProject, setActiveProject] = useState<TimelineProject | null>(null);

// 打开抽屉
const openDrawer = (project: TimelineProject) => setActiveProject(project);

// 关闭抽屉
const closeDrawer = () => setActiveProject(null);
```

### 3.3 样式方案（与现有主题系统对齐）

> 实现约束：本项目已使用 `THEME_STYLE_TEXT` + CSS 变量 + Tailwind v4，不使用 demo 中基于 `tailwind.config` 的 `theme("colors.xxx")` 写法。以下样式示例在真正落地时，需要用 `var(--section-color)`、`var(--card-bg)`、`var(--card-border)` 等现有 Token 替换掉硬编码颜色。

#### 3.3.1 玻璃拟态卡片（需新增 CSS）

```css
/* 示例：在 globals.css 中定义基础 Glass 样式，具体颜色使用现有 CSS 变量 */
.glass-card {
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

/* Light Mode 基于 card 语义色实现 */
html:not(.dark) .glass-card {
  background: color-mix(in oklab, var(--card-bg) 90%, transparent);
  border: 1px solid var(--card-border);
  box-shadow: 0 4px 20px color-mix(in oklab, var(--shadow-ink) 3%, transparent);
}

html:not(.dark) .glass-card:hover {
  background: color-mix(in oklab, var(--card-bg) 98%, transparent);
  border-color: color-mix(in oklab, var(--section-color) 40%, var(--card-border));
}

/* Dark Mode 同样用 card 语义色 + journey 主题色，而不是硬编码具体颜色 */
.dark .glass-card {
  background: linear-gradient(
    145deg,
    color-mix(in oklab, var(--card-bg) 80%, transparent),
    color-mix(in oklab, var(--card-bg) 60%, transparent)
  );
  border: 1px solid color-mix(in oklab, var(--card-border) 50%, transparent);
  box-shadow: 0 4px 30px color-mix(in oklab, var(--shadow-ink) 20%, transparent);
}

.dark .glass-card:hover {
  border-color: color-mix(in oklab, var(--section-color) 35%, transparent);
}
```

#### 3.3.2 时间轴渐变线

> 时间轴线应继续复用当前页面的 `--timeline-line` + `--section-color` 语义色，而不是重新引入新的主色。

```css
.timeline-line {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    color-mix(in oklab, var(--section-color) 60%, var(--timeline-line)) 10%,
    color-mix(in oklab, var(--section-color) 60%, var(--timeline-line)) 90%,
    transparent 100%
  );
  opacity: 0.3;
}
```

#### 3.3.3 节点光晕效果

```css
.dot-glow {
  box-shadow: 0 0 15px color-mix(in oklab, var(--section-color) 30%, transparent);
  transition: all 0.3s ease;
}

.group:hover .dot-glow {
  box-shadow: 0 0 25px color-mix(in oklab, var(--section-color) 60%, transparent);
  transform: scale(1.1);
}
```

### 3.4 数据层与高亮策略

> 约束：当前 `PROFILE` / `WORK_EXPERIENCE` 等常量以普通字符串为主，不包含 `{h}` 这类标记。为避免数据层混入模板语法，v1 更推荐在渲染层实现数字/关键词高亮。

#### 3.4.1 渲染层高亮（推荐）

- 在 `experience/page.tsx` 中实现一个小的高亮 helper：

```tsx
const highlightKeyNumbers = (text: string) => {
  const pattern = /(\d+[\d,]*\+?[万亿]?(?:份|次|个|人|%|项|家)?)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    // split 使用捕获组时，匹配内容会出现在奇数索引位置
    index % 2 === 1 ? (
      <span key={index} className="text-[var(--section-color)] font-semibold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};
```

- 公司描述渲染时包一层：

```tsx
{item.description && (
  <p className="text-sm text-[var(--muted)] mb-3">
    {highlightKeyNumbers(item.description)}
  </p>
)}
```

#### 3.4.2 数据层标记（可选，后续版本）

- 如将来需要对不同类型的高亮（数字 vs 结果）做更精细区分，可以再引入 `{h}` / `{strong}` 这类标记，并在 helper 中解析。

```tsx
// 示例：数据层标记（暂不在 v1 实施，仅作为后续扩展预留）
description: "负责移动云盘（{h-num}2200万+活跃用户{/h-num}）的用户研究工作，推动{h-result}瀑布流首页方案上线{/h-result}..."
```

### 3.5 响应式断点

| 断点 | 时间显示 | 时间轴位置 | 内容偏移 |
|------|----------|------------|----------|
| `< md` (768px) | 卡片顶部单独一行 | `left-[24px]` | `pl-[64px]` |
| `≥ md` | 卡片左侧独立区域 | `left-[190px]` | `pl-[270px]` |

---

## 四、改造步骤

### Phase 1：基础交互（先在页面内实现 Drawer）
1. 在 `experience/page.tsx` 内直接使用 `useState<TimelineProject | null>` 管理 `activeProject`，先不抽离 `ProjectDrawer` 到独立文件。
2. 用当前的 `TIMELINE_ITEMS` 数据结构接入「项目标签 + 右侧 Drawer」交互，保持现有 `<PageContainer>` 和主题色不变。
3. 保留 `<details>` 折叠实现作为过渡，或者一步直接替换为 Drawer（视实现复杂度而定）。
4. 在 Drawer 打开时：使用 `useEffect` 监听 `keydown` 事件处理 `ESC` 关闭，同时为 `document.body` 添加 `overflow: hidden` 以禁止背景滚动；关闭 Drawer 时恢复滚动。

> 说明：Drawer 抽象为通用组件的需求尚不明确，优先保证 experience 页功能完整，避免在“先设计通用 Drawer API”上投入过多时间。

### Phase 2：组件拆分与 Glass 样式
1. 创建 `src/components/experience/` 目录。
2. 将时间轴单项抽成 `TimelineCard` 或至少拆出 `TimelineDot` / `ProjectTag` 这些简单无状态组件，减少 `experience/page.tsx` 的体积。
3. 在 `globals.css` 或局部样式文件中添加 `glass-card`、`timeline-line`、`dot-glow` 等样式，全部基于现有 CSS 变量实现，不新增独立色板。

### Phase 3：高亮与文案增强
1. 实现 `highlightKeyNumbers` 这类渲染层 helper，对公司描述和项目描述中的关键数字做轻量高亮。
2. 视需要微调 `profile.ts` 中的文案，使句子结构更适合高亮效果（例如将数字与单位组合在一起）。

### Phase 4：主题适配与细节优化
1. 确保 Light/Dark Mode 下样式一致性
2. 添加 Hover 动画（卡片微浮、节点放大、时间位移）
3. 移动端适配测试

---

## 五、风险与注意事项

| 风险项 | 描述 | 缓解措施 |
|--------|------|----------|
| 动画性能 | `backdrop-filter` 在低端设备可能卡顿 | 添加 `will-change` 优化，或降级为纯色背景 |
| 抽屉无障碍 | 键盘用户需能用 ESC 关闭、Tab 焦点陷阱 | 参考 Radix UI Dialog 模式实现 |
| `color-mix()` 兼容性 | 部分老旧浏览器对 `color-mix()` 支持不完善，可能回退为纯色 | 接受旧浏览器降级效果，或为关键颜色提供不依赖 `color-mix()` 的 fallback |
| 数据高亮维护 | 手动标记高亮可能遗漏或过时 | 建立高亮规则文档，或使用正则自动化 |
| 页面容器兼容 | `PageContainer` 可能需要调整以适配新布局 | 检查 padding/margin 是否冲突 |

---

## 六、预期效果

### 改造前
- 项目信息折叠在卡片内，展开后信息密集
- 关键数据淹没在长段文字中
- 交互缺乏现代感

### 改造后
- 公司卡片精简聚焦，项目以优雅标签形式呈现
- 点击项目标签，侧滑抽屉平滑展示详情
- 关键数据高亮醒目，用户一眼抓住重点
- 玻璃拟态 + 光晕动效，视觉体验现代化
- 完整支持深浅主题切换

---

## 七、参考资源

- **Demo 文件**：`timeline-demo.html`
- **设计参考**：Apple Human Interface Guidelines - Cards & Modals
- **动画参考**：Framer Motion / CSS `cubic-bezier(0.32, 0.72, 0, 1)` (spring easing)
- **无障碍参考**：WAI-ARIA Dialog Pattern

---

**下一步**：确认方案无误后，开始 Phase 1 组件搭建。
