"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Building2,
  BookOpen,
  Wallet,
  TrendingUp,
  Download,
  CalendarDays,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

/* ── Recharts (no SSR) ── */
const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const AreaChart = dynamic(() => import("recharts").then((m) => m.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then((m) => m.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });

/* ──────────────────────────────────────────
   MOCK DATA  (keyed by preset or "custom")
────────────────────────────────────────── */
type DataPoint = { label: string; current: number; previous: number };
type BookingPoint = { label: string; bookings: number; prev: number };

const revenueByPreset: Record<string, DataPoint[]> = {
  "Last 7 Days": [
    { label: "Mon", current: 42000, previous: 28000 },
    { label: "Tue", current: 35000, previous: 22000 },
    { label: "Wed", current: 55000, previous: 34000 },
    { label: "Thu", current: 38000, previous: 20000 },
    { label: "Fri", current: 62000, previous: 40000 },
    { label: "Sat", current: 58000, previous: 38000 },
    { label: "Sun", current: 47000, previous: 30000 },
  ],
  "Last 30 Days": [
    { label: "W1", current: 180000, previous: 130000 },
    { label: "W2", current: 220000, previous: 160000 },
    { label: "W3", current: 195000, previous: 140000 },
    { label: "W4", current: 260000, previous: 190000 },
  ],
  "This Month": [
    { label: "W1", current: 160000, previous: 110000 },
    { label: "W2", current: 200000, previous: 145000 },
    { label: "W3", current: 175000, previous: 130000 },
    { label: "W4", current: 240000, previous: 170000 },
  ],
  "Last Month": [
    { label: "W1", current: 140000, previous: 100000 },
    { label: "W2", current: 185000, previous: 135000 },
    { label: "W3", current: 160000, previous: 115000 },
    { label: "W4", current: 210000, previous: 155000 },
  ],
  "This Year": [
    { label: "Jan", current: 420000, previous: 300000 },
    { label: "Feb", current: 380000, previous: 280000 },
    { label: "Mar", current: 510000, previous: 360000 },
    { label: "Apr", current: 470000, previous: 320000 },
    { label: "May", current: 600000, previous: 420000 },
    { label: "Jun", current: 550000, previous: 390000 },
    { label: "Jul", current: 680000, previous: 480000 },
    { label: "Aug", current: 720000, previous: 510000 },
    { label: "Sep", current: 640000, previous: 450000 },
    { label: "Oct", current: 590000, previous: 410000 },
    { label: "Nov", current: 530000, previous: 370000 },
    { label: "Dec", current: 760000, previous: 540000 },
  ],
  custom: [
    { label: "Day 1", current: 32000, previous: 20000 },
    { label: "Day 2", current: 41000, previous: 25000 },
    { label: "Day 3", current: 28000, previous: 18000 },
    { label: "Day 4", current: 55000, previous: 35000 },
    { label: "Day 5", current: 47000, previous: 30000 },
    { label: "Day 6", current: 39000, previous: 24000 },
    { label: "Day 7", current: 62000, previous: 42000 },
  ],
};

const bookingsByPreset: Record<string, BookingPoint[]> = {
  "Last 7 Days": [
    { label: "Mon", bookings: 8, prev: 5 },
    { label: "Tue", bookings: 12, prev: 8 },
    { label: "Wed", bookings: 7, prev: 4 },
    { label: "Thu", bookings: 15, prev: 10 },
    { label: "Fri", bookings: 18, prev: 12 },
    { label: "Sat", bookings: 22, prev: 15 },
    { label: "Sun", bookings: 16, prev: 11 },
  ],
  "Last 30 Days": [
    { label: "W1", bookings: 42, prev: 28 },
    { label: "W2", bookings: 58, prev: 39 },
    { label: "W3", bookings: 49, prev: 33 },
    { label: "W4", bookings: 71, prev: 52 },
  ],
  "This Month": [
    { label: "W1", bookings: 38, prev: 25 },
    { label: "W2", bookings: 52, prev: 35 },
    { label: "W3", bookings: 45, prev: 30 },
    { label: "W4", bookings: 65, prev: 47 },
  ],
  "Last Month": [
    { label: "W1", bookings: 30, prev: 20 },
    { label: "W2", bookings: 44, prev: 30 },
    { label: "W3", bookings: 38, prev: 26 },
    { label: "W4", bookings: 55, prev: 40 },
  ],
  "This Year": [
    { label: "Jan", bookings: 80, prev: 55 },
    { label: "Feb", bookings: 95, prev: 60 },
    { label: "Mar", bookings: 110, prev: 72 },
    { label: "Apr", bookings: 130, prev: 88 },
    { label: "May", bookings: 120, prev: 80 },
    { label: "Jun", bookings: 155, prev: 100 },
    { label: "Jul", bookings: 145, prev: 95 },
    { label: "Aug", bookings: 170, prev: 115 },
    { label: "Sep", bookings: 160, prev: 108 },
    { label: "Oct", bookings: 140, prev: 92 },
    { label: "Nov", bookings: 130, prev: 88 },
    { label: "Dec", bookings: 190, prev: 130 },
  ],
  custom: [
    { label: "D1", bookings: 6, prev: 4 },
    { label: "D2", bookings: 10, prev: 7 },
    { label: "D3", bookings: 8, prev: 5 },
    { label: "D4", bookings: 14, prev: 9 },
    { label: "D5", bookings: 11, prev: 7 },
    { label: "D6", bookings: 9, prev: 6 },
    { label: "D7", bookings: 17, prev: 11 },
  ],
};

const statsByPreset: Record<string, { properties: string; bookings: string; revenue: string; occupancy: string }> = {
  "Last 7 Days":  { properties: "78", bookings: "98",  revenue: "337K", occupancy: "62%" },
  "Last 30 Days": { properties: "78", bookings: "220", revenue: "855K", occupancy: "68%" },
  "This Month":   { properties: "78", bookings: "200", revenue: "775K", occupancy: "65%" },
  "Last Month":   { properties: "78", bookings: "185", revenue: "695K", occupancy: "60%" },
  "This Year":    { properties: "78", bookings: "1580",revenue: "6.9M", occupancy: "75%" },
  custom:         { properties: "78", bookings: "98",  revenue: "304K", occupancy: "58%" },
};

const PRESETS = ["Last 7 Days", "Last 30 Days", "This Month", "Last Month", "This Year"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const tooltipStyle = {
  backgroundColor: "#fff",
  border: "1px solid #f0f0f0",
  borderRadius: "10px",
  fontSize: "12px",
  fontWeight: 700,
  boxShadow: "0 4px 20px -4px rgba(0,0,0,0.12)",
};

/* ── Calendar helper ── */
function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

/* ══════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════ */
export default function AnalyticsPage() {
  const today = new Date();

  /* ── Filter state ── */
  const [activePreset, setActivePreset] = useState<string>("Last 7 Days");
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd]   = useState<Date | null>(null);
  const [calOpen, setCalOpen]        = useState(false);
  const [hoveredDay, setHoveredDay]  = useState<Date | null>(null);
  const [calYear, setCalYear]        = useState(today.getFullYear());
  const [calMonth, setCalMonth]      = useState(today.getMonth());
  const [picking, setPicking]        = useState<"start" | "end">("start");
  const calRef = useRef<HTMLDivElement>(null);
  const [activeRevenueTab, setActiveRevenueTab] = useState("weekly");
  const [activeBookingsTab, setActiveBookingsTab] = useState("weekly");

  /* close calendar on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node)) setCalOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Derived filter key ── */
  const filterKey = (customStart || customEnd) ? "custom" : activePreset;

  /* ── Active label shown in header ── */
  const filterLabel = useMemo(() => {
    if (customStart && customEnd) return `${fmtDate(customStart)} – ${fmtDate(customEnd)}`;
    if (customStart) return `From ${fmtDate(customStart)}`;
    return activePreset;
  }, [activePreset, customStart, customEnd]);

  /* ── Chart data ── */
  const revenueData  = revenueByPreset[filterKey]  ?? revenueByPreset["Last 7 Days"];
  const bookingsData = bookingsByPreset[filterKey] ?? bookingsByPreset["Last 7 Days"];
  const stats        = statsByPreset[filterKey]    ?? statsByPreset["Last 7 Days"];

  /* ── Calendar helpers ── */
  const cells = buildCalendar(calYear, calMonth);

  function selectDay(day: number) {
    const d = new Date(calYear, calMonth, day);
    if (d > today) return; // block future
    if (picking === "start" || (customStart && customEnd)) {
      setCustomStart(d); setCustomEnd(null); setActivePreset(""); setPicking("end");
    } else {
      if (d < customStart!) { setCustomStart(d); setPicking("end"); }
      else { setCustomEnd(d); setCalOpen(false); setPicking("start"); }
    }
  }

  function isInRange(day: number) {
    const d = new Date(calYear, calMonth, day);
    const end = hoveredDay ?? customEnd;
    if (!customStart || !end) return false;
    const lo = customStart < end ? customStart : end;
    const hi = customStart < end ? end : customStart;
    return d > lo && d < hi;
  }

  function isStart(day: number) {
    if (!customStart) return false;
    const d = new Date(calYear, calMonth, day);
    return d.toDateString() === customStart.toDateString();
  }

  function isEnd(day: number) {
    const end = customEnd ?? hoveredDay;
    if (!end) return false;
    const d = new Date(calYear, calMonth, day);
    return d.toDateString() === end.toDateString();
  }

  function isFuture(day: number) {
    return new Date(calYear, calMonth, day) > today;
  }

  function resetFilters() {
    setActivePreset("Last 7 Days");
    setCustomStart(null);
    setCustomEnd(null);
    setCalOpen(false);
    setPicking("start");
  }

  const statCards = [
    { label: "Total properties", value: stats.properties, icon: Building2 },
    { label: "Total bookings",   value: stats.bookings,   icon: BookOpen },
    { label: "Total revenue",    value: stats.revenue,    icon: Wallet },
    { label: "Occupancy rate",   value: stats.occupancy,  icon: PieChartIcon },
  ];

  return (
    <div className="space-y-8 pb-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Analytics</h1>
          <p className="text-zinc-500 font-medium text-sm mt-1">Track your revenue and booking performance</p>
        </div>
        <button className="flex items-center gap-2 border border-[#002521] text-[#002521] font-bold px-5 py-2.5 rounded-lg hover:bg-zinc-50 transition shadow-sm">
          <ArrowUpFromLine size={16} strokeWidth={2.5} /> Export report
        </button>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex items-center gap-6">
            <div className="relative w-[60px] h-[60px] shrink-0">
              <svg className="absolute inset-0 w-[60px] h-[60px] -rotate-90">
                <circle cx="30" cy="30" r="26" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                <circle cx="30" cy="30" r="26" fill="none" stroke="#002521" strokeWidth="4"
                  strokeDasharray="163" strokeDashoffset={i === 0 ? "30" : i === 3 ? "80" : "40"} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-[6px] bg-white rounded-full shadow-md flex items-center justify-center border border-zinc-50">
                <stat.icon size={20} className="text-[#002521]" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-zinc-900 mb-2 leading-tight">{stat.label}</p>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-2xl font-extrabold text-zinc-900 leading-none">{stat.value}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#002521] whitespace-nowrap mt-1">
                  <TrendingUp size={10} />
                  <span>+3.6%</span>
                  <span className="text-zinc-400 font-medium ml-0.5">vs prev</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
        <div className="flex flex-col gap-4">

          {/* Top row: label + reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-[#002521]" />
              <span className="text-[13px] font-extrabold text-zinc-900">
                {filterLabel}
              </span>
              {(customStart || customEnd) && (
                <span className="text-[11px] font-bold text-zinc-400 ml-1">(Custom range)</span>
              )}
            </div>
            {(customStart || customEnd || activePreset !== "Last 7 Days") && (
              <button onClick={resetFilters}
                className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 hover:text-red-500 transition"
              >
                <X size={13} /> Reset
              </button>
            )}
          </div>

          {/* Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => { setActivePreset(preset); setCustomStart(null); setCustomEnd(null); }}
                className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all border ${
                  activePreset === preset && !customStart && !customEnd
                    ? "bg-[#002521] text-white border-[#002521] shadow-sm shadow-[#002521]/20"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-[#002521] hover:text-[#002521]"
                }`}
              >
                {preset}
              </button>
            ))}

            {/* Custom date picker trigger */}
            <div className="relative ml-auto" ref={calRef}>
              <button
                onClick={() => setCalOpen(!calOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold border transition-all ${
                  customStart || customEnd
                    ? "bg-[#002521] text-white border-[#002521] shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-[#002521] hover:text-[#002521]"
                }`}
              >
                <CalendarDays size={14} />
                {customStart && customEnd
                  ? `${fmtDate(customStart)} – ${fmtDate(customEnd)}`
                  : customStart
                  ? `From ${fmtDate(customStart)}`
                  : "Custom range"}
              </button>

              {/* Calendar dropdown */}
              <AnimatePresence>
                {calOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-zinc-100 shadow-2xl p-5 w-[320px]"
                  >
                    {/* Calendar nav */}
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => {
                        if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                        else setCalMonth(m => m - 1);
                      }} className="p-1.5 hover:bg-zinc-100 rounded-lg transition">
                        <ChevronLeft size={16} className="text-zinc-500" />
                      </button>
                      <span className="text-[13px] font-extrabold text-zinc-900">
                        {MONTHS[calMonth]} {calYear}
                      </span>
                      <button onClick={() => {
                        if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                        else setCalMonth(m => m + 1);
                      }} className="p-1.5 hover:bg-zinc-100 rounded-lg transition">
                        <ChevronRight size={16} className="text-zinc-500" />
                      </button>
                    </div>

                    {/* Day labels */}
                    <div className="grid grid-cols-7 mb-2">
                      {DAYS.map(d => (
                        <span key={d} className="text-center text-[11px] font-bold text-zinc-400 py-1">{d}</span>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-y-1">
                      {cells.map((day, idx) =>
                        day == null ? (
                          <span key={`e-${idx}`} />
                        ) : (
                          <button
                            key={`d-${day}`}
                            disabled={isFuture(day)}
                            onClick={() => selectDay(day)}
                            onMouseEnter={() => customStart && !customEnd && setHoveredDay(new Date(calYear, calMonth, day))}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-9 h-9 mx-auto flex items-center justify-center text-[12px] font-bold rounded-full transition-all
                              ${isFuture(day) ? "text-zinc-200 cursor-not-allowed" : ""}
                              ${isStart(day) ? "bg-[#002521] text-white shadow-sm" : ""}
                              ${isEnd(day) && !isStart(day) ? "bg-[#002521] text-white shadow-sm" : ""}
                              ${isInRange(day) ? "bg-[#002521]/5 text-[#002521] rounded-none" : ""}
                              ${!isStart(day) && !isEnd(day) && !isInRange(day) && !isFuture(day) ? "hover:bg-zinc-100 text-zinc-700" : ""}
                            `}
                          >
                            {day}
                          </button>
                        )
                      )}
                    </div>

                    {/* Calendar footer */}
                    <div className="mt-4 pt-4 border-t border-zinc-50 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {picking === "start" ? "Select start date" : "Select end date"}
                      </span>
                      {(customStart || customEnd) && (
                        <button onClick={() => { setCustomStart(null); setCustomEnd(null); setPicking("start"); }}
                          className="text-[11px] font-bold text-red-400 hover:text-red-600 transition"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Revenue Overview ── */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[17px] font-extrabold text-zinc-900 tracking-tight">Revenue overview</h3>
          <TabSwitcher tabs={["weekly", "monthly", "annually"]} active={activeRevenueTab} onChange={setActiveRevenueTab} />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false}
              tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}k` : `${v}`} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,0,0,0.03)" }}
              formatter={(val: any) => [`${Number(val).toLocaleString()} RWF`]} />
            <Bar dataKey="previous" name="Previous Period" fill="#D1E5E2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current"  name="Current Period"  fill="#002521" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-8 mt-4">
          <LegendDot color="#002521" label="Current Period" />
          <LegendDot color="#D1E5E2" label="Previous Period" />
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bookings Over Time */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[17px] font-extrabold text-zinc-900 tracking-tight">Bookings over time</h3>
            <TabSwitcher tabs={["weekly", "monthly", "annually"]} active={activeBookingsTab} onChange={setActiveBookingsTab} />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={bookingsData}>
              <defs>
                <linearGradient id="bkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#002521" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#002521" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="prvFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#D1E5E2" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#D1E5E2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#e2e8f0" }} />
              <Area type="monotone" dataKey="prev"     name="Previous" stroke="#D1E5E2" strokeWidth={2}   fill="url(#prvFill)" dot={false} />
              <Area type="monotone" dataKey="bookings" name="Current"  stroke="#002521" strokeWidth={2.5} fill="url(#bkFill)"  dot={{ r: 4, fill: "#002521" }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-8 mt-4">
            <LegendDot color="#002521" label="Current Period" />
            <LegendDot color="#D1E5E2" label="Previous Period" />
          </div>
        </div>

        {/* Booking Rate Radial */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[17px] font-extrabold text-zinc-900 tracking-tight">Booking rate</h3>
            <button className="bg-[#002521] text-white flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm hover:bg-[#002521]/90 transition">
              <Download size={12} /> Export
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="relative flex justify-center items-center h-[180px]">
              <svg className="w-[180px] h-[180px] origin-center -rotate-[135deg]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" strokeDasharray="212" strokeDashoffset="70" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#002521" strokeWidth="6" strokeLinecap="round" strokeDasharray="212" strokeDashoffset="120" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" strokeDasharray="165" strokeDashoffset="55" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#002521" strokeWidth="6" strokeLinecap="round" strokeDasharray="165" strokeDashoffset="110" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" strokeDasharray="118" strokeDashoffset="40" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#D1E5E2" strokeWidth="6" strokeLinecap="round" strokeDasharray="118" strokeDashoffset="80" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="text-2xl font-extrabold text-[#002521]">150k</span>
              </div>
            </div>
            <div className="space-y-4 w-full max-w-[220px] mx-auto">
              {[
                { label: "Accepted", color: "#002521", pct: "30%" },
                { label: "Pending",  color: "#6ee7b7", pct: "20%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-[13px] font-bold text-zinc-900">{item.label}</span>
                  </div>
                  <span className="text-[13px] font-black text-zinc-900">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared UI atoms ── */
function TabSwitcher({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="bg-zinc-50/80 p-1 rounded-xl flex gap-1 border border-zinc-100/50">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onChange(tab)}
          className={`px-5 py-2 rounded-lg text-[11px] font-bold capitalize transition-all ${
            active === tab ? "bg-white text-[#002521] shadow-sm" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      <span className="text-[11px] font-bold text-zinc-700">{label}</span>
    </div>
  );
}

function PieChartIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
