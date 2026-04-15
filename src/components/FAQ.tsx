"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "How do I secure a property on StayWell?",
    answer: "You can easily secure a property by selecting your desired dates on the property page and proceeding through our verified booking and payment gateway."
  },
  {
    id: 2,
    question: "How is the community trust managed?",
    answer: "We ensure safety by verifying all our hosts and providing a robust review system where past guests share their honest experiences and ratings."
  },
  {
    id: 3,
    question: "What are the amenities included in my stay?",
    answer: "Amenities vary by property but typically include Wi-Fi, essential toiletries, fresh linens, and fully equipped kitchens. Check the specific property listing for details."
  },
  {
    id: 4,
    question: "Can I bring my pets with me?",
    answer: "Many of our properties are pet-friendly! Just look for the paw-print icon on the listing or use the 'Pet Friendly' filter when searching for accommodations."
  },
  {
    id: 5,
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation policies depending on the property. Please review the specific terms highlighted on the checkout page before confirming."
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const bouncySlide = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

const bouncySlideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row gap-16"
      >
        
        {/* Left Side: Header */}
        <motion.div variants={bouncySlide} className="w-full lg:w-1/3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-medium mb-6">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Any questions?<br/>We got you.
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            We are constantly exploring, adopting, and utilizing new technology in making every step closer to giving you the best experience possible in finding your perfect property.
          </p>
        </motion.div>

        {/* Right Side: Accordion */}
        <motion.div variants={bouncySlideRight} className="w-full lg:w-2/3">
          <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="py-6">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <h3 className={`text-lg font-bold pr-8 transition-colors ${openId === faq.id ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openId === faq.id ? "bg-primary text-white" : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"}`}>
                    {openId === faq.id ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === faq.id ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-zinc-600 leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
