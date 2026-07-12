import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "gl_admin_session";
/** Absolute session lifetime (seconds). Active users are also limited by idle timeout. */
export const SESSION_MAX_AGE = 60 * 60 * 8;

export type SessionPayload = {
  email: string;
  role: string;
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (typeof payload.email !== "string" || payload.role !== "admin") {
      return null;
    }
    return { email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
