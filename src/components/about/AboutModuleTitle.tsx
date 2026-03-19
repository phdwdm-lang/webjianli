import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutModuleTitleProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

export default function AboutModuleTitle({
  icon: Icon,
  label,
  className,
}: AboutModuleTitleProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-serif-sc text-[15px] font-bold tracking-wide text-[var(--foreground)]",
        className
      )}
    >
      <div className="flex items-center justify-center rounded-full bg-[rgba(255,184,0,0.12)] p-1.5 text-[var(--theme-pardon)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      {label}
    </div>
  );
}
