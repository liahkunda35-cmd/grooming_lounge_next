import type { ThemePreset } from "@/lib/theme-presets";

export const THEME_BODY_CLASSES = [
  "theme-default",
  "theme-christmas",
  "theme-new-year",
  "theme-easter",
  "theme-valentines",
  "theme-independence",
  "theme-black-friday",
  "theme-mothers-day",
  "theme-fathers-day",
] as const;

const ROOT_GOLD = "#b8860b";
const ROOT_GOLD_LIGHT = "#d4a82a";

export const THEME_UPDATED_EVENT = "grooming-lounge-theme-updated";

export function resetSeasonalDocument() {
  if (typeof document === "undefined") return;

  document.body.classList.remove(...THEME_BODY_CLASSES, "has-seasonal-greeting");
  document.documentElement.style.removeProperty("--gold");
  document.documentElement.style.removeProperty("--gold-light");
  document.documentElement.style.removeProperty("--seasonal-banner-bg");
}

export function applySeasonalDocument(preset: ThemePreset) {
  if (typeof document === "undefined") return;

  document.body.classList.remove(...THEME_BODY_CLASSES);
  document.body.classList.add(preset.bodyClass);
  document.documentElement.style.setProperty("--gold", preset.accentColor);
  document.documentElement.style.setProperty("--gold-light", preset.accentLight);
  document.documentElement.style.setProperty("--seasonal-banner-bg", preset.bannerGradient);
}

export function restoreDefaultDocument() {
  if (typeof document === "undefined") return;

  document.body.classList.remove(...THEME_BODY_CLASSES, "has-seasonal-greeting");
  document.documentElement.style.setProperty("--gold", ROOT_GOLD);
  document.documentElement.style.setProperty("--gold-light", ROOT_GOLD_LIGHT);
  document.documentElement.style.removeProperty("--seasonal-banner-bg");
}

export function dispatchThemeUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(THEME_UPDATED_EVENT));
}
