import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getActiveTheme } from "@/lib/themes";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [galleryCount, staffCount, announcementCount, liveTheme, categoryCount] =
    await Promise.all([
      prisma.galleryItem.count(),
      prisma.staffMember.count(),
      prisma.announcement.count(),
      getActiveTheme(),
      prisma.galleryCategory.count(),
    ]);

  const activeThemeName =
    liveTheme && liveTheme.key !== "default" ? liveTheme.name : "Default";

  const contentTotal = galleryCount + staffCount + announcementCount;
  const galleryShare = contentTotal ? Math.round((galleryCount / contentTotal) * 100) : 0;
  const staffShare = contentTotal ? Math.round((staffCount / contentTotal) * 100) : 0;
  const announcementShare = Math.max(0, 100 - galleryShare - staffShare);

  const metricCards = [
    {
      label: "Gallery photos",
      value: galleryCount,
      tone: "purple",
      icon: (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm3 12 3.5-4.5 2.5 3 3.5-4.5L19 17H7z"
          />
        </svg>
      ),
    },
    {
      label: "Staff members",
      value: staffCount,
      tone: "blue",
      icon: (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM2 19v-1c0-2.2 3.1-4 6-4s6 1.8 6 4v1H2z"
          />
        </svg>
      ),
    },
    {
      label: "Announcements",
      value: announcementCount,
      tone: "pink",
      icon: (
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 6h11v9H8l-4 3V6zm15-1v14l-3-2v-10l3-2z" />
        </svg>
      ),
    },
    {
      label: "Categories",
      value: categoryCount,
      tone: "orange",
      icon: (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
          />
        </svg>
      ),
    },
  ];

  const modules = [
    { href: "/admin/hero", title: "Hero Banner", desc: "Homepage hero image" },
    { href: "/admin/about", title: "About Images", desc: "Story & branch photos" },
    { href: "/admin/gallery", title: "Gallery", desc: `${galleryCount} media items` },
    { href: "/admin/themes", title: "Seasonal Themes", desc: `Live: ${activeThemeName}` },
    { href: "/admin/announcements", title: "Announcements", desc: `${announcementCount} posted` },
    { href: "/admin/staff", title: "Staff", desc: `${staffCount} team members` },
    { href: "/admin/prices", title: "Price Lists", desc: "Barbershop & salon prices" },
  ];

  const barHeights = [42, 58, 47, 72, 64, 81, 55, 68, 76, 60];

  return (
    <div className="admin-dash">
      <section className="admin-dash__metrics" aria-label="Key metrics">
        {metricCards.map((card) => (
          <article key={card.label} className={`admin-metric admin-metric--${card.tone}`}>
            <div>
              <p className="admin-metric__label">{card.label}</p>
              <p className="admin-metric__value">{card.value}</p>
            </div>
            <div className="admin-metric__icon" aria-hidden="true">
              {card.icon}
            </div>
          </article>
        ))}
      </section>

      <section className="admin-dash__mid">
        <article className="admin-panel admin-panel--growth">
          <p className="admin-panel__kicker">Content total</p>
          <p className="admin-panel__hero-number">{contentTotal.toLocaleString()}</p>
          <p className="admin-panel__hint">Gallery, staff & announcements combined</p>
          <div className="admin-bars" aria-hidden="true">
            {barHeights.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="admin-panel__foot">
            <span>Live theme</span>
            <strong>{activeThemeName}</strong>
          </div>
        </article>

        <article className="admin-panel admin-panel--stat">
          <p className="admin-panel__kicker">Staff on booking</p>
          <p className="admin-panel__hero-number">{staffCount}</p>
          <div className="admin-panel__badge" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM2 19v-1c0-2.2 3.1-4 6-4s6 1.8 6 4v1H2z"
              />
            </svg>
          </div>
        </article>

        <article className="admin-panel admin-panel--stat">
          <p className="admin-panel__kicker">Gallery media</p>
          <p className="admin-panel__hero-number">{galleryCount}</p>
          <div className="admin-panel__badge admin-panel__badge--alt" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm3 12 3.5-4.5 2.5 3 3.5-4.5L19 17H7z"
              />
            </svg>
          </div>
        </article>
      </section>

      <section className="admin-dash__bottom">
        <article className="admin-panel admin-panel--overview">
          <div className="admin-panel__head">
            <h2>Overview</h2>
            <div className="admin-range" aria-hidden="true">
              <span>1D</span>
              <span>5D</span>
              <span className="is-active">1M</span>
              <span>1Y</span>
              <span>Max</span>
            </div>
          </div>

          <svg className="admin-overview-chart" viewBox="0 0 640 220" role="img" aria-label="Content overview chart">
            <defs>
              <linearGradient id="adminCoralFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,140,122,0.35)" />
                <stop offset="100%" stopColor="rgba(255,140,122,0)" />
              </linearGradient>
            </defs>
            <path
              d="M0 150 C70 130, 110 90, 170 110 S270 180, 340 130 S450 60, 520 95 S600 150, 640 120 L640 220 L0 220 Z"
              fill="url(#adminCoralFill)"
            />
            <path
              d="M0 150 C70 130, 110 90, 170 110 S270 180, 340 130 S450 60, 520 95 S600 150, 640 120"
              fill="none"
              stroke="#ff8c7a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M0 170 C90 160, 130 120, 200 135 S310 190, 390 150 S510 80, 640 140"
              fill="none"
              stroke="#5b7cfa"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <ul className="admin-overview-stats">
            <li>
              <span>Gallery share</span>
              <strong>{galleryShare}%</strong>
            </li>
            <li>
              <span>Staff share</span>
              <strong>{staffShare}%</strong>
            </li>
            <li>
              <span>Announcements</span>
              <strong>{announcementShare}%</strong>
            </li>
            <li>
              <span>Live theme</span>
              <strong>{activeThemeName}</strong>
            </li>
          </ul>
        </article>

        <article className="admin-panel admin-panel--modules">
          <div className="admin-panel__head">
            <h2>Manage content</h2>
            <p>Open any section of your site</p>
          </div>
          <div className="admin-module-list">
            {modules.map((module) => (
              <Link key={module.href} href={module.href} className="admin-module-row">
                <div>
                  <strong>{module.title}</strong>
                  <span>{module.desc}</span>
                </div>
                <em aria-hidden="true">→</em>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
