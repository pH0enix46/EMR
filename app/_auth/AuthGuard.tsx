"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/app/_auth/auth";

const PUBLIC_ROUTES = ["/login"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const isPublicRoute = PUBLIC_ROUTES.some((route) =>
        pathname.startsWith(route),
      );

      // If not authenticated and trying to access protected route
      if (!isAuthenticated() && !isPublicRoute) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }

      // If authenticated
      if (isAuthenticated()) {
        const userStr = localStorage.getItem("emr_auth_user");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);

            // 1. If at login page, redirect to appropriate home
            if (pathname === "/login") {
              if (user.role === "superadmin") {
                router.push("/superadmin/dashboard");
              } else {
                router.push("/medical/dashboard");
              }
              return;
            }

            // 2. Cross-access prevention
            if (
              user.role === "superadmin" &&
              (pathname.startsWith("/medical") || pathname === "/")
            ) {
              router.push("/superadmin/dashboard");
            } else if (
              user.role !== "superadmin" &&
              pathname.startsWith("/superadmin")
            ) {
              router.push("/medical/dashboard");
            }
          } catch {
            if (pathname === "/login") router.push("/medical/dashboard");
          }
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  return <>{children}</>;
}
