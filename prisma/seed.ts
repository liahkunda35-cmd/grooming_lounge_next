import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  BARBER_SERVICE_LABELS,
  SALON_SERVICE_LABELS,
} from "../lib/bookable-services-catalog";
import { GALLERY_CATALOG } from "../lib/gallery-catalog";

const prisma = new PrismaClient();

const categories = GALLERY_CATALOG;

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

const barberServices = [...BARBER_SERVICE_LABELS];

const salonServices = [...SALON_SERVICE_LABELS];

const themes = [
  {
    key: "default",
    name: "Default",
    isActive: true,
    config: JSON.stringify({ bodyClass: "theme-default" }),
  },
  {
    key: "christmas",
    name: "Christmas",
    isActive: false,
    startsAt: new Date("2025-12-01"),
    endsAt: new Date("2026-01-05"),
    config: JSON.stringify({
      snowEffect: true,
      decoIcons: ["🎄", "❄️", "✨"],
      announcement: "Season's Greetings from Grooming Lounge!",
      accentColor: "#c41e3a",
      bodyClass: "theme-christmas",
    }),
  },
  {
    key: "new-year",
    name: "New Year",
    isActive: false,
    startsAt: new Date("2025-12-28"),
    endsAt: new Date("2026-01-10"),
    config: JSON.stringify({
      sparkleEffect: true,
      decoIcons: ["🎆", "✨", "🥂"],
      announcement: "Happy New Year from Grooming Lounge!",
      accentColor: "#d4a82a",
      bodyClass: "theme-new-year",
    }),
  },
  {
    key: "easter",
    name: "Easter",
    isActive: false,
    config: JSON.stringify({
      decoIcons: ["🐣", "🌸", "✨"],
      announcement: "Happy Easter from Grooming Lounge!",
      accentColor: "#9b8ec4",
      bodyClass: "theme-easter",
      sparkleEffect: true,
    }),
  },
  {
    key: "valentines",
    name: "Valentine's Day",
    isActive: false,
    startsAt: new Date("2026-02-01"),
    endsAt: new Date("2026-02-15"),
    config: JSON.stringify({
      heartsEffect: true,
      decoIcons: ["💕", "💖", "🌹"],
      announcement: "Share the love — Valentine's specials at Grooming Lounge!",
      accentColor: "#c2185b",
      bodyClass: "theme-valentines",
    }),
  },
  {
    key: "independence-day",
    name: "Independence Day",
    isActive: false,
    startsAt: new Date("2026-10-20"),
    endsAt: new Date("2026-10-26"),
    config: JSON.stringify({
      flagsEffect: true,
      decoIcons: ["🇿🇲", "🎉", "✨"],
      announcement: "Happy Independence Day from Grooming Lounge!",
      accentColor: "#2e7d32",
      bodyClass: "theme-independence",
    }),
  },
  {
    key: "black-friday",
    name: "Black Friday",
    isActive: false,
    startsAt: new Date("2026-11-28"),
    endsAt: new Date("2026-11-30"),
    config: JSON.stringify({
      confettiEffect: true,
      decoIcons: ["🛍️", "✨", "💰"],
      announcement: "Black Friday deals — limited time at Grooming Lounge!",
      accentColor: "#1a1a1a",
      bodyClass: "theme-black-friday",
    }),
  },
  {
    key: "mothers-day",
    name: "Mother's Day",
    isActive: false,
    startsAt: new Date("2026-05-01"),
    endsAt: new Date("2026-05-15"),
    config: JSON.stringify({
      heartsEffect: true,
      decoIcons: ["💐", "💖", "✨"],
      announcement: "Treat Mom — Mother's Day specials at Grooming Lounge!",
      accentColor: "#d81b60",
      bodyClass: "theme-mothers-day",
    }),
  },
  {
    key: "fathers-day",
    name: "Father's Day",
    isActive: false,
    startsAt: new Date("2026-06-10"),
    endsAt: new Date("2026-06-22"),
    config: JSON.stringify({
      decoIcons: ["👔", "✨", "🎁"],
      announcement: "Father's Day grooming packages at Grooming Lounge!",
      accentColor: "#1565c0",
      bodyClass: "theme-fathers-day",
      sparkleEffect: true,
    }),
  },
];

const announcements = [
  {
    title: "Christmas Promotion",
    message: "Special Christmas grooming packages — book early!",
    placement: "home",
    isEnabled: false,
    isPinned: true,
    sortOrder: 0,
  },
];

async function main() {
  await prisma.galleryItem.deleteMany();
  await prisma.galleryCategory.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.seasonalTheme.deleteMany();
  await prisma.staffMember.deleteMany();
  await prisma.bookableService.deleteMany();
  await prisma.siteSetting.deleteMany();

  for (const category of categories) {
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

  for (const [index, label] of barberServices.entries()) {
    await prisma.bookableService.create({
      data: { category: "barber", label, sortOrder: index },
    });
  }

  for (const [index, label] of salonServices.entries()) {
    await prisma.bookableService.create({
      data: { category: "hairdresser", label, sortOrder: index },
    });
  }

  for (const theme of themes) {
    await prisma.seasonalTheme.create({ data: theme });
  }

  for (const [index, announcement] of announcements.entries()) {
    await prisma.announcement.create({
      data: { ...announcement, sortOrder: announcement.sortOrder ?? index },
    });
  }

  await prisma.siteSetting.createMany({
    data: [
      { key: "hero_background", value: JSON.stringify("/background.png") },
      { key: "contact_phone", value: JSON.stringify("0761000376") },
      { key: "contact_email", value: JSON.stringify("groominglounge44@gmail.com") },
      { key: "whatsapp_number", value: JSON.stringify("260761000376") },
    ],
  });

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding the admin user.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Site Owner" },
    create: { email, passwordHash, name: "Site Owner" },
  });

  console.log("Database seeded successfully.");
  console.log(`Admin login: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
