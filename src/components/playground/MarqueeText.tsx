"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  separator?: string;
}

export function MarqueeText({
  text,
  className,
  speed = 20,
  separator = " · ",
}: MarqueeTextProps) {
  const repeated = Array(4).fill(`${text}${separator}`).join("");

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span>{repeated}{repeated}</span>
      </motion.div>
    </div>
  );
}
