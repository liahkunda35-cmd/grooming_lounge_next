import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import {
  SESSION_COOKIE,
  signSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "./auth-session";

export { SESSION_COOKIE, SESSION_MAX_AGE, verifySessionToken } from "./auth-session";
export type { SessionPayload } from "./auth-session";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(email: string) {
  const token = await signSessionToken(email);

  const cookieStore = await cookies();
  // Session cookie (no maxAge): closes with the browser so admins are not
  // kept signed in across visits. JWT still expires via SESSION_MAX_AGE.
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

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const admin = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });
  if (!admin) return false;
  return verifyPassword(password, admin.passwordHash);
}
