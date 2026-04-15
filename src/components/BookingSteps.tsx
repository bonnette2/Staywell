"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.4, duration: 1.0 } as any }
};

export default function BookingSteps() {
  const steps = [
    {
      step: "01",
      title: "Browse curated stays",
      description: "Explore our diverse range of premium properties and find the perfect match for your needs, budget, and preferences.",
    },
    {
      step: "02",
      title: "Book and secure securely",
      description: "Quickly and safely book your chosen property using our trusted payment gateways and secure booking system.",
    },
    {
      step: "03",
      title: "Enjoy a memorable stay",
      description: "Experience the ultimate comfort and convenience during your stay, knowing we are here to support you at every step.",
    },
  ];

  return (
    <section className="py-32 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Images Grid (Custom Collage) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 relative h-[700px] md:h-[900px] flex items-center justify-center"
        >
          <div className="relative w-full max-w-[500px] h-full">
            
            {/* Base Vertical Portrait Image */}
            <motion.div variants={scaleIn} className="absolute top-[8%] left-[5%] w-[80%] h-[75%] rounded-3xl overflow-hidden shadow-lg z-10">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                alt="Contemporary architecture"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Top Badge */}
            <motion.div variants={slideUp} className="absolute top-[5%] left-[55%] -translate-x-1/2 px-5 py-2.5 bg-white text-sm font-semibold rounded-full shadow-xl flex items-center gap-3 z-30">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full"><ArrowRight size={14} /></div>
              Verified Stays
            </motion.div>

            {/* Top Right Floating Image */}
            <motion.div variants={slideUp} className="absolute top-0 right-[-5%] w-[45%] h-[25%] rounded-2xl overflow-hidden shadow-xl z-20">
               <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                alt="Top right pool"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Middle Right Staggered Image */}
            <motion.div variants={scaleIn} className="absolute top-[35%] right-[-15%] w-[60%] h-[35%] rounded-2xl overflow-hidden shadow-2xl z-30 border-4 border-white/10">
               <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                alt="White modern structure"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Middle Badge - Placed statically outside the image so it spans boundaries */}
            <motion.div variants={slideUp} className="absolute top-[40%] right-[35%] px-5 py-2.5 bg-white text-sm font-semibold rounded-full shadow-xl flex items-center gap-3 z-40">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full"><ArrowRight size={14} /></div>
              Trusted Partners
            </motion.div>

            {/* Bottom Left Floating Image */}
            <motion.div variants={slideUp} className="absolute bottom-[10%] left-[-5%] w-[45%] h-[25%] rounded-2xl overflow-hidden shadow-xl z-40">
               <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069&auto=format&fit=crop"
                alt="White building"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Bottom Badge attached closely to Bottom Left image */}
            <motion.div variants={slideUp} className="absolute bottom-[8%] left-[20%] px-5 py-2.5 bg-white text-sm font-semibold rounded-full shadow-xl flex items-center gap-3 z-50">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full"><ArrowRight size={14} /></div>
              Premium Quality
            </motion.div>

          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2"
        >
          <motion.div variants={slideUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-medium mb-6 bg-white/50 backdrop-blur-sm">
            Our process
          </motion.div>
          <motion.h2 variants={slideUp} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Book your perfect stay in Just a few steps
          </motion.h2>
          <motion.p variants={slideUp} className="text-zinc-600 mb-10 text-lg leading-relaxed max-w-lg font-medium">
            We are constantly exploring, adopting, and utilizing new technology in making every step closer to giving you the best experience possible in finding your perfect property.
          </motion.p>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div 
                variants={slideUp}
                whileHover={{ scale: 1.02, x: 5 }}
                key={step.step} 
                className={`flex gap-6 p-6 rounded-3xl transition-colors duration-300 ${
                  index === 0 ? "bg-white border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" : "border border-zinc-200 hover:border-primary/30 bg-transparent cursor-pointer"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${
                    index === 0 ? "bg-[#171717] text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm font-medium">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

