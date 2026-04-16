"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, rotateZ: -2 },
  visible: { opacity: 1, scale: 1, rotateZ: 0, transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
};

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-lg">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-medium mb-6">
              Services
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              We offer a wide<br className="hidden md:block" /> range of services
            </motion.h2>
          </div>
          <div className="max-w-md">
            <motion.p variants={fadeUp} className="text-zinc-600 font-medium leading-relaxed">
              These services provide a consistent platform to leverage for smart rental decision-making, opening a wide door to a range of potential investments.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large Card */}
          <motion.div variants={scaleIn} whileHover={{ scale: 1.02 }} className="h-full">
            <Link href="#" className="relative group rounded-3xl overflow-hidden h-[400px] md:h-[600px] block w-full">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                alt="Properties Hosting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 flex items-center justify-between z-10">
                <h3 className="text-white text-2xl font-bold tracking-wide">Properties Hosting</h3>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#064e3b] group-hover:text-white transition-colors duration-300 shadow-xl">
                  <ArrowRight size={22} className="group-hover:-rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Stacked Cards */}
          <div className="flex flex-col gap-6 h-[400px] md:h-[600px]">
            {/* Top Stacked Card */}
            <motion.div variants={fadeUp} whileHover={{ scale: 1.02, y: -5 }} className="h-full">
              <Link href="#" className="relative group rounded-3xl overflow-hidden h-full block">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Property Booking"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 flex items-center justify-between z-10">
                  <h3 className="text-white text-2xl font-bold tracking-wide">Property Booking</h3>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#064e3b] group-hover:text-white transition-colors duration-300 shadow-xl">
                    <ArrowRight size={22} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Bottom Stacked Card */}
            <motion.div variants={fadeUp} whileHover={{ scale: 1.02, y: -5 }} className="h-full">
              <Link href="#" className="relative group rounded-3xl overflow-hidden h-full block">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
                  alt="Guest experience"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 flex items-center justify-between z-10">
                  <h3 className="text-white text-2xl font-bold tracking-wide">Guest experience</h3>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#064e3b] group-hover:text-white transition-colors duration-300 shadow-xl">
                    <ArrowRight size={22} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
