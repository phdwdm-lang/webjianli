export const PROFILE = {
  name: "彭焕东",
  title: "AI 产品经理",
  tagline: "有 AI 产品实战经验 + 用研方法论的产品经理",
  phone: "18998360787",
  email: "1604857897@qq.com",
  github: "phdwdm-lang",
  wechat: "18998360787",
  summary:
    "具备从0到1的AI产品全流程经验，独立/协作完成2款AI产品并上线运营（累计3,700+用户、5,800+场AI交互）。1.5年中国移动用户研究经验，主导2,200万+用户产品的调研项目，擅长将用户洞察转化为产品决策。",
  skills: [
    "产品设计",
    "用户研究",
    "AI 产品",
    "竞品分析",
    "数据分析",
    "Vibe Coding",
  ],
  tools: ["墨刀", "Axure", "Codex", "Windsurf", "Cursor", "Figma"],
} as const;

export const EDUCATION = [
  {
    school: "广州软件学院",
    major: "数据科学与大数据技术",
    degree: "本科",
    period: "2019.09 - 2023.06",
    honors: [
      '第十三届"挑战杯"广东省银奖',
      '第七届"互联网+"创新创业大赛省银奖',
    ],
  },
] as const;

export const WORK_EXPERIENCE = [
  {
    company: "中国移动互联网公司",
    role: "用户研究员",
    period: "2024.04 - 2025.10",
    description: "负责移动云盘（2,200万+活跃用户）用户研究工作",
    highlights: [
      "主导移动云盘首页瀑布流改版调研，使用墨刀制作原型，回收450份问卷，推动产品采纳方案并成功上线",
      "负责知识库方向竞对分析（秘塔AI/腾讯ima/纳米AI），2项功能建议纳入产品排期",
      "参与场景调研，分析渗透率/留存率/使用时长/使用次数四维数据；主导演唱会调研，回收723份问卷+深访8位用户",
      "完成30+次产品体验走查，输出20+份报告，累计发现600+个体验问题",
    ],
  },
  {
    company: "云宏信息科技有限公司",
    role: "产品实习",
    period: "2022.07 - 2023.01",
    description: "参与云产品及粤基座平台的需求调研与功能设计",
    highlights: [
      "负责6个功能模块迭代，组织7次评审会议，产出10+份需求文档",
    ],
  },
  {
    company: "嘉预网络科技有限公司",
    role: "产品助理",
    period: "2020.10 - 2021.12",
    description: "负责项目方案评估与交付",
    highlights: [
      "制作近40份项目方案，客户转化率25%；2个月后独立负责小型项目全流程管理",
    ],
  },
] as const;

export const PROJECTS = [
  {
    name: "猹杀 Wolfcha",
    subtitle: "AI 狼人杀游戏",
    team: "2人团队",
    period: "2026.01 - 至今",
    link: "https://wolf-cha.com",
    github: "https://github.com/oil-oil/wolfcha",
    description:
      "参加 Watcha+ModelScope 全球AI黑客松（排名第5），设计并上线AI驱动的狼人杀游戏，所有NPC由15+种大模型实时扮演。",
    stats: [
      { label: "注册用户", value: "3,760+" },
      { label: "游戏场次", value: "5,810+" },
      { label: "AI模型", value: "15+" },
      { label: "赞助商", value: "3家" },
    ],
    highlights: [
      "上线1个月获3,760注册用户，峰值日增242，平均游戏时长43分钟",
      "主动BD拉取3家AI赞助商（ZenMux/Dashscope/OpenCreator），累计点击1,637次",
      "集成Stripe支付系统，已产生付费收入",
      "负责沉浸式体验设计：AI语音合成、BGM生成、发言自动滚动等交互设计",
      "支持中英双语国际化，用户覆盖中国大陆、日本、香港、英国等地区",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "Jotai",
      "Framer Motion",
      "Stripe",
    ],
    role: "产品设计 + 体验设计 + 测试 + 商业化",
    images: [
      { src: "/wolfcha/banner.png", alt: "Wolfcha Banner" },
      { src: "/wolfcha/白天阶段游戏截图.png", alt: "白天阶段讨论" },
      { src: "/wolfcha/夜晚阶段游戏截图.png", alt: "夜晚阶段行动" },
    ],
  },
  {
    name: "BBQ Translator",
    subtitle: "AI 漫画翻译工具",
    team: "独立完成",
    period: "2026.01 - 2026.02",
    github: "https://github.com/phdwdm-lang/bbq-translator",
    resourceLink:
      "https://www.xiaohongshu.com/discovery/item/69abd1750000000022023e3d?source=webshare&xhsshare=pc_web&xsec_token=ABvhBpVFcAmN2GsYMPmbao4I8Cn240ET_Ryh9p-qUn2lY=&xsec_source=pc_share",
    resourceLabel: "相关介绍",
    description:
      "独立完成产品设计、UI设计与全栈开发，打造Windows桌面端AI漫画翻译工具，支持8种文件格式、25种目标语言。",
    stats: [
      { label: "文件格式", value: "8种" },
      { label: "翻译语言", value: "25种" },
      { label: "翻译引擎", value: "10+" },
      { label: "AI模型", value: "15+" },
    ],
    highlights: [
      "设计5步AI翻译Pipeline（检测→OCR→翻译→修复→渲染），编排4类检测模型+5类OCR+6类修复模型+10+种翻译引擎",
      "设计拓展中心架构，基础包零配置可用，高级模块按需安装，平衡安装体积与功能完整性",
      "已在GitHub开源并发布安装包，纯本地运行保障数据隐私",
      "嵌入式Python环境实现零配置安装，用户无需安装Python或配置环境",
    ],
    techStack: [
      "Electron 30",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Konva",
      "FastAPI",
      "PyTorch",
    ],
    role: "产品设计 + UI设计 + 全栈开发（独立完成）",
    images: [
      { src: "/BBQ-translator/000.png", alt: "BBQ Translator 海报" },
      { src: "/BBQ-translator/书架.png", alt: "资产管理页" },
      { src: "/BBQ-translator/首页.png", alt: "工作台首页" },
    ],
  },
] as const;

export const THOUGHTS = [
  {
    title: "为什么我选择 Vibe Coding",
    date: "2026.02",
    summary:
      "作为一个非技术背景的产品经理，通过 AI 编程工具独立完成两个完整产品，这段经历改变了我对「技术门槛」的认知。",
    tags: ["AI", "Vibe Coding", "产品思考"],
  },
  {
    title: "从用研到 AI PM 的转型思考",
    date: "2026.01",
    summary:
      "1.5年用研经历给我最大的收获不是方法论，而是「用户视角」。这种视角在做 AI 产品时尤其重要。",
    tags: ["职业发展", "AI PM", "用户研究"],
  },
  {
    title: "猹杀的增长复盘：从0到3760用户",
    date: "2026.02",
    summary:
      "一个AI狼人杀游戏如何在没有预算的情况下获取3760用户？黑客松、社交传播与赞助商合作的故事。",
    tags: ["用户增长", "AI", "运营"],
  },
  {
    title: "多模型编排的产品决策",
    date: "2025.02",
    summary:
      "BBQ Translator 涉及4种检测模型+5种OCR+6种修复模型+10+种翻译引擎。如何为用户做选择而不是给用户添负担？",
    tags: ["AI 产品", "产品设计", "模型选型"],
  },
] as const;
