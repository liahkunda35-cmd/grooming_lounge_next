"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagedTable from "@/components/admin/AdminPagedTable";
import { formatPriceDisplay, parseServiceLabel } from "@/lib/bookable-services";

type BookableService = {
  id: string;
  category: "barber" | "hairdresser" | string;
  label: string;
  price: number | null;
  sortOrder: number;
  isActive: boolean;
};

type FormState = {
  name: string;
  price: string;
  category: "barber" | "hairdresser";
};

const emptyForm: FormState = {
  name: "",
  price: "",
  category: "barber",
};

export default function AdminPricesPage() {
  const router = useRouter();
  const [services, setServices] = useState<BookableService[]>([]);
  const [filter, setFilter] = useState<"all" | "barber" | "hairdresser">("all");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const rows = useMemo(() => {
    if (filter === "all") return services;
    return services.filter((service) => service.category === filter);
  }, [services, filter]);

  async function loadServices() {
    const response = await fetch("/api/admin/services");
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    if (!response.ok) {
      setMessage("Could not load price list.");
      return;
    }
    setServices(await response.json());
  }

  useEffect(() => {
    loadServices();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      category: filter === "hairdresser" ? "hairdresser" : "barber",
    });
    setModalOpen(true);
  }

  function openEdit(service: BookableService) {
    const parsed = parseServiceLabel(service.label);
    setEditingId(service.id);
    setForm({
      name: parsed.name,
      price: String(service.price ?? parsed.price ?? ""),
      category: service.category === "hairdresser" ? "hairdresser" : "barber",
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
    const priceValue = form.price.trim() === "" ? null : Number(form.price);
    if (priceValue != null && (Number.isNaN(priceValue) || priceValue < 0)) {
      setMessage("Enter a valid price.");
      return;
    }

    const payload = {
      name: form.name,
      price: priceValue,
      category: form.category,
    };

    const response = await fetch(
      editingId ? `/api/admin/services/${editingId}` : "/api/admin/services",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      setMessage(editingId ? "Service updated." : "Service added.");
      closeModal();
      loadServices();
      router.refresh();
    } else {
      const data = await response.json().catch(() => null);
      setMessage(data?.error || "Could not save service.");
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Remove this service from the price list?")) return;
    const response = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (response.ok) {
      setMessage("Service removed.");
      loadServices();
      router.refresh();
    }
  }

  return (
    <div className="admin-grid">
      <AdminPageHeader
        title="Price Lists"
        description="Add and edit barbershop and salon services with their prices. Changes appear on booking and the Services price list."
        message={message}
        actionLabel="Add Service"
        onAction={openCreate}
      >
        <div className="admin-filter-tabs">
          <button
            type="button"
            className={`btn btn--sm ${filter === "all" ? "btn--primary" : "btn--outline"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn--sm ${filter === "barber" ? "btn--primary" : "btn--outline"}`}
            onClick={() => setFilter("barber")}
          >
            Barbershop
          </button>
          <button
            type="button"
            className={`btn btn--sm ${filter === "hairdresser" ? "btn--primary" : "btn--outline"}`}
            onClick={() => setFilter("hairdresser")}
          >
            Salon
          </button>
        </div>
      </AdminPageHeader>

      <section className="admin-card">
        <AdminPagedTable
          rows={rows}
          rowKey={(row) => row.id}
          emptyMessage="No services yet. Click Add Service to create one."
          columns={[
            {
              key: "category",
              header: "List",
              render: (service) =>
                service.category === "hairdresser" ? "Salon" : "Barbershop",
            },
            {
              key: "name",
              header: "Service",
              render: (service) => parseServiceLabel(service.label).name,
            },
            {
              key: "price",
              header: "Price",
              render: (service) => formatPriceDisplay(service.price, service.label),
            },
            {
              key: "actions",
              header: "Actions",
              render: (service) => (
                <div className="admin-actions">
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => openEdit(service)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-btn-danger"
                    onClick={() => deleteService(service.id)}
                  >
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
        title={editingId ? "Edit Service" : "Add Service"}
        onClose={closeModal}
      >
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  category: event.target.value as "barber" | "hairdresser",
                }))
              }
            >
              <option value="barber">Barbershop</option>
              <option value="hairdresser">Salon</option>
            </select>
          </label>
          <label>
            Service name
            <input
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Haircut (Adults)"
              required
            />
          </label>
          <label>
            Price (K)
            <input
              type="number"
              min={0}
              step={1}
              value={form.price}
              onChange={(event) =>
                setForm((current) => ({ ...current, price: event.target.value }))
              }
              placeholder="130"
              required
            />
          </label>
          <div className="admin-actions">
            <button type="submit" className="btn btn--primary">
              {editingId ? "Save Changes" : "Add Service"}
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
