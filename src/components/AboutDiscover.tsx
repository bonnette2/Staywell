"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const infoItems = [
  { id: 1, title: "Our vision", content: "To be the most trusted and globally recognized real estate partner for modern property solutions." },
  { id: 2, title: "Our mission", content: "We ensure safety by verifying all our hosts and providing a robust review system where past guests share their honest experiences." },
  { id: 3, title: "Our values", content: "Integrity, community trust, and absolute transparency in every transaction we manage." },
  { id: 4, title: "Our goals", content: "To constantly explore, adopt, and utilize new technology in making every step closer to finding your perfect property." },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 1 } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 1.2 } }
};

export default function AboutDiscover() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
      >
        
        {/* Left Side: Text + List */}
        <motion.div variants={slideIn} className="flex flex-col gap-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Discover Who we are
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-lg mb-10">
              We prioritize building from bottom to top and you know what that means: you are our first priority.
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-100 italic">
            {infoItems.map((item) => (
              <div key={item.id} className="border-b border-zinc-100 last:border-0 group">
                <button 
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-primary"
                >
                  <span className={`text-xl font-bold transition-colors ${openId === item.id ? 'text-primary' : 'text-zinc-700'}`}>
                    {item.title}
                  </span>
                  <div className={`p-1.5 rounded-full transition-colors ${openId === item.id ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                    {openId === item.id ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-zinc-500 leading-relaxed font-medium ml-4 border-l-2 border-primary/20 pl-4 italic not-italic">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Image + Text Card */}
        <motion.div variants={scaleUp} className="relative group">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury residence pool"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full">
              <p className="text-xl md:text-2xl font-bold leading-snug drop-shadow-lg mb-4">
                We provide a modern property platform built to drive growth and achieve superior results for homeowners and residents alike with safety and confidence.
              </p>
              <div className="w-16 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
