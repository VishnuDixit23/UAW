import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Heart, ArrowLeft, Download, Copy, Check, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.button onClick={copy} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      style={{ background: copied ? "#ECFDF5" : "#FFF4EB", border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(243,132,44,0.2)"}`, borderRadius: 8, padding: "5px 10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
      {copied ? <Check style={{ width: 13, height: 13, color: "#10B981" }} /> : <Copy style={{ width: 13, height: 13, color: "#F3842C" }} />}
      <span style={{ fontFamily: "var(--f-body)", fontSize: "0.7rem", fontWeight: 600, color: copied ? "#10B981" : "#F3842C" }}>{copied ? "Copied!" : "Copy"}</span>
    </motion.button>
  );
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const txnid = searchParams.get("txnid") || "N/A";
  const amount = searchParams.get("amount") || "0";
  const [confetti, setConfetti] = useState(true);

  useEffect(() => { const t = setTimeout(() => setConfetti(false), 4000); return () => clearTimeout(t); }, []);

  const confettiPieces = Array(30).fill(null).map((_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 2,
    duration: 2 + Math.random() * 2, color: ["#F3842C", "#F59E4B", "#10B981", "#F7B267", "#E67E22", "#34D399"][i % 6],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* Confetti Overlay */}
      {confetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
          {confettiPieces.map((p) => (
            <motion.div key={p.id}
              initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", opacity: 0, rotate: 360 + Math.random() * 360 }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              style={{ position: "absolute", width: p.size, height: p.size, borderRadius: p.id % 3 === 0 ? "50%" : 2, background: p.color }} />
          ))}
        </div>
      )}

      {/* Hero */}
      <div style={{ background: "linear-gradient(155deg, #064E3B 0%, #065F46 45%, #047857 100%)", position: "relative", overflow: "hidden", paddingTop: 152, paddingBottom: 80, textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at top right, rgba(16,185,129,0.2) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="section-label" style={{ justifyContent: "center", color: "#6EE7B7", marginBottom: 12 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#6EE7B7", borderRadius: 2, marginRight: 10 }} />Payment Successful
          </p>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            Thank You <span style={{ color: "#6EE7B7" }}>For Your Kindness</span>
          </h1>
          <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #10B981, #34D399)", borderRadius: 2, margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.65)", maxWidth: 460, margin: "0 auto" }}>
            Your donation has been received and will go directly towards saving animal lives.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 580 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "white", borderRadius: 28, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>

          {/* Success Icon */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.3 }}
              style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(145deg, #ECFDF5, #D1FAE5)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 36px rgba(16,185,129,0.2)", border: "2px solid rgba(16,185,129,0.15)" }}>
              <CheckCircle style={{ width: 48, height: 48, color: "#10B981" }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.65rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 20, marginBottom: 6 }}>Payment Successful!</h2>
              <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #10B981, #34D399)", borderRadius: 2, margin: "0 auto 10px" }} />
            </motion.div>
          </div>

          {/* Amount */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
            style={{ background: "linear-gradient(145deg, #ECFDF5, #F0FDF4)", borderRadius: 18, padding: "24px", textAlign: "center", border: "1px solid rgba(16,185,129,0.15)", marginBottom: 24 }}>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", fontWeight: 600, color: "#059669", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Amount Donated</p>
            <p style={{ fontFamily: "var(--f-number)", fontSize: "2.8rem", fontWeight: 800, color: "#065F46", lineHeight: 1.1 }}>₹{parseFloat(amount).toLocaleString("en-IN")}</p>
          </motion.div>

          {/* Transaction Info */}
          <div style={{ background: "#FAFAF8", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(0,0,0,0.04)", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--c-bark-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Transaction ID</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.9rem", fontWeight: 500, color: "var(--c-bark)", letterSpacing: "0.03em" }}>{txnid}</span>
                <CopyBtn text={txnid} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--c-bark-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</span>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", fontWeight: 700, color: "#10B981", background: "#ECFDF5", padding: "4px 12px", borderRadius: 8, border: "1px solid rgba(16,185,129,0.2)" }}>✓ Success</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--c-bark-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Purpose</span>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 500, color: "var(--c-bark)" }}>Animal Welfare Donation</span>
            </div>
          </div>

          {/* Message */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "#FFF8ED", border: "1px solid rgba(243,132,44,0.15)", borderRadius: 14, padding: "14px 20px", marginBottom: 24 }}>
            <Sparkles style={{ width: 18, height: 18, color: "#F3842C", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", fontWeight: 500, color: "#8B5E3C", lineHeight: 1.5 }}>
              Your kindness helps feed and care for stray animals. Every rupee makes a difference! 🐾
            </span>
          </motion.div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Link to="/registration" style={{ textDecoration: "none", width: "100%" }}>
              <motion.span className="btn btn-amber" style={{ display: "flex", justifyContent: "center", fontSize: "0.92rem", width: "100%" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Heart style={{ width: 16, height: 16, fill: "white" }} /> Donate Again
              </motion.span>
            </Link>
            <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
              <motion.span className="btn" style={{ display: "flex", justifyContent: "center", fontSize: "0.88rem", width: "100%", background: "transparent", color: "var(--c-bark-muted)", border: "2px solid var(--c-sand-light)" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Home
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
