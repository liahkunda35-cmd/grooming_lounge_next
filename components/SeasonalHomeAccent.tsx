"use client";

import { usePathname } from "next/navigation";
import { useSeasonalTheme } from "@/components/SeasonalThemeProvider";
import EasterThemeLayer from "@/components/seasonal/EasterThemeLayer";

export default function SeasonalHomeAccent() {
  const pathname = usePathname();
  const { theme } = useSeasonalTheme();

  if (pathname !== "/" || theme?.key !== "easter") return null;

  return <EasterThemeLayer variant="site" />;
}
