import OptimizedImage from "@/components/OptimizedImage";

/**
 * Hero background — desktop uses full-bleed cover; mobile uses the same
 * composition via a width-aware container (see app/responsive.css).
 */
export default function HeroBackground({ src }: { src: string }) {
  return (
    <div className="hero__media" aria-hidden="true">
      <OptimizedImage
        className="hero__bg hero__bg-img"
        id="hero-bg"
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority
        quality={90}
      />
    </div>
  );
}
