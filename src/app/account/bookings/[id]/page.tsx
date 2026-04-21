"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Download, 
  Printer, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  Clock, 
  XCircle,
  CreditCard,
  Receipt,
  ArrowLeft,
  Eye
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockBookings } from "@/data/bookings";
import React from "react";

export default function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const booking = mockBookings[id];

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4">Booking not found</h2>
          <button 
            onClick={() => router.push("/account/bookings")}
            className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const StatusIcon = ({
    Confirmed: CheckCircle2,
    Pending: Clock,
    Cancelled: XCircle,
    Completed: CheckCircle2
  } as const)[booking.status as "Confirmed" | "Pending" | "Cancelled" | "Completed"];

  const statusColor = ({
    Confirmed: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
    Completed: "bg-blue-50 text-blue-600 border-blue-100"
  } as const)[booking.status as "Confirmed" | "Pending" | "Cancelled" | "Completed"];

  return (
    <div className="bg-zinc-50 min-h-screen pb-24">
      <Header />
      
      <main className="pt-32 max-w-5xl mx-auto px-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/account/bookings" 
            className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Bookings
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-zinc-200 rounded-2xl text-zinc-600 hover:text-primary hover:border-primary transition-all shadow-sm">
              <Download size={20} />
            </button>
            <button className="p-3 bg-white border border-zinc-200 rounded-2xl text-zinc-600 hover:text-primary hover:border-primary transition-all shadow-sm">
              <Printer size={20} />
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-zinc-900 mb-2 tracking-tight">Booking Details</h1>
          <p className="text-zinc-500 font-medium">Review your reservation and payment information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Summary Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/20"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0">
                  <Image src={booking.propertyImage} alt={booking.propertyTitle} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest mb-4 ${statusColor}`}>
                    <StatusIcon size={14} />
                    {booking.status}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">{booking.propertyTitle}</h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold mb-6">
                    <MapPin size={16} className="text-primary" />
                    {booking.location}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-zinc-50">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Check-in</p>
                      <p className="text-sm font-bold text-zinc-800">{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Check-out</p>
                      <p className="text-sm font-bold text-zinc-800">{booking.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Guests</p>
                      <p className="text-sm font-bold text-zinc-800">{booking.guests} Guests</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Guest Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/20"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Guest Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-sm font-bold text-zinc-800">{booking.guestName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-sm font-bold text-zinc-800">{booking.guestEmail}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Phone Number</p>
                  <p className="text-sm font-bold text-zinc-800">{booking.guestPhone}</p>
                </div>
              </div>
            </motion.div>

            {/* Receipt / Invoice Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/20 overflow-hidden relative"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-800">
                    <Receipt size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Receipt</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Booking ID</p>
                  <p className="text-sm font-bold text-zinc-800">#{booking.bookingId}</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center py-4 border-b border-zinc-50">
                  <span className="text-sm font-bold text-zinc-600">Nightly Rate (×{booking.nights} nights)</span>
                  <span className="text-sm font-bold text-zinc-900">RWF {(booking.nightlyRate * booking.nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-zinc-50">
                  <span className="text-sm font-bold text-zinc-600">Service Fee</span>
                  <span className="text-sm font-bold text-zinc-900">RWF {booking.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-zinc-50">
                  <span className="text-sm font-bold text-zinc-600">Taxes</span>
                  <span className="text-sm font-bold text-zinc-900">RWF {booking.taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-6">
                  <span className="text-lg font-black text-zinc-900">Total Amount Paid</span>
                  <span className="text-2xl font-black text-primary">RWF {booking.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-6 bg-zinc-50 rounded-3xl flex flex-wrap gap-12 items-center">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Payment Method</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-800">
                    <CreditCard size={16} className="text-primary" />
                    {booking.paymentMethod}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Transaction ID</p>
                  <p className="text-sm font-bold text-zinc-800 uppercase">{booking.transactionId}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Date Paid</p>
                  <p className="text-sm font-bold text-zinc-800">{booking.paymentDate}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Host Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40"
            >
              <h3 className="text-lg font-bold text-zinc-900 mb-6">Host</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {booking.hostName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{booking.hostName}</p>
                  <p className="text-xs font-bold text-zinc-500 tracking-tight">Property Owner</p>
                </div>
              </div>
              <Link 
                href="/messages"
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-[#001a17] transition-all shadow-lg shadow-primary/10"
              >
                <MessageSquare size={18} />
                Message Host
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Link 
                href="/properties"
                className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-zinc-200 text-zinc-800 rounded-2xl font-bold text-sm hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                <Eye size={18} />
                View Property
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
