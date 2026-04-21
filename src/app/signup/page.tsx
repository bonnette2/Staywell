"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UserRole } from "@/context/AuthContext";
import { User, Mail, Phone, Users, Home, ArrowRight, ShieldCheck, RefreshCw, Check } from "lucide-react";
import { validateName, validateEmail, validatePhone, sanitizeInput } from "@/utils/validation";
import Preloader from "@/components/Preloader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

export default function SignupPage() {
  const { signup } = useAuth();
  const [role, setRole] = useState<UserRole>("guest");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  
  // 2FA State
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    const sanitized = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    
    // Real-time validation
    let error: string | null = null;
    if (field === "name") error = validateName(sanitized);
    if (field === "email") error = validateEmail(sanitized);
    if (field === "phone") error = validatePhone(sanitized);
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleOTPChange = (index: number, value: string) => {
    const val = value.replace(/[^0-9]/g, "");
    if (!val && value !== "") return;
    
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);

    if (nameError || emailError || phoneError) {
      setErrors({ name: nameError, email: emailError, phone: phoneError });
      return;
    }

    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setShowOTP(true);
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setOtpError("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);
    setOtpError("");
    try {
      // Simulate verification
      setTimeout(async () => {
        await signup({ name: formData.name, email: formData.email, role });
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setOtpError("Invalid verification code. Please try again.");
      setIsLoading(false);
    }
  };

  const fields = [
    { id: "name",  label: "Full Name",     type: "text",  placeholder: "e.g John Doe",        icon: User,  value: formData.name },
    { id: "email", label: "Email Address", type: "email", placeholder: "e.g John@gmail.com",  icon: Mail,  value: formData.email },
    { id: "phone", label: "Phone Number",  type: "tel",   placeholder: "e.g +250 78X XXX XXX", icon: Phone, value: formData.phone },
  ];

  return (
    <div className="relative min-h-screen w-full lg:overflow-hidden">
      <Preloader />
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury House"
          fill
          className="object-cover scale-[1.04]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* ====== LEFT: FORM PANEL ====== */}
        <motion.div
          className="w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-12 h-screen overflow-y-auto no-scrollbar relative z-20"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-[420px] w-full mx-auto lg:ml-0">
            {/* Logo */}
            <motion.div
              className="flex flex-col items-center mb-10"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center mb-3 backdrop-blur-md shadow-xl shadow-black/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/>
                  <path strokeLinecap="round" d="M9 22V12h6v10"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white/95 tracking-wide">Staywell</span>
            </motion.div>

            <AnimatePresence mode="wait">
              {!showOTP ? (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-10">
                    <h1 className="text-[2.6rem] font-black text-white tracking-tight leading-[1.05] mb-3">
                      Create account
                    </h1>
                    <p className="text-white/50 text-sm font-medium">
                      Create your account and unlock exclusive features
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {fields.map(({ id, label, type, placeholder, icon: Icon, value }) => (
                      <div key={id}>
                        <label className="block text-xs font-black text-white/70 uppercase tracking-[0.14em] mb-3">
                          {label}
                        </label>
                        <div className={`relative transition-transform duration-200 ${focused === id ? "scale-[1.015]" : ""}`}>
                          <div
                            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                              errors[id]
                                ? "bg-red-500/10 shadow-[0_0_0_1.5px_rgba(239,68,68,0.5)]"
                                : focused === id
                                ? "bg-white/18 shadow-[0_0_0_1.5px_rgba(255,255,255,0.45)]"
                                : "bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.20)]"
                            }`}
                          />
                          <Icon
                            size={17}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${focused === id ? "text-white/70" : "text-white/35"}`}
                          />
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="relative z-10 w-full bg-transparent pl-11 pr-5 py-4 text-white text-[15px] font-medium outline-none placeholder:text-white/30 tracking-[0.01em]"
                            value={value}
                            onFocus={() => setFocused(id)}
                            onBlur={() => setFocused(null)}
                            onChange={(e) => handleInputChange(id, e.target.value)}
                          />
                        </div>
                        {errors[id] && <p className="text-[10px] font-bold text-red-400 mt-2 ml-1">{errors[id]}</p>}
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-black text-white/70 uppercase tracking-[0.14em] mb-3">
                        Account Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "guest" as UserRole, label: "Guest", desc: "I'm looking to book", icon: Users },
                          { value: "host"  as UserRole, label: "Host",  desc: "I want to list",      icon: Home  },
                        ].map(({ value, label, desc, icon: Icon }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRole(value)}
                            className={`relative p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden group ${
                              role === value
                                ? "bg-white/20 border-white/50 shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_8px_24px_rgba(0,0,0,0.2)]"
                                : "bg-white/8 border-white/15 hover:bg-white/13 hover:border-white/30"
                            }`}
                          >
                            <div className="relative z-10">
                              <Icon size={20} className={`mb-2 transition-colors ${role === value ? "text-white" : "text-white/45"}`} />
                              <p className={`text-sm font-black transition-colors ${role === value ? "text-white" : "text-white/70"}`}>{label}</p>
                              <p className={`text-[11px] font-medium mt-0.5 transition-colors ${role === value ? "text-white/60" : "text-white/35"}`}>{desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => setRememberMe(!rememberMe)}
                        className="flex items-center gap-3 group/check cursor-pointer outline-none"
                      >
                        <div className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center shrink-0 ${
                          rememberMe ? "bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-white/25 bg-white/10 group-hover/check:border-white/40"
                        }`}>
                          {rememberMe && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", damping: 12, stiffness: 300 }}
                            >
                              <Check size={14} className="text-[#002521] stroke-[4]" />
                            </motion.div>
                          )}
                        </div>
                        <span className={`text-sm font-medium transition-colors duration-300 ${rememberMe ? "text-white" : "text-white/55 group-hover/check:text-white/80"}`}>
                          Remember me
                        </span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="relative w-full py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group flex items-center justify-center gap-2"
                    >
                    <div className="absolute inset-0 bg-[#002521]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#002521] to-[#001a17] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{isLoading ? "Sending code..." : "Create Account"}</span>
                    {!isLoading && <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                       <ShieldCheck className="text-emerald-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-3">Verification</h1>
                    <p className="text-white/50 text-sm font-medium leading-relaxed">
                      We've sent a 6-digit verification code to <br />
                      <span className="text-white font-bold">{formData.email}</span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOTP} className="space-y-10">
                    <div className="flex justify-between gap-2">
                       {otp.map((digit, i) => (
                         <input
                           key={i}
                           id={`otp-${i}`}
                           type="text"
                           maxLength={1}
                           value={digit}
                           onChange={(e) => handleOTPChange(i, e.target.value)}
                           className="w-12 h-16 bg-white/10 border border-white/20 rounded-2xl text-center text-2xl font-black text-white outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                         />
                       ))}
                    </div>

                    {otpError && (
                      <p className="text-center text-xs font-black text-red-400 uppercase tracking-widest">{otpError}</p>
                    )}

                    <div className="space-y-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full py-5 rounded-2xl font-bold text-white text-sm overflow-hidden group flex items-center justify-center gap-2"
                      >
                        <div className="absolute inset-0 bg-[#002521]" />
                        <span className="relative z-10">{isLoading ? "Verifying..." : "Verify & Sign Up"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowOTP(false)}
                        className="w-full py-4 text-white/40 text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={14} />
                        Wrong email? Edit info
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="mt-8 text-center text-white/40 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Already have an account?{" "}
              <Link href="/login" className="text-white font-bold hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-white/25">
                Login
              </Link>
            </motion.p>
          </div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="hidden lg:block w-[1px] self-stretch my-14"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)" }}
        />

        {/* ====== RIGHT: HERO PANEL ====== */}
        <motion.div
          className="hidden lg:flex w-[50%] flex-col justify-center px-16 xl:px-20 fixed right-0 top-0 h-screen z-10 pt-20"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="space-y-7 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-black text-white/75 tracking-[0.12em] uppercase">10,000+ Properties</span>
            </motion.div>

            <motion.h2
              className="text-5xl xl:text-[4rem] font-black text-white leading-[1.08] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
            >
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                Perfect Space.
              </span>
            </motion.h2>

            <motion.p
              className="text-white/45 text-[15px] font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
            >
              Access the most comprehensive real estate platform. Manage your properties, connect with buyers, and close deals faster.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {[
                ["✓", "Verified Listings"],
                ["🔒", "Secure Payments"],
                ["⭐", "Top-rated Hosts"],
              ].map(([icon, label], i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-white/55 text-xs font-bold"
                >
                  <span>{icon}</span> {label}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
