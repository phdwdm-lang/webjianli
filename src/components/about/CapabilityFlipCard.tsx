"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CapabilityFlipCardProps {
  title: string;
  backTitle: string;
  items: readonly string[];
  icon: LucideIcon;
  delay?: number;
}

export default function CapabilityFlipCard({
  title,
  backTitle,
  items,
  icon: Icon,
  delay = 0,
}: CapabilityFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setSupportsHover(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const toggle = () => {
    setIsFlipped((current) => !current);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsFlipped((current) => !current);
    }
  };

  return (
    <button
      type="button"
      className="bento-flip-card group h-full min-h-[160px] w-full bg-transparent text-left motion-reduce:transform-none"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={supportsHover ? () => setIsFlipped(true) : undefined}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      aria-pressed={isFlipped}
      aria-label={`${title}, view capability details`}
    >
      <div
        className={cn("bento-flip-card-inner relative block h-full w-full", isFlipped && "is-flipped")}
      >
        <div className="bento-flip-card-face bento-flip-card-front flex h-full w-full flex-col items-center justify-center rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Icon className="mb-3 h-8 w-8 text-[var(--theme-pardon)]" aria-hidden="true" />
          <div className="text-[1.1rem] font-bold text-[var(--foreground)]">{title}</div>
        </div>

        <div
          className="bento-flip-card-face bento-flip-card-back flex h-full w-full flex-col items-start rounded-3xl border border-[var(--theme-pardon)] bg-[linear-gradient(135deg,var(--card-bg)_0%,rgba(255,184,0,0.05)_100%)] p-4"
        >
          <div className="mb-2 flex w-full items-center gap-2 border-b border-[var(--card-border)] pb-2 text-sm font-bold text-[var(--foreground)]">
            <Icon className="h-4 w-4 text-[var(--theme-pardon)]" aria-hidden="true" />
            {backTitle}
          </div>
          <div className="flex-1 text-[13px] leading-[1.55] tracking-normal text-[var(--muted)]">
            <ul className="list-disc space-y-1 pl-4">
              {items.map((item) => (
                <li
                  key={item}
                  className="block overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </button>
  );
}
