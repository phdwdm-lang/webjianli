"use client";

import { QrCode } from "lucide-react";
import AboutModuleTitle from "./AboutModuleTitle";
import BentoCardShell from "./BentoCardShell";
import { ABOUT_COPY, ABOUT_MODULE_ICONS } from "@/constants/about";
import { PROFILE } from "@/constants/profile";

export default function ProfileCard() {
  const Icon = ABOUT_MODULE_ICONS.motto;

  return (
    <BentoCardShell
      className="flex min-h-[340px] flex-col justify-center gap-8 px-8 py-10 md:px-8 md:py-10"
      glow="radial-gradient(circle at 70% 30%, rgba(255,184,0,0.05) 0%, transparent 60%)"
    >
      <a
        href={ABOUT_COPY.resumeHref}
        target="_blank"
        rel="noreferrer"
        aria-label={ABOUT_COPY.resumeLabel}
        title={ABOUT_COPY.resumeLabel}
        className="group absolute right-6 top-6 z-10 inline-flex items-center justify-center rounded-full border border-[var(--theme-pardon)] bg-[var(--theme-pardon)] p-2.5 text-white shadow-[0_4px_10px_rgba(255,184,0,0.28),inset_0_-1px_0_rgba(0,0,0,0.12)] transition-all duration-200 hover:translate-y-px hover:brightness-95 hover:shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.26)] md:p-3"
      >
        <QrCode className="h-5 w-5 transition-transform group-hover:scale-95" aria-hidden="true" />
      </a>

      <div className="mt-2 flex w-full flex-col gap-1 pr-14">
        <AboutModuleTitle icon={Icon} label={ABOUT_COPY.mottoLabel} className="mb-2" />
        <h2 className="text-3xl font-bold leading-tight text-[var(--foreground)] font-serif-sc">
          {ABOUT_COPY.motto}
        </h2>
      </div>

      <div className="mt-auto w-full">
        <div className="mb-3">
          <h1 className="inline-flex items-baseline gap-2 whitespace-nowrap text-5xl font-black tracking-tight text-[var(--foreground)] sm:text-6xl md:text-[4rem]">
            <span>{PROFILE.name}</span>
            <span className="text-[var(--theme-pardon)]">{ABOUT_COPY.englishName}</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {ABOUT_COPY.heroTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[var(--card-border)] bg-[rgba(255,184,0,0.08)] px-4 py-1.5 text-base font-bold text-[var(--muted)] sm:text-[1.125rem]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </BentoCardShell>
  );
}
