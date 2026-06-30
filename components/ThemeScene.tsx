import { getThemePreset } from "@/lib/theme-presets";
import type { ThemeConfig } from "@/lib/themes";
import { renderThemeArt } from "@/components/seasonal/ThemeArtLayers";
import ThemeReferenceLayer from "@/components/seasonal/ThemeReferenceLayer";
import { getThemeReferenceImage } from "@/lib/theme-references";

export type ThemeSceneVariant = "card" | "site";

type ThemeSceneProps = {
  themeKey: string;
  config?: ThemeConfig;
  variant: ThemeSceneVariant;
};

/** Reference-guided seasonal layer — photographic accents from project reference images. */
export default function ThemeScene({ themeKey, config, variant }: ThemeSceneProps) {
  if (themeKey === "default") {
    return null;
  }

  const preset = getThemePreset(themeKey, config);
  const referenceSrc = getThemeReferenceImage(themeKey);
  const hasReference = Boolean(referenceSrc);
  const art = hasReference && variant === "site" ? null : renderThemeArt(preset.slug, variant);

  if (!art && !hasReference) {
    return null;
  }

  return (
    <div
      className={`seasonal-scene seasonal-scene--${preset.slug} seasonal-scene--${variant}${
        hasReference ? " seasonal-scene--reference" : ""
      }`}
      aria-hidden="true"
    >
      {art ? (
        <svg width="0" height="0" className="sd-defs" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <radialGradient id="pa-orn-red" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="55%" stopColor="#c41e3a" />
              <stop offset="100%" stopColor="#7f0f1f" />
            </radialGradient>
            <radialGradient id="pa-orn-gold" cx="35%" cy="28%" r="65%">
              <stop offset="0%" stopColor="#ffe566" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8b6914" />
            </radialGradient>
            <radialGradient id="pa-rose" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#f48fb1" />
              <stop offset="45%" stopColor="#c2185b" />
              <stop offset="100%" stopColor="#6a1035" />
            </radialGradient>
            <linearGradient id="pa-pine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e7d32" />
              <stop offset="100%" stopColor="#1b4332" />
            </linearGradient>
            <linearGradient id="pa-gift-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d32f2f" />
              <stop offset="100%" stopColor="#8b0000" />
            </linearGradient>
            <linearGradient id="pa-gift-gold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd54f" />
              <stop offset="100%" stopColor="#b8860b" />
            </linearGradient>
            <filter id="pa-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.22" />
            </filter>
            <filter id="pa-glow-warm" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      ) : null}
      {hasReference ? <ThemeReferenceLayer themeKey={themeKey} variant={variant} /> : null}
      {art}
    </div>
  );
}
