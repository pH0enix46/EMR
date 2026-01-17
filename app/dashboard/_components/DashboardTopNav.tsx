"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Notification03Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "@/app/_context/ThemeContext";
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";

export default function DashboardTopNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      {/* Search Bar */}
      <div className="flex w-full max-w-xl items-center gap-4">
        <div className="relative w-full">
          <HugeiconsIcon
            icon={Search01Icon}
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search patients (Name, MRN, DOB)..."
            className="w-full rounded-2xl border-none bg-slate-100 py-3 pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none ring-1 ring-transparent focus:bg-white focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 md:flex">
          <HugeiconsIcon icon={Calendar03Icon} size={18} />
          <span>Oct 24, 2025</span>
        </div>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
          <HugeiconsIcon icon={Notification03Icon} size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        <button
          onClick={(e) => toggleTheme(e)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <HugeiconsIcon
            icon={theme === "light" ? Moon01Icon : Sun01Icon}
            size={20}
          />
        </button>

        <div className="flex items-center gap-3 pl-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Dr. Sarah Apollo
            </p>
            <p className="text-xs font-semibold text-slate-500">
              Chief Resident
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 ring-2 ring-blue-500 dark:bg-blue-900" />
        </div>
      </div>
    </header>
  );
}
