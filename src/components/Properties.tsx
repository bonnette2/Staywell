"use client";

import Image from "next/image";
import { Bed, Bath, CarFront, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const propertiesData = [
  {
    id: 1,
    title: "Culmore Villa, California Costal",
    description: "This unique standalone property features high-end custom details through 3 levels with an intimate studio.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    beds: 3,
    baths: 2,
    garage: 1,
    status: "Available",
  },
  {
    id: 2,
    title: "Culmore Villa, California Costal",
    description: "This unique standalone property features high-end custom details through 3 levels with an intimate studio.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    beds: 3,
    baths: 2,
    garage: 1,
    status: "Available",
  },
  {
    id: 3,
    title: "Culmore Villa, California Costal",
    description: "This unique standalone property features high-end custom details through 3 levels with an intimate studio.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    beds: 3,
    baths: 2,
    garage: 1,
    status: "Available",
  },
  {
    id: 4,
    title: "Culmore Villa, California Costal",
    description: "This unique standalone property features high-end custom details through 3 levels with an intimate studio.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069&auto=format&fit=crop",
    beds: 3,
    baths: 2,
    garage: 1,
    status: "Available",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.3, duration: 0.9 } as any }
};

export default function Properties() {
  return (
    <section className="bg-white py-24 overflow-hidden">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div variants={slideUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white shadow-sm text-sm font-medium mb-6">
              Properties
            </motion.div>
            <motion.h2 variants={slideUp} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-md leading-tight">
              Discover properties tailored for you
            </motion.h2>
          </div>
          <motion.div variants={slideUp}>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#002521] hover:bg-[#001a17] shadow-[0_8px_30px_rgb(0,37,33,0.3)] hover:shadow-[0_8px_30px_rgb(0,37,33,0.5)] hover:-translate-y-0.5 text-white rounded-full font-bold transition-all sm:w-auto w-full group"
            >
              View All properties
            </Link>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {propertiesData.map((property) => (
            <motion.div 
              variants={slideUp}
              whileHover={{ y: -8 }}
              key={property.id} 
              className="bg-white rounded-3xl p-6 flex flex-col md:flex-row gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-zinc-100 cursor-pointer"
            >
              
              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-zinc-600 font-bold">0{property.id}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{property.title}</h3>
                <p className="text-zinc-500 font-medium text-sm mb-6 leading-relaxed">
                  {property.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm font-medium text-zinc-700">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-50 rounded-md border border-zinc-100 text-zinc-500"><Bed size={16} /></div>
                    <span>{property.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-50 rounded-md border border-zinc-100 text-zinc-500"><Bath size={16} /></div>
                    <span>{property.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-50 rounded-md border border-zinc-100 text-zinc-500"><CarFront size={16} /></div>
                    <span>{property.garage} Garage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-50 rounded-md border border-zinc-100 text-zinc-500"><CalendarCheck size={16} /></div>
                    <span>{property.status}</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full md:w-[220px] aspect-square md:aspect-auto rounded-2xl overflow-hidden shrink-0 shadow-inner group">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
