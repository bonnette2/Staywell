"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Mail, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";

export default function PropertySidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated state
  const params = useParams();
  const propertyId = params.id as string;

  return (
    <div className="flex flex-col gap-8 lg:sticky lg:top-32">
      
      {/* Agent Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40"
      >
        <div className="flex items-center gap-6 mb-10">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-50 shadow-inner">
            <Image 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
              alt="Agent"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">John Doe</h3>
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mt-1">Property Owner</p>
          </div>
        </div>

        <div className="space-y-6 mb-10 text-[13px] font-bold">
          <div className="flex items-center justify-between group cursor-pointer border-b border-zinc-50 pb-4">
            <span className="text-zinc-500 uppercase tracking-wider flex items-center gap-3"><Phone size={16} className="text-primary opacity-60" /> Phone</span>
            <span className="text-foreground group-hover:text-primary transition-colors">+250 788888888</span>
          </div>
          <div className="flex items-center justify-between group cursor-pointer border-b border-zinc-50 pb-4">
            <span className="text-zinc-500 uppercase tracking-wider flex items-center gap-3"><MapPin size={16} className="text-primary opacity-60" /> Location</span>
            <span className="text-foreground group-hover:text-primary transition-colors text-right">Kigali - Gacuriro - Jabana</span>
          </div>
          <div className="flex items-center justify-between group cursor-pointer border-b border-zinc-50 pb-4 last:border-0 md:pb-0">
            <span className="text-zinc-500 uppercase tracking-wider flex items-center gap-3"><Mail size={16} className="text-primary opacity-60" /> Email</span>
            <span className="text-foreground group-hover:text-primary transition-colors">bonheurmurenvaj@gmail.com</span>
          </div>
        </div>

        <button 
          disabled={!isLoggedIn}
          className={`w-full py-5 rounded-3xl font-bold transition-all shadow-lg shadow-primary/20 scale-[0.98] hover:scale-100 ${
            isLoggedIn 
              ? "bg-primary hover:bg-[#064e3b] text-white" 
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200 shadow-none"
          }`}
        >
          {isLoggedIn ? "Contact owner" : "Login to contact"}
        </button>
      </motion.div>

      {/* Reserve Form Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40 relative"
      >
        {!isLoggedIn && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 rounded-[2.5rem] text-center">
            <div className="p-4 bg-white/90 rounded-2xl shadow-xl border border-zinc-100">
              <p className="text-sm font-bold text-zinc-800 mb-4 tracking-tight leading-relaxed">Please sign in to your StayWell account to reserve this property.</p>
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="inline-block px-8 py-3 bg-primary text-white rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Sign In Now
              </button>
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold text-center mb-10 text-foreground tracking-tight">Reserve property</h3>
        
        <form className="space-y-8 opacity-50 select-none pointer-events-none">
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Property Name</label>
            <input type="text" placeholder="Wooden House" className="w-full px-6 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Name</label>
            <input 
              type="text" 
              placeholder="Your name" 
              className="w-full px-6 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
              onChange={(e) => {
                if (e.target.value.includes("<script>")) {
                  alert("Security Alert: Script injection detected and blocked.");
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Email</label>
            <input type="email" placeholder="Your email" className="w-full px-6 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Phone</label>
            <input type="tel" placeholder="Your phone" className="w-full px-6 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Check-in</label>
              <div className="relative">
                <input type="text" placeholder="7/13/2025" className="w-full pl-6 pr-4 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Check-out</label>
              <div className="relative">
                <input type="text" placeholder="8/13/2025" className="w-full pl-6 pr-4 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] ml-4">Guests</label>
            <select className="w-full px-6 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner appearance-none cursor-pointer">
              <option>1 guest</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4+ guests</option>
            </select>
          </div>

          <Link 
            href={`/properties/${propertyId}/booking`}
            className="w-full py-5 bg-primary hover:bg-[#064e3b] text-white rounded-3xl font-bold transition-all shadow-lg shadow-primary/20 mt-4 scale-[0.98] hover:scale-100 flex items-center justify-center"
          >
            Reserve
          </Link>
        </form>
      </motion.div>

    </div>
  );
}
