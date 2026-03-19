"use client";

import Link from "next/link";
import { OceanJourney } from "@/components/OceanJourney";
import { HOME_CARD_STYLES } from "@/constants/theme";
import { useHoverState } from "@/hooks/useHoverState";

interface JourneyCardProps {
  rounded?: string;
}

export function JourneyCard({ rounded = "rounded-3xl" }: JourneyCardProps) {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverState();

  return (
    <Link
      href="/experience"
      className={`group relative block h-full min-h-[200px] overflow-hidden ${rounded}`}
      style={{ background: HOME_CARD_STYLES.journeyGradient }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OceanJourney isHovered={isHovered} />

      <div
        className="absolute inset-0 z-[2] opacity-0 transition-opacity duration-700 pointer-events-none group-hover:opacity-100"
        style={{ background: HOME_CARD_STYLES.journeyGlow }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
        <span className="text-[11px] font-mono font-bold tracking-wider text-[var(--on-color-text-muted)] transition-all duration-500 group-hover:tracking-[0.3em]">
          03 - JOURNEY
        </span>

        <div className="mt-auto">
          <h2 className="mb-2 text-3xl font-serif-sc font-bold text-[var(--on-color-text)] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
            时光足迹
          </h2>
          <p className="text-sm font-medium text-[var(--on-color-text-muted)] transition-colors duration-500 group-hover:text-[var(--on-color-text-strong)]">
            在探索中沉淀的日与夜
          </p>
        </div>
      </div>
    </Link>
  );
}
