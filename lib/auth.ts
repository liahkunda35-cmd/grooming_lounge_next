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

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(email: string) {
  const token = await signSessionToken(email);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
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
 * Keep the AdminUser row in sync with ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 * Railway/Supabase often never get a manual seed — without this, live login fails.
 */
export async function ensureAdminFromEnv() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    await prisma.adminUser.create({
      data: {
        email,
        passwordHash: await hashPassword(password),
        name: "Site Owner",
      },
    });
    return;
  }

  const matchesEnv = await verifyPassword(password, existing.passwordHash);
  if (!matchesEnv) {
    await prisma.adminUser.update({
      where: { email },
      data: { passwordHash: await hashPassword(password) },
    });
  }
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
