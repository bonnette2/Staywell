"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";

const specs = [
  { label: "Size", value: "2500 Area" },
  { label: "Floor", value: "Ground" },
  { label: "Bathrooms", value: "12" },
  { label: "Location", value: "Kigali - Gacuriro - Jabana" },
  { label: "Bedrooms", value: "3" },
  { label: "parking", value: "220 sq ft" },
  { label: "other rooms", value: "5" },
  { label: "Construction", value: "Jan 12, 2025" },
];

const amenities = [
  "Kitchen", "Wifi", "Pool", "TV", "Washer", "Security cameras", "Shared sauna", "Smoke Alarm"
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PropertySpecs() {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      
      {/* Description */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-6">Description</h2>
        <p className="text-zinc-600 leading-relaxed text-lg font-medium">
          South Side Garden House is a charming residence that seamlessly blends indoor comfort with outdoor tranquility. Situated on the south side, this home is bathed in natural light throughout the day, creating a warm and inviting atmosphere. Surrounded by a beautifully landscaped garden, it offers a serene escape with lush greenery and colorful blooms. The South Side Garden House is designed for those who appreciate the beauty of nature while enjoying modern comforts, making it an ideal retreat for relaxation and family gatherings.
        </p>
      </motion.section>

      {/* Property Details Grid */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-8">Property details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 md:last:border-b">
              <span className="text-zinc-500 font-bold uppercase text-xs tracking-wider">{spec.label}</span>
              <span className="text-foreground font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Amenities Section */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-8">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 border-b border-zinc-50 pb-4">
              <div className="text-primary"><CheckCircle2 size={20} strokeWidth={2.5} /></div>
              <span className="text-zinc-600 font-bold">{amenity}</span>
            </div>
          ))}
        </div>
        <button className="mt-8 px-8 py-3 rounded-full border border-zinc-200 text-sm font-bold text-zinc-700 hover:border-primary/40 hover:text-primary transition-all flex items-center gap-2 group">
          show all amenities <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </motion.section>

      {/* Location Section */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-8">Location</h2>
        <p className="text-zinc-500 font-bold mb-8 italic">Gasabo, Kigali, Rwanda - KG 203 St, Gacuriro</p>
        <button 
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=Gacuriro+Kigali+Rwanda+Residential`, '_blank')}
          className="px-10 py-4 bg-primary hover:bg-[#064e3b] text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          show on map
        </button>
      </motion.section>

    </div>
  );
}
