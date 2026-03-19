# 思想碎片模块 - 详细设计规格书

> **文档版本**：v1.0  
> **创建日期**：2026-03-18  
> **内容来源**：`docs/plan/thoughts-refactor.md`  
> **设计参考**：  
> - `public/design-753c4a1f-8c4d-4a18-b745-5156f6066109.html`  
> - `public/design-15994322-8e13-4175-abfe-cd76b0fb13bc.html`  
> - `public/design-b4d47e24-3ec4-411b-a1b3-f7ec6c08ab70.html`

---

## 一、设计参考说明

### 1.1 参考文件总览

| 文件 | 简称 | 主要参考内容 |
|------|------|-------------|
| `design-753c4a1f` | **Demo-A** | 点阵背景、玻璃态UI面板、胶带装饰、绿色主题 |
| `design-15994322` | **Demo-B** | 网格背景、便签阴影、拍立得样式、交互逻辑 |
| `design-b4d47e24` | **Demo-C** | 十字网格背景、手写体字体、侧边日期栏 |

### 1.2 具体参考细节

#### 从 Demo-A 参考（`design-753c4a1f`）

| 元素 | 参考位置 | 应用场景 |
|------|---------|---------|
| **点阵背景** | Line 27-30 `.dot-bg` | 页面整体背景 |
| **玻璃态面板** | Line 139-144 `.glass-panel` | 顶部导航/底部状态栏 |
| **胶带装饰** | Line 146-157 `.tape` | 个人想法便签顶部 |
| **绿色主题** | `#528B71` | 主题色参考（调整为项目现有翡翠绿） |
| **便签圆角** | Line 53 `border-radius: 8px` | 所有便签卡片 |
| **选中轮廓** | Line 64-67 `.is-selected` | 选中状态样式 |
| **旋转手柄** | Line 70-96 `.rotate-handle` | 便签旋转交互 |

```css
/* 参考代码 - 点阵背景 */
.dot-bg {
    background-image: radial-gradient(#D0D5D2 1px, transparent 1px);
    background-size: 24px 24px;
}

/* 参考代码 - 胶带装饰 */
.tape {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 80px;
    height: 24px;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(2px);
}
```

#### 从 Demo-B 参考（`design-15994322`）

| 元素 | 参考位置 | 应用场景 |
|------|---------|---------|
| **网格背景** | Line 17-22 `.grid-bg` | 备选背景方案 |
| **纸张阴影** | Line 24-26 `.paper-shadow` | 金句便签 |
| **拍立得阴影** | Line 27-29 `.polaroid-shadow` | 配图便签 |
| **拖拽状态** | Line 42-47 `.is-dragging` | 拖拽时阴影增强 |
| **交互脚本** | Line 306-498 | 拖拽/旋转/缩放逻辑 |

```css
/* 参考代码 - 阴影样式 */
.paper-shadow {
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
}
.polaroid-shadow {
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
}
```

#### 从 Demo-C 参考（`design-b4d47e24`）

| 元素 | 参考位置 | 应用场景 |
|------|---------|---------|
| **手写体字体** | Line 36-39 `.font-handwriting` | 配图底部文字 |
| **十字网格** | Line 42-58 `.cross-grid` | 备选背景方案 |
| **标签样式** | Line 271 | 书籍来源标签 |
| **侧边栏日期** | Line 291-293 | 长文档卡片参考 |

```css
/* 参考代码 - 手写体 */
.font-handwriting {
    font-family: 'Caveat', cursive;
    letter-spacing: 0.05em;
}
```

---

## 二、便签内容清单

### 2.1 金句便签（12张）

| ID | 书籍来源 | 背景色 | 金句内容 | 字数 | 尺寸 |
|----|---------|-------|---------|------|------|
| Q1 | 认知觉醒 | `#EAF2ED` | 耐心不是毅力带来的结果，而是具有长远目光的结果。 | 24 | 中 220px |
| Q2 | 认知觉醒 | `#EAF2ED` | 习惯之所以难以改变，是因为它是自我巩固的——越用越强，越强越用。 | 30 | 中 240px |
| Q3 | 认知觉醒 | `#EAF2ED` | 阅读量 < 思考量 < 行动量 < 改变量 | 17 | 小 200px |
| Q4 | 认知觉醒 | `#EAF2ED` | 真正的行动力高手不是能同时做很多事的人，而是会想办法避免同时做很多事的人。 | 35 | 中 260px |
| Q5 | 俞军产品方法论 | `#FFFBE0` | 企业与用户交换的从来不是产品，而是价值。 | 20 | 中 220px |
| Q6 | 俞军产品方法论 | `#FFFBE0` | 想让一个人理解和接受一个道理，是要在他的偏好和认知结构内去实现的。 | 32 | 中 250px |
| Q7 | 乌合之众 | `#F0F4F8` | 词语的威力与它们所唤起的形象密切相关，跟本身的意思却毫无关系。 | 30 | 中 240px |
| Q8 | 用户体验要素 | `#FFF5ED` | 任何在用户体验上所做的努力，都是为了提高效率。 | 21 | 中 220px |
| Q9 | 非暴力沟通 | `#F5F3F8` | 他人的言行也许和我们的感受有关，但并不是我们感受的起因。 | 27 | 中 240px |
| Q10 | 非暴力沟通 | `#F5F3F8` | 对他人的批评间接表达了我们尚未满足的需要。 | 19 | 小 200px |
| Q11 | 非暴力沟通 | `#F5F3F8` | 不论你选择做什么，了解自己为什么要那样做。 | 19 | 小 200px |
| Q12 | 非暴力沟通 | `#F5F3F8` | 自责是尚未满足的需要的可悲表达。 | 16 | 小 180px |

### 2.2 个人想法便签（6张，不计入12张）

| ID | 关联金句 | 内容摘要 | 尺寸 |
|----|---------|---------|------|
| T2 | Q2 | 偷懒是人的天性...依靠知识而非自制力 | 大 300px |
| T3 | Q3 | 实践！实践！还是实践！ | 小 180px |
| T4 | Q4 | 上山就上山，砍柴就砍柴...不让目标压过当下 | 大 320px |
| T5 | Q5 | 企业以产品为媒介...交换价值 | 中 260px |
| T8 | Q8 | 帮助人们工作得更快...衡量用户体验设计 | 中 240px |
| T10 | Q10 | 对他人的指责反映了我们的需要... | 中 260px |
| T12 | Q12 | 来来回回读了两次...坦诚的心 | 大 280px |

### 2.3 配图便签（3张，不计入12张）

| ID | 关联金句 | 图片路径 | 底部文字建议 |
|----|---------|---------|-------------|
| P1 | Q2 | `public/picture/image.png` | 习惯的力量 |
| P2 | Q3 | `public/picture/image3.png` | 知行合一 |
| P3 | Q5 | `public/picture/image2.png` | 价值交换 |

---

## 三、视觉设计规格

### 3.1 整体布局

```
┌──────────────────────────────────────────────────────────────────┐
│  ● Oryzae / Thoughts                              [筛选] [重置]  │  ← 玻璃态顶栏 (参考 Demo-A)
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│    ┌─────┐      ┌───────┐                ┌─────┐                 │
│    │ Q1  │      │  Q4   │    ┌─────┐     │ P1  │                 │
│    └─────┘      └───────┘    │ T3  │     └─────┘                 │
│         ┌──────┐             └─────┘                              │
│         │  Q2  │                      ┌───────┐                   │
│         └──────┘    ┌─────┐           │  Q7   │     ┌─────┐      │
│    ┌─────┐          │ Q5  │           └───────┘     │ Q10 │      │
│    │ T2  │          └─────┘                         └─────┘      │
│    └─────┘     ┌─────┐        ┌──────┐       ┌─────┐             │
│                │ P2  │        │  Q8  │       │ Q11 │             │
│    ┌───────┐   └─────┘        └──────┘       └─────┘             │
│    │  Q3   │          ┌─────┐                                     │
│    └───────┘          │ T5  │      ┌─────┐      ┌─────┐          │
│                       └─────┘      │ Q12 │      │ T12 │          │
│         ┌─────┐                    └─────┘      └─────┘          │
│         │ P3  │    ┌───────┐                                      │
│         └─────┘    │  Q6   │       ┌─────┐                        │
│                    └───────┘       │ Q9  │                        │
│                                    └─────┘                        │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ✓ Saved · 12 金句 / 7 想法 / 3 配图                              │  ← 玻璃态底栏 (参考 Demo-A)
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 背景样式

采用 **点阵背景**（参考 Demo-A Line 27-30）：

```css
.thoughts-bg {
    background-color: #F9F8F4;
    background-image: radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px);
    background-size: 20px 20px;
}
```

### 3.3 便签卡片样式

#### 金句便签（Quote Card）

参考 Demo-A Line 248-257 + Demo-B Line 201-206

```
┌─────────────────────────────────┐
│ ○ #认知觉醒                     │  ← 书籍标签 (参考 Demo-A Line 251)
├─────────────────────────────────┤
│                                 │
│  "耐心不是毅力带来的结果，      │  ← 金句内容
│   而是具有长远目光的结果。"     │
│                                 │
└─────────────────────────────────┘
```

```css
.quote-card {
    background: var(--card-color);  /* 按书籍颜色 */
    padding: 24px;
    border-radius: 8px;             /* 参考 Demo-A Line 53 */
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);  /* 参考 Demo-B .paper-shadow */
    border: 1px solid rgba(0,0,0,0.04);
}
```

#### 个人想法便签（Thought Card）

参考 Demo-A Line 146-157 胶带装饰 + Demo-C Line 257-265

```
        ═══════                       ← 胶带装饰 (参考 Demo-A .tape)
┌─────────────────────────────────┐
│                                 │
│  偷懒是人的天性，理智脑对大脑   │
│  的控制能力很弱...              │
│                                 │
│                     — 我的想法  │  ← 右下角署名
└─────────────────────────────────┘
```

```css
.thought-card {
    background: #FFFCF9;
    padding: 20px;
    border-radius: 2px;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);  /* 参考 Demo-A .soft-shadow */
    position: relative;
}
.thought-card::before {  /* 胶带 */
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 60px;
    height: 20px;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(2px);
}
```

#### 配图便签（Photo Card）

参考 Demo-B Line 249-256 + Demo-C Line 310-320 拍立得样式

```
┌─────────────────────────────────┐
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │         [图片区域]          │ │  ← 图片 aspect-ratio: 4/5
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│        习惯的力量               │  ← 手写体 (参考 Demo-C .font-handwriting)
│                                 │
└─────────────────────────────────┘
```

```css
.photo-card {
    background: #FFFCF9;
    padding: 12px 12px 40px 12px;
    border-radius: 2px;
    box-shadow: 0 15px 35px -5px rgba(0,0,0,0.1);  /* 参考 Demo-A .photo-shadow */
    border: 1px solid rgba(0,0,0,0.05);
}
.photo-card img {
    aspect-ratio: 4/5;
    object-fit: cover;
    border-radius: 2px;
}
.photo-card .caption {
    font-family: 'Caveat', cursive;  /* 参考 Demo-C */
    text-align: center;
    color: #888;
    margin-top: 12px;
}
```

### 3.4 书籍来源颜色映射

| 书籍 | 背景色 | 标签色 | 边框色 |
|------|-------|-------|-------|
| 认知觉醒 | `#EAF2ED` | `#528B71` | `#D5E5DC` |
| 俞军产品方法论 | `#FFFBE0` | `#C9A227` | `#F2EDD0` |
| 乌合之众 | `#F0F4F8` | `#5B7A99` | `#D8E2EC` |
| 用户体验要素 | `#FFF5ED` | `#D48C70` | `#F5E0D5` |
| 非暴力沟通 | `#F5F3F8` | `#8B7AA8` | `#E5E0EC` |

---

## 四、交互设计规格

### 4.1 拖拽交互

参考 Demo-B Line 378-491 交互脚本

| 状态 | 样式变化 |
|------|---------|
| 默认 | `cursor: grab` |
| 按下 | `cursor: grabbing` |
| 拖拽中 | `box-shadow` 加深，`z-index` 置顶，`scale(1.02)` |

```javascript
// 参考 Demo-B applyTransform 函数
function applyTransform(el, x, y, r) {
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.transform = 'rotate(' + r + 'deg)';
}
```

### 4.2 旋转交互

参考 Demo-A Line 70-96 旋转手柄

| 状态 | 样式 |
|------|------|
| 未选中 | 手柄隐藏 `opacity: 0` |
| 选中 | 手柄显示，位于便签顶部中央 |
| 旋转中 | `cursor: grabbing` |

### 4.3 选中状态

参考 Demo-A Line 64-67

```css
.board-item.is-selected {
    outline: 2px solid rgba(16, 185, 129, 0.4);  /* 翡翠绿 */
    outline-offset: 4px;
}
```

### 4.4 刷新还原

- 不使用 `localStorage` 保存状态
- 每次加载页面时，便签位置/旋转角度恢复为数据中定义的初始值

---

## 五、数据结构定义

### 5.1 TypeScript 接口

```typescript
// 便签类型
type NoteType = 'quote' | 'thought' | 'photo';

// 书籍来源
type BookSource = 
  | '认知觉醒' 
  | '俞军产品方法论' 
  | '乌合之众' 
  | '用户体验要素' 
  | '非暴力沟通';

// 尺寸
type NoteSize = 'sm' | 'md' | 'lg';

// 便签数据
interface ThoughtNote {
  id: string;
  type: NoteType;
  content: string;
  source?: BookSource;
  linkedTo?: string;      // 关联的金句 ID（用于个人想法/配图）
  size: NoteSize;
  color: string;
  position: { x: number; y: number };
  rotation: number;       // 初始旋转角度 (deg)
  photoUrl?: string;
  caption?: string;
}

// 书籍颜色配置
interface BookColorConfig {
  background: string;
  label: string;
  border: string;
}

const BOOK_COLORS: Record<BookSource, BookColorConfig> = {
  '认知觉醒': { background: '#EAF2ED', label: '#528B71', border: '#D5E5DC' },
  '俞军产品方法论': { background: '#FFFBE0', label: '#C9A227', border: '#F2EDD0' },
  '乌合之众': { background: '#F0F4F8', label: '#5B7A99', border: '#D8E2EC' },
  '用户体验要素': { background: '#FFF5ED', label: '#D48C70', border: '#F5E0D5' },
  '非暴力沟通': { background: '#F5F3F8', label: '#8B7AA8', border: '#E5E0EC' },
};
```

### 5.2 便签数据示例

```typescript
const THOUGHT_NOTES: ThoughtNote[] = [
  // 金句便签
  {
    id: 'Q1',
    type: 'quote',
    content: '耐心不是毅力带来的结果，而是具有长远目光的结果。',
    source: '认知觉醒',
    size: 'md',
    color: '#EAF2ED',
    position: { x: 120, y: 100 },
    rotation: -2,
  },
  // 个人想法便签
  {
    id: 'T2',
    type: 'thought',
    content: '偷懒是人的天性，理智脑对大脑的控制能力很弱...',
    linkedTo: 'Q2',
    size: 'lg',
    color: '#FFFCF9',
    position: { x: 380, y: 120 },
    rotation: 1,
  },
  // 配图便签
  {
    id: 'P1',
    type: 'photo',
    content: '',
    linkedTo: 'Q2',
    size: 'sm',
    color: '#FFFCF9',
    position: { x: 600, y: 80 },
    rotation: 3,
    photoUrl: '/picture/image.png',
    caption: '习惯的力量',
  },
  // ... 更多便签
];
```

---

## 六、文件结构规划

```
src/
├── app/thoughts/
│   └── page.tsx              # 页面主体
├── components/thoughts/
│   ├── ThoughtBoard.tsx      # 便签墙容器（含交互逻辑）
│   ├── QuoteCard.tsx         # 金句便签组件
│   ├── ThoughtCard.tsx       # 个人想法便签组件
│   └── PhotoCard.tsx         # 配图便签组件
├── constants/
│   └── thoughts.ts           # 便签数据常量
└── hooks/
    └── useDraggable.ts       # 拖拽/旋转逻辑 Hook
```

---

## 七、实施步骤

1. **创建数据常量** `src/constants/thoughts.ts`
2. **实现拖拽 Hook** `src/hooks/useDraggable.ts`（参考 Demo-B 交互脚本）
3. **创建便签组件** 三种类型卡片
4. **创建便签墙容器** `ThoughtBoard.tsx`
5. **重构页面** `app/thoughts/page.tsx`
6. **样式调优** 背景、阴影、动画细节
7. **响应式适配** 移动端禁用拖拽，改为瀑布流

---

## 八、附录：图片资源

| 文件名 | 路径 | 关联便签 |
|--------|------|---------|
| image.png | `public/picture/image.png` | P1 → Q2 |
| image2.png | `public/picture/image2.png` | P3 → Q5 |
| image3.png | `public/picture/image3.png` | P2 → Q3 |
