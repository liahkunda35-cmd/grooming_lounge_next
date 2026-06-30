"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import DecoLayer, { pathnameToPageKey } from "./DecoLayer";
import SiteScripts from "./SiteScripts";
import SiteAnnouncements from "./SiteAnnouncements";
import SeasonalGreeting from "./SeasonalGreeting";
import SeasonalThemeProvider from "./SeasonalThemeProvider";
import PreFooterThanks from "./PreFooterThanks";
import DeveloperCredit from "./DeveloperCredit";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageKey = pathnameToPageKey(pathname);

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={null}>
      <SeasonalThemeProvider>
        <DecoLayer page={pageKey} />
        <SiteAnnouncements />
        <Navbar />
        <SeasonalGreeting />
        {children}
        <PreFooterThanks />
        <DeveloperCredit />
        <Footer />
        <WhatsAppFloat />
        <Suspense fallback={null}>
          <SiteScripts />
        </Suspense>
      </SeasonalThemeProvider>
    </Suspense>
  );
}
