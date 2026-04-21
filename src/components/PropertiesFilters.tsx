import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, DollarSign } from "lucide-react";

const categories = ["All", "Apartments", "Villas", "Condos", "Lodge", "Hotel Room", "Resort", "Private Property"];

const districts = [
  "All Locations", "Gasabo", "Kicukiro", "Nyarugenge", "Musanze", "Rubavu", "Huye", "Rwamagana", "Kayonza", "Nyagatare", "Bugesera"
];

const prices = [
  { label: "All Prices", value: "all" },
  { label: "Low (below $100k)", value: "low" },
  { label: "Medium ($100k - $500k)", value: "medium" },
  { label: "High ($500k+)", value: "high" }
];
export default function PropertiesFilters({ 
  activeCategory, 
  onCategoryChange,
  activeLocation,
  onLocationChange,
  activePrice,
  onPriceChange,
  isParkingOnly,
  onParkingToggle,
  isPoolOnly,
  onPoolToggle,
  isWifiOnly,
  onWifiToggle,
  isNewestFirst,
  onNewestToggle
}: { 
  activeCategory: string; 
  onCategoryChange: (cat: string) => void;
  activeLocation: string;
  onLocationChange: (loc: string) => void;
  activePrice: string;
  onPriceChange: (price: string) => void;
  isParkingOnly: boolean;
  onParkingToggle: () => void;
  isPoolOnly: boolean;
  onPoolToggle: () => void;
  isWifiOnly: boolean;
  onWifiToggle: () => void;
  isNewestFirst: boolean;
  onNewestToggle: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="py-12 bg-[#fafafc] sticky top-[72px] z-[50] transition-all border-b border-zinc-100/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6" ref={dropdownRef}>
        
        {/* Main Categories */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className="relative py-2 px-1 text-sm md:text-base font-bold transition-all lowercase italic first-letter:uppercase not-italic shrink-0"
            >
              <span className={`transition-colors whitespace-nowrap ${
                activeCategory === category ? 'text-primary' : 'text-zinc-500 hover:text-zinc-800'
              }`}>
                {category}
              </span>
              {activeCategory === category && (
                <motion.div 
                  layoutId="categoryUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full mt-1"
                />
              )}
            </button>
          ))}
        </div>

        {/* Secondary Filters Dropdowns */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="px-6 py-2.5 rounded-full bg-white border border-zinc-200 text-sm font-semibold text-zinc-600 hover:border-primary/40 hover:text-primary transition-all shadow-sm">
            For Rent
          </button>

          {/* Location Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border transition-all shadow-sm text-sm font-semibold ${
                openDropdown === "location" || activeLocation !== "All Locations" ? "border-primary text-primary" : "border-zinc-200 text-zinc-600 hover:border-primary/40"
              }`}
            >
              <MapPin size={16} />
              {activeLocation}
              <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === "location" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "location" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-100 z-50 p-2 no-scrollbar"
                >
                  {districts.map((district) => (
                    <button
                      key={district}
                      onClick={() => {
                        onLocationChange(district);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        activeLocation === district ? "bg-primary/10 text-primary" : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Range Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border transition-all shadow-sm text-sm font-semibold ${
                openDropdown === "price" || activePrice !== "all" ? "border-primary text-primary" : "border-zinc-200 text-zinc-600 hover:border-primary/40"
              }`}
            >
              <DollarSign size={16} />
              {prices.find(p => p.value === activePrice)?.label}
              <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === "price" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "price" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-zinc-100 z-50 p-2"
                >
                  {prices.map((price) => (
                    <button
                      key={price.value}
                      onClick={() => {
                        onPriceChange(price.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        activePrice === price.value ? "bg-primary/10 text-primary" : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {price.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={onParkingToggle}
            className={`px-6 py-2.5 rounded-full border transition-all shadow-sm text-sm font-semibold ${
              isParkingOnly ? "border-primary text-primary bg-primary/5" : "bg-white border-zinc-200 text-zinc-600 hover:border-primary/40 hover:text-primary"
            }`}
          >
            Parking
          </button>
          <button 
            onClick={onPoolToggle}
            className={`px-6 py-2.5 rounded-full border transition-all shadow-sm text-sm font-semibold ${
              isPoolOnly ? "border-primary text-primary bg-primary/5" : "bg-white border-zinc-200 text-zinc-600 hover:border-primary/40 hover:text-primary"
            }`}
          >
            pool
          </button>
          <button 
            onClick={onWifiToggle}
            className={`px-6 py-2.5 rounded-full border transition-all shadow-sm text-sm font-semibold ${
              isWifiOnly ? "border-primary text-primary bg-primary/5" : "bg-white border-zinc-200 text-zinc-600 hover:border-primary/40 hover:text-primary"
            }`}
          >
            Wi-fi
          </button>
          <button 
            onClick={onNewestToggle}
            className={`px-6 py-2.5 rounded-full border transition-all shadow-sm text-sm font-semibold ${
              isNewestFirst ? "border-primary text-primary bg-primary/5" : "bg-white border-zinc-200 text-zinc-600 hover:border-primary/40 hover:text-primary"
            }`}
          >
            Newest
          </button>
        </div>
      </div>
    </section>
  );
}
