import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Shivajee Vishen",
    role: "Founder",
    emoji: "🌱",
    img: "/team/shivajee-vishen.jpeg",
    bio: "A compassionate leader with over a decade of hands-on experience in animal welfare. His vision spans animal rescue, education for underprivileged students, hygiene support for girls, and youth sports development — including over a year of support for the Jaipur City Football Club. Humble, action-oriented, and driven by purpose.",
  },
  {
    name: "Jitendra Gurjar",
    role: "Vice President",
    emoji: "🤝",
    img: null,
    bio: "A dedicated ground-level champion for animals — actively feeding cows, dogs, and other animals every day. Known for his hands-on approach and unwavering reliability, Jitendra steps in wherever help is needed and stands as a strong pillar of the organisation.",
  },
  {
    name: "Pooja Singh",
    role: "Secretary",
    emoji: "📋",
    img: null,
    bio: "Manages governance, documentation and stakeholder relationships. The backbone of the trust's administrative operations and legal compliance.",
  },
  {
    name: "Amit Agrawal",
    role: "Treasurer",
    emoji: "💼",
    img: null,
    bio: "Manages all financial operations, donor accountability and transparent allocation of funds to rescue, feeding and NGO support programmes.",
  },
  {
    name: "Abhishek Soni",
    role: "India Head",
    emoji: "🇮🇳",
    img: "/team/abhishek-soni.jpeg",
    bio: "8+ years in retail fundraising. Conducted campaigns across 10+ cities — street, mall, society, school and airport fundraising — engaging diverse communities and inspiring people to contribute to social impact.",
  },
  {
    name: "Hardik Visaria",
    role: "Fundraising Head",
    emoji: "❤️",
    img: "/team/hardik-visaria.jpeg",
    bio: "5+ years in Face-to-Face fundraising across 7+ cities. Worked with multiple NGOs through street campaigns, corporate offices, malls and airports — building deep donor relationships for social causes.",
  },
  {
    name: "Vishwajeet Singh Vishen",
    role: "Senior Coordinator",
    emoji: "⭐",
    img: null,
    bio: "Coordinates day-to-day rescue operations, cow feeding drives, volunteer programmes and field activities across all regions. The operational engine behind our daily work.",
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
        {/* Gradient overlay at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(27,94,59,0.55), transparent)" }} />
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
        <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, var(--c-forest), var(--c-amber))", borderRadius: 2, marginBottom: 22 }} />

        {/* Bio broken into readable chunks */}
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 14 }}>
          A compassionate leader with <strong style={{ color: "var(--c-forest)" }}>over a decade of hands-on experience</strong> in animal welfare. His journey began long before formal recognition — driven purely by empathy and a deep commitment to the voiceless.
        </p>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 14 }}>
          Beyond animals, Shivajee actively supports underprivileged students, provides hygiene kits to girls, and empowers youth through sports — including over a year of support for the <strong style={{ color: "var(--c-forest)" }}>Jaipur City Football Club</strong>.
        </p>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)", lineHeight: 1.8, marginBottom: 28 }}>
          Humble and down-to-earth, he leads with action and purpose — turning a lifelong vision into a structured mission for compassion.
        </p>

        {/* Highlights */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["10+ Years of Service", "Animal Welfare", "Youth Sports", "Education & Hygiene"].map((tag, i) => (
            <span key={i} style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", fontWeight: 600, color: "var(--c-forest)", background: "var(--c-pale)", padding: "5px 14px", borderRadius: 99, border: "1px solid rgba(77,170,124,0.25)" }}>
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

/* ── Regular Team Card ── */
function TeamCard({ person }) {
  return (
    <div className="team-card">
      <div className="team-card__photo">
        {person.img
          ? <img src={person.img} alt={person.name} />
          : (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #1B5E3B, #3A8C66)" }}>
              <span style={{ fontSize: "4rem", marginBottom: 6 }}>{person.emoji}</span>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>{person.role}</span>
            </div>
          )
        }
        <div className="team-card__photo-overlay">
          <span style={{ display: "inline-block", background: "var(--c-amber)", color: "white", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>
            {person.role}
          </span>
        </div>
      </div>
      <div className="team-card__body">
        <h3 className="team-card__name">{person.name}</h3>
        <p className="team-card__bio">{person.bio}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const founder = TEAM[0];
  const rest    = TEAM.slice(1);

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
            Our <span style={{ color: "#E8A84A" }}>Team</span>
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
          </div>
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 24 }}
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {rest.map((p, i) => (
              <motion.div key={i} variants={item}>
                <TeamCard person={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section style={{ padding: "64px 0", textAlign: "center", background: "linear-gradient(150deg, #0F2E1C, #1B5E3B)" }}>
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
    </div>
  );
}
