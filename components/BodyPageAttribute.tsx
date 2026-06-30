"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pathnameToPageKey } from "./DecoLayer";

export function BodyPageAttribute() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      document.body.dataset.page = "admin";
    } else {
      document.body.dataset.page = pathnameToPageKey(pathname);
    }
    document.body.classList.add("page-loaded");
  }, [pathname]);

  return null;
}
