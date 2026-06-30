import { NextResponse } from "next/server";
import { getGalleryBySection } from "@/lib/gallery";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  if (section !== "barbershop" && section !== "salon") {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const categories = await getGalleryBySection(section);
  return NextResponse.json(categories);
}
