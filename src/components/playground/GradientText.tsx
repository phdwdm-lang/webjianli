"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
}

export function GradientText({
  text,
  className,
  colors = ["#ff4596", "#acb54f", "#4800ff", "#ff4596"],
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "bg-clip-text text-transparent inline-block",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
      }}
      animate={{
        backgroundPositionX: ["0%", "100%", "0%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
