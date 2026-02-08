"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  LicenseIcon,
  Add01Icon,
  Search01Icon,
  Clock01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

const LICENSES = [
  {
    company: "Apollo Hospital",
    type: "Enterprise",
    status: "Active",
    expiry: "Dec 31, 2026",
    price: "$12,000",
  },
  {
    company: "Mega Care",
    type: "Professional",
    status: "Expiring Soon",
    expiry: "Mar 15, 2026",
    price: "$5,500",
  },
  {
    company: "City Clinic",
    type: "Standard",
    status: "Active",
    expiry: "Jun 20, 2026",
    price: "$2,400",
  },
];

export default function LicensesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Licenses
          </h1>
          <p className="text-zinc-400 font-medium">
            Subscription management and revenue tracking
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95">
          <HugeiconsIcon icon={Add01Icon} size={20} />
          Create New License
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Active Revenue",
            value: "$45,200",
            trend: "+8.4%",
            icon: LicenseIcon,
            color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
          },
          {
            label: "Expiring Soon",
            value: "12",
            trend: "-2",
            icon: Clock01Icon,
            color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          },
          {
            label: "Pending Issues",
            value: "3",
            trend: "0",
            icon: AlertCircleIcon,
            color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`p-6 rounded-3xl border ${stat.color} backdrop-blur-md`}
          >
            <div className="flex justify-between items-start mb-4">
              <HugeiconsIcon icon={stat.icon} size={24} />
              <span className="text-xs font-black px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                {stat.trend}
              </span>
            </div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">License Registry</h2>
          <div className="relative group">
            <HugeiconsIcon
              icon={Search01Icon}
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            />
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-10 pr-4 py-2 bg-zinc-950/50 border border-white/5 rounded-xl text-xs font-bold text-white focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50">
                <th className="px-8 py-5 text-zinc-500 text-xs font-black uppercase tracking-widest">
                  Company
                </th>
                <th className="px-8 py-5 text-zinc-500 text-xs font-black uppercase tracking-widest">
                  Plan
                </th>
                <th className="px-8 py-5 text-zinc-500 text-xs font-black uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-zinc-500 text-xs font-black uppercase tracking-widest">
                  Expiry
                </th>
                <th className="px-8 py-5 text-zinc-500 text-xs font-black uppercase tracking-widest text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {LICENSES.map((license, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <p className="text-white font-bold">{license.company}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs font-bold text-zinc-300 group-hover:bg-violet-500/20 group-hover:text-violet-400 transition-colors">
                      {license.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${license.status === "Active" ? "bg-green-500" : "bg-amber-500"}`}
                      />
                      <span
                        className={`text-xs font-black ${license.status === "Active" ? "text-green-500" : "text-amber-500"}`}
                      >
                        {license.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-zinc-500 font-mono text-xs">
                      {license.expiry}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <p className="text-white font-black">{license.price}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
