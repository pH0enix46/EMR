"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Building03Icon,
  LicenseIcon,
  Settings02Icon,
  Notification02Icon,
  UserCircleIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/app/_utils/cn";
import { getCurrentUser, logout, type User } from "@/app/_auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  {
    name: "Overview",
    href: "/superadmin/dashboard",
    icon: DashboardCircleIcon,
  },
  { name: "Companies", href: "/superadmin/companies", icon: Building03Icon },
  { name: "Licenses", href: "/superadmin/licenses", icon: LicenseIcon },
  { name: "Settings", href: "/superadmin/settings", icon: Settings02Icon },
];

export function SuperAdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto h-full px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-lg leading-none">
              SuperAdmin
            </span>
            <span className="text-zinc-500 text-xs font-medium tracking-wider uppercase">
              Command Center
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "relative px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 group",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5",
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={18}
                  className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive
                      ? "text-violet-400"
                      : "text-zinc-500 group-hover:text-zinc-300",
                  )}
                />
                <span className="text-sm font-semibold tracking-wide">
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-super-nav"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/5 shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all relative group">
            <HugeiconsIcon icon={Notification02Icon} size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-zinc-950 animate-pulse" />
          </button>

          <div className="h-8 w-px bg-white/10" />

          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white leading-none">
                {user?.name || "Administrator"}
              </p>
              <p className="text-xs text-zinc-500 font-medium mt-1">
                System Owner
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 p-[2px] cursor-pointer group relative">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                <HugeiconsIcon
                  icon={UserCircleIcon}
                  size={24}
                  className="text-zinc-400 group-hover:text-white transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="ml-2 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <HugeiconsIcon icon={Logout01Icon} size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
