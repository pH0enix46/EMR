import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /**
   * ==========================================================
   * 1. CORE ENGINE & SECURITY
   * ==========================================================
   * - reactStrictMode -> Deep checks for React bugs during dev
   * - poweredByHeader -> Removes "Next.js" tag from headers (Security)
   * - trailingSlash -> Standardizes URLs (/about vs /about/)
   * - output -> Optimizes build size for professional hosting
   * - compress -> Uses Gzip/Brotli to shrink file sizes
   */
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  output: "standalone",
  compress: true,

  // ==========================================================
  // 2. TYPESCRIPT & LINTING (The Quality Guards)
  // ==========================================================
  // - ignoreBuildErrors -> Set to FALSE to ensure production is 100% type-safe
  typescript: {
    ignoreBuildErrors: false,
  },

  // ==========================================================
  // 3. EXPERIMENTAL (Power Kit)
  // ==========================================================
  experimental: {
    // --- Performance & Styling ---
    useLightningcss: true, // - Fast CSS compiler (Rust-based)
    cssChunking: true, // - Breaks CSS into tiny, efficient pieces
    inlineCss: true, // - Injects critical CSS to stop "style flickering"

    // --- Routing & Navigation ---
    typedRoutes: true, // - Catches broken links/typos while coding
    viewTransition: true, // - Smooth "Mobile App" style page fades
    staleTimes: {
      // - How long the browser keeps data fresh
      dynamic: 30,
      static: 180,
    },

    // --- Developer Experience (DX) ---
    isolatedDevBuild: true, // - Only builds the page you are looking at
    serverComponentsHmrCache: true, // - Speeds up refreshes when editing server code
    turbopackFileSystemCacheForDev: true, // - Millisecond restarts for dev server
    turbopackFileSystemCacheForBuild: true, // - Fast local production builds

    // --- Security & Auth ---
    taint: true, // - Blocks "Secret" data from leaking to the browser
    authInterrupts: true, // - Enables modern forbidden() and unauthorized() logic

    // --- Modern Features ---

    // --- Smart Caching ---
    cacheLife: {
      // - Custom "Schedules" for your data
      blog: {
        stale: 3600, // - 1 hour
        revalidate: 60, // - Check every minute
        expire: 86400, // - Max 1 day
      },
    },
    expireTime: 3600, // - Safety net for server cache (1 hour)
  },

  // ==========================================================
  // 4. SERVER & DATABASE OPTIMIZATION
  // ==========================================================
  // - serverExternalPackages -> Keeps heavy DB drivers out of the client bundle
  serverExternalPackages: ["@prisma/client", "pino"],
  cacheComponents: true, // - Advanced component-level caching
  reactCompiler: true, // - Auto-optimizes React components (no useMemo needed)

  // ==========================================================
  // 5. IMAGE OPTIMIZATION (Google PageSpeed Secret)
  // ==========================================================
  images: {
    formats: ["image/avif", "image/webp"], // - AVIF is the smallest/fastest format
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // - Allows all secure images safely (like: images.unsplash.com)
      },
    ],
  },

  // ==========================================================
  // 6. DEV TOOLS & LOGGING
  // ==========================================================
  logging: {
    fetches: { fullUrl: true }, // - Shows all API calls in your terminal
  },

  // ==========================================================
  // 7. URL MANAGEMENT (SEO & Masking)
  // ==========================================================
  async redirects() {
    return [
      {
        // - If someone visits /home, they are permanently redirected to / (good for SEO)
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        // - Visiting /external-api/photos in your app secretly fetches https://api.unsplash.com/photos but the URL still shows /external-api/photos
        source: "/external-api/:path*",
        destination: "https://api.unsplash.com/:path*",
      },
    ];
  },
};
export default nextConfig;
