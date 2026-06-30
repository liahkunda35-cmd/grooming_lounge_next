"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSeasonalTheme } from "@/components/SeasonalThemeProvider";
import { getThemeGreeting } from "@/lib/theme-greetings";
import { getThemePreset } from "@/lib/theme-presets";

export default function SeasonalGreeting() {
  const pathname = usePathname();
  const { theme } = useSeasonalTheme();

  const greeting = useMemo(
    () => (theme ? getThemeGreeting(theme.key, theme.config) : null),
    [theme]
  );

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      document.body.classList.remove("has-seasonal-greeting");
      return;
    }

    if (greeting) {
      document.body.classList.add("has-seasonal-greeting");
      if (greeting.structured) {
        document.body.classList.add("has-seasonal-greeting--structured");
      } else {
        document.body.classList.remove("has-seasonal-greeting--structured");
      }
    } else {
      document.body.classList.remove("has-seasonal-greeting", "has-seasonal-greeting--structured");
    }
  }, [pathname, greeting]);

  if (pathname?.startsWith("/admin") || !greeting || !theme) return null;

  const preset = getThemePreset(theme.key, theme.config);

  return (
    <div
      className={`seasonal-greeting seasonal-greeting--${preset.slug}${greeting.structured ? " seasonal-greeting--structured" : ""}`}
      role="status"
      style={{ "--greeting-accent": preset.accentColor } as React.CSSProperties}
    >
      <div className="seasonal-greeting__ribbon">
        <span className="seasonal-greeting__fold seasonal-greeting__fold--left" aria-hidden="true" />
        <div className="seasonal-greeting__text">
          <span className="seasonal-greeting__title">{greeting.title}</span>
          {greeting.subtitle ? (
            <span className="seasonal-greeting__subtitle">{greeting.subtitle}</span>
          ) : null}
        </div>
        <span className="seasonal-greeting__fold seasonal-greeting__fold--right" aria-hidden="true" />
      </div>
    </div>
  );
}
