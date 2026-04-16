"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

import { validateEmail, validatePassword, sanitizeInput } from "@/utils/validation";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleInputChange = (field: "email" | "password", value: string) => {
    const sanitized = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    
    // Real-time validation
    if (field === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(sanitized) }));
    } else {
      setErrors(prev => ({ ...prev, password: validatePassword(sanitized) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury House"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-black/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full mx-auto flex flex-col lg:flex-row min-h-screen">

        {/* ===== LEFT COLUMN: HERO TEXT ===== */}
        <motion.div
          className="hidden lg:flex w-full lg:w-[52%] flex-col justify-end px-16 xl:px-24 pb-24 order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="space-y-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white/70 tracking-wider uppercase">Welcome Back</span>
            </motion.div>

            <motion.h2
              className="text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                Perfect Space.
              </span>
            </motion.h2>

            <motion.p
              className="text-white/50 text-base font-medium leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Access the most comprehensive real estate platform. Manage your properties, connect with buyers, and close deals faster.
            </motion.p>

            <motion.div
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {["Verified Listings", "Secure Payments", "24/7 Support"].map((tag, i) => (
                <div key={i} className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Vertical Divider */}
        <motion.div
          className="hidden lg:flex w-[1px] self-stretch my-16 items-center justify-center order-2"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        </motion.div>

        {/* ===== RIGHT COLUMN: FORM ===== */}
        <motion.div
          className="w-full lg:w-[48%] flex flex-col justify-center px-10 md:px-16 xl:px-24 py-14 min-h-screen order-3"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="max-w-md w-full mx-auto lg:mr-0">
            {/* Logo */}
            <motion.div
              className="flex flex-col items-center mb-12"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 backdrop-blur-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/>
                  <path strokeLinecap="round" d="M9 22V12h6v10"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white/90 tracking-wide">Staywell</span>
            </motion.div>

            {/* Heading */}
            <motion.div className="text-center mb-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="text-[2.4rem] font-black text-white tracking-tight leading-none mb-3">Welcome Back!</h1>
              <p className="text-white/45 text-sm font-medium">Enter your credentials to access staywell</p>
            </motion.div>

            {/* Form */}
            <motion.form onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-xs font-black text-white/70 uppercase tracking-[0.14em] mb-3">Email</label>
                <div className={`relative transition-transform duration-200 ${focused === "email" ? "scale-[1.015]" : ""}`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    errors.email ? "bg-red-500/10 shadow-[0_0_0_1.5px_rgba(239,68,68,0.5)]" : 
                    focused === "email" ? "bg-white/18 shadow-[0_0_0_1.5px_rgba(255,255,255,0.45)]" : "bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.20)]"
                  }`} />
                  <Mail size={17} className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${focused === "email" ? "text-white/70" : "text-white/35"}`} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    suppressHydrationWarning
                    className="relative z-10 w-full bg-transparent pl-11 pr-5 py-4 text-white text-[15px] font-medium outline-none placeholder:text-white/30"
                    value={formData.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold text-red-400 mt-2 ml-1">{errors.email}</motion.p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-xs font-black text-white/70 uppercase tracking-[0.14em] mb-3">Password</label>
                <div className={`relative transition-transform duration-200 ${focused === "password" ? "scale-[1.015]" : ""}`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    errors.password ? "bg-red-500/10 shadow-[0_0_0_1.5px_rgba(239,68,68,0.5)]" :
                    focused === "password" ? "bg-white/18 shadow-[0_0_0_1.5px_rgba(255,255,255,0.45)]" : "bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.20)]"
                  }`} />
                  <Lock size={17} className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${focused === "password" ? "text-white/70" : "text-white/35"}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    suppressHydrationWarning
                    className="relative z-10 w-full bg-transparent pl-11 pr-12 py-4 text-white text-[15px] font-medium outline-none placeholder:text-white/30"
                    value={formData.password}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors z-10"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold text-red-400 mt-2 ml-1">{errors.password}</motion.p>}
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-md border border-white/25 bg-white/10 flex items-center justify-center shrink-0" />
                  <span className="text-sm text-white/55 font-medium">Remember me</span>
                </div>
                <Link href="#" className="text-sm text-white/50 hover:text-white font-bold transition-colors underline underline-offset-4 decoration-white/20">
                  Forgot password
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-[#065f46]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#047857] to-[#065f46] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <span className="relative z-10">{isLoading ? "Logging in..." : "Login"}</span>
                  {!isLoading && <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                </button>
              </motion.div>
            </motion.form>

            <motion.p
              className="mt-8 text-center text-white/40 text-xs font-medium"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            >
              Don't have an account?{" "}
              <Link href="/signup" className="text-white font-bold hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/30">
                Get started
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
