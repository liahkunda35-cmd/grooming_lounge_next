/**
 * Hero background — CSS background on the container keeps the photo visible
 * on mobile even before the img loads; see app/responsive.css for layout.
 */
export default function HeroBackground({ src }: { src: string }) {
  return (
    <div
      className="hero__media"
      aria-hidden="true"
      style={{ backgroundImage: `url("${src}")` }}
    >
      {/* Native img avoids Next/Image fill wrapper sizing issues on small screens */}
      <img
        id="hero-bg"
        className="hero__bg hero__bg-img"
        src={src}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
