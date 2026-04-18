"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { ChevronLeft, CreditCard, Smartphone, CheckCircle, ShieldCheck, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateCardNumber, 
  validateExpiry, 
  validateCVV, 
  sanitizeInput 
} from "@/utils/validation";

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [step, setStep] = useState(1);
  const propertyPaymentMethods = ["momo", "card"]; // Mocked host selection
  const [paymentMethod, setPaymentMethod] = useState(propertyPaymentMethods[0]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [nights, setNights] = useState(7);
  
  const propertyPricePerNight = 150;
  const cleaningFee = 45;
  const serviceFee = 120;
  
  // Property Title (derived from ID for now)
  const propertyTitle = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Form State
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2 guests",
    momoNumber: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Real-time validation
    let error: string | null = null;
    if (field === "momoNumber") error = validatePhone(sanitizedValue);
    if (field === "cardName") error = validateName(sanitizedValue);
    if (field === "cardNumber") error = validateCardNumber(sanitizedValue);
    if (field === "expiry") error = validateExpiry(sanitizedValue);
    if (field === "cvv") error = validateCVV(sanitizedValue);
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isStep1Valid = !!(formData.checkIn && formData.checkOut);
  const isStep2Valid = paymentMethod === "momo" 
    ? (!!formData.momoNumber && !errors.momoNumber)
    : (!!formData.cardName && !errors.cardName && !!formData.cardNumber && !errors.cardNumber && !!formData.expiry && !errors.expiry && !!formData.cvv && !errors.cvv);

  const handleNext = () => {
    if (step === 1 && !isStep1Valid) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    if (step === 2 && !isStep2Valid) {
      alert("Please correct the errors in the payment form.");
      return;
    }
    setStep(prev => prev + 1);
  };
  const handleBack = () => setStep(prev => prev - 1);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setNights(diffDays > 0 ? diffDays : 0);
    }
  }, [formData.checkIn, formData.checkOut]);

  const totalAmount = (propertyPricePerNight * (nights || 1)) + cleaningFee + serviceFee;
  return (
    <>
      <Preloader />
      <Header />
      <main className="bg-[#fafafc] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <Link href={`/properties/${id}`} className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary font-bold text-sm mb-12 transition-colors">
            <ChevronLeft size={16} /> Back to property
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Booking Steps */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Stepper Header */}
              <div className="grid grid-cols-4 gap-4 mb-12">
                {[
                  { id: 1, label: "Trip info" },
                  { id: 2, label: "Payment" },
                  { id: 3, label: "Review" },
                  { id: 4, label: "Done" }
                ].map((s) => (
                  <div key={s.id} className="flex flex-col gap-3">
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${
                      step >= s.id ? "bg-primary" : "bg-zinc-200"
                    }`} />
                    <span className={`font-bold text-[11px] uppercase tracking-widest text-center ${
                      step >= s.id ? "text-primary" : "text-zinc-400"
                    }`}>{s.label}</span>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm">
                    <h2 className="text-3xl font-black text-[#171717] mb-8">Review your trip</h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-50">
                          <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Check-in</p>
                            <input 
                              type="date" 
                              min={today}
                              value={formData.checkIn}
                              onChange={(e) => handleInputChange("checkIn", e.target.value)}
                              className="w-full bg-transparent font-bold text-zinc-800 outline-none focus:text-primary transition-colors cursor-pointer"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Check-out</p>
                            <input 
                              type="date" 
                              min={formData.checkIn || today}
                              value={formData.checkOut}
                              onChange={(e) => handleInputChange("checkOut", e.target.value)}
                              className="w-full bg-transparent font-bold text-zinc-800 outline-none focus:text-primary transition-colors cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-50">
                          <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Guests</p>
                            <select 
                              value={formData.guests}
                              onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
                              className="bg-transparent font-bold text-zinc-800 outline-none appearance-none cursor-pointer pr-4"
                            >
                              <option>1 guest</option>
                              <option>2 guests</option>
                              <option>3 guests</option>
                              <option>4+ guests</option>
                            </select>
                          </div>
                        </div>
                      </div>

                    <div className="mt-10 p-6 bg-zinc-50 rounded-2xl flex gap-4 border border-zinc-100">
                      <ShieldCheck className="text-primary shrink-0" size={24} />
                      <div>
                        <p className="text-sm font-bold text-zinc-800 mb-1">StayWell Protection</p>
                        <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                          Every booking includes free protection from Guest Cancellations and listing inaccuracies.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={handleNext}
                      className="w-full mt-10 py-5 bg-primary hover:bg-[#064e3b] text-white rounded-3xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Save and continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm">
                    <h2 className="text-3xl font-black text-[#171717] mb-4">Choose how to pay</h2>
                    <p className="text-sm text-zinc-500 font-medium mb-10">All payments are encrypted and secure.</p>
                    
                    <div className="space-y-4">
                      {propertyPaymentMethods.includes("momo") && (
                        <>
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
                              {paymentMethod === "momo" && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </button>

                          {paymentMethod === "momo" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-6 pt-2">
                               <div className="flex flex-col gap-3">
                                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                                  <input 
                                    type="tel" 
                                    placeholder="+250 78X XXX XXX" 
                                    value={formData.momoNumber}
                                    onChange={(e) => handleInputChange("momoNumber", e.target.value)}
                                    className={`w-full px-6 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 shadow-inner ${
                                      errors.momoNumber ? "border-red-500" : formData.momoNumber && !errors.momoNumber ? "border-green-500" : "border-zinc-100"
                                    }`}
                                  />
                                  {errors.momoNumber && <span className="text-[10px] font-bold text-red-500 ml-1">{errors.momoNumber}</span>}
                               </div>
                            </motion.div>
                          )}
                        </>
                      )}

                      {propertyPaymentMethods.includes("card") && (
                        <>
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
                              {paymentMethod === "card" && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </button>

                          {paymentMethod === "card" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-6 pt-2 space-y-4">
                               <div className="flex flex-col gap-3">
                                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Name on Card</label>
                                  <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    value={formData.cardName}
                                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                                    className={`w-full px-6 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 shadow-inner ${
                                      errors.cardName ? "border-red-500" : formData.cardName && !errors.cardName ? "border-green-500" : "border-zinc-100"
                                    }`}
                                  />
                                  {errors.cardName && <span className="text-[10px] font-bold text-red-500 ml-1">{errors.cardName}</span>}
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Card Number</label>
                                    <input 
                                      type="text" 
                                      placeholder="XXXX XXXX XXXX XXXX" 
                                      value={formData.cardNumber}
                                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                      className={`w-full px-6 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner ${
                                        errors.cardNumber ? "border-red-500" : formData.cardNumber && !errors.cardNumber ? "border-green-500" : "border-zinc-100"
                                      }`}
                                    />
                                    {errors.cardNumber && <span className="text-[10px] font-bold text-red-500 ml-1">{errors.cardNumber}</span>}
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-3">
                                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Expiry</label>
                                      <input 
                                        type="text" 
                                        placeholder="MM/YY" 
                                        value={formData.expiry}
                                        onChange={(e) => handleInputChange("expiry", e.target.value)}
                                        className={`w-full px-4 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner ${
                                          errors.expiry ? "border-red-500" : formData.expiry && !errors.expiry ? "border-green-500" : "border-zinc-100"
                                        }`}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">CVC/CVV</label>
                                      <input 
                                        type="text" 
                                        placeholder="123" 
                                        value={formData.cvv}
                                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                                        className={`w-full px-4 py-4 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold shadow-inner ${
                                          errors.cvv ? "border-red-500" : formData.cvv && !errors.cvv ? "border-green-500" : "border-zinc-100"
                                        }`}
                                      />
                                    </div>
                                  </div>
                               </div>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-10 p-8 bg-zinc-900 rounded-[2rem] text-white flex items-center gap-6 shadow-2xl">
                      <div className="p-4 bg-white/10 rounded-2xl">
                         <ShieldCheck className="text-primary" size={32} />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">Encrypted Payment</p>
                        <p className="text-xs text-zinc-400 font-medium">Your data is secured with AES-256 encryption.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-12">
                      <button onClick={handleBack} className="px-8 py-5 border border-zinc-200 text-zinc-800 rounded-3xl font-bold hover:bg-zinc-50 transition-all">
                        Back
                      </button>
                      <button 
                        onClick={handleNext}
                        className="flex-1 py-5 bg-primary hover:bg-[#064e3b] text-white rounded-3xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Review Booking
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm">
                    <h2 className="text-3xl font-black text-[#171717] mb-8">Review & Confirm</h2>
                    
                    <div className="bg-zinc-50 rounded-[2rem] p-8 space-y-6 mb-10 border border-zinc-100">
                      <div className="flex justify-between items-center group">
                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Payment Method</span>
                        <span className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                           {paymentMethod === "momo" ? <Smartphone size={16} /> : <CreditCard size={16} />}
                           {paymentMethod === "momo" ? "Mobile Money" : "Credit Card"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Cancellation Policy</span>
                        <span className="text-sm font-bold text-zinc-800">Free before July 10</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Ground Rules</span>
                        <span className="text-sm font-bold text-zinc-800 underline cursor-pointer">View Rules</span>
                      </div>
                    </div>

                    <div className="space-y-6 mb-10">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          agreedToTerms ? "bg-primary border-primary" : "border-zinc-200 group-hover:border-primary"
                        }`}>
                           <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={agreedToTerms}
                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                           />
                           {agreedToTerms && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <span className="text-sm font-medium text-zinc-600 leading-relaxed">
                          I agree to the <span className="text-primary font-bold">House Rules</span>, <span className="text-primary font-bold">Cancellation Policy</span>, and I authorize StayWell to charge my payment method for this reservation.
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center gap-4">
                      <button onClick={handleBack} className="px-8 py-5 border border-zinc-200 text-zinc-800 rounded-3xl font-bold hover:bg-zinc-50 transition-all">
                        Back
                      </button>
                      <button 
                        disabled={!agreedToTerms}
                        onClick={handleNext}
                        className={`flex-1 py-5 rounded-3xl font-bold transition-all shadow-lg ${
                          agreedToTerms 
                            ? "bg-primary hover:bg-[#064e3b] text-white shadow-primary/20 hover:scale-[1.01]" 
                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                        }`}
                      >
                        Confirm and Pay ${totalAmount.toLocaleString()}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 bg-white rounded-[2.5rem] p-16 border border-zinc-100 shadow-2xl">
                  <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      <CheckCircle size={64} strokeWidth={2.5} />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/20 rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-[#171717] mb-4">Reservation Confirmed!</h2>
                    <p className="text-zinc-500 font-bold mb-8 uppercase tracking-widest text-xs">Booking ID: SW-{Math.floor(1000 + Math.random() * 9000)}-{Math.floor(1000 + Math.random() * 9000)}</p>
                    <p className="text-zinc-600 font-medium max-w-md mx-auto leading-relaxed">
                      Your stay at <span className="text-zinc-900 font-black">{propertyTitle}</span> is all set for {formData.checkIn || "July 13"}. We've sent the details to your email.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link 
                      href="/account/bookings"
                      className="px-10 py-4 bg-zinc-900 text-white rounded-full font-bold shadow-xl hover:bg-black transition-all"
                    >
                      View Booking
                    </Link>
                    <Link 
                      href="/properties"
                      className="px-10 py-4 border border-zinc-200 text-zinc-800 rounded-full font-bold hover:bg-zinc-50 transition-all"
                    >
                      Explore More
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
 
            {/* Right: Price Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-36">
              <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40 divide-y divide-zinc-50 overflow-hidden relative">
                <div className="flex gap-4 pb-8 items-center">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" alt="Property" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 leading-tight">{propertyTitle}</h4>
                    <p className="text-[10px] font-black text-zinc-400 mt-1 uppercase tracking-widest">Entire Villa • 3 Bedrooms</p>
                    <div className="flex items-center gap-1.5 mt-2 px-3 py-1 bg-primary/5 rounded-full w-fit">
                       <ShieldCheck size={12} className="text-primary" />
                       <span className="text-[10px] font-black text-primary uppercase tracking-wider">Verified Agent</span>
                    </div>
                  </div>
                </div>

                <div className="py-8 space-y-4">
                  <h5 className="font-black text-lg text-zinc-900 tracking-tight">Price details</h5>
                  <div className="flex justify-between text-sm font-medium text-zinc-500">
                    <span className="font-bold text-zinc-600">${propertyPricePerNight} x {nights || 1} nights</span>
                    <span className="font-black text-zinc-900">${(propertyPricePerNight * (nights || 1)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-zinc-500">
                    <span className="font-bold text-zinc-600">Cleaning fee</span>
                    <span className="font-black text-zinc-900">${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-zinc-500">
                    <span className="font-bold text-zinc-600">StayWell service fee</span>
                    <span className="font-black text-zinc-900">${serviceFee}</span>
                  </div>
                </div>

                <div className="pt-8 bg-zinc-50 -mx-8 px-8 rounded-b-[2.5rem]">
                  <div className="flex justify-between items-center pb-8">
                     <span className="text-lg font-black text-zinc-900">Total (USD)</span>
                     <span className="text-3xl font-black text-primary">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="pb-8 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                    <MapPin size={16} className="text-primary" />
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Location</p>
                      <p className="text-xs font-bold text-zinc-800">Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-8 p-6 bg-white rounded-[2rem] border border-zinc-100 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <ShieldCheck size={24} />
                 </div>
                 <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                    Secure checkout <br/><span className="text-zinc-800">StayWell Guaranteed</span>
                 </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
