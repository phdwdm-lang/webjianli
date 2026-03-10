"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

export function GlowBorderCard({
  children,
  className,
  glowColor = "#2563eb",
  ...props
}: GlowBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 }); // initially off-screen

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl p-[1px] overflow-hidden group bg-[var(--card-border)]",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full w-full rounded-[15px] bg-[var(--card-bg)]">
        {children}
      </div>
    </div>
  );
}
