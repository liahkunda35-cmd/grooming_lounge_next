import { redirect } from "next/navigation";
import AdminAppShell from "@/components/admin/AdminAppShell";
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
      <AdminAppShell
        email={session.email}
        initial={initial}
        logoutAction={logout}
        banner={<AdminSeasonalBanner />}
      >
        {children}
      </AdminAppShell>
    </div>
  );
}
