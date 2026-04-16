"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, User, Bath, Bed, Square, Heart, MessageSquare, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
  const { isAuthenticated } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div 
      variants={popUp}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-sm transition-all group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
    >
      <Link href={`/properties/${property.id}`} className="block group">
        <div className="relative h-64 w-full overflow-hidden bg-zinc-100 rounded-t-[2.5rem]">
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
              priority
            />
          </motion.div>
          
          <div className="absolute top-5 left-5 z-20 px-4 py-1.5 bg-white/90 backdrop-blur-md shadow-lg rounded-full text-[10px] font-black text-zinc-900 tracking-widest uppercase">
            {property.category}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`absolute top-5 right-5 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-xl ${
              isWishlisted ? "bg-white text-red-500" : "bg-white text-zinc-400 hover:text-red-500"
            }`}
          >
            <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.5} />
          </motion.button>
        </div>
      </Link>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-black text-[#171717] leading-tight mb-2 group-hover:text-primary transition-colors">{property.title}</h3>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-bold truncate">{property.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-zinc-50 px-3 py-1.5 rounded-full">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-zinc-800">{property.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-600">
              <Square size={14} />
            </div>
            <span className="text-[11px] font-bold text-zinc-600">{property.specs.area} Area</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-600">
              <Bed size={14} />
            </div>
            <span className="text-[11px] font-bold text-zinc-600">{property.specs.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-600">
              <Bath size={14} />
            </div>
            <span className="text-[11px] font-bold text-zinc-600">{property.specs.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-600">
              <User size={14} />
            </div>
            <span className="text-[11px] font-bold text-zinc-600">{property.specs.parking} Parking spot</span>
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
