import ThemeReferenceLayer from "@/components/seasonal/ThemeReferenceLayer";

type EasterThemeLayerProps = {
  variant: "site" | "admin";
};

/** Tasteful Easter accents guided by the reference image — premium, not cartoonish. */
export default function EasterThemeLayer({ variant }: EasterThemeLayerProps) {
  return (
    <div className={`easter-theme-layer easter-theme-layer--${variant}`} aria-hidden="true">
      <ThemeReferenceLayer themeKey="easter" variant={variant === "admin" ? "card" : "site"} />
      <span className="easter-accent easter-accent--egg-1" />
      <span className="easter-accent easter-accent--egg-2" />
      <span className="easter-accent easter-accent--basket" />
      <span className="easter-accent easter-accent--ears" />
    </div>
  );
}
