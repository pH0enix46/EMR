import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "@/app/_lib/rate-limit";
import { getSubdomain } from "@/app/_utils/subdomain";

const CONFIG = {
  AUTH: {
    LOGIN: "/login",
    PROTECTED: ["/dashboard", "/admin", "/profile", "/superadmin", "/medical"],
    PUBLIC_ONLY: ["/login", "/register"],
    SHARED: ["/login", "/register", "/403", "/404"],
  },
  API: {
    ALLOWED_ORIGIN:
      process.env.NODE_ENV === "production"
        ? "https://yourdomain.com"
        : "http://localhost:3000",
  },
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  // 1. SKIP FOR ASSETS (But NOT API)
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. RATE LIMITING (Production only)
  if (
    process.env.NODE_ENV === "production" &&
    (pathname.startsWith("/api") || pathname.startsWith("/login")) &&
    process.env.UPSTASH_REDIS_REST_URL
  ) {
    try {
      const { success, reset } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: "Too many requests" },
          {
            status: 429,
            headers: { "X-RateLimit-Reset": reset.toString() },
          },
        );
      }
    } catch (error) {
      console.error("Rate limit error:", error);
    }
  }

  // 3. AUTH LOGIC
  const token = request.cookies.get("_token")?.value;
  const userRole = request.cookies.get("_role")?.value;

  const isProtected = CONFIG.AUTH.PROTECTED.some((p) => pathname.startsWith(p));
  const isPublicOnly = CONFIG.AUTH.PUBLIC_ONLY.some((p) =>
    pathname.startsWith(p),
  );

  // Redirect to login if protected and no token
  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = CONFIG.AUTH.LOGIN;
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url.toString());
  }

  // Admin role check
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.rewrite(new URL("/403", request.url));
  }

  // Redirect to dashboard if public-only and logged in
  if (isPublicOnly && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. SUBDOMAIN ROUTING LOGIC
  const subdomain = getSubdomain(hostname);
  const isSharedPage = CONFIG.AUTH.SHARED.some((p) => pathname.startsWith(p));

  // If it's a subdomain (superadmin or other) or we are at /dashboard or /
  if (
    !isSharedPage &&
    (subdomain || pathname === "/dashboard" || pathname === "/")
  ) {
    // Prefix based on subdomain (default to /medical for other subdomains or plain localhost)
    const prefix = subdomain === "superadmin" ? "/superadmin" : "/medical";

    // Default root path to /dashboard
    const targetPath = pathname === "/" ? "/dashboard" : pathname;

    // Only rewrite if the path is not already prefixed
    if (!targetPath.startsWith(prefix)) {
      const url = new URL(`${prefix}${targetPath}${search}`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  // 5. DEFAULT RESPONSE WITH HEADERS
  const response = NextResponse.next();

  // CORS for API
  if (pathname.startsWith("/api")) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      CONFIG.API.ALLOWED_ORIGIN,
    );
  }

  // Security Headers
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );

  // Locale setting
  if (!request.cookies.has("NEXT_LOCALE")) {
    const lang =
      request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
      "en";
    response.cookies.set("NEXT_LOCALE", lang, { path: "/", maxAge: 31536000 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
