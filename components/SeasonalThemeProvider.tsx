"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getThemePreset } from "@/lib/theme-presets";
import {
  applySeasonalDocument,
  restoreDefaultDocument,
  THEME_UPDATED_EVENT,
} from "@/lib/theme-document";
import type { ThemeConfig } from "@/lib/themes";

type ActiveTheme = { key: string; config: ThemeConfig };

type SeasonalThemeContextValue = {
  theme: ActiveTheme | null;
  refreshTheme: () => void;
};

const SeasonalThemeContext = createContext<SeasonalThemeContextValue>({
  theme: null,
  refreshTheme: () => {},
});

export function useSeasonalTheme() {
  return useContext(SeasonalThemeContext);
}

export default function SeasonalThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previewKey = searchParams.get("previewTheme");
  const isAdmin = pathname?.startsWith("/admin");
  const [theme, setTheme] = useState<ActiveTheme | null>(null);
  const [tick, setTick] = useState(0);

  const refreshTheme = useCallback(() => {
    setTick((value) => value + 1);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setTheme(null);
      restoreDefaultDocument();
      return;
    }

    const url = previewKey
      ? `/api/theme?key=${encodeURIComponent(previewKey)}`
      : "/api/theme";

    let cancelled = false;

    fetch(url, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.key && data.key !== "default") {
          setTheme({ key: data.key, config: data.config ?? {} });
        } else {
          setTheme(null);
        }
      })
      .catch(() => {
        if (!cancelled) setTheme(null);
      });

    return () => {
      cancelled = true;
    };
  }, [isAdmin, previewKey, pathname, tick]);

  useEffect(() => {
    if (isAdmin) return;

    if (!theme) {
      restoreDefaultDocument();
      return;
    }

    const preset = getThemePreset(theme.key, theme.config);
    applySeasonalDocument(preset);

    return () => {
      restoreDefaultDocument();
    };
  }, [isAdmin, theme]);

  useEffect(() => {
    if (isAdmin) return;

    const onThemeUpdated = () => refreshTheme();
    const onFocus = () => refreshTheme();

    window.addEventListener(THEME_UPDATED_EVENT, onThemeUpdated);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener(THEME_UPDATED_EVENT, onThemeUpdated);
      window.removeEventListener("focus", onFocus);
    };
  }, [isAdmin, refreshTheme]);

  const contextValue = useMemo(
    () => ({ theme, refreshTheme }),
    [theme, refreshTheme]
  );

  return (
    <SeasonalThemeContext.Provider value={contextValue}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}
