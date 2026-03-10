import type { CSSProperties } from "react";
import { CSS_VARS } from "@/constants/theme";
import { SideNav } from "./SideNav";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  themeColor?: string;
}

export default function PageContainer({
  children,
  title,
  subtitle,
  themeColor,
}: PageContainerProps) {
  return (
    <div
      className="min-h-screen bg-[var(--background)] section-page"
      style={
        { "--section-color": themeColor ?? CSS_VARS.themePardon } as CSSProperties
      }
    >
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <SideNav />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 pb-24 md:pb-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-[var(--muted)] text-base">{subtitle}</p>
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
