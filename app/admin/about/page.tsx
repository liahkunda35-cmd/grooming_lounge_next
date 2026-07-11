"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";

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
  const [activeKey, setActiveKey] = useState<AboutImageKey | null>(null);
  const [drafts, setDrafts] = useState<Record<AboutImageKey, SlotDraft>>({
    story_primary: { file: null, previewUrl: null, loading: false, message: "" },
    story_secondary: { file: null, previewUrl: null, loading: false, message: "" },
    branch_munaro: { file: null, previewUrl: null, loading: false, message: "" },
    branch_ibex: { file: null, previewUrl: null, loading: false, message: "" },
  });
  const [message, setMessage] = useState("");

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
        current ? { ...current, [key]: { url: data.url, updatedAt: data.updatedAt } } : current,
      );
      if (draft.previewUrl) URL.revokeObjectURL(draft.previewUrl);
      updateDraft(key, {
        file: null,
        previewUrl: null,
        loading: false,
        message: "",
      });
      setMessage(data.message || "Image saved.");
      setActiveKey(null);
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
        current ? { ...current, [key]: { url: data.url, updatedAt: data.updatedAt } } : current,
      );
      if (drafts[key].previewUrl) URL.revokeObjectURL(drafts[key].previewUrl!);
      updateDraft(key, {
        file: null,
        previewUrl: null,
        loading: false,
        message: "",
      });
      setMessage(data.message || "Image reset to default.");
      setActiveKey(null);
      router.refresh();
    } else {
      updateDraft(key, {
        loading: false,
        message: data.error || "Could not delete image.",
      });
    }
  }

  const activeSlot = slots.find((slot) => slot.key === activeKey) ?? null;
  const activeDraft = activeKey ? drafts[activeKey] : null;
  const activeRecord = activeKey && images ? images[activeKey] : null;
  const activeDisplayUrl =
    activeDraft?.previewUrl || activeRecord?.url || activeSlot?.defaultUrl || "";

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="About Us Images"
        description="Manage the photos shown on the About page. Changes appear immediately after saving."
        message={message}
      />

      <section className="admin-card">
        <AdminPagedTable
          rows={slots}
          rowKey={(row) => row.key}
          pageSize={8}
          emptyMessage="No image slots found."
          columns={[
            {
              key: "preview",
              header: "Preview",
              render: (slot) => {
                const record = images?.[slot.key];
                const draft = drafts[slot.key];
                const url = draft.previewUrl || record?.url || slot.defaultUrl;
                return <img src={url} alt="" className="admin-thumb" />;
              },
            },
            { key: "label", header: "Slot", render: (slot) => slot.label },
            {
              key: "description",
              header: "Description",
              render: (slot) => <span className="admin-table__sub">{slot.description}</span>,
            },
            {
              key: "updated",
              header: "Updated",
              render: (slot) => {
                const record = images?.[slot.key];
                return record?.updatedAt ? new Date(record.updatedAt).toLocaleString() : "—";
              },
            },
            {
              key: "actions",
              header: "Actions",
              render: (slot) => {
                const record = images?.[slot.key];
                const isCustom = Boolean(record?.url && record.url !== slot.defaultUrl);
                return (
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => setActiveKey(slot.key)}
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      disabled={!isCustom || drafts[slot.key].loading}
                      onClick={() => handleDelete(slot.key, slot.label)}
                    >
                      Reset
                    </button>
                  </div>
                );
              },
            },
          ]}
        />
      </section>

      <AdminModal
        open={Boolean(activeSlot)}
        title={activeSlot ? `Replace ${activeSlot.label}` : "Replace image"}
        onClose={() => setActiveKey(null)}
      >
        {activeSlot && activeDraft ? (
          <>
            <div className="admin-about-card__preview">
              <img src={activeDisplayUrl} alt={`${activeSlot.label} preview`} className="admin-about-card__img" />
            </div>
            <form className="admin-form" onSubmit={(event) => handleReplace(event, activeSlot.key)}>
              <label>
                Choose image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) =>
                    handleFileChange(activeSlot.key, event.target.files?.[0] ?? null)
                  }
                />
              </label>
              {activeDraft.message ? <p className="form-success">{activeDraft.message}</p> : null}
              <div className="admin-actions">
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={activeDraft.loading || !activeDraft.file}
                >
                  {activeDraft.loading ? "Saving…" : "Save Image"}
                </button>
                <button type="button" className="btn btn--outline" onClick={() => setActiveKey(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : null}
      </AdminModal>
    </div>
  );
}
