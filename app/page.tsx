import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getHeroBannerUrl } from "@/lib/hero-banner";

export const metadata: Metadata = {
  title: "Grooming Lounge | Premium Barbershop & Salon",
  description:
    "Grooming Lounge — premium barbershop and salon at Munaro Plaza & Ibex Hub, Lusaka.",
};

export default async function Page() {
  const heroImageUrl = await getHeroBannerUrl();
  return <HomePage heroImageUrl={heroImageUrl} />;
}
