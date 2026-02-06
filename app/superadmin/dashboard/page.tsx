"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, type User } from "@/app/_auth/auth";

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  MegaCare SuperAdmin
                </h1>
                <p className="text-sm text-gray-500">
                  Global Management Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            SuperAdmin Command Center 👋
          </h2>
          <p className="text-gray-600">
            Managing all medical companies and system health.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
            <p className="text-sm text-gray-600">Total Companies</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">128</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
            <p className="text-sm text-gray-600">Active Licenses</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">1,042</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
            <p className="text-sm text-gray-600">System Uptime</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">99.9%</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">$450k</p>
          </div>
        </div>

        {/* Companies List Placeholder */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Registered Medical Companies
          </h3>
          <div className="space-y-4">
            {[
              "Apollo Hospital",
              "Mega Care Center",
              "City Clinic",
              "Health Plus",
            ].map((company) => (
              <div
                key={company}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    {company[0]}
                  </div>
                  <span className="font-medium">{company}</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
