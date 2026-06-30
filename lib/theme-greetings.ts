import type { ThemeConfig } from "@/lib/themes";

export type ThemeGreetingDisplay = {
  title: string;
  subtitle?: string;
  structured: boolean;
};

const THEME_DEFAULT_GREETINGS: Record<string, ThemeGreetingDisplay> = {
  easter: {
    title: "Happy Easter",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  christmas: {
    title: "Season's Greetings",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  valentines: {
    title: "Happy Valentine's Day",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  "new-year": {
    title: "Happy New Year",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  "independence-day": {
    title: "Happy Independence Day",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  "mothers-day": {
    title: "Happy Mother's Day",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  "fathers-day": {
    title: "Happy Father's Day",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
  "black-friday": {
    title: "Black Friday Specials",
    subtitle: "From Grooming Lounge",
    structured: true,
  },
};

export function getThemeGreeting(
  themeKey: string,
  config?: ThemeConfig
): ThemeGreetingDisplay | null {
  if (themeKey === "default") return null;

  const preset = THEME_DEFAULT_GREETINGS[themeKey];
  if (preset) return preset;

  if (config?.announcement?.trim()) {
    return {
      title: config.announcement.trim(),
      structured: false,
    };
  }

  return null;
}
