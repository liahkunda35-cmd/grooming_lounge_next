import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "Grooming Lounge | Premium Barbershop & Salon",
  description:
    "Grooming Lounge — premium barbershop and salon at Munaro Plaza & Ibex Hub, Lusaka.",
};

export default function Page() {
  return <HomePage />;
}
