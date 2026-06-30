import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const extraThemes = [
  {
    key: "valentines",
    name: "Valentine's Day",
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

async function main() {
  await prisma.seasonalTheme.deleteMany({ where: { key: "halloween" } });

  for (const theme of extraThemes) {
    await prisma.seasonalTheme.upsert({
      where: { key: theme.key },
      update: {
        name: theme.name,
        config: theme.config,
        startsAt: theme.startsAt,
        endsAt: theme.endsAt,
      },
      create: { ...theme, isActive: false },
    });
  }

  const announcementCount = await prisma.announcement.count();
  if (announcementCount === 0) {
    await prisma.announcement.createMany({
      data: [
        {
          title: "Weekend Special",
          message: "20% off all haircuts this weekend.",
          placement: "all",
          isEnabled: true,
          isPinned: false,
          sortOrder: 1,
        },
      ],
    });
  }

  console.log("Themes and sample announcements ensured.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
