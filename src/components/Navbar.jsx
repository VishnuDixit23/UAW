import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to:"/",         label:"Home" },
  { to:"/about",    label:"About" },
  { to:"/team",     label:"Team" },
  { to:"/sponsers", label:"Partners" },
  { to:"/faqs",     label:"FAQs" },
  { to:"/contact",  label:"Contact" },
];
const WORK = [
  { to:"/ourwork", label:"🐾  Rescue & Rehabilitation" },
  { to:"/ngos",    label:"🏥  NGOs We Support" },
];

export default function Navbar() {
  const [open, setOpen]     = useState(false);
  const [drop, setDrop]     = useState(false);
  const [mWork, setMWork]   = useState(false);
  const [solid, setSolid]   = useState(false);
  const [hide, setHide]     = useState(false);
  const prevY               = useRef(0);
  const dropTimer           = useRef(null);
  const loc                 = useLocation();

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setSolid(y > 20);
      if (y > prevY.current + 10 && y > 100) setHide(true);
      if (y < prevY.current - 8) setHide(false);
      prevY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const active   = (p) => loc.pathname === p;
  const workActive = WORK.some(l => loc.pathname === l.to);

  const navLinkStyle = (isActive) => ({
    fontFamily: "var(--f-body)",
    fontWeight: isActive ? 600 : 500,
    fontSize: "0.9rem",
    letterSpacing: "0.01em",
    color: isActive ? "#F3842C" : "#4B5563",
    padding: "8px 16px",
    borderRadius: 10,
    background: isActive ? "#FFF4EB" : "transparent",
    textDecoration: "none",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  });

  return (
    <>
      <motion.header
        animate={{ y: hide ? -100 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: solid ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: solid ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.05)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}>
        {/* Main nav row — taller padding */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", border: "1.5px solid rgba(243,132,44,0.25)", flexShrink: 0 }}>
              <img src="/logo.jpeg" alt="United for Animal Welfare" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "none" }} className="logo-text">
              <p style={{ fontFamily: "var(--f-body)", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.2em", color: "#F3842C", textTransform: "uppercase", lineHeight: 1, marginBottom: 3 }}>United for</p>
              <p style={{ fontFamily: "var(--f-display)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#111827", lineHeight: 1 }}>Animal Welfare</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="desktop-nav">
            {NAV.slice(0, 2).map(l => (
              <Link key={l.to} to={l.to} style={navLinkStyle(active(l.to))}
                onMouseEnter={e => { if (!active(l.to)) { e.currentTarget.style.color = "#F3842C"; e.currentTarget.style.background = "#FFF4EB"; }}}
                onMouseLeave={e => { if (!active(l.to)) { e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.background = "transparent"; }}}>
                {l.label}
              </Link>
            ))}

            {/* Our Work Dropdown */}
            <div style={{ position: "relative" }}
              onMouseEnter={() => { clearTimeout(dropTimer.current); setDrop(true); }}
              onMouseLeave={() => { dropTimer.current = setTimeout(() => setDrop(false), 160); }}>
              <button style={{ ...navLinkStyle(workActive), border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                Our Work
                <ChevronDown style={{ width: 14, height: 14, transition: "transform 0.25s", transform: drop ? "rotate(180deg)" : "none", flexShrink: 0 }} />
              </button>
              <AnimatePresence>
                {drop && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    style={{ position: "absolute", left: 0, top: "100%", paddingTop: 8, zIndex: 100, minWidth: 230 }}>
                    <div style={{ background: "white", borderRadius: 16, boxShadow: "0 12px 40px rgba(0,0,0,0.12)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
                      {WORK.map(l => (
                        <Link key={l.to} to={l.to} onClick={() => setDrop(false)}
                          style={{ display: "block", padding: "12px 20px", fontFamily: "var(--f-body)", fontSize: "0.9rem", fontWeight: 500, color: active(l.to) ? "#F3842C" : "#4B5563", background: active(l.to) ? "#FFF4EB" : "transparent", textDecoration: "none", transition: "all 0.18s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#FFF4EB"; e.currentTarget.style.color = "#F3842C"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = active(l.to) ? "#FFF4EB" : "transparent"; e.currentTarget.style.color = active(l.to) ? "#F3842C" : "#4B5563"; }}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV.slice(2).map(l => (
              <Link key={l.to} to={l.to} style={navLinkStyle(active(l.to))}
                onMouseEnter={e => { if (!active(l.to)) { e.currentTarget.style.color = "#F3842C"; e.currentTarget.style.background = "#FFF4EB"; }}}
                onMouseLeave={e => { if (!active(l.to)) { e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.background = "transparent"; }}}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <Link to="/registration" className="donate-btn" style={{ textDecoration: "none" }}>
              <motion.span
                style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.01em", color: "white", background: "linear-gradient(135deg, #F3842C, #E67E22)", padding: "10px 22px", borderRadius: 12, boxShadow: "0 4px 16px rgba(243,132,44,0.35)", cursor: "pointer", whiteSpace: "nowrap" }}
                whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                ❤&nbsp;Donate Now
              </motion.span>
            </Link>
            <button onClick={() => setOpen(true)} className="burger-btn"
              style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11, background: "#FFF4EB", border: "none", cursor: "pointer" }}>
              <Menu style={{ width: 20, height: 20, color: "#F3842C" }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.50)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />

            <motion.aside
              style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 310, zIndex: 50, overflowY: "auto", background: "white", boxShadow: "var(--sh-xl)" }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}>
              <div style={{ padding: "24px" }}>
                {/* Drawer Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, overflow: "hidden" }}>
                      <img src="/logo.jpeg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--f-body)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", color: "#F3842C", textTransform: "uppercase", marginBottom: 2 }}>United for</p>
                      <p style={{ fontFamily: "var(--f-display)", fontSize: "1rem", fontWeight: 700, color: "#111827", lineHeight: 1 }}>Animal Welfare</p>
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)}
                    style={{ width: 36, height: 36, borderRadius: 9, background: "#FFF4EB", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
                    <X style={{ width: 16, height: 16, color: "#F3842C" }} />
                  </button>
                </div>

                {/* Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {NAV.slice(0, 2).map((l, i) => (
                    <motion.div key={l.to} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link to={l.to} onClick={() => setOpen(false)}
                        style={{ display: "block", padding: "12px 16px", borderRadius: 11, fontFamily: "var(--f-body)", fontWeight: 500, fontSize: "0.95rem", color: active(l.to) ? "#F3842C" : "#4B5563", background: active(l.to) ? "#FFF4EB" : "transparent", textDecoration: "none" }}>
                        {l.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <button onClick={() => setMWork(!mWork)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 11, fontFamily: "var(--f-body)", fontWeight: 500, fontSize: "0.95rem", color: "#4B5563", background: "transparent", border: "none", cursor: "pointer" }}>
                      <span>Our Work</span>
                      <ChevronDown style={{ width: 14, height: 14, transition: "transform 0.25s", transform: mWork ? "rotate(180deg)" : "none" }} />
                    </button>
                    <AnimatePresence>
                      {mWork && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", paddingLeft: 16 }}>
                          {WORK.map(l => (
                            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                              style={{ display: "block", padding: "9px 16px", borderRadius: 9, fontFamily: "var(--f-body)", fontSize: "0.875rem", color: "var(--c-bark-muted)", textDecoration: "none" }}>
                              {l.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {NAV.slice(2).map((l, i) => (
                    <motion.div key={l.to} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (i + 3) * 0.05 }}>
                      <Link to={l.to} onClick={() => setOpen(false)}
                        style={{ display: "block", padding: "12px 16px", borderRadius: 11, fontFamily: "var(--f-body)", fontWeight: 500, fontSize: "0.95rem", color: active(l.to) ? "#F3842C" : "#4B5563", background: active(l.to) ? "#FFF4EB" : "transparent", textDecoration: "none" }}>
                        {l.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
                  <Link to="/registration" onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
                    <motion.span
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "white", background: "linear-gradient(135deg, #F3842C, #E67E22)", padding: "14px", borderRadius: 12, boxShadow: "0 4px 16px rgba(243,132,44,0.35)" }}
                      whileTap={{ scale: 0.97 }}>
                      ❤&nbsp;Donate Now
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Responsive overrides */}
      <style>{`
        @media (min-width: 640px) { .logo-text { display: block !important; } }
        @media (max-width: 960px) { .desktop-nav { display: none !important; } .donate-btn { display: none !important; } }
        @media (min-width: 961px) { .burger-btn { display: none !important; } }
      `}</style>
    </>
  );
}
