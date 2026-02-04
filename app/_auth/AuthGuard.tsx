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
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [pathname, router]);

  return <>{children}</>;
}
