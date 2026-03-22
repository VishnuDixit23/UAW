import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const impactStories = {
  rescue: {
    title: "Emergency Rescue Operations",
    subtitle: "Every Call Saves a Life",
    tagline: "CARE HOTLINE",
    description: "ON THE GROUND, EVERY DAY",
    infoText: "Our rescue teams respond to hundreds of emergency calls every month across Jaipur and surrounding districts.",
    videoSrc: "/video/rescue.mp4",
    thumbnailSrc: "/bg1.jpg",
    thumbnailAlt: "Animal rescue operation",
    emoji: "🚑",
  },
  shelter: {
    title: "Shelter & Rehabilitation",
    subtitle: "A Safe Haven for Every Animal",
    tagline: "HEALING WITH LOVE",
    description: "FROM INJURY TO ADOPTION",
    infoText: "Our rehabilitation shelters provide round-the-clock medical care, nutrition and enrichment for rescued animals.",
    videoSrc: "/video/shelter.mp4",
    thumbnailSrc: "/bg 2.jpg",
    thumbnailAlt: "Animal shelter care",
    emoji: "🏥",
  },
  ngo: {
    title: "Keeping NGOs Alive",
    subtitle: "Because They Cannot Stop",
    tagline: "NGO LIFELINE PROGRAMME",
    description: "SUSTAINING THE MISSION",
    infoText: "48 animal welfare NGOs depend on our support to stay operational. When they survive, thousands of animals do too.",
    videoSrc: "/video/ngo.mp4",
    thumbnailSrc: "/bg3.jpg",
    thumbnailAlt: "NGO support programme",
    emoji: "🌿",
  },
};

const AfterMovie = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState("rescue");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTabChange = (tab) => { setActiveTab(tab); setIsPlaying(false); };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const current = impactStories[activeTab];

  return (
    <section className="w-full bg-white py-20 px-6 overflow-hidden">
      <motion.div ref={containerRef} className="container mx-auto max-w-4xl"
        initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8 }}>

        <div className="text-center mb-12">
          <span className="section-label justify-center">See Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A140C] mt-3">
            Impact <span className="text-[#1E5C3A]">Stories</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-[#D8EFDF]/40 border border-[#E8DDD0] p-1 gap-1">
            {Object.entries(impactStories).map(([key, story]) => (
              <button key={key} onClick={() => handleTabChange(key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === key ? "bg-[#1E5C3A] text-white shadow-md" : "text-[#6B5642] hover:text-[#1E5C3A]"
                }`}>
                <span>{story.emoji}</span>
                <span className="hidden sm:inline capitalize">{key === "ngo" ? "NGO Support" : key === "rescue" ? "Rescue" : "Shelter"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A140C]">{current.title}</h3>
              <p className="text-lg text-[#1E5C3A] font-semibold mt-1">{current.subtitle}</p>
            </div>

            {/* Video/Image container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden mx-auto shadow-xl border border-[#E8DDD0]"
              whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
              <div className="relative aspect-video bg-[#D8EFDF]/40">
                {isPlaying ? (
                  <video src={current.videoSrc} className="w-full h-full object-cover" controls autoPlay
                    onEnded={() => setIsPlaying(false)} />
                ) : (
                  <>
                    <img src={current.thumbnailSrc} alt={current.thumbnailAlt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/70 via-transparent to-transparent" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 md:w-20 md:h-20 bg-[#1E5C3A] hover:bg-[#C8861A] rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300"
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying(true)}>
                        <Play className="w-7 h-7 text-white ml-1 fill-white" />
                      </motion.button>
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-bold text-sm tracking-widest">{current.tagline}</p>
                      <p className="text-white/80 text-xs mt-1">{current.description}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Info + CTA */}
            <div className="mt-6 text-center">
              <p className="text-[#6B5642] text-lg max-w-xl mx-auto">{current.infoText}</p>
              <Link to="/registration">
                <button className="mt-6 px-8 py-3 bg-[#1E5C3A] hover:bg-[#163322] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-white" /> Support This Work
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default AfterMovie;
