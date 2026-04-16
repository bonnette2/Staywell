"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Home, BarChart3, MessageSquare, Settings, LogOut } from "lucide-react";

export default function HostDashboard() {
  const { user, logout } = useAuth();

  const sidebarItems = [
    { name: "Overview", icon: BarChart3, active: true },
    { name: "My Listings", icon: Home },
    { name: "Messages", icon: MessageSquare },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-zinc-100 hidden lg:flex flex-col p-8 shrink-0">
        <Link href="/" className="text-2xl font-bold text-primary mb-12">StayWell</Link>
        
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                item.active 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all mt-auto"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">Welcome back, {user?.name.split(" ")[0]}!</h1>
            <p className="text-zinc-500 font-medium">Here's what's happening with your properties today.</p>
          </div>
          <button className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-[#064e3b] transition-all shadow-lg shadow-primary/20 shrink-0">
            <Plus size={20} />
            Add New Property
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Total Revenue", value: "$4,250", trend: "+12%" },
            { label: "Bookings", value: "18", trend: "+5%" },
            { label: "Avg. Rating", value: "4.9", trend: "0.0" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/20"
            >
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-zinc-900">{stat.value}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="bg-white rounded-[3rem] border border-zinc-100 shadow-2xl p-10 overflow-hidden">
          <h2 className="text-xl font-bold text-zinc-900 mb-8 px-2">Recent Activity</h2>
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300 mx-auto mb-6">
              <Home size={40} />
            </div>
            <p className="text-zinc-500 font-bold text-lg mb-2">No active listings yet</p>
            <p className="text-zinc-400 font-medium max-w-sm mx-auto mb-8 text-sm">
              Start earning by listing your property on StayWell. It only takes a few minutes to get started.
            </p>
            <button className="px-10 py-4 border-2 border-zinc-100 text-zinc-800 rounded-2xl font-bold hover:bg-zinc-50 transition-all">
              Learn how to list
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
