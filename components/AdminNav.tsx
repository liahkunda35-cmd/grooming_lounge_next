"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 4h7v7H4V4zm9 0h7v5h-7V4zM4 13h7v7H4v-7zm9-2h7v9h-7v-9z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm3 12 3.5-4.5 2.5 3 3.5-4.5L19 17H7z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/hero",
    label: "Hero Banner",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H7V9zm0 4h10v2H7v-2z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/about",
    label: "About Images",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/themes",
    label: "Seasonal Themes",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2 9 8H3l5 4-2 7 6-4 6 4-2-7 5-4h-6L12 2z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/announcements",
    label: "Announcements",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 6h11v9H8l-4 3V6zm15-1v14l-3-2v-10l3-2z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/staff",
    label: "Staff",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM2 19v-1c0-2.2 3.1-4 6-4s6 1.8 6 4v1H2zm12 0v-1c0-1.1.4-2.1 1.1-2.9A8.6 8.6 0 0 1 20 14c2.2 0 4 .7 4 2.5V19H14z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/prices",
    label: "Price Lists",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 4h10v2H7V4zm-2 4h14l-1.2 12.2A2 2 0 0 1 15.8 22H8.2a2 2 0 0 1-2-1.8L5 8zm4 3v7h2v-7H9zm4 0v7h2v-7h-2z"
        />
      </svg>
    ),
  },
  {
    href: "/",
    label: "View Site",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
        />
      </svg>
    ),
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-side-nav" aria-label="Admin navigation">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={[
            "admin-side-nav__link",
            isActive(pathname, item.href) ? "admin-side-nav__link--active" : "",
            item.href === "/" ? "admin-side-nav__link--external" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="admin-side-nav__icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
