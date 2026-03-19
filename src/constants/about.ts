import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BookOpenText,
  Brain,
  BrushCleaning,
  Clapperboard,
  Code2,
  FilePenLine,
  Figma,
  Footprints,
  Gamepad2,
  Layers3,
  LayoutTemplate,
  Library,
  Map,
  MapPin,
  Mic2,
  PenTool,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Utensils,
  Wrench,
} from "lucide-react";

export const ABOUT_COPY = {
  title: "个人介绍",
  subtitle: "关于我，核心优势与技能",
  mottoLabel: "座右铭 Motto",
  motto: "道阻且长 · 行则将至",
  englishName: "Pardon",
  heroTagline: "懂用研、能落地的 AI 产品经理",
  heroTags: ["懂用研", "能落地"],
  locationLabel: "位置 Location",
  location: "广州, 中国",
  timezone: "Asia/Shanghai",
  mbtiLabel: "人格 MBTI",
  mbti: "ENFJ",
  mbtiDescriptionTop: "主人公人格",
  mbtiDescriptionBottom: "同理心与驱动力",
  hobbiesLabel: "兴趣 Hobbies",
  toolsLabel: "工具 Tools",
  capabilitiesLabel: "核心能力 Capabilities",
  hikerFrontTitle: "十天走七条徒步线的",
  hikerFrontAccent: "产品经理",
  hikerBackTitle: "耐造",
  resumeLabel: "下载简历",
  resumeHref: "/彭焕东-18998360787.pdf",
} as const;

export const ABOUT_MODULE_ICONS = {
  motto: Quote,
  location: MapPin,
  mbti: Brain,
  hobbies: Sparkles,
  tools: Wrench,
} as const;

export const ABOUT_HOBBY_ROWS = [
  [
    { label: "徒步", icon: Footprints },
    { label: "漫画", icon: BookOpenText },
    { label: "脱口秀", icon: Mic2 },
    { label: "电影", icon: Clapperboard },
  ],
  [
    { label: "单机游戏", icon: Gamepad2 },
    { label: "旅行", icon: Plane },
    { label: "美食", icon: Utensils },
    { label: "阅读", icon: Library },
  ],
] as const;

export const ABOUT_TOOL_ICONS: Record<string, LucideIcon> = {
  墨刀: PenTool,
  Axure: LayoutTemplate,
  Codex: Code2,
  Windsurf: Code2,
  Cursor: Code2,
  Figma: Figma,
} as const;

export const ABOUT_TOOLS = ["墨刀", "Axure", "Codex", "Windsurf", "Cursor", "Figma"] as const;

export const ABOUT_CAPABILITIES = [
  {
    title: "AI 产品实战",
    icon: Bot,
    backTitle: "核心数据",
    items: [
      "独立/协作完成2款AI产品上线",
      "累计3,700+用户，5,800+交互",
      "AI模型选型与多模型编排经验",
    ],
  },
  {
    title: "用研方法论",
    icon: UsersRound,
    backTitle: "项目经验",
    items: [
      "主导2,200万+用户产品调研",
      "精通问卷、竞品分析与访谈",
      "产出20+份走查报告",
    ],
  },
  {
    title: "全链路构建",
    icon: Layers3,
    backTitle: "Vibe Coding",
    items: [
      "调研→设计→开发→运营全通",
      "借助AI编程实现快速落地",
      "独立完成Windows桌面端开发",
    ],
  },
  {
    title: "方案设计",
    icon: TrendingUp,
    backTitle: "产品设计力",
    items: [
      "从问题定义到方案闭环设计",
      "能独立完成 PRD 与关键流程设计",
      "兼顾用户体验与业务可行性",
    ],
  },
] as const;

export const ABOUT_DECOR_ICONS = {
  hikerFront: Map,
  hikerBack: ShieldCheck,
  toolsFallback: BrushCleaning,
  capabilitiesFallback: FilePenLine,
} as const;
