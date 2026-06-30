import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  BARBER_SERVICE_LABELS,
  SALON_SERVICE_LABELS,
} from "../lib/bookable-services-catalog";

const prisma = new PrismaClient();

type GalleryItemSeed = {
  mediaUrl: string;
  caption?: string;
  altText?: string;
  overlayText?: string;
  badgeType?: string | null;
  mediaType?: string;
};

type CategorySeed = {
  slug: string;
  name: string;
  section: string;
  sortOrder: number;
  layout?: string;
  items: GalleryItemSeed[];
};

const categories: CategorySeed[] = [
  {
    slug: "adult-haircuts",
    name: "Adult Haircuts",
    section: "barbershop",
    sortOrder: 1,
    items: [
      { mediaUrl: "/haircut.jpeg", caption: "Adult Haircut", altText: "Adult haircut", overlayText: "Classic Cut", badgeType: "logo" },
      { mediaUrl: "/haircut2.jpeg", caption: "Adult Haircut", altText: "Adult haircut style", overlayText: "Styled Cut", badgeType: "logo" },
      { mediaUrl: "/haircut.png", caption: "Adult Haircut", altText: "Premium adult haircut", overlayText: "Premium Cut", badgeType: "logo" },
      { mediaUrl: "/haircut7.jpg", caption: "Adult Haircut", altText: "Adult haircut fade", overlayText: "Clean Fade", badgeType: "inspo" },
      { mediaUrl: "/haircut10.jpg", caption: "Adult Haircut", altText: "Adult haircut style", overlayText: "Sharp Look", badgeType: "inspo" },
      { mediaUrl: "/haircut25.jpg", caption: "Adult Haircut", altText: "Adult haircut", overlayText: "Modern Cut", badgeType: "inspo" },
      { mediaUrl: "/caucasian.jpg", caption: "Caucasian Haircut", altText: "Caucasian haircut", overlayText: "Caucasian Cut" },
    ],
  },
  {
    slug: "kids-haircuts",
    name: "Kids Haircuts",
    section: "barbershop",
    sortOrder: 2,
    items: [
      { mediaUrl: "/kidcut.jpeg", caption: "Kids Haircut", altText: "Kids haircut", overlayText: "Kids Cut", badgeType: "logo" },
      { mediaUrl: "/kidcut11.jpg", caption: "Kids Haircut", altText: "Kids haircut style", overlayText: "Young Gentleman", badgeType: "inspo" },
      { mediaUrl: "/kidcut12.jpg", caption: "Kids Haircut", altText: "Kids haircut", overlayText: "Kids Style" },
      { mediaUrl: "/kidcut13.jpg", caption: "Kids Haircut", altText: "Kids haircut fade", overlayText: "Kids Fade", badgeType: "logo" },
      { mediaUrl: "/kidcut20.jpeg", caption: "Kids Haircut", altText: "Kids haircut", overlayText: "Fresh Cut", badgeType: "logo" },
    ],
  },
  {
    slug: "womens-cuts",
    name: "Women's Cuts",
    section: "barbershop",
    sortOrder: 3,
    items: [
      { mediaUrl: "/womancut1.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Women's Style", badgeType: "inspo" },
      { mediaUrl: "/womancut2.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Elegant Cut", badgeType: "inspo" },
      { mediaUrl: "/womancut4.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Chic Style", badgeType: "inspo" },
      { mediaUrl: "/womancut5.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Precision Cut", badgeType: "inspo" },
      { mediaUrl: "/womancut22.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Women's Cut", badgeType: "inspo" },
    ],
  },
  {
    slug: "beard-trims",
    name: "Beard Trims & Shaving",
    section: "barbershop",
    sortOrder: 4,
    layout: "static",
    items: [
      { mediaUrl: "/bearedtrim.jpg", caption: "Beard Trim & Shape", altText: "Beard trim and shape", overlayText: "Beard Trim", badgeType: "inspo" },
      { mediaUrl: "/cutandbeardtrim.jpg", caption: "Cut & Beard Trim", altText: "Haircut and beard trim", overlayText: "Cut & Beard", badgeType: "inspo" },
    ],
  },
  {
    slug: "hair-coloring",
    name: "Hair Coloring",
    section: "barbershop",
    sortOrder: 5,
    layout: "single",
    items: [
      { mediaUrl: "/1781356260197.jpg", caption: "Hair Coloring", altText: "Hair coloring style", overlayText: "Colour Style" },
    ],
  },
  {
    slug: "braids",
    name: "Braids",
    section: "salon",
    sortOrder: 1,
    items: [
      { mediaUrl: "/braids2.jpeg", caption: "Boho Braids", altText: "Boho braids", overlayText: "Boho Braids", badgeType: "logo" },
      { mediaUrl: "/braids.jpeg", caption: "Fulani Braids", altText: "Fulani braids", overlayText: "Fulani Braids", badgeType: "logo" },
      { mediaUrl: "/braids3.jpeg", caption: "Cornrow Braids", altText: "Cornrow braids", overlayText: "Cornrows", badgeType: "logo" },
      { mediaUrl: "/mukule.jpeg", caption: "Cornrows with Natural Hair", altText: "Cornrows with natural hair", overlayText: "Mukule", badgeType: "logo" },
      { mediaUrl: "/braids4.jpeg", caption: "Copper Boho Braids", altText: "Copper boho braids", overlayText: "Copper Boho", badgeType: "logo" },
      { mediaUrl: "/braids5.jpeg", caption: "Short Boho Braids", altText: "Short boho braids", overlayText: "Short Boho", badgeType: "logo" },
      { mediaUrl: "/braids7.jpeg", caption: "Knotless Curly Ends", altText: "Knotless curly ends", overlayText: "Knotless", badgeType: "logo" },
      { mediaUrl: "/braids9.jpeg", caption: "Feed-in Braids", altText: "Feed-in braids", overlayText: "Feed-in", badgeType: "logo" },
      { mediaUrl: "/braids10.jpeg", caption: "Classic Box Braids", altText: "Classic box braids", overlayText: "Box Braids", badgeType: "logo" },
      { mediaUrl: "/fulani2.jpeg", caption: "Fulani Braids", altText: "Fulani braids style", overlayText: "Fulani", badgeType: "logo" },
      { mediaUrl: "/fulani.jpeg", caption: "Fulani Braids", altText: "Fulani braids", overlayText: "Fulani Style", badgeType: "logo" },
      { mediaUrl: "/stich4.jpeg", caption: "Stitch Braids", altText: "Stitch braids", overlayText: "Stitch Braids", badgeType: "logo" },
      { mediaUrl: "/stitchbraids2.jpeg", caption: "Stitch Braids", altText: "Stitch braids style", overlayText: "Stitch Style", badgeType: "logo" },
      { mediaUrl: "/stitchbraids.jpeg", caption: "Stitch Braids", altText: "Stitch braids", overlayText: "Stitch", badgeType: "logo" },
      { mediaUrl: "/knotless.jpeg", caption: "Knotless Braids", altText: "Knotless braids", overlayText: "Knotless", badgeType: "logo" },
      { mediaUrl: "/hairpeace.jpeg", caption: "Braids with Hair Piece", altText: "Braids with hair piece", overlayText: "Hair Piece", badgeType: "logo" },
    ],
  },
  {
    slug: "natural-hairstyles",
    name: "Natural Hairstyles",
    section: "salon",
    sortOrder: 2,
    items: [
      { mediaUrl: "/twist.jpeg", caption: "Natural Twist", altText: "Natural twist", overlayText: "Natural Twist", badgeType: "logo" },
      { mediaUrl: "/naturaltwist.jpeg", caption: "Natural Twist", altText: "Natural twist style", overlayText: "Twist Out", badgeType: "logo" },
      { mediaUrl: "/gelponytail.jpeg", caption: "Gel Ponytail", altText: "Gel ponytail", overlayText: "Gel Ponytail", badgeType: "logo" },
      { mediaUrl: "/ponytailx.jpg", caption: "Ponytail", altText: "Ponytail hairstyle", overlayText: "Ponytail" },
    ],
  },
  {
    slug: "kids-hairstyles",
    name: "Kids Hairstyles",
    section: "salon",
    sortOrder: 3,
    items: [
      { mediaUrl: "/kidhairstyle.jpeg", caption: "Kids Braids", altText: "Kids braids", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidhairstyle2.jpeg", caption: "Kids Braids", altText: "Kids braided style", overlayText: "Kids Style", badgeType: "logo" },
      { mediaUrl: "/kidbraids.jpeg", caption: "Kids Braids", altText: "Kids braids", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidbraids1.jpeg", caption: "Kids Braids", altText: "Kids braids style", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidstyle3.jpeg", caption: "Kids Braids", altText: "Kids hairstyle", overlayText: "Kids Style", badgeType: "logo" },
      { mediaUrl: "/kidstyle5.jpeg", caption: "Kids Braids", altText: "Kids braided hairstyle", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidstyle.jpeg", caption: "Kids Braids", altText: "Kids hairstyle", overlayText: "Kids Look", badgeType: "logo" },
      { mediaUrl: "/kidstyle10.jpeg", caption: "Kids Braids", altText: "Kids braids", overlayText: "Kids Braids", badgeType: "logo" },
    ],
  },
  {
    slug: "nails-manicure",
    name: "Nails & Manicure",
    section: "salon",
    sortOrder: 4,
    items: [
      { mediaUrl: "/goldennails.jpeg", caption: "Chrome Nails", altText: "Chrome gold nails", overlayText: "Chrome Nails", badgeType: "logo" },
      { mediaUrl: "/nails.jpeg", caption: "Chrome Nails", altText: "Nail art", overlayText: "Nail Art", badgeType: "logo" },
      { mediaUrl: "/nails5.jpeg", caption: "Chrome Nails", altText: "Chrome nails", overlayText: "Chrome", badgeType: "logo" },
      { mediaUrl: "/nails3.jpeg", caption: "Chrome Nails", altText: "Nail design", overlayText: "Nail Design", badgeType: "logo" },
      { mediaUrl: "/nails11.png", caption: "Acrylic Nails", altText: "Acrylic nails", overlayText: "Acrylic", badgeType: "logo" },
      { mediaUrl: "/nails12.png", caption: "Gel Nails", altText: "Gel nails", overlayText: "Gel Nails", badgeType: "logo" },
      { mediaUrl: "/nails13.png", caption: "Nail Art", altText: "Nail art design", overlayText: "Nail Art", badgeType: "logo" },
      { mediaUrl: "/nails14.png", caption: "Nail Design", altText: "Nail design", overlayText: "Design", badgeType: "logo" },
    ],
  },
  {
    slug: "pedicure-manicure",
    name: "Pedicure & Manicure",
    section: "salon",
    sortOrder: 5,
    layout: "static",
    items: [
      { mediaUrl: "/pedicurepic.jpeg", caption: "Pedicure", altText: "Pedicure service", overlayText: "Pedicure", badgeType: "logo" },
      { mediaUrl: "/pedicure.mp4", caption: "Pedicure Session", altText: "Pedicure service video", overlayText: "Pedicure Session", badgeType: "logo", mediaType: "video" },
    ],
  },
  {
    slug: "makeup",
    name: "Makeup",
    section: "salon",
    sortOrder: 6,
    items: [
      { mediaUrl: "/makeup.jpeg", caption: "Makeup", altText: "Makeup application", overlayText: "Makeup", badgeType: "logo" },
    ],
  },
  {
    slug: "hair-treatment",
    name: "Hair Treatment",
    section: "salon",
    sortOrder: 7,
    items: [
      { mediaUrl: "/steampod.jpeg", caption: "Steampod Treatment", altText: "Steampod hair treatment", overlayText: "Steampod", badgeType: "logo" },
      { mediaUrl: "/hairtreatment.jpg", caption: "Hair Treatment", altText: "Hair treatment", overlayText: "Hairwash and Massage", badgeType: "logo" },
    ],
  },
  {
    slug: "facial-treatment",
    name: "Facial Treatment",
    section: "salon",
    sortOrder: 8,
    layout: "media",
    items: [
      { mediaUrl: "/facial.mp4", caption: "Facial Treatment", altText: "Facial treatment", overlayText: "Facial Treatment", badgeType: "logo", mediaType: "video" },
    ],
  },
  {
    slug: "wig-installation",
    name: "Wig Installation",
    section: "salon",
    sortOrder: 9,
    layout: "static",
    items: [
      { mediaUrl: "/installation.jpeg", caption: "Wig Installation", altText: "Wig installation", overlayText: "Installation", badgeType: "logo" },
    ],
  },
];

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

  const email = process.env.ADMIN_EMAIL ?? "admin@groominglounge.com";
  const password = process.env.ADMIN_PASSWORD ?? "GroomingLounge2026!";
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
