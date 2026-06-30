export type ArtVariant = "card" | "site";

export function artCount(variant: ArtVariant, site: number, card: number) {
  return variant === "card" ? card : site;
}

export function PremiumSnowflake({ size = 20, className = "", opacity = 0.85 }: { size?: number; className?: string; opacity?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ opacity }}>
      <g stroke="rgba(255,255,255,0.95)" strokeWidth="1.2" strokeLinecap="round" filter="url(#pa-glow-warm)">
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a} 24 24)`}>
            <line x1="24" y1="4" x2="24" y2="44" />
            <line x1="24" y1="10" x2="18" y2="16" />
            <line x1="24" y1="10" x2="30" y2="16" />
            <line x1="24" y1="34" x2="18" y2="28" />
            <line x1="24" y1="34" x2="30" y2="28" />
            <line x1="24" y1="18" x2="20" y2="22" />
            <line x1="24" y1="18" x2="28" y2="22" />
          </g>
        ))}
      </g>
      <circle cx="24" cy="24" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

export function PremiumChristmasTree({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.15} viewBox="0 0 120 138" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <rect x="52" y="112" width="16" height="22" rx="2" fill="#4e342e" />
      <polygon points="60,6 108,52 12,52" fill="#1b5e20" />
      <polygon points="60,28 112,78 8,78" fill="#2e7d32" />
      <polygon points="60,50 100,94 20,94" fill="#388e3c" />
      <polygon points="60,70 88,108 32,108" fill="#43a047" />
      <circle cx="60" cy="6" r="5" fill="#ffd700" filter="url(#pa-glow-warm)" />
      {[
        [42, 58, "#e53935"],
        [78, 64, "#fdd835"],
        [50, 82, "#1e88e5"],
        [70, 44, "#c41e3a"],
        [38, 72, "#d4af37"],
      ].map(([cx, cy, c], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={c as string} opacity="0.9" />
      ))}
      <path d="M58 112 Q60 108 62 112" stroke="#d4af37" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function PremiumOrnament({ variant = "red", size = 36, className = "" }: { variant?: "red" | "gold" | "blue" | "green"; size?: number; className?: string }) {
  const fills: Record<string, string> = {
    red: "url(#pa-orn-red)",
    gold: "url(#pa-orn-gold)",
    blue: "#1565c0",
    green: "#2e7d32",
  };
  return (
    <svg className={className} width={size} height={size * 1.3} viewBox="0 0 44 58" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M22 2 L24 9 L22 11 L20 9 Z" fill="#d4af37" />
      <rect x="20" y="11" width="4" height="6" rx="1" fill="#b8860b" />
      <circle cx="22" cy="34" r="16" fill={fills[variant]} />
      <ellipse cx="16" cy="28" rx="5" ry="7" fill="white" opacity="0.28" />
      <path d="M14 48 Q22 54 30 48" stroke={variant === "gold" ? "#8b6914" : "#7f0f1f"} strokeWidth="2" fill="none" opacity="0.45" />
    </svg>
  );
}

export function PremiumGiftBox({ size = 56, className = "", color = "red" }: { size?: number; className?: string; color?: "red" | "gold" | "pink" | "navy" }) {
  const boxFill = color === "gold" ? "url(#pa-gift-gold)" : color === "pink" ? "#d81b60" : color === "navy" ? "#0d47a1" : "url(#pa-gift-red)";
  const ribbon = color === "gold" ? "#8b6914" : "#d4af37";
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <rect x="8" y="22" width="48" height="36" rx="3" fill={boxFill} />
      <rect x="28" y="22" width="8" height="36" fill={ribbon} opacity="0.85" />
      <rect x="8" y="36" width="48" height="8" fill={ribbon} opacity="0.85" />
      <path d="M20 22 C20 10 32 6 32 18 C32 6 44 10 44 22" stroke={ribbon} strokeWidth="3" fill="none" />
      <ellipse cx="32" cy="24" rx="14" ry="6" fill={ribbon} opacity="0.35" />
    </svg>
  );
}

export function PremiumPineSprig({ size = 80, className = "", flip = false }: { size?: number; className?: string; flip?: boolean }) {
  return (
    <svg className={className} width={size} height={size * 0.55} viewBox="0 0 120 66" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined} filter="url(#pa-soft-shadow)">
      <path d="M4 58 Q30 48 60 58 Q90 48 116 58" stroke="#4e342e" strokeWidth="3" fill="none" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <ellipse key={i} cx={12 + i * 13} cy={48 - (i % 3) * 6} rx="10" ry="5" fill="url(#pa-pine)" transform={`rotate(${-20 + (i % 2) * 40} ${12 + i * 13} ${48 - (i % 3) * 6})`} />
      ))}
      <circle cx="28" cy="38" r="4" fill="#c41e3a" />
      <circle cx="72" cy="34" r="3.5" fill="#d4af37" />
      <circle cx="96" cy="40" r="3" fill="#c41e3a" />
    </svg>
  );
}

export function PremiumHolly({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <ellipse cx="18" cy="32" rx="14" ry="8" fill="#1b5e20" transform="rotate(-35 18 32)" />
      <ellipse cx="38" cy="32" rx="14" ry="8" fill="#2e7d32" transform="rotate(35 38 32)" />
      <ellipse cx="28" cy="22" rx="12" ry="7" fill="#388e3c" transform="rotate(-5 28 22)" />
      <circle cx="16" cy="38" r="5" fill="#c41e3a" />
      <circle cx="24" cy="42" r="4.5" fill="#b71c1c" />
      <circle cx="36" cy="40" r="5" fill="#c41e3a" />
    </svg>
  );
}

export function PremiumBell({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.2} viewBox="0 0 40 48" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M20 4 L22 10 L18 10 Z" fill="#d4af37" />
      <path d="M8 36 Q20 28 32 36 L30 40 Q20 34 10 40 Z" fill="#d4af37" />
      <ellipse cx="20" cy="28" rx="14" ry="16" fill="url(#pa-orn-gold)" />
      <ellipse cx="16" cy="22" rx="4" ry="6" fill="white" opacity="0.25" />
      <circle cx="20" cy="42" r="3" fill="#b8860b" />
    </svg>
  );
}

export function PremiumRose({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.1} viewBox="0 0 52 58" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M26 52 Q24 44 26 36 Q28 44 26 52" fill="#2e7d32" />
      <ellipse cx="22" cy="46" rx="6" ry="3" fill="#388e3c" transform="rotate(-30 22 46)" />
      <ellipse cx="30" cy="44" rx="5" ry="2.5" fill="#43a047" transform="rotate(25 30 44)" />
      <circle cx="26" cy="26" r="14" fill="url(#pa-rose)" />
      <path d="M26 14 C32 18 36 24 26 30 C16 24 20 18 26 14" fill="#ad1457" opacity="0.85" />
      <path d="M26 22 C34 18 38 26 26 34 C14 26 18 18 26 22" fill="#880e4f" opacity="0.75" />
      <path d="M26 28 C30 32 32 36 26 38 C20 36 22 32 26 28" fill="#6a1035" opacity="0.7" />
    </svg>
  );
}

export function PremiumBouquet({ size = 64, className = "", tone = "mothers" }: { size?: number; className?: string; tone?: "mothers" | "easter" }) {
  const palette = tone === "easter"
    ? ["#c5b9e8", "#b8e0d2", "#ffd6e7", "#9b8ec4"]
    : ["#f8bbd0", "#ce93d8", "#fff8e1", "#f48fb1"];
  return (
    <svg className={className} width={size} height={size * 1.1} viewBox="0 0 72 80" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M36 72 L32 56 L40 56 Z" fill="#5d4037" />
      <ellipse cx="36" cy="58" rx="18" ry="8" fill="#8d6e63" />
      {palette.map((c, i) => {
        const angle = (i / palette.length) * Math.PI * 2;
        const cx = 36 + Math.cos(angle) * 14;
        const cy = 38 + Math.sin(angle) * 12;
        return <circle key={i} cx={cx} cy={cy} r="9" fill={c} opacity="0.92" />;
      })}
      <circle cx="36" cy="36" r="10" fill={palette[0]} />
      <circle cx="28" cy="42" r="7" fill={palette[1]} />
      <circle cx="44" cy="42" r="7" fill={palette[2]} />
      <path d="M30 56 Q36 48 42 56" stroke="#2e7d32" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function PremiumTeddy({ size = 52, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.05} viewBox="0 0 60 63" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <circle cx="16" cy="14" r="10" fill="#8d6e63" />
      <circle cx="44" cy="14" r="10" fill="#8d6e63" />
      <ellipse cx="30" cy="36" rx="22" ry="24" fill="#a1887f" />
      <ellipse cx="30" cy="40" rx="14" ry="12" fill="#d7ccc8" />
      <circle cx="22" cy="32" r="2.5" fill="#3e2723" />
      <circle cx="38" cy="32" r="2.5" fill="#3e2723" />
      <ellipse cx="30" cy="38" rx="4" ry="3" fill="#5d4037" />
      <path d="M26 44 Q30 47 34 44" stroke="#5d4037" strokeWidth="1.5" fill="none" />
      <rect x="22" y="52" width="16" height="8" rx="2" fill="#c2185b" opacity="0.8" />
    </svg>
  );
}

export function PremiumEasterEgg({ size = 36, className = "", pattern = 0 }: { size?: number; className?: string; pattern?: number }) {
  const colors = ["#9b8ec4", "#b8e0d2", "#ffd6e7", "#c5b9e8"];
  const c = colors[pattern % colors.length];
  return (
    <svg className={className} width={size} height={size * 1.28} viewBox="0 0 40 51" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <ellipse cx="20" cy="28" rx="16" ry="20" fill={c} />
      <path d="M8 22 Q20 6 32 22" stroke="white" strokeWidth="2.5" fill="none" opacity="0.45" />
      <ellipse cx="20" cy="32" rx="10" ry="4" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" />
      <circle cx="14" cy="26" r="2" fill="white" opacity="0.4" />
      <circle cx="26" cy="34" r="1.5" fill="white" opacity="0.35" />
    </svg>
  );
}

export function PremiumButterfly({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.75} viewBox="0 0 48 36" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <ellipse cx="14" cy="16" rx="12" ry="10" fill="#9b8ec4" opacity="0.85" transform="rotate(-20 14 16)" />
      <ellipse cx="34" cy="16" rx="12" ry="10" fill="#b8e0d2" opacity="0.85" transform="rotate(20 34 16)" />
      <ellipse cx="12" cy="24" rx="8" ry="7" fill="#c5b9e8" transform="rotate(-10 12 24)" />
      <ellipse cx="36" cy="24" rx="8" ry="7" fill="#ffd6e7" transform="rotate(10 36 24)" />
      <ellipse cx="24" cy="18" rx="2" ry="10" fill="#5d4037" />
    </svg>
  );
}

export function PremiumPumpkin({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.88} viewBox="0 0 72 63" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <ellipse cx="36" cy="38" rx="28" ry="22" fill="#e65100" />
      <ellipse cx="24" cy="36" rx="9" ry="20" fill="#ef6c00" opacity="0.45" />
      <ellipse cx="48" cy="36" rx="9" ry="20" fill="#ef6c00" opacity="0.45" />
      <path d="M34 16 Q36 6 40 14" stroke="#5d4037" strokeWidth="4" fill="none" />
      <path d="M30 28 L26 36 L34 36 Z" fill="#4a148c" opacity="0.7" />
      <path d="M42 28 L38 36 L46 36 Z" fill="#4a148c" opacity="0.7" />
      <path d="M36 30 L32 38 L40 38 Z" fill="#311b92" opacity="0.6" />
    </svg>
  );
}

export function PremiumLantern({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.35} viewBox="0 0 40 54" aria-hidden="true" filter="url(#pa-glow-warm)">
      <rect x="14" y="2" width="12" height="6" rx="2" fill="#3e2723" />
      <rect x="10" y="10" width="20" height="32" rx="4" fill="#ff8f00" />
      <rect x="12" y="14" width="16" height="24" rx="2" fill="#ffb74d" opacity="0.6" />
      <line x1="14" y1="18" x2="26" y2="18" stroke="#e65100" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="24" x2="26" y2="24" stroke="#e65100" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="30" x2="26" y2="30" stroke="#e65100" strokeWidth="1" opacity="0.5" />
      <ellipse cx="20" cy="48" rx="8" ry="3" fill="#ff8f00" opacity="0.5" />
    </svg>
  );
}

export function PremiumFirework({ size = 72, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" filter="url(#pa-glow-warm)">
      <circle cx="40" cy="40" r="4" fill="#ffd700" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
        <line
          key={a}
          x1="40"
          y1="40"
          x2={40 + 28 * Math.cos((a * Math.PI) / 180)}
          y2={40 + 28 * Math.sin((a * Math.PI) / 180)}
          stroke={a % 60 === 0 ? "#ffd700" : "#fff8e1"}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
      {[15, 75, 135, 195, 255, 315].map((a) => (
        <circle
          key={`s-${a}`}
          cx={40 + 18 * Math.cos((a * Math.PI) / 180)}
          cy={40 + 18 * Math.sin((a * Math.PI) / 180)}
          r="2"
          fill="#fff"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

export function PremiumZambiaRibbon({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.35} viewBox="0 0 160 56" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M0 28 L20 8 L140 8 L160 28 L140 48 L20 48 Z" fill="#198A00" opacity="0.9" />
      <path d="M20 8 L50 8 L50 48 L20 48 Z" fill="#000" opacity="0.85" />
      <path d="M50 8 L90 8 L90 48 L50 48 Z" fill="#EF7D00" opacity="0.9" />
      <path d="M90 8 L140 8 L140 48 L90 48 Z" fill="#DE2010" opacity="0.9" />
      <text x="80" y="33" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" opacity="0.9" fontFamily="Georgia, serif">
        Zambia
      </text>
    </svg>
  );
}

export function PremiumSaleRibbon({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.45} viewBox="0 0 100 45" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M0 22 L12 6 L88 6 L100 22 L88 38 L12 38 Z" fill="#111" />
      <path d="M12 6 L88 6 L88 38 L12 38 Z" fill="#1a1a1a" />
      <text x="50" y="27" textAnchor="middle" fill="#ffd700" fontSize="13" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="2">
        SALE
      </text>
    </svg>
  );
}

export function PremiumBowTie({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.55} viewBox="0 0 48 26" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <polygon points="24,13 4,4 4,22" fill="#0d47a1" />
      <polygon points="24,13 44,4 44,22" fill="#1565c0" />
      <rect x="21" y="10" width="6" height="6" rx="1" fill="#0d47a1" />
    </svg>
  );
}

export function PremiumChampagne({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.4} viewBox="0 0 36 50" aria-hidden="true" filter="url(#pa-soft-shadow)">
      <path d="M12 18 L14 46 L22 46 L24 18 Z" fill="#cfd8dc" opacity="0.9" />
      <ellipse cx="18" cy="18" rx="8" ry="4" fill="#eceff1" />
      <path d="M16 8 Q18 2 20 8" stroke="#d4af37" strokeWidth="2" fill="none" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={16 + i * 2} cy={4 - i} r="1.5" fill="#ffd700" opacity="0.6" />
      ))}
    </svg>
  );
}
