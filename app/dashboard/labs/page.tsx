"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TestTube01Icon,
  Search01Icon,
  FilterHorizontalIcon,
  Download01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  UserIcon,
  ArrowRight01Icon,
  MoreVerticalCircle01Icon,
  PrinterIcon,
  Share01Icon,
} from "@hugeicons/core-free-icons";

// --- Mock Data ---

const glucoseData = [
  { date: "Oct 1", value: 92, range: [70, 99] },
  { date: "Oct 5", value: 95, range: [70, 99] },
  { date: "Oct 10", value: 108, range: [70, 99] },
  { date: "Oct 15", value: 115, range: [70, 99] },
  { date: "Oct 20", value: 98, range: [70, 99] },
  { date: "Oct 24", value: 94, range: [70, 99] },
];

const stats = [
  {
    label: "Critical Alerts",
    value: 3,
    icon: AlertCircleIcon,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    label: "Pending Review",
    value: 12,
    icon: Clock01Icon,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    label: "Completed Today",
    value: 45,
    icon: CheckmarkCircle02Icon,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
];

const labResults = [
  {
    id: "LAB-2024-001",
    patient: "Eleanor Shellstrop",
    test: "Comprehensive Metabolic Panel",
    date: "Oct 24, 2025 • 09:30 AM",
    status: "Critical",
    value: "High Glucose",
    doctor: "Dr. Apollo",
  },
  {
    id: "LAB-2024-002",
    patient: "Chidi Anagonye",
    test: "Lipid Panel",
    date: "Oct 24, 2025 • 08:15 AM",
    status: "Normal",
    value: "Optimal",
    doctor: "Dr. Apollo",
  },
  {
    id: "LAB-2024-003",
    patient: "Jason Mendoza",
    test: "CBC with Auto Diff",
    date: "Oct 23, 2025 • 04:45 PM",
    status: "Abnormal",
    value: "Low RBC",
    doctor: "Dr. Bambi",
  },
  {
    id: "LAB-2024-004",
    patient: "Tahani Al-Jamil",
    test: "Thyroid Panel",
    date: "Oct 23, 2025 • 02:20 PM",
    status: "Pending",
    value: "Processing...",
    doctor: "Dr. Apollo",
  },
  {
    id: "LAB-2024-005",
    patient: "Michael Scott",
    test: "Hepatic Function",
    date: "Oct 22, 2025 • 11:00 AM",
    status: "Normal",
    value: "Normal Range",
    doctor: "Dr. Halpert",
  },
];

export default function LabsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex h-full flex-col gap-6">
      {/* --- Top Header & Actions --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Lab Results
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Manage patient test results and analyze trends.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
            <HugeiconsIcon icon={FilterHorizontalIcon} size={18} />
            <span>Filter</span>
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
            <HugeiconsIcon icon={Download01Icon} size={18} />
            <span>Export</span>
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-95">
            <HugeiconsIcon icon={TestTube01Icon} size={18} />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* --- KPI Stats Row --- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02] dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}
            >
              <HugeiconsIcon icon={stat.icon} size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Col: Results List */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Recent Results
              </h3>
              <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                {["All", "Critical", "Pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                      activeTab === tab
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search patients..."
                className="h-10 w-64 rounded-xl border-none bg-slate-50 pl-10 text-sm font-semibold text-slate-900 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
              />
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {labResults.map((result) => (
                <div
                  key={result.id}
                  className="group flex items-center justify-between rounded-2xl p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      <span className="text-xs font-bold">
                        {result.patient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {result.patient}
                      </h4>
                      <p className="text-xs font-medium text-slate-500">
                        {result.id} • {result.test}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-8 md:flex">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {result.value}
                      </p>
                      <p className="text-xs text-slate-500">{result.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        result.status === "Critical"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
                          : result.status === "Abnormal"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                            : result.status === "Pending"
                              ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 opacity-0 transition-opacity hover:bg-slate-200 hover:text-slate-600 group-hover:opacity-100 dark:hover:bg-slate-700 dark:hover:text-slate-200">
                    <HugeiconsIcon icon={MoreVerticalCircle01Icon} size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Analytics */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Featured Analysis Card */}
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Trend Analysis
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  Glucose (mg/dL) • Last 30 Days
                </p>
              </div>
              <button className="rounded-lg bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </button>
            </div>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={glucoseData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <ReferenceLine
                    y={100}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 rounded-xl bg-orange-50 p-4 border border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/20">
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  size={20}
                  className="mt-0.5 text-orange-600 dark:text-orange-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-orange-800 dark:text-orange-400">
                    Attention Required
                  </h4>
                  <p className="mt-1 text-xs text-orange-700/80 dark:text-orange-400/70">
                    Eleanor's glucose levels have spiked 15% above her baseline
                    average in this period.
                  </p>
                  <button className="mt-2 text-xs font-bold text-orange-800 underline dark:text-orange-400">
                    View Detailed Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-3xl border border-slate-200 bg-emerald-900 p-6 text-white shadow-lg shadow-emerald-900/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-800/50">
              <HugeiconsIcon icon={PrinterIcon} size={24} />
            </div>
            <h3 className="text-lg font-bold">Print Batch Results</h3>
            <p className="mt-1 text-sm text-emerald-100/70">
              Select pending results to print official reports for signing.
            </p>
            <button className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-bold text-emerald-900 shadow-sm transition-transform hover:scale-[1.02] active:scale-95">
              Start Batch Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
