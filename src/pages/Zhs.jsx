import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AlertTriangle, Heart } from "lucide-react";

const ngos = [
  { name:"Paws of Hope, Jaipur",    animals:120, risk:"Critical", since:2015, desc:"Cares for stray dogs and cats in the walled city area. Currently unable to pay vet bills." },
  { name:"Green Wings Sanctuary",   animals:85,  risk:"Critical", since:2018, desc:"The only bird rescue centre in Rajasthan. Funding has dried up after key donor withdrawal." },
  { name:"Cow Care Trust, Ajmer",   animals:200, risk:"High",     since:2009, desc:"Gaushala serving 200 cows. Struggling to buy fodder after local government grants ended." },
  { name:"Stray Strong Network",    animals:65,  risk:"High",     since:2020, desc:"Runs ABC (Animal Birth Control) programme for strays across 4 districts. Underfunded." },
  { name:"Desert Animal Rescue",    animals:40,  risk:"Moderate", since:2017, desc:"Rescues wild animals from the Thar Desert region. Staff have not been paid in 2 months." },
  { name:"River Dolphin Foundation",animals:12,  risk:"Moderate", since:2016, desc:"Protects the critically endangered Gangetic dolphin. Research funding depleted." },
];

const riskStyle = {
  Critical:{ bg:"#FEE2E2", text:"#B91C1C", border:"#FECACA" },
  High:    { bg:"#FEF3C7", text:"#B45309", border:"#FDE68A" },
  Moderate:{ bg:"#FEF9C3", text:"#854D0E", border:"#FEF08A" },
};

export default function NGOs() {
  return (
    <div style={{ background:"var(--c-cream)", minHeight:"100vh" }}>
      <Navbar />

      {/* Hero */}
      <div className="page-hero">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <motion.p className="section-label" style={{ justifyContent:"center", color:"var(--c-amber-light)", marginBottom:12 }}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}>
            NGO Life Support
          </motion.p>
          <motion.h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:700, color:"white", marginBottom:14 }}
            initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.12 }}>
            NGOs We <span style={{ color:"#F3842C" }}>Support</span>
          </motion.h1>
          <div className="divider" style={{ margin:"0 auto 20px" }} />
          <motion.p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"rgba(255,255,255,0.58)", maxWidth:520, margin:"0 auto" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
            These organisations are on the verge of collapse. Your donation keeps them — and the animals they serve — alive.
          </motion.p>
        </div>
      </div>

      {/* Urgent Banner */}
      <div style={{ background:"#FEF2F2", borderBottom:"1px solid #FECACA", padding:"14px 24px" }}>
        <div className="section-container" style={{ display:"flex", alignItems:"center", gap:12, justifyContent:"center" }}>
          <AlertTriangle style={{ width:18, height:18, color:"#DC2626", flexShrink:0 }} />
          <p style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", fontWeight:600, color:"#B91C1C" }}>
            6 NGOs are currently at <strong>Critical</strong> risk of shutting down within the next 30 days.{" "}
            <Link to="/registration" style={{ textDecoration:"underline", marginLeft:6 }}>Donate now →</Link>
          </p>
        </div>
      </div>

      {/* NGO Cards */}
      <section style={{ padding:"64px 0" }}>
        <div className="section-container">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px,1fr))", gap:22 }}>
            {ngos.map((ngo,i) => (
              <motion.div key={i} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:i*0.08 }} viewport={{ once:true }}
                style={{ background:"white", borderRadius:"var(--r-xl)", padding:"26px", border:"1px solid var(--c-sand-light)", boxShadow:"var(--sh-xs)", display:"flex", flexDirection:"column" }}
                whileHover={{ y:-5, boxShadow:"var(--sh-md)" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                  <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1.05rem", fontWeight:700, color:"var(--c-bark)", flex:1, paddingRight:12 }}>{ngo.name}</h3>
                  <span style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", fontWeight:700, padding:"4px 10px", borderRadius:99, border:"1.5px solid", flexShrink:0, background:riskStyle[ngo.risk].bg, color:riskStyle[ngo.risk].text, borderColor:riskStyle[ngo.risk].border }}>
                    {ngo.risk} Risk
                  </span>
                </div>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", color:"var(--c-bark-muted)", lineHeight:1.7, marginBottom:16, flex:1 }}>{ngo.desc}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid var(--c-sand-light)", paddingTop:14, marginBottom:14 }}>
                  <span style={{ fontFamily:"var(--f-body)", fontSize:"0.82rem", color:"var(--c-bark-muted)" }}>🐾 <strong>{ngo.animals}</strong> animals in care</span>
                  <span style={{ fontFamily:"var(--f-body)", fontSize:"0.78rem", color:"var(--c-bark-muted)" }}>Est. {ngo.since}</span>
                </div>
                <Link to="/registration">
                  <motion.span className="btn btn-primary btn-sm" style={{ display:"flex", justifyContent:"center", width:"100%" }} whileHover={{ scale:1.02 }}>
                    <Heart style={{ width:14, height:14, fill:"white" }} /> Donate to Help This NGO
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Apply CTA */}
          <div style={{ background:"#FFF4EB", borderRadius:"var(--r-xl)", padding:"40px", textAlign:"center", marginTop:48, border:"1px solid rgba(243,132,44,0.2)" }}>
            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1.6rem", fontWeight:700, color:"var(--c-bark)", marginBottom:12 }}>Is Your NGO Struggling?</h3>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.95rem", color:"var(--c-bark-muted)", maxWidth:480, margin:"0 auto 24px" }}>
              If you run an animal welfare NGO facing financial difficulties, apply for our support programme.
            </p>
            <Link to="/contact">
              <motion.span className="btn btn-primary" style={{ display:"inline-flex" }} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                Apply for Support
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
