import type { Metadata } from "next";
import DynamicServicesPage from "@/components/services/DynamicServicesPage";
import { getGalleryBySection } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Grooming Lounge barbershop and salon services — haircuts, braids, nails, and more in Lusaka.",
};

export default async function Page() {
  const [barbershopCategories, salonCategories] = await Promise.all([
    getGalleryBySection("barbershop"),
    getGalleryBySection("salon"),
  ]);

  return (
    <DynamicServicesPage
      barbershopCategories={barbershopCategories}
      salonCategories={salonCategories}
    />
  );
}
