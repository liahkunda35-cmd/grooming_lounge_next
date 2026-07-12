import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "./prisma";

export type ThemeConfig = {
  snowEffect?: boolean;
  sparkleEffect?: boolean;
  heartsEffect?: boolean;
  confettiEffect?: boolean;
  flagsEffect?: boolean;
  decoIcons?: string[];
  announcement?: string;
  accentColor?: string;
  heroOverlay?: string;
  bodyClass?: string;
};

export function parseThemeConfig(raw: string): ThemeConfig {
  try {
    return JSON.parse(raw) as ThemeConfig;
  } catch {
    return {};
  }
}

function isWithinSchedule(
  startsAt: Date | null,
  endsAt: Date | null,
  now: Date
) {
  const afterStart = !startsAt || startsAt <= now;
  const beforeEnd = !endsAt || endsAt >= now;
  return afterStart && beforeEnd;
}

function withParsedConfig<T extends { config: string }>(theme: T) {
  return {
    ...theme,
    config: parseThemeConfig(theme.config),
  };
}

export async function getThemeByKey(key: string) {
  noStore();
  const theme = await prisma.seasonalTheme.findUnique({ where: { key } });
  if (!theme) return null;
  return withParsedConfig(theme);
}

/** Theme currently shown on the public site (manual activation wins over schedule). */
export async function getActiveTheme() {
  noStore();
  try {
    const now = new Date();

    const manuallyActive = await prisma.seasonalTheme.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });

    if (manuallyActive) {
      return withParsedConfig(manuallyActive);
    }

    const scheduled = await prisma.seasonalTheme.findMany({
      where: {
        key: { not: "default" },
        OR: [{ startsAt: { not: null } }, { endsAt: { not: null } }],
      },
      orderBy: { updatedAt: "desc" },
    });

    for (const theme of scheduled) {
      if (isWithinSchedule(theme.startsAt, theme.endsAt, now)) {
        return withParsedConfig(theme);
      }
    }

    const fallback = await prisma.seasonalTheme.findFirst({
      where: { key: "default" },
    });

    if (!fallback) return null;
    return withParsedConfig(fallback);
  } catch (error) {
    console.error("getActiveTheme failed:", error);
    return null;
  }
}
