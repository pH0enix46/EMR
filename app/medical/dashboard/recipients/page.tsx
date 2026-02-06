"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  MoreHorizontalIcon,
  Add01Icon,
  UserSearchIcon,
  Calendar03Icon,
  Clock01Icon,
  Mail01Icon,
  Call02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/app/_utils/cn";
import { EMRDataTable } from "../../_components/data-table";

// --- Mock Data ---

interface Recipient {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  status: "verified" | "pending" | "rejected";
  registeredDate: string;
}

const MOCK_RECIPIENTS: Recipient[] = [
  {
    id: "R-701",
    name: "Global Health Corp",
    type: "Insurance Provider",
    email: "registry@globalhealth.com",
    phone: "+1 800-456-7890",
    status: "verified",
    registeredDate: "2023-11-20",
  },
  {
    id: "R-702",
    name: "City Medical Center",
    type: "Hospital",
    email: "ops@citymed.org",
    phone: "+1 800-123-4455",
    status: "verified",
    registeredDate: "2024-01-15",
  },
  {
    id: "R-703",
    name: "SafeLife Insurance",
    type: "Insurance Provider",
    email: "partners@safelife.com",
    phone: "+1 800-999-8888",
    status: "pending",
    registeredDate: "2024-05-02",
  },
];

export default function RecipientsPage() {
  const columns = useMemo<ColumnDef<Recipient>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Recipient Entity",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-100/50">
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
        accessorKey: "type",
        header: "Category",
        cell: (info) => (
          <span className="text-sm font-semibold text-gray-700">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "phone",
        header: "Contact Details",
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
        accessorKey: "status",
        header: "Verification",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <div
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold w-fit uppercase tracking-wider",
                status === "verified" &&
                  "bg-emerald-50 text-emerald-600 border border-emerald-100",
                status === "pending" &&
                  "bg-amber-50 text-amber-600 border border-amber-100",
                status === "rejected" &&
                  "bg-rose-50 text-rose-600 border border-rose-100",
              )}
            >
              {status}
            </div>
          );
        },
      },
      {
        accessorKey: "registeredDate",
        header: "Member Since",
        cell: (info) => (
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <HugeiconsIcon
              icon={Calendar03Icon}
              size={18}
              className="text-orange-500"
            />
            {info.getValue() as string}
          </div>
        ),
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
            Recipients
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Authorized entities receiving medical records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 text-gray-700 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            <HugeiconsIcon icon={Download01Icon} size={20} />
            Export
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1a1a1a] text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95">
            <HugeiconsIcon icon={Add01Icon} size={20} />
            Register Recipient
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Recipients",
            value: "86",
            icon: UserSearchIcon,
            color: "bg-orange-500",
          },
          {
            label: "Verified",
            value: "72",
            icon: CheckmarkCircle02Icon,
            color: "bg-emerald-500",
          },
          {
            label: "Pending",
            value: "11",
            icon: Clock01Icon,
            color: "bg-amber-500",
          },
          {
            label: "Requests",
            value: "24",
            icon: Calendar03Icon,
            color: "bg-blue-500",
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
        data={MOCK_RECIPIENTS}
        searchPlaceholder="Search recipients by name or type..."
      />
    </div>
  );
}
