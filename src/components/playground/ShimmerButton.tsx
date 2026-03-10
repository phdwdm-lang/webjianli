"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shimmerColor?: string;
  bgColor?: string;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "rgba(255,255,255,0.3)",
  bgColor = "var(--foreground)",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center px-8 py-3 text-sm font-bold rounded-full text-[var(--background)] transition-transform hover:scale-105 active:scale-95",
        className
      )}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background: `linear-gradient(110deg, transparent 25%, ${shimmerColor} 50%, transparent 75%)`,
          backgroundSize: "250% 100%",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
