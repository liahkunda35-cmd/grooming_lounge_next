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

    let session = null;
    try {
      const token = request.cookies.get(SESSION_COOKIE)?.value;
      session = token ? await verifySessionToken(token) : null;
    } catch (error) {
      console.error("Admin session verification failed in middleware:", error);
      session = null;
    }

    // Always allow the login pages through (never auto-skip to dashboard)
    if (isLoginPage) {
      return withNoStore(NextResponse.next());
    }

    if (!session) {
      if (isAdminApi) {
        return withNoStore(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        );
      }

      const loginUrl = new URL(LOGIN_PATH, request.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("next", pathname);
      }
      return withNoStore(NextResponse.redirect(loginUrl));
    }

    return withNoStore(NextResponse.next());
  } catch (error) {
    console.error("Admin middleware error:", error);
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
}

export const config = {
  matcher: ["/uploads/:path*", "/login", "/admin", "/admin/:path*", "/api/admin/:path*"],
};
