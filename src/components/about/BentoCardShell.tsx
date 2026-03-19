"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardShellProps {
  children: ReactNode;
  className?: string;
  glow?: string;
  style?: CSSProperties;
}

export default function BentoCardShell({
  children,
  className,
  glow,
  style,
}: BentoCardShellProps) {
  return (
    <div
      className={cn(
        "bento-card group h-full rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6",
        "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]",
        "transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)]",
        "hover:z-10 hover:border-[rgba(255,184,0,0.5)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),-5px_10px_30px_-10px_rgba(255,184,0,0.15)]",
        className
      )}
      style={
        {
          ...(glow ? { backgroundImage: glow } : null),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
