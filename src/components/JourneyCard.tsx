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
      className={`group relative ${rounded} overflow-hidden min-h-[200px] block h-full`}
      style={{ background: HOME_CARD_STYLES.journeyGradient }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OceanJourney isHovered={isHovered} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]"
        style={{ background: HOME_CARD_STYLES.journeyGlow }}
      />

      <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10">
        <span className="text-[11px] font-mono font-bold text-[var(--on-color-text-muted)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
          03 — JOURNEY
        </span>

        <div className="mt-auto">
          <h2 className="text-3xl md:text-4xl font-serif-sc font-bold text-[var(--on-color-text)] mb-2 group-hover:translate-x-2 transition-transform duration-500">
            时光足迹
          </h2>
          <p className="text-sm text-[var(--on-color-text-muted)] font-medium group-hover:text-[var(--on-color-text-strong)] transition-colors duration-500">
            在探索中沉淀的日与夜
          </p>
        </div>
      </div>
    </Link>
  );
}
