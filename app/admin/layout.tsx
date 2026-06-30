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

  return (
    <div className="admin-shell">
      {session ? (
        <header className="admin-header">
          <div className="admin-header__inner">
            <Link href="/admin" className="brand-name admin-header__brand">
              Grooming Lounge Admin
            </Link>
            <div className="admin-header__actions">
              <AdminNav />
              <form action={logout} className="admin-nav__logout">
                <button type="submit" className="btn btn--outline">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>
      ) : null}
      <main className="admin-main">
        {session ? <AdminSeasonalBanner /> : null}
        {children}
      </main>
    </div>
  );
}
