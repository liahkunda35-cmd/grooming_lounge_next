import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.staffMember.delete({ where: { id } });
  revalidatePath("/book");
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

  const member = await prisma.staffMember.update({
    where: { id },
    data: {
      name: body.name,
      title: body.title,
      category: body.category,
      rating: body.rating,
      photoUrl: body.photoUrl,
      isActive: body.isActive,
      specialties: body.specialties ? JSON.stringify(body.specialties) : undefined,
    },
  });

  revalidatePath("/book");

  return NextResponse.json(member);
}
