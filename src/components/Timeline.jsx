import React, { useState } from "react";
import { motion } from "framer-motion";

const timelineData = {
  rescue: [
    { time: "06:00 AM", event: "Morning Feeding Round",      description: "All animals in our shelters receive their morning feed and health check." },
    { time: "08:00 AM", event: "Rescue Team Dispatch",       description: "Teams dispatched to respond to overnight emergency calls." },
    { time: "10:00 AM", event: "Vet Consultation Hours",     description: "In-house vet sees newly arrived animals for triage and treatment plans." },
    { time: "12:30 PM", event: "Midday Care & Enrichment",   description: "Volunteers provide enrichment activities and socialisation for shelter animals." },
    { time: "03:00 PM", event: "Adoption Visits",            description: "Prospective adopters visit and meet available animals under staff supervision." },
    { time: "06:00 PM", event: "Evening Feeding & Checks",   description: "Final feeding round and overnight health checks for all animals." },
  ],
  ngo: [
    { time: "Week 1",  event: "NGO Assessment",              description: "Our field team visits the NGO and assesses their situation, animals in care and funding gap." },
    { time: "Week 2",  event: "Support Package Designed",    description: "A tailored support package is drawn up including funds, supplies and mentorship." },
    { time: "Week 3",  event: "First Disbursement",          description: "Emergency funds and supplies are delivered to stabilise operations immediately." },
    { time: "Month 2", event: "Ongoing Monitoring",          description: "Our team checks in weekly to ensure the NGO is stabilising and animals are safe." },
    { time: "Month 3", event: "Capacity Building",           description: "We connect the NGO with training, networks and long-term funding opportunities." },
    { time: "Month 6", event: "Independence Review",         description: "We assess whether the NGO is now stable enough to operate independently." },
  ],
};

const MunTimeline = () => {
  const [activeTab, setActiveTab] = useState("rescue");

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label justify-center">How We Operate</span>
          <h2 className="text-4xl font-bold text-[#1A140C] mt-3">
            A Day in Our <span className="text-[#1E5C3A]">World</span>
          </h2>
        </div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[#D8EFDF]/40 border border-[#E8DDD0] rounded-full p-1">
            {[
              { key: "rescue", label: "🐾 Rescue Shelter" },
              { key: "ngo",    label: "🌿 NGO Support" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === key ? "bg-[#1E5C3A] text-white shadow-md" : "text-[#6B5642] hover:text-[#1E5C3A]"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#D4C5A9]" />
          {timelineData[activeTab].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
              className="relative flex items-start gap-6 mb-8 pl-16">
              {/* Dot */}
              <div className="absolute left-4 top-1 w-4 h-4 bg-[#1E5C3A] rounded-full border-2 border-white shadow-md -translate-x-1/2" />
              <div className="flex-1 bg-[#FAF7F2] rounded-xl p-5 border border-[#E8DDD0] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold bg-[#1E5C3A] text-white px-3 py-1 rounded-full">{item.time}</span>
                  <h3 className="font-bold text-[#1A140C]">{item.event}</h3>
                </div>
                <p className="text-[#6B5642] text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MunTimeline;
