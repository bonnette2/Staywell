"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const testimonialsData = [
  {
    id: 1,
    content: "Amazing experience! The apartment was exactly as described and the host was incredibly welcoming. Will definitely book again.",
    name: "John Doe",
    location: "Germany",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    content: "The booking process was virtually effortless. We found the perfect luxury penthouse in minutes and the communication was phenomenal.",
    name: "Sarah Jenkins",
    location: "San Francisco, USA",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    content: "A truly premium service! The verified listings gave us total confidence, and the property exceeded all our layout expectations.",
    name: "Michael Chen",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    content: "The support team was incredibly responsive when I needed to adjust my dates. Absolute peace of mind throughout the entire process.",
    name: "Emily Clark",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 5,
    content: "We host multiple properties on StayWell, and the management tools are best in class. It brings high-quality guests every single week.",
    name: "Liam O'Connor",
    location: "Dublin, Ireland",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

const extremeStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

const popIn = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      
      <motion.div variants={extremeStagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        {/* Header section matching exact design */}
        <motion.div variants={popIn} className="mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-zinc-200 text-sm font-semibold mb-6 shadow-sm text-foreground bg-transparent">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            What our customers<br />are saying
          </h2>
        </motion.div>

        {/* Cover Flow Carousel Container */}
        <motion.div variants={popIn} className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mt-12 pb-12">
          {testimonialsData.map((test, index) => {
            let styleClass = "z-0 scale-75 opacity-0 -translate-x-1/2 pointer-events-none";
            
            if (index === currentIndex) {
              styleClass = "z-30 scale-100 opacity-100 -translate-x-1/2 cursor-default";
            } else if (index === (currentIndex - 1 + testimonialsData.length) % testimonialsData.length) {
              styleClass = "z-20 scale-[0.85] opacity-[0.85] -translate-x-[115%] md:-translate-x-[105%] cursor-pointer hover:opacity-100 shadow-xl";
            } else if (index === (currentIndex + 1) % testimonialsData.length) {
              styleClass = "z-20 scale-[0.85] opacity-[0.85] translate-x-[15%] md:translate-x-[5%] cursor-pointer hover:opacity-100 shadow-xl";
            }

            return (
              <div 
                key={test.id} 
                className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-[320px] md:w-[600px] h-[300px] md:h-[400px] rounded-2xl overflow-hidden transition-all duration-700 ease-in-out shadow-2xl ${styleClass}`}
                onClick={() => {
                  if (index === (currentIndex - 1 + testimonialsData.length) % testimonialsData.length) prev();
                  if (index === (currentIndex + 1) % testimonialsData.length) next();
                }}
              >
                <Image src={test.image} fill className="object-cover" alt="Property background" />
                {/* Darker bottom gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2b34]/95 via-[#1b2b34]/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
                  <p className="text-sm md:text-[15px] font-medium mb-6 leading-relaxed max-w-md relative font-sans text-white/90">
                    <span className="text-3xl font-serif absolute -top-4 -left-2 text-white/40 hidden md:block">"</span>
                    {test.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 relative rounded-full overflow-hidden border border-white/20">
                      <Image src={test.avatar} fill className="object-cover" alt={test.name} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{test.name}</h4>
                      <p className="text-xs text-white/70">{test.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows positioned exactly overlapping the edges of the central card */}
          <button 
            onClick={prev} 
            className="absolute top-1/2 -translate-y-1/2 left-1/2 ml-[-160px] md:ml-[-300px] -translate-x-1/2 z-40 bg-white/20 backdrop-blur-md rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/30 hover:scale-105"
          >
             <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={next} 
            className="absolute top-1/2 -translate-y-1/2 left-1/2 ml-[160px] md:ml-[300px] -translate-x-1/2 z-40 bg-white/20 backdrop-blur-md rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/30 hover:scale-105"
          >
             <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
