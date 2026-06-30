import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllGalleryCategories } from "@/lib/gallery";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const categorySchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  section: z.enum(["barbershop", "salon"]),
  layout: z.string().optional(),
  sortOrder: z.number().optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const categories = await getAllGalleryCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid category data" }, { status: 400 });
  }

  const category = await prisma.galleryCategory.create({
    data: {
      slug: parsed.data.slug,
      name: parsed.data.name,
      section: parsed.data.section,
      layout: parsed.data.layout ?? "grid",
      sortOrder: parsed.data.sortOrder ?? 0,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
