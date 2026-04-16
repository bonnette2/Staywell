"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Mail, Phone, ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

import { validateName, validateEmail, sanitizeInput } from "@/utils/validation";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const sanitized = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    
    // Real-time validation
    let error: string | null = null;
    if (field === "name") error = validateName(sanitized);
    if (field === "email") error = validateEmail(sanitized);
    if (field === "message") error = sanitized.trim() ? null : "Message is required";
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = formData.message.trim() ? null : "Message is required";

    if (nameError || emailError || messageError) {
      setErrors({ name: nameError, email: emailError, message: messageError });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Preloader />
      <Header />
      <main className="bg-white min-h-screen">
        
        {/* Hero Section */}
        <section className="relative h-[75vh] flex items-center justify-center overflow-hidden pt-32">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
            >
              Get in Touch With <br /> our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Whether you’re building from scratch or ready to move in, we’re here to help you feel at home.
            </motion.p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10" />
        </section>

        {/* Contact Content Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column: Info */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex -space-x-3 mb-8">
                {[
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2076&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop"
                ].map((src, i) => (
                  <div key={i} className="relative w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-xl">
                    <Image src={src} alt="Team" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-black text-[#171717] tracking-tight">Respond in 2–3 hours</h2>
                <p className="text-zinc-600 text-lg font-medium leading-relaxed max-w-md">
                  Got questions or need travel advice? Our friendly team is here to help you plan your dream trip and make it unforgettable!
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    <Phone size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Call us</p>
                    <p className="font-bold text-zinc-800">+123 456 789 11</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    <Mail size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email us</p>
                    <p className="font-bold text-zinc-800">bonnieumurerwa@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 border border-zinc-100 shadow-2xl shadow-zinc-200/50"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-zinc-800 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-8 py-5 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 placeholder:text-zinc-400 ${
                      errors.name ? "border-red-500" : formData.name && !errors.name ? "border-green-500" : "border-transparent"
                    }`}
                    suppressHydrationWarning
                  />
                  {errors.name && <p className="text-xs font-bold text-red-500 ml-2">{errors.name}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-zinc-800 ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-8 py-5 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 placeholder:text-zinc-400 ${
                      errors.email ? "border-red-500" : formData.email && !errors.email ? "border-green-500" : "border-transparent"
                    }`}
                    suppressHydrationWarning
                  />
                  {errors.email && <p className="text-xs font-bold text-red-500 ml-2">{errors.email}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-zinc-800 ml-2">Message</label>
                  <textarea 
                    placeholder="Leave a message" 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className={`w-full px-8 py-5 bg-zinc-50 border transition-all rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 resize-none placeholder:text-zinc-400 ${
                      errors.message ? "border-red-500" : formData.message && !errors.message ? "border-green-500" : "border-transparent"
                    }`}
                    suppressHydrationWarning
                  />
                  {errors.message && <p className="text-xs font-bold text-red-500 ml-2">{errors.message}</p>}
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-12 py-5 bg-primary hover:bg-[#064e3b] text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 scale-[0.98] hover:scale-100 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Contact us"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <FAQ />

      </main>
      <Footer />
    </>
  );
}
