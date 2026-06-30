import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const staff = await prisma.staffMember.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json(
    staff.map((member) => ({
      ...member,
      specialties: JSON.parse(member.specialties) as string[],
    }))
  );
}
