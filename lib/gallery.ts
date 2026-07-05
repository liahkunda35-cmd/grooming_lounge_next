import { prisma } from "./prisma";
import { getStaticGalleryBySection } from "./gallery-catalog";

async function fetchGalleryFromDatabase(section: "barbershop" | "salon") {
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

function hasGalleryContent(
  categories: Awaited<ReturnType<typeof fetchGalleryFromDatabase>>,
) {
  return categories.some((category) => category.items.length > 0);
}

export async function getGalleryBySection(section: "barbershop" | "salon") {
  try {
    const categories = await fetchGalleryFromDatabase(section);
    if (hasGalleryContent(categories)) {
      return categories;
    }
  } catch (error) {
    console.error(`Gallery database unavailable for ${section}, using static catalog.`, error);
  }

  return getStaticGalleryBySection(section);
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
