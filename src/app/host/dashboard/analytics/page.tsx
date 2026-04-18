"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  BookOpen, 
  Wallet, 
  PieChart, 
  TrendingUp,
  Download,
  CalendarMinus,
  ArrowUpFromLine,
  ChevronDown
} from "lucide-react";

export default function AnalyticsPage() {
  const [activeDateTab, setActiveDateTab] = useState("Last 7 days");
  const [activeRevenueTab, setActiveRevenueTab] = useState("weekly");
  const [activeBookingsTab, setActiveBookingsTab] = useState("weekly");

  const stats = [
    { label: "Total properties", value: "78%", trend: "~ 3.6", icon: Building2 },
    { label: "Total bookings", value: "128", trend: "~ 3.6", icon: BookOpen },
    { label: "Total transactions", value: "30,00", trend: "~ 3.6", icon: Wallet },
    { label: "Occupancy rate", value: "35%", trend: "~ 3.6", icon: PieChartIcon },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Analytics</h1>
          <p className="text-zinc-500 font-medium text-sm">Manage you real estate properties using staywell</p>
        </div>
        <button className="flex items-center gap-2 border border-[#0F3D2E] text-[#0F3D2E] font-bold px-5 py-2.5 rounded-lg hover:bg-zinc-50 transition-all shadow-sm">
          <ArrowUpFromLine size={16} strokeWidth={2.5} />
          Export report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex items-center gap-6"
          >
            <div className="relative w-[60px] h-[60px] shrink-0">
              <div className="absolute inset-0 rounded-full bg-white shadow-inner"></div>
              <svg className="absolute inset-0 w-[60px] h-[60px] -rotate-90">
                <circle cx="30" cy="30" r="26" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                <circle 
                  cx="30" cy="30" r="26" fill="none" stroke="#005244" strokeWidth="4" 
                  strokeDasharray="163" strokeDashoffset={i === 0 ? "30" : i === 3 ? "80" : "40"} strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-[6px] bg-white rounded-full shadow-md flex items-center justify-center border border-zinc-50">
                <stat.icon size={20} className="text-[#005244]" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[12px] font-bold text-zinc-900 mb-2 leading-tight">{stat.label}</p>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-2xl font-extrabold text-zinc-900 leading-none">{stat.value}</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#005244] whitespace-nowrap mt-1">
                  <TrendingUp size={10} className="text-[#005244]" />
                  <span>{stat.trend}</span>
                  <span className="text-zinc-400 font-medium ml-0.5">This month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Tabs & Date Range */}
      <div className="flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center justify-start gap-8">
          {["Last 7 days", "This month", "This year"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveDateTab(tab)}
              className={`pb-4 text-sm font-extrabold transition-all relative ${
                activeDateTab === tab ? "text-[#0F3D2E]" : "text-zinc-600 font-bold hover:text-[#0F3D2E]"
              }`}
            >
              {tab}
              {activeDateTab === tab && (
                <motion.div 
                  layoutId="date-tab" 
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0F3D2E] rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2 pb-4">
          <CalendarMinus size={16} className="text-zinc-700" />
          <span className="text-sm font-extrabold text-zinc-800">Mar 05 - May 04</span>
        </div>
      </div>

      {/* Revenue Overview Chart */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-[17px] font-extrabold text-zinc-900 tracking-tight">Revenue overview</h3>
          <div className="bg-zinc-50/80 p-1 rounded-xl flex gap-1 border border-zinc-100/50">
            {["Annually", "Monthly", "weekly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveRevenueTab(tab)}
                className={`px-6 py-2 rounded-lg text-[12px] font-bold transition-all ${
                  activeRevenueTab === tab 
                    ? "bg-white text-[#0F3D2E] shadow-sm font-extrabold" 
                    : "text-zinc-600 hover:text-zinc-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex-1 h-[300px] w-full min-h-[250px]">
          {/* Dashed Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-10">
            {[80, 60, 40, 20, 0].map((val) => (
              <div key={val} className="flex items-center gap-4 w-full">
                <span className="text-[11px] font-bold text-zinc-800 w-6">{val}</span>
                <div className="flex-1 h-[1px] border-t border-dashed border-zinc-300"></div>
              </div>
            ))}
          </div>
          
          {/* Vertical Bar Chart */}
          <div className="absolute left-10 right-0 bottom-10 top-0 flex items-end justify-around px-4 lg:px-10">
            {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-4 group">
                <div className="flex items-end gap-[1px] h-full relative" style={{ height: '100%', minHeight: '100%' }}>
                  <div 
                    style={{ height: `${[95, 75, 85, 75, 85, 85, 75][i]}%`, minWidth: '40px' }}
                    className="bg-[#0F3D2E] relative z-10"
                  />
                  <div 
                    style={{ height: `${[50, 50, 40, 20, 38, 20, 75][i]}%`, minWidth: '40px' }}
                    className="bg-[#0A261D] opacity-90 relative z-10"
                  />
                </div>
                <span className="text-[13px] font-bold text-zinc-900 tracking-tighter mt-2">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 mt-8">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#0F3D2E]"></div>
            <span className="text-[12px] font-extrabold text-zinc-900">Current Period</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#0A261D] opacity-90"></div>
            <span className="text-[12px] font-extrabold text-zinc-900">Previous period</span>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bookings over time - Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[17px] font-extrabold text-zinc-900 tracking-tight">Bookings over time</h3>
            <div className="bg-zinc-50/80 p-1 rounded-xl flex gap-1 border border-zinc-100/50">
              {["Annually", "Monthly", "weekly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveBookingsTab(tab)}
                  className={`px-6 py-2 rounded-lg text-[12px] font-bold transition-all ${
                    activeBookingsTab === tab 
                      ? "bg-white text-[#0F3D2E] shadow-sm font-extrabold" 
                      : "text-zinc-600 hover:text-zinc-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex-1 h-[260px] w-full mt-4">
             {/* Dashed Grid Lines (Y-Axis) */}
             <div className="absolute inset-0 flex flex-col justify-between pb-8">
                {["30k", "20k", "10k", "0"].map((val) => (
                  <div key={val} className="flex items-center gap-4 w-full">
                    <span className="text-[10px] font-bold text-zinc-500 w-8 text-right">{val}</span>
                    <div className="flex-1 h-[1px] border-t border-dashed border-zinc-300"></div>
                  </div>
                ))}
             </div>

             {/* SVG Line Chart */}
             <div className="absolute left-14 right-4 top-0 bottom-8 shrink-0 overflow-visible">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                   {/* Dotted light blue line (Previous period/Background Data) */}
                   <path 
                     d="M 0,85 Q 10,60 20,65 T 40,65 T 50,85 T 60,65 T 70,60 T 80,45 T 100,5" 
                     fill="none" 
                     stroke="#bfdbfe" 
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeDasharray="2,3"
                     className="vector-effect-non-scaling-stroke"
                   />
                   {/* Solid greenish-blue line (Current period/Primary Data) */}
                   <path 
                     d="M 2,60 Q 15,45 20,70 T 35,65 T 45,35 T 55,20 T 65,40 T 75,55 T 85,45 T 100,40" 
                     fill="none" 
                     stroke="#28a88a" 
                     strokeWidth="2.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="vector-effect-non-scaling-stroke drop-shadow-sm"
                   />
                </svg>
             </div>

             {/* X-Axis Labels */}
             <div className="absolute left-14 right-4 bottom-0 flex justify-between px-2">
                {["Week1", "Week2", "Week3", "Week4", "Week 5", "Week6", "Week7"].map((week) => (
                   <span key={week} className="text-[10px] font-bold text-zinc-600">{week}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Booking Rate - Radial Chart */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-[17px] font-extrabold text-zinc-900 tracking-tight">Booking rate</h3>
             <button className="bg-[#0F3D2E] text-white flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm hover:bg-[#0a2e22] transition-colors">
               Export <ArrowDownIcon size={12} className="stroke-2" />
             </button>
           </div>

           <div className="flex-1 flex flex-col justify-center gap-6">
             {/* Radial Chart Graphic */}
             <div className="relative flex justify-center items-center h-[180px] w-full">
               <svg className="w-[180px] h-[180px] origin-center -rotate-[135deg]" viewBox="0 0 100 100">
                  {/* Outer track */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" strokeDasharray="212" strokeDashoffset="70" />
                  {/* Outer progress (Accepted - dark green) */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#0F3D2E" strokeWidth="6" strokeLinecap="round" strokeDasharray="212" strokeDashoffset="120" />
                  
                  {/* Middle track */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" strokeDasharray="165" strokeDashoffset="55" />
                  {/* Middle progress (Rejected - medium green) */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#28a88a" strokeWidth="6" strokeLinecap="round" strokeDasharray="165" strokeDashoffset="110" />
                  
                  {/* Inner track */}
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" strokeDasharray="118" strokeDashoffset="40" />
                  {/* Inner progress (Pending - light dot/green) */}
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#6ee7b7" strokeWidth="6" strokeLinecap="round" strokeDasharray="118" strokeDashoffset="80" />
               </svg>
               {/* Center Value */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                 <span className="text-2xl font-extrabold text-[#0F3D2E]">150k</span>
               </div>
             </div>

             {/* Legend */}
             <div className="space-y-4 pt-2 w-full max-w-[220px] mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0F3D2E]"></div>
                    <span className="text-[13px] font-bold text-zinc-900">Accepted</span>
                  </div>
                  <span className="text-[13px] font-black text-zinc-900">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#28a88a]"></div>
                    <span className="text-[13px] font-bold text-zinc-900">Rejected</span>
                  </div>
                  <span className="text-[13px] font-black text-zinc-900">50%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6ee7b7]"></div>
                    <span className="text-[13px] font-bold text-zinc-900">Pending</span>
                  </div>
                  <span className="text-[13px] font-black text-zinc-900">20%</span>
                </div>
             </div>
           </div>
        </div>

      </div>

    </div>
  );
}

// Stubs for Icons
function PieChartIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function ArrowDownIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
