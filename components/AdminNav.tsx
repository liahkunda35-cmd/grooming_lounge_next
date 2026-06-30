"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/hero", label: "Hero Banner" },
  { href: "/admin/about", label: "About Images" },
  { href: "/admin/themes", label: "Seasonal Themes" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/staff", label: "Staff Management" },
  { href: "/", label: "View Site", external: false },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={[
            "admin-nav__link",
            isActive(pathname, item.href) ? "admin-nav__link--active" : "",
            item.href === "/" ? "admin-nav__link--view-site" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...(item.href === "/" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
