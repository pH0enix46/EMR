"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  MoreHorizontalIcon,
  Add01Icon,
  UserGroupIcon,
  Calendar03Icon,
  Clock01Icon,
  Mail01Icon,
  Call02Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/app/_utils/cn";
import { EMRDataTable } from "../../_components/data-table";

// --- Mock Data ---

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "on-hold";
  lastVisit: string;
  nextAppointment: string;
  gender: "Male" | "Female" | "Other";
  age: number;
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: "P-001",
    name: "Alexander Thompson",
    email: "alex.t@example.com",
    phone: "+1 234-567-8901",
    status: "active",
    lastVisit: "2024-05-12",
    nextAppointment: "2024-06-15",
    gender: "Male",
    age: 34,
  },
  {
    id: "P-002",
    name: "Sarah Jenkins",
    email: "s.jenkins@example.com",
    phone: "+1 234-567-8902",
    status: "active",
    lastVisit: "2024-05-10",
    nextAppointment: "2024-06-20",
    gender: "Female",
    age: 28,
  },
  {
    id: "P-003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 234-567-8903",
    status: "inactive",
    lastVisit: "2024-04-20",
    nextAppointment: "N/A",
    gender: "Male",
    age: 45,
  },
  {
    id: "P-004",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 234-567-8904",
    status: "active",
    lastVisit: "2024-05-14",
    nextAppointment: "2024-06-12",
    gender: "Female",
    age: 31,
  },
  {
    id: "P-005",
    name: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+1 234-567-8905",
    status: "on-hold",
    lastVisit: "2024-05-01",
    nextAppointment: "2024-07-01",
    gender: "Male",
    age: 52,
  },
  {
    id: "P-006",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    phone: "+1 234-567-8906",
    status: "active",
    lastVisit: "2024-05-11",
    nextAppointment: "2024-06-18",
    gender: "Female",
    age: 26,
  },
  {
    id: "P-007",
    name: "James Anderson",
    email: "j.anderson@example.com",
    phone: "+1 234-567-8907",
    status: "active",
    lastVisit: "2024-05-08",
    nextAppointment: "2024-06-22",
    gender: "Male",
    age: 39,
  },
  {
    id: "P-008",
    name: "Sophia Taylor",
    email: "s.taylor@example.com",
    phone: "+1 234-567-8908",
    status: "inactive",
    lastVisit: "2024-03-15",
    nextAppointment: "N/A",
    gender: "Female",
    age: 44,
  },
];

export default function PatientsPage() {
  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Patient",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-100/50">
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
        accessorKey: "age",
        header: "Age/Gender",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {info.getValue() as number} Years
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {info.row.original.gender}
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
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <div
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold w-fit uppercase tracking-wider",
                status === "active" &&
                  "bg-emerald-50 text-emerald-600 border border-emerald-100",
                status === "inactive" &&
                  "bg-rose-50 text-rose-600 border border-rose-100",
                status === "on-hold" &&
                  "bg-amber-50 text-amber-600 border border-amber-100",
              )}
            >
              {status}
            </div>
          );
        },
      },
      {
        accessorKey: "nextAppointment",
        header: "Next Visit",
        cell: (info) => (
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <HugeiconsIcon
              icon={Calendar03Icon}
              size={18}
              className="text-sky-500"
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
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Patient Registry
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Manage and monitor patient health records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 text-gray-700 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            <HugeiconsIcon icon={Download01Icon} size={20} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-sky-500 text-white rounded-2xl font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95">
            <HugeiconsIcon icon={Add01Icon} size={20} />
            Add New Patient
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Patients",
            value: "1,284",
            icon: UserGroupIcon,
            color: "bg-sky-500",
          },
          {
            label: "Active Now",
            value: "482",
            icon: Clock01Icon,
            color: "bg-emerald-500",
          },
          {
            label: "Appointments",
            value: "24",
            icon: Calendar03Icon,
            color: "bg-purple-500",
          },
          {
            label: "New Records",
            value: "12",
            icon: Add01Icon,
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
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 text-gray-50 opacity-50 group-hover:rotate-12 transition-transform duration-500">
              <HugeiconsIcon icon={stat.icon} size={120} />
            </div>
          </motion.div>
        ))}
      </div>

      <EMRDataTable
        columns={columns}
        data={MOCK_PATIENTS}
        searchPlaceholder="Search patients by name, ID or email..."
      />
    </div>
  );
}
