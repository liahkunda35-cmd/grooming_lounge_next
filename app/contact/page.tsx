import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Grooming Lounge — Munaro Plaza & Ibex Hub, Lusaka.",
};

export default function Page() {
  return <ContactPage />;
}
