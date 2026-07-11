import type { Metadata } from "next";
import DynamicServicesPage from "@/components/services/DynamicServicesPage";
import { getGalleryBySection } from "@/lib/gallery";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Grooming Lounge barbershop and salon services — haircuts, braids, nails, and more in Lusaka.",
};

export default async function Page() {
  const [barbershopCategories, salonCategories, barberServices, salonServices] = await Promise.all([
    getGalleryBySection("barbershop"),
    getGalleryBySection("salon"),
    prisma.bookableService.findMany({
      where: { category: "barber", isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.bookableService.findMany({
      where: { category: "hairdresser", isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <DynamicServicesPage
      barbershopCategories={barbershopCategories}
      salonCategories={salonCategories}
      barberPriceItems={
        barberServices.length
          ? barberServices.map((service) => ({
              label: service.label,
              price: service.price,
            }))
          : undefined
      }
      salonPriceItems={
        salonServices.length
          ? salonServices.map((service) => ({
              label: service.label,
              price: service.price,
            }))
          : undefined
      }
    />
  );
}
