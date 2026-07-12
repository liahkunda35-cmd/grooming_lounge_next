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
  const [sectionFilter, setSectionFilter] = useState<"all" | "barbershop" | "salon">("all");
  const [categoryId, setCategoryId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [overlayText, setOverlayText] = useState("");
  const [badgeType, setBadgeType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [replaceItem, setReplaceItem] = useState<FlatItem | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [replacePreview, setReplacePreview] = useState("");

  const filteredCategories = useMemo(() => {
    if (sectionFilter === "all") return categories;
    return categories.filter((category) => category.section === sectionFilter);
  }, [categories, sectionFilter]);

  const rows = useMemo<FlatItem[]>(
    () =>
      filteredCategories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryName: category.name,
          section: category.section,
        })),
      ),
    [filteredCategories],
  );

  async function loadCategories() {
    const response = await fetch("/api/admin/gallery/categories");
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    const data = (await response.json()) as GalleryCategory[];
    setCategories(data);
    if (!categoryId && data[0]) setCategoryId(data[0].id);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  useEffect(() => {
    if (!replaceFile) {
      setReplacePreview("");
      return;
    }
    const url = URL.createObjectURL(replaceFile);
    setReplacePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [replaceFile]);

  function openUpload() {
    setFiles([]);
    setCaption("");
    setOverlayText("");
    setBadgeType("");
    const first = filteredCategories[0] ?? categories[0];
    if (first) setCategoryId(first.id);
    setModalOpen(true);
  }

  async function uploadOneFile(file: File) {
    const uploadData = new FormData();
    uploadData.append("file", file);
    const uploadResponse = await fetch("/api/admin/upload", {
      method: "POST",
      body: uploadData,
    });
    if (!uploadResponse.ok) {
      const error = await uploadResponse.json().catch(() => null);
      throw new Error(error?.error || "Upload failed.");
    }
    return uploadResponse.json() as Promise<{ url: string; mediaType: string }>;
  }

  async function handleUpload(event: FormEvent) {
    event.preventDefault();
    if (!files.length || !categoryId) return;

    setLoading(true);
    setMessage("");

    try {
      for (const file of files) {
        const { url, mediaType } = await uploadOneFile(file);
        const createResponse = await fetch("/api/admin/gallery/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            categoryId,
            mediaUrl: url,
            caption: caption || file.name.replace(/\.[^.]+$/, ""),
            altText: caption || file.name,
            overlayText,
            badgeType: badgeType || null,
            mediaType,
          }),
        });
        if (!createResponse.ok) {
          throw new Error("Could not save one of the gallery items.");
        }
      }

      setModalOpen(false);
      setFiles([]);
      setCaption("");
      setOverlayText("");
      setBadgeType("");
      setMessage(
        files.length > 1
          ? `${files.length} photos uploaded — live site refreshed.`
          : "Photo uploaded — live site refreshed.",
      );
      loadCategories();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReplace(event: FormEvent) {
    event.preventDefault();
    if (!replaceItem || !replaceFile) return;
    setLoading(true);
    try {
      const { url, mediaType } = await uploadOneFile(replaceFile);
      const response = await fetch(`/api/admin/gallery/items/${replaceItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaUrl: url, mediaType }),
      });
      if (!response.ok) throw new Error("Could not replace image.");
      setReplaceItem(null);
      setReplaceFile(null);
      setMessage("Image replaced — live site refreshed.");
      loadCategories();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Replace failed.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this photo from the website?")) return;
    const response = await fetch(`/api/admin/gallery/items/${id}`, { method: "DELETE" });
    if (response.ok) {
      setMessage("Photo deleted — live site refreshed.");
      loadCategories();
      router.refresh();
    }
  }

  const categoryOptions =
    sectionFilter === "all"
      ? categories
      : categories.filter((category) => category.section === sectionFilter);

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Gallery Manager"
        description="Upload, replace, or delete Barbershop and Salon photos. Changes appear on the Services page immediately."
        message={message}
        actionLabel="Upload Media"
        onAction={openUpload}
      >
        <div className="admin-filter-tabs">
          <button
            type="button"
            className={`btn btn--sm ${sectionFilter === "all" ? "btn--primary" : "btn--outline"}`}
            onClick={() => setSectionFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn--sm ${sectionFilter === "barbershop" ? "btn--primary" : "btn--outline"}`}
            onClick={() => setSectionFilter("barbershop")}
          >
            Barbershop Gallery
          </button>
          <button
            type="button"
            className={`btn btn--sm ${sectionFilter === "salon" ? "btn--primary" : "btn--outline"}`}
            onClick={() => setSectionFilter("salon")}
          >
            Salon Gallery
          </button>
        </div>
      </AdminPageHeader>

      <section className="admin-card">
        <AdminPagedTable
          rows={rows}
          rowKey={(row) => row.id}
          emptyMessage="No gallery items yet. Click Upload Media to add photos."
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
              header: "Gallery",
              render: (item) =>
                `${item.section === "salon" ? "Salon" : "Barbershop"} — ${item.categoryName}`,
            },
            {
              key: "badge",
              header: "Type",
              render: (item) =>
                item.badgeType === "inspo"
                  ? "Inspiration"
                  : item.badgeType === "logo"
                    ? "Grooming Lounge photo"
                    : "—",
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
                <div className="admin-actions">
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => {
                      setReplaceItem(item);
                      setReplaceFile(null);
                    }}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className="admin-btn-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
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
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.section === "salon" ? "Salon" : "Barbershop"} — {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Photos or videos (multiple allowed)
            <input
              type="file"
              accept="image/*,video/mp4,video/webm"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              required
            />
          </label>
          {previews.length ? (
            <div className="admin-upload-previews">
              {previews.map((src) => (
                <img key={src} src={src} alt="" className="admin-thumb admin-thumb--wide" />
              ))}
            </div>
          ) : null}
          <label>
            Caption (optional — applied to all in this batch)
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Adult Haircut" />
          </label>
          <label>
            Overlay label (optional)
            <input
              value={overlayText}
              onChange={(e) => setOverlayText(e.target.value)}
              placeholder="Classic Cut"
            />
          </label>
          <label>
            Photo type
            <select value={badgeType} onChange={(e) => setBadgeType(e.target.value)}>
              <option value="">None</option>
              <option value="logo">Grooming Lounge photo</option>
              <option value="inspo">Inspiration photo</option>
            </select>
          </label>
          <div className="admin-actions">
            <button className="btn btn--primary" type="submit" disabled={loading || !files.length}>
              {loading ? "Uploading..." : files.length > 1 ? `Upload ${files.length} Files` : "Upload Photo"}
            </button>
            <button className="btn btn--outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal
        open={Boolean(replaceItem)}
        title="Replace Image"
        onClose={() => {
          setReplaceItem(null);
          setReplaceFile(null);
        }}
      >
        <form className="admin-form" onSubmit={handleReplace}>
          {replaceItem ? (
            <p className="admin-muted">
              Replacing: {replaceItem.caption || replaceItem.categoryName}
            </p>
          ) : null}
          <label>
            New photo or video
            <input
              type="file"
              accept="image/*,video/mp4,video/webm"
              onChange={(e) => setReplaceFile(e.target.files?.[0] ?? null)}
              required
            />
          </label>
          {replacePreview ? (
            <img src={replacePreview} alt="" className="admin-thumb admin-thumb--wide" />
          ) : null}
          <div className="admin-actions">
            <button className="btn btn--primary" type="submit" disabled={loading || !replaceFile}>
              {loading ? "Saving..." : "Replace Image"}
            </button>
            <button
              className="btn btn--outline"
              type="button"
              onClick={() => {
                setReplaceItem(null);
                setReplaceFile(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
