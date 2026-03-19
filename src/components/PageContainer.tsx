import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { CSS_VARS } from "@/constants/theme";
import ParticleTrail from "@/components/ParticleTrail";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  themeColor?: string;
  contentClassName?: string;
  pageClassName?: string;
  pageStyle?: CSSProperties;
  hideHeader?: boolean;
}

export default function PageContainer({
  children,
  title,
  subtitle,
  themeColor,
  contentClassName,
  pageClassName,
  pageStyle,
  hideHeader,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen bg-[var(--background)] section-page",
        pageClassName
      )}
      style={
        {
          "--section-color": themeColor ?? CSS_VARS.themePardon,
          ...pageStyle,
        } as CSSProperties
      }
    >
      <ParticleTrail />
      <div
        className={cn(
          "relative z-10 max-w-3xl mx-auto px-6 py-12 pb-24 md:pb-12",
          contentClassName
        )}
      >
        {!hideHeader && (
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-[var(--muted)] text-base">{subtitle}</p>
            )}
          </header>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}
