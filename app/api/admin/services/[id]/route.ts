import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatServiceLabel } from "@/lib/bookable-services";
import { z } from "zod";

const updateSchema = z.object({
  category: z.enum(["barber", "hairdresser"]).optional(),
  name: z.string().trim().min(1).optional(),
  price: z.number().int().nonnegative().nullable().optional(),
  group: z.string().trim().min(1).optional(),
  description: z.string().trim().nullable().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid service data" }, { status: 400 });
  }

  const existing = await prisma.bookableService.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const name =
    parsed.data.name ??
    existing.label.replace(/\s*[—–-]\s*K\s*\d+\s*$/i, "").trim();
  const price =
    parsed.data.price !== undefined ? parsed.data.price : existing.price;

  const service = await prisma.bookableService.update({
    where: { id },
    data: {
      category: parsed.data.category ?? existing.category,
      group: parsed.data.group ?? existing.group,
      description:
        parsed.data.description !== undefined ? parsed.data.description : existing.description,
      label: formatServiceLabel(name, price),
      price,
      sortOrder: parsed.data.sortOrder ?? existing.sortOrder,
      isActive: parsed.data.isActive ?? existing.isActive,
    },
  });

  revalidatePath("/services");
  revalidatePath("/book");

  return NextResponse.json(service);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.bookableService.delete({ where: { id } });

  revalidatePath("/services");
  revalidatePath("/book");

  return NextResponse.json({ success: true });
}
