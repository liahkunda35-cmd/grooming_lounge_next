"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";
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
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Theme | null>(null);
  const [editForm, setEditForm] = useState({
    announcement: "",
    accentColor: "#b8860b",
    startsAt: "",
    endsAt: "",
  });
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
        router.push("/login");
        return;
      }
      if (!response.ok) {
        setMessage("Could not load themes. Please refresh and try again.");
        return;
      }
      const data: Theme[] = await response.json();
      setThemes(Array.isArray(data) ? data : []);
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

  async function deactivateAll() {
    const defaultTheme = themes.find((theme) => theme.key === "default");
    if (!defaultTheme) return;
    await activateTheme(defaultTheme);
    setMessage("Default theme restored.");
  }

  function previewTheme(theme: Theme) {
    window.open(`/?previewTheme=${encodeURIComponent(theme.key)}`, "_blank", "noopener,noreferrer");
  }

  function openEdit(theme: Theme) {
    const config = parseThemeConfig(theme.config);
    setEditing(theme);
    setEditForm({
      announcement: config.announcement ?? "",
      accentColor: config.accentColor ?? "#b8860b",
      startsAt: toInputDate(theme.startsAt),
      endsAt: toInputDate(theme.endsAt),
    });
  }

  async function saveEdit(event: FormEvent) {
    event.preventDefault();
    if (!editing) return;

    const existing = parseThemeConfig(editing.config);
    const config: ThemeConfig = {
      ...existing,
      announcement: editForm.announcement,
      accentColor: editForm.accentColor,
    };

    const response = await fetch("/api/admin/themes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id,
        config: JSON.stringify(config),
        startsAt: editForm.startsAt || null,
        endsAt: editForm.endsAt || null,
      }),
    });

    if (response.ok) {
      setMessage(`Settings saved for ${editing.name}.`);
      setEditing(null);
      loadThemes();
      router.refresh();
      dispatchThemeUpdated();
    } else {
      setMessage("Could not save theme settings.");
    }
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
      setCreateOpen(false);
      loadThemes();
    } else {
      const error = await response.json();
      setMessage(error.error || "Could not create theme.");
    }
  }

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Seasonal Themes"
        description="Activate seasonal decorations for your visitors. Only one theme is live at a time."
        message={message}
        actionLabel="Create Theme"
        onAction={() => setCreateOpen(true)}
      >
        <button type="button" className="btn btn--outline" onClick={deactivateAll}>
          Use Default Theme
        </button>
      </AdminPageHeader>

      <section className="admin-card">
        {loading ? <p className="section__desc">Loading seasonal themes…</p> : null}
        <AdminPagedTable
          rows={themes}
          rowKey={(row) => row.id}
          emptyMessage="No themes found."
          columns={[
            { key: "name", header: "Theme", render: (theme) => theme.name },
            {
              key: "status",
              header: "Status",
              render: (theme) =>
                theme.isActive ? <span className="admin-badge">Live</span> : "Inactive",
            },
            {
              key: "schedule",
              header: "Schedule",
              render: (theme) => `${formatDate(theme.startsAt)} → ${formatDate(theme.endsAt)}`,
            },
            {
              key: "actions",
              header: "Actions",
              render: (theme) => (
                <div className="admin-actions">
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => previewTheme(theme)}>
                    Preview
                  </button>
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => openEdit(theme)}>
                    Edit
                  </button>
                  {!theme.isActive ? (
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => activateTheme(theme)}>
                      Activate
                    </button>
                  ) : null}
                  {theme.key !== "default" ? (
                    <button type="button" className="admin-btn-danger" onClick={() => deleteTheme(theme)}>
                      Delete
                    </button>
                  ) : null}
                </div>
              ),
            },
          ]}
        />
      </section>

      <AdminModal open={createOpen} title="Create Custom Theme" onClose={() => setCreateOpen(false)}>
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
            Optional decorations (comma-separated)
            <input
              value={newTheme.decoIcons}
              onChange={(event) =>
                setNewTheme((current) => ({ ...current, decoIcons: event.target.value }))
              }
              placeholder="Leave empty unless you need custom icons"
            />
          </label>
          <div className="admin-actions">
            <button type="submit" className="btn btn--primary">
              Create Theme
            </button>
            <button type="button" className="btn btn--outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal
        open={Boolean(editing)}
        title={editing ? `Edit ${editing.name}` : "Edit Theme"}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form className="admin-form" onSubmit={saveEdit}>
            {editing.key !== "default" ? (
              <>
                <label>
                  Banner message
                  <input
                    value={editForm.announcement}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, announcement: event.target.value }))
                    }
                  />
                </label>
                <label>
                  Accent color
                  <input
                    type="color"
                    value={editForm.accentColor}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, accentColor: event.target.value }))
                    }
                  />
                </label>
              </>
            ) : null}
            <div className="admin-form admin-form--inline">
              <label>
                Start date
                <input
                  type="date"
                  value={editForm.startsAt}
                  onChange={(event) =>
                    setEditForm((current) => ({ ...current, startsAt: event.target.value }))
                  }
                />
              </label>
              <label>
                End date
                <input
                  type="date"
                  value={editForm.endsAt}
                  onChange={(event) =>
                    setEditForm((current) => ({ ...current, endsAt: event.target.value }))
                  }
                />
              </label>
            </div>
            <div className="admin-actions">
              <button type="submit" className="btn btn--primary">
                Save Changes
              </button>
              <button type="button" className="btn btn--outline" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </AdminModal>
    </div>
  );
}
