# BACKEND_STRUCTURE.md — 后端结构文档

> **webjianli 是一个纯静态网站，没有后端服务器、数据库或 API。** 本文件描述的是"数据层"——即静态内容的组织结构和数据合约。

---

## 一、架构说明

```
用户浏览器
    ↓ HTTP 请求
Vercel CDN（边缘节点）
    ↓ 静态文件 / SSG 页面
Next.js 静态生成（Static Generation）
    ↓ 读取
src/constants/profile.ts  ← 唯一数据源
```

- **无数据库**：所有展示数据硬编码在 `src/constants/profile.ts`
- **无 API Routes**：`src/app/api/` 目录不存在，也不创建
- **无用户认证**：全站公开只读
- **无服务端渲染（SSR）**：所有页面为静态生成（SSG）或客户端组件

---

## 二、唯一数据源：`src/constants/profile.ts`

所有展示内容的唯一真理来源。**禁止在组件中硬编码任何个人信息，必须从此文件导入。**

### 2.1 数据结构定义

#### `PROFILE` 对象
```typescript
const PROFILE = {
  name: string;          // "彭焕东"
  title: string;         // "AI 产品经理"
  tagline: string;       // 简短的定位描述
  phone: string;         // 手机号
  email: string;         // 邮箱
  github: string;        // GitHub 用户名
  wechat: string;        // 微信号
  summary: string;       // 个人摘要（约 80-100 字）
  skills: readonly string[];   // 技能标签数组
  tools: readonly string[];    // 工具栈标签数组
}
```

**当前值**：
- `name`: `"彭焕东"`
- `title`: `"AI 产品经理"`
- `tagline`: `"有 AI 产品实战经验 + 用研方法论的产品经理"`
- `phone`: `"18998360787"`
- `email`: `"1604857897@qq.com"`
- `github`: `"phdwdm-lang"`
- `wechat`: `"18998360787"`
- `skills`: `["产品设计", "用户研究", "AI 产品", "竞品分析", "数据分析", "Vibe Coding"]`
- `tools`: `["墨刀", "Figma", "Axure", "Xmind", "Windsurf", "Cursor"]`

---

#### `EDUCATION` 数组
```typescript
type EducationItem = {
  school: string;         // 学校名称
  major: string;          // 专业
  degree: string;         // 学历（"本科"）
  period: string;         // "YYYY.MM - YYYY.MM" 格式
  honors: readonly string[];  // 荣誉列表
}
```

---

#### `WORK_EXPERIENCE` 数组
```typescript
type WorkExperienceItem = {
  company: string;        // 公司名称
  role: string;           // 职位
  period: string;         // "YYYY.MM - YYYY.MM" 格式
  description: string;    // 工作职责一句话描述
  highlights: readonly string[];  // 核心成就列表（每条 30-80 字）
}
```

---

#### `PROJECTS` 数组
```typescript
type ProjectItem = {
  name: string;           // 项目名
  subtitle: string;       // 副标题（如"AI 狼人杀游戏"）
  team: string;           // 团队规模（如"2人团队"）
  period: string;         // "YYYY.MM - 至今 / YYYY.MM" 格式
  link?: string;          // 在线体验链接（可选）
  github?: string;        // GitHub 仓库链接（可选）
  videoLink?: string;     // 演示视频链接（可选）
  description: string;    // 项目描述（约 50-80 字）
  stats: readonly {
    label: string;        // 数据标签（如"注册用户"）
    value: string;        // 数据值（如"3,760+"）
  }[];                    // 固定 4 条
  highlights: readonly string[];  // 核心成果列表
  techStack: readonly string[];   // 技术栈标签数组
  role: string;           // 我的角色（如"产品设计 + 全栈开发"）
}
```

---

#### `THOUGHTS` 数组
```typescript
type ThoughtItem = {
  title: string;          // 文章标题
  date: string;           // "YYYY.MM" 格式
  summary: string;        // 文章摘要（约 50-80 字）
  tags: readonly string[];  // 标签数组（2-4 个）
}
```

**标签颜色**：统一使用 Emerald 板块色，不做多色化映射（参考 FRONTEND_GUIDELINES §2.4）

---

### 2.2 数据访问规约

| 页面 | 导入内容 |
|------|----------|
| `/about` | `PROFILE` |
| `/experience` | `EDUCATION`, `WORK_EXPERIENCE` |
| `/projects` | `PROJECTS` |
| `/thoughts` | `THOUGHTS` |

**导入方式**：
```typescript
import { PROFILE, EDUCATION, WORK_EXPERIENCE, PROJECTS, THOUGHTS } from "@/constants/profile";
```

---

## 三、内容更新规约

由于无 CMS，更新内容需直接修改 `src/constants/profile.ts`，并重新部署至 Vercel。

| 更新场景 | 操作步骤 |
|----------|----------|
| 新增工作经历 | 在 `WORK_EXPERIENCE` 数组头部插入新对象 |
| 新增项目 | 在 `PROJECTS` 数组头部插入新对象 |
| 新增文章想法 | 在 `THOUGHTS` 数组头部插入新对象 |
| 修改联系方式 | 修改 `PROFILE.phone` / `.email` / `.wechat` |
| 推送更新 | `git push` → Vercel 自动触发重新构建 |

---

## 四、认证逻辑

**本项目无用户认证。** 全站 100% 公开只读，无登录、注册、Session 或 JWT 需求。

---

## 五、存储与安全

**本项目无文件存储需求。**

- 无图片上传
- 无用户数据收集
- 无 Cookie（除 `next-themes` 写入的 `localStorage` 主题键外）
- 无敏感数据（联系方式明文展示在 constants 中，属于主动公开）

**Vercel 部署安全**：
- 无环境变量（`process.env` 中无任何 secret）
- 无 API Routes（无接口暴露面）
- 静态文件由 Vercel CDN 分发，无服务端逻辑

---

## 六、未来扩展预留（当前不实现）

如果未来需要添加以下功能，推荐的技术方向：

| 功能 | 推荐方案 | 触发条件 |
|------|----------|----------|
| 动态 Thoughts 内容 | Contentlayer + MDX 本地文件 CMS | thoughts 内容频繁更新 |
| 浏览量统计 | Vercel Analytics（零配置） | 需要了解访客数据 |
| 联系表单 | Resend + Vercel Edge Function | 需要接收招聘消息 |
| 评论系统 | Giscus（GitHub Discussions） | 需要读者互动 |

**以上均不在当前版本范围内。**

---

*文档版本：v2.0 | 更新日期：2026-03-04*
*交叉引用：PRD §三（Out-of-Scope），TECH_STACK §八（部署），IMPLEMENTATION_PLAN §六（数据层）*
