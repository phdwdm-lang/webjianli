# 思想碎片页改造方案

> 基于 `public/thoughts-demo.html` 原型，对现有 `/thoughts` 页面进行全面改造

---

## 本次修改说明（v1.2 - Cascade 审核修订）

以下为 Cascade 在审核 v1.1 后补充的修订：

1. **补全 ThoughtNote 类型中的弹窗样式字段**
   - 原因：demo 的 `letterData` 每条数据都包含 `bgColor` 和 `accentColor`，用于渲染信纸弹窗的背景色与强调色。v1.1 的 `ThoughtNote` 类型遗漏了这两个必需字段，会导致弹窗样式无法正确渲染。

2. **明确便签样式与弹窗样式的职责边界**
   - 原因：`NoteStyleMapItem.backgroundColor` 与 `ThoughtNote.bgColor` 容易混淆。需明确：前者控制便签卡片外观，后者控制弹窗内容区背景。两者可以不同，但都需要在数据迁移时正确提取。

3. **补充便签宽度说明**
   - 原因：v1.1 写"宽度范围 300px - 650px"，但 demo 实际通过 CSS `scale: 1.25` 统一放大，视觉呈现是 375px - 812px。需明确这是"原始定义宽度"还是"渲染后宽度"，避免开发时混淆。

4. **补充图片资源迁移说明**
   - 原因：demo 中部分便签引用了 `./picture/` 下的图片（如 `image.png`、`image2.png`、`image3.png`），v1.1 未提及这些资源的迁移方案。需明确图片是否保留、放置位置、引用路径。

**审核结论：上述问题已在本次修订中补全，v1.2 方案可以进入开发阶段。**

---

## 历史修改说明（v1.1）

以下内容为开发同事在审核 v1.0 后直接修订的部分：

1. **调整页面容器方案**
原因：现有 `/thoughts` 使用 [`src/components/PageContainer.tsx`](D:\work\project\webjianli\src\components\PageContainer.tsx) 的 `max-w-3xl` 居中布局，和“全屏无限画布”天然冲突；同时站点还存在固定侧边导航与底部移动导航，需要在方案里明确安全区与覆盖关系，否则开发时一定会反复返工。

2. **收紧交互范围，区分正式体验与开发工具**
原因：原方案把“长按 200ms”“双指/右键旋转”等编辑交互直接放进主流程，但 demo 实际实现是“点击选中 + 旋转手柄”，而正式页面并不需要把便签拖拽暴露给访客。为降低复杂度与误触风险，修订为“正式页只读，开发模式显式开启布局编辑”。

3. **修正样式枚举与数据映射不一致问题**
原因：原文 `NoteVariant` 中没有 `tape-irregular`，但后面的样式分配表又使用了它，这会直接阻塞 TypeScript 落地。现已统一为“以 demo 实际样式为准”，并补齐枚举定义。

4. **调整字体策略，不再要求 7 种字体全部预加载**
原因：当前项目已经通过 [`src/app/layout.tsx`](D:\work\project\webjianli\src\app\layout.tsx) 引入基础字体。若继续要求全部字体预加载，会明显拖慢首屏并放大字体闪烁风险。修订后改为“核心字体优先、装饰字体按需加载”，避免为视觉细节付出过高性能代价。

5. **移除首版不必要的虚拟化与全局状态管理要求**
原因：首版仅 30 张便签，直接引入虚拟化、zustand 或 jotai 属于明显过度设计，而且会增加拖拽、弹窗、测量逻辑复杂度。修订为“常量数据 + 局部状态”即可。

6. **补充主题与动效底线**
原因：当前站点已接入 `next-themes`，且全局样式中已经考虑 `prefers-reduced-motion`。如果方案不提前说明 dark mode 与 reduced motion 的处理策略，开发时会留下明显体验断层。

7. **补充开发结论**
原因：你希望先判断能否进入开发阶段，因此我在文档中明确给出结论：**原始方案不建议直接开工；按本次修订后的 v1.1 方案，可以进入开发阶段。**

---

## 一、改造目标

将现有的垂直列表式思想碎片页改造为**全屏沉浸式便签画布**，通过错落摆放的便签、多样化的纸张风格和轻量交互，呈现更具个性和温度的阅读体验，同时保持与现有站点主题系统、导航结构和技术栈兼容。

---

## 二、现状分析

### 2.1 当前实现（`src/app/thoughts/page.tsx`）

| 维度 | 现状 |
|------|------|
| 布局 | 垂直列表，`max-w-3xl` 居中 |
| 容器 | 使用 `PageContainer` 包装 |
| 数据 | 从 `THOUGHTS` 常量读取，仅 4 条 |
| 样式 | 统一卡片样式，圆角边框 |
| 交互 | hover 位移、边框高亮 |

### 2.2 原型特性（`public/thoughts-demo.html`）

| 维度 | 原型实现 |
|------|----------|
| 布局 | 8000 × 5250 px 画布，可拖拽浏览 |
| 数据 | 30 张便签，位置与旋转角度已给出 |
| 样式 | 10+ 类便签风格，包含日记、胶带、圆钉、回形针等 |
| 字体 | 正文 + 标签 + 多种装饰字体混排 |
| 交互 | 画布拖拽、便签 hover、点击弹窗、开发态布局编辑 |
| 弹窗 | 信纸样式，支持图文混排 |

### 2.3 审核结论

原始方案**不建议直接进入开发**，主要阻塞点如下：

1. `PageContainer` 与全屏画布方案冲突，页面容器策略未收口。
2. `NoteVariant` 和样式分配表存在枚举不一致，代码落地会直接报错。
3. 正式交互与开发工具没有分层，容易在实现阶段范围失控。
4. 字体、暗色主题、减少动效等现有工程约束未被纳入方案。
5. 首版性能与状态管理存在过度设计倾向。

**结论：按本次修订后的 v1.1 方案，可以进入开发阶段；但在你确认文档无误前，我不会开始代码修改。**

---

## 三、开发范围分层

### 3.1 v1 必做范围

1. `/thoughts` 改为全屏画布页面，不再使用 `PageContainer` 的窄栏布局。
2. 复用 demo 中的 30 条内容、位置数据、样式映射。
3. 支持画布拖拽、便签 hover、点击打开详情弹窗。
4. 兼容现有主题系统，至少保证浅色与深色下都可读、可用。
5. 兼容 `prefers-reduced-motion`，在用户偏好减少动效时关闭大幅位移与缩放动画。
6. 移动端提供“可用但降级”的浏览体验，至少保证能进入页面、阅读内容、关闭弹窗。

### 3.2 v1 非必做但可保留的开发工具

1. 布局编辑模式，仅在开发环境中显式开启。
2. 便签拖拽与旋转手柄，仅服务于布局校准，不进入正式访客流程。
3. “保存布局”导出功能，用于把最新位置写回常量文件。

### 3.3 明确不在首版内解决的问题

1. 不引入虚拟化。
2. 不引入 zustand / jotai 作为布局状态管理。
3. 不追求和 demo 完全 1:1 的所有小装饰实现，只保留最有识别度的样式。
4. 不额外新增 30 条以外的新文案内容，数据以 demo 为准。

---

## 四、技术架构

### 4.1 目录与文件归属

为和现有仓库结构保持一致，建议按以下方式拆分：

```text
src/
├── app/
│   └── thoughts/
│       ├── page.tsx                     # 页面入口，负责页面级状态
│       ├── components/
│       │   ├── ThoughtsCanvas.tsx       # 画布视口与背景
│       │   ├── StickyNote.tsx           # 单张便签渲染
│       │   ├── LetterModal.tsx          # 详情弹窗
│       │   └── SaveLayoutButton.tsx     # 开发模式布局工具
│       ├── hooks/
│       │   ├── useCanvasDrag.ts         # 画布拖拽
│       │   └── useLayoutEditor.ts       # 开发模式下的拖拽/旋转
│       └── types.ts                     # route 内部类型
└── constants/
    └── thoughts.ts                      # 数据、位置、样式映射
```

### 4.2 页面容器策略

1. `/thoughts` 页面**不再复用** `PageContainer`。
2. 页面根节点仍保留 `section-page` 与 `--section-color`，以兼容现有主题变量与选区样式。
3. 页面内容采用 `min-h-screen overflow-hidden` 的全屏舞台。
4. 需要考虑 `SideNav` 与 `MobileNav` 的固定覆盖区域：
   - 桌面端允许导航悬浮在画布之上，但初始视口应避开左侧导航附近的核心阅读区。
   - 移动端弹窗底部需为 `MobileNav` 预留安全区，避免关闭按钮或正文被遮挡。

### 4.3 数据结构

```ts
export interface ThoughtNote {
  id: string;
  title: string;
  source: string;
  thought: string;
  date?: string;
  image?: string;
  imageCaption?: string;
  tags?: string[];
  // 弹窗样式（必需，用于 LetterModal 渲染）
  bgColor: string;
  accentColor: string;
}

export interface NotePosition {
  id: ThoughtNote["id"];
  x: number;
  y: number;
  r: number;
}

export type NoteVariant =
  | "diary-border"
  | "diary-date"
  | "diary-tape"
  | "snippet"
  | "tape-center"
  | "tape-yellow"
  | "tape-side-date"
  | "tape-purple"
  | "tape-irregular"
  | "pin-round"
  | "pin-center"
  | "clip"
  | "minimal"
  | "badge"
  | "warm-bar";

export interface NoteStyleMapItem {
  variant: NoteVariant;
  accentColor?: string;
  backgroundColor?: string;
}
```

### 4.4 数据真源

1. `THOUGHT_NOTES`、`NOTE_POSITIONS`、`NOTE_STYLE_MAP` 统一放到 `src/constants/thoughts.ts`。
2. 首版内容**直接来源于** `public/thoughts-demo.html` 中的 `letterData` 与 `notePositions`。
3. 现有 `src/constants/profile.ts` 中的 `THOUGHTS` 可以保留，供首页或其他列表使用；`/thoughts` 新页面不再依赖该常量。

---

## 五、UI 规范

### 5.1 画布

| 属性 | 值 |
|------|-----|
| 尺寸 | 8000 × 5250 px |
| 初始视口 | 默认定位到画布中部偏左上，避开固定侧边导航 |
| 背景 | 保留纸张感背景 + 十字网格 |
| 主题 | 浅色保留 demo 质感；深色使用更深的纸面底色与更弱的网格对比 |

### 5.2 便签基础样式

| 属性 | 值 |
|------|-----|
| 基础缩放 | `scale: 1.25` |
| 变换原点 | `transform-origin: top left` |
| 原始宽度 | 300px - 650px（CSS 定义值） |
| 渲染宽度 | 375px - 812px（经 scale 放大后） |
| 内边距 | `p-8` 至 `p-12` |
| 圆角 | 极小圆角，保持纸片感 |

> **说明**：开发时按原始宽度编写 Tailwind 类（如 `w-[520px]`），通过 CSS `scale: 1.25` 统一放大，无需手动计算放大后尺寸。

### 5.3 字体策略

字体不再按“全部预加载”执行，而是按优先级落地：

1. **核心字体**
   - `Noto Serif SC`：正文
   - `JetBrains Mono`：标签、日期、技术感文案

2. **装饰字体**
   - `Ma Shan Zheng`
   - `Caveat`
   - `ZCOOL XiaoWei`
   - `Long Cang`
   - `Zhi Mang Xing`

3. **实施原则**
   - 通过 `next/font/google` 引入，避免直接依赖 demo 的 CDN 链接。
   - 不要求所有字体 preload。
   - 若某个装饰字体引起明显性能或回流问题，可降级到现有字体变量，不影响上线。

### 5.4 色彩系统

保留 demo 的纸张色板，但需增加主题约束：

1. 浅色模式尽量接近 demo。
2. 深色模式不强行“反色”，而是维持深纸面 + 柔和便签层级，保证可读性优先。
3. 新增颜色时优先复用现有 `--section-color` 与全站主题 token，不随意引入脱节色值。

---

## 六、交互规范

### 6.1 正式用户交互

| 行为 | 实现 |
|------|------|
| 画布拖拽 | 鼠标或触摸在空白区域按下拖动 |
| 光标反馈 | `grab` → `grabbing` |
| 边界处理 | 允许轻微越界，松手后回弹 |
| 便签 hover | 上浮、轻微放大、阴影增强 |
| 打开详情 | 点击便签打开信纸弹窗 |
| 关闭详情 | 点击遮罩、ESC、显式关闭按钮 |

### 6.2 开发模式布局编辑

仅在开发环境显式开启，例如 `process.env.NODE_ENV === "development"` 时渲染编辑入口。

| 行为 | 实现 |
|------|------|
| 进入编辑模式 | 点击“布局编辑”或“保存布局”工具按钮 |
| 选择便签 | 点击便签后出现选中态 |
| 拖拽位置 | 直接拖拽便签 |
| 旋转角度 | 使用顶部旋转手柄 |
| 导出布局 | 输出 `NOTE_POSITIONS` 可直接回填的数据 |

说明：

1. 不再把“长按 200ms”“双指/右键旋转”作为首版必须能力。
2. 编辑模式与正式阅读模式必须隔离，避免访客误触。

### 6.3 弹窗

| 属性 | 值 |
|------|-----|
| 触发 | 点击便签 |
| 遮罩 | 半透明遮罩 + 模糊背景 |
| 内容宽度 | `max-w-lg` 左右，移动端自适应 |
| 内容形式 | 标题 + 正文段落 + 可选图片/图片说明 |
| 可访问性 | ESC 关闭、焦点约束、关闭按钮可见 |

### 6.4 动效与可访问性

1. 在 `prefers-reduced-motion: reduce` 下，关闭大幅 hover 缩放、回弹过渡与弹窗缩放动画。
2. 弹窗打开后需要阻止背景滚动与误操作。
3. 便签与按钮需要有清晰的可点击反馈，不只依赖颜色变化。

---

## 七、数据迁移方案

### 7.1 数据来源与迁移原则

1. 从 `public/thoughts-demo.html` 提取以下三类数据：
   - `letterData`（含 `bgColor`、`accentColor`）
   - `notePositions`
   - 每张便签实际对应的样式类别
2. 迁移后统一整理到 `src/constants/thoughts.ts`。
3. 页面渲染只消费 TS 常量，不直接读取 HTML demo。

### 7.2 图片资源迁移

demo 中以下便签引用了图片资源：

| 便签 ID | 图片路径 | 说明 |
|---------|----------|------|
| q2 | `./picture/image.png` | 习惯的力量 |
| q3 | `./picture/image3.png` | 知行合一 |
| q5 | `./picture/image2.png` | 价值交换 |

**迁移方案**：

1. 将图片复制到 `public/thoughts/` 目录下，统一命名规范。
2. 更新 `ThoughtNote.image` 字段为新路径，如 `/thoughts/habit.png`。
3. 若图片文件缺失或质量不足，可暂时设为 `null`，不影响其他功能上线。

### 7.3 样式映射原则

原文中的样式分配表保留“风格分布”思路，但以 demo 实际样式为准。开发时应确保：

1. 枚举名与映射表完全一致。
2. 每个 `id` 同时能查到：
   - 内容
   - 位置与角度
   - 变体样式
3. 若某些 demo 变体只出现 1 次，可以合并到更通用的实现，但视觉辨识度不能明显下降。

### 7.3 推荐常量组织方式

```ts
export const THOUGHT_NOTES: ThoughtNote[] = [/* 30 条数据 */];

export const NOTE_POSITIONS: NotePosition[] = [/* 30 条位置 */];

export const NOTE_STYLE_MAP: Record<string, NoteStyleMapItem> = {
  q1: { variant: "diary-border", accentColor: "#596C68" },
  q2: { variant: "diary-date", accentColor: "#78858B" },
  q26: { variant: "tape-irregular", backgroundColor: "#FFFCE8" },
};
```

---

## 八、实施计划

### Phase 1：页面骨架与主题对齐

- [ ] 用全屏页面容器替换 `PageContainer`
- [ ] 搭建画布视口、背景网格、初始偏移
- [ ] 对齐 `section-page`、`--section-color`、深浅色变量
- [ ] 补齐 route 内部类型与常量文件

### Phase 2：数据与便签渲染

- [ ] 从 demo 迁移 30 条数据、位置和样式映射
- [ ] 实现 `StickyNote` 基础组件
- [ ] 实现核心变体，优先覆盖 demo 中出现频率最高的样式
- [ ] 实现 hover 微交互与层级提升

### Phase 3：画布与弹窗体验

- [ ] 实现 `useCanvasDrag`
- [ ] 实现详情弹窗、正文排版、图片可选渲染
- [ ] 接入 ESC 关闭、遮罩关闭、背景锁定
- [ ] 补齐 reduced motion 兼容

### Phase 4：开发工具与收尾

- [ ] 加入开发模式布局编辑能力
- [ ] 加入旋转手柄与导出位置数据
- [ ] 移动端可用性调试
- [ ] 自测与 bug 修复

---

## 九、风险与注意事项

1. **字体风险**：装饰字体较多，首版必须接受“少量字体降级也可上线”的现实。
2. **主题风险**：若完全照搬浅色 demo，深色模式会割裂；必须至少做可读性适配。
3. **导航覆盖风险**：全屏画布会被固定导航覆盖，初始视口与弹窗安全区必须处理。
4. **交互冲突风险**：画布拖拽、便签点击、开发态编辑三者容易互相抢事件，需要清晰分层。
5. **数据维护风险**：30 条内容与位置数据较长，建议常量拆分清晰并保留布局导出工具。

---

## 十、验收标准

1. `/thoughts` 页面已从窄栏列表切换为全屏画布体验。
2. 30 张便签能按既定位置、角度与样式正常渲染。
3. 用户可以拖动画布浏览，且边界回弹自然。
4. 便签 hover 具有轻微上浮与层级反馈。
5. 点击便签可以打开详情弹窗，并完整展示正文内容。
6. 弹窗支持 ESC 关闭、遮罩关闭与显式关闭按钮。
7. 深色模式下页面仍保持可读，不出现严重对比度问题。
8. `prefers-reduced-motion` 下页面不会保留大幅动效。
9. 开发模式可调整便签位置并导出布局数据。

---

*文档版本: v1.2*  
*修订日期: 2026-03-19*  
*原型文件: `public/thoughts-demo.html`*
