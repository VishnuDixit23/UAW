import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  Heart, Leaf, Utensils, ArrowRight,
  ChevronRight, Star, Calendar, Target, Users,
} from "lucide-react";
import { FaPaw } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const HERO_IMAGES = [
  { src: "/hero/hero1.jpeg", caption: "Feeding stray dogs every night" },
  { src: "/hero/hero2.jpeg", caption: "Every animal deserves care" },
  { src: "/hero/hero3.jpeg", caption: "On the ground, every single day" },
  { src: "/hero/hero4.jpeg", caption: "Cow feeding drives across Jaipur" },
];

const initiatives = [
  {
    id: "cow-feeding",
    title: "Cow Feeding Program",
    tagline: "Nourishing 7,000+ Street Cows",
    description: "Our largest ongoing initiative we have fed more than 7,000 street cows across the city . Our dedicated volunteers prepare and distribute nutritious fodder to these gentle animals who often go hungry on busy roads. Caring for these sacred beings is not just an act of kindness — it's a responsibility we all share.",
    highlights: [
      "Daily feeding drives across multiple city zones",
      "Offering fresh fodder and jaggery to street cows",
      "Ensuring clean drinking water availability",
      "Community awareness about cow welfare",
    ],
    image: "/initiatives/cow-feeding-new.jpeg",
    stat: "7,000+", statLabel: "Cows Fed",
    accent: "#C8801A", accentLight: "#FFF8ED",
  },
  {
    id: "dog-safety",
    title: "Dog Safety & Radium Collars",
    tagline: "Protecting Street Dogs",
    description: "Street dogs face grave danger from speeding vehicles, especially at night. Our Radium Collar Belt initiative has provided stray dogs with reflective, glowing collars that make them visible to drivers after dark. This simple yet life-saving measure has significantly reduced nighttime road accidents involving animals.",
    highlights: [
      "Reflective radium collar belts for nighttime visibility",
      "Daily food distribution for street dogs",
      "Providing nutritious meals to keep them healthy",
      "Ensuring they have access to clean water",
    ],
    image: "/initiatives/dog-safety-new.jpeg",
    stat: "5,000+", statLabel: "Dogs Protected",
    accent: "#1B5E3B", accentLight: "#EDFAF3",
  },
  {
    id: "girls-hygiene",
    title: "Girls' Hygiene Pad Distribution",
    tagline: "Empowering 1,200+ Girls in Slum Areas",
    description: "Menstrual hygiene remains a taboo in many underprivileged communities. This stigma forces young girls and women to use unsafe alternatives or miss school. We have distributed sanitary hygiene pads to more than 1,200 girls in slum areas, along with awareness and education on menstrual health. Every girl deserves to feel comfortable, confident, and cared for during her cycle.",
    highlights: [
      "Sanitary pad distribution in slum communities",
      "Menstrual hygiene awareness workshops",
      "Breaking stigma through open dialogues",
      "Partnering with local health volunteers",
    ],
    image: "/programmes/hygiene-cover.jpg",
    stat: "1,200+", statLabel: "Girls Supported",
    accent: "#9D174D", accentLight: "#FFF0F5",
  },
  {
    id: "student-education",
    title: "Student Education Support",
    tagline: "Equipping 500+ Students for Success",
    description: "Education is the most powerful tool for change. We've provided books, notebooks and geometry box sets to more than 500 students from underprivileged backgrounds. By removing financial barriers to basic school supplies, we ensure that no child's dream of learning is held back by lack of resources.",
    highlights: [
      "Textbooks, notebooks, and stationery kits",
      "Geometry and compass box sets for every student",
      "School bag distribution drives",
      "Mentorship and tutoring support programs",
    ],
    image: "/programmes/education.jpeg",
    stat: "500+", statLabel: "Students Helped",
    accent: "#1E40AF", accentLight: "#EFF6FF",
  },
  {
    id: "youth-kickstart",
    title: "Youth Kickstart Programme",
    tagline: "Sponsoring Young Football Talent",
    description: "Running for 4–5 years, our Youth Kickstart Programme gives underprivileged young talent a real shot at a professional football career. We provide full sponsorship covering accommodation, professional coaching, nutrition, fitness training, sports equipment, and much more — because financial barriers should never block genuine talent. Proudly sponsoring Jaipur City Football Club.",
    highlights: [
      "Full accommodation and living support",
      "Professional football coaching and training",
      "Nutrition plans and fitness programs",
      "Sports equipment and gear provided",
      "Tournament registrations — Jaipur City FC sponsors",
    ],
    image: "/programmes/youth.jpeg",
    stat: "50+", statLabel: "Youth Sponsored",
    accent: "#5B21B6", accentLight: "#F5F0FF",
  },
];

const upcoming = [
  {
    title: "Human Feeding Drive",
    description: "Our upcoming Human Feeding campaign will provide cooked meals to the homeless and underprivileged. Volunteers will set up feeding stations across key locations, ensuring no one in our community goes to bed hungry.",
    icon: Utensils, accent: "#C8801A", accentLight: "#FFF8ED",
    target: "Feed 2,000+ people in the first month",
  },

];

const fade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

/* ─────────────────────────────────────────
   HERO SLIDER
───────────────────────────────────────── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {HERO_IMAGES.map((img, i) => (
        <AnimatePresence key={i}>
          {current === i && (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img
                src={img.src}
                alt={img.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,11,11,0.72) 0%, rgba(11,11,11,0.65) 55%, rgba(11,11,11,0.84) 100%)", zIndex: 2 }} />
      {/* Dots */}
      <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 99, background: i === current ? "#E8A84A" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   INITIATIVE ROW (side-by-side)
───────────────────────────────────────── */
function InitiativeRow({ item, idx }) {
  const reversed = idx % 2 !== 0;
  return (
    <motion.div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        marginBottom: 88,
      }}
      className="initiative-row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Image — conditionally flipped */}
      <div style={{ order: reversed ? 2 : 1, position: "relative" }}>
        <div style={{ position: "absolute", inset: -12, background: item.accent, borderRadius: 28, opacity: 0.10, filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 56px rgba(0,0,0,0.18)" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: "center 25%", display: "block", transition: "transform 0.7s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.48), transparent 55%)" }} />
          {/* Stat badge */}
          <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: item.accent, padding: "10px 12px", borderRadius: 13, boxShadow: "0 4px 16px rgba(0,0,0,0.28)" }}>
              <Star style={{ width: 19, height: 19, color: "white" }} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{item.stat}</p>
              <p style={{ fontFamily: "var(--f-body)", fontSize: "0.76rem", color: "rgba(255,255,255,0.82)", fontWeight: 500, marginTop: 1 }}>{item.statLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div style={{ order: reversed ? 1 : 2, display: "flex", flexDirection: "column", gap: 16 }}>
        <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 99, fontFamily: "var(--f-body)", fontSize: "0.78rem", fontWeight: 700, color: "white", background: item.accent, letterSpacing: "0.04em", width: "fit-content" }}>
          {item.tagline}
        </span>

        <h3 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.6rem,3vw,2.1rem)", fontWeight: 700, color: "var(--c-bark)", lineHeight: 1.2, margin: 0 }}>
          {item.title}
        </h3>

        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.98rem", color: "var(--c-bark-muted)", lineHeight: 1.85, margin: 0 }}>
          {item.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          {item.highlights.map((h, i) => (
            <motion.div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }} viewport={{ once: true }}>
              <div style={{ background: item.accent, padding: "3px 3px", borderRadius: "50%", marginTop: 4, flexShrink: 0 }}>
                <ChevronRight style={{ width: 12, height: 12, color: "white" }} />
              </div>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.9rem", color: "var(--c-bark-mid)", lineHeight: 1.6 }}>{h}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function OurWork() {
  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh" }}>
      <Navbar />

      {/* ══════ HERO WITH SLIDESHOW ══════ */}
      <div style={{ position: "relative", minHeight: "86vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HeroSlider />

        {/* Floating paws */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}>
          {[{ l: "8%", d: 0, s: 18 }, { l: "25%", d: 3, s: 14 }, { l: "50%", d: 5, s: 22 }, { l: "72%", d: 2, s: 16 }, { l: "88%", d: 7, s: 20 }].map((p, i) => (
            <motion.div key={i}
              style={{ position: "absolute", left: p.l, color: "rgba(255,255,255,0.06)" }}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 0.14, 0.14, 0], rotate: [-15, 10, -10, 15] }}
              transition={{ duration: 16, repeat: Infinity, delay: p.d, ease: "linear" }}>
              <FaPaw size={p.s} />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "136px 24px 100px", maxWidth: 860, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 22 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 20px", background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 99, fontFamily: "var(--f-body)", fontSize: "0.8rem", fontWeight: 600, color: "rgba(200,255,220,0.9)", letterSpacing: "0.04em" }}>
              <Heart style={{ width: 13, height: 13, color: "#F9A8D4" }} /> Compassion in Action
            </span>
          </motion.div>

          <motion.h1
            style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.8rem,8vw,5.5rem)", fontWeight: 700, color: "white", lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Our Work &{" "}
            <span style={{ background: "linear-gradient(135deg, #E8A84A, #C8801A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Impact
            </span>
          </motion.h1>

          <motion.p
            style={{ fontFamily: "var(--f-body)", fontSize: "1.08rem", fontWeight: 300, color: "rgba(210,245,225,0.76)", maxWidth: 540, margin: "0 auto 34px", lineHeight: 1.78 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            From feeding street cows to empowering young girls — every initiative is a step toward a more compassionate world.
          </motion.p>

          <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Link to="/registration">
              <motion.span className="btn btn-amber btn-lg" style={{ display: "inline-flex" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Heart style={{ width: 17, height: 17, fill: "white" }} /> Support Us <ArrowRight style={{ width: 17, height: 17 }} />
              </motion.span>
            </Link>
            <a href="#initiatives">
              <motion.span className="btn btn-ghost btn-lg" style={{ display: "inline-flex" }} whileHover={{ scale: 1.03 }}>
                See Our Work
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* Wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 Q360,60 720,30 T1440,30 V60 H0 Z" fill="#FAFAFA" />
          </svg>
        </div>
      </div>

      {/* ══════ INITIATIVES (alternating side-by-side) ══════ */}
      <section id="initiatives" style={{ padding: "80px 0 24px", background: "white" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "#FFF4EB", borderRadius: 99, fontFamily: "var(--f-body)", fontSize: "0.78rem", fontWeight: 700, color: "#F3842C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              <Heart style={{ width: 13, height: 13 }} /> What We Do
            </span>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "var(--c-bark)", marginBottom: 14 }}>
              Our <span className="text-green-grad">Initiatives</span>
            </h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              Each initiative is driven by compassion and powered by our incredible community of volunteers and supporters.
            </p>
          </div>

          {initiatives.map((item, idx) => (
            <InitiativeRow key={item.id} item={item} idx={idx} />
          ))}
        </div>

        <style>{`
          .initiative-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
            margin-bottom: 88px;
          }
          @media (max-width: 860px) {
            .initiative-row {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
              margin-bottom: 56px !important;
            }
            .initiative-row > div[style*="order: 2"],
            .initiative-row > div[style*="order: 1"] {
              order: unset !important;
            }
          }
        `}</style>
      </section>

      {/* ══════ UPCOMING CAMPAIGNS ══════ */}
      <section style={{ padding: "88px 0", background: "linear-gradient(160deg, #FFF4EB 0%, #FAFAFA 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 24, right: 24, opacity: 0.04, pointerEvents: "none" }}>
          <FaPaw size={180} color="#F3842C" style={{ transform: "rotate(12deg)" }} />
        </div>

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "var(--c-amber-pale)", borderRadius: 99, fontFamily: "var(--f-body)", fontSize: "0.78rem", fontWeight: 700, color: "var(--c-amber)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              <Calendar style={{ width: 13, height: 13 }} /> Upcoming
            </span>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "var(--c-bark)", marginBottom: 12 }}>
              Upcoming <span className="text-green-grad">Campaigns</span>
            </h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              New initiatives we're preparing to launch — be the first to volunteer and make a difference.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px,1fr))", gap: 28 }}>
            {upcoming.map((c, i) => (
              <motion.div key={i} {...fade(i * 0.15)}
                style={{ background: "white", borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--c-sand-light)", boxShadow: "var(--sh-sm)", transition: "all 0.4s" }}
                whileHover={{ y: -8, boxShadow: "var(--sh-xl)" }}>
                {/* Coloured header */}
                <div style={{ background: c.accent, padding: "30px 30px 26px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.12 }}>
                    <c.icon size={96} color="white" />
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 99, fontFamily: "var(--f-body)", fontSize: "0.7rem", fontWeight: 700, color: "white", marginBottom: 14 }}>
                      <span style={{ width: 7, height: 7, background: "#FDE047", borderRadius: "50%", display: "inline-block" }} />
                      Coming Soon
                    </span>
                    <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 14, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <c.icon style={{ width: 24, height: 24, color: "white" }} />
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: "24px 28px 28px" }}>
                  <h3 style={{ fontFamily: "var(--f-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--c-bark)", marginBottom: 10 }}>{c.title}</h3>
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.9rem", color: "var(--c-bark-muted)", lineHeight: 1.78, marginBottom: 18 }}>{c.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: c.accentLight, borderRadius: "var(--r-md)", border: `1px solid ${c.accent}22`, marginBottom: 18 }}>
                    <Target style={{ width: 15, height: 15, color: c.accent, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 600, color: c.accent }}>🎯 Goal: {c.target}</span>
                  </div>
                  <Link to="/registration">
                    <motion.span className="btn btn-primary" style={{ display: "flex", justifyContent: "center", width: "100%" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      <Heart style={{ width: 14, height: 14, fill: "white" }} /> Get Involved <ArrowRight style={{ width: 14, height: 14 }} />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA BANNER ══════ */}
      <section style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0B0B0B 0%, #1A1A1A 50%, #0B0B0B 100%)" }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[10, 30, 55, 78].map((l, i) => (
            <motion.div key={i} style={{ position: "absolute", left: `${l}%`, color: "rgba(255,255,255,0.05)" }}
              animate={{ y: ["100%", "-10%"], opacity: [0, 0.2, 0.2, 0], rotate: [-15, 10, -10, 15] }}
              transition={{ duration: 16, repeat: Infinity, delay: i * 3, ease: "linear" }}>
              <FaPaw size={22 + i * 5} />
            </motion.div>
          ))}
        </div>
        <div className="section-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.h2
            style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "white", marginBottom: 16, lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            Every Act of Kindness Counts 💚
          </motion.h2>
          <motion.p
            style={{ fontFamily: "var(--f-body)", fontSize: "1.05rem", fontWeight: 300, color: "rgba(200,240,220,0.76)", maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.75 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            Whether it's feeding a hungry cow, protecting a dog at night, or handing a book to a child — your support creates ripples of change.
          </motion.p>
          <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
            <Link to="/registration">
              <motion.span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "#F3842C", background: "white", padding: "14px 28px", borderRadius: "var(--r-md)", boxShadow: "0 8px 24px rgba(0,0,0,0.18)", cursor: "pointer" }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Heart style={{ width: 17, height: 17, fill: "#F3842C" }} /> Donate Now <ArrowRight style={{ width: 17, height: 17 }} />
              </motion.span>
            </Link>
            <Link to="/contact">
              <motion.span className="btn btn-ghost btn-lg" style={{ display: "inline-flex" }} whileHover={{ scale: 1.03 }}>
                <Users style={{ width: 17, height: 17 }} /> Volunteer With Us
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
