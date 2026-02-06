"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type User } from "@/app/_auth/auth";

export default function SuperAdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl shadow-xl p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            SuperAdmin Command Center 👋
          </h2>
          <p className="text-purple-100 text-lg max-w-xl">
            Welcome back! You have full control over the EMR ecosystem. Monitor
            system health, manage licenses, and oversee all medical companies
            from this central hub.
          </p>
        </div>
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Companies",
            value: "128",
            trend: "+12%",
            color: "text-blue-600",
          },
          {
            label: "Active Licenses",
            value: "1,042",
            trend: "+5%",
            color: "text-purple-600",
          },
          {
            label: "System Uptime",
            value: "99.9%",
            trend: "Stable",
            color: "text-green-600",
          },
          {
            label: "Total Revenue",
            value: "$450k",
            trend: "+18%",
            color: "text-orange-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Companies List */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Registered Medical Companies
          </h3>
          <button className="text-purple-600 font-bold hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Apollo Hospital",
              location: "New York, USA",
              status: "Active",
            },
            {
              name: "Mega Care Center",
              location: "London, UK",
              status: "Active",
            },
            { name: "City Clinic", location: "Dubai, UAE", status: "Pending" },
            { name: "Health Plus", location: "Singapore", status: "Active" },
          ].map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-purple-100"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600 font-bold text-xl border border-gray-100">
                  {company.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{company.name}</h4>
                  <p className="text-sm text-gray-500">{company.location}</p>
                </div>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  company.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {company.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
