"use client";

import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2,
  BookOpen,
  Wallet,
  PieChart,
  TrendingUp,
  Download,
  Filter,
  ChevronDown,
  MoreVertical
} from "lucide-react";
import { useState, useMemo } from "react";

export default function HostDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("weekly");
  const [filterStatus, setFilterStatus] = useState("All status");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const stats = [
    { label: "Total properties", value: "78", trend: "3.6", subtext: "This month", icon: Building2 },
    { label: "Total bookings", value: "128", trend: "3.6", subtext: "This month", icon: BookOpen },
    { label: "Total revenue", value: "30,00", trend: "3.6", subtext: "This month", icon: Wallet },
    { label: "Occupancy rate", value: "35%", trend: "3.6", subtext: "This month", icon: PieChart },
  ];

  const initialBookings = [
    { guest: "Sarah Johnson", property: "Luxury Villa Kigali", arrival: "12 - 07 - 2025", departure: "12 - 07 - 2025", status: "Completed" },
    { guest: "Michael Jen", property: "Luxury Villa Kigali", arrival: "12 - 07 - 2025", departure: "12 - 07 - 2025", status: "In Progress" },
    { guest: "Emma wilson", property: "Luxury Villa Kigali", arrival: "12 - 07 - 2025", departure: "12 - 07 - 2025", status: "Completed" },
    { guest: "David brown", property: "Luxury Villa Kigali", arrival: "12 - 07 - 2025", departure: "12 - 07 - 2025", status: "Cancelled" },
    { guest: "Lisa anderson", property: "Luxury Villa Kigali", arrival: "12 - 07 - 2025", departure: "12 - 07 - 2025", status: "Completed" },
  ];

  const filteredBookings = useMemo(() => {
    if (filterStatus === "All status") return initialBookings;
    return initialBookings.filter(b => b.status === filterStatus);
  }, [filterStatus]);

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Good to see you {user?.name?.split(" ")[0] || "Umurerwa"}!</h1>
        <p className="text-zinc-500 font-semibold text-base">Manage your real estate properties using StayWell</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex items-center gap-6"
          >
            <div className="relative w-[70px] h-[70px] shrink-0">
              <div className="absolute inset-0 rounded-full bg-white shadow-inner"></div>
              <svg className="absolute inset-0 w-[70px] h-[70px] -rotate-90">
                <circle cx="35" cy="35" r="30" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                <circle 
                  cx="35" cy="35" r="30" fill="none" stroke="#005244" strokeWidth="4" 
                  strokeDasharray="188.4" strokeDashoffset="47" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-[8px] bg-white rounded-full shadow-lg flex items-center justify-center border border-zinc-50">
                <stat.icon size={22} className="text-[#005244]" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[12px] font-bold text-zinc-900 mb-3 leading-tight tracking-tight">{stat.label}</p>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-2xl font-extrabold text-zinc-900 leading-none">{stat.value}</span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#005244] whitespace-nowrap">
                  <TrendingUp size={12} className="text-[#005244]" />
                  <span>{stat.trend}</span>
                  <span className="text-zinc-400 font-medium ml-0.5">This month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Revenue overview</h3>
            <div className="bg-zinc-100/50 p-1 rounded-xl flex gap-1">
              {["Annually", "Monthly", "weekly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-[11px] font-bold transition-all uppercase tracking-widest ${
                    activeTab === tab 
                      ? "bg-white text-zinc-900 shadow-sm ring-1 ring-black/5" 
                      : "text-zinc-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex-1 h-[280px] w-full min-h-[250px]">
              <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-10">
                {[80, 60, 40, 20, 0].map((val) => (
                  <div key={val} className="flex items-center gap-4 w-full">
                    <span className="text-[11px] font-bold text-zinc-300 w-6">{val}</span>
                    <div className="flex-1 h-[1px] border-t border-dashed border-zinc-100"></div>
                  </div>
                ))}
              </div>
              
              <div className="absolute left-10 right-0 bottom-10 top-0 flex items-end justify-around px-4 lg:px-10">
                {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-4 group">
                    <div className="flex items-end gap-1.5 h-full relative" style={{ height: '100%', minHeight: '100%' }}>
                      <div 
                        style={{ height: `${[85, 75, 80, 65, 90, 85, 80][i]}%`, minWidth: '20px' }}
                        className="bg-[#005244] rounded-t-sm shadow-sm z-10"
                      />
                      <div 
                        style={{ height: `${[50, 40, 35, 20, 40, 25, 70][i]}%`, minWidth: '20px' }}
                        className="bg-[#005244] opacity-20 rounded-t-sm z-10"
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ${[45, 38, 42, 30, 48, 45, 40][i]}k
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">{day}</span>
                  </div>
                ))}
              </div>
          </div>

          <div className="flex items-center justify-center gap-10 mt-6 pt-6 border-t border-zinc-50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-[#005244]"></div>
              <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Current Period</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-[#005244] opacity-20"></div>
              <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Previous period</span>
            </div>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Occupancy rate</h3>
            <button className="p-2 border border-zinc-100 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all">
              <Download size={16} />
            </button>
          </div>

          <div className="relative flex-1 flex justify-center items-center min-h-[200px]">
            <svg className="w-[180px] h-[180px] -rotate-90">
              <circle cx="90" cy="90" r="75" fill="none" stroke="#F8FAFC" strokeWidth="12" />
              <motion.circle 
                initial={{ strokeDashoffset: 471 }}
                animate={{ strokeDashoffset: 141 }}
                cx="90" cy="90" r="75" fill="none" stroke="#005244" strokeWidth="12" 
                strokeDasharray="471" strokeLinecap="round"
              />
              <circle cx="90" cy="90" r="58" fill="none" stroke="#F8FAFC" strokeWidth="12" />
              <motion.circle 
                initial={{ strokeDashoffset: 364 }}
                animate={{ strokeDashoffset: 182 }}
                cx="90" cy="90" r="58" fill="none" stroke="#005244" strokeWidth="12" opacity="0.6"
                strokeDasharray="364" strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-zinc-900 tracking-tighter">75%</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Average</span>
            </div>
          </div>

          <div className="space-y-4 mt-8 pt-6 border-t border-zinc-50">
            {[
              { label: "Booked", color: "bg-[#005244]", percent: "75%" },
              { label: "Available", color: "bg-emerald-100", percent: "25%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</span>
                </div>
                <span className="text-[13px] font-black text-zinc-900">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking History Table */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Booking History</h3>
          <div className="flex gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 border border-zinc-100 bg-white px-5 py-2.5 rounded-lg text-[12px] font-bold text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm"
              >
                <Filter size={16} className="text-zinc-400" /> 
                {filterStatus}
                <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-100 rounded-xl shadow-xl transition-all z-30 py-2 ${isFilterOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                {["All status", "Completed", "In Progress", "Cancelled"].map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-zinc-50 text-zinc-700 transition-colors"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-2 border border-zinc-100 bg-white px-5 py-2.5 rounded-lg text-[12px] font-bold text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm">
              <Download size={16} className="text-zinc-400" /> Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0F3D2E] text-white">
                  <th className="p-6 w-14 text-center">
                    <div className="w-4 h-4 border border-white/20 rounded-md mx-auto"></div>
                  </th>
                  <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-white/70">Guest Name</th>
                  <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-white/70">Property</th>
                  <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-white/70">Arrival</th>
                  <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-white/70">Departure</th>
                  <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-white/70 text-center">Status</th>
                  <th className="p-6 text-[11px] font-bold uppercase tracking-widest text-white/70 text-right pr-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((booking, i) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={`${booking.guest}-${i}`} 
                      className={`transition-all hover:bg-emerald-50/20 group ${i % 2 === 1 ? 'bg-zinc-50/30' : 'bg-white'}`}
                    >
                      <td className="p-6 text-center">
                        <div className="w-4 h-4 border border-zinc-200 rounded-md mx-auto transition-colors group-hover:border-emerald-300"></div>
                      </td>
                      <td className="p-6 text-sm font-bold text-zinc-900">{booking.guest}</td>
                      <td className="p-6 text-sm font-semibold text-zinc-500">{booking.property}</td>
                      <td className="p-6 text-sm font-semibold text-zinc-400">{booking.arrival}</td>
                      <td className="p-6 text-sm font-semibold text-zinc-400">{booking.departure}</td>
                      <td className="p-6 text-center">
                        <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          booking.status === 'Completed' ? 'bg-emerald-50 text-[#005244]' : 
                          booking.status === 'In Progress' ? 'bg-[#003129] text-white' : 
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-6 text-right pr-12">
                        <button className="text-zinc-300 hover:text-[#003129] transition-colors p-2 hover:bg-zinc-50 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="p-20 text-center">
                <p className="text-zinc-400 font-bold">No bookings found with this status.</p>
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
