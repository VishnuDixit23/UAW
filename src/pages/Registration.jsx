import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Repeat, ArrowRight, Shield, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const TIERS = [
  { amount:500,   label:"Supporter",  icon:"🌱", desc:"Feeds a rescued animal for a week" },
  { amount:1500,  label:"Champion",   icon:"🐾", desc:"Funds a vet check-up for 3 animals" },
  { amount:5000,  label:"Guardian",   icon:"🛡️", desc:"Sponsors a shelter for one month" },
  { amount:10000, label:"Lifesaver",  icon:"❤️", desc:"Keeps an NGO running for a week" },
  { amount:25000, label:"Patron",     icon:"🌟", desc:"Fully funds an NGO rescue operation" },
];

export default function Registration() {
  const [sel, setSel]       = useState(1500);
  const [custom, setCustom] = useState("");
  const [recur, setRecur]   = useState(false);
  const [form, setForm]     = useState({ name:"", email:"", pan:"", message:"" });
  const [done, setDone]     = useState(false);
  const set = e => setForm(p => ({...p,[e.target.name]:e.target.value}));
  const amount = custom || sel;

  const submit = async e => {
    e.preventDefault();
    try { await axios.post("https://sheetdb.io/api/v1/dn0y95uxqe0qs", { data:{...form,amount,recur} }); setDone(true); }
    catch { alert("Something went wrong. Please try again."); }
  };

  return (
    <div style={{ background:"var(--c-cream)", minHeight:"100vh" }}>
      <Navbar />
      <div className="page-hero">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <p className="section-label" style={{ justifyContent:"center", color:"var(--c-amber-light)", marginBottom:12 }}>Make a Difference</p>
          <h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:700, color:"white", marginBottom:14 }}>
            <span style={{ color:"#F3842C" }}>Donate</span> & Save a Life
          </h1>
          <div className="divider" style={{ margin:"0 auto 20px" }} />
          <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"rgba(255,255,255,0.58)", maxWidth:500, margin:"0 auto" }}>
            Your donation goes directly to animal rescue and keeping NGOs alive. 80-G tax benefits available.
          </p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop:60, paddingBottom:80, maxWidth:720 }}>
        {done ? (
          <motion.div initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }}
            style={{ background:"white", borderRadius:"var(--r-xl)", padding:"56px 40px", textAlign:"center", boxShadow:"var(--sh-lg)", border:"1px solid var(--c-sand-light)" }}>
            <div style={{ fontSize:"4rem", marginBottom:20 }}>🐾</div>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"2rem", fontWeight:700, color:"var(--c-forest)", marginBottom:12 }}>Thank You!</h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"var(--c-bark-muted)", marginBottom:28 }}>Your generous donation will help save lives. We'll send a receipt and impact report by email.</p>
            <button onClick={() => setDone(false)} className="btn btn-primary btn-sm">Donate Again</button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
            style={{ background:"white", borderRadius:"var(--r-xl)", padding:"36px 40px", boxShadow:"var(--sh-md)", border:"1px solid var(--c-sand-light)" }}>

            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"1.5rem", fontWeight:700, color:"var(--c-bark)", marginBottom:24 }}>Choose Your Impact</h2>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12, marginBottom:24 }}>
              {TIERS.map(t => (
                <button key={t.amount} onClick={() => { setSel(t.amount); setCustom(""); }}
                  style={{ padding:"16px", borderRadius:"var(--r-md)", border:`2px solid ${sel===t.amount && !custom ? "var(--c-forest)" : "var(--c-sand-light)"}`, background:sel===t.amount && !custom ? "var(--c-pale)" : "white", cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}>
                  <div style={{ fontSize:"1.8rem", marginBottom:6 }}>{t.icon}</div>
                  <div style={{ fontFamily:"var(--f-number)", fontSize:"1.1rem", fontWeight:800, color:"var(--c-bark)", marginBottom:2, letterSpacing:"-0.02em" }}>₹{t.amount.toLocaleString()}</div>
                  <div style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", fontWeight:700, color:"var(--c-forest)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{t.label}</div>
                  <div style={{ fontFamily:"var(--f-body)", fontSize:"0.78rem", color:"var(--c-bark-muted)" }}>{t.desc}</div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ fontFamily:"var(--f-body)", fontSize:"0.82rem", fontWeight:600, color:"var(--c-bark-muted)", marginBottom:8, display:"block" }}>Or enter a custom amount (₹)</label>
              <input type="number" placeholder="e.g. 2000" value={custom}
                onChange={e => { setCustom(e.target.value); setSel(null); }}
                style={{ width:"100%", fontFamily:"var(--f-body)", fontSize:"0.95rem", padding:"11px 16px", border:"1.5px solid var(--c-sand-light)", borderRadius:"var(--r-sm)", background:"var(--c-cream)", color:"var(--c-bark)", outline:"none" }} />
            </div>

            <div onClick={() => setRecur(!recur)} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", background:"var(--c-pale)", borderRadius:"var(--r-md)", border:"1px solid rgba(77,170,124,0.2)", marginBottom:28, cursor:"pointer" }}>
              <div style={{ width:44, height:24, borderRadius:12, background:recur ? "var(--c-forest)" : "var(--c-sand)", position:"relative", flexShrink:0, transition:"background 0.25s" }}>
                <div style={{ position:"absolute", top:3, width:18, height:18, borderRadius:"50%", background:"white", boxShadow:"0 1px 3px rgba(0,0,0,0.15)", transition:"left 0.25s", left:recur ? 23 : 3 }} />
              </div>
              <div>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", fontWeight:600, color:"var(--c-bark)", display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  <Repeat style={{ width:14, height:14, color:"var(--c-forest)" }} /> Make this a monthly donation
                </p>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.78rem", color:"var(--c-bark-muted)" }}>Cancel anytime. Monthly donors have the greatest long-term impact.</p>
              </div>
            </div>

            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1.1rem", fontWeight:700, color:"var(--c-bark)", marginBottom:16 }}>Your Details</h3>
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[["name","Full Name","text",true],["email","Email Address","email",true],["pan","PAN Number (for 80-G receipt)","text",false]].map(([n,ph,t,req]) => (
                <input key={n} type={t} name={n} placeholder={ph} value={form[n]} onChange={set} required={req}
                  style={{ fontFamily:"var(--f-body)", fontSize:"0.9rem", padding:"11px 16px", border:"1.5px solid var(--c-sand-light)", borderRadius:"var(--r-sm)", background:"var(--c-cream)", color:"var(--c-bark)", outline:"none" }} />
              ))}
              <textarea name="message" placeholder="Dedicate your donation (optional)" value={form.message} onChange={set} rows={3}
                style={{ fontFamily:"var(--f-body)", fontSize:"0.9rem", padding:"11px 16px", border:"1.5px solid var(--c-sand-light)", borderRadius:"var(--r-sm)", background:"var(--c-cream)", color:"var(--c-bark)", outline:"none", resize:"none" }} />
              <motion.button type="submit" className="btn btn-amber btn-lg" style={{ justifyContent:"center", marginTop:4 }} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                <Heart style={{ width:18, height:18, fill:"white" }} /> Donate ₹{Number(amount||0).toLocaleString()}{recur ? "/month" : ""}
              </motion.button>
              <p style={{ fontFamily:"var(--f-body)", fontSize:"0.75rem", color:"var(--c-bark-muted)", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Shield style={{ width:13, height:13 }} /> Secure payment · 80-G receipt · 100% reaches animals
              </p>
            </form>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
