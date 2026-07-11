# Grooming Lounge (Next.js)

Premium barbershop and salon website for Grooming Lounge, Lusaka — with an **admin panel** so you can manage photos and seasonal themes without editing code.

## Quick start

```bash
npm install
npm run db:setup
npm run dev
```

- **Website:** [http://localhost:3000](http://localhost:3000)
- **Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

## Admin login

Credentials come from env vars and are stored (hashed) in the database.

Set these in `.env` (local) and in Railway Variables (live):

```
ADMIN_EMAIL=admin@groominglounge.com
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=a-long-random-secret-string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
```

Use your **Supabase** (or Railway Postgres) connection string for `DATABASE_URL`.  
On the live site, login uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` from Railway — if you change the password in Variables, the next successful login setup will sync it automatically.

## What you can manage in admin

### Hero banner (`/admin/hero`)
- View the current homepage hero image
- Upload a replacement (JPG, PNG, or WEBP)
- Changes appear immediately on the homepage

### Gallery (`/admin/gallery`)
- Upload photos and videos to any service category (Barbershop or Salon)
- Delete photos you no longer want
- Changes appear immediately on the **Services** page

### Seasonal themes (`/admin/themes`)
- Activate **Christmas**, **New Year**, **Easter**, **Valentine's Day**, **Black Friday**, and more — or return to **Default**
- Preview a theme before going live (`Preview` opens the homepage with that theme)
- Set start/end dates for automatic scheduling
- Create custom seasonal themes without editing code
- Adds banners, decorations, snow/sparkle/hearts/confetti effects, and seasonal accent colors

### Announcements (`/admin/announcements`)
- Create, edit, delete, enable/disable promotions and notices
- Pin important announcements
- Set start/end dates and choose placement: all pages, homepage only, or booking page only

### Staff (`/admin/staff`)
- Add or remove barbers and hairdressers on the **Book** page
- Booking services list is also loaded from the database

## Database commands

```bash
npm run db:migrate   # Apply schema changes
npm run db:seed      # Seed gallery, staff, themes, admin user
npm run db:setup     # Migrate + seed (first-time setup)
```

## Project structure

- `app/` — Pages and API routes
- `app/admin/` — Owner admin panel
- `components/` — UI components
- `prisma/` — Database schema and seed data
- `public/uploads/` — Admin-uploaded photos and videos
- `lib/` — Database, auth, gallery, and theme helpers

## Production notes (Railway + Supabase)

1. In Supabase → **Project Settings → Database**, copy the **URI** connection string (use the pooler URI if offered).
2. In Railway → your web service → **Variables**, set:
   - `DATABASE_URL` = that Postgres URI (`?sslmode=require`)
   - `ADMIN_EMAIL` = `admin@groominglounge.com`
   - `ADMIN_PASSWORD` = your password (e.g. the one you set in Railway)
   - `SESSION_SECRET` = a long random string
3. Redeploy. Startup runs `prisma migrate deploy` (creates tables including `AdminUser`).
4. Open `https://www.groomingloungebs.com/admin/login` and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
5. Optional: run `npm run db:seed` once in a Railway shell if you want gallery/staff seed data in Postgres (the public site already has static gallery fallbacks).
6. Uploaded files in `public/uploads/` should be backed up or moved to cloud storage for production scale
