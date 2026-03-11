"use client";

import Link from "next/link";
import { Pen } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import PaperPlaneTrail from "@/components/effects/PaperPlaneTrail";
import ParticleTrail from "@/components/ParticleTrail";
import { SideNav } from "@/components/SideNav";
import { MagneticButton } from "@/components/playground/MagneticButton";
import { FloatingShapes } from "@/components/FloatingShapes";
import { JourneyCard } from "@/components/JourneyCard";
import { HOME_CARD_STYLES } from "@/constants/theme";
import { CreationsCard } from "@/components/CreationsCard";
import { TypewriterText } from "@/components/playground/TypewriterText";

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.12,
      ease: CARD_EASE as unknown as [number, number, number, number],
    },
  }),
};

function ThoughtsCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -8 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className="h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link
        href="/thoughts"
        className="group relative rounded-2xl overflow-hidden min-h-[200px] bg-[var(--theme-thoughts)] block h-full"
      >
        {/* Paper plane trail — only active on hover */}
        <PaperPlaneTrail count={2} active={hovered} />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]"
          style={{ background: HOME_CARD_STYLES.thoughtsGlow }}
        />

        <div className="relative h-full p-8 md:p-10 flex flex-col z-10">
          <span className="text-[11px] font-mono font-bold text-[var(--on-color-text-muted)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
            04 — THOUGHTS
          </span>

          <div className="flex-1" />

          {/* 文字单独包毛玻璃，紧贴文字而非整块容器 */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-serif-sc font-bold text-[var(--on-color-text)] mb-2 group-hover:translate-x-1 transition-transform duration-500 inline-block rounded-lg px-2 py-0.5"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                background: "color-mix(in oklab, var(--theme-thoughts) 20%, transparent)",
              }}
            >
              思想碎片
            </h2>
            <p
              className="text-sm text-[var(--on-color-text-muted)] font-medium flex items-center gap-2 group-hover:text-[var(--on-color-text-strong)] transition-colors duration-500 inline-flex rounded-md px-2 py-0.5"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                background: "color-mix(in oklab, var(--theme-thoughts) 20%, transparent)",
              }}
            >
              <Pen size={13} /> 捕捉转瞬即逝的光芒
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex items-center justify-center p-4 md:p-10 overflow-hidden">
      <ParticleTrail />

      {/* Vertical Navigation Bar */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20">
        <SideNav />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(180px,auto)] md:ml-16"
      >

        {/* ═══ 01. Pardon 乌冬面 (2×2) ═══ AMBER ═══ */}
        <motion.div variants={CARD_VARIANTS} custom={0} className="md:col-span-2 md:row-span-2">
          <Link
            href="/about"
            className="group relative rounded-3xl overflow-hidden min-h-[360px] bg-[var(--theme-pardon)] block h-full"
          >
            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]"
              style={{ background: HOME_CARD_STYLES.pardonGlow }}
            />

            {/* Floating geometric shapes background */}
            <FloatingShapes />

            {/* Oversized decorative letter */}
            <div className="absolute -right-10 -top-16 text-[22rem] leading-none font-display font-black text-[var(--on-color-text-veil)] select-none pointer-events-none group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:text-[var(--on-color-text-ghost)] transition-all duration-[1.2s] ease-out">
              P
            </div>

            <div className="relative h-full p-8 md:p-11 flex flex-col justify-between z-10">
              {/* Top bar */}
              <span className="text-[11px] font-mono font-bold text-[var(--card-amber-text)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
                01 — PERSONAL
              </span>

              {/* Main content — title left, button right */}
              <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[var(--card-amber-text)] mb-4 tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-500 whitespace-nowrap min-h-[1.5em]">
                    <TypewriterText
                      texts={["道阻且长，行则将至", "The road is long, but I will get there."]}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseDuration={2000}
                      typingSpeedMap={{ 1: 35 }}
                      deletingSpeedMap={{ 1: 18 }}
                      fontSizeMap={{ 1: "0.72em" }}
                    />
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--card-amber-ink)] tracking-tight leading-[1.1] group-hover:translate-x-2 transition-transform duration-700 ease-out">
                    Pardon<br /><span className="font-serif-sc">乌冬面</span>
                  </h2>
                </div>
                <div className="shrink-0 pb-1 group-hover:translate-y-[-4px] transition-transform duration-500">
                  <MagneticButton className="bg-[var(--card-amber-ink)] text-[var(--theme-pardon)] hover:bg-[var(--card-amber-ink-soft)] text-sm font-bold px-6 py-2.5">
                    More about me →
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ═══ 02. 灵感造物 (1×2) ═══ INDIGO ═══ */}
        <motion.div variants={CARD_VARIANTS} custom={1} className="md:col-span-1 md:row-span-2">
          <CreationsCard />
        </motion.div>

        {/* ═══ 03. 时光足迹 (2×1) ═══ SKY BLUE → OCEAN ═══ */}
        <motion.div variants={CARD_VARIANTS} custom={2} className="md:col-span-2 md:row-span-1">
          <JourneyCard rounded="rounded-2xl" />
        </motion.div>

        {/* ═══ 04. 思想碎片 (1×1) ═══ EMERALD ═══ */}
        <motion.div variants={CARD_VARIANTS} custom={3} className="md:col-span-1 md:row-span-1 h-full">
          <ThoughtsCard />
        </motion.div>
      </motion.div>
    </div>
  );
}
