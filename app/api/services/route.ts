import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category || category === "all") {
    const services = await prisma.bookableService.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    return NextResponse.json(services);
  }

  if (category !== "barber" && category !== "hairdresser") {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const services = await prisma.bookableService.findMany({
    where: { category, isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(services);
}
