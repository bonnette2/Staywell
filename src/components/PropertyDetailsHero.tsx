"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Grid } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
];

export default function PropertyDetailsHero({ title }: { title: string }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="pt-32 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title and Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-[#171717] max-w-3xl"
          >
            {title}
          </motion.h1>
          <button 
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-200 text-sm font-bold hover:bg-zinc-50 transition-all shadow-sm shrink-0"
          >
            <Grid size={16} /> Show all photos
          </button>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden">
          {/* Main Huge Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-8 relative group cursor-pointer overflow-hidden"
          >
            <Image 
              src={images[0]} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </motion.div>

          {/* Side Small Images */}
          <div className="md:col-span-4 grid grid-cols-2 grid-rows-2 gap-4">
            {images.slice(1, 4).map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
              >
                <Image src={img} alt={`View ${i}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </motion.div>
            ))}
            {/* Last one with overlay */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setShowAll(true)}
            >
              <Image src={images[4]} alt="More" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-colors group-hover:bg-black/50">
                <span className="text-2xl font-black">+14</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">More Photos</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Mockup */}
      <AnimatePresence>
        {showAll && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto p-6 md:p-12"
          >
            <button 
              onClick={() => setShowAll(false)}
              className="fixed top-8 right-8 z-50 p-3 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-all"
            >
              <X size={24} />
            </button>
            <div className="max-w-4xl mx-auto space-y-8 pb-32">
              <h2 className="text-3xl font-black text-[#171717] mb-12">All Property Photos</h2>
              {images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image src={img} alt={`Gallery High Res ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
