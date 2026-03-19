"use client";

import Link from "next/link";
import { Pen } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import PaperPlaneTrail from "@/components/effects/PaperPlaneTrail";
import ParticleTrail from "@/components/ParticleTrail";
import { MagneticButton } from "@/components/playground/MagneticButton";
import { FloatingShapes } from "@/components/FloatingShapes";
import { JourneyCard } from "@/components/JourneyCard";
import { HOME_CARD_STYLES } from "@/constants/theme";
import { CreationsCard } from "@/components/CreationsCard";
import { useRouteTransitionState } from "@/components/common/RouteTransitionShell";
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
        className="group relative block h-full min-h-[200px] overflow-hidden rounded-2xl bg-[var(--theme-thoughts)]"
      >
        <PaperPlaneTrail count={2} active={hovered} />

        <div
          className="absolute inset-0 z-[2] opacity-0 transition-opacity duration-700 pointer-events-none group-hover:opacity-100"
          style={{ background: HOME_CARD_STYLES.thoughtsGlow }}
        />

        <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[var(--on-color-text-muted)] transition-all duration-500 group-hover:tracking-[0.3em]">
            04 - THOUGHTS
          </span>

          <div className="flex-1" />

          <div>
            <h2
              className="mb-2 inline-block rounded-lg px-2 py-0.5 text-3xl font-serif-sc font-bold text-[var(--on-color-text)] transition-transform duration-500 group-hover:translate-x-1 md:text-4xl"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                background:
                  "color-mix(in oklab, var(--theme-thoughts) 20%, transparent)",
              }}
            >
              思想碎片
            </h2>
            <p
              className="inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-sm font-medium text-[var(--on-color-text-muted)] transition-colors duration-500 group-hover:text-[var(--on-color-text-strong)]"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                background:
                  "color-mix(in oklab, var(--theme-thoughts) 20%, transparent)",
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
  const { isRouteTransitioning } = useRouteTransitionState();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] p-4 md:p-10">
      <ParticleTrail />

      <motion.div
        initial={isRouteTransitioning ? false : "hidden"}
        animate="visible"
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 auto-rows-[minmax(180px,auto)] gap-4 md:ml-16 md:grid-cols-3 md:gap-5"
      >
        <motion.div
          variants={CARD_VARIANTS}
          custom={0}
          className="md:col-span-2 md:row-span-2"
        >
          <Link
            href="/about"
            className="group relative block h-full min-h-[360px] overflow-hidden rounded-3xl bg-[var(--theme-pardon)]"
          >
            <div
              className="absolute inset-0 z-[2] opacity-0 transition-opacity duration-700 pointer-events-none group-hover:opacity-100"
              style={{ background: HOME_CARD_STYLES.pardonGlow }}
            />

            <FloatingShapes />

            <div className="pointer-events-none absolute -right-10 -top-16 text-[22rem] leading-none text-[var(--on-color-text-veil)] transition-all duration-[1.2s] ease-out group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:text-[var(--on-color-text-ghost)] font-display font-black select-none">
              P
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-11">
              <span className="text-[11px] font-mono font-bold tracking-wider text-[var(--card-amber-text)] transition-all duration-500 group-hover:tracking-[0.3em]">
                01 - PERSONAL
              </span>

              <div className="mt-auto flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div className="min-w-0">
                  <p className="mb-4 min-h-[1.5em] whitespace-nowrap text-sm font-bold tracking-[0.25em] text-[var(--card-amber-text)] transition-all duration-500 group-hover:tracking-[0.35em]">
                    <TypewriterText
                      texts={[
                        "道阻且长，行则将至",
                        "The road is long, but I will get there.",
                      ]}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseDuration={2000}
                      typingSpeedMap={{ 1: 35 }}
                      deletingSpeedMap={{ 1: 18 }}
                      fontSizeMap={{ 1: "0.72em" }}
                    />
                  </p>
                  <h2 className="text-3xl font-display font-black leading-[1.1] tracking-tight text-[var(--card-amber-ink)] transition-transform duration-700 ease-out group-hover:translate-x-2 sm:text-4xl md:text-5xl">
                    Pardon
                    <br />
                    <span className="font-serif-sc">彭焕东</span>
                  </h2>
                </div>

                <div className="shrink-0 pb-1 transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <MagneticButton className="bg-[var(--card-amber-ink)] px-6 py-2.5 text-sm font-bold text-[var(--theme-pardon)] hover:bg-[var(--card-amber-ink-soft)]">
                    More about me →
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={CARD_VARIANTS}
          custom={1}
          className="md:col-span-1 md:row-span-2"
        >
          <CreationsCard />
        </motion.div>

        <motion.div
          variants={CARD_VARIANTS}
          custom={2}
          className="md:col-span-2 md:row-span-1"
        >
          <JourneyCard rounded="rounded-2xl" />
        </motion.div>

        <motion.div
          variants={CARD_VARIANTS}
          custom={3}
          className="h-full md:col-span-1 md:row-span-1"
        >
          <ThoughtsCard />
        </motion.div>
      </motion.div>
    </div>
  );
}
