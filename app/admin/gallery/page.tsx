"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";

type GalleryItem = {
  id: string;
  mediaUrl: string;
  caption: string | null;
  overlayText: string | null;
  badgeType: string | null;
  mediaType: string;
  isActive: boolean;
};

type GalleryCategory = {
  id: string;
  slug: string;
  name: string;
  section: string;
  items: GalleryItem[];
};

type FlatItem = GalleryItem & {
  categoryId: string;
  categoryName: string;
  section: string;
};

export default function AdminGalleryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [overlayText, setOverlayText] = useState("");
  const [badgeType, setBadgeType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const rows = useMemo<FlatItem[]>(
    () =>
      categories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryName: category.name,
          section: category.section,
        })),
      ),
    [categories],
  );

  async function loadCategories() {
    const response = await fetch("/api/admin/gallery/categories");
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    const data = await response.json();
    setCategories(data);
    if (!categoryId && data[0]) setCategoryId(data[0].id);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openUpload() {
    setFile(null);
    setCaption("");
    setOverlayText("");
    setBadgeType("");
    setModalOpen(true);
  }

  async function handleUpload(event: FormEvent) {
    event.preventDefault();
    if (!file || !categoryId) return;

    setLoading(true);
    setMessage("");

    const uploadData = new FormData();
    uploadData.append("file", file);

    const uploadResponse = await fetch("/api/admin/upload", {
      method: "POST",
      body: uploadData,
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      setMessage(error.error || "Upload failed.");
      setLoading(false);
      return;
    }

    const { url, mediaType } = await uploadResponse.json();

    const createResponse = await fetch("/api/admin/gallery/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId,
        mediaUrl: url,
        caption,
        altText: caption,
        overlayText,
        badgeType: badgeType || null,
        mediaType,
      }),
    });

    setLoading(false);

    if (!createResponse.ok) {
      setMessage("Could not save gallery item.");
      return;
    }

    setModalOpen(false);
    setFile(null);
    setCaption("");
    setOverlayText("");
    setBadgeType("");
    setMessage("Photo uploaded successfully.");
    loadCategories();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this photo?")) return;
    const response = await fetch(`/api/admin/gallery/items/${id}`, { method: "DELETE" });
    if (response.ok) loadCategories();
  }

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Gallery Manager"
        description="Upload photos or videos. They appear on the Services page immediately."
        message={message}
        actionLabel="Upload Media"
        onAction={openUpload}
      />

      <section className="admin-card">
        <AdminPagedTable
          rows={rows}
          rowKey={(row) => row.id}
          emptyMessage="No gallery items yet."
          columns={[
            {
              key: "preview",
              header: "Preview",
              render: (item) =>
                item.mediaType === "video" ? (
                  <video src={item.mediaUrl} className="admin-thumb" muted />
                ) : (
                  <img src={item.mediaUrl} alt="" className="admin-thumb" />
                ),
            },
            {
              key: "category",
              header: "Category",
              render: (item) => `${item.section} — ${item.categoryName}`,
            },
            {
              key: "caption",
              header: "Caption",
              render: (item) => item.caption || item.overlayText || "—",
            },
            {
              key: "actions",
              header: "Actions",
              render: (item) => (
                <button type="button" className="admin-btn-danger" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              ),
            },
          ]}
        />
      </section>

      <AdminModal open={modalOpen} title="Upload Media" onClose={() => setModalOpen(false)}>
        <form className="admin-form" onSubmit={handleUpload}>
          <label>
            Category
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.section} — {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Photo or Video
            <input
              type="file"
              accept="image/*,video/mp4,video/webm"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </label>
          <label>
            Caption
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Adult Haircut" />
          </label>
          <label>
            Overlay label
            <input
              value={overlayText}
              onChange={(e) => setOverlayText(e.target.value)}
              placeholder="Classic Cut"
            />
          </label>
          <label>
            Badge
            <select value={badgeType} onChange={(e) => setBadgeType(e.target.value)}>
              <option value="">None</option>
              <option value="logo">Brand logo</option>
              <option value="inspo">INSPO</option>
            </select>
          </label>
          <div className="admin-actions">
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
            <button className="btn btn--outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
