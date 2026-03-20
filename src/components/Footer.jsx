import { ChevronRight, Phone, Mail, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const LINKS = [
  { name:"Our Programmes",       path:"/ourwork" },
  { name:"NGOs We Support",      path:"/ngos" },
  { name:"About the Foundation", path:"/about" },
  { name:"Our Team",             path:"/team" },
  { name:"Partners",             path:"/sponsers" },
  { name:"FAQs",                 path:"/faqs" },
  { name:"Contact Us",           path:"/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background:"linear-gradient(165deg, #0B0B0B 0%, #141414 55%, #0B0B0B 100%)", color:"white", position:"relative", overflow:"hidden" }}>
      {/* Top accent */}
      <div style={{ height:3, background:"linear-gradient(90deg, #F3842C, #F59E4B, #F7B267, #F59E4B, #F3842C)" }} />

      {/* BG glows */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(243,132,44,0.08), transparent)", filter:"blur(70px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-10%", left:"-5%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(243,132,44,0.06), transparent)", filter:"blur(70px)", pointerEvents:"none" }} />

      <div className="section-container" style={{ position:"relative", zIndex:1, paddingTop:64, paddingBottom:0 }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1.6fr", gap:48, paddingBottom:48, borderBottom:"1px solid rgba(255,255,255,0.08)" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <div style={{ width:52, height:52, borderRadius:14, overflow:"hidden", border:"2px solid rgba(243,132,44,0.35)", flexShrink:0 }}>
                <img src="/logo.jpeg" alt="United for Animal Welfare" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.2em", color:"#F3842C", textTransform:"uppercase", marginBottom:3 }}>United for</p>
                <p style={{ fontFamily:"var(--f-display)", fontSize:"1.1rem", fontWeight:700, color:"white", lineHeight:1 }}>Animal Welfare</p>
                <p style={{ fontSize:"0.58rem", color:"rgba(255,255,255,0.30)", letterSpacing:"0.15em", textTransform:"uppercase", marginTop:3 }}>Rajasthan · India · 2026</p>
              </div>
            </div>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", color:"rgba(255,255,255,0.48)", lineHeight:1.75, marginBottom:8 }}>
              Founded by <strong style={{ color:"rgba(255,255,255,0.75)" }}>Shivajee Vishen</strong>. Fed 7,000+ cows, protected 5,000+ dogs, empowered 1,200+ girls, educated 500+ students.
            </p>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.8rem", color:"rgba(243,132,44,0.55)", fontStyle:"italic", marginBottom:22 }}>"Compassion For Every Life"</p>
            <div style={{ display:"flex", gap:10 }}>
              {[FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp].map((Icon,i) => (
                <motion.a key={i} href="#"
                  style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", display:"flex", alignItems:"center", justifyContent:"center" }}
                  whileHover={{ scale:1.12, y:-2, background:"rgba(243,132,44,0.20)" }} transition={{ type:"spring", stiffness:380 }}>
                  <Icon style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.85rem" }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#F3842C", marginBottom:20 }}>Quick Links</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {LINKS.map((item,i) => (
                <Link key={i} to={item.path}
                  style={{ fontFamily:"var(--f-body)", fontSize:"0.86rem", color:"rgba(255,255,255,0.48)", textDecoration:"none", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color="rgba(255,255,255,0.85)"; e.currentTarget.style.paddingLeft="4px"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.48)"; e.currentTarget.style.paddingLeft="0"; }}>
                  <ChevronRight style={{ width:12, height:12, color:"#F3842C", flexShrink:0 }} />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#F3842C", marginBottom:20 }}>Get In Touch</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:22 }}>
              {[{ Icon:MapPin, text:"Rajasthan, India · Registered Public Trust, 2026" },
                { Icon:Phone, text:"+91 7976606854" },
                { Icon:Mail,  text:"contact@unitedforanimalwelfare.org" }].map(({Icon,text},i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:"rgba(243,132,44,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon style={{ width:14, height:14, color:"#F3842C" }} />
                  </div>
                  <p style={{ fontFamily:"var(--f-body)", fontSize:"0.84rem", color:"rgba(255,255,255,0.45)", lineHeight:1.55, marginTop:6 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"14px 16px", border:"1px solid rgba(255,255,255,0.07)", marginBottom:22 }}>
              <p style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#F3842C", marginBottom:10 }}>Key Contacts</p>
              {[["India Head","Abhishek Soni"],["Fundraising","Hardik Visaria"],["Coordination","Vishwajeet Singh Vishen"]].map(([r,n]) => (
                <p key={r} style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.40)", marginBottom:4 }}>
                  <strong style={{ color:"rgba(255,255,255,0.65)" }}>{r}:</strong> {n}
                </p>
              ))}
            </div>

            <Link to="/registration">
              <motion.span className="btn btn-amber btn-sm" style={{ display:"inline-flex", width:"100%", justifyContent:"center" }} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Heart style={{ width:14, height:14, fill:"white" }} /> Donate & Save a Life
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding:"20px 0", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontFamily:"var(--f-body)", fontSize:"0.78rem", color:"rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} United for Animal Welfare · Founded by Shivajee Vishen · Rajasthan, India
          </p>
          <p style={{ fontFamily:"var(--f-body)", fontSize:"0.78rem", color:"rgba(243,132,44,0.40)", fontStyle:"italic" }}>
            "Compassion For Every Life" 🐾
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
