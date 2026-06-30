import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { deleteManagedUpload, saveOptimizedImage } from "@/lib/image-optimize";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_PATH = path.join(DATA_DIR, "hero-banner.json");
export const DEFAULT_HERO_URL = "/background.png";

export type HeroBannerSettings = {
  imageUrl: string;
  updatedAt: string;
};

export async function getHeroBannerSettings(): Promise<HeroBannerSettings> {
  try {
    const raw = await readFile(SETTINGS_PATH, "utf-8");
    const data = JSON.parse(raw) as HeroBannerSettings;
    if (data?.imageUrl) return data;
  } catch {
    /* use default */
  }
  return { imageUrl: DEFAULT_HERO_URL, updatedAt: "" };
}

export async function getHeroBannerUrl(): Promise<string> {
  const settings = await getHeroBannerSettings();
  return settings.imageUrl || DEFAULT_HERO_URL;
}

export async function setHeroBannerUrl(imageUrl: string): Promise<HeroBannerSettings> {
  await mkdir(DATA_DIR, { recursive: true });
  const settings: HeroBannerSettings = {
    imageUrl,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
  return settings;
}

export async function saveHeroBannerFile(file: File): Promise<string> {
  const previous = await getHeroBannerSettings();
  const previousUrl = previous.imageUrl?.split("?")[0];

  const imageUrl = await saveOptimizedImage(file, "hero");
  await setHeroBannerUrl(imageUrl);

  if (previousUrl?.startsWith("/uploads/") && previousUrl !== imageUrl) {
    await deleteManagedUpload(previousUrl);
  }

  return imageUrl;
}
