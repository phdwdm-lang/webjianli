# 项目经历页面重构方案（审核修订版）

> 以 `design_projects_demo.html` 为主要视觉参考，对现有 `src/app/projects/` 页面进行重构；本方案已结合当前仓库结构、主题系统与素材现状做过一次可落地修订。

---

## 〇、二次审核意见（2026-03-17 23:10）

整体方案质量较高，可落地执行。以下是 3 处需要修正或补充的细节：

### 问题 1：按钮 hover 样式缺失

**位置**：第七章 7.5 节 `.btn` 样式

**问题**：只定义了 `.btn` 和 `.btn-primary` 的默认状态，缺少 hover 状态样式。demo 中按钮 hover 有明显的边框高亮和轻微阴影反馈。

**修正**：已在 7.5 节补充 `.btn:hover` 和 `.btn-primary:hover` 样式。

---

### 问题 2：移动端时间徽标位置未明确

**位置**：第六章 6.3 节"时间徽标"

**问题**：demo 中桌面端时间徽标在图片左上角，但第二张卡片（reverse 布局）时徽标在右上角。方案未说明移动端（纵向堆叠）时徽标应该统一放哪个位置。

**修正**：已在 6.3 节补充说明：移动端统一放置在图片左上角，桌面端 reverse 布局时放置在右上角。

---

### 问题 3：`next/image` 的 `fill` 模式需要父容器定位

**位置**：第九章 9.3 节

**问题**：方案提到使用 `next/image`，但未明确是使用 `fill` 模式还是固定宽高。如果使用 `fill` 模式（推荐，适配不同比例图片），父容器必须设置 `position: relative`，否则图片无法正确填充。

**修正**：已在 9.3 节补充实现细节，明确使用 `fill` 模式 + 父容器 `relative` 定位。

---

### 审核结论

以上 3 处已在原文对应章节直接修正。方案整体可执行，无阻塞性问题。

---

## 一、审核结论（首次修订）

原方案方向基本正确，但有 4 个需要先修正的问题，否则后续实现容易出现“看起来像 demo，但和现有项目体系不兼容”的情况：

1. **改造范围写窄了**
   - 原方案只提到 `page.tsx` 调整卡片间距、`ProjectCard.tsx` 重写。
   - 但 demo 的视觉效果还依赖页面级容器宽度、标题区居中样式、背景网格纹理；如果不一起改，最终只会得到“新卡片 + 旧页面壳子”，和 demo 差异仍然明显。

2. **数据层与展示层边界不够清晰**
   - 原方案写了“亮点只留 2 条”“技术栈只留 4 条”“移除角色字段”，这在 UI 层成立，但不建议直接裁剪原始数据。
   - 更稳妥的做法是：**数据保留全量，UI 层按 demo 规则裁剪展示**，避免以后做详情页、导出简历、A/B 版本时信息丢失。

3. **有少量实现细节和仓库现状冲突**
   - 当前仓库已经有成熟的主题 token：`--section-color`、`--card-bg`、`--card-border`、`--muted` 等；方案里混用了 demo 的 `--theme-color` 写法，后续容易出现变量不一致。
   - 原方案提到“移除 `framer-motion` 动画依赖（如不再需要）”，但仓库中 `framer-motion` 被多个页面和组件使用，**这里只能移除 `ProjectCard` 内部对它的依赖，不能把包依赖当成清理目标**。

4. **素材规格建议需要修正**
   - 现有素材并不都是方图：`public/wolfcha/banner.png` 是 `5504 × 3072` 的横版大图，`public/BBQ-translator/000.png` 是 `2048 × 2048` 的方图。
   - 因此不应把封面图统一规定为 `1200 × 1200`；更合理的要求应该是：**支持横图与方图，通过容器裁切对齐视觉**，并优先做压缩优化。

---

## 二、重构目标

在不修改项目经历数据主干含义的前提下，将项目页从当前的“摘要 + 展开详情 + 轮播图”改为与 demo 一致的“**双栏大图卡片 + 全量核心信息常显 + 左右交替布局**”。

目标优先级如下：

1. **视觉结果优先贴近 demo**
   - 居中标题区
   - 页面网格背景
   - 大图 + 内容双栏卡片
   - 左右交替布局
   - 底部主次按钮

2. **实现方式优先兼容现有仓库**
   - 继续使用 `PageContainer`
   - 继续走现有主题 token，不硬编码一套新色彩系统
   - React/Next 实现时使用 `next/image`，不要直接照搬 demo 的原生 `<img>`

3. **内容策略优先遵循“展示收敛、数据保留”**
   - 页面上只展示前 2 条 highlights、前 4 个 tech stack
   - `role` 字段保留，但不再单独作为一个版块展示
   - `images` 字段保留，用于封面兜底或后续扩展

---

## 三、设计变更概览

| 维度 | 现有设计 | 修订后方案（以 demo 为主） |
|------|----------|----------------------------|
| **页面容器** | 默认 `PageContainer` 窄内容区 | 扩展到接近 demo 的宽版内容区，标题区居中 |
| **页面背景** | 常规纯色背景 | 增加轻量网格背景纹理 |
| **布局** | 纵向卡片 + 展开详情 | 左图右文 / 右图左文交替双栏 |
| **图片展示** | 折叠区内缩略图轮播 | 卡片内单张主封面直接展示 |
| **内容层级** | 摘要常显，其余折叠 | 核心信息常显，无折叠 |
| **亮点展示** | 全量罗列 | UI 展示前 2 条重点成果 |
| **技术栈** | 全量矩形小标签 | UI 展示前 4 个胶囊标签 |
| **操作入口** | 顶部小链接 | 卡片底部按钮组 |
| **动画** | 展开/收起动画 | 保留轻量 hover 反馈，移除折叠动画 |

---

## 四、涉及文件清单

| 文件路径 | 操作类型 | 说明 |
|----------|----------|------|
| `src/app/projects/page.tsx` | **修改** | 调整为宽版容器、自定义标题区、传递交替布局所需参数 |
| `src/app/projects/ProjectCard.tsx` | **重写** | 实现 demo 风格双栏卡片 |
| `src/app/projects/ProjectImages.tsx` | 计划删除 | 当前仅被项目页使用；新卡片确认不再展示轮播后可删除 |
| `src/constants/profile.ts` | 可选修改 | 如需更明确封面语义，可增加 `coverImage` 字段；否则直接复用 `images[0]` |
| `public/wolfcha/*` / `public/BBQ-translator/*` | 可选优化 | 评估并压缩封面素材，避免超大原图直接进入页面 |

---

## 五、页面级改造要求

这一部分是原方案漏写最多的地方，需要补齐。

### 5.1 `page.tsx` 不是只改间距

需要同时完成以下几点：

1. 使用 `PageContainer` 的扩展能力还原 demo 页面壳子
   - `contentClassName` 调整为更宽的内容区，例如接近 demo 的 `max-w-6xl`
   - 视情况使用 `hideHeader`，自行渲染居中标题区
   - `pageClassName` 增加浅色网格背景

2. 标题区改为 demo 风格
   - 标题居中
   - 副标题居中
   - 标题下方增加主题色短横线装饰

3. 明确传递卡片交替布局参数
   - 当前 `PROJECTS.map()` 只传 `project`
   - 新方案应传 `reverse={index % 2 === 1}`，或传 `index` 供 `ProjectCard` 内部计算

### 5.2 页面层建议结构

```tsx
<PageContainer hideHeader ...>
  <section>{/* 自定义居中标题区 */}</section>
  <div className="space-y-12">
    {PROJECTS.map((project, index) => (
      <ProjectCard
        key={project.name}
        project={project}
        reverse={index % 2 === 1}
      />
    ))}
  </div>
</PageContainer>
```

---

## 六、`ProjectCard.tsx` 修订后实现方案

### 6.1 组件职责

新 `ProjectCard` 负责以下事情：

1. 渲染单张封面图
2. 根据 `reverse` 决定左右布局
3. 展示标题、团队、周期、副标题、简介、亮点、统计、技术栈、按钮
4. 在移动端退化为纵向堆叠
5. 保留轻量 hover 动效，不再承担展开/折叠逻辑

### 6.2 推荐组件结构

```tsx
<article className="project-card">
  <div className="image-section">
    <Image />
    <span className="period-badge" />
  </div>

  <div className="content-section">
    <div>
      <header />
      <p className="subtitle" />
      <p className="description" />
      <ul className="highlight-list" />
    </div>

    <div>
      <div className="stat-group" />
      <div className="tag-group" />
      <div className="button-group" />
    </div>
  </div>
</article>
```

### 6.3 内容映射规则

| 区块 | 数据来源 | 规则 |
|------|----------|------|
| 封面图 | `project.coverImage ?? project.images?.[0]` | 优先显式封面，没有则取第一张图片 |
| 时间徽标 | `project.period` | 叠在图片上方；移动端统一左上角，桌面端 reverse 布局时改为右上角 |
| 团队标签 | `project.team` | 延续 demo 的 badge 形式 |
| 副标题 | `project.subtitle` | 使用 `--section-color` 着色 |
| 项目简介 | `project.description` | 保留 `highlightData()` 强调能力 |
| 核心亮点 | `project.highlights` | `slice(0, 2)` 仅展示前 2 条 |
| 数据统计 | `project.stats` | 默认渲染 4 项；如未来少于 4 项再补兼容 |
| 技术栈 | `project.techStack` | `slice(0, 4)` 仅展示前 4 项 |
| 操作按钮 | `project.link / project.videoLink / project.github` | 按优先级渲染 1 个主按钮 + 1 个次按钮 |

### 6.4 按钮优先级

为贴近 demo，同时避免一个项目底部出现 3 个按钮导致视觉失衡，建议采用：

1. `link` 存在时，主按钮显示“在线体验”
2. 否则 `videoLink` 存在时，主按钮显示“演示视频”
3. `github` 作为次按钮保留
4. 若主按钮与次按钮都不存在，则按钮区不渲染

---

## 七、关键样式要求

以下不是逐字照搬 demo，而是结合现有 token 的“翻译版”要求。

### 7.1 卡片容器

```css
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease;
}

@media (min-width: 768px) {
  .project-card {
    flex-direction: row;
    min-height: 400px;
  }

  .project-card.reverse {
    flex-direction: row-reverse;
  }
}
```

### 7.2 图片区

```css
.image-section {
  position: relative;
  width: 100%;
  min-height: 260px;
  overflow: hidden;
  background: color-mix(in oklab, var(--background) 92%, var(--foreground));
  border-bottom: 1px solid var(--card-border);
}

@media (min-width: 768px) {
  .image-section {
    width: 45%;
    min-height: auto;
    border-bottom: none;
    border-right: 1px solid var(--card-border);
  }

  .project-card.reverse .image-section {
    border-right: none;
    border-left: 1px solid var(--card-border);
  }
}
```

### 7.3 内容区

```css
.content-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
}

@media (min-width: 768px) {
  .content-section {
    padding: 2.5rem;
  }
}
```

### 7.4 统计区

> 这里建议不要生搬 demo 的“移动端仍然 4 列”，真实页面里会偏挤。

```css
.stat-group {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.25rem 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);
}

@media (min-width: 640px) {
  .stat-group {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

### 7.5 标签与按钮

```css
.tag {
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--section-color);
  background: color-mix(in oklab, var(--section-color) 6%, transparent);
  border: 1px solid transparent;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  color: var(--foreground);
}

.btn-primary {
  background: var(--section-color);
  color: #fff;
  border-color: var(--section-color);
}

.btn:hover {
  border-color: var(--section-color);
  color: var(--section-color);
  background: color-mix(in oklab, var(--section-color) 2%, var(--card-bg));
  box-shadow: 0 4px 12px color-mix(in oklab, var(--section-color) 8%, transparent);
}

.btn-primary:hover {
  background: color-mix(in oklab, var(--section-color) 85%, #000);
  border-color: color-mix(in oklab, var(--section-color) 85%, #000);
  box-shadow: 0 4px 12px color-mix(in oklab, var(--section-color) 20%, transparent);
}
```

### 7.6 Hover 反馈

| 效果 | 要求 |
|------|------|
| 卡片上移 | `translateY(-4px)` |
| 边框高亮 | 使用 `color-mix()` 基于 `--section-color` 做轻量强调 |
| 阴影增强 | 保持轻量，不要压过正文可读性 |
| 图片缩放 | hover 时 `scale(1.05)` |
| 标签/按钮 | 与 demo 一致，提供轻微颜色反馈 |

---

## 八、数据结构调整建议

### 8.1 类型定义建议

原方案中的 `coverImage?: string` 信息量偏少，建议改成以下两种方案之一：

#### 方案 A：不新增字段，直接复用首图

```ts
type Project = {
  name: string;
  subtitle: string;
  team: string;
  period: string;
  description: string;
  role: string;
  github?: string;
  link?: string;
  videoLink?: string;
  stats: readonly { label: string; value: string }[];
  highlights: readonly string[];
  techStack: readonly string[];
  images?: readonly { src: string; alt: string }[];
};
```

适用场景：
- 每个项目 `images[0]` 都可以稳定作为封面
- 不需要把封面和截图语义区分开

#### 方案 B：新增明确的封面字段

```ts
type ProjectImage = {
  src: string;
  alt: string;
};

type Project = {
  name: string;
  subtitle: string;
  team: string;
  period: string;
  description: string;
  role: string;
  github?: string;
  link?: string;
  videoLink?: string;
  stats: readonly { label: string; value: string }[];
  highlights: readonly string[];
  techStack: readonly string[];
  images?: readonly ProjectImage[];
  coverImage?: ProjectImage;
};
```

适用场景：
- 封面图和截图不是同一张
- 后续想针对封面单独做裁切、alt、替换策略

### 8.2 数据保留策略

以下字段**不建议从数据层删除**：

| 字段 | 处理方式 |
|------|----------|
| `highlights` | 保留全量，UI 只展示前 2 条 |
| `techStack` | 保留全量，UI 只展示前 4 个 |
| `role` | 保留字段，但不在项目卡中单独占一个模块 |
| `images` | 保留，用于封面兜底或未来恢复图库能力 |

---

## 九、素材与图片要求

### 9.1 封面图建议

不要强制统一成方图，改为以下规则：

1. 允许横图或方图
2. 页面层通过固定容器 + `object-cover` 保证视觉统一
3. 重要主体尽量位于画面中部安全区域
4. 优先导出压缩后的 WebP / 优化 PNG

### 9.2 当前素材现状

| 文件 | 当前尺寸 | 风险 |
|------|----------|------|
| `public/wolfcha/banner.png` | `5504 × 3072` | 尺寸和体积都偏大，建议导出更适合网页的版本 |
| `public/BBQ-translator/000.png` | `2048 × 2048` | 尺寸可用，但仍建议压缩 |

### 9.3 实现建议

1. 组件内使用 `next/image` 的 **`fill` 模式**（适配不同比例图片）
2. 父容器 `.image-section` 必须设置 `position: relative`（7.2 节样式已包含）
3. 图片设置 `object-fit: cover` + `object-position: center`
4. 提供合理 `sizes` 属性，例如：`sizes="(max-width: 768px) 100vw, 45vw"`
5. 桌面端图片区高度由卡片内容撑开，移动端通过 `min-height: 260px` 保证稳定高度
6. 若素材优化暂时来不及，至少先避免直接以内页原始大图无约束加载

**代码示例**：

```tsx
<div className="image-section relative">
  <Image
    src={coverSrc}
    alt={coverAlt}
    fill
    sizes="(max-width: 768px) 100vw, 45vw"
    className="object-cover object-center"
  />
  <span className="period-badge">...</span>
</div>
```

---

## 十、移除与保留清单

| 项目 | 结论 | 说明 |
|------|------|------|
| 展开/折叠交互 | **移除** | 与 demo 不一致，且信息已改为常显 |
| `ProjectImages.tsx` 轮播组件 | **移除页面引用，组件可删除** | 确认项目页不再需要轮播后删除 |
| `ProjectCard` 内部 `useState` | **移除** | 不再需要折叠状态 |
| `ProjectCard` 内部 `AnimatePresence` / 折叠动画 | **移除** | 不再需要 |
| `framer-motion` 包依赖 | **保留** | 仓库其他页面仍在使用 |
| `role` 数据字段 | **保留** | 仅取消独立展示模块 |
| `images` 数据字段 | **保留** | 兼容封面兜底与后续扩展 |

---

## 十一、实施步骤

1. **改造 `page.tsx` 页面壳子**
   - 调整 `PageContainer` 参数
   - 实现 demo 风格标题区
   - 增加背景纹理
   - 向 `ProjectCard` 传递 `reverse`

2. **重写 `ProjectCard.tsx`**
   - 去掉折叠/展开逻辑
   - 改成双栏结构
   - 接入封面图、时间徽标、按钮组
   - 高亮与技术栈按 UI 层裁剪展示

3. **确定封面图策略**
   - 优先评估是否直接用 `images[0]`
   - 若不够稳定，再补 `coverImage`

4. **清理旧实现**
   - 删除 `ProjectImages` 的页面引用
   - 确认无残留样式与无效 import

5. **优化素材**
   - 压缩 `wolfcha` 与 `BBQ Translator` 封面
   - 检查裁切后的主体是否仍清晰

6. **做响应式与主题验证**
   - 桌面端左右交替
   - 移动端纵向堆叠
   - 浅色 / 深色模式下均保持可读性

---

## 十二、验收标准

满足以下条件时，可认为本次重构达标：

1. 页面整体第一视觉与 `design_projects_demo.html` 保持一致
2. 每个项目卡片默认完整展示关键信息，无需点击展开
3. 桌面端卡片左右交替，移动端自然堆叠
4. 按钮层级清晰，最多两枚主要操作按钮
5. 图片加载方式不会因超大原图导致明显性能问题
6. 未破坏现有主题 token 体系，浅/深色下均可读
7. 数据层未因本次改版被过度裁剪，后续仍可扩展

---

## 十三、本次修订摘要

相对原方案，本次主要补充和修正了以下内容：

1. 将改造范围从“卡片重写”扩大到“页面壳子 + 卡片 + 素材策略”
2. 明确 `page.tsx` 需要负责标题区、背景、宽度和左右交替参数传递
3. 明确保留 `role` / `images` / 全量 `highlights` / 全量 `techStack` 数据
4. 将 `coverImage?: string` 修正为“可不新增字段”或“新增完整对象字段”两种更稳妥方案
5. 明确只移除项目页内的折叠动画逻辑，不误伤仓库级 `framer-motion` 依赖
6. 修正封面图规格，不再强制要求方图，并增加素材压缩要求
7. 增加响应式、主题兼容和图片性能方面的验收标准

---

*审核修订时间：2026-03-17*
