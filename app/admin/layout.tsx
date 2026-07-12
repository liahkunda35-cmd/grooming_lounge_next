import { redirect } from "next/navigation";
import AdminAppShell from "@/components/admin/AdminAppShell";
import AdminSeasonalBanner from "@/components/admin/AdminSeasonalBanner";
import { getSession, destroySession } from "@/lib/auth";

async function logout() {
  "use server";
  await destroySession();
  redirect("/login");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null;
  try {
    session = await getSession();
  } catch (error) {
    console.error("Admin layout session error:", error);
    session = null;
  }

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
