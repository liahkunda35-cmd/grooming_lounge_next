"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Announcement = {
  id: string;
  title: string;
  message: string;
  isEnabled: boolean;
  isPinned: boolean;
  placement: "all" | "home" | "book";
  startsAt: string | null;
  endsAt: string | null;
  sortOrder: number;
};

const emptyForm = {
  title: "",
  message: "",
  isEnabled: true,
  isPinned: false,
  placement: "all" as "all" | "home" | "book",
  startsAt: "",
  endsAt: "",
  sortOrder: 0,
};

function toInputDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default function AdminAnnouncementsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Announcement[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadAnnouncements() {
    const response = await fetch("/api/admin/announcements");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    setItems(await response.json());
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  function startEdit(item: Announcement) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      message: item.message,
      isEnabled: item.isEnabled,
      isPinned: item.isPinned,
      placement: item.placement,
      startsAt: toInputDate(item.startsAt),
      endsAt: toInputDate(item.endsAt),
      sortOrder: item.sortOrder,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const payload = {
      title: form.title,
      message: form.message,
      isEnabled: form.isEnabled,
      isPinned: form.isPinned,
      placement: form.placement,
      startsAt: form.startsAt || null,
      endsAt: form.endsAt || null,
      sortOrder: form.sortOrder,
    };

    const response = await fetch(
      editingId ? `/api/admin/announcements/${editingId}` : "/api/admin/announcements",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      setMessage(editingId ? "Announcement updated." : "Announcement created.");
      resetForm();
      loadAnnouncements();
      router.refresh();
    } else {
      setMessage("Could not save announcement.");
    }
  }

  async function toggleEnabled(item: Announcement) {
    await fetch(`/api/admin/announcements/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isEnabled: !item.isEnabled }),
    });
    loadAnnouncements();
    router.refresh();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    loadAnnouncements();
    router.refresh();
  }

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h1 className="section__title">Announcements</h1>
        <p className="section__desc">
          Promotions, closures, and special offers shown on the public website. No code changes
          needed.
        </p>
        {message ? <p className="form-success">{message}</p> : null}
      </section>

      <section className="admin-card">
        <h2>{editingId ? "Edit Announcement" : "Create Announcement"}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
          </label>
          <label>
            Message
            <textarea
              rows={3}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Show on
            <select
              value={form.placement}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  placement: event.target.value as "all" | "home" | "book",
                }))
              }
            >
              <option value="all">All pages</option>
              <option value="home">Homepage only</option>
              <option value="book">Booking page only</option>
            </select>
          </label>
          <div className="admin-form admin-form--inline">
            <label>
              Start date
              <input
                type="date"
                value={form.startsAt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, startsAt: event.target.value }))
                }
              />
            </label>
            <label>
              End date
              <input
                type="date"
                value={form.endsAt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, endsAt: event.target.value }))
                }
              />
            </label>
          </div>
          <label>
            Sort order
            <input
              type="number"
              value={form.sortOrder}
              onChange={(event) =>
                setForm((current) => ({ ...current, sortOrder: Number(event.target.value) }))
              }
            />
          </label>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.isPinned}
              onChange={(event) =>
                setForm((current) => ({ ...current, isPinned: event.target.checked }))
              }
            />
            Pin to top
          </label>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.isEnabled}
              onChange={(event) =>
                setForm((current) => ({ ...current, isEnabled: event.target.checked }))
              }
            />
            Enabled
          </label>
          <div className="admin-actions">
            <button type="submit" className="btn btn--primary">
              {editingId ? "Save Changes" : "Create Announcement"}
            </button>
            {editingId ? (
              <button type="button" className="btn btn--outline" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="admin-card">
        <h2>All Announcements</h2>
        {items.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Placement</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.title}</strong>
                    {item.isPinned ? <span className="admin-badge">Pinned</span> : null}
                    <p>{item.message}</p>
                  </td>
                  <td>{item.placement}</td>
                  <td>{item.isEnabled ? "Enabled" : "Disabled"}</td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="btn btn--outline" onClick={() => startEdit(item)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn--outline" onClick={() => toggleEnabled(item)}>
                        {item.isEnabled ? "Disable" : "Enable"}
                      </button>
                      <button
                        type="button"
                        className="admin-btn-danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
