import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "@/app/_lib/rate-limit";

const CONFIG = {
  AUTH: {
    LOGIN: "/login",
    PROTECTED: ["/dashboard", "/admin", "/profile"],
    PUBLIC_ONLY: ["/login", "/register"],
  },
  API: {
    ALLOWED_ORIGIN:
      process.env.NODE_ENV === "production"
        ? "https://yourdomain.com"
        : "http://localhost:3000",
  },
};

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": CONFIG.API.ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (
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

  const token = request.cookies.get("_token")?.value;
  const userRole = request.cookies.get("_role")?.value;

  const isProtected = CONFIG.AUTH.PROTECTED.some((p) => pathname.startsWith(p));
  const isPublicOnly = CONFIG.AUTH.PUBLIC_ONLY.some((p) =>
    pathname.startsWith(p),
  );

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = CONFIG.AUTH.LOGIN;
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url.toString());
  }

  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.rewrite(new URL("/403", request.nextUrl.origin));
  }

  if (isPublicOnly && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  const response = NextResponse.next();

  if (pathname.startsWith("/api")) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      CONFIG.API.ALLOWED_ORIGIN,
    );
  }

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
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
