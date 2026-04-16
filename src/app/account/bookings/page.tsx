"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, MapPin } from "lucide-react";

export default function BookingsPage() {
  const bookings = [
    {
      id: "1",
      property: "Serene Lakefront Villa",
      location: "Kibuye, Rwanda",
      date: "Oct 12 - 15, 2025",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "2",
      property: "Modern Kigali Penthouse",
      location: "Kigali, Rwanda",
      date: "Aug 05 - 10, 2024",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 mb-8">
            <Link href="/account" className="hover:text-zinc-600">Account</Link>
            <ChevronRight size={14} />
            <span className="text-zinc-900">Bookings</span>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mb-12">My Bookings</h1>

          <div className="space-y-8">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="flex flex-col md:flex-row gap-8 p-6 rounded-[2.5rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-zinc-200/40 transition-all group"
              >
                <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                  <Image src={booking.image} alt={booking.property} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#065f46]">
                    {booking.status}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-2">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">{booking.property}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-zinc-500 font-medium">
                      <MapPin size={16} className="text-primary" />
                      {booking.location}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 font-medium">
                      <Calendar size={16} className="text-primary" />
                      {booking.date}
                    </div>
                  </div>
                  <Link href={`/account/bookings/${booking.id}`}>
                    <button className="w-fit px-8 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 rounded-xl font-bold text-sm transition-all">
                      View Receipt & Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-[3rem]">
              <p className="text-zinc-500 font-bold text-lg mb-6">No bookings yet.</p>
              <Link href="/properties" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
                Explore Properties
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
