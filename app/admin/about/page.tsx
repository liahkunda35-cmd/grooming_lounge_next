"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AboutImageKey = "story_primary" | "story_secondary" | "branch_munaro" | "branch_ibex";

type AboutImageSlot = {
  key: AboutImageKey;
  label: string;
  description: string;
  defaultUrl: string;
};

type AboutImageRecord = {
  url: string;
  updatedAt: string;
};

type SlotDraft = {
  file: File | null;
  previewUrl: string | null;
  loading: boolean;
  message: string;
};

export default function AdminAboutImagesPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<AboutImageSlot[]>([]);
  const [images, setImages] = useState<Record<AboutImageKey, AboutImageRecord> | null>(null);
  const [drafts, setDrafts] = useState<Record<AboutImageKey, SlotDraft>>({
    story_primary: { file: null, previewUrl: null, loading: false, message: "" },
    story_secondary: { file: null, previewUrl: null, loading: false, message: "" },
    branch_munaro: { file: null, previewUrl: null, loading: false, message: "" },
    branch_ibex: { file: null, previewUrl: null, loading: false, message: "" },
  });

  async function loadImages() {
    const response = await fetch("/api/admin/about-images");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!response.ok) return;
    const data = await response.json();
    setSlots(data.slots);
    setImages(data.images);
  }

  useEffect(() => {
    loadImages();
  }, []);

  const previewUrls = useMemo(() => {
    const urls: Partial<Record<AboutImageKey, string>> = {};
    (Object.keys(drafts) as AboutImageKey[]).forEach((key) => {
      if (drafts[key].previewUrl) urls[key] = drafts[key].previewUrl!;
    });
    return urls;
  }, [drafts]);

  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  function updateDraft(key: AboutImageKey, patch: Partial<SlotDraft>) {
    setDrafts((current) => ({ ...current, [key]: { ...current[key], ...patch } }));
  }

  function handleFileChange(key: AboutImageKey, file: File | null) {
    if (drafts[key].previewUrl) URL.revokeObjectURL(drafts[key].previewUrl!);
    updateDraft(key, {
      file,
      previewUrl: file ? URL.createObjectURL(file) : null,
      message: "",
    });
  }

  async function handleReplace(event: FormEvent, key: AboutImageKey) {
    event.preventDefault();
    const draft = drafts[key];
    if (!draft.file) {
      updateDraft(key, { message: "Choose an image to upload." });
      return;
    }

    updateDraft(key, { loading: true, message: "" });

    const formData = new FormData();
    formData.append("key", key);
    formData.append("file", draft.file);

    const response = await fetch("/api/admin/about-images", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      setImages((current) =>
        current ? { ...current, [key]: { url: data.url, updatedAt: data.updatedAt } } : current
      );
      if (draft.previewUrl) URL.revokeObjectURL(draft.previewUrl);
      updateDraft(key, {
        file: null,
        previewUrl: null,
        loading: false,
        message: data.message || "Image saved.",
      });
      router.refresh();
    } else {
      updateDraft(key, {
        loading: false,
        message: data.error || "Could not save image.",
      });
    }
  }

  async function handleDelete(key: AboutImageKey, label: string) {
    if (!confirm(`Delete the custom image for "${label}" and restore the default?`)) return;

    updateDraft(key, { loading: true, message: "" });

    const response = await fetch(`/api/admin/about-images?key=${encodeURIComponent(key)}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.ok) {
      setImages((current) =>
        current ? { ...current, [key]: { url: data.url, updatedAt: data.updatedAt } } : current
      );
      if (drafts[key].previewUrl) URL.revokeObjectURL(drafts[key].previewUrl);
      updateDraft(key, {
        file: null,
        previewUrl: null,
        loading: false,
        message: data.message || "Image reset to default.",
      });
      router.refresh();
    } else {
      updateDraft(key, {
        loading: false,
        message: data.error || "Could not delete image.",
      });
    }
  }

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h1 className="section__title">About Us Images</h1>
        <p className="section__desc">
          Manage the photos shown on the About page. Upload JPG, JPEG, PNG, or WEBP images — they are
          automatically optimized for the web. Changes appear on the About page immediately after saving.
        </p>
      </section>

      <div className="admin-about-grid">
        {slots.map((slot) => {
          const record = images?.[slot.key];
          const draft = drafts[slot.key];
          const displayUrl = draft.previewUrl || record?.url || slot.defaultUrl;
          const isCustom = record?.url && record.url !== slot.defaultUrl;

          return (
            <section key={slot.key} className="admin-card admin-about-card">
              <div className="admin-about-card__header">
                <h2>{slot.label}</h2>
                <p>{slot.description}</p>
              </div>

              <div className="admin-about-card__preview">
                <img src={displayUrl} alt={`${slot.label} preview`} className="admin-about-card__img" />
                {draft.previewUrl ? (
                  <span className="admin-about-card__badge">Preview — not saved yet</span>
                ) : null}
              </div>

              {record?.updatedAt ? (
                <p className="admin-meta">
                  Last updated: {new Date(record.updatedAt).toLocaleString()}
                </p>
              ) : null}

              <form className="admin-form" onSubmit={(event) => handleReplace(event, slot.key)}>
                <label>
                  Replace image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => handleFileChange(slot.key, event.target.files?.[0] ?? null)}
                  />
                </label>
                <div className="admin-about-card__actions">
                  <button type="submit" className="btn btn--primary" disabled={draft.loading || !draft.file}>
                    {draft.loading ? "Saving…" : "Save Image"}
                  </button>
                  <button
                    type="button"
                    className="admin-btn-danger"
                    disabled={draft.loading || !isCustom}
                    onClick={() => handleDelete(slot.key, slot.label)}
                  >
                    Delete
                  </button>
                </div>
              </form>

              {draft.message ? <p className="form-success">{draft.message}</p> : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
