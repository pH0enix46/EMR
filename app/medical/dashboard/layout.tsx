"use client";

import { Sidebar } from "@/app/_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f3f4f6] p-4 gap-4 font-josefin overflow-hidden">
      {/* Sidebar - Fixed as part of the overall page layout */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-[2.5rem] shadow-xl overflow-hidden relative">
        <div className="h-full w-full overflow-y-auto p-8 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
}
