import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import { BodyPageAttribute } from "@/components/BodyPageAttribute";
import "./globals.css";
import "./theme-decorations.css";
import "./seasonal-realistic.css";
import "./seasonal-premium.css";
import "./theme-reference.css";
import "./easter-theme.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Grooming Lounge | Premium Barbershop & Salon",
    template: "%s | Grooming Lounge",
  },
  description:
    "Grooming Lounge — premium barbershop and salon at Munaro Plaza & Ibex Hub, Lusaka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body data-page="index" className="page-loaded">
        <BodyPageAttribute />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
