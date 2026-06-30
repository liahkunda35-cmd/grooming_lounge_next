import { prisma } from "./prisma";

export async function getGalleryBySection(section: "barbershop" | "salon") {
  return prisma.galleryCategory.findMany({
    where: { section, isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getAllGalleryCategories() {
  return prisma.galleryCategory.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
    include: {
      items: { orderBy: { sortOrder: "asc" } },
      _count: { select: { items: true } },
    },
  });
}
