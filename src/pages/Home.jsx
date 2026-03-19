import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { ArrowRight, ArrowDown, Heart } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* ── DATA ── */
const PROGRAMMES = [
  { title:"Cow Feeding",               desc:"We feed more than 7,000 street cows across Rajasthan with daily nutrition drives, ensuring no sacred animal goes hungry.",                         icon:"🐄", img:"/programmes/feeding.jpeg",     stat:"7,000+", statLabel:"Cows Fed Daily" },
  { title:"Dog Care & Radium Collars", desc:"Caring for 5,000+ stray dogs and fitting them with glow-in-the-dark radium collar belts to save them from road accidents at night.",               icon:"🐕", img:"/programmes/collar.jpeg",      stat:"5,000+", statLabel:"Dogs Protected" },
  { title:"Girls' Hygiene",           desc:"Distributing sanitary hygiene pads to girls in slum areas — giving them dignity, health and confidence every month.",                               icon:"💜", img:"/programmes/hygiene.jpeg",     stat:"1,200+", statLabel:"Girls Supported" },
  { title:"Education",                 desc:"Providing books, stationery and geometric boxes to underprivileged students so no child is denied the right to learn.",                             icon:"📚", img:"/programmes/education.jpeg",   stat:"500+",   statLabel:"Students Helped" },
  { title:"Environment & Plantation",  desc:"Plantation drives to combat climate change, deforestation and pollution — building greener, healthier communities across Rajasthan.",               icon:"🌳", img:"/programmes/environment.jpeg", stat:"Active",  statLabel:"Campaign" },
  { title:"Youth Kickstart Programme",  desc:"Running for 4–5 years, we support talented youth from financially challenged backgrounds — providing sports training, education, accommodation and nutrition. Proud sponsors of Jaipur City Football Club.", icon:"⚽", img:"/programmes/youth.jpeg", stat:"4–5 Yrs", statLabel:"Running Strong" },
];

const STATS = [
  { n:7000, suf:"+", label:"Street Cows Fed",    icon:"🐄" },
  { n:5000, suf:"+", label:"Dogs Cared For",     icon:"🐕" },
  { n:1200, suf:"+", label:"Girls Helped",       icon:"💜" },
  { n:500,  suf:"+", label:"Students Supported", icon:"📚" },
];

const TESTIMONIALS = [
  { name:"Priya Sharma",    role:"Volunteer, Jaipur",    av:"PS", text:"United for Animal Welfare gave our small NGO a genuine lifeline. Without their support we would have shut down. Now we care for over 200 strays every month." },
  { name:"Rahul Menon",     role:"Monthly Donor",        av:"RM", text:"Every rupee I donate actually reaches the animals. The transparency and dedication — I've never seen anything like it from any NGO." },
  { name:"Dr. Ananya Bose", role:"Veterinarian Partner", av:"AB", text:"Working with this foundation has been deeply fulfilling. They bridge the gap between resources and the animals who desperately need help." },
];

/* ── ANIMATIONS ── */
const fadeUp = (delay=0) => ({
  initial:{ opacity:0, y:28 },
  animate:{ opacity:1, y:0 },
  transition:{ duration:0.7, delay, ease:[0.22,1,0.36,1] }
});
const staggerWrap = { hidden:{}, visible:{ transition:{ staggerChildren:0.11 } } };
const staggerChild = { hidden:{ opacity:0, y:24 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease:[0.22,1,0.36,1] } } };

/* ── STAT COUNTER ── */
function StatCard({ n, suf, label, icon, delay=0 }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.4 });
  return (
    <motion.div ref={ref} className="stat-card"
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      transition={{ duration:0.6, delay, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}>
      <span style={{ fontSize:"2.2rem", marginBottom:10 }}>{icon}</span>
      <p style={{ fontFamily:"var(--f-display)", fontSize:"2.6rem", fontWeight:700, color:"var(--c-forest)", lineHeight:1 }}>
        {inView ? <CountUp end={n} duration={2.2} separator="," suffix={suf} /> : "0"}
      </p>
      <p style={{ fontSize:"0.82rem", fontWeight:500, color:"var(--c-bark-muted)", marginTop:8 }}>{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const textY = useTransform(scrollYProgress, [0,1], ["0%","14%"]);
  const opacity = useTransform(scrollYProgress, [0,0.75], [1,0]);

  return (
    <div style={{ background:"var(--c-cream)" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <motion.div style={{ position:"absolute", inset:0, y:bgY, background:"linear-gradient(155deg, #0F2E1C 0%, #1B5E3B 45%, #133D28 100%)" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none", zIndex:1 }} />
        <div style={{ position:"absolute", top:0, right:0, width:"55%", height:"100%", background:"radial-gradient(ellipse at top right, rgba(77,170,124,0.13) 0%, transparent 62%)", pointerEvents:"none", zIndex:1 }} />

        {/* Floating glow blobs */}
        <motion.div style={{ position:"absolute", top:"20%", left:"15%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(77,170,124,0.18), transparent)", filter:"blur(60px)", pointerEvents:"none" }}
          animate={{ x:[0,25,-15,0], y:[0,-20,12,0] }} transition={{ duration:16, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div style={{ position:"absolute", bottom:"25%", right:"12%", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(200,128,26,0.14), transparent)", filter:"blur(50px)", pointerEvents:"none" }}
          animate={{ x:[0,-20,18,0], y:[0,18,-14,0] }} transition={{ duration:20, repeat:Infinity, ease:"easeInOut" }} />

        <motion.div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"136px 24px 160px", maxWidth:900, width:"100%", margin:"0 auto", y:textY, opacity }} >

          {/* Logo */}
          <motion.div {...fadeUp(0)} style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <motion.div style={{ width:104, height:104, borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.35)", border:"3px solid rgba(255,255,255,0.20)" }}
              whileHover={{ scale:1.05, rotate:2 }} transition={{ type:"spring", stiffness:280 }}>
              <img src="/logo.jpeg" alt="United for Animal Welfare" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div {...fadeUp(0.07)} style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <span className="badge badge-white" style={{ fontSize:"0.65rem" }}>
              Registered Public Trust · Rajasthan 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.14)} style={{ fontFamily:"var(--f-display)", fontSize:"clamp(3.2rem,10vw,8rem)", fontWeight:700, color:"white", lineHeight:0.95, marginBottom:6, letterSpacing:"-0.01em" }}>
            United For
          </motion.h1>
          <motion.h2 {...fadeUp(0.20)} style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.8rem,9vw,7.2rem)", fontWeight:700, lineHeight:1.0, marginBottom:16, letterSpacing:"-0.01em", background:"linear-gradient(135deg, #E8A84A, #C8801A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Animal Welfare
          </motion.h2>
          <motion.p {...fadeUp(0.26)} style={{ fontFamily:"var(--f-body)", fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.50)", marginBottom:16 }}>
            — Compassion For Every Life —
          </motion.p>
          <motion.p {...fadeUp(0.30)} style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", fontWeight:300, color:"rgba(255,255,255,0.68)", lineHeight:1.7, maxWidth:520, margin:"0 auto 40px" }}>
            Founded by <strong style={{ color:"rgba(255,255,255,0.90)", fontWeight:600 }}>Shivajee Vishen</strong> — feeding cows, protecting dogs, empowering girls, educating children, keeping NGOs alive.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.36)} style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:36 }}>
            <Link to="/registration">
              <motion.span className="btn btn-amber btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
                <Heart style={{ width:18, height:18, fill:"white" }} /> Donate Now
              </motion.span>
            </Link>
            <Link to="/ourwork">
              <motion.span className="btn btn-ghost btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                Our Programmes <ArrowRight style={{ width:18, height:18 }} />
              </motion.span>
            </Link>
          </motion.div>

          {/* Social */}
          <motion.div {...fadeUp(0.42)} style={{ display:"flex", justifyContent:"center", gap:10 }}>
            {[FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp].map((Icon,i) => (
              <motion.a key={i} href="#"
                style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.25s" }}
                whileHover={{ scale:1.15, y:-3, background:"rgba(255,255,255,0.16)" }} transition={{ type:"spring", stiffness:380 }}>
                <Icon style={{ color:"rgba(255,255,255,0.70)", fontSize:"0.9rem" }} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:10 }}
          animate={{ y:[0,7,0] }} transition={{ duration:2.2, repeat:Infinity }}>
          <span style={{ fontFamily:"var(--f-body)", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.30)" }}>Scroll</span>
          <ArrowDown style={{ width:16, height:16, color:"rgba(255,255,255,0.28)" }} />
        </motion.div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <div style={{ background:"var(--c-forest)", padding:"14px 0", overflow:"hidden", borderTop:"2px solid rgba(200,128,26,0.25)", borderBottom:"2px solid rgba(200,128,26,0.25)" }}>
        <div className="marquee-inner">
          {[...Array(2)].map((_,o) => (
            <div key={o} style={{ display:"flex", flexShrink:0 }}>
              {["🐄  7,000+ Cows Fed Daily","🐕  5,000+ Dogs Protected","💜  1,200+ Girls Helped","📚  500+ Students Supported","🌳  Tree Plantation Drive","⚽  Youth Kickstart Programme","🏥  NGO Life Support","❤  Compassion For Every Life"].map((t,i) => (
                <span key={i} style={{ fontFamily:"var(--f-body)", fontSize:"0.82rem", fontWeight:500, letterSpacing:"0.06em", color:"rgba(255,255,255,0.75)", padding:"4px 36px", borderRight:"1px solid rgba(255,255,255,0.10)", whiteSpace:"nowrap" }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ STATS ═══════════ */}
      <section style={{ padding:"88px 0", background:"linear-gradient(160deg, var(--c-pale) 0%, #F2FAF5 100%)" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Real Impact</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.2rem)", fontWeight:700, color:"var(--c-bark)" }}>
              By The <span className="text-green-grad">Numbers</span>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:20 }}>
            {STATS.map((s,i) => <StatCard key={i} {...s} delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <style>{`
        .about-section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-section-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .about-mosaic-col {
            display: none !important;
          }
        }
      `}</style>
      <section style={{ padding:"96px 0", background:"white" }}>
        <div className="section-container">
          <div className="about-section-grid">
            {/* Text */}
            <motion.div initial={{ opacity:0, x:-36 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}>
              <p className="section-label" style={{ marginBottom:18 }}>Who We Are</p>
              <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:700, color:"var(--c-bark)", lineHeight:1.15, marginBottom:20 }}>
                United, We Stand<br /><span className="text-green-grad">For Every Life</span>
              </h2>
              <p style={{ fontFamily:"var(--f-body)", fontSize:"1.02rem", color:"var(--c-bark-muted)", lineHeight:1.8, letterSpacing:"0.005em", marginBottom:16 }}>
                <strong style={{ color:"var(--c-forest)" }}>United for Animal Welfare</strong> is a registered Public Trust (Rajasthan, 2026) founded by <strong>Shivajee Vishen</strong>. Every day, our teams feed 7,000+ street cows, care for 5,000+ dogs, and distribute hygiene kits to girls in slums.
              </p>
              <p style={{ fontFamily:"var(--f-body)", fontSize:"1.02rem", color:"var(--c-bark-muted)", lineHeight:1.8, letterSpacing:"0.005em", marginBottom:28 }}>
                We also fight for the survival of animal NGOs on the verge of collapse — because when they shut down, hundreds of animals lose their only source of care.
              </p>

              <div className="trust-card" style={{ marginBottom:28 }}>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--c-amber)", marginBottom:14 }}>Trust Details</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 20px" }}>
                  {[["Name","United for Animal Welfare"],["Type","Public Trust / NPO"],["Registered","Rajasthan, 2026"],["Founder","Shivajee Vishen"]].map(([k,v]) => (
                    <div key={k}>
                      <p style={{ fontSize:"0.72rem", color:"var(--c-bark-muted)", marginBottom:2 }}>{k}</p>
                      <p style={{ fontSize:"0.85rem", fontWeight:600, color:"var(--c-bark)" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/about">
                <motion.span className="btn btn-primary" style={{ display:"inline-flex" }} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                  Learn More <ArrowRight style={{ width:16, height:16 }} />
                </motion.span>
              </Link>
            </motion.div>

            {/* Mosaic */}
            <motion.div initial={{ opacity:0, x:36 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
              className="about-mosaic-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"180px 180px", gap:14 }}>
              {[
                { src:"/programmes/feeding.jpeg",     span:true  },
                { src:"/programmes/collar.jpeg",      span:false },
                { src:"/programmes/education.jpeg",   span:false },
              ].map(({src,span},i) => (
                <div key={i} style={{ gridRow: span ? "span 2" : "auto", borderRadius:"var(--r-xl)", overflow:"hidden" }}>
                  <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 25%", display:"block", transition:"transform 0.6s var(--ease-out)" }}
                    onMouseEnter={e => e.target.style.transform="scale(1.06)"}
                    onMouseLeave={e => e.target.style.transform="scale(1)"} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ PROGRAMMES ═══════════ */}
      <section style={{ padding:"96px 0", background:"var(--c-cream)" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>What We Do</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.2rem)", fontWeight:700, color:"var(--c-bark)", marginBottom:12 }}>
              Our <span className="text-amber-grad">Programmes</span>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", color:"var(--c-bark-muted)", maxWidth:440, margin:"0 auto" }}>Real work, on the ground, every single day.</p>
          </div>

          <motion.div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:28 }}
            variants={staggerWrap} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            {PROGRAMMES.map((p,i) => (
              <motion.article key={i} variants={staggerChild} className="prog-card">
                <div className="prog-card__img">
                  {p.img
                    ? <img src={p.img} alt={p.title} />
                    : <div className="prog-card__img-placeholder">{p.icon}</div>
                  }
                </div>
                <div className="prog-card__body">
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
                    <h3 className="prog-card__title" style={{ flex:1, marginRight:8 }}>{p.title}</h3>
                    <span style={{ fontSize:"1.6rem", flexShrink:0 }}>{p.icon}</span>
                  </div>
                  <p className="prog-card__desc">{p.desc}</p>
                  <div className="prog-card__stat">
                    <span className="prog-card__stat-num">{p.stat}</span>
                    <span className="prog-card__stat-label">{p.statLabel}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ URGENT ═══════════ */}
      <section className="urgent-bg" style={{ padding:"96px 0" }}>
        <div className="section-container" style={{ position:"relative", zIndex:1 }}>
          <motion.div style={{ textAlign:"center", maxWidth:780, margin:"0 auto" }}
            initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}>
            <span className="badge badge-amber" style={{ marginBottom:24, display:"inline-flex" }}>⚠ Urgent Need</span>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:700, color:"white", lineHeight:1.15, marginBottom:20 }}>
              NGOs Are Closing.<br />
              <span style={{ color:"#E8A84A" }}>Animals Are Losing Their Last Hope.</span>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", lineHeight:1.75, marginBottom:40, maxWidth:560, margin:"0 auto 40px" }}>
              Dozens of animal welfare NGOs across India face imminent shutdown. Led by <strong style={{ color:"white" }}>Hardik Visaria</strong> and <strong style={{ color:"white" }}>Abhishek Soni</strong>, we're working round-the-clock to keep every one alive.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
              <Link to="/registration">
                <motion.span className="btn btn-amber btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>Donate to Save an NGO</motion.span>
              </Link>
              <Link to="/ngos">
                <motion.span className="btn btn-ghost btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.03 }}>See Affected NGOs</motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section style={{ padding:"96px 0", background:"white" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Voices of Change</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,5vw,3.2rem)", fontWeight:700, color:"var(--c-bark)" }}>
              What People <span className="text-green-grad">Say</span>
            </h2>
          </div>
          <motion.div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:24 }}
            variants={staggerWrap} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            {TESTIMONIALS.map((t,i) => (
              <motion.div key={i} variants={staggerChild} className="testi-card">
                <div className="testi-card__quote-mark">"</div>
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__footer">
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div className="testi-card__avatar">{t.av}</div>
                    <div>
                      <p style={{ fontFamily:"var(--f-body)", fontSize:"0.875rem", fontWeight:700, color:"var(--c-bark)", marginBottom:2 }}>{t.name}</p>
                      <p style={{ fontFamily:"var(--f-body)", fontSize:"0.75rem", color:"var(--c-bark-muted)" }}>{t.role}</p>
                    </div>
                  </div>
                  <div className="testi-card__stars">★★★★★</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding:"96px 0", background:"var(--c-cream)" }}>
        <div className="section-container" style={{ textAlign:"center" }}>
          <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}>
            <div style={{ width:88, height:88, borderRadius:20, overflow:"hidden", margin:"0 auto 28px", boxShadow:"var(--sh-lg)", border:"3px solid white" }}>
              <img src="/logo.jpeg" alt="United for Animal Welfare" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <p className="section-label" style={{ justifyContent:"center", marginBottom:16 }}>Join Us Today</p>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2rem,5vw,3.2rem)", fontWeight:700, color:"var(--c-bark)", lineHeight:1.2, marginBottom:18, maxWidth:560, margin:"0 auto 18px" }}>
              Be the Reason an <span className="text-green-grad">Animal Survives Today</span>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", color:"var(--c-bark-muted)", lineHeight:1.75, maxWidth:480, margin:"0 auto 40px" }}>
              A small donation keeps our feeding drives running, funds a rescue operation, or ensures a girl in a slum receives her hygiene kit.
            </p>
            <Link to="/registration">
              <motion.span className="btn btn-amber btn-lg" style={{ display:"inline-flex", fontSize:"1.1rem" }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
                <Heart style={{ width:20, height:20, fill:"white" }} /> Donate Now
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
