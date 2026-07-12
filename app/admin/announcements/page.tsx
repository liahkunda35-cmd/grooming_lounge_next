"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";

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
  const [modalOpen, setModalOpen] = useState(false);

  async function loadAnnouncements() {
    const response = await fetch("/api/admin/announcements");
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    setItems(await response.json());
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

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
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
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
      },
    );

    if (response.ok) {
      setMessage(editingId ? "Announcement updated." : "Announcement created.");
      closeModal();
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
    if (editingId === id) closeModal();
    loadAnnouncements();
    router.refresh();
  }

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Announcements"
        description="Promotions, closures, and special offers shown on the public website."
        message={message}
        actionLabel="Create Announcement"
        onAction={openCreate}
      />

      <section className="admin-card">
        <AdminPagedTable
          rows={items}
          rowKey={(row) => row.id}
          emptyMessage="No announcements yet."
          columns={[
            {
              key: "title",
              header: "Title",
              render: (item) => (
                <div>
                  <strong>{item.title}</strong>
                  {item.isPinned ? <span className="admin-badge">Pinned</span> : null}
                  <p className="admin-table__sub">{item.message}</p>
                </div>
              ),
            },
            { key: "placement", header: "Placement", render: (item) => item.placement },
            {
              key: "status",
              header: "Status",
              render: (item) => (item.isEnabled ? "Enabled" : "Disabled"),
            },
            {
              key: "actions",
              header: "Actions",
              render: (item) => (
                <div className="admin-actions">
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => toggleEnabled(item)}>
                    {item.isEnabled ? "Disable" : "Enable"}
                  </button>
                  <button type="button" className="admin-btn-danger" onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      </section>

      <AdminModal
        open={modalOpen}
        title={editingId ? "Edit Announcement" : "Create Announcement"}
        onClose={closeModal}
      >
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
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
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
                onChange={(event) => setForm((current) => ({ ...current, startsAt: event.target.value }))}
              />
            </label>
            <label>
              End date
              <input
                type="date"
                value={form.endsAt}
                onChange={(event) => setForm((current) => ({ ...current, endsAt: event.target.value }))}
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
              onChange={(event) => setForm((current) => ({ ...current, isPinned: event.target.checked }))}
            />
            Pin to top
          </label>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.isEnabled}
              onChange={(event) => setForm((current) => ({ ...current, isEnabled: event.target.checked }))}
            />
            Enabled
          </label>
          <div className="admin-actions">
            <button type="submit" className="btn btn--primary">
              {editingId ? "Save Changes" : "Create Announcement"}
            </button>
            <button type="button" className="btn btn--outline" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
