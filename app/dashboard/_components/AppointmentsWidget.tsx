"use client";

import React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Clock01Icon } from "@hugeicons/core-free-icons";

export default function AppointmentsWidget() {
  const appointments = [
    {
      name: "John Doe",
      time: "10:30 AM",
      type: "Checkup",
      status: "Confirmed",
    },
    {
      name: "Sarah Smith",
      time: "11:45 AM",
      type: "Consultation",
      status: "Pending",
    },
    {
      name: "Mike Ross",
      time: "02:15 PM",
      type: "Surgery",
      status: "Confirmed",
    },
    {
      name: "Emily Clark",
      time: "04:00 PM",
      type: "Follow-up",
      status: "Confirmed",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border-ui-focus bg-background/50 h-full rounded-[2.5rem] border p-8 shadow-sm backdrop-blur-3xl"
    >
      <div className="mb-8 flex items-center justify-between px-2">
        <div>
          <h2 className="text-text-high text-2xl font-bold">
            Today&apos;s Schedule
          </h2>
          <p className="text-text-medium text-sm">
            You have {appointments.length} patients remaining.
          </p>
        </div>
        <button className="text-primary text-sm font-bold hover:underline">
          View Calendar
        </button>
      </div>
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.name}
            className="group border-ui-focus bg-background hover:border-primary/30 flex items-center justify-between rounded-3xl border p-5 transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <HugeiconsIcon
                  icon={
                    apt.status === "Confirmed"
                      ? CheckmarkCircle02Icon
                      : Clock01Icon
                  }
                  size={24}
                />
              </div>
              <div>
                <p className="text-text-high text-lg font-bold">{apt.name}</p>
                <p className="text-text-medium text-xs font-semibold tracking-wide uppercase opacity-80">
                  {apt.type} • {apt.time}
                </p>
              </div>
            </div>
            <span
              className={`rounded-lg px-3 py-1 text-[10px] font-black tracking-[0.15em] uppercase shadow-sm ${
                apt.status === "Confirmed"
                  ? "bg-success/10 text-success border-success/20 border"
                  : "bg-warning/10 text-warning border-warning/20 border"
              }`}
            >
              {apt.status}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
