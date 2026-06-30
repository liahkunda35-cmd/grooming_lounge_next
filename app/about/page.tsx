import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { getAboutImages } from "@/lib/about-images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Grooming Lounge — Lusaka's premium barbershop and salon.",
};

export default async function Page() {
  const images = await getAboutImages();
  return <AboutPage images={images} />;
}
