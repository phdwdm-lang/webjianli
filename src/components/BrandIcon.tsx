import type { ComponentType } from "react";
import { Cursor, Figma, Github, Windsurf } from "@lobehub/icons";

type BrandIconName = "Cursor" | "Figma" | "Github" | "Windsurf";

const BRAND_ICONS: Record<BrandIconName, ComponentType<{
  className?: string;
  size?: number | string;
  title?: string;
}>> = {
  Cursor,
  Figma,
  Github,
  Windsurf,
};

interface BrandIconProps {
  name: BrandIconName;
  className?: string;
  size?: number | string;
  title?: string;
}

export function BrandIcon({ name, className, size = 16, title }: BrandIconProps) {
  const Icon = BRAND_ICONS[name];

  return <Icon className={className} size={size} title={title ?? name} />;
}
