"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileValidationIcon,
  TestTube01Icon,
  PillIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

export default function ClinicalTasks() {
  const tasks = [
    {
      id: 1,
      title: "Review Lab Results",
      patient: "Michael Scott",
      detail: "Abnormal Liver Function Tests",
      priority: "critical", // critical, high, medium
      icon: TestTube01Icon,
    },
    {
      id: 2,
      title: "Prescription Refill",
      patient: "Pam Beesly",
      detail: "Lisinopril 10mg - 90 day supply",
      priority: "medium",
      icon: PillIcon,
    },
    {
      id: 3,
      title: "Sign Clinical Note",
      patient: "Jim Halpert",
      detail: "Annual Physical Examination",
      priority: "high",
      icon: FileValidationIcon,
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Clinical Inbox
        </h3>
        <span className="flex h-6 items-center justify-center rounded-full bg-blue-100 px-3 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          3 Pending
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group relative flex cursor-pointer items-start gap-4 rounded-2xl border border-white bg-white p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
          >
            <div
              className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                task.priority === "critical"
                  ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  : task.priority === "high"
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                    : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              }`}
            >
              <HugeiconsIcon icon={task.icon} size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {task.title}
                </h4>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <HugeiconsIcon icon={Clock01Icon} size={12} />
                  2h
                </div>
              </div>
              <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="text-slate-900 dark:text-slate-200">
                  {task.patient}
                </span>{" "}
                • {task.detail}
              </p>

              <div className="mt-3 flex gap-2">
                <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                  Review
                </button>
                <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40">
                  Approve
                </button>
              </div>
            </div>
            {task.priority === "critical" && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
