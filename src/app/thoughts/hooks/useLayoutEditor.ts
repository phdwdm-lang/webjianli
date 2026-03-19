"use client";

import { useEffect, useRef, useState } from "react";
import type { NotePosition } from "@/app/thoughts/types";

interface UseLayoutEditorOptions {
  enabled: boolean;
  positions: Record<string, NotePosition>;
  setPositions: React.Dispatch<React.SetStateAction<Record<string, NotePosition>>>;
}

function roundRotation(value: number) {
  return Math.round(value * 10) / 10;
}

export function useLayoutEditor({
  enabled,
  positions,
  setPositions,
}: UseLayoutEditorOptions) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const dragRef = useRef<{
    id: string;
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const rotateRef = useRef<{
    id: string;
    centerX: number;
    centerY: number;
    startAngle: number;
    startPointerAngle: number;
  } | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      if (dragRef.current) {
        const { id, startClientX, startClientY, startX, startY } = dragRef.current;
        const dx = event.clientX - startClientX;
        const dy = event.clientY - startClientY;

        setPositions((current) => ({
          ...current,
          [id]: {
            ...current[id],
            x: Math.round(startX + dx),
            y: Math.round(startY + dy),
          },
        }));
      }

      if (rotateRef.current) {
        const { id, centerX, centerY, startAngle, startPointerAngle } =
          rotateRef.current;
        const angle =
          (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) /
          Math.PI;
        const delta = angle - startPointerAngle;

        setPositions((current) => ({
          ...current,
          [id]: {
            ...current[id],
            r: roundRotation(startAngle + delta),
          },
        }));
      }
    };

    const handleUp = () => {
      dragRef.current = null;
      rotateRef.current = null;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [enabled, setPositions]);

  const onNotePointerDown = (
    event: React.PointerEvent<HTMLElement>,
    id: string
  ) => {
    if (!enabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setSelectedId(id);

    const target = event.target as HTMLElement;
    if (target.closest("[data-rotate-handle]")) {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      rotateRef.current = {
        id,
        centerX,
        centerY,
        startAngle: positions[id]?.r ?? 0,
        startPointerAngle:
          (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) /
          Math.PI,
      };
      return;
    }

    dragRef.current = {
      id,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: positions[id]?.x ?? 0,
      startY: positions[id]?.y ?? 0,
    };
  };

  const copyLayout = async () => {
    const sorted = Object.values(positions).sort((a, b) =>
      a.id.localeCompare(b.id, undefined, { numeric: true })
    );
    const output = [
      `// NOTE_POSITIONS generated ${new Date().toLocaleString()}`,
      "export const NOTE_POSITIONS = [",
      ...sorted.map(
        (item) =>
          `  { id: "${item.id}", x: ${Math.round(item.x)}, y: ${Math.round(item.y)}, r: ${roundRotation(item.r)} },`
      ),
      "] as const;",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(output);
      setStatus("布局数据已复制到剪贴板");
    } catch {
      setStatus("复制失败，请检查浏览器剪贴板权限");
    }
  };

  return {
    selectedId,
    status,
    resetEditor: () => {
      dragRef.current = null;
      rotateRef.current = null;
      setSelectedId(null);
      setStatus("");
    },
    setSelectedId,
    onNotePointerDown,
    copyLayout,
  };
}
