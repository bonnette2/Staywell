"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function PropertiesHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tight"
        >
          Properties
        </motion.h1>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative max-w-2xl mx-auto group"
        >
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-primary transition-colors">
            <Search size={22} />
          </div>
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-full h-16 pl-16 pr-8 bg-white/95 backdrop-blur-md border-none rounded-full text-lg font-medium focus:ring-4 focus:ring-primary/20 transition-all shadow-2xl placeholder:text-zinc-400"
          />
        </motion.div>
      </div>

      {/* Hero Fade-Out Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fafafc] to-transparent z-10" />
    </section>
  );
}
