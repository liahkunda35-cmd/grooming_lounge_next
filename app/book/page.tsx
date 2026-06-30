import type { Metadata } from "next";
import BookPage from "@/components/pages/BookPage";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Book your appointment at Grooming Lounge, Munaro Plaza & Ibex Hub, Lusaka.",
};

export default function Page() {
  return <BookPage />;
}
