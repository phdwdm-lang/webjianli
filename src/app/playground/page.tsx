"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SpotlightCard } from "@/components/playground/SpotlightCard";
import { TiltCard } from "@/components/playground/TiltCard";
import { GlowBorderCard } from "@/components/playground/GlowBorderCard";
import { BlurRevealText } from "@/components/playground/BlurRevealText";
import { GradientText } from "@/components/playground/GradientText";
import { MagneticButton } from "@/components/playground/MagneticButton";
import { PulseButton } from "@/components/playground/PulseButton";
import { CountUpNumber } from "@/components/playground/CountUpNumber";
import { TypewriterText } from "@/components/playground/TypewriterText";
import { FlipCard } from "@/components/playground/FlipCard";
import { StaggeredList } from "@/components/playground/StaggeredList";
import { MarqueeText } from "@/components/playground/MarqueeText";
import { RippleButton } from "@/components/playground/RippleButton";
import { ShimmerButton } from "@/components/playground/ShimmerButton";
import { BouncyCard } from "@/components/playground/BouncyCard";
import { TextRevealByWord } from "@/components/playground/TextRevealByWord";
import { ColorPalettePreview } from "@/components/playground/ColorPalettePreview";
import { EffectSwitcher } from "@/components/effects/EffectSwitcher";
import ParticleTrail from "@/components/ParticleTrail";

export default function PlaygroundPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] p-6 md:p-12 font-sans">
      <ParticleTrail />
      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        <header>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-4">交互动效实验室 (Playground)</h1>
          <p className="text-[var(--muted)] text-lg max-w-2xl">
            这里展示了一系列适用于个人简历/作品集的现代化交互动效。所有效果均基于 Tailwind CSS 4 和 React/Framer Motion 实现。
          </p>
        </header>

        {/* 0. Color Palette Selection */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">0. 个人信息卡片配色方案 (Color Palette)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">选择替代粉红色的新配色，同时预览与其他三张卡片的和谐度</p>
          </div>
          <ColorPalettePreview />
        </section>

        {/* 1. Card Hover Effects */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">1. 卡片悬停动效 (Card Hover Effects)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">适用于项目展示、文章列表的交互卡片</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            <SpotlightCard className="p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold mb-2">Spotlight Card</h3>
              <p className="text-sm text-[var(--muted)]">鼠标悬停查看聚光灯效果，常用于暗色模式或强调模块。</p>
            </SpotlightCard>
            
            <TiltCard className="p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold mb-2">3D Tilt Card</h3>
              <p className="text-sm text-[var(--muted)]">基于 Framer Motion 的 3D 悬停倾斜，增强空间感。</p>
            </TiltCard>

            <GlowBorderCard className="p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold mb-2">Glow Border</h3>
              <p className="text-sm text-[var(--muted)]">鼠标跟随的边框发光效果，非常适合科技感产品。</p>
            </GlowBorderCard>

            <BouncyCard className="p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold mb-2">Bouncy Card</h3>
              <p className="text-sm text-[var(--muted)]">弹性缩放 + 上浮，轻量且活泼的卡片交互。</p>
            </BouncyCard>

            <FlipCard
              className="min-h-[250px]"
              front={
                <div className="p-8 flex flex-col justify-center items-center text-center h-full">
                  <h3 className="text-xl font-bold mb-2">Flip Card (正面)</h3>
                  <p className="text-sm text-[var(--muted)]">点击翻转查看背面内容</p>
                </div>
              }
              back={
                <div className="p-8 flex flex-col justify-center items-center text-center h-full bg-[var(--foreground)] text-[var(--background)] rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">背面内容</h3>
                  <p className="text-sm opacity-70">可放置联系方式、技能标签等隐藏信息</p>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. Text Animations */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">2. 文本动效 (Typography Animations)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">适用于 Slogan、重要标题或引言</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl flex items-center justify-center min-h-[150px]">
              <BlurRevealText 
                text="Crafting digital experiences with AI & Code." 
                className="text-2xl font-bold text-center"
              />
            </div>
            <div className="p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl flex items-center justify-center min-h-[150px]">
              <div className="text-3xl font-bold text-center">
                Hello, I am a <br/>
                <GradientText text="Product Manager" className="mt-2" />
              </div>
            </div>
            <div className="p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl flex items-center justify-center min-h-[150px]">
              <div className="text-2xl font-bold text-center">
                I build{" "}
                <TypewriterText
                  texts={["AI Products", "Web Apps", "User Experiences", "Creative Tools"]}
                  className="text-[var(--theme-creations)]"
                />
              </div>
            </div>
            <div className="p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl flex items-center justify-center min-h-[150px]">
              <TextRevealByWord
                text="道阻且长 行则将至 — 在探索中沉淀的日与夜"
                className="text-center"
              />
            </div>
          </div>
        </section>

        {/* 3. Data Animations */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">3. 数据动效 (Data Animations)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">适用于成就展示、数据统计等</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl text-center">
              <CountUpNumber end={3760} className="text-3xl" suffix="+" />
              <p className="text-xs text-[var(--muted)] mt-2">注册用户</p>
            </div>
            <div className="p-6 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl text-center">
              <CountUpNumber end={5810} className="text-3xl" />
              <p className="text-xs text-[var(--muted)] mt-2">游戏局数</p>
            </div>
            <div className="p-6 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl text-center">
              <CountUpNumber end={25} className="text-3xl" suffix=" langs" />
              <p className="text-xs text-[var(--muted)] mt-2">翻译语言</p>
            </div>
            <div className="p-6 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl text-center">
              <CountUpNumber end={98} className="text-3xl" suffix="%" />
              <p className="text-xs text-[var(--muted)] mt-2">任务完成率</p>
            </div>
          </div>
        </section>

        {/* 4. List & Marquee */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">4. 列表与滚动 (List & Marquee)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">适用于技能展示、经历时间线</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggeredList
              items={[
                "AI 产品全流程管理（从 0 到 1）",
                "用户研究与数据分析",
                "Prompt Engineering & AI 集成",
                "Next.js / React / TypeScript",
                "UI/UX 设计与交互原型",
              ]}
            />
            <div className="flex flex-col gap-4 justify-center">
              <div className="p-4 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl overflow-hidden">
                <p className="text-xs text-[var(--muted)] mb-2">Marquee 滚动</p>
                <MarqueeText
                  text="Next.js · React · TypeScript · Tailwind · Framer Motion · AI · Supabase · Vercel"
                  className="text-sm font-bold"
                  speed={15}
                />
              </div>
              <div className="p-4 border border-[var(--card-border)] rounded-2xl overflow-hidden" style={{ backgroundColor: "#4800ff" }}>
                <MarqueeText
                  text="Wolfcha · BBQ翻译 · AI Product Manager · Vibe Coder · 道阻且长，行则将至"
                  className="text-sm font-bold text-white"
                  speed={25}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Mouse Trail Effects */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">5. 鼠标拖拽效果 (Mouse Trail Effects)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">在页面中移动鼠标或点击，体验不同的拖拽粒子效果。点击右下角按钮切换。</p>
          </div>
          <div className="relative min-h-[400px] border border-[var(--card-border)] bg-white rounded-2xl overflow-hidden">
            <EffectSwitcher />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[var(--muted)] text-sm">← 在此区域移动鼠标体验效果，点击右下角切换 →</p>
            </div>
          </div>
        </section>

        {/* 6. Micro-interactions */}
        <section className="space-y-6">
          <div className="border-b border-[var(--card-border)] pb-2">
            <h2 className="text-2xl font-semibold">6. 微交互组件 (Micro-interactions)</h2>
            <p className="text-sm text-[var(--muted)] mt-1">适用于按钮、CTA、导航元素</p>
          </div>
          <div className="flex flex-wrap gap-8 items-center p-8 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl">
            <div className="flex flex-col items-center gap-4">
              <MagneticButton>磁性按钮 (Magnetic)</MagneticButton>
              <span className="text-xs text-[var(--muted)]">鼠标靠近时吸附跟随</span>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <PulseButton>联系我 (Pulse)</PulseButton>
              <span className="text-xs text-[var(--muted)]">悬停时产生涟漪光晕</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <RippleButton>点击涟漪 (Ripple)</RippleButton>
              <span className="text-xs text-[var(--muted)]">点击产生水波扩散</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <ShimmerButton>微光按钮 (Shimmer)</ShimmerButton>
              <span className="text-xs text-[var(--muted)]">持续流光扫过效果</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <ShimmerButton bgColor="#4800ff" shimmerColor="rgba(255,255,255,0.2)">
                Indigo Shimmer
              </ShimmerButton>
              <span className="text-xs text-[var(--muted)]">带主题色的微光</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
