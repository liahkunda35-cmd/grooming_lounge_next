import type { ThemeConfig } from "./themes";

export type ThemeEffect =
  | "snow"
  | "sparkle"
  | "hearts"
  | "confetti"
  | "flags"
  | "fireworks"
  | "petals"
  | "leaves"
  | "lights"
  | "sale";

export type ThemeFloater = {
  icon: string;
  slot: number;
};

export type ThemePreset = {
  slug: string;
  bodyClass: string;
  accentColor: string;
  accentLight: string;
  bannerGradient: string;
  effects: ThemeEffect[];
  floaters: ThemeFloater[];
};

const PRESETS: Record<string, ThemePreset> = {
  default: {
    slug: "default",
    bodyClass: "theme-default",
    accentColor: "#b8860b",
    accentLight: "#d4a82a",
    bannerGradient: "linear-gradient(90deg, #7b5e57, #b8860b)",
    effects: [],
    floaters: [],
  },
  christmas: {
    slug: "christmas",
    bodyClass: "theme-christmas",
    accentColor: "#c41e3a",
    accentLight: "#e53935",
    bannerGradient: "linear-gradient(90deg, #1a472a 0%, #c41e3a 45%, #d4af37 100%)",
    effects: ["lights", "snow"],
    floaters: [],
  },
  "new-year": {
    slug: "new-year",
    bodyClass: "theme-new-year",
    accentColor: "#d4af37",
    accentLight: "#f5e6a8",
    bannerGradient: "linear-gradient(90deg, #1a1a2e 0%, #d4af37 50%, #c0c0c0 100%)",
    effects: ["fireworks", "sparkle", "confetti"],
    floaters: [],
  },
  easter: {
    slug: "easter",
    bodyClass: "theme-easter",
    accentColor: "#9b8ec4",
    accentLight: "#c5b9e8",
    bannerGradient: "linear-gradient(90deg, #b8e0d2 0%, #9b8ec4 50%, #ffd6e7 100%)",
    effects: ["petals", "sparkle"],
    floaters: [],
  },
  valentines: {
    slug: "valentines",
    bodyClass: "theme-valentines",
    accentColor: "#c2185b",
    accentLight: "#f48fb1",
    bannerGradient: "linear-gradient(90deg, #880e4f 0%, #c2185b 50%, #f8bbd0 100%)",
    effects: ["hearts", "petals"],
    floaters: [],
  },
  "independence-day": {
    slug: "independence-day",
    bodyClass: "theme-independence",
    accentColor: "#198A00",
    accentLight: "#EF7D00",
    bannerGradient: "linear-gradient(90deg, #198A00 0%, #EF7D00 35%, #DE2010 70%, #000000 100%)",
    effects: ["flags", "confetti"],
    floaters: [],
  },
  "black-friday": {
    slug: "black-friday",
    bodyClass: "theme-black-friday",
    accentColor: "#1a1a1a",
    accentLight: "#ffd700",
    bannerGradient: "linear-gradient(90deg, #0d0d0d 0%, #1a1a1a 40%, #ffd700 100%)",
    effects: ["sale", "confetti"],
    floaters: [],
  },
  "mothers-day": {
    slug: "mothers-day",
    bodyClass: "theme-mothers-day",
    accentColor: "#d81b60",
    accentLight: "#f8bbd0",
    bannerGradient: "linear-gradient(90deg, #880e4f 0%, #d81b60 50%, #fce4ec 100%)",
    effects: ["petals", "hearts"],
    floaters: [],
  },
  "fathers-day": {
    slug: "fathers-day",
    bodyClass: "theme-fathers-day",
    accentColor: "#1565c0",
    accentLight: "#90caf9",
    bannerGradient: "linear-gradient(90deg, #0d47a1 0%, #1565c0 50%, #bbdefb 100%)",
    effects: ["sparkle", "confetti"],
    floaters: [],
  },
};

export function getThemePreset(themeKey: string, config?: ThemeConfig): ThemePreset {
  if (PRESETS[themeKey]) return PRESETS[themeKey];

  const icons = config?.decoIcons?.filter(Boolean) ?? [];
  return {
    slug: themeKey,
    bodyClass: config?.bodyClass ?? `theme-${themeKey}`,
    accentColor: config?.accentColor ?? "#b8860b",
    accentLight: config?.accentColor ?? "#d4a82a",
    bannerGradient: `linear-gradient(90deg, ${config?.accentColor ?? "#7b5e57"}, ${config?.accentColor ?? "#b8860b"})`,
    effects: [
      config?.snowEffect && "snow",
      config?.sparkleEffect && "sparkle",
      config?.heartsEffect && "hearts",
      config?.confettiEffect && "confetti",
      config?.flagsEffect && "flags",
    ].filter(Boolean) as ThemeEffect[],
    floaters: icons.map((icon, index) => ({ icon, slot: (index % 8) + 1 })),
  };
}

export function getThemeSlug(themeKey: string): string {
  return PRESETS[themeKey]?.slug ?? themeKey;
}
