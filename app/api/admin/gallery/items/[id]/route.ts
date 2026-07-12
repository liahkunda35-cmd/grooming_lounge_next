import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import { resolveUploadedFilePath } from "@/lib/data-paths";
import { z } from "zod";

const updateSchema = z.object({
  caption: z.string().nullable().optional(),
  altText: z.string().nullable().optional(),
  overlayText: z.string().nullable().optional(),
  badgeType: z.string().nullable().optional(),
  mediaUrl: z.string().min(1).optional(),
  mediaType: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  categoryId: z.string().optional(),
});

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.galleryItem.delete({ where: { id } });

  const filePath = resolveUploadedFilePath(item.mediaUrl);
  if (filePath) {
    try {
      await unlink(filePath);
    } catch {
      /* file may already be gone */
    }
  }

  revalidatePath("/services");
  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid gallery data" }, { status: 400 });
  }

  const existing = await prisma.galleryItem.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const nextUrl = parsed.data.mediaUrl;
  if (nextUrl && nextUrl !== existing.mediaUrl) {
    const oldPath = resolveUploadedFilePath(existing.mediaUrl);
    if (oldPath) {
      try {
        await unlink(oldPath);
      } catch {
        /* ignore */
      }
    }
  }

  const item = await prisma.galleryItem.update({
    where: { id },
    data: {
      caption: parsed.data.caption !== undefined ? parsed.data.caption : existing.caption,
      altText: parsed.data.altText !== undefined ? parsed.data.altText : existing.altText,
      overlayText:
        parsed.data.overlayText !== undefined ? parsed.data.overlayText : existing.overlayText,
      badgeType: parsed.data.badgeType !== undefined ? parsed.data.badgeType : existing.badgeType,
      mediaUrl: nextUrl ?? existing.mediaUrl,
      mediaType: parsed.data.mediaType ?? existing.mediaType,
      isActive: parsed.data.isActive ?? existing.isActive,
      sortOrder: parsed.data.sortOrder ?? existing.sortOrder,
      categoryId: parsed.data.categoryId ?? existing.categoryId,
    },
  });

  revalidatePath("/services");
  return NextResponse.json(item);
}
