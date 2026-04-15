import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Copy, Check, Building2, MapPin, CreditCard, Landmark, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        background: copied ? "#E8F5E9" : "#FFF4EB",
        border: copied ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(243,132,44,0.2)",
        borderRadius: 8,
        padding: "6px 8px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        transition: "all 0.25s ease",
      }}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check style={{ width: 14, height: 14, color: "#4CAF50" }} />
      ) : (
        <Copy style={{ width: 14, height: 14, color: "#F3842C" }} />
      )}
      <span style={{
        fontFamily: "var(--f-body)",
        fontSize: "0.7rem",
        fontWeight: 600,
        color: copied ? "#4CAF50" : "#F3842C",
      }}>
        {copied ? "Copied!" : "Copy"}
      </span>
    </motion.button>
  );
}

function DetailRow({ icon: Icon, label, value, copyable = false, mono = false }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      padding: "18px 0",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
    }}>
      <div style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon style={{ width: 18, height: 18, color: "#F3842C" }} />
      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--c-bark-muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}>
          {label}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <p style={{
            fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Outfit', sans-serif",
            fontSize: mono ? "1.08rem" : "1.1rem",
            fontWeight: mono ? 500 : 600,
            color: "var(--c-bark)",
            lineHeight: 1.45,
            wordBreak: "break-word",
            letterSpacing: mono ? "0.04em" : "0.005em",
          }}>
            {value}
          </p>
          {copyable && <CopyButton text={value} />}
        </div>
      </div>
    </div>
  );
}

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
            Your donation goes directly to animal feeding and care and keeping NGOs alive.
          </p>
        </div>
      </div>

      {/* ── DONATION DETAILS CARD ── */}
      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 680 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "white",
            borderRadius: 28,
            padding: "48px 40px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* Header Icon */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 22,
                background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(243,132,44,0.15)",
                border: "1px solid rgba(243,132,44,0.12)",
              }}
            >
              <Landmark style={{ width: 36, height: 36, color: "#F3842C" }} />
            </motion.div>

            <h2 style={{
              fontFamily: "var(--f-display)",
              fontSize: "1.65rem",
              fontWeight: 700,
              color: "var(--c-bark)",
              marginTop: 20,
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              Bank Transfer Details
            </h2>

            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 10px" }} />

            <p style={{
              fontFamily: "var(--f-body)",
              fontSize: "0.92rem",
              color: "var(--c-bark-muted)",
              lineHeight: 1.65,
              maxWidth: 440,
              margin: "0 auto",
            }}>
              Use the details below to make a direct bank transfer. Every contribution makes a difference!
            </p>
          </div>

          {/* Details */}
          <div style={{
            background: "#FAFAF8",
            borderRadius: 18,
            padding: "8px 24px",
            border: "1px solid rgba(0,0,0,0.04)",
          }}>
            <DetailRow
              icon={Building2}
              label="Organisation Name"
              value="United for Animal Welfare"
            />
            <DetailRow
              icon={CreditCard}
              label="Account Number"
              value="2602221612905715"
              copyable
              mono
            />
            <DetailRow
              icon={Landmark}
              label="IFSC Code"
              value="AUBL0002216"
              copyable
              mono
            />
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              padding: "18px 0",
            }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <MapPin style={{ width: 18, height: 18, color: "#F3842C" }} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--c-bark-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}>
                  Branch Address
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "var(--c-bark)",
                  lineHeight: 1.6,
                }}>
                  Pratap Nagar Jaipur, Ground &amp; First Floor,<br />
                  P. No- 83/141, Haldighati Marg,<br />
                  Sector 8, Pratap Nagar
                </p>
              </div>
            </div>
          </div>

          {/* Trust Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#FFF8ED",
              border: "1px solid rgba(243,132,44,0.15)",
              borderRadius: 14,
              padding: "14px 20px",
              marginTop: 24,
            }}
          >
            <Heart style={{ width: 16, height: 16, color: "#F3842C", fill: "#F3842C" }} />
            <span style={{
              fontFamily: "var(--f-body)",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "#8B5E3C",
              lineHeight: 1.5,
            }}>
              100% of your donation goes directly towards animal welfare — feeding &amp; care.
            </span>
          </motion.div>

          {/* Verify Credentials Link */}
          <Link to="/legal" style={{ textDecoration: "none", display: "block", marginTop: 16 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "rgba(243,132,44,0.05)",
                border: "1px dashed rgba(243,132,44,0.25)",
                borderRadius: 12,
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              <ShieldCheck style={{ width: 16, height: 16, color: "#F3842C" }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#F3842C",
              }}>
                Verify Our Credentials — View Legal Documents
              </span>
            </motion.div>
          </Link>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 20 }}>
            <Link to="/contact">
              <motion.span
                className="btn btn-amber"
                style={{ display: "inline-flex", fontSize: "0.88rem" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Heart style={{ width: 16, height: 16, fill: "white" }} /> Need Help? Contact Us
              </motion.span>
            </Link>
            <Link to="/">
              <motion.span
                className="btn"
                style={{
                  display: "inline-flex",
                  fontSize: "0.88rem",
                  background: "transparent",
                  color: "var(--c-bark-muted)",
                  border: "2px solid var(--c-sand-light)",
                }}
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