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
  Menu01Icon,
  Cancel01Icon,
  DashboardCircleIcon,
} from "@hugeicons/core-free-icons";
import { getCurrentUser, logout, type User } from "@/app/_auth/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 88 : 280 }}
      className="h-[calc(100vh-2rem)] bg-[#1a1a1a] text-white rounded-[2.5rem] flex flex-col overflow-hidden transition-all duration-300 ease-in-out shadow-2xl m-4"
    >
      {/* Profile Section */}
      <div className="p-8 flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden">
            {/* Simple Avatar Placeholder */}
            <span className="text-xl font-bold">{user?.name?.[0] || "U"}</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
            <span className="text-[10px] font-bold">4</span>
          </div>
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col overflow-hidden"
          >
            <span className="font-semibold truncate">
              {user?.name || "User Name"}
            </span>
            <span className="text-xs text-gray-400 truncate">
              {user?.email || "user@email.com"}
            </span>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <NavItem
          name="Dashboard"
          href="/medical/dashboard"
          icon={DashboardCircleIcon}
          isCollapsed={isCollapsed}
          isActive={pathname === "/medical/dashboard"}
        />
        <div className="h-px bg-white/10 my-4 mx-4" />
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
      <div className="p-4 mt-auto space-y-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
        >
          {isCollapsed ? (
            <div className="mx-auto">
              <HugeiconsIcon icon={Menu01Icon} size={24} />
            </div>
          ) : (
            <>
              <HugeiconsIcon icon={Cancel01Icon} size={24} />
              <span className="font-medium text-lg">Collapse</span>
            </>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all group"
        >
          <div className={cn(isCollapsed && "mx-auto")}>
            <HugeiconsIcon
              icon={Logout01Icon}
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
          {!isCollapsed && <span className="font-medium text-lg">Logout</span>}
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
}: {
  name: string;
  href: string;
  icon: any;
  isCollapsed: boolean;
  isActive: boolean;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 group relative",
        isActive
          ? "text-white font-semibold"
          : "text-gray-400 hover:text-white hover:bg-white/5",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-nav"
          className="absolute inset-0 bg-white/10 rounded-2xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <div className={cn(isCollapsed && "mx-auto", "relative z-10")}>
        <HugeiconsIcon
          icon={Icon}
          size={24}
          className={cn(
            "transition-transform duration-200",
            isActive ? "scale-110" : "group-hover:scale-110",
          )}
        />
      </div>
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 font-medium text-lg"
        >
          {name}
        </motion.span>
      )}
    </button>
  );
}
