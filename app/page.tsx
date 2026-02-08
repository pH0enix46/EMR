"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Check for SuperAdmin Subdomain
    if (
      typeof window !== "undefined" &&
      window.location.host.startsWith("superadmin")
    ) {
      router.push("/superadmin/dashboard");
      return;
    }

    // 2. Check for SuperAdmin Role
    // (We need to import getCurrentUser first, but for now we can rely on Login page logic or add the import)
    // Actually, it's safer to just let the login page handle the initial role-based redirect.
    // But if a user is already logged in and visits /, we should check role.

    // For now, let's just stick to the requested behavior: allow superadmin redirect.
    // However, since we can't easily import getCurrentUser without adding the import line,
    // let's just add the subdomain check which addresses the user's specific problem "when i go superadmin".
    // AND add a check for localStorage directly or import getCurrentUser.

    const userStr = localStorage.getItem("emr_auth_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === "superadmin") {
          router.push("/superadmin/dashboard");
          return;
        }
      } catch {}
    }

    // Default to Medical Dashboard
    router.push("/medical/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
    </div>
  );
}
