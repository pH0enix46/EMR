"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  UserAccountIcon,
  DoctorIcon,
  UserSearchIcon,
  Logout01Icon,
  DashboardCircleIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { getCurrentUser, logout, type User } from "@/app/_auth/auth";
import { cn } from "@/app/_utils/cn";

// Define better types for navigation items
interface NavItemProps {
  name: string;
  href: string;
  icon: React.ElementType | any;
  isCollapsed: boolean;
  isActive: boolean;
}

const NAV_ITEMS = [
  { name: "Patient", href: "/medical/dashboard/patients", icon: UserGroupIcon },
  { name: "Doctor", href: "/medical/dashboard/doctors", icon: DoctorIcon },
  {
    name: "Recipient",
    href: "/medical/dashboard/recipients",
    icon: UserSearchIcon,
  },
  { name: "Worker", href: "/medical/dashboard/workers", icon: UserAccountIcon },
] as const;

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Only run on mount to get the user from storage
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login" as any);
    router.refresh();
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 120 : 320 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="h-full bg-white text-slate-900 border-r border-slate-200 rounded-4xl flex flex-col overflow-visible shadow-[20px_0_50px_rgba(0,0,0,0.05)] relative group/sidebar"
    >
      {/* Profile Section */}
      <div
        className={cn(
          "p-8 flex items-center gap-4 transition-all duration-500",
          isCollapsed ? "flex-col justify-center px-4" : "flex-row",
        )}
      >
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-xl shadow-indigo-500/20 active:scale-95 transition-transform cursor-pointer">
            <span className="text-xl font-black">{user?.name?.[0] || "A"}</span>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full border-4 border-[#0d0d0d] flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-black leading-none">4</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="font-bold text-lg truncate tracking-tight text-slate-900">
                {user?.name || "Admin User"}
              </span>
              <span className="text-sm text-gray-500 truncate font-semibold opacity-80">
                {user?.email || "admin@emr.com"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 mt-2 space-y-2">
        <NavItem
          name="Dashboard"
          href="/medical/dashboard"
          icon={DashboardCircleIcon}
          isCollapsed={isCollapsed}
          isActive={pathname === "/medical/dashboard"}
        />

        {/* Divider with Collapse Toggle Button */}
        <div className="px-4 py-4 relative">
          <div className="h-px bg-slate-200 w-full rounded-full" />

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all shadow-md z-20 group/btn"
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              className={cn(
                "transition-all duration-300 group-hover/btn:scale-110",
                isCollapsed ? "rotate-0" : "rotate-180",
              )}
            />
          </button>
        </div>

        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            isCollapsed={isCollapsed}
            isActive={pathname.startsWith(item.href)}
          />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 space-y-2 mt-auto">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-4 px-5 py-5 rounded-3xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all group/logout",
            isCollapsed && "justify-center px-0",
          )}
        >
          <div className="relative shrink-0 w-6 h-6 flex items-center justify-center">
            <HugeiconsIcon
              icon={Logout01Icon}
              size={24}
              className="group-hover/logout:translate-x-1 transition-transform duration-300"
            />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-tight">Logout</span>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function NavItem({
  name,
  href,
  icon: Icon,
  isCollapsed,
  isActive,
}: NavItemProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href as any)}
      className={cn(
        "w-full flex items-center gap-4 px-5 py-5 rounded-4xl transition-all duration-500 group relative",
        isActive
          ? "text-white"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
        isCollapsed && "justify-center px-0",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-nav"
          className="absolute inset-0 bg-sky-500 shadow-lg shadow-sky-500/30"
          style={{ borderRadius: "1.75rem" }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
        />
      )}
      <div className="relative z-10 shrink-0 w-6 h-6 flex items-center justify-center">
        <HugeiconsIcon
          icon={Icon}
          size={24}
          className={cn(
            "transition-all duration-500",
            isActive
              ? "text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              : "group-hover:scale-110",
          )}
        />
      </div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="relative z-10 font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden"
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
