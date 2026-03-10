"use client";

import { motion } from "framer-motion";
import { EFFECT_COLORS } from "@/constants/theme";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large warm gradient blob - top right */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[5%] -top-[10%] w-[55%] h-[70%] rounded-full blur-[60px] opacity-60"
        style={{ background: EFFECT_COLORS.floatingShapes.warmGlow }}
      />

      {/* Secondary glow blob - bottom left */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -8, 0],
          y: [0, 10, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -left-[8%] -bottom-[15%] w-[45%] h-[60%] rounded-full blur-[50px] opacity-45"
        style={{ background: EFFECT_COLORS.floatingShapes.warmGlowSecondary }}
      />

      {/* Large rotating ring */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[5%] left-[55%] w-72 h-72 opacity-50"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={EFFECT_COLORS.floatingShapes.ringGradStart} />
              <stop offset="50%" stopColor={EFFECT_COLORS.floatingShapes.ringGradMid} />
              <stop offset="100%" stopColor={EFFECT_COLORS.floatingShapes.ringGradEnd} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ring-grad)" strokeWidth="2.5" strokeDasharray="6 8" />
        </svg>
      </motion.div>

      {/* Floating diamond */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [45, 45 + 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[30%] w-12 h-12 border-[3px] opacity-50"
        style={{ borderColor: EFFECT_COLORS.floatingShapes.diamondBorder }}
      />

      {/* Floating cross */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[55%] left-[70%] w-14 h-14 flex items-center justify-center opacity-40"
      >
        <div
          className="absolute w-[3px] h-full rounded-full"
          style={{ backgroundColor: EFFECT_COLORS.floatingShapes.crossLine }}
        />
        <div
          className="absolute h-[3px] w-full rounded-full"
          style={{ backgroundColor: EFFECT_COLORS.floatingShapes.crossLine }}
        />
      </motion.div>

      {/* Scattered floating dots - gentle breathing */}
      {[
        { x: "75%", y: "30%", delay: 0, dur: 8 },
        { x: "25%", y: "70%", delay: 2, dur: 10 },
        { x: "85%", y: "65%", delay: 4, dur: 9 },
        { x: "40%", y: "15%", delay: 1, dur: 11 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{ duration: dot.dur, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            backgroundColor: EFFECT_COLORS.floatingShapes.dot,
          }}
        />
      ))}

      {/* Small orbiting ring */}
      <motion.div
        animate={{
          rotate: [0, -360],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[15%] right-[20%] w-28 h-28 rounded-full border-[3px]"
        style={{ borderColor: EFFECT_COLORS.floatingShapes.orbitBorder }}
      />

      {/* Floating triangle */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 360],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[65%] left-[40%] opacity-45"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3L22 20H2L12 3Z"
            stroke={EFFECT_COLORS.floatingShapes.triangleStroke}
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
