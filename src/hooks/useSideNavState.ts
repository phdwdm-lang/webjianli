import { useCallback, useState } from "react";
import { useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";

const DEFAULT_MOUSE_Y = Infinity;
const DEFAULT_HOVERED_INDEX: number | null = null;

export function useSideNavState() {
  const mouseY = useMotionValue(DEFAULT_MOUSE_Y);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    DEFAULT_HOVERED_INDEX
  );

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

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return {
    mouseY,
    isDark: resolvedTheme === "dark",
    hoveredIndex,
    handleMouseMove,
    handleMouseLeave,
    handleHoverStart,
    handleHoverEnd,
    toggleTheme,
  };
}
