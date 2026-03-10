"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Coffee, BrainCircuit } from "lucide-react";

interface ColorOption {
  name: string;
  hex: string;
  label: string;
  textColor: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { name: "Coral", hex: "#FF6B35", label: "珊瑚橙 — 温暖活力", textColor: "#fff" },
  { name: "Teal", hex: "#00BFA6", label: "薄荷青 — 清新现代", textColor: "#fff" },
  { name: "Amber", hex: "#FFB800", label: "琥珀金 — 高级质感", textColor: "#1a1000" },
  { name: "Vermillion", hex: "#E63946", label: "朱砂红 — 大胆自信", textColor: "#fff" },
  { name: "Cyan", hex: "#0096C7", label: "深湖蓝 — 沉稳专业", textColor: "#fff" },
  { name: "Violet", hex: "#8B5CF6", label: "紫罗兰 — 创意独特", textColor: "#fff" },
];

const COMPANION_COLORS = {
  indigo: "#4800ff",
  olive: "#acb54f",
  lime: "#bde64c",
};

export function ColorPalettePreview() {
  const [selected, setSelected] = useState<number>(0);
  const current = COLOR_OPTIONS[selected];

  return (
    <div className="space-y-8">
      {/* Color selector */}
      <div className="flex flex-wrap gap-3">
        {COLOR_OPTIONS.map((color, i) => (
          <button
            key={color.name}
            onClick={() => setSelected(i)}
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
              selected === i
                ? "ring-2 ring-offset-2 ring-[var(--foreground)] scale-105"
                : "opacity-70 hover:opacity-100"
            )}
            style={{ backgroundColor: color.hex, color: color.textColor }}
          >
            <span className="w-3 h-3 rounded-full bg-current opacity-50" />
            {color.label}
          </button>
        ))}
      </div>

      {/* Preview: Mini card + full palette harmony */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mini card preview */}
        <motion.div
          key={current.hex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl overflow-hidden min-h-[280px] relative"
          style={{ backgroundColor: current.hex }}
        >
          <div className="absolute -right-8 -top-12 text-[16rem] leading-none font-serif-sc font-black select-none pointer-events-none" style={{ color: `${current.textColor}10` }}>
            P
          </div>
          <div className="relative h-full p-8 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono font-bold tracking-wider" style={{ color: `${current.textColor}99` }}>
                01 — PERSONAL
              </span>
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center"
                style={{ borderColor: `${current.textColor}4D`, color: `${current.textColor}CC` }}
              >
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="absolute top-16 right-6 flex flex-col gap-2.5 pointer-events-none">
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 border"
                style={{
                  backgroundColor: `${current.textColor}1A`,
                  color: current.textColor,
                  borderColor: `${current.textColor}1A`,
                }}
              >
                <Coffee size={11} /> AI Product Manager
              </motion.div>
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 border ml-4"
                style={{
                  backgroundColor: `${current.textColor}1A`,
                  color: current.textColor,
                  borderColor: `${current.textColor}1A`,
                }}
              >
                <BrainCircuit size={11} /> Vibe Coder
              </motion.div>
            </div>

            <div className="mt-auto">
              <p className="text-xs font-bold mb-3 tracking-[0.2em]" style={{ color: `${current.textColor}B3` }}>
                道阻且长，行则将至
              </p>
              <h2 className="text-4xl font-serif-sc font-black tracking-tight leading-[1.05]" style={{ color: current.textColor }}>
                Pardon<br />乌冬面
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Full palette harmony preview */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-[var(--muted)] mb-4">四卡片配色和谐度预览</p>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              key={`preview-personal-${current.hex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl p-5 min-h-[100px] flex flex-col justify-between"
              style={{ backgroundColor: current.hex }}
            >
              <span className="text-[10px] font-mono font-bold" style={{ color: `${current.textColor}80` }}>PERSONAL</span>
              <span className="text-lg font-serif-sc font-bold" style={{ color: current.textColor }}>乌冬面</span>
            </motion.div>
            <div className="rounded-2xl p-5 min-h-[100px] flex flex-col justify-between" style={{ backgroundColor: COMPANION_COLORS.indigo }}>
              <span className="text-[10px] font-mono font-bold text-white/50">PROJECTS</span>
              <span className="text-lg font-serif-sc font-bold text-white">灵感造物</span>
            </div>
            <div className="rounded-2xl p-5 min-h-[100px] flex flex-col justify-between" style={{ backgroundColor: COMPANION_COLORS.olive }}>
              <span className="text-[10px] font-mono font-bold text-white/50">JOURNEY</span>
              <span className="text-lg font-serif-sc font-bold text-white">时光足迹</span>
            </div>
            <div className="rounded-2xl p-5 min-h-[100px] flex flex-col justify-between" style={{ backgroundColor: COMPANION_COLORS.lime }}>
              <span className="text-[10px] font-mono font-bold text-[#3d4a15]/60">THOUGHTS</span>
              <span className="text-lg font-serif-sc font-bold text-[#1a2000]">思想碎片</span>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            当前选择: <strong style={{ color: current.hex }}>{current.name} {current.hex}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
