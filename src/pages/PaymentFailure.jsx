import React from "react";
import { motion } from "framer-motion";
import { XCircle, RefreshCw, ArrowLeft, Phone, Mail, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function PaymentFailure() {
  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(155deg, #7F1D1D 0%, #991B1B 45%, #B91C1C 100%)", position: "relative", overflow: "hidden", paddingTop: 152, paddingBottom: 80, textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at top right, rgba(239,68,68,0.2) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="section-label" style={{ justifyContent: "center", color: "#FCA5A5", marginBottom: 12 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#FCA5A5", borderRadius: 2, marginRight: 10 }} />Payment Failed
          </p>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            Payment <span style={{ color: "#FCA5A5" }}>Unsuccessful</span>
          </h1>
          <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #EF4444, #FCA5A5)", borderRadius: 2, margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 460, margin: "0 auto" }}>
            Don't worry — no amount has been deducted. Please try again.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 560 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "white", borderRadius: 28, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>

          {/* Error Icon */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.3 }}
              style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(145deg, #FEF2F2, #FEE2E2)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 36px rgba(239,68,68,0.15)", border: "2px solid rgba(239,68,68,0.12)" }}>
              <XCircle style={{ width: 48, height: 48, color: "#EF4444" }} />
            </motion.div>
            <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.65rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 20, marginBottom: 6 }}>Payment Failed</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #EF4444, #FCA5A5)", borderRadius: 2, margin: "0 auto 10px" }} />
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", color: "var(--c-bark-muted)", lineHeight: 1.7, maxWidth: 380, margin: "0 auto" }}>
              Your payment could not be processed. This could be due to network issues, insufficient balance, or a temporary bank error.
            </p>
          </div>

          {/* Tips */}
          <div style={{ background: "#FFFBEB", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(245,158,11,0.15)", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <AlertTriangle style={{ width: 16, height: 16, color: "#F59E0B" }} />
              <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: "0.06em" }}>What you can do</span>
            </div>
            {["Check your internet connection and try again", "Ensure sufficient balance in your account", "Try a different payment method", "If money was deducted, it will be refunded within 5-7 days"].map((tip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0" }}>
                <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 700, color: "#F59E0B", marginTop: 1 }}>•</span>
                <span style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "#78350F", lineHeight: 1.55 }}>{tip}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Link to="/registration" style={{ textDecoration: "none", width: "100%" }}>
              <motion.span className="btn btn-amber" style={{ display: "flex", justifyContent: "center", fontSize: "0.92rem", width: "100%" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <RefreshCw style={{ width: 16, height: 16 }} /> Try Again
              </motion.span>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none", width: "100%" }}>
              <motion.span className="btn" style={{ display: "flex", justifyContent: "center", fontSize: "0.88rem", width: "100%", background: "transparent", color: "var(--c-bark-muted)", border: "2px solid var(--c-sand-light)" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Phone style={{ width: 16, height: 16 }} /> Contact Support
              </motion.span>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <motion.span style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--c-bark-muted)", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }} whileHover={{ color: "#F3842C" }}>
                <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Home
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
