"use client";

import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer, Views, View } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

// Setup the localizer
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Mock Data
const events = [
  {
    id: 1,
    title: "Eleanor Shellstrop - Follow-up",
    start: new Date(2025, 9, 24, 9, 0, 0), // Oct 24, 2025 9:00 AM
    end: new Date(2025, 9, 24, 10, 0, 0),
    resourceId: 1,
    type: "Follow-up",
    status: "checked-in",
  },
  {
    id: 2,
    title: "Chidi Anagonye - Consultation",
    start: new Date(2025, 9, 24, 9, 30, 0),
    end: new Date(2025, 9, 24, 10, 0, 0),
    resourceId: 2,
    type: "Consultation",
    status: "in-room",
  },
  {
    id: 3,
    title: "Jason Mendoza - Emergency",
    start: new Date(2025, 9, 24, 11, 0, 0),
    end: new Date(2025, 9, 24, 12, 30, 0),
    resourceId: 1,
    type: "Emergency",
    status: "arriving",
  },
  {
    id: 4,
    title: "Tahani Al-Jamil - Wellness",
    start: new Date(2025, 9, 24, 14, 0, 0),
    end: new Date(2025, 9, 24, 15, 0, 0),
    resourceId: 1,
    type: "Checkup",
    status: "confirmed",
  },
];

export default function SchedulePage() {
  const [view, setView] = useState<View>(Views.DAY);
  const [date, setDate] = useState(new Date(2025, 9, 24));

  const eventStyleGetter = (event: (typeof events)[0]) => {
    const style = {
      backgroundColor: "",
      color: "",
      borderLeft: "4px solid",
      borderColor: "",
      borderRadius: "8px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    };

    switch (event.type) {
      case "Emergency":
        style.backgroundColor = "#fff1f2"; // rose-50
        style.color = "#be123c"; // rose-700
        style.borderColor = "#f43f5e"; // rose-500
        break;
      case "Consultation":
        style.backgroundColor = "#ecfdf5"; // emerald-50
        style.color = "#047857"; // emerald-700
        style.borderColor = "#10b981"; // emerald-500
        break;
      case "Follow-up":
        style.backgroundColor = "#eff6ff"; // blue-50
        style.color = "#1d4ed8"; // blue-700
        style.borderColor = "#3b82f6"; // blue-500
        break;
      default:
        style.backgroundColor = "#f8fafc";
        style.color = "#475569";
        style.borderColor = "#94a3b8";
    }

    return { style };
  };

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Schedule
          </h2>
          <div className="flex items-center gap-2 text-slate-500">
            <HugeiconsIcon icon={Calendar03Icon} size={16} />
            <span>{format(date, "MMMM do, yyyy")}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDate(new Date())}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Today
          </button>

          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            {["day", "week", "month"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v as View)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                  view === v
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95">
            <HugeiconsIcon icon={PlusSignIcon} size={18} />
            <span className="hidden sm:inline">New Appt</span>
          </button>
        </div>
      </div>

      {/* Modern Calendar Container */}
      <div className="flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", minHeight: "600px" }}
          view={view}
          onView={(newView) => setView(newView as View)}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: () => null,
            timeSlotWrapper: (props: { children?: React.ReactNode }) => (
              <div className="rbc-time-slot">{props.children}</div>
            ),
          }}
          step={30}
          timeslots={2}
          min={new Date(0, 0, 0, 8, 0, 0)} // Start at 8 AM
          max={new Date(0, 0, 0, 19, 0, 0)} // End at 7 PM
        />
      </div>
    </div>
  );
}
