"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  MoreHorizontalIcon,
  Add01Icon,
  DoctorIcon,
  Calendar03Icon,
  Clock01Icon,
  Mail01Icon,
  Call02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/app/_utils/cn";
import { EMRDataTable } from "../../_components/data-table";

// --- Mock Data ---

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  email: string;
  phone: string;
  status: "available" | "busy" | "on-leave";
  rating: number;
}

const MOCK_DOCTORS: Doctor[] = [
  {
    id: "D-001",
    name: "Dr. Elizabeth Vance",
    specialization: "Cardiology",
    experience: "12 Years",
    email: "e.vance@apollo.emr",
    phone: "+1 555-0101",
    status: "available",
    rating: 4.9,
  },
  {
    id: "D-002",
    name: "Dr. Marcus Thorne",
    specialization: "Neurology",
    experience: "8 Years",
    email: "m.thorne@apollo.emr",
    phone: "+1 555-0102",
    status: "busy",
    rating: 4.8,
  },
  {
    id: "D-003",
    name: "Dr. Sarah Chen",
    specialization: "Pediatrics",
    experience: "15 Years",
    email: "s.chen@apollo.emr",
    phone: "+1 555-0103",
    status: "available",
    rating: 5.0,
  },
  {
    id: "D-004",
    name: "Dr. Robert Black",
    specialization: "Orthopedics",
    experience: "10 Years",
    email: "r.black@apollo.emr",
    phone: "+1 555-0104",
    status: "on-leave",
    rating: 4.7,
  },
];

export default function DoctorsPage() {
  const columns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Doctor",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-100/50">
              {String(info.getValue())[4]}
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
        accessorKey: "specialization",
        header: "Specialization",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {info.getValue() as string}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {info.row.original.experience} Exp.
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
                status === "available" &&
                  "bg-emerald-50 text-emerald-600 border border-emerald-100",
                status === "busy" &&
                  "bg-rose-50 text-rose-600 border border-rose-100",
                status === "on-leave" &&
                  "bg-amber-50 text-amber-600 border border-amber-100",
              )}
            >
              {status}
            </div>
          );
        },
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: (info) => (
          <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
            <HugeiconsIcon
              icon={StarIcon}
              size={16}
              className="text-amber-400 fill-amber-400"
            />
            {info.getValue() as number}
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
            Medical Staff
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Manage your medical professionals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 text-gray-700 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
            <HugeiconsIcon icon={Download01Icon} size={20} />
            Export List
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-sky-500 text-white rounded-2xl font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95">
            <HugeiconsIcon icon={Add01Icon} size={20} />
            Add Doctor
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Doctors",
            value: "42",
            icon: DoctorIcon,
            color: "bg-sky-500",
          },
          {
            label: "On Duty",
            value: "31",
            icon: Clock01Icon,
            color: "bg-emerald-500",
          },
          {
            label: "Average Rating",
            value: "4.8",
            icon: StarIcon,
            color: "bg-amber-500",
          },
          {
            label: "Consultations",
            value: "156",
            icon: Calendar03Icon,
            color: "bg-sky-600",
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
        data={MOCK_DOCTORS}
        searchPlaceholder="Search doctors by name or specialization..."
      />
    </div>
  );
}
