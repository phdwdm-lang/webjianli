"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ThoughtNote } from "@/app/thoughts/types";

interface ImageLightboxProps {
  note: ThoughtNote | null;
  canNavigate?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose: () => void;
}

export function ImageLightbox({
  note,
  canNavigate = false,
  onPrevious,
  onNext,
  onClose,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!note) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        onPrevious?.();
        return;
      }

      if (event.key === "ArrowRight") {
        onNext?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [note, onClose, onPrevious, onNext]);

  if (!note?.image) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:bg-black/55 md:right-6 md:top-6"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="关闭图片预览"
      >
        <X size={18} />
      </button>

      {canNavigate ? (
        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:bg-black/55 md:left-6 md:h-14 md:w-14"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious?.();
          }}
          aria-label="查看上一张图片"
        >
          <ChevronLeft size={22} />
        </button>
      ) : null}

      {canNavigate ? (
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:bg-black/55 md:right-6 md:h-14 md:w-14"
          onClick={(event) => {
            event.stopPropagation();
            onNext?.();
          }}
          aria-label="查看下一张图片"
        >
          <ChevronRight size={22} />
        </button>
      ) : null}

      <figure
        className="relative max-h-[92vh] max-w-[92vw]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={note.image}
          alt={note.imageCaption ?? note.title}
          width={note.imageWidth ?? 1200}
          height={note.imageHeight ?? 900}
          className="max-h-[88vh] w-auto max-w-[92vw] rounded-sm object-contain shadow-2xl"
          priority={false}
        />
        {note.imageCaption ? (
          <figcaption className="pt-4 text-center text-sm text-white/75">
            {note.imageCaption}
          </figcaption>
        ) : null}

        {canNavigate ? (
          <p className="pt-2 text-center text-xs tracking-[0.18em] text-white/45">
            ← / → 切换图片
          </p>
        ) : null}
      </figure>
    </div>
  );
}
