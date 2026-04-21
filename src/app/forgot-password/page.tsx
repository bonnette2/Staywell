"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { validateEmail, sanitizeInput } from "@/utils/validation";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6">
      {/* Background with robust CSS implementation */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Layered Cinematic Overlays - Neutral Dark */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 backdrop-blur-md transition-all group-hover:border-white/40 group-hover:bg-white/15">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/>
                <path strokeLinecap="round" d="M9 22V12h6v10"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white/90 tracking-wide">Staywell</span>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-10 md:p-12 shadow-2xl overflow-hidden relative group"
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <h1 className="text-3xl font-black text-white tracking-tight leading-tight mb-4 whitespace-nowrap">
                  Password Recovery
                </h1>
                <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">
                  Enter the email associated with your account and we'll send a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-white/70 uppercase tracking-[0.14em] mb-3 ml-1">Email Address</label>
                    <div className={`relative transition-transform duration-200 ${focused ? "scale-[1.015]" : ""}`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        error ? "bg-red-500/10 shadow-[0_0_0_1.5px_rgba(239,68,68,0.5)]" : 
                        focused ? "bg-white/15 shadow-[0_0_0_1.5px_rgba(255,255,255,0.4)]" : "bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                      }`} />
                      <Mail size={17} className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${focused ? "text-white/70" : "text-white/35"}`} />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="relative z-10 w-full bg-transparent pl-11 pr-5 py-4 text-white text-[15px] font-medium outline-none placeholder:text-white/20 transition-all"
                        value={email}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                      />
                    </div>
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="text-[10px] font-bold text-red-400 mt-2 ml-1"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-4 rounded-2xl font-bold text-white text-sm overflow-hidden group/btn flex items-center justify-center gap-2"
                  >
                    <div className="absolute inset-0 bg-[#002521]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#002521] to-[#001a17] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="relative z-10">{isLoading ? "Sending..." : "Send Reset Link"}</span>
                    {!isLoading && <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" /> }
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all group/back"
                  >
                    <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
                    Back to login
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-12 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-30" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="text-emerald-400" size={32} />
                </motion.div>
                
                <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Check Your Inbox</h2>
                <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">
                  If an account exists for <span className="text-white/80 font-bold">{email}</span>, you will receive a password reset link shortly.
                </p>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-white/10 border border-white/15 font-bold text-white text-sm hover:bg-white/20 transition-all gap-2"
                >
                  Return to Login
                  <ArrowRight size={16} />
                </Link>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-white/30 hover:text-white/60 text-xs font-bold transition-colors"
                >
                  Didn't get the email? Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support Link */}
        <motion.p
          className="mt-10 text-center text-white/25 text-[11px] font-bold uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Need help? <Link href="/contact" className="text-white/40 hover:text-white transition-colors underline decoration-white/10 underline-offset-4">Contact Support</Link>
        </motion.p>
      </div>
    </div>
  );
}
