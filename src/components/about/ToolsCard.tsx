"use client";

import AboutModuleTitle from "./AboutModuleTitle";
import BentoCardShell from "./BentoCardShell";
import {
  ABOUT_COPY,
  ABOUT_MODULE_ICONS,
  ABOUT_TOOL_ICONS,
  ABOUT_TOOLS,
} from "@/constants/about";

export default function ToolsCard() {
  const Icon = ABOUT_MODULE_ICONS.tools;

  return (
    <BentoCardShell className="min-h-[220px]">
      <AboutModuleTitle icon={Icon} label={ABOUT_COPY.toolsLabel} className="mb-4" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ABOUT_TOOLS.map((tool) => {
          const ToolIcon = ABOUT_TOOL_ICONS[tool] ?? ABOUT_TOOL_ICONS.Codex;

          return (
            <div
              key={tool}
              className="group flex cursor-default items-center gap-2.5 rounded-xl border border-[rgba(255,184,0,0.15)] bg-[rgba(255,184,0,0.05)] p-2 transition-colors hover:bg-[rgba(255,184,0,0.1)]"
            >
              <span className="rounded-lg bg-[rgba(255,184,0,0.15)] p-1.5 text-[var(--theme-pardon)] transition-transform group-hover:scale-110">
                <ToolIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-[var(--foreground)]">{tool}</span>
            </div>
          );
        })}
      </div>
    </BentoCardShell>
  );
}
