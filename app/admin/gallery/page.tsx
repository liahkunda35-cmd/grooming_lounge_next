"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  async function loadCategories() {
    const response = await fetch("/api/admin/gallery/categories");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await response.json();
    setCategories(data);
    if (!categoryId && data[0]) setCategoryId(data[0].id);
  }

  useEffect(() => {
    loadCategories();
  }, []);

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
      <section className="admin-card">
        <h1 className="section__title">Gallery Manager</h1>
        <p className="section__desc">Upload photos or videos. They appear on the Services page immediately.</p>

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
            <input value={overlayText} onChange={(e) => setOverlayText(e.target.value)} placeholder="Classic Cut" />
          </label>
          <label>
            Badge
            <select value={badgeType} onChange={(e) => setBadgeType(e.target.value)}>
              <option value="">None</option>
              <option value="logo">Brand logo</option>
              <option value="inspo">INSPO</option>
            </select>
          </label>
          {message ? <p className="form-success">{message}</p> : null}
          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      </section>

      <section className="admin-card">
        <h2>Current Gallery Items</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Category</th>
              <th>Caption</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.flatMap((category) =>
              category.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.mediaType === "video" ? (
                      <video src={item.mediaUrl} className="admin-thumb" muted />
                    ) : (
                      <img src={item.mediaUrl} alt="" className="admin-thumb" />
                    )}
                  </td>
                  <td>{category.name}</td>
                  <td>{item.caption || item.overlayText || "—"}</td>
                  <td>
                    <button type="button" className="admin-btn-danger" onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
