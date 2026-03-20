import { useState } from "react";
import { MapPin, Phone, Mail, AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const CONTACTS = [
  { Icon:MapPin,       title:"Location",          l1:"Rajasthan, India",                   l2:"Registered Public Trust, 2026" },
  { Icon:Phone,        title:"Call / WhatsApp",   l1:"+91 7976606854",                    l2:"Mon–Sat, 9 AM – 6 PM" },
  { Icon:Mail,         title:"Email",             l1:"contact@unitedforanimalwelfare.org", l2:"Reply within 24 hours" },
  { Icon:AlertCircle,  title:"Animal Emergency",  l1:"Rescue Hotline (24/7):",             l2:"+91 7976606854" },
];
const KEY_PEOPLE = [
  { name:"Abhishek Soni",          role:"India Head",         note:"NGO partnerships & national ops" },
  { name:"Hardik Visaria",         role:"Fundraising Head",   note:"Donations, CSR & fundraising" },
  { name:"Vishwajeet Singh Vishen",role:"Senior Coordinator", note:"Volunteer & rescue coordination" },
];
const fade = (d=0) => ({ initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0}, transition:{duration:0.65,delay:d,ease:[0.22,1,0.36,1]}, viewport:{once:true} });

export default function ContactUs() {
  const [form, setForm] = useState({ name:"", email:"", mobile:"", subject:"", message:"" });
  const [done, setDone] = useState(false);
  const set = e => setForm(p => ({...p, [e.target.name]:e.target.value}));

  const submit = async e => {
    e.preventDefault();
    try { await axios.post("https://sheetdb.io/api/v1/dn0y95uxqe0qs", { data:form }); setDone(true); }
    catch { alert("Error submitting. Please try again."); }
  };

  return (
    <div style={{ background:"var(--c-cream)", minHeight:"100vh" }}>
      <Navbar />
      <div className="page-hero">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <p className="section-label" style={{ justifyContent:"center", color:"var(--c-amber-light)", marginBottom:12 }}>Reach Out</p>
          <h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.4rem,6vw,4rem)", fontWeight:700, color:"white", marginBottom:14 }}>
            Get In <span style={{ color:"#F3842C" }}>Touch</span>
          </h1>
          <div className="divider" style={{ margin:"0 auto 20px" }} />
          <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"rgba(255,255,255,0.58)", maxWidth:520, margin:"0 auto" }}>
            Have a question, want to volunteer, or need emergency animal rescue? We're here 24/7.
          </p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop:60, paddingBottom:80 }}>
        {/* Info Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16, marginBottom:48 }}>
          {CONTACTS.map(({Icon,title,l1,l2},i) => (
            <motion.div key={i} {...fade(i*0.08)}
              style={{ background:"white", borderRadius:"var(--r-lg)", padding:"22px", border:"1px solid var(--c-sand-light)", boxShadow:"var(--sh-xs)", textAlign:"center" }}
              whileHover={{ y:-4, boxShadow:"var(--sh-md)" }}>
              <div style={{ width:44,height:44,borderRadius:12,background:"var(--c-pale)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <Icon style={{ width:20,height:20,color:"var(--c-forest)" }} />
              </div>
              <p style={{ fontFamily:"var(--f-display)",fontSize:"0.95rem",fontWeight:700,color:"var(--c-bark)",marginBottom:6 }}>{title}</p>
              <p style={{ fontFamily:"var(--f-body)",fontSize:"0.82rem",color:"var(--c-bark-muted)" }}>{l1}</p>
              <p style={{ fontFamily:"var(--f-body)",fontSize:"0.82rem",color:"var(--c-bark-muted)" }}>{l2}</p>
            </motion.div>
          ))}
        </div>

        {/* Key People */}
        <motion.div {...fade(0.1)} style={{ background:"white",borderRadius:"var(--r-xl)",padding:"28px 32px",border:"1px solid var(--c-sand-light)",boxShadow:"var(--sh-xs)",marginBottom:40 }}>
          <p style={{ fontFamily:"var(--f-body)",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--c-forest)",marginBottom:20 }}>Who to Contact</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16 }}>
            {KEY_PEOPLE.map((p,i) => (
              <div key={i} style={{ background:"var(--c-pale)",borderRadius:"var(--r-md)",padding:"16px 18px" }}>
                <div style={{ width:40,height:40,borderRadius:10,background:"var(--c-forest)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:"0.82rem",marginBottom:10 }}>
                  {p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <p style={{ fontFamily:"var(--f-display)",fontSize:"0.95rem",fontWeight:700,color:"var(--c-bark)",marginBottom:3 }}>{p.name}</p>
                <p style={{ fontFamily:"var(--f-body)",fontSize:"0.7rem",fontWeight:700,color:"var(--c-amber)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5 }}>{p.role}</p>
                <p style={{ fontFamily:"var(--f-body)",fontSize:"0.82rem",color:"var(--c-bark-muted)" }}>{p.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form + Map */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }} className="contact-grid">
          <motion.div {...fade(0.1)} style={{ background:"white",borderRadius:"var(--r-xl)",padding:"32px",border:"1px solid var(--c-sand-light)",boxShadow:"var(--sh-xs)" }}>
            <h2 style={{ fontFamily:"var(--f-display)",fontSize:"1.4rem",fontWeight:700,color:"var(--c-bark)",marginBottom:24 }}>Send Us a Message</h2>
            {done ? (
              <div style={{ textAlign:"center",padding:"48px 0" }}>
                <div style={{ fontSize:"3.5rem",marginBottom:16 }}>🐾</div>
                <h3 style={{ fontFamily:"var(--f-display)",fontSize:"1.4rem",fontWeight:700,color:"var(--c-forest)",marginBottom:8 }}>Thank You!</h3>
                <p style={{ color:"var(--c-bark-muted)",marginBottom:20 }}>We'll get back to you shortly.</p>
                <button onClick={() => setDone(false)} className="btn btn-primary btn-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {[["name","Your Full Name","text",true],["email","Email Address","email",true],["mobile","Phone Number","text",false],["subject","Subject","text",false]].map(([n,ph,t,req]) => (
                  <input key={n} type={t} name={n} placeholder={ph} value={form[n]} onChange={set} required={req}
                    style={{ fontFamily:"var(--f-body)",fontSize:"0.9rem",padding:"11px 16px",border:"1.5px solid var(--c-sand-light)",borderRadius:"var(--r-sm)",background:"var(--c-cream)",color:"var(--c-bark)",outline:"none",transition:"border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor="var(--c-leaf)"}
                    onBlur={e => e.target.style.borderColor="var(--c-sand-light)"} />
                ))}
                <textarea name="message" placeholder="Your Message" value={form.message} onChange={set} rows={4}
                  style={{ fontFamily:"var(--f-body)",fontSize:"0.9rem",padding:"11px 16px",border:"1.5px solid var(--c-sand-light)",borderRadius:"var(--r-sm)",background:"var(--c-cream)",color:"var(--c-bark)",outline:"none",resize:"none" }} />
                <motion.button type="submit" className="btn btn-primary" style={{ justifyContent:"center",marginTop:4 }} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                  Send Message <ArrowRight style={{ width:16,height:16 }} />
                </motion.button>
              </form>
            )}
          </motion.div>
          <motion.div {...fade(0.15)} style={{ borderRadius:"var(--r-xl)",overflow:"hidden",border:"1px solid var(--c-sand-light)",boxShadow:"var(--sh-xs)",minHeight:400 }}>
            <iframe className="w-full h-full" style={{ minHeight:400,border:"none" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d904012.07!2d74.45!3d26.885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4b15077b%3A0x12ab8f4a68dc58a!2sRajasthan!5e0!3m2!1sen!2sin!4v1"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
      <Footer />
    </div>
  );
}
