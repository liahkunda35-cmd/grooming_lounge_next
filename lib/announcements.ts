import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "./prisma";

function isWithinSchedule(
  startsAt: Date | null,
  endsAt: Date | null,
  now: Date
) {
  const afterStart = !startsAt || startsAt <= now;
  const beforeEnd = !endsAt || endsAt >= now;
  return afterStart && beforeEnd;
}

export async function getActiveAnnouncements(pathname: string) {
  noStore();
  const now = new Date();

  if (pathname.startsWith("/admin")) return [];

  const announcements = await prisma.announcement.findMany({
    where: { isEnabled: true },
    orderBy: [{ isPinned: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return announcements.filter((item) => {
    if (
      item.title === "Weekend Special" &&
      item.message.toLowerCase().includes("20%")
    ) {
      return false;
    }

    if (!isWithinSchedule(item.startsAt, item.endsAt, now)) return false;
    if (item.placement === "all") return true;
    if (item.placement === "home" && pathname === "/") return true;
    if (item.placement === "book" && pathname === "/book") return true;
    return false;
  });
}
