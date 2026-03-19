# 个人信息页 Bento 重构方案

## 方案修订说明（2026-03-17）

本次是在原方案基础上的审核性修订，仅更新方案文档，不执行页面代码改造。

### 二次审核备注（2026-03-17）

> 审核人：Cascade
> 
> **整体结论**：修订内容质量较高，7 项修订中有 6 项完全合理，1 项需要补充说明。
> 
> **修订 7 补充说明**：
> 同事正确识别了工具栏数据不一致的问题，但方案中未给出明确的决策建议。
> 
> 当前 `PROFILE.tools` 为：`["墨刀", "Figma", "Axure", "Xmind", "Windsurf", "Cursor"]`
> Demo 展示的是：`["墨刀", "Axure", "Codex", "Windsurf", "Cursor", "Figma"]`
> 
> **差异**：现有数据有 `Xmind` 无 `Codex`，demo 有 `Codex` 无 `Xmind`。
> 
> **建议**：在 Phase 1 步骤 4 执行前，需要产品侧明确"以哪个数据源为准"，或者先同步更新 `PROFILE.tools` 再开始改造。此决策应作为实施前置条件。
> 
> **其余 6 项修订均合理**，无需补充。

---

### 已修订内容

1. 补充了“保留站点级页面框架”的约束，并新增容器宽度调整方案。
原因：当前 [`src/components/PageContainer.tsx`](/D:/work/project/webjianli/src/components/PageContainer.tsx) 默认内容宽度为 `max-w-3xl`，直接照搬 demo 的 4 列 Bento 布局会显得拥挤；同时 `PageContainer` 还是全站共用组件，不能把 demo 的 `body` 居中样式直接平移过来。

2. 修正了数据来源策略，不再新增重复的 `src/constants/profile.ts`。
原因：项目中已经存在 [`src/constants/profile.ts`](/D:/work/project/webjianli/src/constants/profile.ts)，原方案如果再创建同名或等价数据文件，会造成内容分叉和后续维护困难。

3. 修正了简历下载资源路径。
原因：Next.js 的 `public` 目录资源应使用站点根路径访问，实际文件已存在于 `public/彭焕东-18998360787.pdf`，因此页面链接应为 `/彭焕东-18998360787.pdf`，而不是 `/public/...`。

4. 增加了深浅色主题兼容要求，不再沿用 demo 中“强制纯白背景”的假设。
原因：当前项目已经有完整的主题 token 体系，见 [`src/constants/theme.ts`](/D:/work/project/webjianli/src/constants/theme.ts) 与 [`src/app/globals.css`](/D:/work/project/webjianli/src/app/globals.css)；如果直接照搬 demo 的白底方案，会破坏现有 dark mode 一致性。

5. 收紧了交互定义，明确桌面端与移动端的翻转规则，并补充键盘可达与减弱动画支持。
原因：原 demo 同时使用 `mouseenter` 与 `click toggle`，容易出现桌面端状态不一致；此外方案原文未覆盖键盘操作、`prefers-reduced-motion`、重复滚动内容的无障碍处理。

6. 修正了部分实现假设，补充了“仅将全局通用动画放入 `globals.css`”的约束。
原因：原方案把较多页面专用样式都放入全局文件，容易污染全站；更合适的做法是将通用 keyframes / helper class 放在全局，页面结构样式尽量用组件内 Tailwind class 组织。

7. 补充了内容映射风险，明确工具栏与能力卡片应优先复用现有常量，并对与 demo 不一致的文案做前置确认。
原因：当前 [`src/app/about/page.tsx`](/D:/work/project/webjianli/src/app/about/page.tsx) 和 [`src/constants/profile.ts`](/D:/work/project/webjianli/src/constants/profile.ts) 已有既存内容；例如 `tools` 现有数据与 demo 中展示项并不完全一致，方案必须先定义“以哪个数据源为准”。

---

## 一、现状核对

已核对以下项目现状：

- 当前关于页位于 [`src/app/about/page.tsx`](/D:/work/project/webjianli/src/app/about/page.tsx)，已是 `use client` 页面，并已使用 `framer-motion`。
- 当前页面通过 [`src/components/PageContainer.tsx`](/D:/work/project/webjianli/src/components/PageContainer.tsx) 承载标题、导航与内容容器。
- 当前项目已具备 `lucide-react`、`framer-motion`、`tailwindcss v4` 依赖，无需为此次重构新增这三项基础依赖。
- 当前主题 token 已集中定义于 [`src/constants/theme.ts`](/D:/work/project/webjianli/src/constants/theme.ts)，全局样式位于 [`src/app/globals.css`](/D:/work/project/webjianli/src/app/globals.css)。
- 当前简历文件已存在于 `public/彭焕东-18998360787.pdf`。
- 当前 `src/components/about/` 目录尚不存在，可以按需新增。

---

## 二、改造目标

将当前偏线性分段的信息展示页，重构为参考 `bento-demo.html` 的 Bento Grid 个人信息页，但**不机械复制 demo 的整页实现**，而是在保留现有站点结构、主题系统与导航方式的前提下完成视觉升级。

### 目标结果

- 关于页主体改为 4 列优先的 Bento 响应式网格
- 保留站点原有标题区与侧边导航，不改动全站页面骨架
- 使用卡片化信息组织个人介绍、地点、MBTI、兴趣、工具与能力
- 引入适度悬浮、翻转、滚动等交互，但保证移动端、键盘操作与低动态偏好可用
- 优先复用现有 profile / theme 常量，避免再次散落硬编码文案

### 非目标

- 本轮不重构其它页面
- 本轮不调整全站导航结构
- 本轮不新增复杂数据请求或 CMS

---

## 三、页面结构与容器策略

### 3.1 页面骨架

保留 [`src/components/PageContainer.tsx`](/D:/work/project/webjianli/src/components/PageContainer.tsx) 的页头与导航结构，但需要为 About 页提供更宽的内容区域。

### 3.2 容器调整建议

推荐二选一，优先采用方案 A：

1. 方案 A：为 `PageContainer` 增加可选的 `contentClassName` 或 `maxWidthClassName` 参数，仅 About 页传入更宽容器。
2. 方案 B：About 页保留 `PageContainer` 页头，内部再包一层 `max-w-6xl` 到 `max-w-7xl` 的自定义内容区域。

不建议直接把 `PageContainer` 默认宽度从 `max-w-3xl` 改为超宽，否则会影响全站其它页面。

### 3.3 Bento 网格规划

桌面端参考 demo 的信息分布：

```text
Profile(2x2) | Hiker(1x2) | Location(1x1)
Profile(2x2) | Hiker(1x2) | MBTI(1x1)
Hobbies(2x1) | Tools(2x1)
Capability A | Capability B | Capability C | Capability D
```

### 3.4 响应式断点

| 断点 | 主网格列数 | 能力卡列数 |
| --- | --- | --- |
| `xl`（>= 1280px） | 4 列 | 4 列 |
| `lg`（>= 1024px） | 3 列 | 2 列 |
| `md`（>= 768px） | 2 列 | 2 列 |
| `sm`（< 768px） | 1 列 | 1 列 |

补充约束：

- `HikerCard` 在 `md` 及以下降为 `span 1 / row span 1`
- `ProfileCard` 在 `md` 断点仍可保留 `span 2`，在 `sm` 收敛为单列
- `HobbiesCard`、`ToolsCard` 在非桌面断点优先占满当前行宽

---

## 四、组件拆分方案

遵循“页面组装 + 小而专一组件”的方式，但避免拆分过细。

### 目录建议

```text
src/
  app/
    about/
      page.tsx
  components/
    about/
      AboutBentoGrid.tsx
      BentoCardShell.tsx
      ProfileCard.tsx
      HikerCard.tsx
      LocationCard.tsx
      MbtiCard.tsx
      HobbiesCard.tsx
      ToolsCard.tsx
      CapabilitiesCard.tsx
      CapabilityFlipCard.tsx
  constants/
    profile.ts
    about.ts
```

### 拆分原则

- `page.tsx` 只负责组装、传参与页面级动效节奏
- `BentoCardShell.tsx` 负责通用卡片外观、边框、悬浮、圆角、统一 padding
- `CapabilityFlipCard.tsx` 负责单张翻转卡逻辑，避免四张能力卡重复实现
- `src/constants/profile.ts` 继续作为个人基础信息主数据源
- 新增 `src/constants/about.ts` 仅承载 About 页专用的衍生配置，例如图标映射、兴趣分组、能力卡背面 bullet 列表

不建议继续在 `page.tsx` 内维护大段能力卡静态数组；目前已有这类趋势，后续会让页面组件变得臃肿。

---

## 五、数据来源与文案策略

### 5.1 统一数据来源

- 基础信息：复用 `PROFILE`
- 能力卡内容：从当前 About 页已有的能力文案抽离到 `src/constants/about.ts`
- 工具栏：默认复用 `PROFILE.tools`
- 兴趣标签：若 `PROFILE` 中暂无对应字段，可在 `about.ts` 中补充 `hobbyRows`
- 地点与时区：在 About 页配置中显式声明，不依赖浏览器所在时区推断

### 5.2 工具栏内容的修正规则

原方案直接写死了“墨刀、Axure、Codex、Windsurf、Cursor、Figma”，但当前已有数据源不完全一致。

修订建议：

- 先以现有 `PROFILE.tools` 为准渲染工具卡
- 如果设计上确实要展示 demo 那组工具名，应先同步更新数据常量，再实施页面改造
- 图标映射表允许单独维护，但文案列表不应在组件里重新硬编码一份

### 5.3 简历下载

- 资源文件：`/彭焕东-18998360787.pdf`
- 下载按钮应有 `aria-label`
- 如需新窗口打开，可使用 `target="_blank"`，但需补充 `rel="noreferrer"`

---

## 六、卡片详细设计

### 6.1 ProfileCard

位置：`col-span-2 row-span-2`

内容：

- 右上角简历下载按钮
- Motto 模块标题与座右铭
- 姓名 / 英文名
- 一句话定位
- 可选补充一句摘要，优先复用 `PROFILE.summary`

实现说明：

- 背景发光建议继续使用 token 驱动的 radial gradient，而不是写死白底金色
- 允许轻微 3D 悬浮，但幅度应控制，避免与全站沉稳风格冲突

### 6.2 HikerCard

位置：`col-span-1 row-span-2`

内容：

- 默认态：地图图标 + “十天走七条徒步线的产品经理”一类记忆点文案
- 悬浮态：盾牌图标 + “耐造”关键词

实现说明：

- 桌面端采用 hover 切换
- 触屏端采用点击切换
- 不使用真实 3D 翻面，使用缩放与透明度过渡即可，避免信息跳动过猛

### 6.3 LocationCard

位置：`col-span-1`

内容：

- 标题：`位置 Location`
- 在线状态指示
- 城市：广州，中国
- 时钟：固定显示 `Asia/Shanghai` 时区的实时本地时间

实现说明：

- 使用 `Intl.DateTimeFormat` + `timeZone: "Asia/Shanghai"`
- 用 `useEffect` + `setInterval` 更新，并在 cleanup 中清除定时器
- 不建议仅拼接 `CST` 字样而不显式固定时区，否则浏览器跨地区访问时容易误导

### 6.4 MbtiCard

位置：`col-span-1`

内容：

- 标题：`人格 MBTI`
- `ENFJ`
- 简短描述

实现说明：

- 保持内容轻量，不建议加入过多段落
- hover 只做轻微放大与强调，不需要复杂动画

### 6.5 HobbiesCard

位置：`col-span-2`

内容：

- 标题：`兴趣 Hobbies`
- 两行无缝滚动的胶囊标签

实现说明：

- 每行内容至少渲染一组原始数据 + 一组克隆数据，以实现无缝滚动
- 克隆节点需加 `aria-hidden="true"`
- hover 时暂停滚动
- 对 `prefers-reduced-motion: reduce` 用户关闭自动滚动，改为静态换行展示

备注：

- 原方案写“每行复制 4 组内容”可作为保底思路，但不应写死在最终实施方案中；复制次数应以“滚动连续性”和“实际容器宽度”为准

### 6.6 ToolsCard

位置：`col-span-2`

内容：

- 标题：`工具 Tools`
- 工具胶囊或小卡片列表

实现说明：

- 展示数据默认来自 `PROFILE.tools`
- 图标映射可在 `about.ts` 单独维护
- 对无明确图标的工具使用降级图标，避免组件内出现大量 `if/else`

### 6.7 CapabilitiesCard

位置：桌面端 `col-span-4`，内部再做 4 列网格

内容：

- 4 张能力翻转卡
- 正面：图标 + 标题
- 背面：结构化亮点列表

交互修订：

- 桌面端：`hover` 触发翻转
- 触屏端：`click / tap` 触发翻转
- 键盘用户：`Enter` / `Space` 可切换
- 失焦后是否自动复位需要统一规则；建议“桌面 hover 离开即复位，触屏点击显式 toggle”

不建议保留 demo 中“鼠标移入翻转，同时点击也 toggle，且移出不翻回”的混合策略，状态会比较绕。

---

## 七、样式与主题规范

### 7.1 主题变量

继续复用现有主题 token，不新增一套平行的颜色体系。

优先使用：

- `--background`
- `--foreground`
- `--muted`
- `--card-bg`
- `--card-border`
- `--theme-pardon`
- 现有 capability / on-color token

### 7.2 与 demo 的差异化适配

demo 中以下写法不建议直接照搬：

- `body` 强制纯白背景
- 写死系统字体栈替代项目现有字体变量
- 页面级背景纹理直接绑在 `body`

更合适的做法：

- 背景纹理如需保留，挂在 About 页局部容器上
- 所有颜色优先走 token
- 字体继续复用现有 `font-serif-sc` / 主题字体变量

### 7.3 通用卡片样式

建议统一抽到 `BentoCardShell`：

```tsx
className="bento-card rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6"
```

悬浮规范：

- 默认 `translateY(-4px)` 左右即可
- 避免所有卡片都做明显 `rotateX/rotateY`
- 阴影与高光以轻量为主，避免视觉噪音

---

## 八、动画与可访问性要求

### 8.1 动画分层

- 页面入场：可继续使用 `framer-motion`
- 兴趣滚动：CSS keyframes
- 能力翻转：CSS transform + React state
- 简单 hover：Tailwind transition

### 8.2 `globals.css` 的使用边界

只把以下内容放入 [`src/app/globals.css`](/D:/work/project/webjianli/src/app/globals.css)：

- `@keyframes scroll-left`
- `@keyframes scroll-right`
- 翻转卡通用辅助类
- `prefers-reduced-motion` 的降级规则
- 如确有复用价值的 mask helper class

页面布局类、卡片 spacing、具体栅格结构尽量保留在组件内，不扩大全局样式面。

### 8.3 无障碍约束

- 翻转卡必须可键盘操作
- 重复滚动标签的克隆节点必须 `aria-hidden`
- 下载按钮必须有可读 label
- 低动态偏好用户应关闭滚动、翻转和强烈位移动画
- 对仅装饰性图标设置 `aria-hidden`

---

## 九、实施步骤（修订版）

### Phase 1：数据与容器准备

1. 梳理 [`src/constants/profile.ts`](/D:/work/project/webjianli/src/constants/profile.ts) 中可直接复用的字段
2. 新增 `src/constants/about.ts`，承载 About 页专用配置
3. 选定 About 页的宽容器方案
4. 确认简历链接与工具列表文案是否沿用现有数据

### Phase 2：基础结构搭建

5. 新建 `src/components/about/`
6. 实现 `BentoCardShell.tsx`
7. 实现 `AboutBentoGrid.tsx`
8. 在 `globals.css` 中补充必要的 keyframes 与辅助类

### Phase 3：卡片组件实现

9. 实现 `ProfileCard.tsx`
10. 实现 `HikerCard.tsx`
11. 实现 `LocationCard.tsx`
12. 实现 `MbtiCard.tsx`
13. 实现 `HobbiesCard.tsx`
14. 实现 `ToolsCard.tsx`
15. 实现 `CapabilityFlipCard.tsx`
16. 实现 `CapabilitiesCard.tsx`

### Phase 4：页面组装与交互校正

17. 重构 [`src/app/about/page.tsx`](/D:/work/project/webjianli/src/app/about/page.tsx)，完成 Bento 组装
18. 调整入场动画节奏，避免与卡片 hover / flip 动画冲突
19. 完成桌面端、移动端、键盘端交互统一

### Phase 5：验收

20. 桌面端布局验收
21. 平板与移动端响应式验收
22. 深浅色主题验收
23. 性能与低动态偏好验收
24. 简历下载功能验收

---

## 十、验收清单

- 4 列布局在超宽容器下不拥挤
- About 页改造不影响其它页面容器宽度
- 工具栏、能力卡、兴趣卡内容与数据源一致
- 简历按钮路径正确可下载
- 深色模式下卡片边框、背景、文字对比正常
- Hover、Tap、Keyboard 三种交互规则一致
- `prefers-reduced-motion` 下页面仍可完整使用
- 兴趣滚动无明显接缝、无可见跳帧

---

## 十一、风险与注意事项

1. `PageContainer` 宽度是当前方案的首个关键约束。
如果不先解决容器宽度问题，Bento 布局会被压缩，视觉效果会明显低于 demo。

2. 当前 About 页和 `PROFILE` 常量已有既存内容，必须先统一文案来源。
否则很容易出现“页面展示 A，简历/其它页面展示 B”的内容漂移。

3. 翻转卡交互必须先定规则再实现。
桌面 hover、移动 tap、键盘 toggle 三者如果混搭不清，会带来状态管理与可用性问题。

4. 自动滚动与 3D / 位移动画要控制强度。
这个页面是简历型页面，不适合用过强的动效抢走内容本身的注意力。

5. 全局样式污染需要提前防范。
除通用 keyframes 和 helper 外，不建议把 About 页专用类名大量塞进 `globals.css`。

---

## 十二、结论

原方案的大方向是成立的：Bento 化、卡片化、兴趣滚动、能力翻转都和 demo 一致，也符合当前 About 页的优化方向。

但在真正进入开发前，必须先修正以下几个关键问题：

- 不能直接照搬 demo 的整页布局，必须先处理当前页面容器宽度
- 不能新增重复的数据常量文件，必须统一内容来源
- 不能沿用 `/public/...` 资源路径写法
- 不能忽略现有深浅色主题体系
- 不能沿用含糊的翻转交互规则

在以上修订完成后，这份方案就可以作为后续实施基线使用。
