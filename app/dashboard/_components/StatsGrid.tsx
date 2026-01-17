"use client";

import React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Calendar01Icon,
  AiChatIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

export default function StatsGrid() {
  const stats = [
    {
      label: "Total Patients",
      value: "1,280",
      icon: UserGroupIcon,
      trend: "+12%",
      trendUp: true,
      color: "bg-primary",
    },
    {
      label: "Appointments",
      value: "24",
      icon: Calendar01Icon,
      trend: "+4%",
      trendUp: true,
      color: "bg-blue-500", // Adjusted for Navy theme harmony, was emerald
    },
    {
      label: "Pending Reports",
      value: "8",
      icon: AiChatIcon,
      trend: "-2%",
      trendUp: false,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group border-ui-focus bg-background/50 relative overflow-hidden rounded-4xl border p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-6 flex items-center justify-between">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color} text-white shadow-lg`}
            >
              <HugeiconsIcon icon={stat.icon} size={28} />
            </div>
            <div
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
                stat.trendUp
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }`}
            >
              <HugeiconsIcon
                icon={stat.trendUp ? ArrowUp01Icon : ArrowDown01Icon}
                size={16}
              />
              {stat.trend}
            </div>
          </div>
          <div>
            <h3 className="text-text-medium text-xs font-bold tracking-[0.2em] uppercase">
              {stat.label}
            </h3>
            <p className="text-text-high mt-1 text-4xl font-black">
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
