import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatServiceLabel } from "@/lib/bookable-services";
import { z } from "zod";

const serviceSchema = z.object({
  category: z.enum(["barber", "hairdresser"]),
  name: z.string().trim().min(1, "Service name is required"),
  price: z.number().int().nonnegative().nullable().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await prisma.bookableService.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid service data" },
      { status: 400 },
    );
  }

  const { category, name, price, isActive } = parsed.data;
  const maxSort = await prisma.bookableService.aggregate({
    where: { category },
    _max: { sortOrder: true },
  });

  const service = await prisma.bookableService.create({
    data: {
      category,
      label: formatServiceLabel(name, price ?? null),
      price: price ?? null,
      sortOrder: parsed.data.sortOrder ?? (maxSort._max.sortOrder ?? -1) + 1,
      isActive: isActive ?? true,
    },
  });

  revalidatePath("/services");
  revalidatePath("/book");

  return NextResponse.json(service, { status: 201 });
}
