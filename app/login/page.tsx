"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/_auth/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LockPasswordIcon,
  Mail01Icon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = login(email, password);

      if (user) {
        if (user.role === "superadmin") {
          router.push("/superadmin/dashboard");
        } else {
          router.push("/medical/dashboard");
        }
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4 font-josefin">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-white">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-500 rounded-3xl mb-6 shadow-xl shadow-sky-200">
              <HugeiconsIcon
                icon={LockPasswordIcon}
                size={40}
                className="text-white"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Apollo EMR
            </h1>
            <p className="text-gray-400 mt-3 font-semibold text-lg">
              Sign in to your account
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold text-sm flex items-center gap-3"
            >
              <HugeiconsIcon icon={HelpCircleIcon} size={20} />
              {error}
            </motion.div>
          )}

          <div className="mb-8 p-6 bg-sky-50/50 border border-sky-100 rounded-3xl text-sm">
            <p className="font-bold text-sky-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-600 rounded-full" />
              Demo Credentials:
            </p>
            <div className="space-y-2 text-sky-700 font-semibold">
              <p>• admin@emr.com / admin123</p>
              <p>• doctor@emr.com / doctor123</p>
              <p>• user@emr.com / user123</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 px-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a1a1a] transition-colors">
                  <HugeiconsIcon icon={Mail01Icon} size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-sky-500 transition-all outline-none font-semibold"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-bold text-sky-600 hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a1a1a] transition-colors">
                  <HugeiconsIcon icon={LockPasswordIcon} size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-sky-500 transition-all outline-none font-semibold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-sky-500 text-white font-bold rounded-2xl shadow-xl shadow-sky-200 hover:bg-sky-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white mr-3"></div>
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 font-bold mt-8">
            Securely encrypted by Apollo EMR
          </p>
        </div>
      </motion.div>
    </div>
  );
}
