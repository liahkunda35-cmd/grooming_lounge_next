import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const staffSchema = z.object({
  slug: z.string(),
  category: z.enum(["barber", "hairdresser"]),
  name: z.string(),
  title: z.string(),
  rating: z.number(),
  photoUrl: z.string().nullable().optional(),
  specialties: z.array(z.string()),
  isActive: z.boolean().optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const staff = await prisma.staffMember.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return NextResponse.json(
    staff.map((member) => ({ ...member, specialties: JSON.parse(member.specialties) }))
  );
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = staffSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid staff data" }, { status: 400 });

  const member = await prisma.staffMember.create({
    data: {
      ...parsed.data,
      specialties: JSON.stringify(parsed.data.specialties),
    },
  });

  revalidatePath("/book");

  return NextResponse.json(member, { status: 201 });
}
