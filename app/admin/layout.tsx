import Link from "next/link";
import { redirect } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import AdminSeasonalBanner from "@/components/admin/AdminSeasonalBanner";
import { getSession, destroySession } from "@/lib/auth";

async function logout() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    return <div className="admin-shell">{children}</div>;
  }

  const initial = session.email.slice(0, 1).toUpperCase();

  return (
    <div className="admin-shell admin-shell--app">
      <div className="admin-app-frame">
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-sidebar__brand">
            <span className="admin-sidebar__mark">GL</span>
            <span className="admin-sidebar__brand-text">
              <strong>Grooming Lounge</strong>
              <small>Admin</small>
            </span>
          </Link>
          <AdminNav />
          <form action={logout} className="admin-sidebar__logout">
            <button type="submit">Logout</button>
          </form>
        </aside>

        <div className="admin-app">
          <header className="admin-topbar">
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
                <span>{session.email}</span>
              </div>
            </div>
          </header>

          <AdminSeasonalBanner />
          <main className="admin-main">{children}</main>
        </div>
      </div>
    </div>
  );
}
