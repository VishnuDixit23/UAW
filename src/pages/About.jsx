import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight, CheckCircle, Target, Eye } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const SECTORS_PRIMARY = ["Children & Education & Literacy","Health & Family Welfare","Women's Development & Empowerment","Animal Welfare 🐾","Youth Sports Development"];
const SECTORS_SECONDARY = ["Agriculture & Animal Husbandry","Art & Culture","Biotechnology","Civic Issues","Dalit Upliftment","Differently Abled","Disaster Management","Drinking Water","Aged / Elderly","Environment & Forests","Food Processing","HIV/AIDS","Housing","Human Rights","ICT","Labour & Employment","Land Resources","Legal Awareness & Aid","Micro Finance","MSMEs","Minority Issues","New & Renewable Energy","Nutrition","Panchayati Raj","Prisoner's Issues","Right to Information"];



const MILESTONES = [
  { year:"2026", title:"Foundation Registered", desc:"Registered as a Public Trust in Rajasthan under Founder Shivajee Vishen." },
  { year:"2026", title:"NGO Support Programme", desc:"Launched flagship programme to financially support struggling animal welfare NGOs." },
  { year:"2026", title:"India Head Appointed",  desc:"Abhishek Soni takes charge to scale pan-India operations." },
  { year:"2026", title:"Fundraising Head Appointed",  desc:"Hardik Visaria will take the lead of all Fundraising activities." },
  { year:"2026", title:"First Campaigns Live",  desc:"Cow fed (7,000+), dog cared for (5,000+), girls hygiene (1,200+), education (500+)." },
];

const fade = (delay=0, dir='up') => ({
  initial:{ opacity:0, y: dir==='up'?28:0, x: dir==='left'?-28: dir==='right'?28:0 },
  whileInView:{ opacity:1, y:0, x:0 },
  transition:{ duration:0.7, delay, ease:[0.22,1,0.36,1] },
  viewport:{ once:true }
});

export default function About() {
  return (
    <div style={{ background:"var(--c-cream)", minHeight:"100vh" }}>
      <Navbar />

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"absolute", top:0, right:0, width:"50%", height:"100%", background:"radial-gradient(ellipse at top right, rgba(243,132,44,0.14) 0%, transparent 60%)", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <motion.p className="section-label" style={{ justifyContent:"center", color:"var(--c-amber-light)" }}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}>
            Our Foundation
          </motion.p>
          <motion.h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.4rem,6vw,4.2rem)", fontWeight:700, color:"white", marginTop:14, marginBottom:14, lineHeight:1.12 }}
            initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.12 }}>
            About <span style={{ color:"#F3842C" }}>Our Foundation</span>
          </motion.h1>
          <div className="divider" style={{ margin:"0 auto 20px" }} />
          <motion.p style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", color:"rgba(255,255,255,0.60)", maxWidth:580, margin:"0 auto" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
            United for Animal Welfare is a registered Public Trust (Rajasthan, 2026) founded by <strong style={{ color:"rgba(255,255,255,0.88)" }}>Shivajee Vishen</strong> — built on compassion, driven by action.
          </motion.p>
        </div>
      </div>

      {/* ── TRUST REGISTRATION CARD ── */}
      <div style={{ background:"white", paddingBottom:0 }}>
        <div className="section-container" style={{ paddingTop:0 }}>
          <motion.div {...fade(0)} style={{ background:"white", border:"1px solid var(--c-sand-light)", borderRadius:"var(--r-xl)", boxShadow:"var(--sh-md)", padding:"28px 36px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center", marginTop:-32, position:"relative", zIndex:10 }}>
            {[["Entity Type","Public Trust / NPO"],["Registered In","Jaipur, Rajasthan"],["Registration Year","2026"],["Status","Active ✓"]].map(([k,v]) => (
              <div key={k}>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--c-amber)", marginBottom:8 }}>{k}</p>
                <p style={{ fontFamily:"var(--f-display)", fontSize:"1.05rem", fontWeight:700, color:"var(--c-bark)" }}>{v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── MISSION & VISION ── */}
      <section style={{ padding:"72px 0", background:"white" }}>
        <div className="section-container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }} className="mv-grid">
            {[
              { icon:Target, title:"Our Mission", bg:"#FFF4EB", border:"#F3842C", iconColor:"#F3842C",
                text:"To rescue, rehabilitate and rehome animals in need — and to keep the network of small, underfunded NGOs doing this vital work alive through financial support, resources and advocacy. Simultaneously, we serve communities through education, health, and empowerment programmes." },
              { icon:Eye, title:"Our Vision", bg:"#FFF4EB", border:"#F59E4B", iconColor:"#F59E4B",
                text:"An India where no animal suffers for lack of care, and every passionate animal welfare NGO has the support it needs to survive. A society where humans and animals thrive together, supported by strong community welfare systems." },
            ].map(({icon:Icon,title,bg,border,iconColor,text},i) => (
              <motion.div key={i} {...fade(i*0.12)}
                style={{ background:bg, borderLeft:`4px solid ${border}`, borderRadius:"var(--r-xl)", padding:"36px" }}>
                <div style={{ width:48, height:48, borderRadius:12, background:"white", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:"var(--sh-xs)" }}>
                  <Icon style={{ width:22, height:22, color:iconColor }} />
                </div>
                <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1.4rem", fontWeight:700, color:"var(--c-bark)", marginBottom:14 }}>{title}</h3>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.95rem", color:"var(--c-bark-muted)", lineHeight:1.75 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:700px){.mv-grid{grid-template-columns:1fr!important}}`}</style>
      </section>



      {/* ── WORKING SECTORS ── */}
      <section style={{ padding:"72px 0", background:"white" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Registered Working Sectors</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, color:"var(--c-bark)" }}>
              Our <span className="text-amber-grad">Areas of Work</span>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }} className="sectors-grid">
            <div style={{ background:"var(--c-pale)", borderRadius:"var(--r-lg)", padding:"28px 32px" }}>
              <p style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#F3842C", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:20, height:2, background:"#F3842C", display:"inline-block", borderRadius:2 }} />
                Primary Sectors
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {SECTORS_PRIMARY.map((s,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <CheckCircle style={{ width:16, height:16, color: s.includes("Animal") ? "#F3842C" : "#F59E4B", flexShrink:0 }} />
                    <span style={{ fontFamily:"var(--f-body)", fontSize:"0.9rem", fontWeight: s.includes("Animal") ? 700 : 500, color: s.includes("Animal") ? "#F3842C" : "var(--c-bark-muted)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"var(--c-amber-pale)", borderRadius:"var(--r-lg)", padding:"28px 32px" }}>
              <p style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--c-amber)", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:20, height:2, background:"var(--c-amber)", display:"inline-block", borderRadius:2 }} />
                Secondary Sectors
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {SECTORS_SECONDARY.map((s,i) => (
                  <span key={i} style={{ fontFamily:"var(--f-body)", fontSize:"0.75rem", fontWeight:500, color:"var(--c-bark-mid)", background:"white", padding:"4px 12px", borderRadius:99, border:"1px solid var(--c-sand)" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:700px){.sectors-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding:"72px 0", background:"var(--c-cream)" }}>
        <div className="section-container" style={{ maxWidth:760 }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Our Journey</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, color:"var(--c-bark)" }}>How We <span className="text-green-grad">Started</span></h2>
          </div>
          <div style={{ position:"relative", paddingLeft:32 }}>
            <div style={{ position:"absolute", left:10, top:8, bottom:8, width:2, background:"var(--c-sand-light)", borderRadius:2 }} />
            {MILESTONES.map((m,i) => (
              <motion.div key={i} {...fade(i*0.1)}
                style={{ display:"flex", gap:20, marginBottom:28, alignItems:"flex-start" }}>
                <div style={{ width:20, height:20, borderRadius:"50%", background:"var(--c-amber)", border:"3px solid white", boxShadow:"0 0 0 2px var(--c-amber-light)", flexShrink:0, position:"relative", left:-42, zIndex:1, marginTop:4, marginRight:-20 }} />
                <div style={{ flex:1, background:"white", borderRadius:"var(--r-md)", padding:"18px 22px", border:"1px solid var(--c-sand-light)", boxShadow:"var(--sh-xs)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
                    <span style={{ fontFamily:"var(--f-body)", fontSize:"0.7rem", fontWeight:700, color:"white", background:"#F3842C", padding:"3px 10px", borderRadius:99 }}>{m.year}</span>
                    <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1rem", fontWeight:700, color:"var(--c-bark)" }}>{m.title}</h3>
                  </div>
                  <p style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", color:"var(--c-bark-muted)", lineHeight:1.65 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:"72px 0", textAlign:"center", background:"linear-gradient(150deg, #0B0B0B, #1A1A1A)" }}>
        <Heart style={{ width:36, height:36, color:"var(--c-amber)", fill:"var(--c-amber)", margin:"0 auto 16px" }} />
        <h2 style={{ fontFamily:"var(--f-display)", fontSize:"2.2rem", fontWeight:700, color:"white", marginBottom:14 }}>Join Our Mission</h2>
        <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"rgba(255,255,255,0.55)", marginBottom:28, maxWidth:440, margin:"0 auto 28px" }}>
          Volunteer, donate, or partner with us — every act of kindness matters.
        </p>
        <Link to="/contact">
          <motion.span className="btn btn-amber btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
            Get Involved <ArrowRight style={{ width:18, height:18 }} />
          </motion.span>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
