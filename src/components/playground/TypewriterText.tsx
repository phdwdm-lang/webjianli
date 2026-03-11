"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Phase = "typing" | "pausing" | "deleting";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  /** Per-index overrides. Key = text index, value = speed in ms. */
  typingSpeedMap?: Record<number, number>;
  deletingSpeedMap?: Record<number, number>;
  /** Per-index font size overrides, e.g. { 1: "0.75em" } */
  fontSizeMap?: Record<number, string>;
}

export function TypewriterText({
  texts,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
  typingSpeedMap,
  deletingSpeedMap,
  fontSizeMap,
}: TypewriterTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const currentFullText = texts[textIndex];
    const curTypingSpeed = typingSpeedMap?.[textIndex] ?? typingSpeed;
    const curDeletingSpeed = deletingSpeedMap?.[textIndex] ?? deletingSpeed;

    if (phase === "typing") {
      if (charIndex < currentFullText.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), curTypingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), pauseDuration);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), curDeletingSpeed);
        return () => clearTimeout(t);
      } else {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setPhase("typing");
      }
    }
  }, [isInView, phase, charIndex, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration, typingSpeedMap, deletingSpeedMap]);

  const displayText = texts[textIndex].slice(0, charIndex);
  const fontSize = fontSizeMap?.[textIndex];

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center pr-1", className)}
      style={fontSize ? { fontSize, transition: "font-size 0.3s ease" } : undefined}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1.1em] bg-current ml-0.5 shrink-0"
      />
    </span>
  );
}
