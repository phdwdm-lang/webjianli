"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BouncyCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BouncyCard({ children, className }: BouncyCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
      className={cn(
        "rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
