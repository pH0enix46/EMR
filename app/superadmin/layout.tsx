"use client";

import { SuperAdminNavbar } from "./_components/navbar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-josefin selection:bg-violet-500/30 selection:text-violet-200">
      <SuperAdminNavbar />

      {/* Main Content with top padding for fixed header */}
      <main className="pt-24 pb-12 px-4 max-w-[1600px] mx-auto min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10s]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="relative z-10 animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
