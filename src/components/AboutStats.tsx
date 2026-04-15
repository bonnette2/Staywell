"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 150,
    suffix: "M+",
    label: "project Financed",
    description: "Over $150M in sales, our projects help individuals and businesses find their perfect fit.",
  },
  {
    value: 500,
    suffix: "+",
    label: "properties sold",
    description: "Over 500 properties sold successfully, ensuring everyone finds a place they call home.",
  },
  {
    value: 20,
    suffix: "+",
    label: "project has sold",
    description: "Over 20 major projects successfully completed and sold out across the region.",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const popUp = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 0.8 } as any }
};

export default function AboutStats() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={popUp} className="flex flex-col gap-4 group">
              <div className="flex flex-col">
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground transition-all duration-300 group-hover:text-primary">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-2 inline-flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-primary/40 rounded-full" />
                  {stat.label}
                </span>
              </div>
              <p className="text-zinc-500 leading-relaxed font-medium text-[15px] pt-4 border-t border-zinc-100">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
