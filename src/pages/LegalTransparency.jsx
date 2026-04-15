import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  ExternalLink,
  ChevronDown,
  Award,
  Building2,
  Scale,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Eye,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* ── DOCUMENT DATA ── */
const DOCUMENTS = [
  {
    id: "san-cert",
    title: "Sanstha Aadhaar Number (SAN)",
    description:
      "Official Sanstha Aadhaar Number issued by the Government, confirming our registration and identity as a recognised non-profit organisation.",
    icon: Award,
    url: "https://drive.google.com/file/d/1Ej8uMK6pVcy6-ijqihMhIS4utwQG14qm/view?usp=sharing",
    issuedBy: "Government of India",
  },
  {
    id: "12a-cert",
    title: "12A Certificate",
    description:
      "Tax exemption certificate under Section 12A of the Income Tax Act, verifying our status as a charitable trust.",
    icon: FileText,
    url: "https://drive.google.com/file/d/1H5M2n8eql45e2M6DiHxAakvwAufoBoah/view?usp=sharing",
    issuedBy: "Income Tax Department",
  },
  {
    id: "80g-cert",
    title: "80G Certificate",
    description:
      "Certificate under Section 80G, enabling donors to claim tax deductions on their donations to our organisation.",
    icon: Scale,
    url: "https://drive.google.com/file/d/19P35D-Nb8NnKmXgNKptZEEkGB-MIOwbF/view?usp=sharing",
    issuedBy: "Income Tax Department",
  },
  {
    id: "pan-card",
    title: "PAN Card",
    description:
      "Permanent Account Number card issued to the organisation, used for all financial and tax-related purposes.",
    icon: Building2,
    url: "https://drive.google.com/file/d/1FbvtqmWb6SZMDnZR8bYYUfuqEiL7hU8P/view?usp=sharing",
    issuedBy: "Income Tax Department",
  },
  {
    id: "darpan-profile",
    title: "Darpan Registration Profile",
    description:
      "Our organisation's registration profile on the NGO Darpan portal (NITI Aayog), verifying our legitimacy as a registered NGO in India.",
    icon: FileText,
    url: "https://drive.google.com/file/d/1WpBei81cdpnf72uU3d0tYIOmq4UCl0BE/view?usp=sharing",
    issuedBy: "NITI Aayog",
  },
];

/* ── TRUST BADGES ── */
const BADGES = [
  { icon: ShieldCheck, label: "Govt. Registered NGO" },
  { icon: Scale, label: "Tax Exempt (80G)" },
  { icon: Award, label: "12A Certified" },
  { icon: CheckCircle2, label: "100% Transparent" },
];

/* ── DOCUMENT CARD ── */
function DocumentCard({ doc, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = doc.icon;
  const docUrl = doc.url;
  const fileId = doc.url.match(/\/d\/([^/]+)/)?.[1];
  const downloadUrl = fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : doc.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "white",
        borderRadius: 22,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        overflow: "hidden",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      whileHover={{
        boxShadow: "0 12px 40px rgba(243,132,44,0.12)",
        borderColor: "rgba(243,132,44,0.2)",
      }}
    >
      {/* Card Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "22px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(243,132,44,0.1)",
          }}
        >
          <Icon style={{ width: 22, height: 22, color: "#F3842C" }} />
        </div>

        {/* Title & Meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 650,
              color: "var(--c-bark)",
              marginBottom: 2,
              lineHeight: 1.3,
            }}
          >
            {doc.title}
          </h3>
          {doc.issuedBy && (
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "var(--c-bark-muted)",
              }}
            >
              Issued by: {doc.issuedBy}
            </p>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown style={{ width: 18, height: 18, color: "#F3842C" }} />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 24px 24px",
                borderTop: "1px solid rgba(0,0,0,0.05)",
                paddingTop: 18,
              }}
            >
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  color: "var(--c-bark-muted)",
                  lineHeight: 1.7,
                  marginBottom: 18,
                }}
              >
                {doc.description}
              </p>

              {doc.issueDate && (
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.78rem",
                    color: "var(--c-bark-muted)",
                    marginBottom: 16,
                  }}
                >
                  <strong>Date of Issue:</strong> {doc.issueDate}
                </p>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "white",
                      background: "linear-gradient(135deg, #F3842C, #E67E22)",
                      padding: "9px 18px",
                      borderRadius: 10,
                      boxShadow: "0 3px 12px rgba(243,132,44,0.25)",
                      cursor: "pointer",
                    }}
                  >
                    <Eye style={{ width: 14, height: 14 }} />
                    View Document
                  </motion.span>
                </a>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#F3842C",
                      background: "#FFF4EB",
                      border: "1px solid rgba(243,132,44,0.2)",
                      padding: "9px 18px",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    <ExternalLink style={{ width: 14, height: 14 }} />
                    Download
                  </motion.span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── MAIN PAGE ── */
export default function LegalTransparency() {
  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            className="section-label"
            style={{
              justifyContent: "center",
              color: "var(--c-amber-light)",
              marginBottom: 12,
            }}
          >
            Transparency
          </p>
          <h1
            style={{
              fontFamily: "var(--f-display)",
              fontSize: "clamp(2.2rem,5vw,3.8rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: 14,
            }}
          >
            Legal & <span style={{ color: "#F3842C" }}>Transparency</span>
          </h1>
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <p
            style={{
              fontFamily: "var(--f-body)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.58)",
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            We believe in complete transparency. Verify our credentials and legal
            documents before donating.
          </p>
        </div>
      </div>

      {/* ── TRUST BADGES ── */}
      <div
        className="section-container"
        style={{ paddingTop: 56, paddingBottom: 0, maxWidth: 900 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
          }}
        >
          {BADGES.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "white",
                border: "1px solid rgba(243,132,44,0.15)",
                borderRadius: 99,
                padding: "10px 20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              <b.icon
                style={{ width: 16, height: 16, color: "#F3842C" }}
              />
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--c-bark)",
                  letterSpacing: "0.01em",
                }}
              >
                {b.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── INTRO SECTION ── */}
      <div
        className="section-container"
        style={{ paddingTop: 48, paddingBottom: 0, maxWidth: 760 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "white",
            borderRadius: 22,
            padding: "32px 32px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
              boxShadow: "0 4px 16px rgba(243,132,44,0.12)",
            }}
          >
            <ShieldCheck style={{ width: 28, height: 28, color: "#F3842C" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--f-display)",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--c-bark)",
              marginBottom: 10,
              lineHeight: 1.25,
            }}
          >
            Your Trust Matters to Us
          </h2>
          <div
            style={{
              width: 48,
              height: 3,
              background: "linear-gradient(90deg, #F3842C, #F59E4B)",
              borderRadius: 2,
              margin: "0 auto 16px",
            }}
          />
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.95rem",
              color: "var(--c-bark-muted)",
              lineHeight: 1.75,
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            <strong>United for Animal Welfare</strong> is a legally registered
            non-profit organisation. Below you can view and download all our
            official documents — registration certificates, tax exemption
            certificates, and more. We encourage every donor to verify our
            credentials before making a contribution.
          </p>
        </motion.div>
      </div>

      {/* ── DOCUMENTS GRID ── */}
      <div
        className="section-container"
        style={{ paddingTop: 40, paddingBottom: 24, maxWidth: 760 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: 24 }}
        >
          Our Legal Documents
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {DOCUMENTS.map((doc, i) => (
            <DocumentCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>
      </div>

      {/* ── NOTE ABOUT ADDING DOCUMENTS ── */}
      <div
        className="section-container"
        style={{ paddingTop: 20, paddingBottom: 0, maxWidth: 760 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#FFF8ED",
            border: "1px solid rgba(243,132,44,0.15)",
            borderRadius: 14,
            padding: "16px 22px",
          }}
        >
          <Heart
            style={{
              width: 18,
              height: 18,
              color: "#F3842C",
              fill: "#F3842C",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#8B5E3C",
              lineHeight: 1.55,
            }}
          >
            All documents are verified and up to date. If you have any questions
            regarding our legal status, please{" "}
            <Link
              to="/contact"
              style={{
                color: "#F3842C",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              contact us
            </Link>
            .
          </p>
        </motion.div>
      </div>

      {/* ── CTA SECTION ── */}
      <div
        className="section-container"
        style={{ paddingTop: 36, paddingBottom: 80, maxWidth: 760 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Link to="/registration" style={{ textDecoration: "none" }}>
            <motion.span
              className="btn btn-amber"
              style={{ display: "inline-flex", fontSize: "0.88rem" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Heart style={{ width: 16, height: 16, fill: "white" }} />
              Verified? Donate Now
            </motion.span>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
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
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Back to Home
            </motion.span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
