"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  MoreHorizontalIcon,
  Add01Icon,
  UserAccountIcon,
  Calendar03Icon,
  Clock01Icon,
  Mail01Icon,
  Call02Icon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/app/_utils/cn";
import { EMRDataTable } from "../../_components/data-table";

// --- Mock Data ---

interface Worker {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  shift: "Morning" | "Evening" | "Night";
  status: "active" | "off-duty";
}

const MOCK_WORKERS: Worker[] = [
  {
    id: "W-501",
    name: "Johnathan Miller",
    role: "Medical Assistant",
    department: "Emergency",
    email: "j.miller@apollo.emr",
    phone: "+1 555-9001",
    shift: "Morning",
    status: "active",
  },
  {
    id: "W-502",
    name: "Alice Cooper",
    role: "Technician",
    department: "Radiology",
    email: "a.cooper@apollo.emr",
    phone: "+1 555-9002",
    shift: "Evening",
    status: "active",
  },
  {
    id: "W-503",
    name: "Kevin Spacey",
    role: "Receptionist",
    department: "Administration",
    email: "k.spacey@apollo.emr",
    phone: "+1 555-9003",
    shift: "Morning",
    status: "off-duty",
  },
];

export default function WorkersPage() {
  const columns = useMemo<ColumnDef<Worker>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Worker",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-100/50">
              {String(info.getValue())[0]}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight">
                {info.getValue() as string}
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                {info.row.original.id}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role / Dept",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {info.getValue() as string}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {info.row.original.department}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Contact",
        cell: (info) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
              <HugeiconsIcon
                icon={Call02Icon}
                size={14}
                className="text-gray-400"
              />
              {info.getValue() as string}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <HugeiconsIcon
                icon={Mail01Icon}
                size={12}
                className="text-gray-400"
              />
              {info.row.original.email}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "shift",
        header: "Current Shift",
        cell: (info) => (
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <HugeiconsIcon
              icon={Clock01Icon}
              size={18}
              className="text-teal-500"
            />
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Availability",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <div
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold w-fit uppercase tracking-wider",
                status === "active" &&
                  "bg-emerald-50 text-emerald-600 border border-emerald-100",
                status === "off-duty" &&
                  "bg-gray-50 text-gray-400 border border-gray-100",
              )}
            >
              {status}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Hospital Staff
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Manage administrative and technical workers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 text-gray-700 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            <HugeiconsIcon icon={Download01Icon} size={20} />
            Export Staff
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1a1a1a] text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95">
            <HugeiconsIcon icon={Add01Icon} size={20} />
            Add Staff
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Workers",
            value: "112",
            icon: UserAccountIcon,
            color: "bg-teal-500",
          },
          {
            label: "On Shift",
            value: "34",
            icon: Clock01Icon,
            color: "bg-emerald-500",
          },
          {
            label: "Departments",
            value: "8",
            icon: Briefcase01Icon,
            color: "bg-blue-500",
          },
          {
            label: "Upcoming",
            value: "15",
            icon: Calendar03Icon,
            color: "bg-amber-500",
          },
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="p-6 bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                  stat.color,
                )}
              >
                <HugeiconsIcon icon={stat.icon} size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">
                  {stat.value}
                </h3>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 text-gray-50 opacity-50 group-hover:rotate-12 transition-transform duration-500">
              <HugeiconsIcon icon={stat.icon} size={120} />
            </div>
          </motion.div>
        ))}
      </div>

      <EMRDataTable
        columns={columns}
        data={MOCK_WORKERS}
        searchPlaceholder="Search workers by name or role..."
      />
    </div>
  );
}
