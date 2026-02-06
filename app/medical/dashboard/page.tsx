"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type User } from "@/app/_auth/auth";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBasket01Icon,
  BusIcon,
  Home01Icon,
  Add01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

const DATA = [
  { name: "01", value: 40 },
  { name: "02", value: 30 },
  { name: "03", value: 60 },
  { name: "04", value: 80 },
  { name: "05", value: 50 },
  { name: "06", value: 90 },
  { name: "07", value: 70 },
  { name: "08", value: 40 },
  { name: "09", value: 30 },
  { name: "10", value: 60 },
  { name: "11", value: 80 },
  { name: "12", value: 50 },
  { name: "13", value: 90 },
  { name: "14", value: 100, active: true },
  { name: "15", value: 70 },
];

const TRANSACTIONS = [
  {
    id: 1,
    name: "Grocery",
    time: "5:12 pm",
    location: "Belanja di pasar",
    price: "-326.800",
    icon: ShoppingBasket01Icon,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Transportation",
    time: "5:12 pm",
    location: "Naik bus umum",
    price: "-15.000",
    icon: BusIcon,
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Housing",
    time: "5:12 pm",
    location: "Bayar Listrik",
    price: "-185.750",
    icon: Home01Icon,
    color: "bg-orange-500",
  },
];

const FOOD_AND_DRINKS = [
  {
    name: "Food and Drink",
    time: "5:12 pm",
    location: "Makan Steak",
    price: "-156.000",
    icon: Home01Icon,
    color: "bg-red-500",
  },
  {
    name: "Entertainment",
    time: "5:12 pm",
    location: "Nonton Bioskop",
    price: "-35.200",
    icon: Home01Icon,
    color: "bg-green-500",
  },
];

const STATS = [
  {
    name: "Food and Drinks",
    value: 872400,
    total: 1000000,
    color: "bg-green-500",
  },
  { name: "Shopping", value: 1378200, total: 2000000, color: "bg-green-500" },
  { name: "Housing", value: 928500, total: 1500000, color: "bg-green-500" },
  {
    name: "Transportation",
    value: 420700,
    total: 1000000,
    color: "bg-green-500",
  },
  { name: "Vehicle", value: 520000, total: 1000000, color: "bg-green-500" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-12 min-h-full">
      {/* Left Section */}
      <div className="flex-1 space-y-12">
        <header className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Expenses</h1>
            <p className="text-gray-400 font-semibold text-lg">
              01 - 25 March, 2020
            </p>
          </div>
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm"
              >
                <img
                  src={`https://i.pravatar.cc/150?u=${i + 10}`}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <button className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all shadow-sm">
              <HugeiconsIcon icon={Add01Icon} size={24} />
            </button>
          </div>
        </header>

        {/* Chart Section */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.active ? "#3b82f6" : "#e0f2fe"}
                    className="hover:fill-blue-400 transition-colors duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Transactions */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">Today</h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <HugeiconsIcon icon={MoreHorizontalIcon} size={28} />
            </button>
          </div>
          <div className="space-y-6">
            {TRANSACTIONS.map((tx) => (
              <TransactionItem key={tx.id} {...tx} />
            ))}
          </div>
        </section>

        {/* Previous Day */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Monday, 23 March 2020
            </h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <HugeiconsIcon icon={MoreHorizontalIcon} size={28} />
            </button>
          </div>
          <div className="space-y-6">
            {FOOD_AND_DRINKS.map((tx, idx) => (
              <TransactionItem key={idx} {...tx} id={idx} />
            ))}
          </div>
        </section>
      </div>

      {/* Right Section */}
      <div className="lg:w-96 space-y-16">
        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Where your money go?
          </h2>
          <div className="space-y-8">
            {STATS.map((stat) => (
              <div key={stat.name} className="space-y-3">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-gray-700">{stat.name}</span>
                  <span className="text-gray-900">
                    {stat.value.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.value / stat.total) * 100}%` }}
                    className="h-full bg-green-500 rounded-full"
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Card */}
        <div className="relative bg-[#f8faff] rounded-[3rem] p-10 overflow-hidden group shadow-sm border border-blue-50">
          <div className="relative z-10 space-y-8">
            <div className="flex gap-3">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center text-white">
                <HugeiconsIcon icon={ShoppingBasket01Icon} size={24} />
              </div>
              <div className="w-14 h-14 bg-orange-400 rounded-2xl shadow-lg shadow-orange-200 mt-6 flex items-center justify-center text-white">
                <HugeiconsIcon icon={Home01Icon} size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                Save more money
              </h3>
              <p className="text-base text-gray-500 leading-relaxed font-medium">
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </p>
            </div>
            <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-bold text-sm tracking-[0.2em] hover:bg-black transition-all uppercase shadow-lg shadow-gray-200 active:scale-[0.98]">
              View Tips
            </button>
          </div>
          {/* Abstract Icon Decoration */}
          <div className="absolute top-6 right-6 text-blue-100 opacity-60 rotate-12 group-hover:rotate-45 transition-transform duration-700">
            <HugeiconsIcon icon={Home01Icon} size={120} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionItem({
  name,
  time,
  location,
  price,
  icon: Icon,
  color,
  id,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1 }}
      className="flex items-center justify-between group cursor-pointer hover:bg-gray-50/50 p-2 -mx-2 rounded-2xl transition-colors"
    >
      <div className="flex items-center gap-6">
        <div
          className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white shadow-xl shadow-gray-100 group-hover:scale-105 transition-transform`}
        >
          <HugeiconsIcon icon={Icon} size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
          <p className="text-sm text-gray-400 font-semibold">
            {time} <span className="mx-2 opacity-50">•</span> {location}
          </p>
        </div>
      </div>
      <span className="font-bold text-gray-900 text-lg">{price}</span>
    </motion.div>
  );
}
