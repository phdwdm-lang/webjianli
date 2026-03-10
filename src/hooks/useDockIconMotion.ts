import { useRef } from "react";
import { useSpring, useTransform, type MotionValue } from "framer-motion";

const SPRING_CONFIG = {
  mass: 0.1,
  stiffness: 300,
  damping: 20,
} as const;

interface DockIconMotionOptions {
  mouseY: MotionValue<number>;
  baseSize: number;
  maxSize: number;
  magnificationRange: number;
}

export function useDockIconMotion({
  mouseY,
  baseSize,
  maxSize,
  magnificationRange,
}: DockIconMotionOptions) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseY, (value: number) => {
    const element = ref.current;
    if (!element) return Infinity;
    const rect = element.getBoundingClientRect();
    return value - (rect.top + rect.height / 2);
  });

  const sizeRaw = useTransform(distance, (offset: number) => {
    const absOffset = Math.abs(offset);
    if (absOffset >= magnificationRange) return baseSize;
    const progress =
      (1 + Math.cos((Math.PI * absOffset) / magnificationRange)) / 2;
    return baseSize + (maxSize - baseSize) * progress;
  });

  const size = useSpring(sizeRaw, SPRING_CONFIG);

  const iconScale = useTransform(size, [baseSize, maxSize], [
    1,
    maxSize / baseSize,
  ]);

  return {
    ref,
    size,
    iconScale,
  };
}
