import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const itemSchema = z.object({
  categoryId: z.string(),
  mediaUrl: z.string(),
  caption: z.string().optional(),
  altText: z.string().optional(),
  overlayText: z.string().optional(),
  badgeType: z.string().nullable().optional(),
  mediaType: z.string().optional(),
  sortOrder: z.number().optional(),
});

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = itemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid item data" }, { status: 400 });
  }

  const maxOrder = await prisma.galleryItem.aggregate({
    where: { categoryId: parsed.data.categoryId },
    _max: { sortOrder: true },
  });

  const item = await prisma.galleryItem.create({
    data: {
      categoryId: parsed.data.categoryId,
      mediaUrl: parsed.data.mediaUrl,
      caption: parsed.data.caption,
      altText: parsed.data.altText,
      overlayText: parsed.data.overlayText,
      badgeType: parsed.data.badgeType ?? null,
      mediaType: parsed.data.mediaType ?? "image",
      sortOrder: parsed.data.sortOrder ?? (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath("/services");

  return NextResponse.json(item, { status: 201 });
}
