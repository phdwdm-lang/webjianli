"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rippleColor?: string;
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255, 255, 255, 0.4)",
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
      props.onClick?.(e);
    },
    [props]
  );

  return (
    <button
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center px-8 py-3 text-sm font-bold rounded-full bg-[var(--foreground)] text-[var(--background)] transition-transform active:scale-95",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
