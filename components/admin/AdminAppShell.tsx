"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import AdminIdleTimeout from "@/components/admin/AdminIdleTimeout";

type AdminAppShellProps = {
  email: string;
  initial: string;
  logoutAction: () => Promise<void>;
  banner: ReactNode;
  children: ReactNode;
};

export default function AdminAppShell({
  email,
  initial,
  logoutAction,
  banner,
  children,
}: AdminAppShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!navOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setNavOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [navOpen]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 861px)").matches) {
        setNavOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={`admin-app-frame${navOpen ? " admin-app-frame--nav-open" : ""}`}>
      <AdminIdleTimeout />
      <button
        type="button"
        className="admin-nav-backdrop"
        aria-label="Close menu"
        tabIndex={navOpen ? 0 : -1}
        onClick={() => setNavOpen(false)}
      />

      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="admin-sidebar__top">
          <Link
            href="/admin"
            className="admin-sidebar__brand"
            onClick={() => setNavOpen(false)}
          >
            <span className="admin-sidebar__mark">GL</span>
            <span className="admin-sidebar__brand-text">
              <strong>Grooming Lounge</strong>
              <small>Admin</small>
            </span>
          </Link>
          <button
            type="button"
            className="admin-sidebar__close"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          >
            ×
          </button>
        </div>

        <AdminNav onNavigate={() => setNavOpen(false)} />

        <form action={logoutAction} className="admin-sidebar__logout">
          <button type="submit">Logout</button>
        </form>
      </aside>

      <div className="admin-app">
        <header className="admin-topbar">
          <div className="admin-topbar__leading">
            <button
              type="button"
              className="admin-menu-btn"
              aria-label="Open menu"
              aria-expanded={navOpen}
              aria-controls="admin-sidebar"
              onClick={() => setNavOpen(true)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>

            <label className="admin-topbar__search">
              <span className="admin-topbar__search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm8.3 12.9 3.4 3.4-1.4 1.4-3.4-3.4 1.4-1.4z"
                  />
                </svg>
              </span>
              <input type="search" placeholder="Search..." aria-label="Search admin" disabled />
            </label>
          </div>

          <div className="admin-topbar__profile">
            <span className="admin-topbar__bell" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2z"
                />
              </svg>
            </span>
            <div className="admin-topbar__avatar" aria-hidden="true">
              {initial}
            </div>
            <div className="admin-topbar__user">
              <strong>Site Owner</strong>
              <span>{email}</span>
            </div>
          </div>
        </header>

        {banner}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
