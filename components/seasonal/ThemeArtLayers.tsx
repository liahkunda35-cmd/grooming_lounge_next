import type { ArtVariant } from "./PremiumSeasonalArt";
import {
  PremiumBell,
  PremiumBouquet,
  PremiumBowTie,
  PremiumButterfly,
  PremiumChampagne,
  PremiumChristmasTree,
  PremiumEasterEgg,
  PremiumFirework,
  PremiumGiftBox,
  PremiumHolly,
  PremiumOrnament,
  PremiumPineSprig,
  PremiumRose,
  PremiumSaleRibbon,
  PremiumSnowflake,
  PremiumTeddy,
  PremiumZambiaRibbon,
  artCount,
} from "./PremiumSeasonalArt";

type LayerProps = { variant: ArtVariant };

function PremiumSnowfall({ variant }: LayerProps) {
  const layers = [
    { count: artCount(variant, 22, 8), size: [6, 10, 14], speed: [14, 11, 9], blur: [0, 1, 2], opacity: [0.35, 0.55, 0.75] },
    { count: artCount(variant, 16, 6), size: [10, 16, 22], speed: [12, 10, 8], blur: [0, 0.5, 1], opacity: [0.5, 0.7, 0.9] },
  ];
  return (
    <>
      {layers.map((layer, li) => (
        <div key={li} className={`sd-snowfall sd-snowfall--depth-${li}`}>
          {Array.from({ length: layer.count }).map((_, i) => {
            const si = i % layer.size.length;
            return (
              <span
                key={`${li}-${i}`}
                className="sd-snowflake-wrap"
                style={{
                  left: `${(i * 19 + li * 7) % 100}%`,
                  animationDelay: `${(i % 10) * 0.85}s`,
                  animationDuration: `${layer.speed[si]}s`,
                  filter: layer.blur[si] ? `blur(${layer.blur[si]}px)` : undefined,
                }}
              >
                {i % 3 === 0 ? (
                  <PremiumSnowflake size={layer.size[si]} opacity={layer.opacity[si]} />
                ) : (
                  <span
                    className="sd-snow-dot"
                    style={{ width: layer.size[si] / 3, height: layer.size[si] / 3, opacity: layer.opacity[si] }}
                  />
                )}
              </span>
            );
          })}
        </div>
      ))}
    </>
  );
}

function PremiumGarland({ variant, position = "top" }: LayerProps & { position?: "top" | "bottom" }) {
  const bulbs = artCount(variant, 28, 12);
  return (
    <div className={`sd-garland sd-garland--${variant} sd-garland--${position}`}>
      <svg className="sd-garland__wire" viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
        <path
          d={position === "top" ? "M0 14 Q200 2 400 14 T800 14 T1200 14" : "M0 14 Q200 26 400 14 T800 14 T1200 14"}
          stroke="rgba(45,30,15,0.55)"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
      <div className="sd-garland__bulbs">
        {Array.from({ length: bulbs }).map((_, i) => (
          <span key={i} className={`sd-bulb sd-bulb--${(i % 4) + 1}`} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
      <div className="sd-garland__pine-tips" aria-hidden="true">
        {Array.from({ length: artCount(variant, 8, 4) }).map((_, i) => (
          <span key={i} className="sd-garland__tip" style={{ left: `${8 + i * 12}%` }} />
        ))}
      </div>
    </div>
  );
}

function FloatingPetals({ tone }: { tone: "rose" | "spring" | "lavender" }) {
  return <div className={`sd-petals sd-petals--${tone}`} aria-hidden="true" />;
}

function ConfettiField({ gold = false }: { gold?: boolean }) {
  return <div className={`sd-confetti-layer${gold ? " sd-confetti-layer--gold" : ""}`} aria-hidden="true" />;
}

function SparkleField() {
  return <div className="sd-sparkle-field" aria-hidden="true" />;
}

function FireworkBursts({ variant }: LayerProps) {
  const count = artCount(variant, 4, 2);
  return (
    <div className="sd-firework-bursts">
      {Array.from({ length: count }).map((_, i) => (
        <PremiumFirework
          key={i}
          size={variant === "card" ? 40 : 72}
          className={`sd-piece sd-piece--fw-${(i % 3) + 1}`}
        />
      ))}
    </div>
  );
}

export function ChristmasArt({ variant }: LayerProps) {
  const treeSize = variant === "card" ? 56 : 110;
  return (
    <>
      <div className="sd-glow sd-glow--warm" />
      <div className="sd-glow sd-glow--christmas-vignette" />
      <PremiumGarland variant={variant} position="top" />
      {variant === "site" ? <PremiumGarland variant={variant} position="bottom" /> : null}
      <PremiumSnowfall variant={variant} />
      <div className="sd-placements">
        <PremiumChristmasTree size={treeSize} className="sd-piece sd-piece--tree-bl" />
        <PremiumChristmasTree size={treeSize * 0.82} className="sd-piece sd-piece--tree-br" />
        <PremiumOrnament variant="red" size={variant === "card" ? 24 : 38} className="sd-piece sd-piece--orn-1" />
        <PremiumOrnament variant="gold" size={variant === "card" ? 22 : 34} className="sd-piece sd-piece--orn-2" />
        <PremiumOrnament variant="blue" size={variant === "card" ? 20 : 32} className="sd-piece sd-piece--orn-3" />
        <PremiumOrnament variant="green" size={variant === "card" ? 22 : 36} className="sd-piece sd-piece--orn-4" />
        <PremiumGiftBox size={variant === "card" ? 36 : 58} color="red" className="sd-piece sd-piece--gift-1" />
        <PremiumGiftBox size={variant === "card" ? 32 : 50} color="gold" className="sd-piece sd-piece--gift-2" />
        <PremiumPineSprig size={variant === "card" ? 56 : 100} className="sd-piece sd-piece--pine-tl" />
        <PremiumPineSprig size={variant === "card" ? 48 : 88} flip className="sd-piece sd-piece--pine-tr" />
        <PremiumHolly size={variant === "card" ? 28 : 44} className="sd-piece sd-piece--holly-1" />
        <PremiumBell size={variant === "card" ? 22 : 34} className="sd-piece sd-piece--bell-1" />
        <PremiumBell size={variant === "card" ? 20 : 30} className="sd-piece sd-piece--bell-2" />
      </div>
    </>
  );
}

export function ValentinesArt({ variant }: LayerProps) {
  const roseCount = artCount(variant, 8, 4);
  return (
    <>
      <div className="sd-glow sd-glow--rose" />
      <div className="sd-glow sd-glow--valentines-romance" />
      <FloatingPetals tone="rose" />
      <div className="sd-placements">
        {Array.from({ length: roseCount }).map((_, i) => (
          <PremiumRose
            key={`rose-${i}`}
            size={variant === "card" ? 26 : 42}
            className={`sd-piece sd-piece--rose-${(i % 4) + 1}`}
          />
        ))}
        <PremiumGiftBox size={variant === "card" ? 38 : 56} color="pink" className="sd-piece sd-piece--gift-val" />
        <PremiumTeddy size={variant === "card" ? 40 : 58} className="sd-piece sd-piece--teddy" />
        <span className="sd-ribbon-accent sd-piece sd-piece--ribbon-val" aria-hidden="true" />
      </div>
    </>
  );
}

export function MothersDayArt({ variant }: LayerProps) {
  return (
    <>
      <div className="sd-glow sd-glow--mothers" />
      <FloatingPetals tone="lavender" />
      <div className="sd-placements">
        <PremiumBouquet size={variant === "card" ? 52 : 80} tone="mothers" className="sd-piece sd-piece--bouquet-1" />
        <PremiumBouquet size={variant === "card" ? 40 : 64} tone="mothers" className="sd-piece sd-piece--bouquet-2" />
        <PremiumGiftBox size={variant === "card" ? 36 : 54} color="pink" className="sd-piece sd-piece--gift-md" />
        <span className="sd-floral-border sd-piece sd-piece--floral-bl" aria-hidden="true" />
        <span className="sd-floral-border sd-floral-border--mirror sd-piece sd-piece--floral-br" aria-hidden="true" />
      </div>
    </>
  );
}

export function FathersDayArt({ variant }: LayerProps) {
  return (
    <>
      <div className="sd-glow sd-glow--fathers" />
      <SparkleField />
      <div className="sd-placements">
        <PremiumGiftBox size={variant === "card" ? 38 : 56} color="navy" className="sd-piece sd-piece--gift-fd" />
        <PremiumBowTie size={variant === "card" ? 32 : 48} className="sd-piece sd-piece--bowtie" />
        <PremiumChampagne size={variant === "card" ? 28 : 40} className="sd-piece sd-piece--champagne" />
        <span className="sd-gold-accent sd-piece sd-piece--gold-accent" aria-hidden="true" />
      </div>
    </>
  );
}

export function NewYearArt({ variant }: LayerProps) {
  return (
    <>
      <div className="sd-glow sd-glow--gold" />
      <div className="sd-glow sd-glow--newyear-sparkle" />
      <ConfettiField gold />
      <SparkleField />
      <FireworkBursts variant={variant} />
      <PremiumGarland variant={variant} position="top" />
      <div className="sd-placements">
        <PremiumChampagne size={variant === "card" ? 30 : 44} className="sd-piece sd-piece--champagne-ny" />
        <span className="sd-countdown-accent sd-piece sd-piece--countdown" aria-hidden="true" />
      </div>
    </>
  );
}

export function EasterArt({ variant }: LayerProps) {
  const eggCount = artCount(variant, 10, 5);
  const butterflyCount = artCount(variant, 4, 2);
  return (
    <>
      <div className="sd-glow sd-glow--pastel" />
      <FloatingPetals tone="spring" />
      <div className="sd-placements">
        {Array.from({ length: eggCount }).map((_, i) => (
          <PremiumEasterEgg
            key={i}
            pattern={i}
            size={variant === "card" ? 22 : 34}
            className={`sd-piece sd-piece--egg-${(i % 4) + 1}`}
          />
        ))}
        {Array.from({ length: butterflyCount }).map((_, i) => (
          <PremiumButterfly
            key={`bf-${i}`}
            size={variant === "card" ? 28 : 44}
            className={`sd-piece sd-piece--butterfly-${i + 1}`}
          />
        ))}
        <PremiumBouquet size={variant === "card" ? 44 : 68} tone="easter" className="sd-piece sd-piece--spring-bouquet" />
      </div>
    </>
  );
}

export function IndependenceArt({ variant }: LayerProps) {
  return (
    <>
      <div className="sd-glow sd-glow--zambia" />
      <ConfettiField />
      <div className="sd-placements">
        <PremiumZambiaRibbon size={variant === "card" ? 80 : 140} className="sd-piece sd-piece--zm-ribbon-1" />
        <PremiumZambiaRibbon size={variant === "card" ? 60 : 100} className="sd-piece sd-piece--zm-ribbon-2" />
        <span className="sd-zm-border sd-piece sd-piece--zm-border-tl" aria-hidden="true" />
        <span className="sd-zm-border sd-zm-border--br sd-piece sd-piece--zm-border-br" aria-hidden="true" />
      </div>
    </>
  );
}

export function BlackFridayArt({ variant }: LayerProps) {
  return (
    <>
      <div className="sd-glow sd-glow--dark" />
      <ConfettiField gold />
      <SparkleField />
      <div className="sd-placements">
        <PremiumSaleRibbon size={variant === "card" ? 64 : 100} className="sd-piece sd-piece--sale-1" />
        <PremiumSaleRibbon size={variant === "card" ? 52 : 80} className="sd-piece sd-piece--sale-2" />
        <PremiumGiftBox size={variant === "card" ? 34 : 50} color="gold" className="sd-piece sd-piece--gift-bf" />
      </div>
    </>
  );
}

export function renderThemeArt(slug: string, variant: ArtVariant) {
  switch (slug) {
    case "christmas":
      return <ChristmasArt variant={variant} />;
    case "valentines":
      return <ValentinesArt variant={variant} />;
    case "new-year":
      return <NewYearArt variant={variant} />;
    case "easter":
      return <EasterArt variant={variant} />;
    case "independence-day":
      return <IndependenceArt variant={variant} />;
    case "black-friday":
      return <BlackFridayArt variant={variant} />;
    case "mothers-day":
      return <MothersDayArt variant={variant} />;
    case "fathers-day":
      return <FathersDayArt variant={variant} />;
    default:
      return null;
  }
}
