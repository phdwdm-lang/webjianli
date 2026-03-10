import { useCallback, useState } from "react";

const DEFAULT_HOVERED = false;

export function useHoverState(initial: boolean = DEFAULT_HOVERED) {
  const [isHovered, setIsHovered] = useState(initial);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}
