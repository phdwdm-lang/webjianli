import { useCallback, useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";

const DEFAULT_MOUSE_Y = Infinity;
const DEFAULT_HOVERED_INDEX: number | null = null;

export function useSideNavState() {
  const mouseY = useMotionValue(DEFAULT_MOUSE_Y);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    DEFAULT_HOVERED_INDEX
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      mouseY.set(event.clientY);
    },
    [mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseY.set(DEFAULT_MOUSE_Y);
    setHoveredIndex(DEFAULT_HOVERED_INDEX);
  }, [mouseY]);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(DEFAULT_HOVERED_INDEX);
  }, []);

  const clearInteractionState = useCallback(() => {
    mouseY.set(DEFAULT_MOUSE_Y);
    setHoveredIndex(DEFAULT_HOVERED_INDEX);
  }, [mouseY]);

  const toggleTheme = useCallback(() => {
    const themeMode = resolvedTheme ?? "light";
    const next =
      themeMode === "dark" ? "koi" : themeMode === "koi" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return {
    mouseY,
    isDark: mounted && resolvedTheme === "dark",
    isKoi: mounted && resolvedTheme === "koi",
    themeMode: mounted ? (resolvedTheme ?? "light") : "light",
    hoveredIndex,
    handleMouseMove,
    handleMouseLeave,
    handleHoverStart,
    handleHoverEnd,
    clearInteractionState,
    toggleTheme,
  };
}
