export const PROFILE = {
  name: "彭焕东",
  title: "AI 产品经理",
  tagline: "有 AI 产品实战经验 + 用研方法论的产品经理",
  phone: "18998360787",
  email: "1604857897@qq.com",
  github: "phdwdm-lang",
  wechat: "18998360787",
  summary:
    "具备从0到1的AI产品全流程经验：独立承接并交付商业AI平台（产品+设计+开发全包，含微信支付完整资金链路，获客户复购）；协作/独立完成2款AI产品并上线运营（累计10,800+用户、19,200+场AI交互），另独立开发UI收集工具并公开发布。1.5年中国移动用户研究经验，主导2,200万+用户产品的调研项目，擅长将用户洞察转化为产品决策。",
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
    description:
      "负责移动云盘（2200万+活跃用户）的用户研究工作，围绕首页改版、知识库方向规划与云盘核心使用场景开展竞品研究、原型测评、问卷调研、用户访谈与体验走查，累计回收1173份问卷、参与30+次产品体验走查并输出20+份报告，推动瀑布流首页方案上线及2项知识库功能进入产品排期。",
    projects: [
      {
        name: "云盘首页瀑布流改版调研",
        role: "用户研究员",
        period: "2025.04 - 2025.05",
        description:
          "针对移动云盘首页用户粘性低、停留时间短的问题，主导首页瀑布流改版调研，验证瀑布流是否适合云盘产品，以及应如何设计卡片内容与界面布局。",
        highlights: [
          "分析小红书、Instagram、百度网盘等产品的瀑布流设计，从界面、算法、内容三个维度梳理改版参考，并总结云盘首页粘性不足的根因",
          "使用墨刀制作原型并设计线上测评方案，围绕卡片类型认知和双排/单列布局偏好回收450份问卷",
          "发现相册卡片最易激发用户兴趣，而会员活动、热门活动等内容更易被识别为广告，最终推动产品采纳方案并成功上线瀑布流首页",
        ],
      },
      {
        name: "三大对标分析 — 知识库方向",
        role: "用户研究员",
        period: "2025.06 - 2025.07",
        description:
          "在移动云盘进行大版本升级期间，主要负责知识库方向竞对调研，为产品规划提供差异化方向与功能建议。",
        highlights: [
          "围绕秘塔AI、腾讯ima、纳米AI三款产品，从功能、用户、商业模式三个维度完成深度对标分析",
          "结合移动云盘已有用户数据资产，提出“活用私域数据，成为用户工作、学习、娱乐、生活的私人管家”的方向建议",
          "推动知识库广场、知识库导入优化2项功能建议纳入产品排期，并沉淀完整竞对分析报告",
        ],
      },
      {
        name: "移动云盘场景调研",
        role: "用户研究员",
        period: "2024.12 - 2025.03",
        description:
          "协助开展云盘核心使用场景调研，重点判断用户的高频核心功能及数据存储后的持续处理需求，为信息架构调整提供依据。",
        highlights: [
          "分析渗透率、留存率、使用时长、使用次数四个维度的数据，识别出内容模块用户量大但留存偏低、文件模块才是高频核心功能的关键结论",
          "围绕演唱会场景设计问卷并深挖高存储需求人群，回收723份问卷，清洗后得到545份有效样本，并参与8位用户深访的招募与执行",
          "发现58%用户单场演唱会视频存储量在7G以上，明确演唱会场景是云盘产品可重点挖掘的高价值存储需求场景",
        ],
      },
    ],
  },
  {
    company: "云宏信息科技有限公司",
    role: "产品助理",
    period: "2022.07 - 2023.01",
    description:
      "在政务云与粤基座相关项目中参与前期调研、功能设计和项目推进工作，围绕已有平台重构需求梳理网络资源申请字段、字段关系与审批流程，参与培训课堂、公告通知、建言献策等6个模块的设计，组织7次评审会议并产出10+份需求文档，同时承担会议记录、需求变更汇总、第三方材料整理、禅道维护与周报输出等协同工作，保障项目顺利推进。",
    projects: [
      {
        name: "粤基座",
        role: "产品助理",
        period: "2022.09 - 2023.01",
        description:
          "广东省政府牵头发起的数字政府项目，包含管理端、中台、用户端三端。用户可像商城下单一样申请各类网络资源，经审核后流转给技术团队完成配置；中台支持审核表字段与流程模板化配置，以适配不同地区与资源服务商的管理需求，推动广东省政务网络资源统一化管理。",
        highlights: [
          "作为重构项目前期调研成员，负责收集原平台各类网络资源申请字段与业务流程，梳理字段类型、关联关系和审核节点，为团队理解业务与中台配置提供基础资料",
          "参与6个模块的功能设计，覆盖培训课堂、公告通知、建言献策等模块，推动方案在多轮评审中收敛并形成可执行需求",
          "协助推进项目日常管理，完成会议安排、事项跟踪、需求变更汇总、第三方材料收集、禅道信息更新与邮件周报整理",
        ],
      },
    ],
  },
  {
    company: "嘉预网络科技有限公司",
    role: "产品经理",
    period: "2020.10 - 2021.12",
    description:
      "作为公司创始成员之一，负责15人开发团队的协作与多个项目从立项到交付的全过程，兼顾商务对接、产品设计、项目管理与测试验收等职责；在职期间参与并主导18个项目落地，输出近40份项目方案，客户转化率长期保持在25%以上，累计产出近200份测试反馈文档，推动20+项目完成验收交付，为公司带来超30万营收并沉淀多家长期合作客户。",
    projects: [
      {
        name: "中铁局案件管理系统",
        role: "产品经理 / UI设计师",
        period: "2021.08 - 2021.10",
        description:
          "TOG 场景下的 OA 系统，用于企业案件部门记录案件进展与相关资料，并结合案件信息、财务状况、当事人信息实现案件状态反馈与统一管理；系统支持按用户组配置部门权限，以降低误操作风险，同时在功能设计初期兼顾未来 SaaS 化推广的可扩展性。",
        highlights: [
          "以二开产品经理身份接手项目，基于首版逻辑与功能缺陷推进优化方案，补足系统在实际使用中的关键漏洞",
          "负责新增案件导出功能设计，并推动案件核心信息管理模块重构，在兼顾客户既有权益的前提下完成版本调整",
          "承担产品经理与 UI 设计师双重职责，参与需求沟通、功能梳理与界面方案输出，帮助客户明确系统后续演进方向",
          "通过多轮沟通协调推动双方达成共识，最终保障项目顺利落地使用",
        ],
      },
    ],
  },
] as const;

export const PROJECTS = [
  {
    name: "咣吃不胖",
    subtitle: "面向大众用户的 AI 健康饮食管理平台，让每个人吃得明白、让营养师管得高效。",
    team: "独立交付",
    logo: "/diet/logo.webp",
    link: "https://chibupang.cc/",
    period: "2026.03 - 至今",
    description:
      "某配餐服务企业委托的内测MVP。客户仅给出模糊方向，由我完成需求转化、产品设计、全栈开发与上线，跑通微信支付完整资金链路，1.0按期交付后客户复购2.0。",
    stats: [
      { label: "多端协同", value: "三端" },
      { label: "拍照分析", value: "AI 识餐" },
      { label: "偏好分析", value: "健康配餐" },
      { label: "饮食分析", value: "日级" },
    ],
    highlights: [
      "首个以Vibe Coding方式完全独立交付的商业项目：UI设计、技术选型、测试部署一人完成",
      "落地AI餐食图片识别与日级饮食分析（阿里云百炼），设计用户端+营养师端双端产品",
      "跑通微信支付/充值/积分/退款完整资金链路，真实支付测试成功到账",
      "已完成小范围运营测试并收集用户反馈，持续迭代中",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "tRPC",
      "MySQL",
      "微信小程序",
      "阿里云百炼",
    ],
    role: "产品设计 + 交互设计 + 全栈开发 + 测试上线（一人全包）",
  },
  {
    name: "猹杀 Wolfcha",
    subtitle: "一款由大模型实时扮演全部对局者的 AI 狼人杀，让你不再受人数限制随时开局",
    team: "2人团队",
    logo: "/wolfcha/logo.webp",
    period: "2026.01 - 至今",
    link: "https://wolf-cha.com",
    github: "https://github.com/oil-oil/wolfcha",
    description:
      "参加 Watcha+ModelScope 全球AI黑客松（排名第5），设计并上线AI驱动的狼人杀游戏，所有NPC由15+种大模型实时扮演。",
    stats: [
      { label: "注册用户", value: "1万+" },
      { label: "游戏场次", value: "2万+" },
      { label: "参与率", value: "66.5%" },
      { label: "赞助商", value: "3家" },
    ],
    highlights: [
      "累计注册用户10,843，去重参与玩家7,214（参与率66.5%），平均游戏时长43分钟",
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
      { src: "/wolfcha/banner.webp", alt: "Wolfcha Banner" },
      { src: "/wolfcha/白天阶段游戏截图.webp", alt: "白天阶段讨论" },
      { src: "/wolfcha/夜晚阶段游戏截图.webp", alt: "夜晚阶段行动" },
    ],
  },
  {
    name: "Muse Folio",
    subtitle: "一款帮用户采集网页 UI 灵感并一键生成可复用提示词的工具网站",
    team: "独立完成",
    logo: "/muse/logo.webp",
    period: "2026.08 - 至今",
    link: "https://muse-folio.com/",
    description:
      "把网页或图片中的UI灵感快速捕获到本地画布集中整理，并通过视觉分析生成可以继续修改和复用的提示词，配套Chrome扩展（已上架商店）支持网页区域框选采集。",
    stats: [
      { label: "网页框选采集", value: "插件截图" },
      { label: "Image2 反推", value: "风格库" },
      { label: "Qwen+DeepSeek", value: "双模型" },
      { label: "100% 本地存储", value: "本地" },
    ],
    highlights: [
      "Web应用+Chrome扩展双形态：框选捕获→本地画布整理→视觉分析生成可复用设计提示词",
      "本地U-2-Netp抠图，结合imagen反推提示词库精准识别图片风格，再由Qwen/DeepSeek双模型生成可复用的高准确提示词，100%本地存储保障数据隐私",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Chrome MV3",
      "U-2-Netp",
      "IndexedDB",
    ],
    role: "产品设计 + 全栈开发（独立完成）",
  },
  {
    name: "BBQ Translator",
    subtitle: "一款让读者即使不懂外语也能轻松读完的本地 AI 漫画翻译工具",
    team: "独立完成",
    logo: "/BBQ-translator/logo.webp",
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
      { src: "/BBQ-translator/000.webp", alt: "BBQ Translator 海报" },
      { src: "/BBQ-translator/书架.webp", alt: "资产管理页" },
      { src: "/BBQ-translator/首页.webp", alt: "工作台首页" },
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
    title: "猹杀的增长复盘：从0到10,843用户",
    date: "2026.02",
    summary:
      "一个AI狼人杀游戏如何在没有预算的情况下获取10,843用户？黑客松、社交传播与赞助商合作的故事。",
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
