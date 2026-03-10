"use client";

import { useEffect, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurRevealTextProps {
  text: string;
  className?: string;
  holdDuration?: number;
}

export function BlurRevealText({ text, className, holdDuration = 2000 }: BlurRevealTextProps) {
  const words = text.split(" ");
  const controls = useAnimationControls();

  const runCycle = useCallback(async () => {
    while (true) {
      await controls.start((i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, damping: 12, stiffness: 100, delay: i * 0.12 },
      }));
      await new Promise((r) => setTimeout(r, holdDuration));
      await controls.start((i: number) => ({
        opacity: 0,
        y: 10,
        filter: "blur(10px)",
        transition: { duration: 0.3, delay: i * 0.05 },
      }));
      await new Promise((r) => setTimeout(r, 400));
    }
  }, [controls, holdDuration]);

  useEffect(() => {
    runCycle();
  }, [runCycle]);

  return (
    <div className={cn("flex flex-wrap gap-x-1.5", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          custom={idx}
          animate={controls}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
