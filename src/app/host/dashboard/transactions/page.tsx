"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  BookOpen, 
  Wallet, 
  PieChart, 
  TrendingUp,
  Search, 
  CalendarMinus,
  ChevronDown,
  LayoutGrid,
  List,
  MoreVertical,
  X,
  Printer,
  Info,
  CalendarDays,
  CreditCard
} from "lucide-react";

export default function TransactionsPage() {
  const [activeViewTab, setActiveViewTab] = useState("Transactions");
  const [activeChartTab, setActiveChartTab] = useState("Monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const stats = [
    { label: "Total Revenue", value: "2.6 M RWF", trend: "+3.6+", icon: Building2 },
    { label: "Pending payouts", value: "0 RWF", trend: "-3.6", icon: BookOpen },
    { label: "Completed payouts", value: "30,000", trend: "+3.6+", icon: Wallet },
    { label: "Monthly earning", value: "2.26 M", trend: "+3.6+", icon: PieChartIcon },
  ];

  const transactions = [
    { id: 1, guest: "Sarah Johnson", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
    { id: 2, guest: "Michael Jen", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
    { id: 3, guest: "Emma wilson", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
    { id: 4, guest: "David brown", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
    { id: 5, guest: "Lisa anderson", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
    { id: 6, guest: "Emma wilson", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
    { id: 7, guest: "Michael Jen", property: "Luxury Villa Kigali", date: "12 - 07 - 2025", amount: "60,00 RWF", status: "Completed" },
  ];

  const openModal = (txn: any) => {
    setSelectedTransaction(txn);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Transactions</h1>
        <p className="text-zinc-500 font-medium text-sm">Manage you real estate properties using staywell</p>
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
                  strokeDasharray="163" strokeDashoffset={i === 1 ? "100" : i === 3 ? "60" : "30"} strokeLinecap="round"
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-8 border-b border-zinc-200">
        {["Transactions", "Payouts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveViewTab(tab)}
            className={`pb-4 text-sm font-extrabold transition-all relative ${
              activeViewTab === tab ? "text-[#0F3D2E]" : "text-zinc-400 hover:text-zinc-600 font-semibold"
            }`}
          >
            {tab}
            {activeViewTab === tab && (
              <motion.div 
                layoutId="view-tab" 
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0F3D2E] rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Revenue Overview Chart */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col pt-10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">Revenue overview</h3>
          <div className="bg-zinc-50/80 p-1 rounded-xl flex gap-1 border border-zinc-100/50">
            {["Annually", "Monthly", "weekly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveChartTab(tab)}
                className={`px-6 py-2 rounded-lg text-[12px] font-bold transition-all ${
                  activeChartTab === tab 
                    ? "bg-white text-[#0F3D2E] shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-800"
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
                <span className="text-[11px] font-bold text-zinc-500 w-6">{val}</span>
                <div className="flex-1 h-[1px] border-t border-dashed border-zinc-200"></div>
              </div>
            ))}
          </div>
          
          {/* Vertical Bar Chart - Grouped Side-by-Side */}
          <div className="absolute left-10 right-0 bottom-10 top-0 flex items-end justify-around px-4 lg:px-10">
            {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-4 group">
                <div className="flex items-end gap-[2px] h-full relative" style={{ height: '100%', minHeight: '100%' }}>
                  <div 
                    style={{ height: `${[95, 75, 85, 75, 85, 85, 75][i]}%`, minWidth: '32px' }}
                    className="bg-[#0F3D2E] rounded-sm relative z-10"
                  />
                  <div 
                    style={{ height: `${[0, 50, 40, 15, 38, 15, 75][i]}%`, minWidth: '32px' }}
                    className="bg-[#0A261D] opacity-90 rounded-sm relative z-10"
                  />
                </div>
                <span className="text-[12px] font-bold text-zinc-600 tracking-tighter mt-2">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 mt-8">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#0F3D2E]"></div>
            <span className="text-[12px] font-bold text-zinc-800">Current Period</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#0A261D] opacity-90"></div>
            <span className="text-[12px] font-bold text-zinc-800">Previous period</span>
          </div>
        </div>
      </div>

      {/* Transaction History Header & "See All" */}
      <div className="flex items-center justify-between pt-4">
        <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">Transaction history</h3>
        <button className="text-sm font-extrabold text-[#0F3D2E] hover:underline">see all</button>
      </div>

      {/* Filters Bar */}
      <div className="flex justify-between items-center bg-transparent gap-4">
        <div className="relative w-[380px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search bookings, guests" 
            className="w-full bg-white border border-zinc-200/80 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium outline-none focus:ring-1 focus:ring-[#0F3D2E]/20 transition-all placeholder:text-zinc-400 shadow-sm"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm">
            <CalendarMinus size={16} className="text-zinc-500" />
            <span className="text-sm font-semibold text-zinc-700">Mar 05 - May 04</span>
          </div>

          <div className="relative">
            <button className="flex items-center gap-6 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-zinc-700 w-36 justify-between">
              All type
              <ChevronDown size={16} className="text-zinc-400" />
            </button>
          </div>

          <div className="relative">
            <button className="flex items-center gap-6 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-zinc-700 w-36 justify-between">
              Newest
              <ChevronDown size={16} className="text-zinc-400" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-white border border-zinc-200/80 p-1 rounded-lg shadow-sm">
            <button className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-700 transition">
              <LayoutGrid size={18} />
            </button>
            <button className="p-1.5 rounded-md bg-zinc-100/80 text-zinc-900 transition">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0F3D2E] text-white">
              <th className="p-5 w-14 text-center border-b border-[#0F3D2E]">
                <div className="w-[18px] h-[18px] border-[1.5px] border-white/40 rounded-[4px] mx-auto"></div>
              </th>
              <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Guest Name</th>
              <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Property</th>
              <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Date</th>
              <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Amount</th>
              <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E] text-center">Status</th>
              <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100/80">
            {transactions.map((txn, i) => (
              <tr 
                key={txn.id} 
                onClick={() => openModal(txn)}
                className={`transition-all hover:bg-zinc-50 cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}`}
              >
                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="w-[18px] h-[18px] border-[1.5px] border-zinc-300 rounded-[4px] mx-auto bg-white"></div>
                </td>
                <td className="p-4 text-[13px] font-medium text-zinc-700">{txn.guest}</td>
                <td className="p-4 text-[13px] font-medium text-zinc-700">{txn.property}</td>
                <td className="p-4 text-[13px] font-medium text-zinc-700">{txn.date}</td>
                <td className="p-4 text-[13px] font-medium text-zinc-700">{txn.amount}</td>
                <td className="p-4 text-center">
                  <span className="inline-block px-4 py-1.5 rounded-md text-[11px] font-bold bg-[#0F3D2E] text-white tracking-wide">
                    {txn.status}
                  </span>
                </td>
                <td className="p-4 text-center relative" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => openModal(txn)}
                    className="p-1.5 text-zinc-600 hover:bg-zinc-200 rounded-md transition"
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-[13px] font-semibold text-zinc-600">Showing 1 to 4 of 247 results</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 bg-white">Previous</button>
          <button className="w-8 h-8 rounded bg-[#0F3D2E] text-white text-sm font-semibold flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded border border-zinc-200 text-sm font-semibold text-zinc-600 bg-white flex items-center justify-center">2</button>
          <button className="px-4 py-1.5 rounded border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 bg-white">Next</button>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#0F3D2E] text-white px-8 py-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Transaction Details</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto flex-1 bg-white space-y-8">
                
                {/* 1. Basic Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#0F3D2E] text-sm">Basic Details</h3>
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-800 font-semibold">Transaction ID</span>
                      <span className="text-zinc-900 font-medium">TXN-2024-0007</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-800 font-semibold">Guest name</span>
                      <span className="text-zinc-900 font-medium">{selectedTransaction?.guest || "John Doe"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-800 font-semibold">Property name</span>
                      <span className="text-zinc-900 font-medium">{selectedTransaction?.property || "Luxury Villa Kigali"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-800 font-semibold">Payment Method</span>
                      <span className="text-zinc-900 font-medium">Mobile Money</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-800 font-semibold">Took Place</span>
                      <span className="text-zinc-900 font-medium">09 -08-2023</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-800 font-semibold">Status</span>
                      <span className="bg-emerald-200/50 text-emerald-600 px-3 py-1 rounded-[4px] font-bold text-xs uppercase tracking-wide">
                        completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#0F3D2E] text-sm">Payment Breakdown</h3>
                  <div className="border border-zinc-200 p-6 rounded-xl space-y-5 shadow-sm">
                    <div className="flex justify-between items-center text-sm font-medium text-zinc-800">
                      <div className="flex items-center gap-3"><BookOpen size={18} className="text-zinc-500"/> RF 150,000 x 5 Nights</div>
                      <div>RF 750,000</div>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-zinc-800">
                      <div className="flex items-center gap-3"><Info size={18} className="text-zinc-500"/> Cleaning fee</div>
                      <div>RF 750,000</div>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-zinc-800">
                      <div className="flex items-center gap-3"><Info size={18} className="text-zinc-500"/> service fee</div>
                      <div>RF 750,000</div>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-zinc-800">
                      <div className="flex items-center gap-3"><Building2 size={18} className="text-zinc-500"/> Taxes</div>
                      <div>RF 750,000</div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-zinc-100 flex justify-between items-center">
                      <div className="font-bold text-[#0F3D2E]">Total Amounts</div>
                      <div className="font-bold text-emerald-600 text-[15px]">RWF 150,000</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button className="flex items-center gap-2 border border-[#0F3D2E] text-[#0F3D2E] font-bold px-8 py-3 rounded-md hover:bg-zinc-50 transition-colors shadow-sm">
                    <Printer size={18} />
                    Print Invoice
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stub for PieChart Icon not available in Lucide natively without creating an explicit SVG
function PieChartIcon(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
