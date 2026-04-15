"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const footerStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const slideUpExtreme = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

export default function Footer() {
  return (
    <footer className="relative bg-[#052e22] text-white pt-72 pb-12 mt-64">
      <motion.div 
        variants={footerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Background huge text layer - scoped so it hides overflow but doesn't clip CTA */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <h1 className="absolute bottom-[-10%] md:bottom-[-20%] left-0 text-[150px] md:text-[250px] lg:text-[350px] font-black text-center text-white/5 tracking-tighter w-full block">
            StayWell
          </h1>
        </div>

        {/* CTA Above the Footer */}
        <motion.div variants={slideUpExtreme} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-7xl rounded-[2.5rem] overflow-hidden shadow-2xl h-[350px] md:h-[450px] z-20">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
            alt="CTA background"
            fill
            className="object-cover"
          />
          {/* Subtle gradient for text legibility without a harsh blurred overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white drop-shadow-lg z-10 pt-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-md max-w-3xl leading-tight">Ready to find your dream home?</h2>
            <p className="text-white/90 mb-8 max-w-2xl font-medium drop-shadow-md text-lg">
              You are a part of a global user pool. StayWell brings thousands of properties everywhere.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#065f46] hover:bg-[#064e3b] text-white rounded-full font-bold transition-transform shadow-lg hover:scale-105"
            >
              Get started <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><ArrowRight size={14}/></div>
            </Link>
          </div>
        </motion.div>

        <motion.div variants={slideUpExtreme} className="max-w-7xl mx-auto px-6 relative z-10 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 text-left">
            
            {/* Column 1: Contact us */}
            <div className="flex flex-col items-start gap-4">
              <h4 className="font-bold text-lg mb-2">Contact us</h4>
              <ul className="space-y-3 text-sm text-[#a7b5b0]">
                <li>Kigali, Rwanda</li>
                <li>+250 790329702</li>
                <li>bonnieumurerwa@gmail.com</li>
              </ul>
            </div>

            {/* Column 2: Product */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Product</h4>
              <ul className="space-y-4">
                {[
                  { name: 'All properties', href: '/properties' },
                  { name: 'Properties for rent', href: '#' },
                  { name: 'Properties for buy', href: '#' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#a7b5b0] hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Legal</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms & Conditions', href: '#' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#a7b5b0] hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="flex flex-col items-start gap-6">
              <h4 className="font-bold text-lg mb-1">Subscribe To Our NewsLetter</h4>
              <p className="text-[#a7b5b0] text-sm leading-relaxed">
                signup for latest updates on our platform
              </p>
              <div className="w-full relative">
                <input 
                  type="email" 
                  placeholder="Enter Your Email" 
                  className="w-full bg-[#0a3f2f] border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-white placeholder:text-[#a7b5b0]/50"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#a7b5b0]">
            <p>StayWell © 2025. All Rights Reserved.</p>
            <p>Made with ❤️ for StayWell</p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
