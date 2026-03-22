import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Heart, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Shivajee Vishen",
    role: "Founder",
    emoji: "🌱",
    img: "/team/shivajee-vishen.jpeg",
    imgPosition: "center 15%",
    bio: "A compassionate leader with over a decade of hands-on experience in animal welfare. His vision spans animal care and feeding, education for underprivileged students, hygiene support for girls, and youth sports development — including over a year of support for the Jaipur City Football Club. Humble, action-oriented, and driven by purpose.",
  },
  {
    name: "Jitendra Gurjar",
    role: "Vice President",
    emoji: "🤝",
    img: "/team/jitendra-gurjar.jpeg",
    imgPosition: "center 22%",
    bio: "Jitendra Gurjar serves as the Vice President of United for Animal Welfare and is a dedicated animal supporter known for his consistent ground-level efforts. With a deep sense of compassion, he has been actively involved in feeding and caring for cows, dogs, and many other animals, ensuring their well-being and safety. He is recognized for his hands-on approach and unwavering commitment to animal welfare, often stepping in wherever help is needed. His dedication, reliability, and positive attitude make him an integral part of the organization.",
  },
  {
    name: "Pooja Singh",
    role: "Secretary",
    emoji: "📋",
    img: "/team/pooja-singh.png",
    imgPosition: "center 12%",
    bio: "Pooja Singh serves as the Secretary and plays an important role in leading initiatives focused on women empowerment and community welfare. She actively works towards educating young girls about hygiene, health awareness, and personal well-being, helping them build confidence and knowledge for a better future.Her dedication and commitment continue to strengthen the organization’s mission of creating a more inclusive and compassionate society.",
  },
  {
    name: "Abhishek Soni",
    role: "India Head",
    emoji: "🇮🇳",
    img: "/team/abhishek-soni-new.jpeg",
    imgPosition: "center 18%",
    bio: "With over 8 years of experience in retail fundraising, Abhishek specializes in Face-to-Face fundraising and tele-calling, building strong connections with supporters for meaningful causes. He has successfully conducted fundraising campaigns across more than 10 cities, working through street fundraising, mall fundraising, society outreach, school campaigns, and airport fundraising, engaging diverse communities and inspiring people to contribute to social impact. He also brings 2 years of experience in sales, driven by a strong vision to create positive change and support society.",
  },
  {
    name: "Hardik Visaria",
    role: "Fundraising Head",
    emoji: "❤️",
    img: "/team/hardik-visaria.jpeg",
    imgPosition: "center 15%",
    bio: "With more than 5 years of experience in retail fundraising, Hardik specializes in Face-to-Face fundraising and tele-calling, building strong relationships with donors and supporters for social causes. He has worked with multiple NGOs and successfully conducted fundraising campaigns across more than seven cities in India — through street campaigns, door-to-door outreach, corporate offices, shopping malls, and airport fundraising. He also brings over one year of experience in customer service and more than six months in sales, reflecting a strong commitment to social impact and community engagement.",
  },
  {
    name: "Vishwajeet Singh Vishen",
    role: "Mentor & Player",
    emoji: "⚽",
    img: "/team/vishwajeet-vishen.jpeg",
    imgPosition: "center 25%",
    bio: "Vishwajeet Singh Vishen is a passionate footballer with over 7–8 years of playing experience, having represented multiple football clubs. He is currently mentoring players at Jaipur City Football Club, where he is dedicated to guiding and supporting young talent, helping them pursue their dreams and build a future in football.",
  },
  {
    name: "Devdeep",
    role: "Social Media Lead",
    emoji: "📱",
    img: "/team/devdeep.jpeg",
    imgPosition: "center 20%",
    bio: "Devdeep plays a key role in managing and strengthening our social media presence. He actively supports all digital activities, including content creation, campaign promotion, and audience engagement. His efforts help us effectively communicate our mission and connect with a wider community online.",
  },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const item    = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

/* ── Founder Feature Card ── */
function FounderCard({ person }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
      style={{
        background: "white", borderRadius: "var(--r-xl)", overflow: "hidden",
        boxShadow: "var(--sh-lg)", border: "1px solid var(--c-sand-light)",
        display: "grid", gridTemplateColumns: "380px 1fr", marginBottom: 40,
      }}
      className="founder-card">
      {/* Photo */}
      <div style={{ position: "relative", overflow: "hidden", background: "var(--c-pale)" }}>
        <img src={person.img} alt={person.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", minHeight: 420 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(243,132,44,0.45), transparent)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 20 }}>
          <span style={{ fontFamily: "var(--f-body)", fontSize: "0.68rem", fontWeight: 700, color: "white", background: "var(--c-amber)", padding: "4px 14px", borderRadius: 99, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {person.role}
          </span>
        </div>
      </div>

      {/* Text */}
      <div style={{ padding: "44px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--c-amber)", textTransform: "uppercase", marginBottom: 10 }}>
          Founder &amp; Visionary
        </p>
        <h2 style={{ fontFamily: "var(--f-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--c-bark)", lineHeight: 1.12, marginBottom: 6, letterSpacing: "-0.01em" }}>
          {person.name}
        </h2>
        <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, marginBottom: 22 }} />

        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 14 }}>
          A compassionate leader with <strong style={{ color: "#F3842C" }}>over a decade of hands-on experience</strong> in animal welfare. His journey began long before formal recognition — driven purely by empathy and a deep commitment to the voiceless.
        </p>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 14 }}>
          Beyond animals, Shivajee actively supports underprivileged students, provides hygiene kits to girls, and empowers youth through sports — including over a year of support for the <strong style={{ color: "#F3842C" }}>Jaipur City Football Club</strong>.
        </p>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 28 }}>
          Humble and down-to-earth, he leads with action and purpose — turning a lifelong vision into a structured mission for compassion.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["10+ Years of Service", "Animal Welfare", "Youth Sports", "Education & Hygiene"].map((tag, i) => (
            <span key={i} style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", fontWeight: 600, color: "#F3842C", background: "#FFF4EB", padding: "5px 14px", borderRadius: 99, border: "1px solid rgba(243,132,44,0.25)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .founder-card { grid-template-columns: 1fr !important; }
          .founder-card img { min-height: 300px !important; max-height: 320px; }
        }
      `}</style>
    </motion.div>
  );
}

/* ── Premium Team Card with Hover Reveal ── */
function TeamCard({ person, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="premium-team-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(person)}
      style={{
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        background: "white",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.15)" : "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image Section */}
      <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
        {person.img ? (
          <img
            src={person.img}
            alt={person.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: person.imgPosition || "center 20%",
              display: "block",
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(145deg, #F3842C, #F59E4B)",
          }}>
            <span style={{ fontSize: "5rem", marginBottom: 8 }}>{person.emoji}</span>
            <span style={{
              fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.50)",
            }}>{person.role}</span>
          </div>
        )}

        {/* Gradient overlay — always present */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.20) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }} />

        {/* Role Badge */}
        <div style={{
          position: "absolute", top: 16, left: 16, zIndex: 5,
        }}>
          <span style={{
            display: "inline-block",
            background: "var(--c-amber)",
            color: "white",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "5px 14px",
            borderRadius: 99,
            boxShadow: "0 4px 12px rgba(243,132,44,0.35)",
          }}>
            {person.role}
          </span>
        </div>

        {/* Name + Short info at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "20px 22px",
          zIndex: 5,
        }}>
          <h3 style={{
            fontFamily: "var(--f-display)",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            marginBottom: 4,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}>
            {person.name}
          </h3>

          {/* Bio text — appears on hover */}
          <div style={{
            overflow: "hidden",
            maxHeight: hovered ? 200 : 0,
            opacity: hovered ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            marginTop: hovered ? 8 : 0,
          }}>
            <p style={{
              fontFamily: "var(--f-body)",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {person.bio}
            </p>
            <p style={{
              fontFamily: "var(--f-body)",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#F3842C",
              marginTop: 8,
              letterSpacing: "0.03em",
            }}>
              Click to read more →
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Full Bio Modal — Side-by-Side Layout ── */
function BioModal({ person, onClose }) {
  if (!person) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bio-modal-content"
          style={{
            background: "white",
            borderRadius: 28,
            overflow: "hidden",
            maxWidth: 820,
            width: "100%",
            maxHeight: "85vh",
            overflowY: "auto",
            boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
            display: "grid",
            gridTemplateColumns: person.img ? "320px 1fr" : "1fr",
          }}
        >
          {/* Left: Photo */}
          {person.img ? (
            <div style={{ position: "relative", overflow: "hidden", background: "#f3f0eb", minHeight: 400 }}>
              <img src={person.img} alt={person.name} style={{
                width: "100%", height: "100%", objectFit: "cover",
                objectPosition: person.imgPosition || "center 20%",
                display: "block",
              }} />
              {/* Subtle gradient at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
                background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
              }} />
            </div>
          ) : (
            <div style={{
              display: "none",
            }} />
          )}

          {/* Right: Info */}
          <div style={{ padding: "36px 36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Close button */}
            <button onClick={onClose} style={{
              position: "absolute", top: 16, right: 16, zIndex: 10,
              width: 40, height: 40, borderRadius: 12,
              background: "rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              <X style={{ width: 18, height: 18, color: "#666" }} />
            </button>

            {/* Role badge */}
            <span style={{
              display: "inline-block", width: "fit-content",
              background: "var(--c-amber)", color: "white",
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "5px 14px", borderRadius: 99,
              marginBottom: 14, boxShadow: "0 4px 12px rgba(243,132,44,0.25)",
            }}>
              {person.role}
            </span>

            <h2 style={{
              fontFamily: "var(--f-display)", fontSize: "1.8rem", fontWeight: 700,
              color: "var(--c-bark)", lineHeight: 1.15, marginBottom: 8,
            }}>
              {person.name}
            </h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, marginBottom: 20 }} />

            <p style={{
              fontFamily: "var(--f-body)", fontSize: "0.92rem",
              color: "var(--c-bark-muted)", lineHeight: 1.85,
              whiteSpace: "pre-line",
            }}>
              {person.bio}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Responsive: stack on small screens */}
      <style>{`
        @media (max-width: 700px) {
          .bio-modal-content {
            grid-template-columns: 1fr !important;
            max-height: 90vh !important;
          }
          .bio-modal-content > div:first-child {
            min-height: 280px !important;
            max-height: 300px;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

export default function Team() {
  const founder = TEAM[0];
  const rest    = TEAM.slice(1);
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            style={{ width: 72, height: 72, borderRadius: 18, overflow: "hidden", margin: "0 auto 20px", boxShadow: "0 12px 40px rgba(0,0,0,0.3)", border: "3px solid rgba(255,255,255,0.18)" }}>
            <img src="/logo.jpeg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
          <motion.p className="section-label" style={{ justifyContent: "center", color: "var(--c-amber-light)" }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            The People
          </motion.p>
          <motion.h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.4rem,6vw,4rem)", fontWeight: 700, color: "white", marginTop: 12, marginBottom: 6 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            Our <span style={{ color: "#F3842C" }}>Team</span>
          </motion.h1>
          <div className="divider" style={{ marginBottom: 18 }} />
          <motion.p style={{ fontFamily: "var(--f-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            The passionate people leading United for Animal Welfare's mission across India.
          </motion.p>
        </div>
      </div>

      {/* ── FOUNDER FEATURED CARD ── */}
      <section style={{ padding: "72px 0 48px" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ justifyContent: "center", marginBottom: 10 }}>Foundation Leadership</p>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "var(--c-bark)" }}>
              Meet the <span className="text-green-grad">Founder</span>
            </h2>
          </div>
          <FounderCard person={founder} />
        </div>
      </section>

      {/* ── REST OF TEAM ── */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ justifyContent: "center", marginBottom: 10 }}>Core Team</p>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "var(--c-bark)" }}>
              Leadership & <span className="text-amber-grad">Operations</span>
            </h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", color: "var(--c-bark-muted)", maxWidth: 460, margin: "12px auto 0", lineHeight: 1.6 }}>
              Hover over a card to preview or click to read the full story.
            </p>
          </div>
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 28 }}
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {rest.map((p, i) => (
              <motion.div key={i} variants={item}>
                <TeamCard person={p} onClick={setSelectedPerson} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section style={{ padding: "64px 0", textAlign: "center", background: "linear-gradient(150deg, #0B0B0B, #1A1A1A)" }}>
        <Heart style={{ width: 36, height: 36, color: "var(--c-amber)", fill: "var(--c-amber)", margin: "0 auto 16px" }} />
        <h2 style={{ fontFamily: "var(--f-display)", fontSize: "2rem", fontWeight: 700, color: "white", marginBottom: 14 }}>
          Want to Join the Team?
        </h2>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.55)", marginBottom: 28, maxWidth: 460, margin: "0 auto 28px" }}>
          We're always looking for passionate volunteers, field coordinators and fundraisers.
        </p>
        <Link to="/contact">
          <motion.span className="btn btn-amber btn-lg" style={{ display: "inline-flex" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            Get In Touch <ArrowRight style={{ width: 18, height: 18 }} />
          </motion.span>
        </Link>
      </section>

      <Footer />

      {/* ── BIO MODAL ── */}
      {selectedPerson && (
        <BioModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
      )}
    </div>
  );
}
