"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggeredListProps {
  items: string[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
};

export function StaggeredList({ items, className }: StaggeredListProps) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className={cn("space-y-3", className)}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={itemVariants}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-medium"
        >
          <span className="w-6 h-6 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-bold shrink-0">
            {i + 1}
          </span>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
