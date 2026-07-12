"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";

export default function AdminHeroPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("/background.png");
  const [updatedAt, setUpdatedAt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function loadHero() {
    const response = await fetch("/api/admin/hero");
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    if (response.ok) {
      const data = await response.json();
      setImageUrl(data.imageUrl);
      setUpdatedAt(data.updatedAt || "");
    }
  }

  useEffect(() => {
    loadHero();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!file) {
      setMessage("Please choose an image to upload.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/hero", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setImageUrl(data.imageUrl);
      setUpdatedAt(data.updatedAt);
      setFile(null);
      setModalOpen(false);
      setMessage(data.message || "Hero banner updated successfully.");
      router.refresh();
    } else {
      setMessage(data.error || "Could not update hero banner.");
    }

    setLoading(false);
  }

  const displayUrl = previewUrl || imageUrl;
  const rows = [
    {
      id: "hero",
      label: "Homepage hero banner",
      imageUrl: displayUrl,
      updatedAt,
    },
  ];

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Hero Banner Management"
        description="Upload a new image for the homepage hero banner. JPG, PNG, or WEBP up to 15MB."
        message={message}
        actionLabel="Replace Banner"
        onAction={() => {
          setFile(null);
          setModalOpen(true);
        }}
      />

      <section className="admin-card">
        <AdminPagedTable
          rows={rows}
          rowKey={(row) => row.id}
          pageSize={5}
          columns={[
            {
              key: "preview",
              header: "Preview",
              render: (row) => <img src={row.imageUrl} alt="" className="admin-thumb admin-thumb--wide" />,
            },
            { key: "label", header: "Asset", render: (row) => row.label },
            {
              key: "updated",
              header: "Last updated",
              render: (row) => (row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "—"),
            },
            {
              key: "actions",
              header: "Actions",
              render: () => (
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => {
                    setFile(null);
                    setModalOpen(true);
                  }}
                >
                  Replace
                </button>
              ),
            },
          ]}
        />
      </section>

      <AdminModal open={modalOpen} title="Replace Hero Banner" onClose={() => setModalOpen(false)}>
        <div className="admin-hero-preview admin-hero-preview--modal">
          <img src={displayUrl} alt="Hero banner preview" className="admin-hero-preview__img" />
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Choose new banner image
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              required
            />
          </label>
          <div className="admin-actions">
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "Uploading…" : "Save Hero Banner"}
            </button>
            <button type="button" className="btn btn--outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
