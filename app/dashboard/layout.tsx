"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import DashboardTopNav from "./_components/DashboardTopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col transition-all lg:pl-64">
        <DashboardTopNav />

        <main className="flex-1 space-y-6 p-8">{children}</main>
      </div>
    </div>
  );
}
