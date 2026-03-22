import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const PARTNERS = [
  { name:"GreenPaw Foundation",  type:"Gold Partner",     emoji:"🐾" },
  { name:"Wildlife Trust India", type:"Gold Partner",     emoji:"🦁" },
  { name:"Petcare India",        type:"Silver Partner",   emoji:"🐕" },
  { name:"Blue Cross Society",   type:"Silver Partner",   emoji:"💙" },
  { name:"Animal Aid Unlimited", type:"Care Partner",   emoji:"🐄" },
  { name:"PETA India",           type:"Advocacy Partner", emoji:"✊" },
];
const TIERS = [
  { tier:"Bronze", amount:"₹25,000", color:"var(--c-pale)", border:"var(--c-leaf)", label:"var(--c-forest)", benefits:["Logo on website","Social media mention","Impact report","Certificate of partnership"] },
  { tier:"Silver", amount:"₹50,000", color:"var(--c-amber-pale)", border:"var(--c-amber-light)", label:"var(--c-amber)", benefits:["All Bronze benefits","Co-branded campaigns","Volunteer day for your team","Event visibility"] },
  { tier:"Gold",   amount:"₹1,00,000+", color:"var(--c-pale)", border:"var(--c-forest)", label:"var(--c-forest)", benefits:["All Silver benefits","Naming rights for a care and feeding unit","Press coverage","Board-level engagement"] },
];
const fade = (d=0) => ({ initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0}, transition:{duration:0.65,delay:d,ease:[0.22,1,0.36,1]}, viewport:{once:true} });

export default function Sponsers() {
  return (
    <div style={{ background:"var(--c-cream)", minHeight:"100vh" }}>
      <Navbar />
      <div className="page-hero">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <p className="section-label" style={{ justifyContent:"center", color:"var(--c-amber-light)", marginBottom:12 }}>Partnerships</p>
          <h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:700, color:"white", marginBottom:14 }}>
            Our <span style={{ color:"#F3842C" }}>Partners</span>
          </h1>
          <div className="divider" style={{ margin:"0 auto 20px" }} />
          <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"rgba(255,255,255,0.58)", maxWidth:500, margin:"0 auto" }}>
            Together we're stronger. Meet the organisations that make our work possible.
          </p>
        </div>
      </div>

      {/* Current Partners */}
      <section style={{ padding:"72px 0", background:"white" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Current Partners</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, color:"var(--c-bark)" }}>
              Who We <span className="text-green-grad">Work With</span>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:18 }}>
            {PARTNERS.map((p,i) => (
              <motion.div key={i} {...fade(i*0.07)}
                style={{ background:"var(--c-cream)", borderRadius:"var(--r-lg)", padding:"28px 20px", textAlign:"center", border:"1px solid var(--c-sand-light)", boxShadow:"var(--sh-xs)" }}
                whileHover={{ y:-5, boxShadow:"var(--sh-md)" }}>
                <div style={{ fontSize:"2.8rem", marginBottom:14 }}>{p.emoji}</div>
                <p style={{ fontFamily:"var(--f-display)", fontSize:"0.95rem", fontWeight:700, color:"var(--c-bark)", marginBottom:8 }}>{p.name}</p>
                <span style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", fontWeight:700, color:"var(--c-forest)", background:"var(--c-pale)", padding:"3px 12px", borderRadius:99, textTransform:"uppercase", letterSpacing:"0.06em" }}>{p.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section style={{ padding:"72px 0", background:"var(--c-cream)" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Partner With Us</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, color:"var(--c-bark)" }}>
              Become a <span className="text-amber-grad">Partner</span>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.95rem", color:"var(--c-bark-muted)", maxWidth:500, margin:"12px auto 0" }}>Choose a tier that works for your organisation. Your support helps us scale our impact.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            {TIERS.map((t,i) => (
              <motion.div key={i} {...fade(i*0.1)}
                style={{ background:t.color, borderRadius:"var(--r-xl)", padding:"32px", border:`2px solid ${t.border}`, boxShadow:"var(--sh-xs)" }}
                whileHover={{ y:-6, boxShadow:"var(--sh-lg)" }}>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:t.label, marginBottom:6 }}>{t.tier}</p>
                <p style={{ fontFamily:"var(--f-number)", fontSize:"2rem", fontWeight:800, color:"var(--c-bark)", marginBottom:24, letterSpacing:"-0.02em" }}>{t.amount}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                  {t.benefits.map((b,j) => (
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <CheckCircle style={{ width:15, height:15, color:t.label, flexShrink:0 }} />
                      <span style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", color:"var(--c-bark-muted)" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <motion.span className="btn btn-primary btn-sm" style={{ display:"flex", justifyContent:"center" }} whileHover={{ scale:1.03 }}>Get In Touch</motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
