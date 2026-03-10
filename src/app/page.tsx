"use client";

import Link from "next/link";
import { Pen } from "lucide-react";
import { motion } from "framer-motion";
import ParticleTrail from "@/components/ParticleTrail";
import { SideNav } from "@/components/SideNav";
import { MagneticButton } from "@/components/playground/MagneticButton";
import { FloatingShapes } from "@/components/FloatingShapes";
import { JourneyCard } from "@/components/JourneyCard";
import { TiltCard } from "@/components/playground/TiltCard";
import { HOME_CARD_STYLES } from "@/constants/theme";

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
            <div className="absolute -right-10 -top-16 text-[22rem] leading-none font-serif-sc font-black text-[var(--on-color-text-veil)] select-none pointer-events-none group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:text-[var(--on-color-text-ghost)] transition-all duration-[1.2s] ease-out">
              P
            </div>

            <div className="relative h-full p-8 md:p-11 flex flex-col justify-between z-10">
              {/* Top bar */}
              <span className="text-[11px] font-mono font-bold text-[var(--card-amber-text)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
                01 — PERSONAL
              </span>

              {/* Main content — title left, button right */}
              <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-[var(--card-amber-text)] mb-4 tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-500">
                    道阻且长，行则将至
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-sc font-black text-[var(--card-amber-ink)] tracking-tight leading-[1.1] group-hover:translate-x-2 transition-transform duration-700 ease-out">
                    Pardon<br />乌冬面
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
        <motion.div variants={CARD_VARIANTS} custom={1} className="md:col-span-1 md:row-span-2" style={{ perspective: 800 }}>
          <Link
            href="/projects"
            className="group relative rounded-3xl overflow-hidden min-h-[360px] block h-full"
          >
            <TiltCard className="bg-[var(--theme-creations)] border-transparent rounded-3xl h-full">
              {/* Grid dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: HOME_CARD_STYLES.projectGrid,
                  backgroundSize: HOME_CARD_STYLES.projectGridSize,
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: HOME_CARD_STYLES.creationsGlow }}
              />

              <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10">
                <span className="text-[11px] font-mono font-bold text-[var(--on-color-text-muted)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
                  02 — PROJECTS
                </span>

                <div className="mt-auto">
                  <h2 className="text-3xl md:text-4xl font-serif-sc font-bold text-[var(--on-color-text)] mb-2 group-hover:translate-x-1 transition-transform duration-500">
                    灵感造物
                  </h2>
                  <p className="text-sm text-[var(--on-color-text-subtle)] font-medium group-hover:text-[var(--on-color-text-emphasis)] transition-colors duration-500">
                    AI 与代码交织的实验场
                  </p>
                </div>
              </div>
            </TiltCard>
          </Link>
        </motion.div>

        {/* ═══ 03. 时光足迹 (2×1) ═══ SKY BLUE → OCEAN ═══ */}
        <motion.div variants={CARD_VARIANTS} custom={2} className="md:col-span-2 md:row-span-1">
          <JourneyCard />
        </motion.div>

        {/* ═══ 04. 思想碎片 (1×1) ═══ EMERALD ═══ */}
        <motion.div variants={CARD_VARIANTS} custom={3} className="md:col-span-1 md:row-span-1">
          <motion.div
            whileHover={{ scale: 1.04, y: -8 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
          <Link
            href="/thoughts"
            className="group relative rounded-3xl overflow-hidden min-h-[200px] bg-[var(--theme-thoughts)] block h-full"
          >
            {/* Decorative floating shapes - bigger and more visible */}
            <div className="absolute -right-4 -top-4 pointer-events-none">
              <motion.div
                animate={{ rotate: [0, 20, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-2xl bg-[var(--on-color-surface-strong)] border border-[var(--on-color-border)] transform rotate-12 group-hover:bg-[var(--on-color-surface-bright)] transition-colors duration-500"
              />
            </div>
            <div className="absolute left-[15%] bottom-[10%] pointer-events-none">
              <motion.div
                animate={{ rotate: [0, -15, 0], y: [0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-16 h-16 rounded-xl bg-[var(--on-color-surface)] border border-[var(--on-color-border)] transform -rotate-6"
              />
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]"
              style={{ background: HOME_CARD_STYLES.thoughtsGlow }}
            />

            <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10">
              <span className="text-[11px] font-mono font-bold text-[var(--on-color-text-muted)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
                04 — THOUGHTS
              </span>

              <div className="mt-auto">
                <h2 className="text-3xl md:text-4xl font-serif-sc font-bold text-[var(--on-color-text)] mb-2 group-hover:translate-x-1 transition-transform duration-500">
                  思想碎片
                </h2>
                <p className="text-sm text-[var(--on-color-text-muted)] font-medium flex items-center gap-2 group-hover:text-[var(--on-color-text-strong)] transition-colors duration-500">
                  <Pen size={13} /> 捕捉转瞬即逝的光芒
                </p>
              </div>
            </div>
          </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
