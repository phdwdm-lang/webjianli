"use client";

import type { LucideIcon } from "lucide-react";
import AboutModuleTitle from "./AboutModuleTitle";
import BentoCardShell from "./BentoCardShell";
import { ABOUT_COPY, ABOUT_HOBBY_ROWS, ABOUT_MODULE_ICONS } from "@/constants/about";

interface HobbyPillProps {
  label: string;
  Icon: LucideIcon;
  hidden?: boolean;
}

function HobbyPill({ label, Icon, hidden }: HobbyPillProps) {
  return (
    <span
      aria-hidden={hidden ? "true" : undefined}
      className="group/hobby-pill inline-flex transform-gpu cursor-default items-center gap-2 rounded-[30px] border border-transparent bg-[color-mix(in_oklab,var(--card-bg)_88%,var(--background))] px-5 py-2.5 text-[0.95rem] font-medium text-[var(--foreground)] shadow-[0_2px_8px_color-mix(in_oklab,var(--shadow-ink)_6%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[var(--theme-pardon)] hover:text-[var(--theme-pardon)] hover:shadow-[0_5px_15px_rgba(255,184,0,0.15)]"
    >
      <Icon
        className="h-4 w-4 text-[var(--foreground)] transition-all duration-300 group-hover/hobby-pill:rotate-[15deg] group-hover/hobby-pill:scale-110 group-hover/hobby-pill:text-[var(--theme-pardon)]"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function HobbiesRow({
  items,
  reverse,
}: {
  items: readonly { label: string; icon: LucideIcon }[];
  reverse?: boolean;
}) {
  const repeated = Array.from({ length: 4 }, () => items).flat();

  return (
    <div className="bento-scroll-mask -mx-2 w-[calc(100%+1rem)] overflow-hidden py-2">
      <div
        className={`flex w-max transform-gpu gap-[0.85rem] pr-[0.85rem] ${reverse ? "animate-scroll-right" : "animate-scroll-left"} hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:animate-none`}
        style={{
          willChange: "transform",
          animationDelay: reverse ? "-13s" : "-6.5s",
        }}
      >
        {repeated.map((item, index) => (
          <HobbyPill
            key={`${item.label}-${index}`}
            label={item.label}
            Icon={item.icon}
            hidden={index >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

export default function HobbiesCard() {
  const Icon = ABOUT_MODULE_ICONS.hobbies;

  return (
    <BentoCardShell className="flex min-h-[220px] flex-col justify-center overflow-hidden bg-[color-mix(in_oklab,var(--card-bg)_92%,var(--background))] px-0 py-6">
      <AboutModuleTitle icon={Icon} label={ABOUT_COPY.hobbiesLabel} className="mb-4 px-6" />

      <div className="flex flex-col gap-3 motion-reduce:gap-4">
        <HobbiesRow items={ABOUT_HOBBY_ROWS[0]} />
        <HobbiesRow items={ABOUT_HOBBY_ROWS[1]} reverse />
      </div>
    </BentoCardShell>
  );
}
