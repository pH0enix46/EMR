"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffSlashIcon,
  GoogleIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/app/_utils/cn";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center overflow-hidden p-4 transition-colors duration-500 sm:p-6">
      {/* Background Decorative Glow */}
      <div className="bg-primary/10 dark:bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="border-ui-focus bg-background/60 dark:bg-ui-focus/40 relative w-full max-w-[420px] rounded-4xl border p-6 shadow backdrop-blur-2xl sm:p-8"
      >
        {/* Branding - Compact */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="space-y-0.5">
            <h1 className="text-text-high w-full text-center text-2xl font-bold tracking-wide uppercase">
              Apollo Care
            </h1>
            <p className="text-primary w-full text-center text-[10px] font-bold tracking-[0.2em] uppercase">
              Empowering Healthcare
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                className="text-text-medium ml-1 text-[13px] font-semibold"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="group relative">
                <div className="text-text-low group-focus-within:text-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
                  <HugeiconsIcon icon={Mail01Icon} size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="border-ui-focus bg-background/50 text-text-high placeholder:text-text-low focus:border-primary/40 focus:ring-primary/5 dark:bg-background/20 h-12 w-full rounded-xl border pr-4 pl-11 text-sm transition-all focus:ring-4 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                className="text-text-medium ml-1 text-[13px] font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <div className="group relative">
                <div className="text-text-low group-focus-within:text-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
                  <HugeiconsIcon icon={LockPasswordIcon} size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-ui-focus bg-background/50 text-text-high placeholder:text-text-low focus:border-primary/40 focus:ring-primary/5 dark:bg-background/20 h-12 w-full rounded-xl border pr-11 pl-11 text-sm transition-all focus:ring-4 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-low hover:text-text-high absolute inset-y-0 right-0 flex items-center pr-4 transition-colors"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                    size={18}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="group flex cursor-pointer items-center gap-2"
            >
              <div
                className={cn(
                  "border-ui-focus flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200",
                  rememberMe
                    ? "border-primary bg-primary shadow-primary/20 text-white shadow-lg"
                    : "bg-background/50 dark:bg-background/20",
                )}
              >
                {rememberMe && (
                  <HugeiconsIcon icon={Tick01Icon} size={14} strokeWidth={3} />
                )}
              </div>
              <span className="text-text-medium group-hover:text-text-high text-left text-xs font-medium transition-colors select-none">
                Keep me signed in
              </span>
            </button>
            <Link
              href="#"
              className="text-primary hover:text-primary/80 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Forgot?
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary shadow-primary/20 relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="border-ui-focus w-full border-t opacity-50" />
              </div>
              <span className="bg-background text-text-low relative px-3 text-[10px] font-bold tracking-widest uppercase transition-colors duration-500">
                Or connect with
              </span>
            </div>

            <button
              type="button"
              className="border-ui-focus bg-background/50 text-text-high hover:border-primary/30 hover:bg-background/80 dark:bg-ui-focus/40 flex h-12 w-full items-center justify-center gap-3 rounded-xl border text-sm font-semibold transition-all active:scale-[0.98]"
            >
              <HugeiconsIcon
                icon={GoogleIcon}
                size={18}
                className="text-primary"
              />
              <span>Google Account</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-text-low pt-2 text-center text-xs">
            No account?{" "}
            <Link
              href="#"
              className="text-primary hover:text-primary/80 font-bold transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
