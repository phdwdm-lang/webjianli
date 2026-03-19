"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface CanvasOffset {
  x: number;
  y: number;
}

interface UseCanvasDragOptions {
  canvasWidth: number;
  canvasHeight: number;
  overscroll?: number;
  initialOffset: () => CanvasOffset;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function useCanvasDrag({
  canvasWidth,
  canvasHeight,
  overscroll = 100,
  initialOffset,
}: UseCanvasDragOptions) {
  const [offset, setOffset] = useState<CanvasOffset>(() =>
    typeof window === "undefined" ? { x: 0, y: 0 } : initialOffset()
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  const bounds = useMemo(() => {
    if (typeof window === "undefined") {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    return {
      minX: -(canvasWidth - window.innerWidth),
      maxX: 0,
      minY: -(canvasHeight - window.innerHeight),
      maxY: 0,
    };
  }, [canvasHeight, canvasWidth]);

  useEffect(() => {
    const handleResize = () => {
      setOffset((current) => ({
        x: clamp(current.x, bounds.minX, bounds.maxX),
        y: clamp(current.y, bounds.minY, bounds.maxY),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [bounds.maxX, bounds.maxY, bounds.minX, bounds.minY]);

  const applyOverscrolledOffset = (nextX: number, nextY: number) => ({
    x: clamp(nextX, bounds.minX - overscroll, bounds.maxX + overscroll),
    y: clamp(nextY, bounds.minY - overscroll, bounds.maxY + overscroll),
  });

  const clampToBounds = () => {
    setOffset((current) => ({
      x: clamp(current.x, bounds.minX, bounds.maxX),
      y: clamp(current.y, bounds.minY, bounds.maxY),
    }));
  };

  const onViewportPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-note-card]")) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onViewportPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;

    setOffset(
      applyOverscrolledOffset(
        dragRef.current.startOffsetX + dx,
        dragRef.current.startOffsetY + dy
      )
    );
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) {
      return;
    }

    dragRef.current = null;
    setIsDragging(false);
    clampToBounds();
  };

  return {
    offset,
    isDragging,
    setOffset,
    onViewportPointerDown,
    onViewportPointerMove,
    onViewportPointerUp: finishDrag,
    onViewportPointerCancel: finishDrag,
  };
}
