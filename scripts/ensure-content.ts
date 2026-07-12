/**
 * Populate an empty production DB with gallery + price lists + staff
 * without wiping data the admin already saved.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRICE_CATALOG } from "../lib/bookable-services-catalog";
import { formatServiceLabel } from "../lib/bookable-services";
import { GALLERY_CATALOG } from "../lib/gallery-catalog";

const prisma = new PrismaClient();

const staff = [
  { slug: "maxwell-banda", category: "barber", name: "Maxwell Banda", title: "Senior Barber", rating: 4.9, specialties: ["Fades", "Beard Grooming", "Hot Towel Shave"] },
  { slug: "james-mwale", category: "barber", name: "James Mwale", title: "Barber", rating: 4.8, specialties: ["Haircuts", "Lining", "Kids Cuts"] },
  { slug: "david-phiri", category: "barber", name: "David Phiri", title: "Barber", rating: 4.7, specialties: ["Caucasian Cuts", "Styling", "Colour"] },
  { slug: "emmanuel-chanda", category: "barber", name: "Emmanuel Chanda", title: "Barber", rating: 4.8, specialties: ["Beard Trim", "Full Grooming", "S Curl"] },
  { slug: "sarah-mutale", category: "hairdresser", name: "Sarah Mutale", title: "Senior Hairdresser", rating: 4.9, specialties: ["Braids", "Knotless", "Cornrows"] },
  { slug: "grace-lungu", category: "hairdresser", name: "Grace Lungu", title: "Hairdresser", rating: 4.8, specialties: ["Weaves", "Styling", "Treatments"] },
  { slug: "patricia-mwansa", category: "hairdresser", name: "Patricia Mwansa", title: "Hairdresser", rating: 4.7, specialties: ["Makeup", "Lashes", "Brows"] },
  { slug: "linda-banda", category: "hairdresser", name: "Linda Banda", title: "Hairdresser", rating: 4.8, specialties: ["Nails", "Manicure", "Pedicure"] },
];

async function ensureGallery() {
  const count = await prisma.galleryCategory.count();
  if (count > 0) {
    console.log("[ensure-content] Gallery already present, skipping");
    return;
  }

  for (const category of GALLERY_CATALOG) {
    await prisma.galleryCategory.create({
      data: {
        slug: category.slug,
        name: category.name,
        section: category.section,
        sortOrder: category.sortOrder,
        layout: category.layout ?? "grid",
        items: {
          create: category.items.map((item, index) => ({
            mediaUrl: item.mediaUrl,
            caption: item.caption,
            altText: item.altText,
            overlayText: item.overlayText,
            badgeType: item.badgeType ?? null,
            mediaType: item.mediaType ?? "image",
            sortOrder: index,
          })),
        },
      },
    });
  }
  console.log("[ensure-content] Gallery seeded");
}

async function ensurePrices() {
  const count = await prisma.bookableService.count();
  const hasSections = await prisma.bookableService.count({
    where: { group: { not: "Services" } },
  });

  // Empty DB, or old flat seed without sections → load full catalog
  if (count > 0 && hasSections > 0 && count >= 40) {
    console.log("[ensure-content] Price list already present, skipping");
    return;
  }

  if (count > 0) {
    await prisma.bookableService.deleteMany();
    console.log("[ensure-content] Replacing incomplete price list");
  }

  for (const [index, entry] of PRICE_CATALOG.entries()) {
    await prisma.bookableService.create({
      data: {
        category: entry.category,
        group: entry.group,
        label:
          entry.price != null
            ? formatServiceLabel(entry.name, entry.price)
            : `${entry.name} — ${entry.priceText ?? ""}`.trim(),
        price: entry.price,
        sortOrder: index,
      },
    });
  }
  console.log(`[ensure-content] Seeded ${PRICE_CATALOG.length} price list items`);
}

async function ensureStaff() {
  const count = await prisma.staffMember.count();
  if (count > 0) {
    console.log("[ensure-content] Staff already present, skipping");
    return;
  }

  for (const [index, member] of staff.entries()) {
    await prisma.staffMember.create({
      data: {
        slug: member.slug,
        category: member.category,
        name: member.name,
        title: member.title,
        rating: member.rating,
        specialties: JSON.stringify(member.specialties),
        sortOrder: index,
      },
    });
  }
  console.log("[ensure-content] Staff seeded");
}

async function ensureThemes() {
  const count = await prisma.seasonalTheme.count();
  if (count > 0) return;

  await prisma.seasonalTheme.create({
    data: {
      key: "default",
      name: "Default",
      isActive: true,
      config: JSON.stringify({ bodyClass: "theme-default" }),
    },
  });
  console.log("[ensure-content] Default theme seeded");
}

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn("[ensure-content] ADMIN_EMAIL/ADMIN_PASSWORD not set — skip admin upsert");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Site Owner" },
    create: { email, passwordHash, name: "Site Owner" },
  });
  console.log(`[ensure-content] Admin ready: ${email}`);
}

async function main() {
  await ensureGallery();
  await ensurePrices();
  await ensureStaff();
  await ensureThemes();
  await ensureAdmin();
}

main()
  .catch((error) => {
    console.error("[ensure-content] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
