"use client";

import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  FilterIcon,
  Download01Icon,
  MoreHorizontalIcon,
  Add01Icon,
  UserGroupIcon,
  Calendar03Icon,
  Clock01Icon,
  Mail01Icon,
  Location01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/app/_utils/cn";

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
  const [data] = useState<Patient[]>(MOCK_PATIENTS);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Patient",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100/50">
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
                icon={Clock01Icon}
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
              className="text-blue-500"
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

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1a1a1a] text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95">
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
            color: "bg-blue-500",
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
            className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
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

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <HugeiconsIcon icon={Search01Icon} size={20} />
            </div>
            <input
              type="text"
              placeholder="Search patients by name, ID or email..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all">
              <HugeiconsIcon icon={FilterIcon} size={20} />
            </button>
            <div className="h-8 w-px bg-gray-100 mx-2 hidden md:block" />
            <span className="text-sm font-bold text-gray-400">
              Showing {table.getRowModel().rows.length} results
            </span>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-50/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50"
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          header.column.getCanSort() &&
                            "cursor-pointer select-none",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <HugeiconsIcon
                            icon={ArrowUp01Icon}
                            size={14}
                            className="ml-1"
                          />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            size={14}
                            className="ml-1"
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {table.getRowModel().rows.map((row) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={row.id}
                    className="hover:bg-gray-50/30 transition-colors group cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-8 py-6">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-6 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-6 py-3 bg-[#1a1a1a] text-white rounded-xl font-bold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-200"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
