"use client";

import { useEffect, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  holdDuration?: number;
}

export function TextRevealByWord({ text, className, holdDuration = 2500 }: TextRevealByWordProps) {
  const words = text.split(" ");
  const controls = useAnimationControls();

  const runCycle = useCallback(async () => {
    while (true) {
      await controls.start((i: number) => ({
        opacity: 1,
        transition: { duration: 0.6, delay: i * 0.1 },
      }));
      await new Promise((r) => setTimeout(r, holdDuration));
      await controls.start((i: number) => ({
        opacity: 0.15,
        transition: { duration: 0.4, delay: i * 0.04 },
      }));
      await new Promise((r) => setTimeout(r, 500));
    }
  }, [controls, holdDuration]);

  useEffect(() => {
    runCycle();
  }, [runCycle]);

  return (
    <div className={cn("relative", className)}>
      <p className="flex flex-wrap text-2xl font-bold leading-relaxed">
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            animate={controls}
            initial={{ opacity: 0.15 }}
            className="relative mr-2 mt-1"
          >
            {word}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
