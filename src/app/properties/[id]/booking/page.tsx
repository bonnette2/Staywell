"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { ChevronLeft, CreditCard, Smartphone, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookingPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("momo");

  return (
    <>
      <Preloader />
      <Header />
      <main className="bg-[#fafafc] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <Link href={`/properties/${params.id}`} className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary font-bold text-sm mb-12 transition-colors">
            <ChevronLeft size={16} /> Back to property
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Booking Steps */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Stepper Header */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex items-center justify-between mb-8 overflow-x-auto no-scrollbar gap-8">
                {[
                  { id: 1, label: "Your trip" },
                  { id: 2, label: "Payment" },
                  { id: 3, label: "Confirm" }
                ].map((s) => (
                  <div key={s.id} className="flex items-center gap-4 shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= s.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-zinc-100 text-zinc-400"
                    }`}>
                      {step > s.id ? <CheckCircle size={18} /> : s.id}
                    </div>
                    <span className={`font-bold text-sm ${step >= s.id ? "text-foreground" : "text-zinc-400"}`}>{s.label}</span>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm">
                    <h2 className="text-3xl font-black text-[#171717] mb-8">Review your trip</h2>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-6 border-b border-zinc-50">
                        <div>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Dates</p>
                          <p className="font-bold text-zinc-800">July 13 – 20, 2025</p>
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline">Edit</button>
                      </div>
                      <div className="flex justify-between items-center pb-6 border-b border-zinc-50">
                        <div>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Guests</p>
                          <p className="font-bold text-zinc-800">2 guests</p>
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline">Edit</button>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full mt-10 py-5 bg-primary hover:bg-[#064e3b] text-white rounded-3xl font-bold transition-all shadow-lg shadow-primary/20"
                    >
                      Save and continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm">
                    <h2 className="text-3xl font-black text-[#171717] mb-8">Choose how to pay</h2>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={() => setPaymentMethod("momo")}
                        className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                          paymentMethod === "momo" ? "border-primary bg-primary/5 shadow-inner" : "border-zinc-100 hover:border-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${paymentMethod === "momo" ? "bg-primary text-white" : "bg-zinc-100 text-zinc-500"}`}>
                            <Smartphone size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-zinc-800">Mobile Money (MoMo/Airtel)</p>
                            <p className="text-xs text-zinc-500 font-medium">Safe & Quick payment in Rwanda</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === "momo" ? "border-primary bg-primary" : "border-zinc-200"
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: paymentMethod === "momo" ? 1 : 0 }} />
                        </div>
                      </button>

                      <button 
                        onClick={() => setPaymentMethod("card")}
                        className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                          paymentMethod === "card" ? "border-primary bg-primary/5 shadow-inner" : "border-zinc-100 hover:border-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${paymentMethod === "card" ? "bg-primary text-white" : "bg-zinc-100 text-zinc-500"}`}>
                            <CreditCard size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-zinc-800">Credit or Debit Card</p>
                            <p className="text-xs text-zinc-500 font-medium">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === "card" ? "border-primary bg-primary" : "border-zinc-200"
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: paymentMethod === "card" ? 1 : 0 }} />
                        </div>
                      </button>
                    </div>

                    <div className="mt-8 p-6 bg-zinc-50 rounded-2xl flex gap-4">
                      <ShieldCheck className="text-primary shrink-0" size={24} />
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                        Your payment information is encrypted and processed securely. We never store your full card details or MoMo pins.
                      </p>
                    </div>

                    <button 
                      onClick={() => setStep(3)}
                      className="w-full mt-10 py-5 bg-primary hover:bg-[#064e3b] text-white rounded-3xl font-bold transition-all shadow-lg shadow-primary/20"
                    >
                      Confirm and Pay
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 bg-white rounded-[2.5rem] p-16 border border-zinc-100 shadow-sm">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
                    <CheckCircle size={48} strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl font-black text-[#171717]">Booking Successful!</h2>
                  <p className="text-zinc-600 font-medium max-w-md mx-auto leading-relaxed">
                    Thank you for your reservation. A confirmation email with all details has been sent to your address.
                  </p>
                  <Link 
                    href="/properties"
                    className="inline-block mt-8 px-12 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    Back to Properties
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Right: Price Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-36">
              <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40 divide-y divide-zinc-50">
                <div className="flex gap-4 pb-8 items-center">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" alt="Property" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-800 leading-tight">Luxury Villa Kigali</h4>
                    <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-wider">Entire Villa • 3 Bedrooms</p>
                    <div className="flex items-center gap-1 mt-2">
                       <Smartphone size={12} className="text-primary" />
                       <span className="text-[10px] font-bold text-zinc-600">Secure Booking</span>
                    </div>
                  </div>
                </div>

                <div className="py-8 space-y-4">
                  <h5 className="font-black text-lg text-zinc-800 tracking-tight">Price details</h5>
                  <div className="flex justify-between text-sm font-medium text-zinc-600">
                    <span>$150 x 7 nights</span>
                    <span className="font-bold">$1,050</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-zinc-600">
                    <span>Cleaning fee</span>
                    <span className="font-bold">$45</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-zinc-600">
                    <span>StayWell service fee</span>
                    <span className="font-bold">$120</span>
                  </div>
                </div>

                <div className="pt-8 bg-primary/5 -mx-8 px-8 rounded-b-[2.5rem]">
                  <div className="flex justify-between items-center pb-8">
                     <span className="text-lg font-black text-zinc-800">Total (USD)</span>
                     <span className="text-2xl font-black text-primary">$1,215</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
