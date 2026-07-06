"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import OptimizedImage from "@/components/OptimizedImage";

const navItems = [
  { href: "/", label: "Home", id: "home" },
  { href: "/services", label: "Services", id: "services" },
  { href: "/about", label: "About", id: "about" },
  { href: "/contact", label: "Contact", id: "contact" },
  { href: "/book", label: "Book Now", id: "book", cta: true },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar" id="navbar">
      <div className="container navbar__wrap">
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo" aria-label="Grooming Lounge Home">
            <OptimizedImage
              src="/logo.jpg"
              alt=""
              className="navbar__logo-img"
              width={44}
              height={44}
              sizes="44px"
              priority={pathname === "/"}
            />
            <span className="navbar__logo-text brand-name">
              Grooming Lounge<span className="brand-sub">Barbershop &amp; Salon</span>
            </span>
          </Link>

          <button
            className="nav-toggle"
            id="nav-toggle"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="main-nav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="navbar__nav" id="main-nav" aria-label="Main navigation">
            <ul className="navbar__list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={[
                      "navbar__link",
                      isActive(pathname, item.href) ? "navbar__link--active" : "",
                      item.cta ? "navbar__link--cta" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
