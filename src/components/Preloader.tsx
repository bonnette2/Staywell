"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
];

const cards = [
  { id: 1, x: "-20%", y: "-15%", rotate: -8, delay: 0.2 },
  { id: 2, x: "25%", y: "-10%", rotate: 6, delay: 0.5 },
  { id: 3, x: "-15%", y: "20%", rotate: 4, delay: 0.8 },
  { id: 4, x: "18%", y: "15%", rotate: -5, delay: 1.1 },
  { id: 5, x: "0%", y: "0%", rotate: 2, delay: 1.5 },
];

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if preloader was already shown in this session
    const hasShown = sessionStorage.getItem("preloader-shown");
    if (hasShown) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("preloader-shown", "true");
    }, 3800); // Increased from 2500ms to allow for the slower sequence

    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden pointer-events-auto"
        >
          {/* Main sequence */}
          <div className="relative w-full h-full flex items-center justify-center">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.5, x: "0%", y: "0%", rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: card.x, 
                  y: card.y, 
                  rotate: card.rotate,
                  transition: { 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 20, 
                    delay: card.delay,
                    duration: 1.2
                  } 
                }}
                exit={{ 
                  scale: 1.2, 
                  opacity: 0,
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                className="absolute w-[280px] md:w-[450px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <Image
                  src={images[index % images.length]}
                  alt="Preloading property"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/5" />
              </motion.div>
            ))}
          </div>
          
          {/* Overlay curtain */}
          <motion.div 
            initial={{ scaleY: 0 }}
            exit={{ 
              scaleY: 1,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{ originY: 1 }}
            className="absolute inset-0 bg-[#064e3b] z-[60] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
