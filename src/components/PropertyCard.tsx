"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, User, Bath, Bed, Square } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  image: string;
  price: string;
  location: string;
  rating: number;
  specs: {
    area: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
  category: string;
}

const popUp = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 1.2 } as any }
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div 
      variants={popUp}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-sm transition-all group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {/* Zoom In/Out Animation on Hover */}
          <motion.div 
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image 
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
          </motion.div>
          
          <div className="absolute top-4 right-4 z-10 px-4 py-1.5 bg-white/90 backdrop-blur-sm shadow-xl rounded-full text-[12px] font-bold text-zinc-800 tracking-wide uppercase">
            {property.category}
          </div>
        </div>
      </Link>

      <div className="p-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <Link href={`/properties/${property.id}`} className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center leading-tight">
            {property.title}
          </Link>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-500 mb-6 text-sm font-medium">
          <MapPin size={16} className="text-primary" />
          {property.location}
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-zinc-50 pt-6 mb-8">
          <div className="flex items-center gap-2.5 text-zinc-600">
            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500"><Square size={16} strokeWidth={1.5} /></div>
            <span className="text-xs font-bold whitespace-nowrap">{property.specs.area} Area</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-600">
            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500"><Bed size={16} strokeWidth={1.5} /></div>
            <span className="text-xs font-bold whitespace-nowrap">{property.specs.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-600">
            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500"><Bath size={16} strokeWidth={1.5} /></div>
            <span className="text-xs font-bold whitespace-nowrap">{property.specs.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-600">
            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500"><User size={16} strokeWidth={1.5} /></div>
            <span className="text-xs font-bold whitespace-nowrap">{property.specs.parking} Parking spot</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1 border-t border-zinc-50">
          <div className="flex flex-col">
            <span className="text-primary text-lg font-black">{property.price}</span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Per night</span>
          </div>
          <Link href={`/properties/${property.id}`} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white hover:bg-[#064e3b] transition-all duration-300 rounded-full text-xs font-bold shadow-sm whitespace-nowrap scale-95 hover:scale-100">
            Read more <motion.span whileHover={{ x: 3 }}>{">"}</motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
