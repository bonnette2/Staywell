"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Calendar,
  LayoutGrid,
  List,
  Eye,
  Clock,
  CreditCard,
  Building2,
  Square,
  CheckSquare,
  TrendingUp,
  PieChart,
  Printer,
  XCircle,
  ChevronDown,
  ChevronUp,
  Wallet,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

// --- Interfaces ---

interface Transaction {
  id: string;
  guest: string;
  property: string;
  date: string;
  amount: number;
  status: "Completed";
  method: "Mobile Money" | "Card" | "PayPal";
}

interface Payout {
  id: string;
  amount: number;
  dateRequested: string;
  status: "Completed" | "Pending" | "Failed";
  method: "Bank" | "Mobile Money";
}

// --- Mock Data ---

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "TXN-2024-0001", guest: "Sarah Johnson", property: "Luxury Villa Kigali", date: "2025-07-12", amount: 60000, status: "Completed", method: "Mobile Money" },
  { id: "TXN-2024-0002", guest: "Michael Jen", property: "Luxury Villa Kigali", date: "2025-07-16", amount: 60000, status: "Completed", method: "Card" },
  { id: "TXN-2024-0003", guest: "Emma wilson", property: "Luxury Villa Kigali", date: "2025-07-22", amount: 60000, status: "Completed", method: "PayPal" },
  { id: "TXN-2024-0004", guest: "David brown", property: "Luxury Villa Kigali", date: "2025-08-01", amount: 60000, status: "Completed", method: "Mobile Money" },
  { id: "TXN-2024-0005", guest: "Lisa anderson", property: "Luxury Villa Kigali", date: "2025-08-10", amount: 60000, status: "Completed", method: "Card" },
  { id: "TXN-2024-0006", guest: "Emma wilson", property: "Luxury Villa Kigali", date: "2025-08-20", amount: 60000, status: "Completed", method: "Mobile Money" },
  { id: "TXN-2024-0007", guest: "Michael Jen", property: "Luxury Villa Kigali", date: "2025-09-01", amount: 60000, status: "Completed", method: "Mobile Money" },
];

const REVENUE_PERIODS = {
  Weekly: [
    { label: "Mon", current: 40, previous: 20 },
    { label: "Tue", current: 60, previous: 45 },
    { label: "Wed", current: 30, previous: 35 },
    { label: "Thu", current: 80, previous: 20 },
    { label: "Fri", current: 50, previous: 30 },
    { label: "Sat", current: 90, previous: 32 },
    { label: "Sun", current: 70, previous: 75 },
  ],
  Monthly: [
    { label: "Jan", current: 45, previous: 30 },
    { label: "Feb", current: 70, previous: 50 },
    { label: "Mar", current: 55, previous: 40 },
    { label: "Apr", current: 90, previous: 60 },
    { label: "May", current: 65, previous: 35 },
    { label: "Jun", current: 80, previous: 55 },
    { label: "Jul", current: 70, previous: 75 },
  ],
  Annually: [
    { label: "2020", current: 30, previous: 20 },
    { label: "2021", current: 50, previous: 45 },
    { label: "2022", current: 70, previous: 35 },
    { label: "2023", current: 60, previous: 20 },
    { label: "2024", current: 85, previous: 30 },
    { label: "2025", current: 95, previous: 60 },
    { label: "2026", current: 40, previous: 15 },
  ],
};

const MOCK_PAYOUTS: Payout[] = [
  { id: "PAY-1122-Y7", amount: 450000, dateRequested: "2026-04-10", status: "Completed", method: "Bank" },
  { id: "PAY-3344-H2", amount: 120000, dateRequested: "2026-04-14", status: "Pending", method: "Mobile Money" },
  { id: "PAY-5566-P9", amount: 280000, dateRequested: "2026-04-05", status: "Completed", method: "Bank" },
];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<"Transactions" | "Payouts">("Transactions");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [revenuePeriod, setRevenuePeriod] = useState<"Annually" | "Monthly" | "Weekly">("Monthly");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Payout related state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState<"Bank" | "Mobile Money">("Bank");
  const [availableBalance] = useState(1250000);

  // --- Filtering Logic ---

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t => {
      const matchSearch = t.property.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.guest.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || t.status === statusFilter;
      const matchMethod = methodFilter === "All" || t.method === methodFilter;
      
      let matchDate = true;
      if (dateRange.start && dateRange.end) {
        const tDate = new Date(t.date);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        matchDate = tDate >= start && tDate <= end;
      }

      return matchSearch && matchStatus && matchMethod && matchDate;
    });
  }, [searchQuery, statusFilter, methodFilter, dateRange]);

  // --- Handlers ---

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map(t => t.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRequestPayout = () => {
    const amount = parseFloat(payoutAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (amount > availableBalance) {
      alert("Amount exceeds available balance");
      return;
    }
    // Success simulation
    alert(`Payout request of RWF ${amount.toLocaleString()} submitted successfully!`);
    setShowRequestModal(false);
    setPayoutAmount("");
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Transactions</h1>
        <p className="text-zinc-500 font-medium text-sm mt-1">Manage you real estate properties using staywell</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "2.6 M RWF", icon: TrendingUp, trend: "+ 3.6%" },
          { label: "Pending payouts", value: "0 RWF", icon: Clock, trend: "+ 3.6%" },
          { label: "Completed payouts", value: "30,000", icon: CheckSquare, trend: "+ 3.6%" },
          { label: "Monthly earning", value: "2.26 M", icon: PieChart, trend: "+ 3.6%" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-zinc-100 flex items-center justify-center p-1.5 shrink-0">
              <div className="w-full h-full rounded-full border-2 border-[#005244] flex items-center justify-center text-[#005244]">
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-xl font-extrabold text-zinc-900 truncate">{stat.value}</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#005244] mb-0.5">
                  <TrendingUp size={10} />
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-zinc-100">
        <button 
          onClick={() => setActiveTab("Transactions")}
          className={`pb-4 px-2 text-sm font-bold transition-all relative ${
            activeTab === "Transactions" ? "text-[#0F3D2E]" : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          Transactions
          {activeTab === "Transactions" && (
            <motion.div layoutId="tab-underline" className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#0F3D2E] rounded-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab("Payouts")}
          className={`pb-4 px-2 text-sm font-bold transition-all relative ${
            activeTab === "Payouts" ? "text-[#0F3D2E]" : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          Payouts
          {activeTab === "Payouts" && (
            <motion.div layoutId="tab-underline" className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#0F3D2E] rounded-full" />
          )}
        </button>
      </div>

      {activeTab === "Transactions" ? (
        <div className="space-y-6">
          {/* Revenue Overview Chart */}
          <div className="bg-white rounded-xl border border-zinc-100 p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] mb-10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">Revenue overview</h2>
              <div className="bg-zinc-100 p-1 rounded-lg flex items-center">
                {["Annually", "Monthly", "Weekly"].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setRevenuePeriod(t as any)}
                    className={`px-6 py-2 rounded text-xs font-bold transition-all ${
                      revenuePeriod === t ? "bg-white text-[#0F3D2E] shadow-sm" : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[300px] w-full mt-4">
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] font-bold text-zinc-400 pr-4">
                <span>100</span><span>75</span><span>50</span><span>25</span><span className="mb-[-4px]">0</span>
              </div>
              <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
                {[100, 75, 50, 25].map((_) => (
                  <div key={_} className="w-full border-t border-dashed border-zinc-200" />
                ))}
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="absolute left-12 right-4 top-0 bottom-8 flex justify-around items-end px-4">
                {REVENUE_PERIODS[revenuePeriod].map((data, i) => (
                  <div key={i} className="flex items-end gap-1.5 h-full w-full justify-center">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${data.current}%` }} className="w-6 bg-[#0F3D2E] rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: `${data.previous}%` }} className="w-6 bg-[#0F3D2E]/20 rounded-t-sm" />
                  </div>
                ))}
              </div>
              <div className="absolute left-8 right-0 bottom-0 flex justify-around items-center pt-4 text-[11px] font-bold text-zinc-500 px-4 ml-4">
                {REVENUE_PERIODS[revenuePeriod].map(d => <span key={d.label}>{d.label}</span>)}
              </div>
            </div>

            <div className="flex justify-center items-center gap-10 mt-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0F3D2E]" />
                <span className="text-[11px] font-bold text-zinc-600">Current Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0F3D2E]/20" />
                <span className="text-[11px] font-bold text-zinc-600">Previous period</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 pt-4">
            <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight leading-none">Transaction history</h2>
            <button className="text-[10px] font-bold text-[#0F3D2E] hover:underline transition-colors uppercase tracking-[0.2em]">see all</button>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search bookings, guests"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
                className="w-full bg-white border border-zinc-200 rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium outline-none focus:ring-1 focus:ring-[#0F3D2E]/10 transition-all shadow-sm placeholder:text-zinc-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <div 
                  className={`flex items-center gap-2 bg-white border px-4 py-2.5 rounded-lg shadow-sm cursor-pointer hover:bg-zinc-50 transition ${dateRange.start ? 'border-[#0F3D2E]/30 bg-emerald-50/20' : 'border-zinc-200'}`} 
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <Calendar size={16} className={dateRange.start ? "text-[#0F3D2E]" : "text-zinc-500"} />
                  <span className={`text-sm font-semibold ${dateRange.start ? 'text-[#0F3D2E]' : 'text-zinc-700'}`}>
                    {dateRange.start ? `${dateRange.start} - ${dateRange.end || '...'}` : 'Date Range'}
                  </span>
                </div>
                
                <AnimatePresence>
                  {showDatePicker && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 bg-white border border-zinc-200 rounded-xl shadow-xl p-5 z-[60] w-[280px]"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 block">Start Date</label>
                          <input type="date" value={dateRange.start} onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))} className="w-full border border-zinc-200 rounded-lg p-2 text-sm font-medium outline-none focus:border-[#0F3D2E]" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 block">End Date</label>
                          <input type="date" min={dateRange.start} value={dateRange.end} onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))} className="w-full border border-zinc-200 rounded-lg p-2 text-sm font-medium outline-none focus:border-[#0F3D2E]" />
                        </div>
                        <div className="flex gap-2 pt-2">
                           <button onClick={() => {setDateRange({start: "", end: ""}); setShowDatePicker(false)}} className="flex-1 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-600">Clear</button>
                           <button onClick={() => setShowDatePicker(false)} className="flex-1 bg-[#0F3D2E] text-white py-2 rounded-lg text-xs font-bold shadow-lg shadow-emerald-900/10">Apply</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg px-4 py-0.5 shadow-sm">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-transparent border-none text-sm font-semibold text-zinc-700 outline-none pr-4 cursor-pointer py-2.5">
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg px-4 py-0.5 shadow-sm">
                <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="bg-transparent border-none text-sm font-semibold text-zinc-700 outline-none pr-4 cursor-pointer py-2.5">
                  <option value="All">All methods</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Card">Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <div className="flex items-center bg-white border border-zinc-200 rounded-lg p-1 shadow-sm">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-[#0F3D2E] text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-[#0F3D2E] text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#0F3D2E] text-white">
                      <th className="p-5 w-14 text-center border-b border-[#0F3D2E]">
                        <button onClick={toggleSelectAll} className="opacity-60 hover:opacity-100 transition">
                          {selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>
                      </th>
                      <th className="p-5 text-[12px] font-semibold uppercase tracking-wider border-b border-[#0F3D2E]">Guest Name</th>
                      <th className="p-5 text-[12px] font-semibold uppercase tracking-wider border-b border-[#0F3D2E]">Property</th>
                      <th className="p-5 text-[12px] font-semibold uppercase tracking-wider border-b border-[#0F3D2E]">Date</th>
                      <th className="p-5 text-[12px] font-semibold uppercase tracking-wider border-b border-[#0F3D2E]">Amount</th>
                      <th className="p-5 text-[12px] font-semibold uppercase tracking-wider border-b border-[#0F3D2E]">Status</th>
                      <th className="p-5 text-[12px] font-semibold uppercase tracking-wider border-b border-[#0F3D2E] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 text-[13px]">
                    {filteredTransactions.map((t, i) => (
                      <tr key={t.id} className={`${i % 2 === 1 ? 'bg-zinc-50/30' : 'bg-white'} hover:bg-zinc-100/30 transition-colors`}>
                        <td className="p-5 text-center">
                          <button onClick={() => toggleSelect(t.id)} className="text-zinc-300 hover:text-[#0F3D2E] transition">
                            {selectedIds.includes(t.id) ? <CheckSquare size={18} className="text-[#0F3D2E]" /> : <Square size={18} />}
                          </button>
                        </td>
                        <td className="p-5 font-semibold text-zinc-900">{t.guest}</td>
                        <td className="p-5 font-medium text-zinc-500">{t.property}</td>
                        <td className="p-5 font-medium text-zinc-700">{t.date}</td>
                        <td className="p-5 font-bold text-zinc-900">{t.amount.toLocaleString()} RWF</td>
                        <td className="p-5">
                          <span className="inline-flex px-4 py-1.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 uppercase tracking-wide border border-emerald-100">{t.status}</span>
                        </td>
                        <td className="p-5 text-center">
                          <button onClick={() => setSelectedTransaction(t)} className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition mx-auto">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 text-[13px]">
              {filteredTransactions.map((t) => (
                <div key={t.id} className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-bl-full -mr-8 -mt-8 -z-10 group-hover:bg-[#0F3D2E]/5 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                        <Building2 size={22} strokeWidth={2.5} />
                     </div>
                     <button onClick={() => toggleSelect(t.id)} className="text-zinc-200 hover:text-[#0F3D2E] transition">
                        {selectedIds.includes(t.id) ? <CheckSquare size={18} className="text-[#0F3D2E]" /> : <Square size={18} />}
                     </button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t.id}</span>
                       <div className="w-1 h-1 rounded-full bg-zinc-300" />
                       <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t.method}</span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 tracking-tight leading-none mb-1">{t.guest}</h3>
                    <p className="text-xs font-medium text-zinc-500">{t.property}</p>
                  </div>

                  <div className="flex items-center justify-between mb-6 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                     <div className="text-center flex-1">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Date</p>
                        <p className="text-xs font-bold text-zinc-700">{t.date}</p>
                     </div>
                     <div className="w-[1px] h-6 bg-zinc-200 mx-3" />
                     <div className="text-center flex-1">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Status</p>
                        <p className="text-xs font-bold text-emerald-600">{t.status}</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center gap-4 pt-2">
                     <div>
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Payment</p>
                       <p className="text-sm font-bold text-[#0F3D2E]">{t.amount.toLocaleString()} RWF</p>
                     </div>
                     <button 
                       onClick={() => setSelectedTransaction(t)}
                       className="px-4 py-2 bg-[#0F3D2E] text-white rounded-lg hover:bg-[#0F3D2E]/90 transition shadow-lg shadow-emerald-900/10 text-xs font-bold"
                     >
                       View Details
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between pt-10 gap-4">
            <span className="text-xs font-semibold text-zinc-500">Showing {filteredTransactions.length} of {MOCK_TRANSACTIONS.length} results</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 bg-white transition shadow-sm">Previous</button>
              <div className="w-9 h-9 rounded-lg bg-[#0F3D2E] text-white text-sm font-semibold flex items-center justify-center shadow-lg shadow-emerald-900/10 transition">1</div>
              <div className="w-9 h-9 rounded-lg border border-zinc-200 text-sm font-semibold text-zinc-400 bg-white flex items-center justify-center hover:bg-zinc-50 transition cursor-pointer">2</div>
              <button className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 bg-white transition shadow-sm">Next</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
                   <Wallet size={32} strokeWidth={2.5} />
                </div>
                <div>
                   <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">Available Balance</p>
                   <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">RWF {availableBalance.toLocaleString()}</h2>
                </div>
             </div>
             <button 
                onClick={() => setShowRequestModal(true)}
                className="w-full md:w-auto bg-[#0F3D2E] text-white px-10 py-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
             >
                Request Payout
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/30">
               <div>
                 <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight leading-none mb-1">Payout History</h2>
                 <p className="text-sm font-medium text-zinc-500">Review all your previous withdrawal requests</p>
               </div>
               <button className="bg-white border border-zinc-200 text-zinc-900 px-6 py-2.5 rounded-lg text-xs font-bold shadow-sm hover:bg-zinc-50 transition uppercase tracking-widest">
                  Export PDF
               </button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                     <tr className="bg-[#0F3D2E] text-white">
                       <th className="p-6 text-[12px] font-semibold uppercase tracking-widest">Payout ID</th>
                       <th className="p-6 text-[12px] font-semibold uppercase tracking-widest">Amount</th>
                       <th className="p-6 text-[12px] font-semibold uppercase tracking-widest">Date Requested</th>
                       <th className="p-6 text-[12px] font-semibold uppercase tracking-widest">Status</th>
                       <th className="p-6 text-[12px] font-semibold uppercase tracking-widest">Method</th>
                       <th className="p-6 text-[12px] font-semibold uppercase tracking-widest text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 text-[13px]">
                     {MOCK_PAYOUTS.map((p, i) => (
                       <tr key={p.id} className={`${i % 2 === 1 ? 'bg-zinc-50/30' : 'bg-white'} hover:bg-emerald-50/20 transition`}>
                         <td className="p-6 font-semibold text-zinc-900">{p.id}</td>
                         <td className="p-6 font-bold text-zinc-900">RWF {p.amount.toLocaleString()}</td>
                         <td className="p-6 font-medium text-zinc-500">{p.dateRequested}</td>
                         <td className="p-6">
                           <span className={`inline-flex items-center px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest border ${
                             p.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                             p.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                             'bg-red-50 text-red-600 border-red-100'
                           }`}>
                             {p.status}
                           </span>
                         </td>
                         <td className="p-6 font-medium text-zinc-700 capitalize">{p.method}</td>
                         <td className="p-6 text-center">
                              <button className="text-[11px] font-bold text-[#0F3D2E] uppercase tracking-widest hover:underline transition">
                                View details
                              </button>
                           </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTransaction(null)} className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-2xl relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="bg-[#0F3D2E] text-white px-10 py-6 flex justify-between items-center">
                 <h2 className="text-lg font-bold tracking-tight text-white">Transaction Details</h2>
                 <button onClick={() => setSelectedTransaction(null)} className="p-2 hover:bg-white/10 rounded-full transition"><XCircle size={22} /></button>
              </div>
              <div className="p-10 overflow-y-auto space-y-10 custom-scrollbar bg-zinc-50/30">
                <div className="bg-white rounded-xl p-8 space-y-6 border border-zinc-100 shadow-sm">
                  <h3 className="text-sm font-bold text-zinc-900 mb-4">Basic Details</h3>
                  <div className="grid grid-cols-2 gap-8 text-sm">
                     <div className="space-y-1"><p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Transaction ID</p><p className="font-bold text-zinc-900 uppercase tracking-tighter">{selectedTransaction.id}</p></div>
                     <div className="space-y-1"><p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Guest name</p><p className="font-bold text-zinc-900">{selectedTransaction.guest}</p></div>
                     <div className="space-y-1"><p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Property name</p><p className="font-bold text-zinc-900">{selectedTransaction.property}</p></div>
                     <div className="space-y-1"><p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Payment Method</p><p className="font-bold text-zinc-900">{selectedTransaction.method}</p></div>
                     <div className="space-y-1"><p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Took Place</p><p className="font-bold text-zinc-900 uppercase">{selectedTransaction.date}</p></div>
                     <div className="space-y-1"><p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</p><span className="inline-flex px-4 py-1.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 uppercase tracking-wider border border-emerald-100">{selectedTransaction.status}</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-8 space-y-6 border border-zinc-100 shadow-sm">
                  <h3 className="text-sm font-bold text-zinc-900 mb-4">Payment Breakdown</h3>
                  <div className="space-y-5">
                     {[
                       { label: "RF 150,000 x 5 Nights", amount: "RF 750,000", icon: Building2 },
                       { label: "Cleaning fee", amount: "RF 150,000", icon: Info },
                       { label: "Service fee", amount: "RF 150,000", icon: Wallet },
                       { label: "Taxes", amount: "RF 150,000", icon: CreditCard }
                     ].map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center text-sm font-semibold">
                          <div className="flex items-center gap-3"><item.icon size={18} className="text-zinc-400" /><span className="text-zinc-500 font-medium">{item.label}</span></div>
                          <span className="text-zinc-900">{item.amount}</span>
                       </div>
                     ))}
                     <div className="h-[1px] bg-zinc-100 mt-6" />
                     <div className="flex flex-col items-center pt-6 pb-2">
                        <p className="text-base font-bold text-zinc-900 mb-1 leading-none uppercase tracking-widest">Total Amounts</p>
                        <p className="text-2xl font-extrabold text-[#0F3D2E]">RWF {selectedTransaction.amount.toLocaleString()}</p>
                     </div>
                  </div>
                </div>
                <div className="pt-2">
                   <button className="w-full py-4 border-2 border-zinc-100 rounded-xl flex items-center justify-center gap-3 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition shadow-sm active:scale-[0.99] uppercase tracking-wider">
                      <Printer size={18} /> Print Invoice
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Request Payout Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRequestModal(false)} className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-xl shadow-2xl relative z-10 w-full max-w-lg overflow-hidden flex flex-col">
              <div className="bg-[#0F3D2E] text-white px-8 py-6">
                 <h2 className="text-lg font-bold tracking-tight">Request Payout</h2>
                 <p className="text-[10px] font-semibold text-white/70 uppercase tracking-[0.2em] mt-1">Transfer funds to your account</p>
              </div>
              <div className="p-8 space-y-8 bg-zinc-50/20">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex items-center justify-between shadow-sm">
                   <div>
                      <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1 leading-none">Available to withdraw</p>
                      <p className="text-2xl font-extrabold text-[#0F3D2E]">RWF {availableBalance.toLocaleString()}</p>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center text-[#0F3D2E]/40">
                      <Wallet size={24} />
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Withdrawal Amount</label>
                      <div className="relative">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">RWF</span>
                         <input 
                           type="number" 
                           placeholder="0.00"
                           value={payoutAmount}
                           onChange={(e) => setPayoutAmount(e.target.value)}
                           className="w-full bg-white border border-zinc-200 rounded-xl py-4 pl-14 pr-4 text-xl font-bold text-zinc-900 outline-none focus:ring-1 focus:ring-[#0F3D2E]/10 transition-all shadow-sm"
                         />
                      </div>
                      <div className="flex justify-between mt-2 px-1">
                         <p className="text-[10px] font-bold text-zinc-400 italic">Min: RWF 5,000</p>
                         <button onClick={() => setPayoutAmount(availableBalance.toString())} className="text-[10px] font-extrabold text-[#0F3D2E] uppercase tracking-widest hover:underline">Max Amount</button>
                      </div>
                   </div>

                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Payout Method</label>
                      <div className="grid grid-cols-2 gap-3">
                         {[
                           { id: "Bank", icon: Building2, label: "Bank Transfer" },
                           { id: "Mobile Money", icon: CreditCard, label: "Mobile Money" }
                         ].map((m) => (
                           <button 
                             key={m.id}
                             onClick={() => setPayoutMethod(m.id as any)}
                             className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                               payoutMethod === m.id ? 'border-[#0F3D2E] bg-emerald-50/40 shadow-sm' : 'border-zinc-100 hover:border-zinc-200 bg-white'
                             }`}
                           >
                             <m.icon size={20} className={payoutMethod === m.id ? "text-emerald-700" : "text-zinc-400"} />
                             <span className={`text-[10px] font-bold uppercase tracking-widest ${payoutMethod === m.id ? "text-emerald-700" : "text-zinc-400"}`}>{m.label}</span>
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button onClick={() => setShowRequestModal(false)} className="flex-1 py-4 text-sm font-bold text-zinc-500 hover:text-zinc-800 transition uppercase tracking-widest">Cancel</button>
                   <button onClick={handleRequestPayout} className="flex-1 bg-[#0F3D2E] text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest">Confirm & Payout</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stub for Info and PieChart icons
function Info(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
