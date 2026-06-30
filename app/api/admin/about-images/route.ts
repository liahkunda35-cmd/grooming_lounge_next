import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  ABOUT_IMAGE_SLOTS,
  getAboutImages,
  replaceAboutImage,
  resetAboutImage,
  type AboutImageKey,
} from "@/lib/about-images";

export const dynamic = "force-dynamic";

function isValidKey(key: string): key is AboutImageKey {
  return ABOUT_IMAGE_SLOTS.some((slot) => slot.key === key);
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const images = await getAboutImages();
  return NextResponse.json({ slots: ABOUT_IMAGE_SLOTS, images });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const key = String(formData.get("key") || "");
  const file = formData.get("file");

  if (!isValidKey(key)) {
    return NextResponse.json({ error: "Invalid image slot." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  try {
    const record = await replaceAboutImage(key, file);
    revalidatePath("/about");
    return NextResponse.json({
      key,
      ...record,
      message: "About page image updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") || "";

  if (!isValidKey(key)) {
    return NextResponse.json({ error: "Invalid image slot." }, { status: 400 });
  }

  try {
    const record = await resetAboutImage(key);
    revalidatePath("/about");
    return NextResponse.json({
      key,
      ...record,
      message: "Image reset to default.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed." },
      { status: 400 }
    );
  }
}
