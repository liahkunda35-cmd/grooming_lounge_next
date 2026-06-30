"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminHeroPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("/background.png");
  const [updatedAt, setUpdatedAt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadHero() {
    const response = await fetch("/api/admin/hero");
    if (response.status === 401) {
      router.push("/admin/login");
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
      setMessage(data.message || "Hero banner updated successfully.");
      router.refresh();
    } else {
      setMessage(data.error || "Could not update hero banner.");
    }

    setLoading(false);
  }

  const displayUrl = previewUrl || imageUrl;

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h1 className="section__title">Hero Banner Management</h1>
        <p className="section__desc">
          Upload a new image for the homepage hero banner. Recommended size: at least 1920×1080px. JPG,
          PNG, or WEBP up to 15MB.
        </p>
        {message ? <p className="form-success">{message}</p> : null}
      </section>

      <section className="admin-card">
        <h2>Current Hero Banner</h2>
        <div className="admin-hero-preview">
          <img src={displayUrl} alt="Current homepage hero banner preview" className="admin-hero-preview__img" />
        </div>
        {updatedAt ? (
          <p className="admin-meta">Last updated: {new Date(updatedAt).toLocaleString()}</p>
        ) : null}
      </section>

      <section className="admin-card">
        <h2>Replace Hero Image</h2>
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
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Uploading…" : "Save Hero Banner"}
          </button>
        </form>
      </section>
    </div>
  );
}
