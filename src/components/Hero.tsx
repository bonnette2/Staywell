"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mt-10"
      >
        <motion.h1 
          variants={fadeUp}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Premium spaces for a<br className="hidden md:block" /> better World
        </motion.h1>
        
        <motion.p 
          variants={fadeUp}
          className="text-lg md:text-xl text-zinc-200 mb-10 max-w-2xl mx-auto"
        >
          Enjoy comfort out of premium shared properties tailored to fit your needs, where you pay per just properly stay.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/properties"
            className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition-all shadow-lg flex items-center gap-2 group min-w-[180px] justify-center"
          >
            Get Started 
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
          <Link
            href="/properties"
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all min-w-[180px] justify-center flex"
          >
            Explore Stays
          </Link>
        </motion.div>

        {/* Softened Trust Badges */}
        <motion.div variants={fadeUp} className="pt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-white/90">
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <span>450+ Reviews</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block"></div>
          <span className="flex items-center gap-2 drop-shadow-sm">Trusted by 100+</span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block"></div>
          <span className="flex items-center gap-2 drop-shadow-sm">Easy Booking</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
