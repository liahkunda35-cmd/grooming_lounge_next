"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";

type StaffMember = {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  photoUrl: string | null;
  specialties: string[];
  isActive: boolean;
};

type EditState = {
  id: string;
  name: string;
  title: string;
  category: string;
  specialties: string;
  photoUrl: string;
};

const emptyCreate = {
  name: "",
  title: "",
  category: "barber",
  specialties: "",
};

export default function AdminStaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [createForm, setCreateForm] = useState(emptyCreate);
  const [message, setMessage] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  async function loadStaff() {
    const response = await fetch("/api/admin/staff");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    setStaff(await response.json());
  }

  useEffect(() => {
    loadStaff();
  }, []);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    const slug = createForm.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const response = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        name: createForm.name,
        title: createForm.title,
        category: createForm.category,
        rating: 4.8,
        specialties: createForm.specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });

    if (response.ok) {
      setCreateForm(emptyCreate);
      setCreateOpen(false);
      setMessage("Staff member added.");
      loadStaff();
    } else {
      setMessage("Could not add staff member. Please try again.");
    }
  }

  async function deleteStaff(id: string) {
    if (!confirm("Remove this staff member?")) return;
    const response = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
    if (response.ok) loadStaff();
  }

  function startEdit(member: StaffMember) {
    setEditing({
      id: member.id,
      name: member.name,
      title: member.title,
      category: member.category,
      specialties: member.specialties.join(", "),
      photoUrl: member.photoUrl || "",
    });
    setMessage("");
  }

  async function saveEdit(event: FormEvent) {
    event.preventDefault();
    if (!editing) return;

    const response = await fetch(`/api/admin/staff/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editing.name,
        title: editing.title,
        category: editing.category,
        photoUrl: editing.photoUrl || null,
        specialties: editing.specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });

    if (response.ok) {
      setEditing(null);
      setMessage("Staff member updated.");
      loadStaff();
    }
  }

  async function uploadPhoto(memberId: string, file: File) {
    setUploadingId(memberId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();

      const patchResponse = await fetch(`/api/admin/staff/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl: data.url }),
      });

      if (patchResponse.ok) {
        if (editing?.id === memberId) {
          setEditing({ ...editing, photoUrl: data.url });
        }
        loadStaff();
      }
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Staff Management"
        description="Manage barbers and salon specialists shown on the booking page."
        message={message}
        actionLabel="Add Staff Member"
        onAction={() => {
          setCreateForm(emptyCreate);
          setCreateOpen(true);
        }}
      />

      <section className="admin-card">
        <AdminPagedTable
          rows={staff}
          rowKey={(row) => row.id}
          emptyMessage="No staff members yet."
          columns={[
            {
              key: "photo",
              header: "Photo",
              render: (member) => (
                <div className="admin-staff-photo">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt="" className="admin-staff-photo__img" />
                  ) : (
                    <span className="admin-staff-photo__placeholder" aria-hidden="true" />
                  )}
                  <label className="admin-staff-photo__upload">
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={uploadingId === member.id}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) uploadPhoto(member.id, file);
                        event.target.value = "";
                      }}
                    />
                    {uploadingId === member.id ? "Uploading…" : "Change"}
                  </label>
                </div>
              ),
            },
            { key: "name", header: "Name", render: (member) => member.name },
            { key: "title", header: "Title", render: (member) => member.title },
            {
              key: "category",
              header: "Category",
              render: (member) => (member.category === "barber" ? "Barber" : "Salon"),
            },
            {
              key: "specialties",
              header: "Specialties",
              render: (member) => member.specialties.join(", ") || "—",
            },
            {
              key: "actions",
              header: "Actions",
              className: "admin-table__actions",
              render: (member) => (
                <div className="admin-actions">
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => startEdit(member)}>
                    Edit
                  </button>
                  <button type="button" className="admin-btn-danger" onClick={() => deleteStaff(member.id)}>
                    Remove
                  </button>
                </div>
              ),
            },
          ]}
        />
      </section>

      <AdminModal
        open={createOpen}
        title="Add Staff Member"
        onClose={() => setCreateOpen(false)}
      >
        <form className="admin-form" onSubmit={handleCreate}>
          <label>
            Name
            <input
              value={createForm.name}
              onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
              required
            />
          </label>
          <label>
            Title
            <input
              value={createForm.title}
              onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              required
              placeholder="Senior Barber"
            />
          </label>
          <label>
            Category
            <select
              value={createForm.category}
              onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
            >
              <option value="barber">Barber</option>
              <option value="hairdresser">Salon Specialist</option>
            </select>
          </label>
          <label>
            Specialties (comma separated)
            <input
              value={createForm.specialties}
              onChange={(e) => setCreateForm({ ...createForm, specialties: e.target.value })}
              placeholder="Fades, Beard Grooming"
            />
          </label>
          <div className="admin-actions">
            <button className="btn btn--primary" type="submit">
              Add Staff Member
            </button>
            <button className="btn btn--outline" type="button" onClick={() => setCreateOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal open={Boolean(editing)} title="Edit Staff Member" onClose={() => setEditing(null)}>
        {editing ? (
          <form className="admin-form" onSubmit={saveEdit}>
            <label>
              Name
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                required
              />
            </label>
            <label>
              Title
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                required
              />
            </label>
            <label>
              Category
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              >
                <option value="barber">Barber</option>
                <option value="hairdresser">Salon Specialist</option>
              </select>
            </label>
            <label>
              Specialties (comma separated)
              <input
                value={editing.specialties}
                onChange={(e) => setEditing({ ...editing, specialties: e.target.value })}
              />
            </label>
            <div className="admin-actions">
              <button className="btn btn--primary" type="submit">
                Save Changes
              </button>
              <button className="btn btn--outline" type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </AdminModal>
    </div>
  );
}
