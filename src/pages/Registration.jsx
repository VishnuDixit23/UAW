import React from "react";
import { motion } from "framer-motion";
import { Wrench, ArrowLeft, Heart, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Registration() {
  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="section-label" style={{ justifyContent: "center", color: "var(--c-amber-light)", marginBottom: 12 }}>Donate</p>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            <span style={{ color: "#F3842C" }}>Donate</span> & Save a Life
          </h1>
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto" }}>
            Your donation goes directly to animal rescue and keeping NGOs alive.
          </p>
        </div>
      </div>

      {/* ── UNDER MAINTENANCE CARD ── */}
      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 640 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "white",
            borderRadius: 28,
            padding: "60px 44px",
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* Animated Icon */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
              boxShadow: "0 8px 24px rgba(243,132,44,0.15)",
              border: "1px solid rgba(243,132,44,0.12)",
            }}
          >
            <Wrench style={{ width: 40, height: 40, color: "#F3842C" }} />
          </motion.div>

          <h2 style={{
            fontFamily: "var(--f-display)",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "var(--c-bark)",
            marginBottom: 12,
            lineHeight: 1.2,
          }}>
            Under Maintenance
          </h2>

          <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 20px" }} />

          <p style={{
            fontFamily: "var(--f-body)",
            fontSize: "1rem",
            color: "var(--c-bark-muted)",
            lineHeight: 1.75,
            maxWidth: 420,
            margin: "0 auto 12px",
          }}>
            We're currently upgrading our donation system to serve you better. This page will be back up shortly!
          </p>

          <p style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.88rem",
            color: "var(--c-bark-muted)",
            lineHeight: 1.65,
            maxWidth: 400,
            margin: "0 auto 32px",
          }}>
            In the meantime, you can reach out to us directly via our contact page to make a donation or learn more.
          </p>

          {/* Status Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#FFF8ED",
            border: "1px solid rgba(243,132,44,0.2)",
            borderRadius: 99,
            padding: "8px 20px",
            marginBottom: 32,
          }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#F3842C" }}
            />
            <span style={{
              fontFamily: "var(--f-body)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#F3842C",
              letterSpacing: "0.04em",
            }}>
              Maintenance in progress
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact">
              <motion.span
                className="btn btn-amber"
                style={{ display: "inline-flex", fontSize: "0.88rem" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Heart style={{ width: 16, height: 16, fill: "white" }} /> Contact Us to Donate
              </motion.span>
            </Link>
            <Link to="/">
              <motion.span
                className="btn btn-ghost"
                style={{ display: "inline-flex", fontSize: "0.88rem" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
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