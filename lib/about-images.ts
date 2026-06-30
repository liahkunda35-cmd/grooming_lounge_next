import { readFile } from "fs/promises";
import path from "path";
import { deleteManagedUpload, saveOptimizedImage, writeJsonFile } from "@/lib/image-optimize";

const DATA_PATH = path.join(process.cwd(), "data", "about-images.json");

export const ABOUT_IMAGE_SLOTS = [
  {
    key: "story_primary",
    label: "About Story — Primary Image",
    description: "Large image in the about story section.",
    defaultUrl: "/shop2.jpg",
  },
  {
    key: "story_secondary",
    label: "About Story — Secondary Image",
    description: "Smaller accent image beside the primary photo.",
    defaultUrl: "/background.png",
  },
  {
    key: "branch_munaro",
    label: "Munaro Branch",
    description: "Branch card image for the Munaro location.",
    defaultUrl: "/munaro.jpg",
  },
  {
    key: "branch_ibex",
    label: "Ibex Hub Branch",
    description: "Branch card image for the Ibex Hub location.",
    defaultUrl: "/chopies.jpg",
  },
] as const;

export type AboutImageKey = (typeof ABOUT_IMAGE_SLOTS)[number]["key"];

export type AboutImageRecord = {
  url: string;
  updatedAt: string;
};

export type AboutImagesState = Record<AboutImageKey, AboutImageRecord>;

type StoredAboutImages = {
  images: Partial<Record<AboutImageKey, AboutImageRecord>>;
};

function getDefaultState(): AboutImagesState {
  const images = {} as AboutImagesState;
  for (const slot of ABOUT_IMAGE_SLOTS) {
    images[slot.key] = { url: slot.defaultUrl, updatedAt: "" };
  }
  return images;
}

export async function getAboutImages(): Promise<AboutImagesState> {
  const defaults = getDefaultState();

  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(raw) as StoredAboutImages;
    for (const slot of ABOUT_IMAGE_SLOTS) {
      const stored = data.images?.[slot.key];
      if (stored?.url) {
        defaults[slot.key] = {
          url: stored.url,
          updatedAt: stored.updatedAt || "",
        };
      }
    }
  } catch {
    /* use defaults */
  }

  return defaults;
}

async function persistAboutImages(images: AboutImagesState) {
  const payload: StoredAboutImages = { images };
  await writeJsonFile(DATA_PATH, payload);
}

export async function replaceAboutImage(key: AboutImageKey, file: File) {
  const slot = ABOUT_IMAGE_SLOTS.find((item) => item.key === key);
  if (!slot) throw new Error("Invalid image slot.");

  const current = await getAboutImages();
  const previousUrl = current[key]?.url;

  const imageUrl = await saveOptimizedImage(file, "about");
  const updatedAt = new Date().toISOString();

  current[key] = { url: imageUrl, updatedAt };
  await persistAboutImages(current);

  if (previousUrl && previousUrl !== slot.defaultUrl) {
    await deleteManagedUpload(previousUrl);
  }

  return current[key];
}

export async function resetAboutImage(key: AboutImageKey) {
  const slot = ABOUT_IMAGE_SLOTS.find((item) => item.key === key);
  if (!slot) throw new Error("Invalid image slot.");

  const current = await getAboutImages();
  const previousUrl = current[key]?.url;

  current[key] = { url: slot.defaultUrl, updatedAt: new Date().toISOString() };
  await persistAboutImages(current);

  if (previousUrl && previousUrl !== slot.defaultUrl) {
    await deleteManagedUpload(previousUrl);
  }

  return current[key];
}

export function getAboutImageUrl(images: AboutImagesState, key: AboutImageKey) {
  return images[key]?.url || ABOUT_IMAGE_SLOTS.find((s) => s.key === key)!.defaultUrl;
}
