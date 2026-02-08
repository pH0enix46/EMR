"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building03Icon,
  Search01Icon,
  FilterIcon,
  Add01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

const COMPANIES = [
  {
    name: "Apollo Hospital",
    id: "CP-001",
    location: "New York, USA",
    status: "Active",
    users: 1240,
    color: "violet",
  },
  {
    name: "Mega Care",
    id: "CP-002",
    location: "London, UK",
    status: "Active",
    users: 850,
    color: "indigo",
  },
  {
    name: "City Clinic",
    id: "CP-003",
    location: "Dubai, UAE",
    status: "Inactive",
    users: 120,
    color: "emerald",
  },
  {
    name: "Health Plus",
    id: "CP-004",
    location: "Singapore",
    status: "Active",
    users: 2100,
    color: "cyan",
  },
];

export default function CompaniesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Companies
          </h1>
          <p className="text-zinc-400 font-medium">
            Manage medical institutions and their access
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95">
          <HugeiconsIcon icon={Add01Icon} size={20} />
          Register New Company
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl">
        <div className="relative flex-1 max-w-md w-full group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-violet-400 transition-colors">
            <HugeiconsIcon icon={Search01Icon} size={20} />
          </div>
          <input
            type="text"
            placeholder="Search companies by name, ID or location..."
            className="w-full pl-12 pr-4 py-3 bg-zinc-950/50 border border-white/5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all text-white placeholder:text-zinc-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 text-zinc-300 rounded-xl text-sm font-bold transition-all">
          <HugeiconsIcon icon={FilterIcon} size={18} />
          Filters
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMPANIES.map((company, i) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-violet-500/30 p-8 rounded-[2rem] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black bg-zinc-950 border border-white/5 shadow-inner`}
                >
                  {company.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium">
                    {company.id}
                  </p>
                </div>
              </div>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <HugeiconsIcon icon={MoreHorizontalIcon} size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-zinc-950/50 rounded-2xl border border-white/5">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${company.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span
                    className={`text-sm font-bold ${company.status === "Active" ? "text-green-400" : "text-red-400"}`}
                  >
                    {company.status}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-zinc-950/50 rounded-2xl border border-white/5">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                  Active Users
                </p>
                <p className="text-sm font-bold text-white">
                  {company.users.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-zinc-500 text-sm font-medium pl-1">
              <span>{company.location}</span>
              <button className="text-violet-400 font-bold hover:underline">
                Manage &rarr;
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
