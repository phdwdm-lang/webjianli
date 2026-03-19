"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { NoteStyleMapItem, ThoughtNote } from "@/app/thoughts/types";

interface LetterModalProps {
  note: ThoughtNote | null;
  noteStyle?: NoteStyleMapItem | null;
  onClose: () => void;
}

export function LetterModal({
  note,
  noteStyle,
  onClose,
}: LetterModalProps) {
  useEffect(() => {
    if (!note) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [note, onClose]);

  if (!note) {
    return null;
  }

  const modalBgColor = noteStyle?.backgroundColor ?? note.bgColor;
  const modalAccentColor = noteStyle?.accentColor ?? note.accentColor;

  const paragraphs = note.thought
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md md:p-6"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="thoughts-modal-panel relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-black/5 bg-[var(--card-bg)] p-6 shadow-2xl md:p-10"
        style={{
          backgroundColor: modalBgColor,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`thought-letter-title-${note.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/70 text-gray-600 transition hover:bg-white md:right-4 md:top-4"
          onClick={onClose}
          aria-label="关闭详情"
        >
          <X size={18} />
        </button>

        <div
          className="mb-8 h-px w-10"
          style={{ backgroundColor: `${modalAccentColor}66` }}
        />

        <div className="mb-6 flex flex-wrap items-center gap-3 pr-12">
          <span
            className="font-ui rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
            style={{
              color: modalAccentColor,
              backgroundColor: `${modalAccentColor}12`,
            }}
          >
            {note.source}
          </span>
          {note.date ? (
            <span className="font-ui text-[10px] uppercase tracking-[0.24em] text-gray-400">
              {note.date}
            </span>
          ) : null}
        </div>

        <h2
          id={`thought-letter-title-${note.id}`}
          className="font-xiaowei mb-8 text-[22px] leading-[1.9] text-gray-800 md:text-[24px]"
        >
          {note.title}
        </h2>

        <div
          className="border-l-2 py-2 pl-6"
          style={{ borderLeftColor: `${modalAccentColor}33` }}
        >
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-5 text-[15px] leading-[2.15] text-gray-700 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p className="font-caveat mt-8 text-right text-lg text-gray-400">
          — 我的想法
        </p>

        {note.image ? (
          <figure className="mt-8 rounded-[2px] border border-black/5 bg-white p-3 shadow-lg md:p-4">
            <Image
              src={note.image}
              alt={note.imageCaption ?? note.title}
              width={note.imageWidth ?? 1200}
              height={note.imageHeight ?? 900}
              className="h-auto w-full rounded-[2px]"
            />
            {note.imageCaption ? (
              <figcaption className="font-caveat pt-3 text-center text-base text-gray-500">
                {note.imageCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </section>
    </div>
  );
}
