"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Announcement = {
  id: string;
  title: string;
  message: string;
  isPinned: boolean;
};

export default function SiteAnnouncements() {
  const pathname = usePathname();
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setItems([]);
      document.body.classList.remove("has-site-announcements");
      return;
    }

    let cancelled = false;
    fetch(`/api/announcements?path=${encodeURIComponent(pathname ?? "/")}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          if (data.length) {
            document.body.classList.add("has-site-announcements");
          } else {
            document.body.classList.remove("has-site-announcements");
          }
        }
      });

    return () => {
      cancelled = true;
      document.body.classList.remove("has-site-announcements");
    };
  }, [pathname]);

  if (!items.length) return null;

  return (
    <div className="site-announcements" role="region" aria-label="Announcements">
      {items.map((item) => (
        <div
          key={item.id}
          className={`site-announcement${item.isPinned ? " site-announcement--pinned" : ""}`}
        >
          <div className="container site-announcement__inner">
            <strong>{item.title}</strong>
            <span>{item.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
