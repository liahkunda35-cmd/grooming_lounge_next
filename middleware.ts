import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth-session";

const PUBLIC_ADMIN_API = new Set(["/api/admin/login", "/api/admin/logout"]);
const LOGIN_PATH = "/login";

function withNoStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  response.headers.set("Pragma", "no-cache");
  return response;
}

function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL(LOGIN_PATH, request.url);
  if (pathname !== "/admin") {
    loginUrl.searchParams.set("next", pathname);
  }
  return clearSessionCookie(withNoStore(NextResponse.redirect(loginUrl)));
}

/**
 * True when this looks like a fresh visit to admin (typed URL, bookmark,
 * link from the public site, or external site) — not an in-admin click or refresh.
 */
function isFreshAdminVisit(request: NextRequest) {
  const fetchMode = request.headers.get("sec-fetch-mode");
  const fetchSite = request.headers.get("sec-fetch-site");

  // Non-navigation requests (RSC prefetch, assets) keep the session
  if (fetchMode && fetchMode !== "navigate") {
    return false;
  }

  // Typed URL / bookmark / new tab
  if (fetchSite === "none" || fetchSite === "cross-site") {
    return true;
  }

  const referer = request.headers.get("referer");
  if (!referer) {
    // No referer on a document navigation → treat as a new visit
    return fetchMode === "navigate" || !fetchMode;
  }

  try {
    const ref = new URL(referer);
    if (ref.origin !== request.nextUrl.origin) {
      return true;
    }
    const fromAdmin = ref.pathname.startsWith("/admin");
    const fromLogin = ref.pathname === LOGIN_PATH || ref.pathname === "/admin/login";
    // Coming from public pages (home, services, etc.) → must sign in again
    return !fromAdmin && !fromLogin;
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    if (pathname.startsWith("/uploads/")) {
      const subpath = pathname.slice("/uploads/".length);
      return NextResponse.rewrite(new URL(`/api/uploads/${subpath}`, request.url));
    }

    const isLoginPage = pathname === LOGIN_PATH || pathname === "/admin/login";
    const isAdminPage = pathname.startsWith("/admin");
    const isAdminApi =
      pathname.startsWith("/api/admin") && !PUBLIC_ADMIN_API.has(pathname);

    if (!isLoginPage && !isAdminPage && !isAdminApi) {
      return NextResponse.next();
    }

    // Login page: always clear any old session so credentials are required
    if (isLoginPage) {
      return clearSessionCookie(withNoStore(NextResponse.next()));
    }

    let session = null;
    try {
      const token = request.cookies.get(SESSION_COOKIE)?.value;
      session = token ? await verifySessionToken(token) : null;
    } catch (error) {
      console.error("Admin session verification failed in middleware:", error);
      session = null;
    }

    // Fresh visit to admin (from public site / bookmark / new tab) → force login
    if (isAdminPage && session && isFreshAdminVisit(request)) {
      return redirectToLogin(request, pathname);
    }

    if (!session) {
      if (isAdminApi) {
        return withNoStore(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        );
      }
      return redirectToLogin(request, pathname);
    }

    return withNoStore(NextResponse.next());
  } catch (error) {
    console.error("Admin middleware error:", error);
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return redirectToLogin(request, pathname);
  }
}

export const config = {
  matcher: ["/uploads/:path*", "/login", "/admin", "/admin/:path*", "/api/admin/:path*"],
};
