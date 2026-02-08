"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type User } from "@/app/_auth/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Database01Icon,
  Database01Icon,
  Globe02Icon,
  ArrowRight01Icon,
  SecurityCheckIcon,
  CpuIcon,
  Wifi01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/app/_utils/cn";

export default function SuperAdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            System Overview
          </h1>
          <p className="text-zinc-400 font-medium">
            Real-time monitoring of global infrastructure
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
              System Online
            </span>
          </div>
          <span className="text-zinc-600 font-mono text-xs px-2">
            Server Time: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Global Traffic",
            value: "2.4M",
            unit: "Req/s",
            trend: "+12.5%",
            icon: Globe02Icon,
            color: "violet",
          },
          {
            label: "Server Load",
            value: "42",
            unit: "%",
            trend: "-2.1%",
            icon: CpuIcon,
            color: "indigo",
          },
          {
            label: "Database Size",
            value: "8.2",
            unit: "TB",
            trend: "+0.8%",
            icon: Database01Icon,
            color: "emerald",
          },
          {
            label: "Uptime (30d)",
            value: "99.99",
            unit: "%",
            trend: "Stable",
            icon: Database01Icon,
            color: "cyan",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-white/10 p-6 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-zinc-900/60"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-white border border-white/5 shadow-inner bg-gradient-to-br",
                  stat.color === "violet" &&
                    "from-violet-500/20 to-purple-600/20",
                  stat.color === "indigo" &&
                    "from-indigo-500/20 to-blue-600/20",
                  stat.color === "emerald" &&
                    "from-emerald-500/20 to-teal-600/20",
                  stat.color === "cyan" && "from-cyan-500/20 to-sky-600/20",
                )}
              >
                <HugeiconsIcon
                  icon={stat.icon}
                  size={24}
                  className="text-white/80"
                />
              </div>
              <span
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded-lg border",
                  stat.trend.startsWith("+")
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : stat.trend === "Stable"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : "bg-orange-500/10 text-orange-400 border-orange-500/20",
                )}
              >
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </h3>
                <span className="text-zinc-500 font-bold text-sm">
                  {stat.unit}
                </span>
              </div>
            </div>
            {/* Hover Glow Effect */}
            <div
              className={cn(
                "absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none",
                stat.color === "violet" && "bg-violet-600",
                stat.color === "indigo" && "bg-indigo-600",
                stat.color === "emerald" && "bg-emerald-600",
                stat.color === "cyan" && "bg-cyan-600",
              )}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Nodes Map Placeholder */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white">Active Nodes</h3>
              <p className="text-zinc-500 text-sm mt-1">
                Geographical distribution of active servers
              </p>
            </div>
            <button className="text-xs font-bold text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 px-4 py-2 rounded-xl transition-colors border border-violet-500/20">
              View Network Map
            </button>
          </div>

          {/* Mock Map Visual */}
          <div className="h-[300px] w-full rounded-3xl bg-zinc-950/50 border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-white/10 transition-colors">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-10 grayscale invert bg-no-repeat bg-center"></div>

            {/* Ping Animations */}
            {[
              { top: "30%", left: "25%", color: "bg-blue-500" }, // US
              { top: "40%", left: "48%", color: "bg-violet-500" }, // Europe
              { top: "60%", left: "75%", color: "bg-emerald-500" }, // Asia
            ].map((ping, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{ top: ping.top, left: ping.left }}
              >
                <div
                  className={cn(
                    "absolute inset-0 rounded-full animate-ping opacity-75",
                    ping.color,
                  )}
                />
                <div
                  className={cn(
                    "relative rounded-full w-3 h-3 border-2 border-zinc-950 shadow-lg",
                    ping.color,
                  )}
                />
              </div>
            ))}

            <div className="relative z-10 text-center space-y-2 bg-zinc-950/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <SecurityCheckIcon
                size={32}
                className="mx-auto text-emerald-500 mb-2"
              />
              <p className="text-zinc-300 font-bold">Network Secure</p>
              <p className="text-zinc-600 text-xs font-mono">
                End-to-end encryption active
              </p>
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Live Logs</h3>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>

          <div className="flex-1 space-y-4 font-mono text-xs overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-zinc-900/40 to-transparent z-10" />

            {[
              {
                time: "10:42:12",
                event: "WARN: High memory usage on node-us-east-1",
                type: "warn",
              },
              {
                time: "10:42:05",
                event: "INFO: New cluster deployment initiated",
                type: "info",
              },
              {
                time: "10:41:58",
                event: "SUCCESS: Backup completed (4.2TB)",
                type: "success",
              },
              {
                time: "10:41:45",
                event: "INFO: User #88291 authentication",
                type: "info",
              },
              {
                time: "10:41:30",
                event: "INFO: API Gateway latency spike detected",
                type: "info",
              },
              {
                time: "10:41:12",
                event: "SUCCESS: Health check passed for 42 services",
                type: "success",
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex gap-3 text-zinc-400 border-b border-white/5 pb-3 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-default"
              >
                <span className="text-zinc-600 shrink-0">{log.time}</span>
                <span
                  className={cn(
                    "truncate",
                    log.type === "warn" && "text-amber-400",
                    log.type === "success" && "text-emerald-400",
                    log.type === "info" && "text-blue-400",
                  )}
                >
                  {log.event}
                </span>
              </div>
            ))}

            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-zinc-900/40 to-transparent z-10 pointer-events-none" />
          </div>

          <button className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-all text-sm font-bold flex items-center justify-center gap-2 group">
            View Full Terminal
            <ArrowRight01Icon
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
