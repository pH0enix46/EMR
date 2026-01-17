"use client";

import React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Logout01Icon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "@/app/_context/ThemeContext";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <>
      {/* Floating Controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={(e) => toggleTheme(e)}
          className="bg-background/80 text-text-high border-ui-focus flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
        >
          <HugeiconsIcon
            icon={theme === "light" ? Moon01Icon : Sun01Icon}
            size={22}
          />
        </button>
        <button
          onClick={() => router.push("/login")}
          className="bg-background/80 text-text-high hover:text-error border-ui-focus flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
        >
          <HugeiconsIcon icon={Logout01Icon} size={22} />
        </button>
      </div>

      <header className="mb-12 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
              <div className="h-4 w-4 rounded-full border-[3px] border-white" />
            </div>
            <span className="text-primary text-sm font-bold tracking-widest uppercase">
              Apollo EMR
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-high">
            Good Morning, Dr. Apollo
          </h1>
          <p className="text-text-medium mt-2 text-lg">
            Here&apos;s your clinical overview for today.
          </p>
        </motion.div>
      </header>
    </>
  );
}
