import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "@/app/_lib/rate-limit"; // - Upstash Redis logic
/*
- NextRequest -> incoming request
-	NextResponse -> what you send back
-	ratelimit -> protects from spam / brute-force using Redis (Upstash)
*/

// ==========================================================
// 1. GLOBAL CONFIGURATION
// ==========================================================
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
/*
-	PROTECTED -> pages that need login
-	PUBLIC_ONLY -> pages that logged-in users should NOT see, but logout user can see
-	ALLOWED_ORIGIN -> which website is allowed to call your API (CORS)
*/

// - This function runs on EVERY request (that matches the matcher)
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  /*
	- pathname -> /dashboard, /api/users, etc.
	-	search -> ?page=1 etc.
	-	ip -> user IP for rate limiting
  */

  // ==========================================================
  // - STAGE 1: CORS PREFLIGHT (The Browser "Handshake")
  // ==========================================================
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": CONFIG.API.ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400", // - Cache for 24 hours
      },
    });
  }
  /*
  - When browser wants to call your API from another site, it first asks:
    - ❓ “Am I allowed?”
  - This responds:
    -	✅ Yes, allowed origin
    -	✅ Allowed methods, headers
    - ✅ Cache this decision for 24h
  - It saves them in the Response Headers of that specific request in the browser's memory
  */

  // ==========================================================
  // - STAGE 2: RATE LIMITING (Upstash Shield)
  // ==========================================================
  if (pathname.startsWith("/api") || pathname.startsWith("/login")) {
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "X-RateLimit-Reset": reset.toString() },
        },
      );
    }
  }
  /*
  - Protects:
    -	/api/*
    -	/login
	-	If someone spams:
	  -	❌ Block with 429 Too Many Requests
  - This saves you from:
    - ✅ brute force login
    - ✅ DDoS
    - ✅ bot attacks
  */

  // ==========================================================
  // - STAGE 3: AUTH & ROLE GUARDS (The Bouncer)
  // ==========================================================
  const token = request.cookies.get("_token")?.value;
  const userRole = request.cookies.get("_role")?.value; // - 'admin', 'user', etc.
  // - These are your login proof and role

  const isProtected = CONFIG.AUTH.PROTECTED.some((p) => pathname.startsWith(p));
  const isPublicOnly = CONFIG.AUTH.PUBLIC_ONLY.some((p) =>
    pathname.startsWith(p),
  );

  // - A. Auth Check, If user tries to open /dashboard without login → send to /login
  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = CONFIG.AUTH.LOGIN;
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url);
  }

  // - B. Role Check (Admin Only), If normal user tries to open /admin -> show 403 Forbidden
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.rewrite(new URL("/403", request.url)); // - rewrite = URL stays /admin but page shows /403
  }

  // - C. Logged-in users shouldn't see Login page, If already logged in and tries to open /login → send to dashboard
  if (isPublicOnly && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ==========================================================
  // - STAGE 4: RESPONSE & HEADERS
  // ==========================================================
  const response = NextResponse.next(); // - Means: “OK, continue to page, but I will modify headers & cookies”

  // - A. CORS Response Headers
  if (pathname.startsWith("/api")) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      CONFIG.API.ALLOWED_ORIGIN,
    );
  }
  // - This tells the browser: “Only this website is allowed to call my API”

  // - B. Security Headers
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
  /*
  - 🧠 These protect from:
    -	❌ XSS (Cross‑Site Scripting) -> Hacker injects bad JavaScript into your website
    -	❌ Clickjacking -> User thinks clicking “Play” → actually clicks “Delete account” or “Send money”
    -	❌ MIME sniffing -> Hacker uploads a file that looks like image but is actually JS
    -	❌ Insecure HTTP -> Data is sent without lock 🔓 (no HTTPS). Hacker reads your internet messages
  */

  // - C. i18n Fallback
  if (!request.cookies.has("NEXT_LOCALE")) {
    const lang =
      request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
      "en";
    response.cookies.set("NEXT_LOCALE", lang, { path: "/", maxAge: 31536000 });
  }
  /*
  - If user has no language set:
    -	Detect from browser
    -	Save it for 1 year
  */

  return response; // - Finally! Request continues to page/API with security + rules applied
}

// ==========================================================
// - 5. MATCHER (Optimized Filter)
// ==========================================================
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
/*
- This middleware runs on:
	- ✅ Pages
	- ✅ APIs
- But NOT on:
	-	❌ images
	-	❌ static files
	-	❌ Next.js internal files
- Middleware only runs where needed -> faster app & less CPU/memory usage
*/

/*
- LSS:
  - The Network Bouncer: It acts as the "first line of defense," stopping bad traffic with rate-limiting and enforcing security rules before the request even reaches your pages
  - Real-Time Logic: It handles dynamic tasks like checking user cookies, redirecting unauthorized users, and injecting security headers that protect against hackers
  - Speed Optimization: By using a strict "Matcher," it only runs where needed, ensuring that static files and images load instantly without overhead
*/
