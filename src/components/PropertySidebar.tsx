"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Mail, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";

import { validateName, validateEmail, validatePhone, sanitizeInput } from "@/utils/validation";

interface PropertySidebarProps {
  propertyTitle?: string;
}

export default function PropertySidebar({ propertyTitle = "Luxury Villa" }: PropertySidebarProps) {
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const propertyId = params.id as string;

  // Form State
  const [formData, setFormData] = useState({
    propertyName: propertyTitle,
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1 guest"
  });


  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Real-time validation
    let error: string | null = null;
    if (field === "name") error = validateName(sanitizedValue);
    if (field === "email") error = validateEmail(sanitizedValue);
    if (field === "phone") error = validatePhone(sanitizedValue);
    if (field === "checkIn" || field === "checkOut") error = sanitizedValue ? null : "This field is required";
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (propertyTitle) {
      setFormData(prev => ({ ...prev, propertyName: propertyTitle }));
    }
  }, [propertyTitle]);



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

        <Link 
          href={isAuthenticated ? "/messages" : "/login"}
          className={`w-full py-5 rounded-3xl font-bold transition-all shadow-lg shadow-primary/20 scale-[0.98] hover:scale-100 flex items-center justify-center ${
            isAuthenticated 
              ? "bg-primary hover:bg-[#064e3b] text-white" 
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200 shadow-none"
          }`}
        >
          {isAuthenticated ? "Contact owner" : "Login to contact"}
        </Link>
      </motion.div>

      {/* Reserve Form Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40 relative"
      >
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 rounded-[2.5rem] text-center">
            <div className="p-4 bg-white/90 rounded-2xl shadow-xl border border-zinc-100">
              <p className="text-sm font-bold text-zinc-800 mb-4 tracking-tight leading-relaxed">Please sign in to your StayWell account to reserve this property.</p>
              <Link
                href="/login"
                className="inline-block px-8 py-3 bg-primary text-white rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold text-center mb-10 text-foreground tracking-tight">Reserve property</h3>
        
        <form className={`space-y-6 transition-opacity duration-500 ${isAuthenticated ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Property Name</label>
            <input 
              type="text" 
              value={formData.propertyName} 
              onChange={(e) => handleInputChange("propertyName", e.target.value)}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold text-zinc-800 shadow-inner outline-none focus:ring-4 focus:ring-primary/10 transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Your Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe" 
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-6 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner outline-none focus:ring-4 focus:ring-primary/10 ${
                errors.name ? "border-red-500" : formData.name && !errors.name ? "border-green-500" : "border-zinc-100"
              }`}
            />
            {errors.name && <span className="text-[10px] font-bold text-red-500 ml-1">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-6 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner outline-none focus:ring-4 focus:ring-primary/10 ${
                errors.email ? "border-red-500" : formData.email && !errors.email ? "border-green-500" : "border-zinc-100"
              }`}
            />
            {errors.email && <span className="text-[10px] font-bold text-red-500 ml-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+250 78X XXX XXX" 
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full px-6 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner outline-none focus:ring-4 focus:ring-primary/10 ${
                errors.phone ? "border-red-500" : formData.phone && !errors.phone ? "border-green-500" : "border-zinc-100"
              }`}
            />
            {errors.phone && <span className="text-[10px] font-bold text-red-500 ml-1">{errors.phone}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Check-in</label>
              <input 
                type="date" 
                min={today}
                value={formData.checkIn}
                onChange={(e) => handleInputChange("checkIn", e.target.value)}
                className={`w-full px-4 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner outline-none focus:ring-4 focus:ring-primary/10 ${
                  errors.checkIn ? "border-red-500" : "border-zinc-100"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Check-out</label>
              <input 
                type="date" 
                min={formData.checkIn || today}
                value={formData.checkOut}
                onChange={(e) => handleInputChange("checkOut", e.target.value)}
                className={`w-full px-4 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner outline-none focus:ring-4 focus:ring-primary/10 ${
                  errors.checkOut ? "border-red-500" : "border-zinc-100"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Guests</label>
            <select 
              value={formData.guests}
              onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold shadow-inner focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
            >
              <option>1 guest</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4+ guests</option>
            </select>
          </div>

          <Link 
            href={
              Object.values(errors).every(e => e === null) && Object.values(formData).every(v => v !== "")
              ? `/properties/${propertyId}/booking`
              : "#"
            }
            onClick={(e) => {
              if (!(Object.values(errors).every(e => e === null) && Object.values(formData).every(v => v !== ""))) {
                e.preventDefault();
                alert("Please fill in all fields correctly before proceeding.");
              }
            }}
            className={`w-full py-5 text-white rounded-3xl font-bold transition-all shadow-lg mt-4 flex items-center justify-center ${
              Object.values(errors).every(e => e === null) && Object.values(formData).every(v => v !== "")
              ? "bg-primary hover:bg-[#064e3b] shadow-primary/20 scale-100 active:scale-95"
              : "bg-zinc-300 cursor-not-allowed opacity-70"
            }`}
          >
            Reserve Now
          </Link>
        </form>
      </motion.div>

    </div>
  );
}
