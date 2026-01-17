"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon, Clock01Icon } from "@hugeicons/core-free-icons";

export default function PatientQueue() {
  const patients = [
    {
      mrn: "482-992",
      name: "Eleanor Shellstrop",
      age: 32,
      gender: "F",
      time: "09:00 AM",
      photo: null,
      reason: "Chronic Migraine",
      status: "In Room 3", // Checked In, In Room, Finished, No Show
      vitals: { bp: "120/80", hr: 72, temp: "98.6" },
      provider: "Dr. Apollo",
    },
    {
      mrn: "992-110",
      name: "Chidi Anagonye",
      age: 35,
      gender: "M",
      time: "09:30 AM",
      photo: null,
      reason: "Stomach Ulcer Checkup",
      status: "Checked In",
      vitals: { bp: "135/85", hr: 88, temp: "99.1" },
      provider: "Dr. Apollo",
    },
    {
      mrn: "120-442",
      name: "Tahani Al-Jamil",
      age: 29,
      gender: "F",
      time: "10:00 AM",
      photo: null,
      reason: "Wellness Visit",
      status: "Arriving Soon",
      vitals: null,
      provider: "Dr. Apollo",
    },
    {
      mrn: "882-121",
      name: "Jason Mendoza",
      age: 27,
      gender: "M",
      time: "10:30 AM",
      photo: null,
      reason: "Injury - Hand",
      status: "Arriving Soon",
      vitals: null,
      provider: "Dr. Apollo",
    },
  ];

  return (
    <div className="flex-1 rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Active Queue
          </h3>
          <p className="text-sm text-slate-500">
            Today, Oct 24 •{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              4 Remaining
            </span>
          </p>
        </div>
        <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          View Full Schedule
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Reason / Vitals</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {patients.map((patient) => (
              <tr
                key={patient.mrn}
                className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      size={16}
                      className="text-slate-400"
                    />
                    {patient.time}
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {patient.name}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        {patient.age}yo {patient.gender} •{" "}
                        <span className="font-mono text-slate-400">
                          #{patient.mrn}
                        </span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide
                  ${
                    patient.status === "In Room 3"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : patient.status === "Checked In"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                  >
                    {patient.status === "In Room 3" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 align-top">
                  <p className="font-semibold text-slate-900 dark:text-slate-200">
                    {patient.reason}
                  </p>
                  {patient.vitals ? (
                    <div className="mt-1 flex gap-3 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          BP
                        </span>{" "}
                        {patient.vitals.bp}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          HR
                        </span>{" "}
                        {patient.vitals.hr}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-xs italic text-slate-400">
                      Vitals pending triage
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 align-top text-right">
                  <button className="text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                    <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
