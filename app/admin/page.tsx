import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getActiveTheme } from "@/lib/themes";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [galleryCount, staffCount, announcementCount, liveTheme] = await Promise.all([
    prisma.galleryItem.count(),
    prisma.staffMember.count(),
    prisma.announcement.count(),
    getActiveTheme(),
  ]);

  const activeThemeName =
    liveTheme && liveTheme.key !== "default" ? liveTheme.name : "Default";

  return (
    <div className="admin-grid admin-grid--2">
      <section className="admin-card">
        <h2 className="section__title">Welcome back</h2>
        <p className="section__desc">
          Manage your website content without editing code. Upload photos, activate seasonal themes, and update staff.
        </p>
      </section>

      <section className="admin-card">
        <h3>Quick Stats</h3>
        <ul className="service-info-list">
          <li><span>Gallery photos</span><strong>{galleryCount}</strong></li>
          <li><span>Staff members</span><strong>{staffCount}</strong></li>
          <li><span>Announcements</span><strong>{announcementCount}</strong></li>
          <li><span>Live theme</span><strong>{activeThemeName}</strong></li>
        </ul>
      </section>

      <section className="admin-card">
        <h3>Hero Banner</h3>
        <p>Update the large homepage hero image visitors see when they arrive.</p>
        <Link href="/admin/hero" className="btn btn--primary">Manage Hero Banner</Link>
      </section>

      <section className="admin-card">
        <h3>About Us Images</h3>
        <p>Upload, replace, or remove photos on the About page story and branch sections.</p>
        <Link href="/admin/about" className="btn btn--primary">Manage About Images</Link>
      </section>

      <section className="admin-card">
        <h3>Gallery</h3>
        <p>Upload, delete, and organize service photos by barbershop or salon category.</p>
        <Link href="/admin/gallery" className="btn btn--primary">Manage Gallery</Link>
      </section>

      <section className="admin-card">
        <h3>Seasonal Themes</h3>
        <p>Turn on Christmas, New Year, Easter, and other seasonal effects for your visitors.</p>
        <Link href="/admin/themes" className="btn btn--primary">Manage Themes</Link>
      </section>

      <section className="admin-card">
        <h3>Announcements</h3>
        <p>Post promotions, closures, and offers visible on the public website.</p>
        <Link href="/admin/announcements" className="btn btn--primary">Manage Announcements</Link>
      </section>

      <section className="admin-card">
        <h3>Staff</h3>
        <p>Update barbers and hairdressers shown on the booking page.</p>
        <Link href="/admin/staff" className="btn btn--primary">Manage Staff</Link>
      </section>
    </div>
  );
}
