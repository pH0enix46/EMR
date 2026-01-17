"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultiple02Icon,
  CheckmarkCircle02Icon,
  Alert01Icon,
  ChartRoseIcon,
} from "@hugeicons/core-free-icons";

export default function StatOverview() {
  const stats = [
    {
      label: "Total Encounters",
      value: "42",
      change: "+12%",
      icon: UserMultiple02Icon,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Tasks Pending",
      value: "8",
      change: "-2",
      icon: Alert01Icon,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      label: "Lab Results",
      value: "14",
      change: "+5 New",
      icon: ChartRoseIcon,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Time Efficiency",
      value: "12m",
      change: "-1m / pt",
      icon: CheckmarkCircle02Icon,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
              <h4 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </h4>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
            >
              <HugeiconsIcon icon={stat.icon} size={20} />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-slate-400">
              <span className="text-emerald-600">{stat.change}</span> vs
              yesterday
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
