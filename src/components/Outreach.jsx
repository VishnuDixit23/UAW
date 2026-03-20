import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { number: 7000,  suffix: "+", label: "Street Cows Fed",        color: "text-[#1E5C3A]",  icon: "🐄" },
  { number: 5000,  suffix: "+", label: "Dogs Cared For",         color: "text-[#C8861A]",  icon: "🐕" },
  { number: 1200,  suffix: "+", label: "Girls Received Hygiene Kits", color: "text-[#1E5C3A]", icon: "💜" },
  { number: 500,   suffix: "+", label: "Students Supported",     color: "text-[#C8861A]",  icon: "📚" },
  { number: 10,    suffix: "+", label: "Cities Reached",         color: "text-[#1E5C3A]",  icon: "🗺️" },
];

const OutreachSection = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStartCount(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAF7F2] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="section-label justify-center">Our Real Impact</span>
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#1A140C] mt-3 mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          By The <span className="text-[#1E5C3A]">Numbers</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {stats.map((stat, i) => (
            <motion.div key={i}
              className="p-6 bg-white shadow-sm rounded-2xl flex flex-col items-center border border-[#E8DDD0] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <span className="text-3xl mb-2">{stat.icon}</span>
              <h2 style={{ fontFamily:"var(--f-number)", fontSize:"clamp(1.8rem,4vw,2.4rem)", fontWeight:800, color:"#111827", lineHeight:1, letterSpacing:"-0.03em" }}>
                {startCount ? <CountUp start={0} end={stat.number} duration={2.5} separator="," /> : "0"}
                <span style={{ fontSize:"1.2rem", fontWeight:700, color:"#F3842C", marginLeft:2 }}>{stat.suffix}</span>
              </h2>
              <p className="text-[#6B5642] mt-2 font-medium text-xs text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutreachSection;
