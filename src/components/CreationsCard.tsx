"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HOME_CARD_STYLES } from "@/constants/theme";

// ── Parallax layer depths ──────────────────────────────────────────
// Each layer has a different tilt + translate multiplier.
// Higher = more movement = feels "closer" to the viewer.
const LAYERS = {
  shell:  { tiltMult: 1,    translateMult: 1    }, // outer card shell
  card1:  { tiltMult: 0,    translateMult: -6   }, // Wolfcha  — back layer
  card2:  { tiltMult: 0,    translateMult: 10   }, // BBQ      — front layer
  label:  { tiltMult: 0,    translateMult: 4    }, // text label
} as const;

// Spring config — snappy but smooth
const SPRING = { stiffness: 260, damping: 28, mass: 0.8 };

function ParallaxCard({
  src,
  alt,
  style,
  translateX,
  translateY,
  floatDelay = 0,
  floatDuration = 5,
  floatY = [-5, 0],
  floatRotateZ = [-4, -3, -4],
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
  translateX: ReturnType<typeof useSpring>;
  translateY: ReturnType<typeof useSpring>;
  floatDelay?: number;
  floatDuration?: number;
  floatY?: number[];
  floatRotateZ?: number[];
}) {
  const x = useTransform(translateX, (v) => v * LAYERS.card1.translateMult);
  const y = useTransform(translateY, (v) => v * LAYERS.card1.translateMult);

  return (
    <motion.div
      className="absolute"
      style={{
        ...style,
        x,
        y,
        transformStyle: "preserve-3d",
      }}
      animate={{
        // idle float — overridden by x/y from mouse
        // use translateY keyframe via y-offset trick with a separate wrapper
      }}
    >
      {/* Inner float animation wrapper */}
      <motion.div
        animate={{
          y: floatY,
          rotateZ: floatRotateZ,
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
          repeatType: "mirror",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-shadow duration-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block select-none"
            draggable={false}
          />
          {/* Radial highlight — mimics buildaloud.love */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), transparent 70%)",
            }}
          />
          {/* Glass edge */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CreationsCard() {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse position (−0.5 → +0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring for each axis
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  // Shell tilt (outer card)
  const shellRotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const shellRotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Per-layer translate values
  const card1X = useTransform(springX, (v) => v * -28); // back layer moves less
  const card1Y = useTransform(springY, (v) => v * -28);
  const card2X = useTransform(springX, (v) => v * 40);  // front layer moves more
  const card2Y = useTransform(springY, (v) => v * 40);
  const labelX = useTransform(springX, (v) => v * 14);
  const labelY = useTransform(springY, (v) => v * 14);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <Link href="/projects" className="block h-full min-h-[360px]" style={{ perspective: 1000 }}>
      {/* ── Outer shell — tilts on mouse move ── */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shellRotateX,
          rotateY: shellRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full rounded-3xl bg-[var(--theme-creations)] overflow-hidden cursor-pointer"
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: HOME_CARD_STYLES.projectGrid,
            backgroundSize: HOME_CARD_STYLES.projectGridSize,
          }}
        />

        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.09) 0%, transparent 68%)",
          }}
        />

        {/* ── Inner 3D scene — translateZ lifts above shell ── */}
        <div
          className="relative h-full flex flex-col"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top label */}
          <motion.div
            className="px-7 pt-7 relative z-10"
            style={{ x: labelX, y: labelY }}
          >
            <span className="text-[11px] font-mono font-bold text-[var(--on-color-text-muted)] tracking-wider group-hover:tracking-[0.3em] transition-all duration-500">
              02 — PROJECTS
            </span>
          </motion.div>

          {/* Card stack area */}
          <div
            className="relative flex-1"
            style={{ transformStyle: "preserve-3d", perspective: "500px" }}
          >
            {/* Card 1 — Wolfcha (back layer, top-left) */}
            <motion.div
              className="absolute"
              style={{
                width: "36%",
                top: "8%",
                left: "14%",
                x: card1X,
                y: card1Y,
                transformStyle: "preserve-3d",
                transform: "rotateX(6deg) rotateY(14deg) rotateZ(-4deg) translateZ(-20px)",
                zIndex: 1,
              }}
            >
              <motion.div
                animate={{ y: [-5, 0, -5], rotateZ: [-4, -3, -4] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Wolfcha Card.png"
                    alt="Wolfcha"
                    className="w-full h-auto block select-none transition-[filter] duration-500 ease-out saturate-50 brightness-90 group-hover:saturate-100 group-hover:brightness-100"
                    draggable={false}
                  />
                  {/* Theme color tint overlay — fades out on hover */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out opacity-50 group-hover:opacity-0"
                    style={{ background: "var(--theme-creations)", mixBlendMode: "color" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)" }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2 — BBQTranslator (front layer, bottom-right) */}
            <motion.div
              className="absolute"
              style={{
                width: "36%",
                bottom: "8%",
                right: "14%",
                x: card2X,
                y: card2Y,
                transformStyle: "preserve-3d",
                transform: "rotateX(-4deg) rotateY(-10deg) rotateZ(5deg) translateZ(28px)",
                zIndex: 2,
              }}
            >
              <motion.div
                animate={{ y: [0, 6, 0], rotateZ: [5, 4, 5] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                  repeatType: "mirror",
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/BBQTranslator Card.png"
                    alt="BBQTranslator"
                    className="w-full h-auto block select-none transition-[filter] duration-500 ease-out saturate-50 brightness-90 group-hover:saturate-100 group-hover:brightness-100"
                    draggable={false}
                  />
                  {/* Theme color tint overlay — fades out on hover */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out opacity-50 group-hover:opacity-0"
                    style={{ background: "var(--theme-creations)", mixBlendMode: "color" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom text — slightly elevated */}
          <motion.div
            className="px-7 pb-7 relative z-10"
            style={{ x: labelX, y: labelY }}
          >
            <h2 className="text-3xl md:text-4xl font-serif-sc font-bold text-[var(--on-color-text)] mb-1">
              灵感造物
            </h2>
            <p className="text-sm text-[var(--on-color-text-muted)] font-medium">
              AI 与代码交织的实验场
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
