"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function AdminStaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("barber");
  const [specialties, setSpecialties] = useState("");
  const [message, setMessage] = useState("");
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

  const barbers = useMemo(
    () => staff.filter((member) => member.category === "barber"),
    [staff]
  );
  const salonStaff = useMemo(
    () => staff.filter((member) => member.category === "hairdresser"),
    [staff]
  );

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const response = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        name,
        title,
        category,
        rating: 4.8,
        specialties: specialties.split(",").map((item) => item.trim()).filter(Boolean),
      }),
    });

    if (response.ok) {
      setName("");
      setTitle("");
      setSpecialties("");
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

  function renderStaffTable(members: StaffMember[], heading: string) {
    return (
      <section className="admin-card admin-staff-group">
        <h2 className="admin-staff-group__title">{heading}</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Title</th>
              <th>Specialties</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
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
                </td>
                <td>{member.name}</td>
                <td>{member.title}</td>
                <td>{member.specialties.join(", ")}</td>
                <td className="admin-table__actions">
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => startEdit(member)}>
                    Edit
                  </button>
                  <button type="button" className="admin-btn-danger" onClick={() => deleteStaff(member.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {!members.length ? (
              <tr>
                <td colSpan={5}>No staff members in this category yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h1 className="section__title">Staff Management</h1>
        <p className="section__desc">
          Manage barbers and salon specialists shown on the booking page. Changes appear immediately for customers.
        </p>
        <form className="admin-form" onSubmit={handleCreate}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Senior Barber" />
          </label>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="barber">Barber</option>
              <option value="hairdresser">Salon Specialist</option>
            </select>
          </label>
          <label>
            Specialties (comma separated)
            <input
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              placeholder="Fades, Beard Grooming"
            />
          </label>
          {message ? <p className="form-success">{message}</p> : null}
          <button className="btn btn--primary" type="submit">
            Add Staff Member
          </button>
        </form>
      </section>

      {editing ? (
        <section className="admin-card">
          <h2 className="admin-staff-group__title">Edit Staff Member</h2>
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
        </section>
      ) : null}

      {renderStaffTable(barbers, "Barbers")}
      {renderStaffTable(salonStaff, "Salon Specialists")}
    </div>
  );
}
