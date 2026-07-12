import fs from "fs";
import path from "path";

/**
 * Permanent app data root.
 * On Railway: mount a volume at /data (required for persistence).
 * Locally: <project>/data
 */
export function getDataRoot(): string {
  if (process.env.DATA_DIR) {
    return path.resolve(process.env.DATA_DIR);
  }

  const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
  if (onRailway) {
    return "/data";
  }

  return path.join(process.cwd(), "data");
}

export function getSqlitePath(): string {
  return path.join(getDataRoot(), "prod.db");
}

export function getUploadsDir(): string {
  return path.join(getDataRoot(), "uploads");
}

export function ensureDataDirectories() {
  fs.mkdirSync(getDataRoot(), { recursive: true });
  fs.mkdirSync(getUploadsDir(), { recursive: true });
}

export function resolveUploadedFilePath(mediaUrl: string): string | null {
  if (!mediaUrl.startsWith("/uploads/")) return null;
  const filename = mediaUrl.slice("/uploads/".length);
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return path.join(getUploadsDir(), filename);
}
