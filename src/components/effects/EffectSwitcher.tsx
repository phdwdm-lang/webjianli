"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraTrail } from "./AuroraTrail";
import { ConstellationTrail } from "./ConstellationTrail";
import { InkSplashTrail } from "./InkSplashTrail";
import { FireflyTrail } from "./FireflyTrail";
import ParticleTrail from "../ParticleTrail";

type EffectType = "aurora" | "constellation" | "ink" | "firefly" | "particle";

const EFFECTS: { key: EffectType; label: string; emoji: string }[] = [
  { key: "aurora", label: "极光", emoji: "🌌" },
  { key: "constellation", label: "星座", emoji: "✨" },
  { key: "ink", label: "墨水", emoji: "🎨" },
  { key: "firefly", label: "萤火虫", emoji: "🪲" },
  { key: "particle", label: "粒子", emoji: "💫" },
];

const EFFECT_COMPONENTS: Record<EffectType, React.ComponentType> = {
  aurora: AuroraTrail,
  constellation: ConstellationTrail,
  ink: InkSplashTrail,
  firefly: FireflyTrail,
  particle: ParticleTrail,
};

export function EffectSwitcher() {
  const [current, setCurrent] = useState<EffectType>("aurora");
  const [isOpen, setIsOpen] = useState(false);

  const ActiveEffect = EFFECT_COMPONENTS[current];

  return (
    <>
      <ActiveEffect />

      {/* Switcher UI - bottom right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1.5 p-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-black/[0.06]"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {EFFECTS.map((effect) => (
                <button
                  key={effect.key}
                  onClick={() => {
                    setCurrent(effect.key);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    current === effect.key
                      ? "bg-[#0f172a] text-white"
                      : "hover:bg-black/5 text-[#0f172a]/70"
                  }`}
                >
                  <span>{effect.emoji}</span>
                  <span>{effect.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl border border-black/[0.06] flex items-center justify-center text-base transition-transform duration-200 hover:scale-110"
          style={{
            boxShadow: "0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.05)",
          }}
          title="切换鼠标效果"
        >
          {EFFECTS.find((e) => e.key === current)?.emoji}
        </button>
      </div>
    </>
  );
}
