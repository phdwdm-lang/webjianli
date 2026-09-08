export type Skill = {
  name: string;
  title: string;
  tagline: string;
  coverImage?: {
    src: string;
    alt: string;
  };
  description: string;
  highlights: readonly string[];
  techStack: readonly string[];
  scenarios: readonly string[];
  github?: string;
};

export const SKILLS: readonly Skill[] = [
  {
    name: "xhs-video-to-zhihu",
    title: "小红书视频转知乎图文",
    tagline: "视频转图文",
    coverImage: {
      src: "/skills/xhs-video-to-zhihu-cover-v2.png",
      alt: "手机画面转为图文页面的插图",
    },
    description:
      "给一条小红书视频链接，自动完成语音转写与多模态视频理解、生成结构化分析稿，改写为适合知乎发布的中文图文，提取关键帧配图，最终导出可直接导入知乎编辑器的 .docx 文件。",
    highlights: [
      "ASR 转写 + 多模态视频理解，自动产出结构化视频分析稿",
      "保留个人表达风格的图文改写，配关键帧截图与信息图",
      "一步导出 .docx，直接导入知乎编辑器发布",
    ],
    techStack: ["阿里云百炼", "ASR", "多模态大模型", "Python"],
    scenarios: ["视频转图文", "跨平台内容复用", "Vibe Coding 经验整理"],
    github: "https://github.com/phdwdm-lang/V2Text.git",
  },
  {
    name: "cap-edit",
    title: "cap-edit · Cap 录屏 AI 剪辑",
    tagline: "录屏自动剪辑",
    coverImage: {
      src: "/skills/cap-edit-cover-v2.png",
      alt: "屏幕胶片序列被剪刀切除空白片段的插图",
    },
    description:
      "面向 Cap 录屏工程文件的自动剪辑管线：faster-whisper 转写生成字级字幕，静默检测自动剪切口误与停顿，术语词典批量纠错字幕；并针对 Cap 官方字幕 bug 设计了 5 条写入红线，全程绕开坏路径完成剪辑。",
    highlights: [
      "五阶段流程：建档 → 转录 → 歧义确认 → 剪切+字幕 → 验收导出",
      "词典上下文规则自动修复术语错误，实测累计修复 28 处",
      "双时钟数据契约 + 5 条红线，绕开官方字幕编辑 bug",
    ],
    techStack: ["Python", "faster-whisper", "ffmpeg", "Cap"],
    scenarios: ["录屏自动剪辑", "字级字幕生成", "口误静默剪除"],
    github: "https://github.com/phdwdm-lang/cap-edit",
  },
  {
    name: "pardon-competitor-deconstructor",
    title: "竞品拆解 · PARDON",
    tagline: "竞品拆解",
    coverImage: {
      src: "/skills/pardon-competitor-deconstructor-cover-v1.png",
      alt: "三组产品蓝图在放大镜下进行竞品拆解",
    },
    description: "按策略 / 功能 / 体验 / 增长四个维度结构化拆解竞品，输出可借鉴点、不可抄点与差异化建议，帮产品找到差异化切入点。",
    highlights: [
      "四维拆解框架：策略 / 功能 / 体验 / 增长逐层对齐分析",
      "横向对比矩阵，多竞品同维度对齐比较",
      "输出可借鉴点 / 不可抄点 / 差异化策略建议",
    ],
    techStack: ["竞品分析", "对标研究", "差异化策略", "四维框架"],
    scenarios: ["竞品分析", "对标研究", "找差异化切入点"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-prd-writer",
    title: "PRD 撰写 · PARDON",
    tagline: "写 PRD",
    coverImage: {
      src: "/skills/pardon-prd-writer-cover-v1.png",
      alt: "散乱想法整理成结构化需求文档",
    },
    description: "把模糊、碎片化的需求描述转化为结构清晰、可直接进入评审的 PRD，覆盖需求澄清到结构化输出全流程。",
    highlights: [
      "需求澄清阶段：提问补全信息缺口列表",
      "PRD 主体结构化输出，按模板保证完整性",
      "支持对已有 PRD 补全、优化、查漏补缺",
    ],
    techStack: ["需求文档", "PRD", "结构化撰写", "边界条件"],
    scenarios: ["写 PRD", "需求整理", "需求评审前准备"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-image2proto",
    title: "截图转原型 · PARDON",
    tagline: "截图转原型",
    coverImage: {
      src: "/skills/pardon-image2proto-cover-v1.png",
      alt: "线框图转换为网页原型",
    },
    description: "把 UI 截图 / 线框 / 设计稿复现为可交互的单文件 HTML 原型，支持根据反馈迭代精修，并记忆用户设计偏好。",
    highlights: [
      "截图 / 手绘稿一键转可交互 HTML 原型",
      "从中提取配色、间距、组件风格沉淀为设计规范",
      "迭代精修 + 长期学习记忆用户风格",
    ],
    techStack: ["HTML 原型", "截图还原", "设计规范", "交互原型"],
    scenarios: ["照图做原型", "参考图复刻", "截图转页面"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-review-board",
    title: "模拟评审会 · PARDON",
    tagline: "模拟评审",
    coverImage: {
      src: "/skills/pardon-review-board-cover-v1.png",
      alt: "多角度工具围绕产品文档进行评审",
    },
    description: "模拟多角色 PRD / 原型评审会，从产品、研发、测试、设计、运营、法务六大视角给出评审结论，上线前把问题找出来。",
    highlights: [
      "产品 / 研发 / 测试 / 设计 / 运营 / 法务六大视角",
      "逐角色标注关注焦点与典型审查问题",
      "输出结构化评审会纪要 + 待办改进项",
    ],
    techStack: ["需求评审", "多角色代入", "评审纪要", "查漏补缺"],
    scenarios: ["评审 PRD", "模拟评审会", "需求查漏补缺"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-prioritization-engine",
    title: "优先级排序 · PARDON",
    tagline: "排优先级",
    coverImage: {
      src: "/skills/pardon-prioritization-engine-cover-v1.png",
      alt: "产品想法经过权衡后排列优先级",
    },
    description: "对需求 / 功能 / 项目进行多维度优先级排序，支持 RICE、ICE、Kano 等模型打分，输出可执行的版本排期建议。",
    highlights: [
      "支持 RICE / ICE / Kano / 成本收益多种模型",
      "多维度打分 + 权重，量化排序结果",
      "结合版本产能给出排期建议",
    ],
    techStack: ["优先级排序", "RICE", "Kano", "版本规划"],
    scenarios: ["需求排优先级", "版本排期", "砍需求决策"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-roadmap-planner",
    title: "路线图排期 · PARDON",
    tagline: "做路线图",
    coverImage: {
      src: "/skills/pardon-roadmap-planner-cover-v1.png",
      alt: "路线规划经过里程碑和风险节点到达终点",
    },
    description: "从季度目标、团队产能、依赖方信息出发，输出可执行的版本路线图，含里程碑、依赖风险、缓冲策略与每阶段成功指标。",
    highlights: [
      "目标对齐 → 能力拆分 → 里程碑排期全流程",
      "识别依赖风险 + 缓冲策略，提前暴露卡点",
      "每阶段定义成功指标，团队可追可验收",
    ],
    techStack: ["路线图", "里程碑", "依赖管理", "风险管控"],
    scenarios: ["Q4 路线图", "版本规划", "OKR 拆解"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-tracking-spec-writer",
    title: "埋点设计 · PARDON",
    tagline: "设计埋点",
    coverImage: {
      src: "/skills/pardon-tracking-spec-writer-cover-v1.png",
      alt: "交互事件流入埋点规范并完成校验",
    },
    description: "从产品需求 / 核心链路出发，输出完整埋点方案文档，包含事件、字段、触发时机、口径说明与 QA 校验清单。",
    highlights: [
      "链路拆解 → 事件 → 字段逐层规范化",
      "明确触发时机与指标口径，避免口径不一",
      "输出 QA 校验清单，验收有据可依",
    ],
    techStack: ["埋点设计", "事件规范", "指标口径", "数据验收"],
    scenarios: ["出埋点方案", "事件设计", "指标验收"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-experiment-designer",
    title: "A/B 实验设计 · PARDON",
    tagline: "设计实验",
    coverImage: {
      src: "/skills/pardon-experiment-designer-cover-v1.png",
      alt: "实验分流到两组测试并汇总结果",
    },
    description: "从实验目标出发输出完整 A/B 实验方案，含假设、分组、指标体系、样本量估算、止损规则与判定规则。",
    highlights: [
      "把想法转成可证伪的实验假设",
      "样本量估算 + 显著性 + 统计功效计算",
      "设定核心 / 护栏 / 辅助指标与止损规则",
    ],
    techStack: ["A/B 实验", "样本量计算", "统计检验", "实验评估"],
    scenarios: ["设计 A/B 实验", "实验方案", "显著性检验"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-analytics",
    title: "数据分析归因 · PARDON",
    tagline: "数据分析",
    coverImage: {
      src: "/skills/pardon-analytics-cover-v1.png",
      alt: "数据经过分析形成上升趋势和决策结果",
    },
    description: "从数据现象出发生成可执行的产品决策建议，以可视化 HTML 报告输出，支持指标拆解、归因分析、分群对比、留存漏斗分析。",
    highlights: [
      "构建指标树定位变动层级，做拆解归因",
      "漏斗 / 留存 / 分群洞察，标注结论可信度",
      "输出可直接开会用的交互式 HTML 报告",
    ],
    techStack: ["数据分析", "归因分析", "可视化报告", "留存漏斗"],
    scenarios: ["指标为何下跌", "留存分析", "数据分析报告"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-survey-designer",
    title: "问卷设计 · PARDON",
    tagline: "设计问卷",
    coverImage: {
      src: "/skills/pardon-survey-designer-cover-v1.png",
      alt: "问题选项经过筛选整理为问卷",
    },
    description: "设计高质量调研问卷，从目标拆解、题目设计、偏差审查到样本与发放，确保每道题都验证对应假设。",
    highlights: [
      "目标拆解 → 生成研究假设 → 映射题目",
      "逐题偏差审查，修正诱导题 / 双重问题",
      "样本量估算 + 渠道策略，可直接发放",
    ],
    techStack: ["问卷设计", "用户调研", "偏差审查", "样本估算"],
    scenarios: ["设计问卷", "满意度 / NPS 调查", "用户调研"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
  {
    name: "pardon-postmortem-writer",
    title: "上线复盘 · PARDON",
    tagline: "上线复盘",
    coverImage: {
      src: "/skills/pardon-postmortem-writer-cover-v1.png",
      alt: "产品上线复盘发现问题并修复路线",
    },
    description: "生成结构化上线复盘报告，含目标达成、偏差原因、经验沉淀与后续行动项，每条结论有数据支撑、每条行动有 owner 和截止日。",
    highlights: [
      "目标对照结果，量化偏差并 5-Why 归因",
      "区分可控 / 不可控因素，沉淀经验方法论",
      "行动项 + owner + 截止日期，可直接跟进",
    ],
    techStack: ["项目复盘", "目标对照", "归因分析", "行动项管理"],
    scenarios: ["写复盘", "上线总结", "版本回顾"],
    github: "https://github.com/phdwdm-lang/PARDON-PM-Skills",
  },
] as const;
