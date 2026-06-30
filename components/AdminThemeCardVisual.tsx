import ThemeReferenceLayer from "@/components/seasonal/ThemeReferenceLayer";
import { getThemePreset } from "@/lib/theme-presets";
import { getThemeReferenceImage } from "@/lib/theme-references";

const CARD_BACKGROUNDS: Record<string, string> = {
  default: "linear-gradient(145deg, #f0ebe3 0%, #faf8f5 50%, #ffffff 100%)",
  christmas: "linear-gradient(145deg, #0f2e1a 0%, #1a472a 55%, #2d6b42 100%)",
  "new-year": "linear-gradient(145deg, #050510 0%, #1a1a2e 55%, #2c2c54 100%)",
  easter: "linear-gradient(145deg, #d4c4f0 0%, #e8dff8 55%, #fce4ec 100%)",
  valentines: "linear-gradient(145deg, #6a1035 0%, #ad1457 55%, #f48fb1 100%)",
  "independence-day": "linear-gradient(145deg, #198A00 0%, #EF7D00 40%, #DE2010 75%, #1a1a1a 100%)",
  "black-friday": "linear-gradient(145deg, #000000 0%, #1a1a1a 50%, #2a2a00 100%)",
  "mothers-day": "linear-gradient(145deg, #880e4f 0%, #d81b60 55%, #fce4ec 100%)",
  "fathers-day": "linear-gradient(145deg, #0d47a1 0%, #1565c0 55%, #90caf9 100%)",
};

type AdminThemeCardVisualProps = {
  themeKey: string;
  isActive: boolean;
};

export default function AdminThemeCardVisual({ themeKey, isActive }: AdminThemeCardVisualProps) {
  const preset = getThemePreset(themeKey);
  const referenceSrc = getThemeReferenceImage(themeKey);
  const background =
    CARD_BACKGROUNDS[themeKey] ??
    `linear-gradient(145deg, ${preset.accentColor} 0%, ${preset.accentLight} 100%)`;

  return (
    <div
      className={`admin-theme-card__preview admin-theme-card__preview--${themeKey}`}
      style={{ background }}
    >
      {themeKey === "default" ? (
        <div className="admin-theme-card__preview-default" aria-hidden="true">
          <span className="admin-theme-card__preview-default-label">Standard Look</span>
        </div>
      ) : referenceSrc ? (
        <ThemeReferenceLayer themeKey={themeKey} variant="card" />
      ) : (
        <div className="admin-theme-card__preview-default" aria-hidden="true">
          <span className="admin-theme-card__preview-default-label">{preset.slug}</span>
        </div>
      )}

      {isActive ? (
        <span className="admin-theme-card__live-badge">
          {themeKey === "default" ? "Active — Normal Site" : "✓ Live on Website"}
        </span>
      ) : null}
    </div>
  );
}
