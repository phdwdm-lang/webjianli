"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pulseColor?: string;
}

export function PulseButton({
  children,
  className,
  pulseColor = "rgba(37, 99, 235, 0.4)",
  ...props
}: PulseButtonProps) {
  return (
    <button
      className={cn(
        "relative flex items-center justify-center px-6 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors group text-sm font-medium",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-full group-hover:animate-ping opacity-0 group-hover:opacity-100" style={{ backgroundColor: pulseColor, animationDuration: '2s' }}></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
