import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Lock,
  Truck,
  Scale,
  Heart,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Eye,
  BookOpen,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";

/* ── POLICY SECTIONS DATA ── */
const POLICY_SECTIONS = [
  {
    id: "about-us",
    icon: Users,
    title: "About Us",
    content: (
      <>
        <p className="policy-text">
          <strong>United for Animal Welfare</strong> is a non-profit organization
          dedicated to protecting and improving the lives of animals in need.
        </p>
        <p className="policy-text" style={{ marginTop: 14 }}>
          We actively:
        </p>
        <ul className="policy-list">
          <li>Feed and care for stray animals</li>
          <li>Support underfunded animal welfare initiatives</li>
          <li>Conduct awareness and community outreach programs</li>
        </ul>

        <div className="policy-highlight-box" style={{ marginTop: 22 }}>
          <div className="policy-highlight-label">
            <Heart style={{ width: 14, height: 14, color: "#F3842C", fill: "#F3842C" }} />
            Mission
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            To provide care, protection, and sustainable support for animals
            while strengthening grassroots animal welfare networks.
          </p>
        </div>

        <div className="policy-highlight-box" style={{ marginTop: 14 }}>
          <div className="policy-highlight-label">
            <Eye style={{ width: 14, height: 14, color: "#F3842C" }} />
            Vision
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            A compassionate society where every animal is treated with dignity
            and care.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "contact-info",
    icon: Phone,
    title: "Contact Information",
    content: (
      <>
        <p className="policy-text">
          For any queries, support, or concerns:
        </p>
        <div className="policy-contact-grid">
          {[
            { icon: Users, label: "Organization Name", value: "United for Animal Welfare" },
            { icon: Mail, label: "Email", value: "contact@unitedforanimalwelfare.org" },
            { icon: Phone, label: "Phone", value: "+91 9116688804 / 9116688805" },
            { icon: MapPin, label: "Registered Address", value: "Basement Floor, Plot No 20, Chaudhary Nagar 2nd, Budhsinghpura, Sanganer, Jaipur, Rajasthan - 302029" },
          ].map((item) => (
            <div key={item.label} className="policy-contact-item">
              <div className="policy-contact-icon">
                <item.icon style={{ width: 16, height: 16, color: "#F3842C" }} />
              </div>
              <div>
                <p className="policy-contact-label">{item.label}</p>
                <p className="policy-contact-value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "cancellation-refund",
    icon: CreditCard,
    title: "Cancellation and Refund Policy",
    content: (
      <>
        <p className="policy-text">
          At United for Animal Welfare, all donations are made voluntarily to
          support our mission.
        </p>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <AlertCircle style={{ width: 16, height: 16, color: "#F3842C" }} />
            No Cancellation
          </h4>
          <p className="policy-text">
            Once a donation is made, it cannot be cancelled.
          </p>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Shield style={{ width: 16, height: 16, color: "#F3842C" }} />
            No Refund Policy
          </h4>
          <p className="policy-text">
            Donations are non-refundable, except in the following cases:
          </p>
          <ul className="policy-list">
            <li>Duplicate transactions</li>
            <li>Payment made due to technical error</li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <FileText style={{ width: 16, height: 16, color: "#F3842C" }} />
            Refund Requests
          </h4>
          <ul className="policy-list">
            <li>Must be raised within <strong>7 days</strong> of the transaction</li>
            <li>Must include transaction proof</li>
          </ul>
        </div>

        <div className="policy-highlight-box" style={{ marginTop: 18 }}>
          <div className="policy-highlight-label">
            <Clock style={{ width: 14, height: 14, color: "#F3842C" }} />
            Refund Timeline
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            Approved refunds will be processed within <strong>7–10 working days</strong> and
            credited to the original payment method.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "terms-conditions",
    icon: FileText,
    title: "Terms and Conditions",
    content: (
      <>
        <p className="policy-text">
          By accessing our website and making a donation, you agree to the
          following:
        </p>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Globe style={{ width: 16, height: 16, color: "#F3842C" }} />
            Use of Website
          </h4>
          <ul className="policy-list">
            <li>Content is for informational and fundraising purposes only</li>
            <li>Unauthorized use may lead to legal action</li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Heart style={{ width: 16, height: 16, color: "#F3842C" }} />
            Donations
          </h4>
          <ul className="policy-list">
            <li>All donations are voluntary</li>
            <li>Donors must provide accurate details</li>
            <li>
              We are not responsible for failed transactions due to incorrect
              information
            </li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <BookOpen style={{ width: 16, height: 16, color: "#F3842C" }} />
            Intellectual Property
          </h4>
          <p className="policy-text">
            All website content (text, logo, images) belongs to United for
            Animal Welfare.
          </p>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Shield style={{ width: 16, height: 16, color: "#F3842C" }} />
            Limitation of Liability
          </h4>
          <p className="policy-text">
            We are not liable for any direct or indirect damages arising from
            website use.
          </p>
        </div>

        <div className="policy-highlight-box" style={{ marginTop: 18 }}>
          <div className="policy-highlight-label">
            <AlertCircle style={{ width: 14, height: 14, color: "#F3842C" }} />
            Changes to Terms
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            We reserve the right to update these terms at any time.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "privacy-policy",
    icon: Lock,
    title: "Privacy Policy",
    content: (
      <>
        <p className="policy-text">
          We are committed to protecting your personal information.
        </p>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <FileText style={{ width: 16, height: 16, color: "#F3842C" }} />
            Information Collected
          </h4>
          <ul className="policy-list">
            <li>Name, email, phone number, address</li>
            <li>Transaction details (via secure gateway)</li>
            <li>Technical data (IP, browser, cookies)</li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Shield style={{ width: 16, height: 16, color: "#F3842C" }} />
            Payment Security
          </h4>
          <ul className="policy-list">
            <li>
              Payments are processed securely via trusted gateways such as
              Easebuzz.
            </li>
            <li>
              We do <strong>not</strong> store card details, CVV, or banking
              information.
            </li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Eye style={{ width: 16, height: 16, color: "#F3842C" }} />
            Use of Data
          </h4>
          <ul className="policy-list">
            <li>Processing donations</li>
            <li>Communication and updates</li>
            <li>Legal compliance</li>
          </ul>
        </div>

        <div className="policy-subsection">
          <h4 className="policy-subtitle">
            <Users style={{ width: 16, height: 16, color: "#F3842C" }} />
            Data Sharing
          </h4>
          <ul className="policy-list">
            <li>
              Only with payment processors or legal authorities if required
            </li>
            <li>We do not sell or rent data</li>
          </ul>
        </div>

        <div className="policy-highlight-box" style={{ marginTop: 18 }}>
          <div className="policy-highlight-label">
            <CheckCircle2 style={{ width: 14, height: 14, color: "#F3842C" }} />
            User Rights
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            Access, update, or request deletion of personal data.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "shipping-service",
    icon: Truck,
    title: "Shipping / Service Policy",
    content: (
      <>
        <p className="policy-text">
          Since United for Animal Welfare is a <strong>non-profit donation-based
          organization</strong>, no physical goods are shipped.
        </p>
        <div className="policy-highlight-box" style={{ marginTop: 18 }}>
          <div className="policy-highlight-label">
            <CheckCircle2 style={{ width: 14, height: 14, color: "#F3842C" }} />
            Important Note
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            All transactions are treated as donations for charitable purposes.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "governing-law",
    icon: Scale,
    title: "Governing Law and Dispute Resolution",
    content: (
      <>
        <p className="policy-text">
          These terms shall be governed by the <strong>laws of India</strong>.
        </p>
        <div className="policy-highlight-box" style={{ marginTop: 18 }}>
          <div className="policy-highlight-label">
            <Scale style={{ width: 14, height: 14, color: "#F3842C" }} />
            Jurisdiction
          </div>
          <p className="policy-text" style={{ margin: 0 }}>
            Any disputes arising shall be subject to the jurisdiction of courts
            located in the relevant state of operation (including Uttar Pradesh,
            if applicable).
          </p>
        </div>
      </>
    ),
  },
];

/* ── ACCORDION ITEM ── */
function PolicyAccordion({ section, index, isOpen, onToggle }) {
  const Icon = section.icon;

  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="policy-card"
      style={{
        borderColor: isOpen ? "rgba(243,132,44,0.25)" : undefined,
        boxShadow: isOpen
          ? "0 8px 32px rgba(243,132,44,0.10)"
          : "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      <button
        onClick={onToggle}
        className="policy-card-header"
        aria-expanded={isOpen}
        id={`policy-header-${section.id}`}
      >
        <div className="policy-card-icon">
          <Icon style={{ width: 22, height: 22, color: "#F3842C" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="policy-card-title">{section.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown style={{ width: 20, height: 20, color: "#F3842C" }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="policy-card-body">{section.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── MAIN PAGE ── */
export default function Policy() {
  const [openSections, setOpenSections] = useState(new Set(["about-us"]));
  const location = useLocation();

  // Handle hash-based navigation from footer links
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && POLICY_SECTIONS.some((s) => s.id === hash)) {
      // Open the targeted section
      setOpenSections((prev) => {
        const next = new Set(prev);
        next.add(hash);
        return next;
      });
      // Scroll to it after a short delay to allow render
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 400);
    }
  }, [location.hash]);

  const toggle = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setOpenSections(new Set(POLICY_SECTIONS.map((s) => s.id)));
  };

  const collapseAll = () => {
    setOpenSections(new Set());
  };

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
            Policies
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
            Our <span style={{ color: "#F3842C" }}>Policies</span>
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
            Transparency and trust are at the heart of everything we do. Read
            our policies to understand how we operate.
          </p>
        </div>
      </div>

      {/* ── EXPAND / COLLAPSE CONTROLS ── */}
      <div
        className="section-container"
        style={{ paddingTop: 48, paddingBottom: 0, maxWidth: 820 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={expandAll}
            className="policy-toggle-btn"
            id="expand-all-btn"
          >
            Expand All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={collapseAll}
            className="policy-toggle-btn"
            id="collapse-all-btn"
          >
            Collapse All
          </motion.button>
        </div>
      </div>

      {/* ── POLICY SECTIONS ── */}
      <div
        className="section-container"
        style={{ paddingTop: 0, paddingBottom: 24, maxWidth: 820 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {POLICY_SECTIONS.map((section, i) => (
            <PolicyAccordion
              key={section.id}
              section={section}
              index={i}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggle(section.id)}
            />
          ))}
        </div>
      </div>

      {/* ── LAST UPDATED NOTE ── */}
      <div
        className="section-container"
        style={{ paddingTop: 20, paddingBottom: 0, maxWidth: 820 }}
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
            These policies are effective from the date of publishing and may be
            updated periodically. For questions, please{" "}
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

      {/* ── CTA ── */}
      <div
        className="section-container"
        style={{ paddingTop: 36, paddingBottom: 80, maxWidth: 820 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
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

      {/* ── SCOPED STYLES ── */}
      <style>{`
        .policy-card {
          background: white;
          border-radius: 22px;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .policy-card:hover {
          box-shadow: 0 12px 40px rgba(243,132,44,0.12) !important;
          border-color: rgba(243,132,44,0.2) !important;
        }

        .policy-card-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .policy-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(145deg, #FFF4EB, #FFE8D6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(243,132,44,0.1);
        }

        .policy-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.08rem;
          font-weight: 650;
          color: var(--c-bark);
          margin: 0;
          line-height: 1.3;
        }

        .policy-card-body {
          padding: 0 24px 26px;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 20px;
        }

        .policy-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.92rem;
          color: var(--c-bark-muted);
          line-height: 1.75;
          margin: 0;
        }

        .policy-list {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          color: var(--c-bark-muted);
          line-height: 1.85;
          margin: 10px 0 0 0;
          padding-left: 0;
          list-style: none;
        }
        .policy-list li {
          position: relative;
          padding-left: 22px;
          margin-bottom: 4px;
        }
        .policy-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F3842C, #F59E4B);
          box-shadow: 0 1px 4px rgba(243,132,44,0.25);
        }

        .policy-subsection {
          margin-top: 20px;
          padding-left: 0;
        }

        .policy-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 630;
          color: var(--c-bark);
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .policy-highlight-box {
          background: linear-gradient(135deg, #FFF8ED, #FFF4EB);
          border: 1px solid rgba(243,132,44,0.12);
          border-radius: 14px;
          padding: 18px 20px;
        }

        .policy-highlight-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #F3842C;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .policy-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 18px;
        }

        .policy-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .policy-contact-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(145deg, #FFF4EB, #FFE8D6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(243,132,44,0.08);
        }

        .policy-contact-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #F3842C;
          margin: 0 0 2px;
        }

        .policy-contact-value {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: var(--c-bark-muted);
          line-height: 1.55;
          margin: 0;
        }

        .policy-toggle-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #F3842C;
          background: #FFF4EB;
          border: 1px solid rgba(243,132,44,0.2);
          border-radius: 10px;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .policy-toggle-btn:hover {
          background: rgba(243,132,44,0.12);
        }

        @media (max-width: 580px) {
          .policy-card-header {
            padding: 18px 16px;
            gap: 12px;
          }
          .policy-card-body {
            padding: 0 16px 20px;
            padding-top: 16px;
          }
          .policy-card-icon {
            width: 40px;
            height: 40px;
            border-radius: 11px;
          }
          .policy-card-title {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
