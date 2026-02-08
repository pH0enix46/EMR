"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Settings02Icon,
  SecurityCheckIcon,
  Key01Icon,
  Global02Icon,
  Notification02Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          System Settings
        </h1>
        <p className="text-zinc-400 font-medium">
          Configure global platform parameters and security
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: Global02Icon,
            title: "General Settings",
            desc: "System name, timezone, and global metadata",
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
          },
          {
            icon: SecurityCheckIcon,
            title: "Security & Firewall",
            desc: "Encryption keys, IP whitelisting, and auth policies",
            color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
          },
          {
            icon: Key01Icon,
            title: "API Configuration",
            desc: "Manage gateway tokens and third-party integrations",
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          },
          {
            icon: Notification02Icon,
            title: "Global Notifications",
            desc: "System-wide broadcast and alert templates",
            color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center gap-6 p-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] hover:bg-zinc-900/60 hover:border-white/10 transition-all cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${item.color}`}
            >
              <HugeiconsIcon icon={item.icon} size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm font-medium">{item.desc}</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-700 group-hover:text-violet-400 transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] mt-12">
        <h3 className="text-rose-500 font-black text-xl mb-2 flex items-center gap-2">
          <HugeiconsIcon icon={SecurityCheckIcon} size={24} />
          Critical Actions
        </h3>
        <p className="text-rose-500/60 font-medium mb-6">
          These actions cannot be undone. Please proceed with extreme caution.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20 rounded-xl font-bold transition-all active:scale-95">
            Purge Global Cache
          </button>
          <button className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all active:scale-95">
            Restart Main Cluster
          </button>
        </div>
      </div>
    </div>
  );
}
