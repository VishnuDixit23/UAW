import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PartnerCard = ({ name, tier, emoji }) => {
  const tierStyles = {
    gold:    { card: "border-[#C8861A] shadow-xl", badge: "bg-[#C8861A]", name: "text-[#A0722A]" },
    silver:  { card: "border-[#2D6A4F] shadow-lg",  badge: "bg-[#1E5C3A]",  name: "text-[#1E5C3A]"  },
    default: { card: "border-[#E0D4C0]",             badge: "bg-[#6B5C45]",  name: "text-[#6B5642]"  },
  };
  const s = tierStyles[tier] || tierStyles.default;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}
      className={`relative bg-white border-2 rounded-2xl overflow-hidden ${s.card} h-48 flex flex-col items-center justify-center p-6`}>
      {tier && (
        <span className={`absolute top-3 right-3 ${s.badge} text-white text-xs font-bold py-1 px-3 rounded-full uppercase`}>
          {tier}
        </span>
      )}
      <div className="text-5xl mb-3">{emoji || "🐾"}</div>
      <h3 className={`font-bold text-center ${s.name} text-sm`}>{name}</h3>
    </motion.div>
  );
};

const PartnerShowcase = () => {
  const partners = [
    { name: "GreenPaw Foundation",  tier: "gold",   emoji: "🐾" },
    { name: "Wildlife Trust India", tier: "gold",   emoji: "🦁" },
    { name: "Petcare India",        tier: "silver", emoji: "🐕" },
    { name: "Blue Cross Society",   tier: "silver", emoji: "💙" },
  ];

  return (
    <div className="w-full py-16 px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label justify-center">Trusted By</span>
          <h2 className="text-4xl font-bold text-[#1A140C] mt-3">
            Our <span className="text-[#1E5C3A]">Partners</span>
          </h2>
          <p className="text-[#6B5642] mt-4 max-w-lg mx-auto">
            We are grateful to the organisations that partner with us to amplify our impact.
          </p>
        </div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          {partners.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
              <PartnerCard {...p} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/sponsers">
            <button className="px-8 py-3 bg-[#1E5C3A] hover:bg-[#163322] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
              Become a Partner →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerShowcase;
