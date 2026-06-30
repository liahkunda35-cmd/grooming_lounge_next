import { getThemeReferenceImage } from "@/lib/theme-references";
import type { ThemeSceneVariant } from "@/components/ThemeScene";

type ThemeReferenceLayerProps = {
  themeKey: string;
  variant: ThemeSceneVariant;
};

/**
 * Photographic accents guided by theme reference images.
 * References set style/mood — they are not displayed full-screen on the public site.
 */
export default function ThemeReferenceLayer({ themeKey, variant }: ThemeReferenceLayerProps) {
  const src = getThemeReferenceImage(themeKey);
  if (!src) return null;

  return (
    <div
      className={`seasonal-ref seasonal-ref--${variant} seasonal-ref--${themeKey}`}
      aria-hidden="true"
    >
      <div className="seasonal-ref__wash" style={{ backgroundImage: `url('${src}')` }} />
      <div className="seasonal-ref__accent seasonal-ref__accent--primary" style={{ backgroundImage: `url('${src}')` }} />
      <div className="seasonal-ref__accent seasonal-ref__accent--secondary" style={{ backgroundImage: `url('${src}')` }} />
    </div>
  );
}
