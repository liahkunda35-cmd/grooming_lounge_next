import { NextResponse } from "next/server";
import { getActiveTheme, getThemeByKey } from "@/lib/themes";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key) {
    const theme = await getThemeByKey(key);
    if (!theme) return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    return NextResponse.json(theme, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  const theme = await getActiveTheme();
  return NextResponse.json(theme, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
