import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const themes = await prisma.seasonalTheme.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(themes);
}

const themePatchSchema = z.object({
  id: z.string(),
  isActive: z.boolean().optional(),
  config: z.string().optional(),
  startsAt: z.string().nullable().optional(),
  endsAt: z.string().nullable().optional(),
});

const themeCreateSchema = z.object({
  key: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  config: z.string(),
  startsAt: z.string().nullable().optional(),
  endsAt: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = themeCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid theme data" }, { status: 400 });
  }

  const existing = await prisma.seasonalTheme.findUnique({
    where: { key: parsed.data.key },
  });
  if (existing) {
    return NextResponse.json({ error: "Theme key already exists" }, { status: 409 });
  }

  const theme = await prisma.seasonalTheme.create({
    data: {
      key: parsed.data.key,
      name: parsed.data.name,
      config: parsed.data.config,
      isActive: false,
      startsAt: parsed.data.startsAt ? new Date(parsed.data.startsAt) : null,
      endsAt: parsed.data.endsAt ? new Date(parsed.data.endsAt) : null,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json(theme, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = themePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid theme data" }, { status: 400 });
  }

  if (parsed.data.isActive) {
    await prisma.seasonalTheme.updateMany({
      where: { id: { not: parsed.data.id } },
      data: { isActive: false },
    });
  }

  const data: {
    isActive?: boolean;
    config?: string;
    startsAt?: Date | null;
    endsAt?: Date | null;
  } = {};

  if (parsed.data.isActive !== undefined) data.isActive = parsed.data.isActive;
  if (parsed.data.config !== undefined) data.config = parsed.data.config;
  if (parsed.data.startsAt !== undefined) {
    data.startsAt = parsed.data.startsAt ? new Date(parsed.data.startsAt) : null;
  }
  if (parsed.data.endsAt !== undefined) {
    data.endsAt = parsed.data.endsAt ? new Date(parsed.data.endsAt) : null;
  }

  const theme = await prisma.seasonalTheme.update({
    where: { id: parsed.data.id },
    data,
  });

  revalidatePath("/", "layout");
  return NextResponse.json(theme);
}

const themeDeleteSchema = z.object({
  id: z.string(),
});

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = themeDeleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid theme data" }, { status: 400 });
  }

  const existing = await prisma.seasonalTheme.findUnique({
    where: { id: parsed.data.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 });
  }

  if (existing.key === "default") {
    return NextResponse.json({ error: "The default theme cannot be deleted" }, { status: 400 });
  }

  if (existing.isActive) {
    const defaultTheme = await prisma.seasonalTheme.findFirst({
      where: { key: "default" },
    });
    if (defaultTheme) {
      await prisma.seasonalTheme.updateMany({ data: { isActive: false } });
      await prisma.seasonalTheme.update({
        where: { id: defaultTheme.id },
        data: { isActive: true },
      });
    }
  }

  await prisma.seasonalTheme.delete({ where: { id: parsed.data.id } });

  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
