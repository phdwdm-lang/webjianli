"use client";

import AboutModuleTitle from "./AboutModuleTitle";
import BentoCardShell from "./BentoCardShell";
import { ABOUT_COPY, ABOUT_MODULE_ICONS } from "@/constants/about";

export default function MbtiCard() {
  const Icon = ABOUT_MODULE_ICONS.mbti;

  return (
    <BentoCardShell className="min-h-[180px] overflow-hidden">
      <div className="flex h-full flex-col items-start justify-start overflow-hidden">
        <AboutModuleTitle icon={Icon} label={ABOUT_COPY.mbtiLabel} className="w-full" />

        <div className="mt-2 flex w-full flex-1 flex-col items-center justify-center text-center">
          <p className="font-mono text-5xl font-black text-[var(--theme-pardon)] transition-transform duration-500 group-hover:scale-110">
            {ABOUT_COPY.mbti}
          </p>
          <div className="mt-2 text-center text-xs text-[var(--muted)]">
            {ABOUT_COPY.mbtiDescriptionTop}
            <br />
            {ABOUT_COPY.mbtiDescriptionBottom}
          </div>
        </div>
      </div>
    </BentoCardShell>
  );
}
