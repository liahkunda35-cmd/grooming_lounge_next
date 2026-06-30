import { NextResponse } from "next/server";
import { getHeroBannerSettings } from "@/lib/hero-banner";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getHeroBannerSettings();
  return NextResponse.json(settings);
}
