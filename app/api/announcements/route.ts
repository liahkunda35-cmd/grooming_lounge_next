import { NextResponse } from "next/server";
import { getActiveAnnouncements } from "@/lib/announcements";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("path") ?? "/";

  const announcements = await getActiveAnnouncements(pathname);
  return NextResponse.json(announcements);
}
