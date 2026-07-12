import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { ensureDataDirectories, getUploadsDir } from "@/lib/data-paths";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
]);

function resolveFileType(file: File) {
  if (ALLOWED_TYPES.has(file.type)) return file.type;
  const ext = path.extname(file.name).toLowerCase();
  const byExt: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  };
  return byExt[ext] ?? "";
}

export async function saveUpload(file: File) {
  const fileType = resolveFileType(file);
  if (!fileType) {
    throw new Error("Unsupported file type. Use JPG, PNG, WEBP, GIF, or MP4.");
  }

  if (file.size > 25 * 1024 * 1024) {
    throw new Error("File is too large. Maximum size is 25MB.");
  }

  ensureDataDirectories();
  const uploadDir = getUploadsDir();
  await mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || (fileType.startsWith("video/") ? ".mp4" : ".jpg");
  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

export function isVideoUrl(url: string) {
  return /\.(mp4|webm)$/i.test(url);
}
