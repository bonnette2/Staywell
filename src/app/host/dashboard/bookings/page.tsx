"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import { 
  Search, 
  CalendarMinus,
  ChevronDown,
  LayoutGrid,
  List,
  MoreVertical,
  X,
  CreditCard,
  MessageSquare,
  Building2,
  CalendarDays,
  CheckCircle2,
  TrendingUp,
  Star,
  MapPin,
  XCircle,
  Eye,
  Reply,
  Forward,
  Info,
  BookOpen,
  Square,
  CheckSquare
} from "lucide-react";
import Image from "next/image";

export default function BookingsPage() {
  const { bookings, updateBookingStatus } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("Guest Information");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });
  const [confirmAction, setConfirmAction] = useState<{ id: number | number[]; status: string; type: "single" | "bulk" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const dateA = new Date(a.arrival).getTime();
      const dateB = new Date(b.arrival).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [bookings, sortOrder]);

  const filteredBookings = useMemo(() => {
    return sortedBookings.filter(booking => {
      const matchesSearch = booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           booking.property.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || booking.status.toLowerCase() === statusFilter.toLowerCase();
      
      let matchesDate = true;
      if (dateRange.start && dateRange.end) {
        const arrival = new Date(booking.arrival);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        matchesDate = arrival >= start && arrival <= end;
      } else if (dateRange.start) {
        const arrival = new Date(booking.arrival);
        const start = new Date(dateRange.start);
        matchesDate = arrival.toDateString() === start.toDateString();
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [sortedBookings, searchQuery, statusFilter, dateRange]);

  const handleActionClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
    setActiveTab("Guest Information");
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map(b => b.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const executeStatusUpdate = (id: number | number[], newStatus: string) => {
    const ids = Array.isArray(id) ? id : [id];
    ids.forEach(idToUpdate => {
      updateBookingStatus(idToUpdate, newStatus as any);
    });
    
    if (selectedBooking && ids.includes(selectedBooking.id)) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }

    if (Array.isArray(id)) setSelectedIds([]);
    
    setToast({ 
      message: `Booking${ids.length > 1 ? 's' : ''} ${newStatus.toLowerCase()} successfully`, 
      type: "success" 
    });
    setTimeout(() => setToast({ message: "", type: null }), 3000);
    setConfirmAction(null);
  };

  const handleBulkStatusUpdate = (newStatus: string) => {
    setConfirmAction({ id: selectedIds, status: newStatus, type: "bulk" });
  };

  const stats = [
    { label: "Total Bookings", value: "128", trend: "3.6", icon: Building2 },
    { label: "Ongoing stays", value: "128", trend: "3.6", icon: CalendarDays },
    { label: "Completed stays", value: "30,00", trend: "3.6", icon: CreditCard },
    { label: "Upcoming stays", value: "35%", trend: "3.6", icon: PieChartIcon },
  ];



  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Bookings</h1>
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
                  cx="30" cy="30" r="26" fill="none" stroke="#002521" strokeWidth="4" 
                  strokeDasharray="163" strokeDashoffset={i === 3 ? "60" : "30"} strokeLinecap="round"
                />
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
                  <TrendingUp size={10} className="text-[#002521]" />
                  <span>~ {stat.trend}</span>
                  <span className="text-zinc-400 font-medium font-normal">This month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex justify-between items-center bg-transparent gap-4">
        <div className="relative w-[380px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search bookings, guests" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suppressHydrationWarning
            className="w-full bg-white border border-zinc-200/80 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium outline-none focus:ring-1 focus:ring-[#002521]/20 transition-all placeholder:text-zinc-400 shadow-sm"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm"
            >
              <CalendarMinus size={16} className="text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-700">
                {dateRange.start ? `${dateRange.start} ${dateRange.end ? `- ${dateRange.end}` : ''}` : "Select Date"}
              </span>
              {(dateRange.start || dateRange.end) && (
                <X 
                  size={14} 
                  className="ml-2 hover:text-red-500 cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDateRange({ start: "", end: "" });
                  }}
                />
              )}
            </button>
            
            <AnimatePresence>
              {showDatePicker && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-0 bg-white border border-zinc-200 rounded-xl shadow-xl p-4 z-50 w-[300px]"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-zinc-400">Start Date</label>
                      <input 
                        type="date" 
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full mt-1 border border-zinc-200 rounded-lg p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-zinc-400">End Date (Optional)</label>
                      <input 
                        type="date" 
                        min={dateRange.start}
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full mt-1 border border-zinc-200 rounded-lg p-2 text-sm"
                      />
                    </div>
                    <button 
                      onClick={() => setShowDatePicker(false)}
                      className="w-full bg-[#002521] text-white py-2 rounded-lg text-sm font-bold"
                    >
                      Apply Filter
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex items-center gap-6 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-zinc-700 w-36 appearance-none outline-none pr-10"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="flex items-center gap-6 bg-white border border-zinc-200/80 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-zinc-700 w-36 appearance-none outline-none pr-10"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1 bg-white border border-zinc-200/80 p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition ${viewMode === "grid" ? "bg-zinc-100 text-zinc-900 shadow-sm" : "hover:bg-zinc-50 text-zinc-400"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-zinc-100 text-zinc-900 shadow-sm" : "hover:bg-zinc-50 text-zinc-400"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#002521]/5 border border-[#002521]/20 p-4 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#002521]">{selectedIds.length} Bookings selected</span>
                <div className="h-4 w-[1px] bg-[#002521]/20" />
                <button 
                  onClick={() => setSelectedIds([])}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-700 transition"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleBulkStatusUpdate("Confirmed")}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition flex items-center gap-2"
                >
                  <CheckCircle2 size={14} /> Approve All
                </button>
                <button 
                  onClick={() => handleBulkStatusUpdate("Rejected")}
                  className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition flex items-center gap-2"
                >
                  <XCircle size={14} /> Reject All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div 
            key="list-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-xl border border-zinc-100 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#002521] text-white">
                    <th className="p-5 w-14 text-center border-b border-[#0F3D2E]">
                      <button 
                        onClick={toggleSelectAll}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {selectedIds.length === filteredBookings.length && filteredBookings.length > 0 ? <CheckSquare size={18} className="text-white"/> : <Square size={18}/>}
                      </button>
                    </th>
                    <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Guest Name</th>
                    <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Property</th>
                    <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Arrival</th>
                    <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E]">Departure</th>
                    <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E] text-center">Status</th>
                    <th className="p-5 text-[12px] font-semibold tracking-wide border-b border-[#0F3D2E] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100/80">
                  {filteredBookings.map((booking, i) => (
                    <tr 
                      key={booking.id} 
                      className={`transition-all hover:bg-zinc-50 ${
                        selectedIds.includes(booking.id) ? 'bg-[#0F3D2E]/5 hover:bg-[#0F3D2E]/10' : (i % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50')
                      }`}
                    >
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => toggleSelect(booking.id)}
                          className="text-zinc-400 hover:text-[#002521] transition-colors"
                        >
                          {selectedIds.includes(booking.id) ? <CheckSquare size={18} className="text-[#002521]"/> : <Square size={18}/>}
                        </button>
                      </td>
                      <td className="p-4 text-[13px] font-semibold text-zinc-900">{booking.guest}</td>
                      <td className="p-4 text-[13px] font-medium text-zinc-500">{booking.property}</td>
                      <td className="p-4 text-[13px] font-medium text-zinc-700">{booking.arrival}</td>
                      <td className="p-4 text-[13px] font-medium text-zinc-700">{booking.departure}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-4 py-1.5 rounded-md text-[11px] font-bold tracking-wide ${
                          booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                          booking.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                          'bg-zinc-100 text-zinc-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4 text-center relative group">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleActionClick(booking)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => setConfirmAction({ id: booking.id, status: "Confirmed", type: "single" })}
                            className="p-1.5 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition"
                            title="Approve"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button 
                            onClick={() => setConfirmAction({ id: booking.id, status: "Rejected", type: "single" })}
                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-20 text-center text-zinc-400 font-medium italic">
                        No bookings found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white rounded-xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                <div className="h-44 relative overflow-hidden">
                   <Image 
                     src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop`}
                     fill
                     sizes="400px"
                     className="object-cover group-hover:scale-105 transition-transform duration-500"
                     alt={booking.property}
                   />
                   <div className="absolute top-3 left-3">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                        booking.status === 'Confirmed' ? 'bg-emerald-500 text-white' :
                        booking.status === 'Rejected' ? 'bg-red-500 text-white' :
                        'bg-zinc-800 text-white'
                      }`}>
                        {booking.status}
                      </span>
                   </div>
                   <button 
                     onClick={() => toggleSelect(booking.id)}
                     className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 text-zinc-900 border border-zinc-200/50 backdrop-blur shadow-sm hover:bg-white transition"
                   >
                     {selectedIds.includes(booking.id) ? <CheckSquare size={16} className="text-[#002521]"/> : <Square size={16}/>}
                   </button>
                </div>
                
                <div className="p-5 flex-1 flex flex-col space-y-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-zinc-900 line-clamp-1 mb-1">{booking.property}</h4>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{booking.guest}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-zinc-50 py-4">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Arrival</p>
                      <p className="text-xs font-bold text-zinc-800">{booking.arrival}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Departure</p>
                      <p className="text-xs font-bold text-zinc-800">{booking.departure}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => handleActionClick(booking)}
                      className="flex-1 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition"
                    >
                      View Details
                    </button>
                    <div className="flex gap-1">
                       <button 
                         onClick={() => setConfirmAction({ id: booking.id, status: "Confirmed", type: "single" })}
                         className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition"
                       >
                         <CheckCircle2 size={16} />
                       </button>
                       <button 
                         onClick={() => setConfirmAction({ id: booking.id, status: "Rejected", type: "single" })}
                         className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-100 transition"
                       >
                         <XCircle size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredBookings.length === 0 && (
              <div className="col-span-full p-20 text-center text-zinc-400 font-medium italic">
                No bookings found matching your filters.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-[13px] font-semibold text-zinc-600">Showing {filteredBookings.length} results</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 bg-white">Previous</button>
          <button className="w-8 h-8 rounded bg-[#002521] text-white text-sm font-semibold flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded border border-zinc-200 text-sm font-semibold text-zinc-600 bg-white flex items-center justify-center">2</button>
          <button className="px-4 py-1.5 rounded border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 bg-white">Next</button>
        </div>
      </div>

      {/* Booking Details Modal */}
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
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#002521] text-white px-8 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">View Booking details</h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-between px-10 pt-4 border-b border-zinc-100 bg-white shadow-sm z-10 sticky top-0">
                {["Guest Information", "Booking details", "Payment Information"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 text-[14px] font-bold transition-all relative ${
                      activeTab === tab ? "text-[#002521]" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="modal-tab" 
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0F3D2E] rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-10 overflow-y-auto flex-1 bg-zinc-50/30">
                
                {/* 1. Guest Information */}
                {activeTab === "Guest Information" && (
                  <div className="flex flex-col items-center">
                     <div className="flex flex-col md:flex-row gap-10 items-start w-full bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
                       <div className="w-[200px] h-[200px] rounded-xl overflow-hidden shadow-inner border border-zinc-100 shrink-0 relative">
                         <Image 
                           src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop" 
                           fill
                           sizes="200px"
                           alt="Guest Profile" 
                           className="object-cover"
                         />
                       </div>
                       <div className="flex-1 space-y-5 py-2">
                         <div className="flex gap-2 text-sm">
                           <span className="text-zinc-500 font-semibold w-28">Guest Name:</span>
                           <span className="font-bold text-zinc-900">John Doe</span>
                         </div>
                         <div className="flex gap-2 text-sm">
                           <span className="text-zinc-500 font-semibold w-28">Gender:</span>
                           <span className="font-bold text-zinc-900">Male</span>
                         </div>
                         <div className="flex gap-2 text-sm">
                           <span className="text-zinc-500 font-semibold w-28">Email:</span>
                           <span className="font-bold text-zinc-900">johndoes@gmail.com</span>
                         </div>
                         <div className="flex gap-2 text-sm">
                           <span className="text-zinc-500 font-semibold w-28">Contact info:</span>
                           <span className="font-bold text-zinc-900">+250 79988883</span>
                         </div>
                         <div className="flex gap-2 text-sm">
                           <span className="text-zinc-500 font-semibold w-28">Location:</span>
                           <span className="font-bold text-zinc-900">Kigali, Nyarugenge</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm pt-2">
                           <Star size={18} className="text-yellow-400 fill-yellow-400" />
                           <span className="font-bold text-zinc-900">4.8 Reviews</span>
                         </div>
                       </div>
                     </div>

                     <button className="mt-8 bg-[#0F3D2E] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#0a2e22] transition-colors shadow-md">
                       <MessageSquare size={18} />
                       Message Guest
                     </button>
                  </div>
                )}

                {/* 2. Booking Details */}
                {activeTab === "Booking details" && (
                   <div className="space-y-6">
                     <h3 className="font-bold text-zinc-900 mb-4">Booked Property</h3>
                     
                     <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-8">
                        <div className="w-[300px] h-[180px] rounded-xl overflow-hidden relative shrink-0">
                          <Image 
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
                            fill 
                            sizes="300px"
                            className="object-cover" 
                            alt="Property" 
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                           <div>
                             <div className="flex justify-between items-start mb-2">
                               <h4 className="text-lg font-extrabold text-zinc-900">Luxury Villa Kigali</h4>
                               <div className="flex items-center gap-1 font-bold text-sm">
                                 <Star size={16} className="text-yellow-400 fill-yellow-400" /> 4.8
                               </div>
                             </div>
                             <div className="flex items-center gap-1 text-sm font-medium text-zinc-500 mb-6">
                               <MapPin size={14} /> Kigali, Rwanda
                             </div>
                             
                             <div className="grid grid-cols-2 gap-y-4 text-sm font-medium text-zinc-700">
                               <div className="flex items-center gap-2"><LayoutGrid size={16}/> 2500 Ares</div>
                               <div className="flex items-center gap-2"><BookOpen size={16}/> 15 Bookings</div>
                               <div className="flex items-center gap-2"><Building2 size={16}/> 12 Bathrooms</div>
                               <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 size={16}/> Available</div>
                             </div>
                           </div>
                           <div className="flex justify-between items-end mt-6">
                              <div>
                                <div className="text-lg font-extrabold text-emerald-600">RWF 150,000</div>
                                <div className="text-xs font-semibold text-zinc-500">Per night</div>
                              </div>
                              <button className="text-sm font-bold text-zinc-600 flex items-center gap-1 hover:text-zinc-900 transition">
                                Read more <ChevronDown size={16} className="-rotate-90"/>
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6 mt-6">
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-900">Check IN</label>
                         <div className="bg-white border border-zinc-200 rounded-lg p-3.5 text-sm font-semibold text-zinc-800 shadow-sm">
                           Monday Apr 20,2026
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-900">Check OUT</label>
                         <div className="bg-white border border-zinc-200 rounded-lg p-3.5 text-sm font-semibold text-zinc-800 shadow-sm">
                           Saturday, Apr 25,2026
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-900">Duration</label>
                         <div className="bg-white border border-zinc-200 rounded-lg p-3.5 text-sm font-semibold text-zinc-800 shadow-sm">
                           5 Nights
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-900">Guests</label>
                         <div className="bg-white border border-zinc-200 rounded-lg p-3.5 text-sm font-semibold text-zinc-800 shadow-sm">
                           2 Adults, 1 Child
                         </div>
                       </div>
                     </div>
                   </div>
                )}

                {/* 3. Payment Information */}
                {activeTab === "Payment Information" && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-zinc-900 mb-4">Payment Details</h3>
                    <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                      <div className="space-y-5 pb-6 border-b border-zinc-100">
                        <div className="flex justify-between items-center text-sm font-semibold text-zinc-700">
                          <div className="flex items-center gap-3"><Building2 size={18} className="text-zinc-400"/> RF 150,000 x 5 Nights</div>
                          <div>RF 750,000</div>
                        </div>
                        <div className="flex justify-between items-center text-sm font-semibold text-zinc-700">
                          <div className="flex items-center gap-3"><Info size={18} className="text-zinc-400"/> Cleaning fee</div>
                          <div>RF 750,000</div>
                        </div>
                        <div className="flex justify-between items-center text-sm font-semibold text-zinc-700">
                          <div className="flex items-center gap-3"><Info size={18} className="text-zinc-400"/> service fee</div>
                          <div>RF 750,000</div>
                        </div>
                        <div className="flex justify-between items-center text-sm font-semibold text-zinc-700">
                          <div className="flex items-center gap-3"><Info size={18} className="text-zinc-400"/> Taxes</div>
                          <div>RF 750,000</div>
                        </div>
                      </div>
                      
                      <div className="py-6 border-b border-zinc-100 flex justify-between items-center">
                        <div className="font-extrabold text-[#002521]">Total Amounts</div>
                        <div className="font-black text-emerald-600 text-lg">RWF 150,000</div>
                      </div>

                      <div className="pt-6 space-y-4">
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="text-zinc-600">Payment status</span>
                          <span className="text-emerald-500">Paid</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="text-zinc-600">Payment Method</span>
                          <span className="text-zinc-900">Credit Card (...4576)</span>
                        </div>
                      </div>

                      <button className="mt-8 font-bold text-[#0F3D2E] text-sm flex items-center gap-2 hover:underline">
                        View Transaction details <TrendingUp size={16} />
                      </button>
                    </div>
                  </div>
                )}


              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center px-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    selectedBooking?.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                    selectedBooking?.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-zinc-200 text-zinc-700'
                  }`}>
                    {selectedBooking?.status}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    Close
                  </button>
                  {selectedBooking?.status !== "Confirmed" && (
                    <button 
                      onClick={() => setConfirmAction({ id: selectedBooking.id, status: "Confirmed", type: "single" })}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                    >
                      Approve Booking
                    </button>
                  )}
                  {selectedBooking?.status !== "Rejected" && (
                    <button 
                      onClick={() => setConfirmAction({ id: selectedBooking.id, status: "Rejected", type: "single" })}
                      className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
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

      <Toast toast={toast} />

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmAction(null)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full relative z-10 shadow-2xl text-center"
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
                Are you sure you want to {confirmAction.status === "Confirmed" ? "approve" : "reject"} 
                {confirmAction.type === "bulk" ? ` these ${Array.isArray(confirmAction.id) ? confirmAction.id.length : ''} bookings` : " this booking"}? 
                This action will update the status immediately.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-3 bg-zinc-100 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => executeStatusUpdate(confirmAction.id, confirmAction.status)}
                  className={`flex-1 py-3 text-white rounded-xl text-sm font-bold shadow-lg transition-all ${
                    confirmAction.status === "Confirmed" 
                      ? "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700" 
                      : "bg-red-600 shadow-red-600/20 hover:bg-red-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

{/* Toast Notification */}
function Toast({ toast }: { toast: any }) {
  return (
    <AnimatePresence>
      {toast.type && (
        <motion.div 
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className={`fixed bottom-10 left-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-white font-bold text-sm ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Stub for PieChart Icon not available in Lucide natively without creating an explicit SVG
function PieChartIcon(props: { size?: number; className?: string }) {
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
