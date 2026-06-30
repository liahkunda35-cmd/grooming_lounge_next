import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 15 * 1024 * 1024;

function resolveImageType(file: File) {
  if (ALLOWED_IMAGE_TYPES.has(file.type)) return file.type;
  const ext = path.extname(file.name).toLowerCase();
  const byExt: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  return byExt[ext] ?? "";
}

export function validateImageFile(file: File) {
  if (!resolveImageType(file)) {
    throw new Error("Unsupported file type. Use JPG, JPEG, PNG, or WEBP.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File is too large. Maximum size is 15MB.");
  }
}

export async function saveOptimizedImage(file: File, subdir: string) {
  validateImageFile(file);

  const buffer = Buffer.from(await file.arrayBuffer());
  const outputDir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(outputDir, { recursive: true });

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.webp`;
  const outputPath = path.join(outputDir, filename);

  await sharp(buffer)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);

  return `/uploads/${subdir}/${filename}`;
}

export async function deleteManagedUpload(url: string) {
  const cleanUrl = url.split("?")[0];
  if (!cleanUrl.startsWith("/uploads/")) return;

  const filePath = path.join(process.cwd(), "public", cleanUrl.replace(/^\//, ""));
  try {
    await unlink(filePath);
  } catch {
    /* file may already be removed */
  }
}

export async function writeJsonFile(filePath: string, data: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
