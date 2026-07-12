import { getActiveTheme } from "@/lib/themes";
import { getThemeGreeting } from "@/lib/theme-greetings";
import EasterThemeLayer from "@/components/seasonal/EasterThemeLayer";

export default async function AdminSeasonalBanner() {
  try {
    const theme = await getActiveTheme();
    if (!theme || theme.key === "default") return null;

    const greeting = getThemeGreeting(theme.key, theme.config);
    if (!greeting) return null;

    return (
      <div className={`admin-seasonal-banner admin-seasonal-banner--${theme.key}`} role="status">
        {theme.key === "easter" ? <EasterThemeLayer variant="admin" /> : null}
        <div className="admin-seasonal-banner__content">
          <p className="admin-seasonal-banner__title">{greeting.title}</p>
          {greeting.subtitle ? (
            <p className="admin-seasonal-banner__subtitle">{greeting.subtitle}</p>
          ) : null}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Admin seasonal banner failed:", error);
    return null;
  }
}
