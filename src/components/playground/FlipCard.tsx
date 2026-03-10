"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("perspective-[1200px] cursor-pointer", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      >
        <div
          className="absolute inset-0 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
