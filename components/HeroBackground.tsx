/**
 * Hero background — separate mobile/desktop images, full image visible (no crop).
 */
const MOBILE_HERO_SRC = "/mobile-background.png";
const DESKTOP_HERO_SRC = "/pc-background.png";

export default function HeroBackground() {
  return (
    <div className="hero__media" aria-hidden="true">
      <img
        className="hero__bg hero__bg-img hero__bg-img--mobile"
        src={MOBILE_HERO_SRC}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      <img
        id="hero-bg"
        className="hero__bg hero__bg-img hero__bg-img--desktop"
        src={DESKTOP_HERO_SRC}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
