"use client";

import React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiChatIcon,
  PlusSignIcon,
  Note01Icon,
} from "@hugeicons/core-free-icons";

export default function QuickActionsWidget() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      {/* Primary Action Card */}
      <div className="bg-primary shadow-primary/20 group relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-2xl transition-all hover:shadow-3xl hover:shadow-primary/30">
        <div className="absolute top-[-20%] right-[-10%] h-56 w-56 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="relative z-10">
          <div className="bg-white/20 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-sm">
            <HugeiconsIcon
              icon={PlusSignIcon}
              size={24}
              className="text-white"
            />
          </div>
          <h2 className="mb-2 text-3xl font-black">New Encounter</h2>
          <p className="mb-8 text-lg leading-relaxed text-white/80">
            Start a clinical session for a new or existing patient.
          </p>
          <button className="text-primary flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-black shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
            START SESSION
          </button>
        </div>
      </div>

      {/* Analytics / Secondary Action */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border-ui-focus bg-background/50 hover:border-primary/30 flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border p-6 text-center shadow-sm backdrop-blur-3xl transition-all hover:shadow-md">
          <div className="bg-info/10 text-info flex h-14 w-14 items-center justify-center rounded-full">
            <HugeiconsIcon icon={AiChatIcon} size={24} />
          </div>
          <div>
            <h3 className="text-text-high font-bold">AI Insights</h3>
            <p className="text-text-medium text-xs">View Analytics</p>
          </div>
        </div>

        <div className="border-ui-focus bg-background/50 hover:border-primary/30 flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border p-6 text-center shadow-sm backdrop-blur-3xl transition-all hover:shadow-md">
          <div className="bg-warning/10 text-warning flex h-14 w-14 items-center justify-center rounded-full">
            <HugeiconsIcon icon={Note01Icon} size={24} />
          </div>
          <div>
            <h3 className="text-text-high font-bold">Reports</h3>
            <p className="text-text-medium text-xs">Pending Review</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
