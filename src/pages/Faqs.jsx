import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const FAQS = [
  { q:"What is United for Animal Welfare?", a:"We are a registered Public Trust (Rajasthan, 2026) founded by Shivajee Vishen. Our primary focus is Animal Welfare alongside Children's Education, and Women's Empowerment. We rescue animals, support collapsing NGOs, and run daily feeding, hygiene and education programmes." },
  { q:"How is my donation used?", a:"85% of donations go directly to animal rescue operations and NGO support. The remaining 15% covers operational costs." },
  { q:"Can I get a tax receipt?", a:"Yes! We are registered as a Public Trust in Rajasthan. You will receive a receipt by email within 5 working days. Please provide your PAN number for 80-G tax benefits." },
  { q:"Which NGOs do you support?", a:"We support local NGOs and we help them providing food for animals and medical facilities." },
  { q:"How can I volunteer?", a:"Contact us via the form or reach Vishwajeet Singh Vishen (Senior Coordinator) directly. We have programmes for rescue operations, shelter care, awareness campaigns, and fundraising events." },
  { q:"Can I sponsor a specific animal or NGO?", a:"Yes! We have animal and NGO sponsorship programmes with monthly impact updates and photos. Contact Hardik Visaria (Fundraising Head) for customised arrangements." },
  { q:"Do you accept in-kind donations?", a:"Yes — animal food, medicines, blankets, cages, stationery and more. Contact us to coordinate a drop-off or collection in Rajasthan." },
  { q:"Are monthly donations possible?", a:"Absolutely, and we strongly encourage it. Monthly donors provide the most stable support. You can set up recurring donations on our Donate page and cancel anytime." },
  { q:"What is the Youth Kickstart Programme?", a:"A new initiative providing young athletes with football career sponsorships, accommodation, training and nutrition — giving underprivileged youth a genuine chance to succeed." },
];

export default function Faqs() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background:"var(--c-cream)", minHeight:"100vh" }}>
      <Navbar />
      <div className="page-hero">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <p className="section-label" style={{ justifyContent:"center", color:"var(--c-amber-light)", marginBottom:12 }}>Have Questions?</p>
          <h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:700, color:"white", marginBottom:14 }}>
            Frequently Asked <span style={{ color:"#F3842C" }}>Questions</span>
          </h1>
          <div className="divider" style={{ margin:"0 auto 20px" }} />
          <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:"rgba(255,255,255,0.58)", maxWidth:500, margin:"0 auto" }}>
            Everything you need to know about our Foundation and how to get involved.
          </p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop:60, paddingBottom:80, maxWidth:820 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {FAQS.map((faq,i) => (
            <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:i*0.04 }} viewport={{ once:true }}
              style={{ background:"white", borderRadius:"var(--r-lg)", border:"1px solid var(--c-sand-light)", boxShadow:"var(--sh-xs)", overflow:"hidden" }}>
              <button onClick={() => setOpen(open===i ? null : i)}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", background:"none", border:"none", cursor:"pointer", textAlign:"left", gap:12 }}>
                <span style={{ fontFamily:"var(--f-display)", fontSize:"1rem", fontWeight:600, color:"var(--c-bark)", lineHeight:1.4 }}>{faq.q}</span>
                <ChevronDown style={{ width:18, height:18, color:"var(--c-forest)", flexShrink:0, transition:"transform 0.28s", transform: open===i ? "rotate(180deg)" : "none" }} />
              </button>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.28 }}
                    style={{ overflow:"hidden" }}>
                    <p style={{ fontFamily:"var(--f-body)", fontSize:"0.92rem", color:"var(--c-bark-muted)", lineHeight:1.8, padding:"0 24px 22px" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div style={{ background:"#FFF4EB", borderRadius:"var(--r-xl)", padding:"36px", textAlign:"center", marginTop:48, border:"1px solid rgba(243,132,44,0.2)" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:12 }}>🐾</div>
          <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1.3rem", fontWeight:700, color:"var(--c-bark)", marginBottom:10 }}>Still have questions?</h3>
          <p style={{ fontFamily:"var(--f-body)", fontSize:"0.9rem", color:"var(--c-bark-muted)", marginBottom:20 }}>Our team is happy to help — reach out directly.</p>
          <Link to="/contact">
            <motion.span className="btn btn-primary btn-sm" style={{ display:"inline-flex" }} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
              Contact Us <ArrowRight style={{ width:14, height:14 }} />
            </motion.span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
