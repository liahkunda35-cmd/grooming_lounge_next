/** Reference inspiration images — style guides, not displayed full-screen on the public site. */
export const THEME_REFERENCE_IMAGES: Record<string, string> = {
  christmas: "/theme-references/christmas.jpg",
  valentines: "/theme-references/valentines.jpg",
  "independence-day": "/theme-references/independence-day.jpg",
  "fathers-day": "/theme-references/fathers-day.jpg",
  easter: "/theme-references/easter.jpg",
  "black-friday": "/theme-references/black-friday.jpg",
};

export function getThemeReferenceImage(themeKey: string): string | null {
  return THEME_REFERENCE_IMAGES[themeKey] ?? null;
}
