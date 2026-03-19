"use client";

import { startTransition, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { StickyNote } from "@/app/thoughts/components/StickyNote";
import { LetterModal } from "@/app/thoughts/components/LetterModal";
import { ImageLightbox } from "@/app/thoughts/components/ImageLightbox";
import { useCanvasDrag } from "@/app/thoughts/hooks/useCanvasDrag";
import { useLayoutEditor } from "@/app/thoughts/hooks/useLayoutEditor";
import type { NotePosition } from "@/app/thoughts/types";
import {
  NOTE_POSITIONS,
  NOTE_STYLE_MAP,
  THOUGHT_NOTES,
  THOUGHTS_CANVAS_SIZE,
} from "@/constants/thoughts";

function buildPositionsMap() {
  return NOTE_POSITIONS.reduce<Record<string, NotePosition>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

function getInitialCanvasOffset() {
  const centeredX = -(THOUGHTS_CANVAS_SIZE.width - window.innerWidth) / 2;
  const centeredY = -(THOUGHTS_CANVAS_SIZE.height - window.innerHeight) / 2;

  return {
    x: centeredX + (window.innerWidth >= 768 ? 220 : 40),
    y: centeredY + (window.innerHeight >= 768 ? 40 : -60),
  };
}

export function ThoughtsCanvas() {
  const { resolvedTheme } = useTheme();
  const [positions, setPositions] = useState<Record<string, NotePosition>>(
    () => buildPositionsMap()
  );
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeImageNoteId, setActiveImageNoteId] = useState<string | null>(
    null
  );
  const editMode = false;

  const notesById = useMemo(
    () =>
      THOUGHT_NOTES.reduce<Record<string, (typeof THOUGHT_NOTES)[number]>>(
        (acc, note) => {
          acc[note.id] = note;
          return acc;
        },
        {}
      ),
    []
  );
  const imageNotes = useMemo(
    () => THOUGHT_NOTES.filter((note) => note.imageOnly && note.image),
    []
  );

  const activeNote = activeNoteId ? notesById[activeNoteId] : null;
  const activeNoteStyle = activeNoteId ? NOTE_STYLE_MAP[activeNoteId] : null;
  const activeImageNote = activeImageNoteId ? notesById[activeImageNoteId] : null;
  const activeImageIndex = activeImageNoteId
    ? imageNotes.findIndex((note) => note.id === activeImageNoteId)
    : -1;
  const isDark = resolvedTheme === "dark";

  const {
    offset,
    isDragging,
    onViewportPointerDown,
    onViewportPointerMove,
    onViewportPointerUp,
    onViewportPointerCancel,
  } = useCanvasDrag({
    canvasWidth: THOUGHTS_CANVAS_SIZE.width,
    canvasHeight: THOUGHTS_CANVAS_SIZE.height,
    overscroll: THOUGHTS_CANVAS_SIZE.overscroll,
    initialOffset: getInitialCanvasOffset,
  });

  const { selectedId, setSelectedId, onNotePointerDown } = useLayoutEditor({
    enabled: editMode,
    positions,
    setPositions,
  });

  return (
    <div
      className="relative min-h-screen overflow-hidden text-[#2c3330]"
      style={{
        backgroundColor: isDark ? "var(--background)" : "#f4f3ef",
      }}
    >
      <div
        data-mode={isDark ? "dark" : "light"}
        className="pointer-events-none absolute inset-0 thoughts-grid opacity-80"
      />

      <div
        className={`relative h-screen w-full overflow-hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onViewportPointerDown}
        onPointerMove={onViewportPointerMove}
        onPointerUp={onViewportPointerUp}
        onPointerCancel={onViewportPointerCancel}
      >
        <div
          className="thoughts-canvas-surface absolute left-0 top-0"
          style={{
            width: THOUGHTS_CANVAS_SIZE.width,
            height: THOUGHTS_CANVAS_SIZE.height,
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          }}
        >
          {THOUGHT_NOTES.map((note) => {
            const noteStyle = NOTE_STYLE_MAP[note.id];
            const position = positions[note.id];

            if (!noteStyle || !position) {
              return null;
            }

            return (
              <StickyNote
                key={note.id}
                note={note}
                noteStyle={noteStyle}
                position={position}
                isEditing={editMode}
                isSelected={selectedId === note.id}
                onPointerDown={onNotePointerDown}
                onClick={() => {
                  if (editMode) {
                    setSelectedId(note.id);
                    return;
                  }

                  startTransition(() => {
                    if (note.imageOnly && note.image) {
                      setActiveImageNoteId(note.id);
                      return;
                    }

                    setActiveNoteId(note.id);
                  });
                }}
              />
            );
          })}
        </div>
      </div>

      <LetterModal
        note={activeNote}
        noteStyle={activeNoteStyle}
        onClose={() => setActiveNoteId(null)}
      />

      <ImageLightbox
        note={activeImageNote}
        canNavigate={imageNotes.length > 1 && activeImageIndex >= 0}
        onPrevious={() => {
          if (activeImageIndex < 0) {
            return;
          }

          const previousIndex =
            (activeImageIndex - 1 + imageNotes.length) % imageNotes.length;
          setActiveImageNoteId(imageNotes[previousIndex]?.id ?? null);
        }}
        onNext={() => {
          if (activeImageIndex < 0) {
            return;
          }

          const nextIndex = (activeImageIndex + 1) % imageNotes.length;
          setActiveImageNoteId(imageNotes[nextIndex]?.id ?? null);
        }}
        onClose={() => setActiveImageNoteId(null)}
      />
    </div>
  );
}
