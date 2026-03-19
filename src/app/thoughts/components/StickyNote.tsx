"use client";

import Image from "next/image";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  NotePosition,
  NoteStyleMapItem,
  ThoughtNote,
} from "@/app/thoughts/types";

interface StickyNoteProps {
  note: ThoughtNote;
  noteStyle: NoteStyleMapItem;
  position: NotePosition;
  isEditing: boolean;
  isSelected: boolean;
  onClick: () => void;
  onPointerDown: (event: React.PointerEvent<HTMLElement>, id: string) => void;
}

function getPreviewText(value: string, length = 120) {
  const firstParagraph = value.split("\n\n")[0]?.trim() ?? "";
  if (firstParagraph.length <= length) {
    return firstParagraph;
  }

  return `${firstParagraph.slice(0, length).trim()}...`;
}

function getFontClass(displayFont?: NoteStyleMapItem["displayFont"]) {
  switch (displayFont) {
    case "handwriting":
      return "font-handwriting";
    case "longcang":
      return "font-longcang";
    case "xiaowei":
      return "font-xiaowei";
    case "zhimang":
      return "font-zhimang";
    default:
      return "";
  }
}

function getShadowClass(variant: NoteStyleMapItem["variant"]) {
  switch (variant) {
    case "diary-date":
      return "thoughts-photo-shadow";
    case "tape-center":
    case "tape-yellow":
    case "tape-side-date":
    case "tape-purple":
      return "thoughts-card-shadow";
    case "diary-border":
    case "diary-tape":
    case "pin-center":
    case "warm-bar":
    case "snippet":
      return "thoughts-soft-shadow";
    case "polaroid":
      return "thoughts-polaroid-shadow";
    case "corner-photo":
    case "tape-portrait-photo":
      return "thoughts-photo-shadow";
    default:
      return "thoughts-paper-shadow";
  }
}

export function StickyNote({
  note,
  noteStyle,
  position,
  isEditing,
  isSelected,
  onClick,
  onPointerDown,
}: StickyNoteProps) {
  const cardBg = noteStyle.backgroundColor ?? note.bgColor;
  const accentColor = noteStyle.accentColor ?? note.accentColor;
  const decoratorColor = noteStyle.decoratorColor ?? accentColor;
  const borderColor = noteStyle.borderColor ?? accentColor;
  const titleFontClass = getFontClass(noteStyle.displayFont);
  const preview = getPreviewText(note.thought);

  const titleClass = cn(
    "text-[#2c3330]",
    titleFontClass,
    noteStyle.titleNoWrap && "whitespace-nowrap"
  );

  const sharedCardProps = {
    className: cn(
      "thoughts-note-card relative block text-left",
      getShadowClass(noteStyle.variant),
      isSelected && "ring-2 ring-[var(--section-color)]/35 ring-offset-4",
      isEditing && "cursor-grab active:cursor-grabbing"
    ),
    "data-note-card": "true",
    "data-interactive": isEditing ? "false" : "true",
    "data-editing": isEditing ? "true" : "false",
    onPointerDown: (event: React.PointerEvent<HTMLElement>) =>
      onPointerDown(event, note.id),
    onClick,
    style: {
      width: noteStyle.width,
      backgroundColor: cardBg,
    },
  } as const;

  const renderCardBody = () => {
    switch (noteStyle.variant) {
      case "diary-border":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[1px] border-l-4 p-10"
            )}
            style={{
              ...sharedCardProps.style,
              borderLeftColor: accentColor,
            }}
          >
            <div className="mb-6 flex items-end justify-between">
              <span className="font-ui text-xs uppercase tracking-[0.32em] text-gray-400">
                Entry
              </span>
              {note.date ? (
                <span className="font-ui text-[10px] text-gray-300">
                  {note.date}
                </span>
              ) : null}
            </div>
            <p className={cn("text-[18px] leading-[2]", titleClass)}>
              {note.title}
            </p>
            <p className="mt-5 text-[14px] leading-[2] text-gray-600">
              {preview}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "diary-date":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "overflow-hidden rounded-sm p-10"
            )}
          >
            <div className="mb-6 flex items-baseline gap-4">
              <span
                className="font-ui text-3xl font-light"
                style={{ color: accentColor }}
              >
                {noteStyle.day}
              </span>
              <span className="font-ui text-[10px] uppercase tracking-[0.24em] text-gray-400">
                {noteStyle.monthYear}
              </span>
              <div className="h-px flex-1 -translate-y-1 border-b border-dashed border-gray-200" />
            </div>
            <p className="text-[18px] leading-[2] text-gray-800">{note.title}</p>
            <p className="mt-5 text-[14px] leading-[2] text-gray-600">
              {preview}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "diary-tape":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(sharedCardProps.className, "rounded-[2px] p-10")}
          >
            <div className="absolute -top-3 left-1/2 z-10 h-7 w-20 -translate-x-1/2 rounded-[2px] border border-black/5 bg-white/50 shadow-sm backdrop-blur-sm" />
            <div
              className="mb-6 mt-3 h-px w-10"
              style={{ backgroundColor: `${accentColor}40` }}
            />
            <p className="text-[18px] leading-[2] text-gray-800">{note.title}</p>
            <p className="mt-5 text-[14px] leading-[2] text-gray-600">
              {preview}
            </p>
            {note.date ? (
              <p className="font-caveat mt-6 text-right text-base text-gray-400">
                {note.date}
              </p>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "snippet":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[2px] border p-8"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor: "#E8E4D9",
            }}
          >
            <div className="mb-5 flex items-start justify-between">
              <span
                className="font-ui inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] uppercase"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}33`,
                  backgroundColor: "rgba(255,255,255,0.4)",
                }}
              >
                {noteStyle.eyebrow}
              </span>
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D4CEC1]" />
                <span className="h-2 w-2 rounded-full bg-[#D4CEC1]" />
              </span>
            </div>
            <p className={cn("text-[17px] italic leading-relaxed text-gray-700", titleClass)}>
              {note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "tape-center":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(sharedCardProps.className, "rounded-[2px] p-8")}
          >
            <Tape accentColor={accentColor} />
            <p className={cn("mt-4 text-center text-[20px] leading-[1.8] text-gray-700", titleClass)}>
              {note.title}
            </p>
            {noteStyle.hint ? (
              <p className="font-caveat mt-5 text-center text-lg text-gray-400">
                {noteStyle.hint}
              </p>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "tape-yellow":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[2px] border p-8"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor:
                note.id === "q22" ? "rgba(213, 229, 220, 1)" : "transparent",
            }}
          >
            <Tape accentColor={accentColor} />
            {noteStyle.eyebrow ? (
              <div className="mt-2 mb-4 flex justify-between">
                <span
                  className="font-ui text-[11px] opacity-70"
                  style={{ color: accentColor }}
                >
                  {noteStyle.eyebrow}
                </span>
              </div>
            ) : null}
            <p className={cn("mt-4 text-[18px] leading-[1.9] text-[#2c3330]", titleClass)}>
              {note.title}
            </p>
            {noteStyle.hint ? (
              <div className="mt-5 flex justify-end">
                <span className="font-caveat text-lg text-gray-400">
                  {noteStyle.hint}
                </span>
              </div>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "tape-side-date":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "flex rounded-[1px] border"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor: "rgba(214, 211, 209, 0.6)",
            }}
          >
            <div
              className="flex w-14 shrink-0 flex-col items-center border-r py-7"
              style={{ borderRightColor: `${accentColor}33` }}
            >
              <span className="writing-vertical font-ui text-[10px] tracking-[0.24em] text-gray-400">
                {noteStyle.sideLabel}
              </span>
            </div>
            <div className="flex-1 p-7">
              <p className={cn("text-[17px] leading-8 text-gray-800", titleClass)}>
                {note.title}
              </p>
              {noteStyle.hint ? (
                <p
                  className="font-caveat mt-5 text-lg"
                  style={{ color: accentColor }}
                >
                  {noteStyle.hint}
                </p>
              ) : null}
            </div>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "tape-purple":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[2px] border p-8"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor: `${accentColor}1f`,
            }}
          >
            <Tape accentColor={accentColor} />
            <p className={cn("mt-4 text-[18px] leading-[1.9] text-[#2c3330]", titleClass)}>
              {note.title}
            </p>
            {noteStyle.hint ? (
              <div className="mt-5 flex justify-end">
                <span className="font-caveat text-xl" style={{ color: accentColor }}>
                  {noteStyle.hint}
                </span>
              </div>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "tape-irregular":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(sharedCardProps.className, "rounded-sm p-8")}
          >
            <span className="absolute left-1/2 top-0 h-7 w-20 -translate-x-1/2 -translate-y-1/2 rotate-1 bg-white/60 shadow-sm backdrop-blur-sm [clip-path:polygon(2%_0,98%_3%,100%_98%,1%_99%)]" />
            <p className={cn("mt-4 text-[18px] leading-[1.9] text-[#2c3330]", titleClass, note.id === "q26" && "text-center text-[20px]")}>
              {note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "pin-round":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(sharedCardProps.className, "rounded-[1px] p-8")}
          >
            <span
              className="absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/3 rounded-full border border-white/60 shadow-sm"
              style={{
                backgroundColor: `${decoratorColor}66`,
              }}
            />
            <p className={cn("mt-4 text-[18px] leading-loose text-gray-700", titleClass)}>
              {note.title}
            </p>
            {noteStyle.hint ? (
              <div className="mt-5 flex justify-end">
                <span className="font-caveat text-lg text-gray-400">
                  {noteStyle.hint}
                </span>
              </div>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "pin-center":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "flex flex-col items-center rounded-[2px] p-8 text-center"
            )}
          >
            <span
              className="absolute left-1/2 top-0 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
              style={{ backgroundColor: decoratorColor }}
            >
              <span className="absolute left-1 top-1 h-2 w-2 rounded-full bg-white/50" />
            </span>
            <p className={cn("mt-4 text-[22px] leading-[1.8] text-[#2c3330]", titleClass)}>
              {note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "clip":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(sharedCardProps.className, "rounded-sm p-8")}
          >
            <span
              className="absolute -top-6 right-10 h-14 w-5 rounded-full border-2 border-b-0"
              style={{
                borderColor: decoratorColor,
                clipPath: "inset(0 0 40% 0)",
              }}
            />
            <span
              className="absolute -top-1 right-[42px] h-8 w-3 rounded-full border-2 border-t-0"
              style={{
                borderColor: decoratorColor,
                clipPath: "inset(30% 0 0 0)",
              }}
            />
            <p className={cn("mt-5 text-[18px] leading-loose text-gray-700", titleClass)}>
              {note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "badge":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[1px] border p-8"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor: note.id === "q27" ? "transparent" : "rgba(243, 244, 246, 1)",
              borderLeftWidth: note.id === "q27" ? 4 : undefined,
              borderLeftColor: note.id === "q27" ? borderColor : undefined,
            }}
          >
            <div className="mb-5 flex items-start justify-between">
              <span
                className={cn(
                  "font-ui inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-[10px] uppercase tracking-wider",
                  note.id === "q27" ? "font-bold" : ""
                )}
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}14`,
                }}
              >
                {noteStyle.eyebrow}
              </span>
              {note.id === "q27" ? null : (
                <span className="h-3 w-3 rounded-full border border-white bg-gray-300 shadow-sm" />
              )}
            </div>
            <p className={cn("text-[18px] leading-8 text-[#3a3632]", titleClass)}>
              {note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "warm-bar":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[2px] border p-8"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor: "rgba(235, 227, 213, 1)",
            }}
          >
            <div
              className="mb-5 h-1 w-12 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <p className={cn("text-[18px] leading-loose text-[#4a433a]", titleClass)}>
              {note.title}
            </p>
            {noteStyle.hint ? (
              <div className="mt-5 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </span>
                <span className="font-ui text-[9px] uppercase text-gray-400">
                  {noteStyle.hint}
                </span>
              </div>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "polaroid":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[1px] border border-gray-100 bg-white p-3 pb-12"
            )}
            style={{
              ...sharedCardProps.style,
              backgroundColor: "#FFFFFF",
            }}
          >
            {note.image ? (
              <Image
                src={note.image}
                alt={note.imageCaption ?? note.title}
                width={note.imageWidth ?? 1200}
                height={note.imageHeight ?? 900}
                className="block h-auto w-full rounded-sm"
              />
            ) : null}
            <p className="font-caveat absolute bottom-4 left-0 w-full px-4 text-center text-[15px] text-stone-500">
              {note.imageCaption ?? note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "corner-photo":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-sm bg-white p-3 pb-10"
            )}
            style={{
              ...sharedCardProps.style,
              backgroundColor: "#FFFFFF",
            }}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 border-l-2 border-t-2 border-white mix-blend-overlay" />
              <span className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r-2 border-t-2 border-white mix-blend-overlay" />
              {note.image ? (
                <Image
                  src={note.image}
                  alt={note.imageCaption ?? note.title}
                  width={note.imageWidth ?? 1200}
                  height={note.imageHeight ?? 900}
                  className="block h-auto w-full rounded-sm border border-black/5"
                />
              ) : null}
            </div>
            <p className="font-ui absolute bottom-3 right-4 text-[9px] tracking-[0.24em] text-gray-300">
              {note.imageCaption ?? "IMG"}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "tape-portrait-photo":
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "relative rounded-sm bg-white p-2 pb-12"
            )}
            style={{
              ...sharedCardProps.style,
              backgroundColor: "#FFFFFF",
            }}
          >
            <span className="absolute left-1/2 top-0 h-4 w-12 -translate-x-1/2 -translate-y-1/3 bg-[#FCFBF8]/80 shadow-sm backdrop-blur-sm [clip-path:polygon(2%_0,98%_3%,100%_98%,1%_99%)]" />
            {note.image ? (
              <Image
                src={note.image}
                alt={note.imageCaption ?? note.title}
                width={note.imageWidth ?? 1200}
                height={note.imageHeight ?? 900}
                className="block h-auto w-full rounded-sm border border-black/5"
              />
            ) : null}
            <p className="mt-4 text-center text-[11px] italic text-gray-500">
              {note.imageCaption ?? note.title}
            </p>
            {isSelected ? <RotateHandle /> : null}
          </button>
        );

      case "minimal":
      default:
        return (
          <button
            type="button"
            {...sharedCardProps}
            className={cn(
              sharedCardProps.className,
              "rounded-[2px] border p-8"
            )}
            style={{
              ...sharedCardProps.style,
              borderColor: noteStyle.borderColor ?? "rgba(226, 232, 240, 1)",
            }}
          >
            {noteStyle.eyebrow ? (
              <div className="mb-5 flex items-start justify-between">
                <span
                  className="font-ui text-[11px] opacity-70"
                  style={{ color: accentColor }}
                >
                  {noteStyle.eyebrow}
                </span>
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: `${accentColor}33` }}
                />
              </div>
            ) : (
              <div
                className="mb-5 h-0.5"
                style={{ backgroundColor: `${accentColor}33` }}
              />
            )}
            <p className={cn("text-[18px] leading-[1.9] text-[#2c3330]", titleClass)}>
              {note.title}
            </p>
            {noteStyle.hint ? (
              <p
                className={cn(
                  "font-caveat mt-5 text-right text-lg",
                  note.id === "q30" ? "" : "text-gray-400"
                )}
                style={note.id === "q30" ? { color: accentColor } : undefined}
              >
                {noteStyle.hint}
              </p>
            ) : null}
            {isSelected ? <RotateHandle /> : null}
          </button>
        );
    }
  };

  return (
    <div
      className={cn("absolute", isSelected && "z-30", !isSelected && "hover:z-20")}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          transform: `rotate(${position.r}deg)`,
          scale: 1.25,
        }}
      >
        {renderCardBody()}
      </div>
    </div>
  );
}

function Tape({ accentColor }: { accentColor: string }) {
  return (
    <span
      className="absolute left-1/2 top-0 h-[18px] w-[50px] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] border border-black/5 backdrop-blur-sm"
      style={{
        backgroundColor: `${accentColor}22`,
      }}
    />
  );
}

function RotateHandle() {
  return (
    <span
      data-rotate-handle="true"
      className="absolute left-1/2 top-0 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-[150%] items-center justify-center rounded-full border border-black/10 bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm"
      aria-hidden="true"
    >
      <RotateCw size={14} />
    </span>
  );
}
