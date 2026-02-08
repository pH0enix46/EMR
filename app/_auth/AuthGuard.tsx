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

      // If authenticated and trying to access login page
      if (isAuthenticated() && pathname === "/login") {
        const userStr = localStorage.getItem("emr_auth_user");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            if (user.role === "superadmin") {
              router.push("/superadmin/dashboard");
            } else {
              router.push("/medical/dashboard");
            }
          } catch {
            router.push("/medical/dashboard");
          }
        } else {
          router.push("/medical/dashboard");
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  return <>{children}</>;
}
