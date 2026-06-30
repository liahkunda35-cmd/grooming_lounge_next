"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initSiteScripts } from "@/lib/init-site-scripts";

export default function SiteScripts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    document.querySelectorAll("[data-lightbox-bound]").forEach((el) => {
      el.removeAttribute("data-lightbox-bound");
    });
    document.querySelectorAll(".reveal").forEach((el) => el.classList.remove("visible"));

    const barbersGrid = document.getElementById("barbers-grid");
    const hairdressersGrid = document.getElementById("hairdressers-grid");
    if (barbersGrid) barbersGrid.innerHTML = "";
    if (hairdressersGrid) hairdressersGrid.innerHTML = "";

    const cleanup = initSiteScripts(searchParams.toString());

    return () => {
      cleanup();
      document.getElementById("main-nav")?.classList.remove("active");
      document.getElementById("nav-toggle")?.classList.remove("active");
      document.getElementById("nav-toggle")?.setAttribute("aria-expanded", "false");
    };
  }, [pathname, searchParams]);

  return null;
}
