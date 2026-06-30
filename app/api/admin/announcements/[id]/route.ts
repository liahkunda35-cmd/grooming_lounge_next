import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const announcementPatchSchema = z.object({
  title: z.string().min(1).optional(),
  message: z.string().min(1).optional(),
  isEnabled: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  placement: z.enum(["all", "home", "book"]).optional(),
  startsAt: z.string().nullable().optional(),
  endsAt: z.string().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const parsed = announcementPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid announcement data" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.message !== undefined) data.message = parsed.data.message;
  if (parsed.data.isEnabled !== undefined) data.isEnabled = parsed.data.isEnabled;
  if (parsed.data.isPinned !== undefined) data.isPinned = parsed.data.isPinned;
  if (parsed.data.placement !== undefined) data.placement = parsed.data.placement;
  if (parsed.data.sortOrder !== undefined) data.sortOrder = parsed.data.sortOrder;
  if (parsed.data.startsAt !== undefined) {
    data.startsAt = parsed.data.startsAt ? new Date(parsed.data.startsAt) : null;
  }
  if (parsed.data.endsAt !== undefined) {
    data.endsAt = parsed.data.endsAt ? new Date(parsed.data.endsAt) : null;
  }

  const announcement = await prisma.announcement.update({
    where: { id },
    data,
  });

  revalidatePath("/", "layout");
  return NextResponse.json(announcement);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.announcement.delete({ where: { id } });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
