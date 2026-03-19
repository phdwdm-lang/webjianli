# Bento 个人信息页样式问题清单（审核修订版）

> 对比 `bento-demo.html` 与当前 `src/app/about/page.tsx` 的实现差异  
> 审核时间：2026-03-17  
> 说明：本次仅修订方案文档，不执行代码修改

---

### 三次审核备注（2026-03-17）

> 审核人：Cascade
>
> **整体结论**：同事的修订质量较高，优先级重排和错误项修正基本合理，但有 2 处需要补充说明。
>
> **补充 1：P0-1 修复目标需要更明确**
> 同事正确识别了 `toggle` 函数被 `supportsHover` 条件拦截的问题，但修复目标描述过于笼统。
>
> 当前代码（`CapabilityFlipCard.tsx:35-39`）：
> ```tsx
> const toggle = () => {
>   if (!supportsHover) {
>     setIsFlipped((current) => !current);
>   }
> };
> ```
>
> **建议补充具体修复方案**：移除 `if (!supportsHover)` 条件，让 `toggle` 在所有设备上都能执行。这样桌面端 hover 进入后，点击可以翻回；移动端点击可以 toggle。
>
> **补充 2：P1-3 ProfileCard 垂直节奏偏差的根因需要修正**
> 同事正确指出 `gap-8` 与 demo 的 `gap: 2rem` 是一致的（都是 32px），但"多个 spacing 组合导致整体节奏不同"的描述仍然模糊。
>
> 经核实，当前实现与 demo 的主要差异在于：
> - 当前实现的 motto 区有 `mt-2`，而 demo 中 motto 区也有 `mt-2`（一致）
> - 当前实现的 motto 区有 `pr-14`（为下载按钮让位），demo 中无此设置
> - 当前实现的姓名区有 `mb-3`，demo 中也有 `mb-3`（一致）
>
> **实际差异点**：当前实现的 `BentoCardShell` 使用 `justify-center`，而 demo 使用 `justify-content: center`（等价）。但当前 ProfileCard 内部结构是 `flex-col justify-center gap-8`，而 demo 的 `.card-profile` 也是 `flex-direction: column; justify-content: center; gap: 2rem;`。
>
> **结论**：视觉差异更可能来自卡片整体高度不一致（P1-1），而非 ProfileCard 内部 spacing。建议将 P1-3 合并到 P1-1 中统一处理，或降级为"待观察项"。
>
> **其余修订均合理**，无需补充。

---

## 一、审核结论与具体问题

### 1.1 结论摘要

原方案方向整体正确，尤其是对能力卡交互问题的识别是准确的；  
但存在 4 类需要修订的内容：

1. 个别问题判断不准确（例如 `gap-8` 被误判为大于 demo）。
2. 个别修复建议会带来副作用（例如“移除所有 min-h”会影响移动端密度）。
3. 个别问题优先级排序不合理（应先修交互阻塞，再修视觉精度）。
4. 部分建议与当前“按 demo 强制浅色舞台”的产品策略冲突。

### 1.2 具体问题（逐项审核）

1. **能力卡桌面端点击无法翻回**：判断正确，属于 P0。
   - 当前 `toggle` 在 `supportsHover === true` 时不执行，导致桌面端只能翻过去，不能点回。
   - 这是功能阻塞，不是单纯视觉问题。

2. **能力卡背面文字可能溢出**：判断基本正确，建议作为 P1（而非 P0）。
   - 风险存在，但通常与文案长度、卡片高度共同相关。
   - 优先顺序应低于“交互不可逆”。

3. **卡片高度不对齐**：判断正确，但修复建议需要改写。
   - 原文建议“移除所有 `min-h-*`”过于激进，会影响移动端与内容密度。
   - 应改为“统一高度策略 + 必要最小高度保留 + 容器 `h-full`”。

4. **ProfileCard `gap-8` 过大**：判断不准确。
   - `gap-8` 就是 `2rem`，与原文引用的 demo 值一致。
   - 视觉差异更可能来自 `padding`、`mt`、`pr` 组合，而非 `gap-8` 本身。

5. **Hobbies 颜色硬编码（深色模式问题）**：在当前目标下优先级应下调。
   - 当前 About 页是“贴 demo 的浅色舞台策略”，硬编码白色和 `#fafafa` 与 demo 一致。
   - 若后续恢复深色主题一致性，再升级为 token 化改造。

6. **Capabilities 容器样式缺失**：结论偏形式化，不是阻塞项。
   - 当前容器已是 4 列网格，`gap` 也一致。
   - 可作为“可优化项”，不建议排入首批修复。

---

## 二、相对原方案的修改点（本次修订）

### 2.1 优先级重排

| 优先级 | 问题 | 原方案 | 修订后 |
|--------|------|--------|--------|
| P0 | 能力卡桌面端点击无法翻回 | P0 | 保持 P0 |
| P0 | 能力卡背面文字溢出 | P0 | 调整为 P1 |
| P1 | 卡片高度不对齐 | P1 | 保持 P1（但修复策略变更） |
| P1 | ProfileCard 内部间距问题 | P1 | 保持 P1（修正文案） |
| P2 | Hobbies 背景硬编码 | P2 | 下调为“策略相关项（暂缓）” |
| P3 | Capabilities 容器样式缺失 | 未降级 | 调整为可优化项 |

### 2.2 错误项修正

1. 删除“`gap-8` 过大”的结论，改为：
   - 重点检查 `padding / margin / 空间分布` 造成的视觉差异。

2. 修正“全部移除 `min-h-*`”建议，改为：
   - 统一卡片高度基线；
   - 保留必要最小高度；
   - 包装层补 `h-full`；
   - 用少量基线类控制不同卡片类型。

3. 修正“硬编码颜色必须立即替换 token”的建议，改为：
   - 当前贴 demo 阶段允许保留；
   - 若切回全站深浅色一致，再列为必须改造项。

4. 明确“容器样式缺失”不是当前阻塞：
   - 作为次级优化，不占首批修复带宽。

---

## 三、修订后的问题清单（可执行版）

### 3.1 P0（必须先修）

#### P0-1 能力卡桌面端点击无法翻回

**现象**：
- hover 后翻转；
- 桌面端点击不能切回。

**根因**：
- `toggle` 被 `supportsHover` 条件拦截。

**修复目标**：
- 桌面端和移动端都支持 click/tap toggle；
- 保留 demo 的“鼠标移入即翻转”行为。

---

### 3.2 P1（第二批修）

#### P1-1 卡片高度对齐不稳定

**现象**：
- `Profile(2x2)`、`Hiker(1x2)`、`Location/MBTI(1x1)` 在部分断点下对齐不稳定。

**根因**：
- 多组件使用不同 `min-h-*`；
- 外层 grid 单元和内层卡片没有统一的 `h-full` 策略。

**修复目标**：
- 统一高度基线；
- 卡片内容不塌陷；
- 保持移动端阅读密度。

---

#### P1-2 能力卡背面内容容纳风险

**现象**：
- 长文案可能触发背面内容拥挤或溢出。

**根因**：
- 卡片高度与文案长度紧耦合；
- 背面内容区未定义明确溢出策略。

**修复目标**：
- 在不破坏 demo 外观前提下，确保背面内容可读且不越界。

---

#### P1-3 ProfileCard 垂直节奏偏差

**现象**：
- 座右铭区与姓名区的视觉分布仍有偏差。

**根因**：
- 多个 spacing 组合（而非单一 `gap`）导致整体节奏不同。

**修复目标**：
- 让 `motto` 区和 `name/tagline` 区更接近 demo 的纵向重心。

---

### 3.3 策略相关项（暂缓）

#### S-1 Hobbies 背景与胶囊颜色 token 化

**说明**：
- 当前目标是贴 demo（浅色舞台），暂不作为阻塞项。
- 若产品决定恢复深色模式一致性，再整体 token 化。

---

### 3.4 可优化项（低优先）

#### O-1 Capabilities 容器细节一致性

**说明**：
- 当前容器结构可用，不影响主流程。
- 后续可补充“容器 hover 禁用”等细节一致性处理。

---

## 四、修订后的执行顺序建议

1. 先修 P0：能力卡点击 toggle。
2. 再修 P1：高度对齐策略（含必要 `h-full` 与 min-height 收敛）。
3. 再修 P1：能力卡背面内容容纳。
4. 再修 P1：ProfileCard 垂直节奏。
5. 最后按产品策略决定是否推进 S-1（深色模式 token 化）。

---

## 五、附录：当前文件定位（用于后续实施）

| 模块 | 主要文件 |
|------|---------|
| 页面入口与舞台 | `src/app/about/page.tsx` |
| 网格布局 | `src/components/about/AboutBentoGrid.tsx` |
| 基础卡壳 | `src/components/about/BentoCardShell.tsx` |
| Profile | `src/components/about/ProfileCard.tsx` |
| Hiker | `src/components/about/HikerCard.tsx` |
| Location | `src/components/about/LocationCard.tsx` |
| MBTI | `src/components/about/MbtiCard.tsx` |
| Hobbies | `src/components/about/HobbiesCard.tsx` |
| Tools | `src/components/about/ToolsCard.tsx` |
| Capabilities | `src/components/about/CapabilitiesCard.tsx` |
| 单张翻转卡 | `src/components/about/CapabilityFlipCard.tsx` |
| About 文案与映射 | `src/constants/about.ts` |

