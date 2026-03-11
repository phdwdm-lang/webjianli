"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Rocket, GraduationCap, Users, Package } from "lucide-react";
import { EFFECT_COLORS } from "@/constants/theme";

const MILESTONES = [
  { year: "2021", x: 38, y: 60, icon: Rocket, label: "创业" },
  { year: "2023", x: 55, y: 35, icon: GraduationCap, label: "毕业" },
  { year: "2025", x: 75, y: 60, icon: Users, label: "用研" },
  { year: "NOW", x: 92, y: 40, icon: Package, label: "产品" },
] as const;

function buildCurvePath(): string {
  const pts = MILESTONES;
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const midX = (pts[i].x + pts[i + 1].x) / 2;
    d += ` C ${midX},${pts[i].y} ${midX},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return d;
}

interface OceanJourneyProps {
  isHovered?: boolean;
}

export function OceanJourney({ isHovered = false }: OceanJourneyProps) {
  const curvePath = buildCurvePath();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Elegant smooth background waves */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path
            d="M 0,50 C 25,60 75,40 100,50 L 100,100 L 0,100 Z"
            fill="url(#wave-grad-1)"
            animate={{
              d: [
                "M 0,50 C 25,60 75,40 100,50 L 100,100 L 0,100 Z",
                "M 0,55 C 30,45 70,65 100,55 L 100,100 L 0,100 Z",
                "M 0,50 C 25,60 75,40 100,50 L 100,100 L 0,100 Z",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0,70 C 30,60 60,80 100,70 L 100,100 L 0,100 Z"
            fill="url(#wave-grad-2)"
            animate={{
              d: [
                "M 0,70 C 30,60 60,80 100,70 L 100,100 L 0,100 Z",
                "M 0,65 C 40,75 70,55 100,65 L 100,100 L 0,100 Z",
                "M 0,70 C 30,60 60,80 100,70 L 100,100 L 0,100 Z",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={EFFECT_COLORS.oceanJourney.waveGradTop} />
              <stop
                offset="100%"
                stopColor={EFFECT_COLORS.oceanJourney.waveGradBottom}
              />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={EFFECT_COLORS.oceanJourney.waveAltTop} />
              <stop
                offset="100%"
                stopColor={EFFECT_COLORS.oceanJourney.waveAltBottom}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Connection Line */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path
          d={curvePath}
          fill="none"
          stroke={EFFECT_COLORS.oceanJourney.connectionStroke}
          strokeWidth="0.4"
          strokeDasharray="1.5 1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Glowing dot moving along path */}
        <motion.circle
          r="0.8"
          fill={EFFECT_COLORS.oceanJourney.glowDot}
          filter={EFFECT_COLORS.oceanJourney.glowShadow}
          animate={
            isHovered
              ? {
                  offsetDistance: ["0%", "100%"],
                  opacity: 1,
                }
              : {
                  opacity: 0,
                }
          }
          style={{
            offsetPath: `path("${curvePath}")`,
          }}
          transition={
            isHovered
              ? {
                  offsetDistance: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                }
          }
        />
      </svg>

      {/* Milestones / Nodes */}
      {MILESTONES.map((node, i) => {
        const Icon = node.icon;
        return (
          <div
            key={node.year}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Fixed-size container: icon + year, never shifts */}
            <div className="flex flex-col items-center gap-1.5">
              {/* Glassmorphism Icon Container */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
              >
                <div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ background: EFFECT_COLORS.oceanJourney.iconGlow }}
                />
                <div
                  className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border backdrop-blur-md flex items-center justify-center"
                  style={{
                    borderColor: EFFECT_COLORS.oceanJourney.iconBorder,
                    backgroundColor: EFFECT_COLORS.oceanJourney.iconBackground,
                    boxShadow: EFFECT_COLORS.oceanJourney.iconShadow,
                  }}
                >
                  <Icon
                    className="w-4 h-4 md:w-5 md:h-5 text-[var(--on-color-text)]"
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>

              {/* Year label - always visible */}
              <motion.div
                className="text-[var(--on-color-text)] font-mono text-[10px] md:text-xs font-bold tracking-wider opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
              >
                {node.year}
              </motion.div>
            </div>

            {/* Description label - absolute positioned below, no layout impact */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[var(--on-color-text-muted)] text-[10px] md:text-[11px] font-bold backdrop-blur-sm px-2 py-0.5 rounded-md border whitespace-nowrap"
                  style={{
                    backgroundColor: EFFECT_COLORS.oceanJourney.labelBackground,
                    borderColor: EFFECT_COLORS.oceanJourney.labelBorder,
                  }}
                >
                  {node.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
