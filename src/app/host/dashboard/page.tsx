"use client";

import { useAuth } from "@/context/AuthContext";
import { useBookingStore, Booking } from "@/store/useBookingStore";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Building2,
  BookOpen,
  Wallet,
  PieChart,
  TrendingUp,
  Download,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle2,
  XCircle,
  X,
  CalendarDays,
  MapPin,
  Star,
  MessageSquare,
  Info,
  LayoutGrid,
} from "lucide-react";
import { useState, useMemo } from "react";

/* ── Recharts (no SSR to avoid hydration errors) ── */
const RBarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const RBar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const RXAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const RYAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const RCartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const RTooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const RResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });

/* ── Revenue mock data by period ── */
const revenueData: Record<string, { day: string; current: number; previous: number }[]> = {
  weekly: [
    { day: "Mon", current: 42000, previous: 28000 },
    { day: "Tue", current: 35000, previous: 22000 },
    { day: "Wed", current: 55000, previous: 34000 },
    { day: "Thu", current: 38000, previous: 20000 },
    { day: "Fri", current: 62000, previous: 40000 },
    { day: "Sat", current: 58000, previous: 38000 },
    { day: "Sun", current: 47000, previous: 30000 },
  ],
  Monthly: [
    { day: "W1", current: 180000, previous: 130000 },
    { day: "W2", current: 220000, previous: 160000 },
    { day: "W3", current: 195000, previous: 140000 },
    { day: "W4", current: 260000, previous: 190000 },
  ],
  Annually: [
    { day: "Jan", current: 420000, previous: 300000 },
    { day: "Feb", current: 380000, previous: 280000 },
    { day: "Mar", current: 510000, previous: 360000 },
    { day: "Apr", current: 470000, previous: 320000 },
    { day: "May", current: 600000, previous: 420000 },
    { day: "Jun", current: 550000, previous: 390000 },
    { day: "Jul", current: 680000, previous: 480000 },
    { day: "Aug", current: 720000, previous: 510000 },
    { day: "Sep", current: 640000, previous: 450000 },
    { day: "Oct", current: 590000, previous: 410000 },
    { day: "Nov", current: 530000, previous: 370000 },
    { day: "Dec", current: 760000, previous: 540000 },
  ],
};

const tooltipStyle = {
  backgroundColor: "#fff",
  border: "1px solid #f0f0f0",
  borderRadius: "10px",
  fontSize: "12px",
  fontWeight: 700,
  boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
};

export default function HostDashboardPage() {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useBookingStore();
  const [activeTab, setActiveTab] = useState("weekly");
  const [filterStatus, setFilterStatus] = useState("All status");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ── Action state ── */
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState("Guest Information");
  const [confirmAction, setConfirmAction] = useState<{ id: number; status: Booking["status"] } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function executeStatusUpdate(id: number, status: Booking["status"]) {
    updateBookingStatus(id, status);
    // Keep selectedBooking in sync if the modal is open for this booking
    if (selectedBooking?.id === id) setSelectedBooking((b) => b ? { ...b, status } : b);
    showToast(`Booking ${status.toLowerCase()} successfully`);
    setConfirmAction(null);
  }

  const stats = [
    { label: "Total properties", value: "78",   trend: "3.6", subtext: "This month", icon: Building2 },
    { label: "Total bookings",   value: "128",   trend: "3.6", subtext: "This month", icon: BookOpen },
    { label: "Total revenue",    value: "30,000",trend: "3.6", subtext: "This month", icon: Wallet },
    { label: "Occupancy rate",   value: "35%",   trend: "3.6", subtext: "This month", icon: PieChart },
  ];

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => new Date(b.arrival).getTime() - new Date(a.arrival).getTime());
  }, [bookings]);

  const dashboardBookings = useMemo(() => {
    const filtered = filterStatus === "All status"
      ? sortedBookings
      : sortedBookings.filter((b) => b.status === filterStatus);
    return filtered.slice(0, 5);
  }, [sortedBookings, filterStatus]);

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">
          Good to see you {user?.name?.split(" ")[0] || "Umurerwa"}!
        </h1>
        <p className="text-zinc-500 font-semibold text-base">Manage your real estate properties using StayWell</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-zinc-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center gap-6"
          >
            <div className="relative w-[70px] h-[70px] shrink-0">
              <div className="absolute inset-0 rounded-full bg-white shadow-inner"></div>
              <svg className="absolute inset-0 w-[70px] h-[70px] -rotate-90">
                <circle cx="35" cy="35" r="30" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                <circle
                  cx="35" cy="35" r="30" fill="none" stroke="#002521" strokeWidth="4"
                  strokeDasharray="188.4" strokeDashoffset="47" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-[8px] bg-white rounded-full shadow-lg flex items-center justify-center border border-zinc-50">
                <stat.icon size={22} className="text-[#002521]" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[12px] font-bold text-zinc-900 mb-3 leading-tight tracking-tight">{stat.label}</p>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-2xl font-extrabold text-zinc-900 leading-none">{stat.value}</span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#002521] whitespace-nowrap">
                  <TrendingUp size={12} className="text-[#002521]" />
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
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Revenue overview</h3>
            <div className="bg-zinc-200/50 p-1 rounded-xl flex gap-1">
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

          <RResponsiveContainer width="100%" height={280}>
            <RBarChart data={revenueData[activeTab] ?? revenueData.weekly} barGap={4} barCategoryGap="30%">
              <RCartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
              <RXAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <RYAxis tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}k` : `${v}`} />
              <RTooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,0,0,0.03)" }}
                formatter={(val: any) => [`${Number(val).toLocaleString()} RWF`]} />
              <RBar dataKey="previous" name="Previous Period" fill="#D1E5E2" radius={[4, 4, 0, 0]} />
              <RBar dataKey="current" name="Current Period" fill="#002521" radius={[4, 4, 0, 0]} />
            </RBarChart>
          </RResponsiveContainer>

          <div className="flex items-center justify-center gap-10 mt-6 pt-6 border-t border-zinc-50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-[#002521]"></div>
              <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Current Period</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-[#A7DDD0]"></div>
              <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Previous Period</span>
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
                cx="90" cy="90" r="75" fill="none" stroke="#002521" strokeWidth="12"
                strokeDasharray="471" strokeLinecap="round"
              />
              <circle cx="90" cy="90" r="58" fill="none" stroke="#F8FAFC" strokeWidth="12" />
              <motion.circle
                initial={{ strokeDashoffset: 364 }}
                animate={{ strokeDashoffset: 182 }}
                cx="90" cy="90" r="58" fill="none" stroke="#002521" strokeWidth="12" opacity="0.6"
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
              { label: "Booked", color: "bg-[#002521]", percent: "75%" },
              { label: "Available", color: "bg-[#D1E5E2]", percent: "25%" },
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

      {/* ── Booking History Table (identical to Bookings page) ── */}
      <section className="space-y-5">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">Booking History</h3>

          {/* Controls – same bar as Bookings page */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition"
              >
                <Filter size={15} className="text-zinc-400" />
                {filterStatus}
                <ChevronDown size={13} className={`text-zinc-400 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-100 rounded-xl shadow-xl z-30 py-2 transition-all ${isFilterOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                {["All status", "Confirmed", "Rejected", "Pending"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setFilterStatus(s); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-[12px] font-bold hover:bg-zinc-50 transition-colors ${filterStatus === s ? "text-[#002521]" : "text-zinc-700"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Export */}
            <button className="flex items-center gap-2 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition">
              <Download size={15} className="text-zinc-400" />
              Export
            </button>
          </div>
        </div>

        {/* Table – pixel-for-pixel copy of Bookings page */}
        <div className="bg-white rounded-xl border border-zinc-200/60 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#002521] text-white">
                  <th className="p-5 w-14 text-center">
                    <div className="w-4 h-4 border border-white/20 rounded-md mx-auto"></div>
                  </th>
                  <th className="p-5 text-[12px] font-semibold tracking-wide">Guest Name</th>
                  <th className="p-5 text-[12px] font-semibold tracking-wide">Property</th>
                  <th className="p-5 text-[12px] font-semibold tracking-wide">Arrival</th>
                  <th className="p-5 text-[12px] font-semibold tracking-wide">Departure</th>
                  <th className="p-5 text-[12px] font-semibold tracking-wide text-center">Status</th>
                  <th className="p-5 text-[12px] font-semibold tracking-wide text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/80">
                <AnimatePresence mode="popLayout">
                  {dashboardBookings.map((booking, i) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={`${booking.id}-${i}`}
                      className={`transition-all hover:bg-zinc-50 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}`}
                    >
                      <td className="p-4 text-center">
                        <div className="w-4 h-4 border border-zinc-200 rounded-md mx-auto"></div>
                      </td>
                      <td className="p-4 text-[13px] font-semibold text-zinc-900">{booking.guest}</td>
                      <td className="p-4 text-[13px] font-medium text-zinc-500">{booking.property}</td>
                      <td className="p-4 text-[13px] font-medium text-zinc-700">{booking.arrival}</td>
                      <td className="p-4 text-[13px] font-medium text-zinc-700">{booking.departure}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-4 py-1.5 rounded-md text-[11px] font-bold tracking-wide ${
                          booking.status === "Confirmed" || booking.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : booking.status === "In Progress"
                            ? "bg-blue-50 text-blue-600"
                            : booking.status === "Rejected" || booking.status === "Cancelled"
                            ? "bg-red-50 text-red-600"
                            : "bg-zinc-100 text-zinc-600"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setSelectedBooking(booking); setModalActiveTab("Guest Information"); setIsModalOpen(true); }}
                            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => setConfirmAction({ id: booking.id, status: "Confirmed" })}
                            className="p-1.5 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition"
                            title="Approve"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button
                            onClick={() => setConfirmAction({ id: booking.id, status: "Rejected" })}
                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {dashboardBookings.length === 0 && (
            <div className="p-16 text-center text-zinc-400 font-medium italic">
              No bookings found for this filter.
            </div>
          )}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[13px] font-semibold text-zinc-500">
            Showing {dashboardBookings.length} latest booking{dashboardBookings.length !== 1 ? "s" : ""}
          </span>
          <a href="/host/dashboard/bookings" className="text-[12px] font-bold text-[#002521] hover:underline transition">
            View all bookings →
          </a>
        </div>
      </section>

      {/* ─── View Details Modal (matches Bookings page) ─── */}
      <AnimatePresence>
        {isModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#002521] text-white px-8 py-5 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold">View Booking details</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-between px-10 pt-4 border-b border-zinc-100 bg-white shadow-sm z-10 sticky top-0 shrink-0">
                {["Guest Information", "Booking details", "Payment Information"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setModalActiveTab(tab)}
                    className={`pb-4 px-2 text-[14px] font-bold transition-all relative ${
                      modalActiveTab === tab ? "text-[#002521]" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {tab}
                    {modalActiveTab === tab && (
                      <motion.div layoutId="dash-modal-tab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#002521] rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-10 overflow-y-auto flex-1 bg-zinc-50/30">

                {/* 1. Guest Information */}
                {modalActiveTab === "Guest Information" && (
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col md:flex-row gap-10 items-start w-full bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
                      <div className="w-[200px] h-[200px] rounded-xl overflow-hidden shadow-inner border border-zinc-100 shrink-0 relative">
                        <Image
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop"
                          fill sizes="200px" alt="Guest Profile" className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-5 py-2">
                        {[
                          { label: "Guest Name",   value: selectedBooking.guest },
                          { label: "Gender",       value: "Male" },
                          { label: "Email",        value: "johndoes@gmail.com" },
                          { label: "Contact info", value: "+250 799 888 83" },
                          { label: "Location",     value: "Kigali, Nyarugenge" },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex gap-2 text-sm">
                            <span className="text-zinc-500 font-semibold w-28">{label}:</span>
                            <span className="font-bold text-zinc-900">{value}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-sm pt-2">
                          <Star size={18} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-zinc-900">4.8 Reviews</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-8 bg-[#002521] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#001a18] transition shadow-md">
                      <MessageSquare size={18} /> Message Guest
                    </button>
                  </div>
                )}

                {/* 2. Booking Details */}
                {modalActiveTab === "Booking details" && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-zinc-900 mb-4">Booked Property</h3>
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-8">
                      <div className="w-[300px] h-[180px] rounded-xl overflow-hidden relative shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                          fill sizes="300px" className="object-cover" alt="Property"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-extrabold text-zinc-900">{selectedBooking.property}</h4>
                            <div className="flex items-center gap-1 font-bold text-sm">
                              <Star size={16} className="text-yellow-400 fill-yellow-400" /> 4.8
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium text-zinc-500 mb-6">
                            <MapPin size={14} /> Kigali, Rwanda
                          </div>
                          <div className="grid grid-cols-2 gap-y-4 text-sm font-medium text-zinc-700">
                            <div className="flex items-center gap-2"><LayoutGrid size={16} /> 2500 Ares</div>
                            <div className="flex items-center gap-2"><BookOpen size={16} /> 15 Bookings</div>
                            <div className="flex items-center gap-2"><Building2 size={16} /> 12 Bathrooms</div>
                            <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 size={16} /> Available</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-6">
                          <div>
                            <div className="text-lg font-extrabold text-emerald-600">RWF 150,000</div>
                            <div className="text-xs font-semibold text-zinc-500">Per night</div>
                          </div>
                          <button className="text-sm font-bold text-zinc-600 flex items-center gap-1 hover:text-zinc-900 transition">
                            Read more <ChevronDown size={16} className="-rotate-90" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                      {[
                        { label: "Check IN",  value: selectedBooking.arrival },
                        { label: "Check OUT", value: selectedBooking.departure },
                        { label: "Duration",  value: "5 Nights" },
                        { label: "Guests",    value: "2 Adults, 1 Child" },
                      ].map(({ label, value }) => (
                        <div key={label} className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900">{label}</label>
                          <div className="bg-white border border-zinc-200 rounded-lg p-3.5 text-sm font-semibold text-zinc-800 shadow-sm">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Payment Information */}
                {modalActiveTab === "Payment Information" && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-zinc-900 mb-4">Payment Details</h3>
                    <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                      <div className="space-y-5 pb-6 border-b border-zinc-100">
                        {[
                          { label: "RWF 150,000 × 5 Nights", amount: "RWF 750,000" },
                          { label: "Cleaning fee",            amount: "RWF 25,000" },
                          { label: "Service fee",             amount: "RWF 15,000" },
                          { label: "Taxes",                   amount: "RWF 10,000" },
                        ].map(({ label, amount }) => (
                          <div key={label} className="flex justify-between items-center text-sm font-semibold text-zinc-700">
                            <div className="flex items-center gap-3"><Info size={18} className="text-zinc-400" /> {label}</div>
                            <div>{amount}</div>
                          </div>
                        ))}
                      </div>
                      <div className="py-6 border-b border-zinc-100 flex justify-between items-center">
                        <div className="font-extrabold text-[#002521]">Total Amount</div>
                        <div className="font-black text-emerald-600 text-lg">RWF 800,000</div>
                      </div>
                      <div className="pt-6 space-y-4">
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="text-zinc-600">Payment status</span>
                          <span className="text-emerald-500">Paid</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="text-zinc-600">Payment Method</span>
                          <span className="text-zinc-900">Credit Card (••••4576)</span>
                        </div>
                      </div>
                      <button className="mt-8 font-bold text-[#002521] text-sm flex items-center gap-2 hover:underline">
                        View Transaction details <TrendingUp size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center px-10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    selectedBooking.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" :
                    selectedBooking.status === "Rejected"  ? "bg-red-100 text-red-700" :
                    "bg-zinc-200 text-zinc-700"
                  }`}>{selectedBooking.status}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition">
                    Close
                  </button>
                  {selectedBooking.status !== "Confirmed" && (
                    <button
                      onClick={() => { setIsModalOpen(false); setConfirmAction({ id: selectedBooking.id, status: "Confirmed" }); }}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition"
                    >
                      Approve Booking
                    </button>
                  )}
                  {selectedBooking.status !== "Rejected" && (
                    <button
                      onClick={() => { setIsModalOpen(false); setConfirmAction({ id: selectedBooking.id, status: "Rejected" }); }}
                      className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition"
                    >
                      Reject Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Confirm Dialog ─── */}
      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmAction(null)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 ${
                confirmAction.status === "Confirmed" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
              }`}>
                {confirmAction.status === "Confirmed" ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <h3 className="text-xl font-extrabold text-zinc-900 mb-2">
                {confirmAction.status === "Confirmed" ? "Approve Booking" : "Reject Booking"}
              </h3>
              <p className="text-zinc-500 text-sm font-medium mb-8">
                Are you sure you want to {confirmAction.status === "Confirmed" ? "approve" : "reject"} this booking?
                This action will update the status immediately.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-3 bg-zinc-100 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeStatusUpdate(confirmAction.id, confirmAction.status)}
                  className={`flex-1 py-3 text-white rounded-xl text-sm font-bold shadow-lg transition ${
                    confirmAction.status === "Confirmed"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Toast ─── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={`fixed bottom-10 left-1/2 z-[120] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-white font-bold text-sm ${
              toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
