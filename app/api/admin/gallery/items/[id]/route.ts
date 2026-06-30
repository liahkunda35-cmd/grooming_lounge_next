import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";

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

  if (item.mediaUrl.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", item.mediaUrl);
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

  const item = await prisma.galleryItem.update({
    where: { id },
    data: {
      caption: body.caption,
      altText: body.altText,
      overlayText: body.overlayText,
      badgeType: body.badgeType,
      isActive: body.isActive,
      sortOrder: body.sortOrder,
    },
  });

  revalidatePath("/services");

  return NextResponse.json(item);
}
