"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminThemeCardVisual from "@/components/AdminThemeCardVisual";
import { dispatchThemeUpdated } from "@/lib/theme-document";

type Theme = {
  id: string;
  key: string;
  name: string;
  isActive: boolean;
  startsAt: string | null;
  endsAt: string | null;
  config: string;
};

type ThemeConfig = {
  announcement?: string;
  bodyClass?: string;
  snowEffect?: boolean;
  sparkleEffect?: boolean;
  heartsEffect?: boolean;
  confettiEffect?: boolean;
  flagsEffect?: boolean;
  decoIcons?: string[];
  accentColor?: string;
};

function formatDate(value: string | null) {
  if (!value) return "Not set";
  return new Date(value).toLocaleDateString();
}

function toInputDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function parseThemeConfig(raw: string): ThemeConfig {
  try {
    return JSON.parse(raw) as ThemeConfig;
  } catch {
    return {};
  }
}

export default function AdminThemesPage() {
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [schedules, setSchedules] = useState<Record<string, { startsAt: string; endsAt: string }>>({});
  const [edits, setEdits] = useState<Record<string, { announcement: string; accentColor: string }>>({});
  const [newTheme, setNewTheme] = useState({
    key: "",
    name: "",
    announcement: "",
    accentColor: "#b8860b",
    decoIcons: "",
  });

  async function loadThemes() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/themes");
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok) {
        setMessage("Could not load themes. Please refresh and try again.");
        return;
      }
      const data: Theme[] = await response.json();
      setThemes(Array.isArray(data) ? data : []);
      setSchedules(
        Object.fromEntries(
          (Array.isArray(data) ? data : []).map((theme) => [
            theme.id,
            { startsAt: toInputDate(theme.startsAt), endsAt: toInputDate(theme.endsAt) },
          ])
        )
      );
      setEdits(
        Object.fromEntries(
          (Array.isArray(data) ? data : []).map((theme) => {
            const config = parseThemeConfig(theme.config);
            return [
              theme.id,
              {
                announcement: config.announcement ?? "",
                accentColor: config.accentColor ?? "#b8860b",
              },
            ];
          })
        )
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadThemes();
  }, []);

  async function activateTheme(theme: Theme) {
    const response = await fetch("/api/admin/themes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: theme.id, isActive: true }),
    });

    if (response.ok) {
      setMessage(`${theme.name} is now live on the website.`);
      loadThemes();
      router.refresh();
      dispatchThemeUpdated();
    } else {
      setMessage("Could not activate theme. Please try again.");
    }
  }

  async function saveThemeSettings(theme: Theme) {
    const edit = edits[theme.id];
    if (!edit) return;

    const existing = parseThemeConfig(theme.config);
    const config: ThemeConfig = {
      ...existing,
      announcement: edit.announcement,
      accentColor: edit.accentColor,
    };

    const response = await fetch("/api/admin/themes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: theme.id,
        config: JSON.stringify(config),
      }),
    });

    if (response.ok) {
      setMessage(`Settings saved for ${theme.name}.`);
      loadThemes();
      router.refresh();
      dispatchThemeUpdated();
    } else {
      setMessage("Could not save theme settings.");
    }
  }

  async function deleteTheme(theme: Theme) {
    if (theme.key === "default") return;
    if (!window.confirm(`Delete "${theme.name}"? This cannot be undone.`)) return;

    const response = await fetch("/api/admin/themes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: theme.id }),
    });

    if (response.ok) {
      setMessage(`Theme "${theme.name}" deleted.`);
      loadThemes();
      router.refresh();
      dispatchThemeUpdated();
    } else {
      const error = await response.json();
      setMessage(error.error || "Could not delete theme.");
    }
  }

  async function saveSchedule(theme: Theme) {
    const schedule = schedules[theme.id];
    const response = await fetch("/api/admin/themes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: theme.id,
        startsAt: schedule.startsAt || null,
        endsAt: schedule.endsAt || null,
      }),
    });

    if (response.ok) {
      setMessage(`Schedule saved for ${theme.name}.`);
      loadThemes();
      router.refresh();
    }
  }

  async function deactivateAll() {
    const defaultTheme = themes.find((theme) => theme.key === "default");
    if (!defaultTheme) return;
    await activateTheme(defaultTheme);
    setMessage("Default theme restored.");
    dispatchThemeUpdated();
  }

  function previewTheme(theme: Theme) {
    window.open(`/?previewTheme=${encodeURIComponent(theme.key)}`, "_blank", "noopener,noreferrer");
  }

  async function createTheme(event: FormEvent) {
    event.preventDefault();
    const key = newTheme.key.trim().toLowerCase().replace(/\s+/g, "-");
    const decoIcons = newTheme.decoIcons
      .split(",")
      .map((icon) => icon.trim())
      .filter(Boolean);

    const config: ThemeConfig = {
      announcement: newTheme.announcement || `${newTheme.name} at Grooming Lounge!`,
      accentColor: newTheme.accentColor,
      bodyClass: `theme-${key}`,
      sparkleEffect: true,
    };

    if (decoIcons.length) {
      config.decoIcons = decoIcons;
    }

    const response = await fetch("/api/admin/themes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        name: newTheme.name,
        config: JSON.stringify(config),
      }),
    });

    if (response.ok) {
      setMessage(`Theme "${newTheme.name}" created.`);
      setNewTheme({ key: "", name: "", announcement: "", accentColor: "#b8860b", decoIcons: "" });
      loadThemes();
    } else {
      const error = await response.json();
      setMessage(error.error || "Could not create theme.");
    }
  }

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h1 className="section__title">Seasonal Themes</h1>
        <p className="section__desc">
          Activate seasonal decorations for your visitors. Only one theme is live at a time. Use
          Preview to see a theme before activating it, or set start/end dates for automatic
          scheduling.
        </p>
        {message ? <p className="form-success">{message}</p> : null}
        <button type="button" className="btn btn--outline" onClick={deactivateAll}>
          Use Default Theme
        </button>
      </section>

      {loading ? (
        <section className="admin-card">
          <p className="section__desc">Loading seasonal themes…</p>
        </section>
      ) : null}

      <section className="admin-grid admin-grid--2">
        {themes.map((theme) => {
          const config = parseThemeConfig(theme.config);
          const schedule = schedules[theme.id] ?? { startsAt: "", endsAt: "" };
          const edit = edits[theme.id] ?? {
            announcement: config.announcement ?? "",
            accentColor: config.accentColor ?? "#b8860b",
          };
          const isLive = theme.isActive;

          return (
            <article
              key={theme.id}
              className={`admin-card admin-theme-card admin-theme-card--${theme.key}${
                isLive ? " admin-theme-card--active" : ""
              }`}
            >
              <AdminThemeCardVisual themeKey={theme.key} isActive={isLive} />
              <div className="admin-theme-card__body">
                <h2>{theme.name}</h2>
                <p>{config.announcement || "Standard website appearance."}</p>
                <p>
                  Status: <strong>{isLive ? "Active" : "Inactive"}</strong>
                </p>
              <p className="admin-meta">
                Schedule: {formatDate(theme.startsAt)} → {formatDate(theme.endsAt)}
              </p>

              {theme.key !== "default" ? (
                <div className="admin-form admin-form--inline">
                  <label>
                    Banner message
                    <input
                      value={edit.announcement}
                      onChange={(event) =>
                        setEdits((current) => ({
                          ...current,
                          [theme.id]: { ...edit, announcement: event.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Accent color
                    <input
                      type="color"
                      value={edit.accentColor}
                      onChange={(event) =>
                        setEdits((current) => ({
                          ...current,
                          [theme.id]: { ...edit, accentColor: event.target.value },
                        }))
                      }
                    />
                  </label>
                  <button type="button" className="btn btn--outline" onClick={() => saveThemeSettings(theme)}>
                    Save Settings
                  </button>
                </div>
              ) : null}

              <div className="admin-form admin-form--inline">
                <label>
                  Start date
                  <input
                    type="date"
                    value={schedule.startsAt}
                    onChange={(event) =>
                      setSchedules((current) => ({
                        ...current,
                        [theme.id]: { ...schedule, startsAt: event.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  End date
                  <input
                    type="date"
                    value={schedule.endsAt}
                    onChange={(event) =>
                      setSchedules((current) => ({
                        ...current,
                        [theme.id]: { ...schedule, endsAt: event.target.value },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="admin-actions">
                <button type="button" className="btn btn--outline" onClick={() => saveSchedule(theme)}>
                  Save Schedule
                </button>
                <button type="button" className="btn btn--outline" onClick={() => previewTheme(theme)}>
                  Preview
                </button>
                {!isLive ? (
                  <button type="button" className="btn btn--primary" onClick={() => activateTheme(theme)}>
                    Activate {theme.name}
                  </button>
                ) : (
                  <span className="section__label admin-theme-card__live-label">Currently live</span>
                )}
                {theme.key !== "default" ? (
                  <button type="button" className="btn btn--outline" onClick={() => deleteTheme(theme)}>
                    Delete
                  </button>
                ) : null}
              </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="admin-card">
        <h2>Create Custom Theme</h2>
        <p className="section__desc">
          Add a future seasonal event without editing code. Use a unique key such as{" "}
          <code>summer-sale</code>.
        </p>
        <form className="admin-form" onSubmit={createTheme}>
          <label>
            Theme key
            <input
              value={newTheme.key}
              onChange={(event) => setNewTheme((current) => ({ ...current, key: event.target.value }))}
              placeholder="summer-sale"
              pattern="[a-z0-9-]+"
              required
            />
          </label>
          <label>
            Display name
            <input
              value={newTheme.name}
              onChange={(event) => setNewTheme((current) => ({ ...current, name: event.target.value }))}
              placeholder="Summer Sale"
              required
            />
          </label>
          <label>
            Banner message
            <input
              value={newTheme.announcement}
              onChange={(event) =>
                setNewTheme((current) => ({ ...current, announcement: event.target.value }))
              }
              placeholder="Summer specials at Grooming Lounge!"
            />
          </label>
          <label>
            Accent color
            <input
              type="color"
              value={newTheme.accentColor}
              onChange={(event) =>
                setNewTheme((current) => ({ ...current, accentColor: event.target.value }))
              }
            />
          </label>
          <label>
            Optional decorations (comma-separated, leave empty for reference-based visuals only)
            <input
              value={newTheme.decoIcons}
              onChange={(event) =>
                setNewTheme((current) => ({ ...current, decoIcons: event.target.value }))
              }
              placeholder="Leave empty unless you need custom icons"
            />
          </label>
          <button type="submit" className="btn btn--primary">
            Create Theme
          </button>
        </form>
      </section>
    </div>
  );
}
