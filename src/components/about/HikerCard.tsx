"use client";

import { ABOUT_COPY, ABOUT_DECOR_ICONS } from "@/constants/about";
import BentoCardShell from "./BentoCardShell";

export default function HikerCard() {
  const FrontIcon = ABOUT_DECOR_ICONS.hikerFront;
  const BackIcon = ABOUT_DECOR_ICONS.hikerBack;

  return (
    <BentoCardShell
      className="h-full min-h-[220px] overflow-hidden bg-[linear-gradient(180deg,var(--card-bg)_0%,rgba(255,184,0,0.05)_100%)]"
    >
      <div className="relative flex h-full min-h-[220px] items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[0.8] group-hover:opacity-0">
          <div className="mb-4 rounded-2xl bg-[var(--card-border)] p-3 text-[var(--foreground)] transition-colors group-hover:bg-[var(--theme-pardon)] group-hover:text-white">
            <FrontIcon className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="mb-1 whitespace-nowrap text-xl font-black tracking-wide text-[var(--foreground)]">
            {ABOUT_COPY.hikerFrontTitle}
          </p>
          <p className="whitespace-nowrap text-xl font-black tracking-wide text-[var(--theme-pardon)]">
            {ABOUT_COPY.hikerFrontAccent}
          </p>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-[1.2] group-hover:scale-100 group-hover:opacity-100">
          <div className="mb-4 rounded-full bg-[var(--theme-pardon)] p-4 text-white shadow-[0_0_24px_color-mix(in_oklab,var(--theme-pardon)_40%,transparent)]">
            <BackIcon className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="whitespace-nowrap text-2xl font-black tracking-widest text-[var(--theme-pardon)]">
            {ABOUT_COPY.hikerBackTitle}
          </p>
        </div>
      </div>
    </BentoCardShell>
  );
}
