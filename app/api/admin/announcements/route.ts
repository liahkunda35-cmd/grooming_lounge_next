import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const announcements = await prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(announcements);
}

const announcementSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  isEnabled: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  placement: z.enum(["all", "home", "book"]).optional(),
  startsAt: z.string().nullable().optional(),
  endsAt: z.string().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid announcement data" }, { status: 400 });
  }

  const announcement = await prisma.announcement.create({
    data: {
      title: parsed.data.title,
      message: parsed.data.message,
      isEnabled: parsed.data.isEnabled ?? true,
      isPinned: parsed.data.isPinned ?? false,
      placement: parsed.data.placement ?? "all",
      startsAt: parsed.data.startsAt ? new Date(parsed.data.startsAt) : null,
      endsAt: parsed.data.endsAt ? new Date(parsed.data.endsAt) : null,
      sortOrder: parsed.data.sortOrder ?? 0,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json(announcement, { status: 201 });
}
