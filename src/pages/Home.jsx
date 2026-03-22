import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { ArrowRight, ArrowDown, Heart } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* ── HERO IMAGES ── */
const HERO_IMAGES = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
];

/* ── DATA ── */
const PROGRAMMES = [
  { id:"cow-feeding", title:"Cow Feeding",               desc:"We have fed more than 7000 cow till date across Rajasthan with nutrition drives, ensuring no sacred animal goes hungry.",                         icon:"🐄", img:"/programmes/feeding.jpeg",     stat:"7,000+", statLabel:"Cows Fed" },
  { id:"dog-care", title:"Dog Care & Radium Collars", desc:"Cared for 5,000+ stray dogs and fitting them with glow-in-the-dark radium collar belts to save them from road accidents at night.",               icon:"🐕", img:"/programmes/dog-care-new.jpg",      stat:"5,000+", statLabel:"Dogs Protected" },
  { id:"girls-hygiene", title:"Girls' Hygiene",            desc:" 1200+ girls helped with sanitary hygiene pads in slum areas till now.",                               icon:"💜", img:"/programmes/hygiene-cover.jpg",     stat:"1,200+", statLabel:"Girls Supported" },
  { id:"education", title:"Education",                 desc:"Providing books, stationery and geometric boxes to underprivileged students so no child is denied the right to learn.",                             icon:"📚", img:"/programmes/education.jpeg",   stat:"500+",   statLabel:"Students Helped" },
  { id:"plantation", title:"Environment & Plantation",  desc:"Plantation drives to combat climate change, deforestation and pollution — building greener, healthier communities across Rajasthan.",               icon:"🌳", img:"/programmes/environment-new.jpg", stat:"Active",  statLabel:"Campaign" },
  { id:"youth-kickstart", title:"Youth Kickstart Programme",  desc:"Running for 4–5 years, we support talented youth from financially challenged backgrounds — providing sports training, education, accommodation and nutrition. Proud sponsors of Jaipur City Football Club.", icon:"⚽", img:"/programmes/youth.jpeg", stat:"4–5 Yrs", statLabel:"Running Strong" },
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
      <p style={{ fontFamily:"var(--f-number)", fontSize:"2.8rem", fontWeight:800, color:"#111827", lineHeight:1, letterSpacing:"-0.03em" }}>
        {inView ? <CountUp end={n} duration={2.2} separator="," /> : "0"}
        <span style={{ fontSize:"1.6rem", fontWeight:700, color:"#F3842C", marginLeft:2 }}>{suf}</span>
      </p>
      <p style={{ fontSize:"0.82rem", fontWeight:500, color:"var(--c-bark-muted)", marginTop:8, letterSpacing:"0.02em", textTransform:"uppercase" }}>{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const textY = useTransform(scrollYProgress, [0,1], ["0%","14%"]);
  const opacity = useTransform(scrollYProgress, [0,0.75], [1,0]);

  /* ── Background image slideshow state ── */
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(interval);
  }, []);

  /* Preload images */
  useEffect(() => {
    HERO_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div style={{ background:"var(--c-cream)" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} style={{ position:"relative", height:"100vh", minHeight:"650px", maxHeight:"1000px", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", paddingTop:"80px" }}>

        {/* ── Background Image Slideshow ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <img
              src={HERO_IMAGES[currentSlide]}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
                display: "block",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Dark Overlay ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.70) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }} />

        {/* ── Vignette edges ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.45)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* ── Subtle orange glow accent ── */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "radial-gradient(ellipse at top right, rgba(243,132,44,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 2,
        }} />



        {/* ── Hero Content ── */}
        <motion.div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"0 24px", maxWidth:900, width:"100%", margin:"0 auto", y:textY, opacity }} >



          {/* Badge */}
          <motion.div {...fadeUp(0.07)} style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
            <span className="badge badge-white" style={{ fontSize:"0.65rem" }}>
              Registered Public Trust · Rajasthan 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.14)} style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.5rem,8vw,6.5rem)", fontWeight:700, color:"white", lineHeight:0.95, marginBottom:6, letterSpacing:"-0.01em", textShadow:"0 4px 30px rgba(0,0,0,0.4)" }}>
            United For
          </motion.h1>
          <motion.h2 {...fadeUp(0.20)} style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.2rem,7.5vw,5.8rem)", fontWeight:700, lineHeight:1.0, marginBottom:16, letterSpacing:"-0.01em", background:"linear-gradient(135deg, #F3842C, #F59E4B)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"drop-shadow(0 2px 10px rgba(243,132,44,0.3))" }}>
            Animal Welfare
          </motion.h2>
          <motion.p {...fadeUp(0.26)} style={{ fontFamily:"var(--f-body)", fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:16 }}>
            — Compassion For Every Life —
          </motion.p>
          <motion.p {...fadeUp(0.30)} style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", fontWeight:300, color:"rgba(255,255,255,0.75)", lineHeight:1.7, maxWidth:520, margin:"0 auto 24px", textShadow:"0 2px 8px rgba(0,0,0,0.3)" }}>
            Founded by <strong style={{ color:"rgba(255,255,255,0.95)", fontWeight:600 }}>Shivajee Vishen</strong> — feeding cows, protecting dogs, empowering girls, educating children, keeping NGOs alive.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.36)} style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:40 }}>
            <Link to="/registration">
              <motion.span className="btn btn-amber btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
                <Heart style={{ width:18, height:18, fill:"white" }} /> Donate Now
              </motion.span>
            </Link>
            <Link to="/ourwork">
              <motion.span className="btn btn-ghost btn-lg" style={{ display:"inline-flex", backdropFilter:"blur(12px)", background:"rgba(255,255,255,0.08)" }} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                Our Programmes <ArrowRight style={{ width:18, height:18 }} />
              </motion.span>
            </Link>
          </motion.div>

          {/* Bottom Actions: Slide Dots + Social */}
          <motion.div {...fadeUp(0.42)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
            
            {/* Slide indicator dots */}
            <div style={{ display: "flex", gap: 10 }}>
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: currentSlide === idx ? 28 : 10,
                    height: 10,
                    borderRadius: 99,
                    border: "none",
                    background: currentSlide === idx ? "#F3842C" : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    boxShadow: currentSlide === idx ? "0 0 12px rgba(243,132,44,0.5)" : "none",
                  }}
                />
              ))}
            </div>

            {/* Social */}
            {/* <div style={{ display:"flex", justifyContent:"center", gap:10 }}>
              {[FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp].map((Icon,i) => (
                <motion.a key={i} href="#"
                  style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.25s" }}
                  whileHover={{ scale:1.15, y:-3, background:"rgba(255,255,255,0.20)" }} transition={{ type:"spring", stiffness:380 }}>
                  <Icon style={{ color:"rgba(255,255,255,0.80)", fontSize:"0.9rem" }} />
                </motion.a>
              ))}
            </div> */}
          </motion.div>
        </motion.div>
      </section>
      {/* ═══════════ MARQUEE ═══════════ */}
      <div style={{ background:"#F3842C", padding:"14px 0", overflow:"hidden", borderTop:"2px solid rgba(255,255,255,0.15)", borderBottom:"2px solid rgba(255,255,255,0.15)" }}>
        <div className="marquee-inner">
          {[...Array(2)].map((_,o) => (
            <div key={o} style={{ display:"flex", flexShrink:0 }}>
              {["🐄  7,000+ Cows Fed","🐕  5,000+ Dogs Protected","💜  1,200+ Girls Helped","📚  500+ Students Supported","🌳  Tree Plantation Drive","⚽  Youth Kickstart Programme","🏥  NGO Life Support","❤  Compassion For Every Life"].map((t,i) => (
                <span key={i} style={{ fontFamily:"var(--f-body)", fontSize:"0.82rem", fontWeight:500, letterSpacing:"0.06em", color:"rgba(255,255,255,0.90)", padding:"4px 36px", borderRight:"1px solid rgba(255,255,255,0.20)", whiteSpace:"nowrap" }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ STATS ═══════════ */}
      <section style={{ padding:"40px 0 60px", background:"linear-gradient(160deg, #FFF4EB 0%, #FFFFFF 100%)" }}>
        <div className="section-container">
          <div style={{ textAlign:"center", marginBottom:32 }}>
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
                <strong style={{ color:"#F3842C" }}>United for Animal Welfare</strong> is a registered Public Trust (Rajasthan, 2026) founded by <strong>Shivajee Vishen</strong>. Our team has fed 7,000+ street cows, cared for 5,000+ dogs, and distributed hygiene kits to girls in slums.
              </p>


              <div className="trust-card" style={{ marginBottom:28 }}>
                <p style={{ fontFamily:"var(--f-body)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#F3842C", marginBottom:14 }}>Trust Details</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 20px" }}>
                  {[["Name","United for Animal Welfare"],["Type","Public Trust / NPO"],["Registered","Jaipur, Rajasthan, 2026"],["Founder","Shivajee Vishen"]].map(([k,v]) => (
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
              <Link to={`/ourwork/${p.id}`} key={i} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                <motion.article variants={staggerChild} className="prog-card" style={{ height: "100%" }}>
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
              </Link>
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
              <span style={{ color:"#F3842C" }}>Animals Are Losing Their Last Hope.</span>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", lineHeight:1.75, marginBottom:40, maxWidth:560, margin:"0 auto 40px" }}>
              Dozens of animal welfare NGOs across India face imminent shutdown. Led by <strong style={{ color:"white" }}>Hardik Visaria</strong> and <strong style={{ color:"white" }}>Abhishek Soni</strong>, we're working round-the-clock to keep every one alive.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
              <Link to="/registration">
                <motion.span className="btn btn-amber btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>Donate to Save an NGO</motion.span>
              </Link>
              <Link to="/ourwork">
                <motion.span className="btn btn-ghost btn-lg" style={{ display:"inline-flex" }} whileHover={{ scale:1.03 }}>Learn More</motion.span>
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
