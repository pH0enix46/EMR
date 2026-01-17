"use client";

import React from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Calendar03Icon,
  UserGroupIcon,
  TestTube01Icon,
  Message01Icon,
  Settings01Icon,
  Logout01Icon,
  Activity01Icon,
} from "@hugeicons/core-free-icons";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      name: "Overview",
      icon: DashboardSquare01Icon,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      name: "Schedule",
      icon: Calendar03Icon,
      href: "/dashboard/schedule",
      active: pathname === "/dashboard/schedule",
    },
    {
      name: "Patients",
      icon: UserGroupIcon,
      href: "/dashboard/patients",
      active: pathname === "/dashboard/patients",
    },
    {
      name: "Lab Results",
      icon: TestTube01Icon,
      href: "/dashboard/labs",
      active: pathname === "/dashboard/labs",
    },
    {
      name: "Messages",
      icon: Message01Icon,
      href: "/dashboard/messages",
      badge: 5,
      active: false,
    },
    {
      name: "Analytics",
      icon: Activity01Icon,
      href: "/dashboard/analytics",
      active: false,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
      {/* Logo Area */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-blue-900/20">
          <div className="h-4 w-4 rounded-full border-[3px] border-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Apollo EMR
          </h1>
          <p className="text-xs font-medium text-slate-500">Clinician Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              item.active
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={item.icon}
                size={20}
                className={
                  item.active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                }
              />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-slate-100 p-4 dark:border-slate-800">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-900/10 dark:hover:text-rose-400"
          onClick={() => router.push("/login")}
        >
          <HugeiconsIcon icon={Logout01Icon} size={20} />
          <span>Sign Out</span>
        </button>
        <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
          <HugeiconsIcon icon={Settings01Icon} size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
