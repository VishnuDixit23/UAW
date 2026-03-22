import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Images, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Programme Data
const PROGRAMME_DATA = {
  "cow-feeding": {
    title: "Cow Feeding",
    tagline: "Nourished 7,000+ Street Cows",
    icon: "🐄",
    heroImg: "/programmes/feeding.jpeg",
    description: "Our largest ongoing initiative, we have fed more than 7,000 street cows across the city. Our dedicated volunteers prepare and distribute nutritious fodder to these gentle animals who often go hungry on busy roads. Caring for these sacred beings is not just an act of kindness — it's a responsibility we all share.",
    points: [
      "Daily feeding drives across multiple city zones",
      "Offering fresh fodder and jaggery to street cows",
      "Ensuring clean drinking water availability",
      "Community awareness about cow welfare"
    ]
  },
  "dog-care": {
    title: "Dog Care & Radium Collars",
    tagline: "Protecting 5,000+ Street Dogs",
    icon: "🐕",
    heroImg: "/programmes/dog-care-new.jpg",
    description: "Street dogs face grave danger from speeding vehicles, especially at night. Our Radium Collar Belt initiative has provided stray dogs with reflective, glowing collars that make them visible to drivers after dark. This simple yet life-saving measure has significantly reduced nighttime road accidents involving animals.",
    points: [
      "Reflective radium collar belts for nighttime visibility",
      "Daily food distribution for street dogs",
      "Providing nutritious meals to keep them healthy",
      "Ensuring they have access to clean water",
    ]
  },
  "girls-hygiene": {
    title: "Girls' Hygiene Drive",
    tagline: "Empowering 1,200+ Girls in Slum Areas",
    icon: "💜",
    heroImg: "/programmes/hygiene-cover.jpg",
    description: "Menstrual hygiene remains a taboo in many underprivileged communities, forcing girls to use unsafe alternatives or miss school. Our team has distributed hygiene pads to more than 1,200 girls in slum areas, along with awareness workshops on menstrual health — because every girl deserves to feel confident and cared for.",
    points: [
      "Sanitary pad distribution in slum communities",
      "Menstrual hygiene awareness workshops",
      "Breaking stigma through open dialogue",
      "Partnering with local health volunteers",
    ]
  },
  "education": {
    title: "Education Support",
    tagline: "Equipping 500+ Students for Success",
    icon: "📚",
    heroImg: "/programmes/education.jpeg",
    description: "Education is the most powerful tool for change. We've provided books, notebooks and geometry box sets to more than 500 students from underprivileged backgrounds. By removing financial barriers to basic school supplies, we ensure that no child's dream of learning is held back by lack of resources.",
    points: [
      "Notebooks, and stationery kits",
      "Geometry and compass box sets for every student",
      "School bag distribution drives",
      "Mentorship and tutoring support programs"
    ]
  },
  "plantation": {
    title: "Environment & Plantation",
    tagline: "Planting for a Greener Tomorrow",
    icon: "🌳",
    heroImg: "/programmes/environment-new.jpg",
    description: "Climate change and deforestation are pressing issues. Our plantation drives focus on planting native, shade-giving and fruit-bearing trees across urban areas. We don't just plant them, we ensure they are watered and protected until they are self-sustaining.",
    points: [
      "Native tree sapling plantation drives",
      "Regular watering and maintenance by volunteers",
      "Community awareness on environmental conservation",
    ]
  },
  "youth-kickstart": {
    title: "Youth Kickstart Programme",
    tagline: "Sponsoring Young Football Talent",
    icon: "⚽",
    heroImg: "/programmes/youth.jpeg",
    description: "Running for 4–5 years, our Youth Kickstart Programme gives underprivileged young talent a real shot at a professional football career. We provide full sponsorship covering accommodation, professional coaching, nutrition, fitness training, sports equipment, and much more — because financial barriers should never block genuine talent.",
    points: [
      "Full accommodation and living support",
      "Professional football coaching and training",
      "Nutrition plans and fitness programs",
      "Sports equipment and gear provided"
    ]
  },
  "bird-feeding": {
    title: "Bird Feeding",
    tagline: "Caring for Our Feathered Friends",
    icon: "🐦",
    heroImg: "/gallery/bird-feeding/bir1.jpeg",
    description: "Birds are an essential part of our ecosystem, yet urbanisation has left many without adequate food and water. Our Bird Feeding initiative provides daily nourishment to birds across the city — placing grain and fresh water at key locations so no bird goes hungry or thirsty.",
    points: [
      "Daily grain and seed distribution for birds",
      "Clean water stations set up across the city",
      "Community awareness about bird conservation",
      "Supporting injured and orphaned birds"
    ]
  }
};

export default function ProgrammeDetail() {
  const { id } = useParams();
  const index = Object.keys(PROGRAMME_DATA).indexOf(id);
  if (index === -1) return <Navigate to="/" />;

  const prog = PROGRAMME_DATA[id];

  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <div className="page-hero" style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{ fontSize: "4rem", display: "inline-block", marginBottom: 16 }}>{prog.icon}</span>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "white", marginBottom: 16 }}>
            {prog.title}
          </h1>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1.2rem", color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto" }}>
            {prog.tagline}
          </p>
        </div>
      </div>

      <div className="section-container" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(40px, 8vw, 64px)", alignItems: "center" }} className="programme-grid">
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "var(--sh-lg)" }}>
              <img src={prog.heroImg} alt={prog.title} style={{ width: "100%", height: "auto", minHeight: "280px", maxHeight: "450px", objectFit: "cover", display: "block" }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: "2rem", fontWeight: 700, color: "var(--c-bark)", marginBottom: 20 }}>
              Programme Overview
            </h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "1.05rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 32 }}>
              {prog.description}
            </p>

            <h3 style={{ fontFamily: "var(--f-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--c-bark)", marginBottom: 16 }}>
              Key Activities
            </h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
              {prog.points.map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)" }}>
                  <CheckCircle style={{ width: 20, height: 20, color: "#F3842C", flexShrink: 0, marginTop: 2 }} />
                  {pt}
                </li>
              ))}
            </ul>

            <Link to={`/gallery?category=${id}`} style={{ textDecoration: "none" }}>
              <motion.span 
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #F3842C, #E67E22)", color: "white", padding: "14px 28px", borderRadius: 12, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", boxShadow: "0 4px 16px rgba(243,132,44,0.3)" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Images style={{ width: 18, height: 18 }} /> View Programme Gallery
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media (max-width: 800px) {
          .programme-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
