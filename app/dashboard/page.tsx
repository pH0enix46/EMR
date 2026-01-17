"use client";

import React from "react";
import StatOverview from "./_components/StatOverview";
import PatientQueue from "./_components/PatientQueue";
import ClinicalTasks from "./_components/ClinicalTasks";

export default function Dashboard() {
  return (
    <>
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Overview
        </h2>
        <p className="text-slate-500">
          Welcome back, Dr. Apollo. You have 4 patients remaining today.
        </p>
      </div>

      {/* Top Stats */}
      <StatOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Column: Patient Queue */}
        <div className="xl:col-span-2">
          <PatientQueue />
        </div>

        {/* Right Column: Tasks and Notifications */}
        <div className="space-y-6 xl:col-span-1">
          <ClinicalTasks />

          {/* Placeholder for future widget */}
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/30">
            <p className="text-sm font-semibold text-slate-400">
              Analytics Widget Placeholder
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
