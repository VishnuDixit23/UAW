import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Copy, Check, Building2, MapPin, CreditCard, Landmark, ShieldCheck, IndianRupee, User, Mail, Phone, Loader2, ExternalLink, LogIn, LogOut } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { initiateWebsitePayment } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.button onClick={handleCopy} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      style={{ background: copied ? "#E8F5E9" : "#FFF4EB", border: copied ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(243,132,44,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, transition: "all 0.25s ease" }} title="Copy to clipboard">
      {copied ? <Check style={{ width: 14, height: 14, color: "#4CAF50" }} /> : <Copy style={{ width: 14, height: 14, color: "#F3842C" }} />}
      <span style={{ fontFamily: "var(--f-body)", fontSize: "0.7rem", fontWeight: 600, color: copied ? "#4CAF50" : "#F3842C" }}>{copied ? "Copied!" : "Copy"}</span>
    </motion.button>
  );
}

function DetailRow({ icon: Icon, label, value, copyable = false, mono = false }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon style={{ width: 18, height: 18, color: "#F3842C" }} />
      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <p style={{ fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Outfit', sans-serif", fontSize: mono ? "1.08rem" : "1.1rem", fontWeight: mono ? 500 : 600, color: "var(--c-bark)", lineHeight: 1.45, wordBreak: "break-word", letterSpacing: mono ? "0.04em" : "0.005em" }}>{value}</p>
          {copyable && <CopyButton text={value} />}
        </div>
      </div>
    </div>
  );
}

const AMOUNTS = [100, 500, 1000, 2500, 5000];

const tabBtnStyle = (active) => ({
  flex: 1, padding: "12px 20px", fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 600,
  color: active ? "white" : "var(--c-bark-muted)", background: active ? "linear-gradient(135deg, #F3842C, #E67E22)" : "transparent",
  border: active ? "none" : "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, cursor: "pointer",
  transition: "all 0.25s", boxShadow: active ? "0 4px 12px rgba(243,132,44,0.3)" : "none",
});

export default function Registration() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("online"); // "online" or "bank"
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAmountSelect = (amt) => { setAmount(amt.toString()); setCustomAmount(""); setError(""); };
  const handleCustomAmount = (e) => { setCustomAmount(e.target.value); setAmount(e.target.value); setError(""); };

  const handleDonate = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    const amt = parseFloat(amount);
    if (!amt || amt < 1) { setError("Please enter a valid amount (min ₹1)"); setLoading(false); return; }
    if (amt > 200000) { setError("Maximum donation limit is ₹2,00,000"); setLoading(false); return; }

    try {
      const res = await initiateWebsitePayment({
        name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
        phoneNumber: user.phoneNumber,
        email: user.email || "",
        amount: amt,
        paymentMethod: "initiateOnWebsite",
      });
      if (res.success && res.data) { window.location.href = res.data; }
      else { setError(res.message || "Failed to initiate payment"); }
    } catch (err) { setError(err.response?.data?.message || "Payment initiation failed"); }
    finally { setLoading(false); }
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="section-label" style={{ justifyContent: "center", color: "var(--c-amber-light)", marginBottom: 12 }}>Donate</p>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            <span style={{ color: "#F3842C" }}>Donate</span> & Save a Life
          </h1>
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto" }}>
            Your donation goes directly to animal feeding, care, and keeping NGOs alive.
          </p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 680 }}>
        {/* Tab Switcher */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", gap: 10, marginBottom: 28, background: "white", borderRadius: 16, padding: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <button onClick={() => setTab("online")} style={tabBtnStyle(tab === "online")}><CreditCard style={{ width: 16, height: 16, display: "inline", verticalAlign: "middle", marginRight: 6 }} />Donate Online</button>
          <button onClick={() => setTab("bank")} style={tabBtnStyle(tab === "bank")}><Landmark style={{ width: 16, height: 16, display: "inline", verticalAlign: "middle", marginRight: 6 }} />Bank Transfer</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ─── ONLINE DONATION TAB ─── */}
          {tab === "online" && (
            <motion.div key="online" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>

              {/* ── NOT LOGGED IN ── */}
              {!isLoggedIn ? (
                <div style={{ background: "white", borderRadius: 28, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 80, height: 80, borderRadius: 22, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)", border: "1px solid rgba(243,132,44,0.12)", marginBottom: 20 }}>
                    <LogIn style={{ width: 36, height: 36, color: "#F3842C" }} />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--c-bark)", marginBottom: 8 }}>Login Required</h2>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 14px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", color: "var(--c-bark-muted)", lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px" }}>
                    Please login or register to make a secure online donation. Your details will be auto-filled.
                  </p>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <motion.span className="btn btn-amber" style={{ display: "inline-flex", fontSize: "0.95rem" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <LogIn style={{ width: 18, height: 18 }} /> Login / Register
                    </motion.span>
                  </Link>
                </div>
              ) : (
                /* ── LOGGED IN — DONATE FORM ── */
                <div style={{ background: "white", borderRadius: 28, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  {/* User info bar */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ECFDF5", borderRadius: 14, padding: "12px 18px", marginBottom: 24, border: "1px solid rgba(16,185,129,0.15)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #10B981, #059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User style={{ width: 18, height: 18, color: "white" }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 600, color: "#065F46" }}>{user.firstname} {user.lastname}</p>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", color: "#059669" }}>+91 {user.phoneNumber}</p>
                      </div>
                    </div>
                    <motion.button onClick={handleLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--f-body)", fontSize: "0.78rem", fontWeight: 600, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
                      <LogOut style={{ width: 13, height: 13 }} /> Logout
                    </motion.button>
                  </div>

                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: 68, height: 68, borderRadius: 18, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)", border: "1px solid rgba(243,132,44,0.12)" }}>
                      <Heart style={{ width: 30, height: 30, color: "#F3842C", fill: "#F3842C" }} />
                    </motion.div>
                    <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 14, marginBottom: 6 }}>Choose Amount</h2>
                    <div style={{ width: 44, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 8px" }} />
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--c-bark-muted)" }}>Secure payment powered by Easebuzz</p>
                  </div>

                  <form onSubmit={handleDonate}>
                    {/* Amount Selection */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10, display: "block" }}>Select Amount</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                        {AMOUNTS.map((amt) => (
                          <motion.button key={amt} type="button" onClick={() => handleAmountSelect(amt)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            style={{ padding: "10px 22px", borderRadius: 12, fontFamily: "var(--f-number)", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", border: amount === amt.toString() ? "2px solid #F3842C" : "1.5px solid rgba(0,0,0,0.08)", background: amount === amt.toString() ? "#FFF4EB" : "#FAFAF8", color: amount === amt.toString() ? "#F3842C" : "var(--c-bark)", transition: "all 0.2s" }}>
                            ₹{amt.toLocaleString()}
                          </motion.button>
                        ))}
                      </div>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#F3842C", opacity: 0.7 }}><IndianRupee style={{ width: 17, height: 17 }} /></div>
                        <input placeholder="Or enter custom amount (₹1 - ₹2,00,000)" type="number" min="1" max="200000" value={customAmount} onChange={handleCustomAmount}
                          style={{ width: "100%", padding: "13px 16px 13px 46px", fontFamily: "var(--f-body)", fontSize: "0.92rem", fontWeight: 500, color: "#111827", background: "#FAFAF8", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14, outline: "none" }} />
                      </div>
                    </div>

                    {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}>
                      <p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "#DC2626", fontWeight: 500 }}>{error}</p>
                    </div>}

                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "white", background: "linear-gradient(135deg, #F3842C, #E67E22)", padding: "16px", borderRadius: 14, border: "none", cursor: loading ? "wait" : "pointer", boxShadow: "0 4px 16px rgba(243,132,44,0.35)", opacity: loading ? 0.7 : 1 }}>
                      {loading ? <Loader2 style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} /> : <><Heart style={{ width: 18, height: 18, fill: "white" }} /> Proceed to Pay {amount ? `₹${parseFloat(amount).toLocaleString()}` : ""}</>}
                    </motion.button>
                  </form>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
                    <ShieldCheck style={{ width: 14, height: 14, color: "#10B981" }} />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", color: "var(--c-bark-muted)" }}>Secured by Easebuzz • 256-bit SSL encryption</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── BANK TRANSFER TAB ─── */}
          {tab === "bank" && (
            <motion.div key="bank" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div style={{ background: "white", borderRadius: 28, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 80, height: 80, borderRadius: 22, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)", border: "1px solid rgba(243,132,44,0.12)" }}>
                    <Landmark style={{ width: 36, height: 36, color: "#F3842C" }} />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.65rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 20, marginBottom: 8, lineHeight: 1.2 }}>Bank Transfer Details</h2>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 10px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", color: "var(--c-bark-muted)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto" }}>
                    Use the details below to make a direct bank transfer. Every contribution makes a difference!
                  </p>
                </div>
                <div style={{ background: "#FAFAF8", borderRadius: 18, padding: "8px 24px", border: "1px solid rgba(0,0,0,0.04)" }}>
                  <DetailRow icon={Building2} label="Organisation Name" value="United for Animal Welfare" />
                  <DetailRow icon={CreditCard} label="Account Number" value="2602221612905715" copyable mono />
                  <DetailRow icon={Landmark} label="IFSC Code" value="AUBL0002216" copyable mono />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MapPin style={{ width: 18, height: 18, color: "#F3842C" }} />
                    </div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Branch Address</p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "var(--c-bark)", lineHeight: 1.6 }}>
                        Pratap Nagar Jaipur, Ground &amp; First Floor,<br />P. No- 83/141, Haldighati Marg,<br />Sector 8, Pratap Nagar
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── QR CODE SECTION ── */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                  style={{ marginTop: 28, textAlign: "center" }}>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 16px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F3842C", marginBottom: 6 }}>Scan & Pay</p>
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem", color: "var(--c-bark-muted)", marginBottom: 18, lineHeight: 1.6 }}>
                    Scan this QR code from any UPI app to donate directly
                  </p>
                  <div style={{ display: "inline-block", background: "white", borderRadius: 20, padding: 12, border: "2px solid rgba(243,132,44,0.18)", boxShadow: "0 6px 28px rgba(243,132,44,0.10)" }}>
                    <img src="/qr-code.jpg" alt="Scan to pay - United for Animal Welfare" style={{ width: 180, maxWidth: "100%", borderRadius: 12, display: "block" }} />
                  </div>
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", color: "var(--c-bark-muted)", marginTop: 14, opacity: 0.7 }}>
                    Supports Paytm, Google Pay, PhonePe, BHIM & 30+ apps
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#FFF8ED", border: "1px solid rgba(243,132,44,0.15)", borderRadius: 14, padding: "14px 20px", marginTop: 24 }}>
                  <Heart style={{ width: 16, height: 16, color: "#F3842C", fill: "#F3842C" }} />
                  <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 500, color: "#8B5E3C", lineHeight: 1.5 }}>
                    100% of your donation goes directly towards animal welfare — feeding &amp; care.
                  </span>
                </motion.div>
                <Link to="/legal" style={{ textDecoration: "none", display: "block", marginTop: 16 }}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(243,132,44,0.05)", border: "1px dashed rgba(243,132,44,0.25)", borderRadius: 12, padding: "12px 20px", cursor: "pointer" }}>
                    <ShieldCheck style={{ width: 16, height: 16, color: "#F3842C" }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#F3842C" }}>Verify Our Credentials — View Legal Documents</span>
                  </motion.div>
                </Link>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 20 }}>
                  <Link to="/contact"><motion.span className="btn btn-amber" style={{ display: "inline-flex", fontSize: "0.88rem" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}><Heart style={{ width: 16, height: 16, fill: "white" }} /> Need Help? Contact Us</motion.span></Link>
                  <Link to="/"><motion.span className="btn" style={{ display: "inline-flex", fontSize: "0.88rem", background: "transparent", color: "var(--c-bark-muted)", border: "2px solid var(--c-sand-light)" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}><ArrowLeft style={{ width: 16, height: 16 }} /> Back to Home</motion.span></Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </div>
  );
}