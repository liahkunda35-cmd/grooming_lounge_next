import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "./auth-session";

export { SESSION_COOKIE, SESSION_MAX_AGE, verifySessionToken };
export type { SessionPayload };

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(email: string) {
  const token = await signSessionToken(email);

  const cookieStore = await cookies();
  // Browser session cookie (no maxAge): closing the browser requires login again.
  // Idle timeout + JWT expiry still limit active sessions.
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<SessionPayload | null> {
  return getSession();
}

/**
 * Keep AdminUser in sync with ADMIN_EMAIL / ADMIN_PASSWORD.
 * Railway often never runs seed, so env vars alone would never create a login.
 */
async function ensureAdminFromEnv() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing && (await verifyPassword(password, existing.passwordHash))) {
    return;
  }

  const passwordHash = await hashPassword(password);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Site Owner" },
    create: { email, passwordHash, name: "Site Owner" },
  });
}

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    await ensureAdminFromEnv();
  } catch (error) {
    console.error("Failed to sync admin credentials from env:", error);
  }

  const admin = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });
  if (!admin) return false;
  return verifyPassword(password, admin.passwordHash);
}
