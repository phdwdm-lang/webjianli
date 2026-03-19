export const SEMANTIC_TOKENS = {
  light: {
    "--background": "#ffffff",
    "--foreground": "#0f172a",
    "--card-bg": "#ffffff",
    "--card-border": "#e2e8f0",
    "--accent": "#0f172a",
    "--muted": "#64748b",
    "--muted-light": "#94a3b8",
    "--tag-bg": "#f1f5f9",
    "--timeline-line": "#e2e8f0",
    "--selection-text": "#ffffff",
    "--shadow-ink": "#0f172a",
    "--nav-home": "#0f172a",
  },
  dark: {
    "--background": "#020817",
    "--foreground": "#f8fafc",
    "--card-bg": "#0f172a",
    "--card-border": "#1e293b",
    "--accent": "#f8fafc",
    "--muted": "#94a3b8",
    "--muted-light": "#64748b",
    "--tag-bg": "#1e293b",
    "--timeline-line": "#1e293b",
    "--selection-text": "#ffffff",
    "--shadow-ink": "#000000",
    "--nav-home": "#1e293b",
  },
} as const;

export const ON_COLOR_TOKENS = {
  light: {
    "--on-color-text": "#ffffff",
    "--on-color-text-strong":
      "color-mix(in oklab, var(--on-color-text) 80%, transparent)",
    "--on-color-text-emphasis":
      "color-mix(in oklab, var(--on-color-text) 70%, transparent)",
    "--on-color-text-muted":
      "color-mix(in oklab, var(--on-color-text) 60%, transparent)",
    "--on-color-text-subtle":
      "color-mix(in oklab, var(--on-color-text) 50%, transparent)",
    "--on-color-text-faint":
      "color-mix(in oklab, var(--on-color-text) 40%, transparent)",
    "--on-color-text-ghost":
      "color-mix(in oklab, var(--on-color-text) 15%, transparent)",
    "--on-color-text-veil":
      "color-mix(in oklab, var(--on-color-text) 8%, transparent)",
    "--on-color-surface":
      "color-mix(in oklab, var(--on-color-text) 10%, transparent)",
    "--on-color-surface-strong":
      "color-mix(in oklab, var(--on-color-text) 15%, transparent)",
    "--on-color-surface-bright":
      "color-mix(in oklab, var(--on-color-text) 25%, transparent)",
    "--on-color-border":
      "color-mix(in oklab, var(--on-color-text) 20%, transparent)",
    "--on-color-border-strong":
      "color-mix(in oklab, var(--on-color-text) 30%, transparent)",
    "--on-color-border-emphasis":
      "color-mix(in oklab, var(--on-color-text) 35%, transparent)",
  },
  dark: {
    "--on-color-text": "#ffffff",
    "--on-color-text-strong":
      "color-mix(in oklab, var(--on-color-text) 80%, transparent)",
    "--on-color-text-emphasis":
      "color-mix(in oklab, var(--on-color-text) 70%, transparent)",
    "--on-color-text-muted":
      "color-mix(in oklab, var(--on-color-text) 60%, transparent)",
    "--on-color-text-subtle":
      "color-mix(in oklab, var(--on-color-text) 50%, transparent)",
    "--on-color-text-faint":
      "color-mix(in oklab, var(--on-color-text) 40%, transparent)",
    "--on-color-text-ghost":
      "color-mix(in oklab, var(--on-color-text) 15%, transparent)",
    "--on-color-text-veil":
      "color-mix(in oklab, var(--on-color-text) 8%, transparent)",
    "--on-color-surface":
      "color-mix(in oklab, var(--on-color-text) 10%, transparent)",
    "--on-color-surface-strong":
      "color-mix(in oklab, var(--on-color-text) 15%, transparent)",
    "--on-color-surface-bright":
      "color-mix(in oklab, var(--on-color-text) 25%, transparent)",
    "--on-color-border":
      "color-mix(in oklab, var(--on-color-text) 20%, transparent)",
    "--on-color-border-strong":
      "color-mix(in oklab, var(--on-color-text) 30%, transparent)",
    "--on-color-border-emphasis":
      "color-mix(in oklab, var(--on-color-text) 35%, transparent)",
  },
} as const;

export const SECTION_TOKENS = {
  light: {
    "--theme-pardon": "#FFB800",
    "--theme-journey": "#0EA5E9",
    "--theme-creations": "#4800ff",
    "--theme-thoughts": "#10B981",
  },
  dark: {
    "--theme-pardon": "#FFB800",
    "--theme-journey": "#0EA5E9",
    "--theme-creations": "#7C3AED",
    "--theme-thoughts": "#10B981",
  },
} as const;

export const CAPABILITY_TOKENS = {
  light: {
    "--cap-ai-product": "#4800ff",
    "--cap-user-research": "#059669",
    "--cap-vibe-coding": "#ff4596",
    "--cap-growth": "#FFB800",
  },
  dark: {
    "--cap-ai-product": "#4800ff",
    "--cap-user-research": "#059669",
    "--cap-vibe-coding": "#ff4596",
    "--cap-growth": "#FFB800",
  },
} as const;

export const CARD_TOKENS = {
  light: {
    "--card-amber-ink": "#1a0e00",
    "--card-amber-ink-soft":
      "color-mix(in oklab, var(--card-amber-ink) 90%, transparent)",
    "--card-amber-text": "#4a3500",
    "--card-amber-text-muted":
      "color-mix(in oklab, var(--card-amber-text) 60%, transparent)",
  },
  dark: {
    "--card-amber-ink": "#000000",
    "--card-amber-ink-soft": "#1a1a1a",
    "--card-amber-text": "#1a1200",
    "--card-amber-text-muted": "#3d2f00",
  },
} as const;

export const THEME_TOKENS = {
  light: {
    ...SEMANTIC_TOKENS.light,
    ...SECTION_TOKENS.light,
    ...CAPABILITY_TOKENS.light,
    ...CARD_TOKENS.light,
    ...ON_COLOR_TOKENS.light,
  },
  dark: {
    ...SEMANTIC_TOKENS.dark,
    ...SECTION_TOKENS.dark,
    ...CAPABILITY_TOKENS.dark,
    ...CARD_TOKENS.dark,
    ...ON_COLOR_TOKENS.dark,
  },
} as const;

const THEME_SELECTORS = {
  light: ":root",
  dark: ".dark",
} as const;

const buildThemeBlock = (
  selector: string,
  tokens: Record<string, string>
) =>
  `${selector}{${Object.entries(tokens)
    .map(([token, value]) => `${token}:${value};`)
    .join("")}}`;

export const THEME_STYLE_TEXT = [
  buildThemeBlock(THEME_SELECTORS.light, THEME_TOKENS.light),
  buildThemeBlock(THEME_SELECTORS.dark, THEME_TOKENS.dark),
].join("\n");

export const CSS_VARS = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  muted: "var(--muted)",
  shadowInk: "var(--shadow-ink)",
  navHome: "var(--nav-home)",
  themePardon: "var(--theme-pardon)",
  themeJourney: "var(--theme-journey)",
  themeCreations: "var(--theme-creations)",
  themeThoughts: "var(--theme-thoughts)",
  cardAmberInk: "var(--card-amber-ink)",
  cardAmberInkSoft: "var(--card-amber-ink-soft)",
  cardAmberText: "var(--card-amber-text)",
  cardAmberTextMuted: "var(--card-amber-text-muted)",
  capabilityAiProduct: "var(--cap-ai-product)",
  capabilityUserResearch: "var(--cap-user-research)",
  capabilityVibeCoding: "var(--cap-vibe-coding)",
  capabilityGrowth: "var(--cap-growth)",
  onColorText: "var(--on-color-text)",
  onColorTextStrong: "var(--on-color-text-strong)",
  onColorTextEmphasis: "var(--on-color-text-emphasis)",
  onColorTextMuted: "var(--on-color-text-muted)",
  onColorTextSubtle: "var(--on-color-text-subtle)",
  onColorTextFaint: "var(--on-color-text-faint)",
  onColorTextGhost: "var(--on-color-text-ghost)",
  onColorTextVeil: "var(--on-color-text-veil)",
  onColorSurface: "var(--on-color-surface)",
  onColorSurfaceStrong: "var(--on-color-surface-strong)",
  onColorSurfaceBright: "var(--on-color-surface-bright)",
  onColorBorder: "var(--on-color-border)",
  onColorBorderStrong: "var(--on-color-border-strong)",
  onColorBorderEmphasis: "var(--on-color-border-emphasis)",
} as const;

export const HOME_CARD_STYLES = {
  pardonGlow:
    "radial-gradient(circle at 70% 30%, color-mix(in oklab, var(--on-color-text) 25%, transparent) 0%, transparent 60%)",
  creationsGlow:
    "radial-gradient(circle at 50% 80%, color-mix(in oklab, var(--on-color-text) 12%, transparent) 0%, transparent 50%)",
  thoughtsGlow:
    "radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--on-color-text) 20%, transparent) 0%, transparent 50%)",
  journeyGlow:
    "radial-gradient(circle at 30% 50%, color-mix(in oklab, var(--on-color-text) 15%, transparent) 0%, transparent 50%)",
  projectGrid:
    "radial-gradient(circle, var(--on-color-text-veil) 1px, transparent 1px)",
  projectGridSize: "20px 20px",
  journeyGradient:
    "linear-gradient(to right, #38BDF8 0%, #0EA5E9 25%, #0284C7 50%, #0369A1 75%, #075985 100%)",
} as const;

export const NAV_STYLES = {
  glassBackground: "color-mix(in oklab, var(--background) 55%, transparent)",
  glassBorder: "color-mix(in oklab, var(--foreground) 6%, transparent)",
  iconDefault: CSS_VARS.muted,
  tooltipText: "#ffffff",
  shadow:
    "0 8px 32px color-mix(in oklab, var(--shadow-ink) 8%, transparent), 0 2px 8px color-mix(in oklab, var(--shadow-ink) 4%, transparent), inset 0 1px 0 color-mix(in oklab, var(--on-color-text) 60%, transparent)",
  colors: {
    home: CSS_VARS.foreground,
    about: CSS_VARS.themePardon,
    projects: CSS_VARS.themeCreations,
    experience: CSS_VARS.themeJourney,
    thoughts: CSS_VARS.themeThoughts,
    themeToggle: CSS_VARS.muted,
  },
  tooltipBg: {
    home: CSS_VARS.navHome,
  },
} as const;

export const EFFECT_COLORS = {
  particleTrail: [
    "rgba(255, 184, 0, 0.35)",
    "rgba(14, 165, 233, 0.30)",
    "rgba(72, 0, 255, 0.25)",
    "rgba(16, 185, 129, 0.30)",
  ],
  oceanJourney: {
    waveGradTop: "rgba(255,255,255,0.15)",
    waveGradBottom: "rgba(255,255,255,0.05)",
    waveAltTop: "rgba(255,255,255,0.2)",
    waveAltBottom: "rgba(255,255,255,0.02)",
    connectionStroke: "rgba(255,255,255,0.35)",
    glowDot: CSS_VARS.onColorText,
    glowShadow:
      "drop-shadow(0 0 3px color-mix(in oklab, var(--on-color-text) 90%, transparent))",
    iconGlow: "color-mix(in oklab, var(--on-color-text) 20%, transparent)",
    iconBorder: "color-mix(in oklab, var(--on-color-text) 30%, transparent)",
    iconBackground: "color-mix(in oklab, var(--on-color-text) 10%, transparent)",
    iconShadow:
      "0 4px 12px color-mix(in oklab, var(--shadow-ink) 10%, transparent)",
    labelBackground:
      "color-mix(in oklab, var(--on-color-text) 15%, transparent)",
    labelBorder: "color-mix(in oklab, var(--on-color-text) 20%, transparent)",
  },
  floatingShapes: {
    warmGlow:
      "radial-gradient(circle, color-mix(in oklab, var(--on-color-text) 60%, transparent) 0%, color-mix(in oklab, var(--on-color-text) 20%, transparent) 50%, transparent 70%)",
    warmGlowSecondary:
      "radial-gradient(circle, color-mix(in oklab, var(--on-color-text) 50%, transparent) 0%, color-mix(in oklab, var(--on-color-text) 15%, transparent) 60%, transparent 80%)",
    ringGradStart: "color-mix(in oklab, var(--on-color-text) 50%, transparent)",
    ringGradMid: "color-mix(in oklab, var(--on-color-text) 15%, transparent)",
    ringGradEnd: "color-mix(in oklab, var(--on-color-text) 40%, transparent)",
    triangleStroke: "color-mix(in oklab, var(--on-color-text) 50%, transparent)",
    diamondBorder: "color-mix(in oklab, var(--on-color-text) 35%, transparent)",
    crossLine: CSS_VARS.onColorText,
    dot: CSS_VARS.onColorText,
    orbitBorder: "color-mix(in oklab, var(--on-color-text) 20%, transparent)",
  },
} as const;
