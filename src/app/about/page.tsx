"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import { PROFILE } from "@/constants/profile";
import { CSS_VARS } from "@/constants/theme";

const CAPABILITIES = [
  {
    title: "AI 产品实战",
    description:
      "独立/协作完成2款AI产品并上线运营，累计3,700+用户、5,800+场AI交互。对AI模型选型、多模型编排有实战经验。",
    color: CSS_VARS.capabilityAiProduct,
  },
  {
    title: "用户研究方法论",
    description:
      "1.5年中国移动用研经验，主导2,200万+用户产品调研。精通问卷设计、竞品分析、用户访谈、可用性测试。",
    color: CSS_VARS.capabilityUserResearch,
  },
  {
    title: "全链路构建 (Vibe Coding)",
    description:
      "从需求调研→产品设计→UI→开发→上线→运营，一个人跑通完整链路。擅长借助 AI 编程工具实现快速产品落地。",
    color: CSS_VARS.capabilityVibeCoding,
  },
  {
    title: "商业化与增长",
    description:
      "主动BD拉取3家AI赞助商，集成Stripe支付。擅长将用户洞察转化为产品决策，推动方案落地上线。",
    color: CSS_VARS.capabilityGrowth,
  },
] as const;

export default function AboutPage() {
  return (
    <PageContainer
      title="个人介绍"
      subtitle="关于我，核心优势与技能"
      themeColor={CSS_VARS.themePardon}
    >
      <div className="space-y-16 mt-8">
        {/* 1. Life Motto */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-l-4 border-[var(--section-color)] pl-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif-sc font-bold text-[var(--foreground)] mb-3 tracking-wide">
              道阻且长 · 行则将至
            </h2>
            <p className="text-sm font-mono text-[var(--muted)] tracking-widest uppercase">
              Life Motto
            </p>
          </motion.div>
        </section>

        {/* 2. Name & Tagline */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif-sc font-black text-[var(--foreground)] mb-6">
              {PROFILE.name} <span className="text-[var(--section-color)]">Pardon</span>
            </h1>
            <div className="space-y-2 text-lg text-[var(--foreground)] leading-relaxed font-medium">
              <p className="text-2xl font-bold">
                懂用研、能落地的 AI 产品经理
              </p>
              <p className="text-[var(--muted)] max-w-2xl mt-4 text-base">
                {PROFILE.summary}
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. Tech Stack */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold font-serif-sc border-b border-[var(--card-border)] pb-2 mb-6 flex items-baseline justify-between">
              <span>技术与工具栈</span>
              <span className="text-xs font-mono text-[var(--muted)] font-normal uppercase tracking-wider">Tech Stack</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {PROFILE.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] text-sm font-medium rounded-xl hover:border-[var(--section-color)] hover:text-[var(--section-color)] transition-colors cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 4. Capabilities (Color Spectrum) */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold font-serif-sc border-b border-[var(--card-border)] pb-2 mb-6 flex items-baseline justify-between">
              <span>能力雷达</span>
              <span className="text-xs font-mono text-[var(--muted)] font-normal uppercase tracking-wider">Capabilities</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAPABILITIES.map((capability) => (
                <div
                  key={capability.title}
                  className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 transition-all hover:border-[var(--cap-color)] hover:shadow-lg hover:-translate-y-1"
                  style={{
                    "--cap-color": capability.color,
                  } as CSSProperties}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "var(--cap-color)" }}
                    />
                    <h4 className="font-bold text-lg">{capability.title}</h4>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. MBTI & Personality */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold font-serif-sc border-b border-[var(--card-border)] pb-2 mb-6 flex items-baseline justify-between">
              <span>特质</span>
              <span className="text-xs font-mono text-[var(--muted)] font-normal uppercase tracking-wider">MBTI</span>
            </h3>
            <div className="flex items-center gap-6">
              <div className="text-4xl font-black text-[var(--section-color)] font-mono">ENFJ</div>
              <p className="text-[var(--muted)] text-sm leading-relaxed max-w-md">
                主人公人格。极具同理心和驱动力，能够在团队中激发他人的潜能，将复杂的需求转化为直观的产品体验。
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </PageContainer>
  );
}
