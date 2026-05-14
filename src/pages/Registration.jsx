import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Building2, MapPin, CreditCard, Landmark, ShieldCheck, Loader2, LogIn, Send, Banknote, Globe, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { initiateWebsitePayment, sendDonationLink, submitCashPayment } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { CopyButton, card, labelStyle, AmountPicker, UserBar, METHODS, MethodCard, MathCaptcha } from "./RegistrationHelpers";

export default function Registration() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("online");
  const [method, setMethod] = useState("website");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [captchaToken, setCaptchaToken] = useState(false);

  const tabBtn = (active) => ({
    flex: 1, padding: "12px 20px", fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 600,
    color: active ? "white" : "var(--c-bark-muted)", background: active ? "linear-gradient(135deg,#F3842C,#E67E22)" : "transparent",
    border: active ? "none" : "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, cursor: "pointer", transition: "all 0.25s",
    boxShadow: active ? "0 4px 12px rgba(243,132,44,0.3)" : "none",
  });

  const getMethodColor = () => METHODS.find(m => m.id === method)?.color || "#F3842C";

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setSuccess(""); setLoading(true);
    const amt = parseFloat(amount);
    if (!captchaToken) { setError("Please complete the security check first."); setLoading(false); return; }
    if (!amt || amt < 1) { setError("Please enter a valid amount (min ₹1)"); setLoading(false); return; }
    if (amt > 200000) { setError("Maximum donation is ₹2,00,000"); setLoading(false); return; }
    const rawPhone = (user.phoneNumber || "").toString().replace(/\D/g, "");
    const phone = rawPhone.length === 12 && rawPhone.startsWith("91") ? rawPhone.slice(2) : rawPhone;
    const payload = { name: `${user.firstname || ""} ${user.lastname || ""}`.trim(), phoneNumber: phone, email: user.email || "", amount: amt };
    try {
      if (method === "website") {
        const res = await initiateWebsitePayment({ ...payload, paymentMethod: "initiateOnWebsite" });
        if (res.success && res.data) window.location.href = res.data;
        else setError(res.message || "Payment initiation failed");
      } else if (method === "email") {
        const res = await sendDonationLink(payload);
        if (res.success) setSuccess("✅ Payment link sent to your email and WhatsApp!");
        else setError(res.message || "Could not send link");
      } else if (method === "cash") {
        const res = await submitCashPayment(payload);
        if (res.success) setSuccess("✅ Cash donation of ₹" + amt.toLocaleString() + " registered! Your 80G receipt will be sent shortly.");
        else setError(res.message || "Cash registration failed");
      }
    } catch (err) {
      const data = err.response?.data;
      setError(data?.message || (typeof data === "string" ? data : null) || err.message || "Something went wrong.");
      setCaptchaToken(false);
    } finally { setLoading(false); }
  };

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
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto" }}>Your donation goes directly to animal feeding, care, and rescue operations.</p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 700 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", gap: 10, marginBottom: 28, background: "white", borderRadius: 16, padding: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <button onClick={() => setTab("online")} style={tabBtn(tab === "online")}><CreditCard size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />Donate Online</button>
          <button onClick={() => setTab("bank")} style={tabBtn(tab === "bank")}><Landmark size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />Bank Transfer</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "online" && (
            <motion.div key="online" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {!isLoggedIn ? (
                <div style={{ ...card, textAlign: "center" }}>
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ width: 80, height: 80, borderRadius: 22, background: "linear-gradient(145deg,#FFF4EB,#FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)", marginBottom: 20 }}>
                    <LogIn size={36} color="#F3842C" />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--c-bark)", marginBottom: 8 }}>Login Required</h2>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#F3842C,#F59E4B)", borderRadius: 2, margin: "0 auto 14px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", color: "var(--c-bark-muted)", maxWidth: 380, margin: "0 auto 28px", lineHeight: 1.7 }}>Please login or register to make a secure online donation. Your details will be auto-filled.</p>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <motion.span className="btn btn-amber" style={{ display: "inline-flex", fontSize: "0.95rem" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <LogIn size={18} /> Login / Register
                    </motion.span>
                  </Link>
                </div>
              ) : (
                <div style={card}>
                  <UserBar user={user} onLogout={() => { logout(); navigate("/login"); }} />
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Choose Payment Method</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {METHODS.map(m => <MethodCard key={m.id} method={m} selected={method} onClick={() => { setMethod(m.id); setError(""); setSuccess(""); setCaptchaToken(false); }} />)}
                    </div>
                  </div>
                  <motion.div key={method} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: `${getMethodColor()}10`, border: `1px solid ${getMethodColor()}30`, borderRadius: 12, padding: "12px 16px", marginBottom: 22 }}>
                    {method === "website" && <><Globe size={16} color={getMethodColor()} /><span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "#555" }}>You'll be redirected to Easebuzz's secure payment gateway.</span></>}
                    {method === "email" && <><Send size={16} color={getMethodColor()} /><span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "#555" }}>A secure link will be sent to <strong>{user.email}</strong> and WhatsApp.</span></>}
                    {method === "cash" && <><Banknote size={16} color={getMethodColor()} /><span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "#555" }}>Register a cash payment you've already made. 80G receipt auto-generated.</span></>}
                  </motion.div>
                  <form onSubmit={handleSubmit}>
                    <AmountPicker amount={amount} setAmount={setAmount} />
                    <MathCaptcha onVerify={setCaptchaToken} />
                    {captchaToken && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8, background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "8px 14px", marginBottom: 12 }}>
                        <CheckCircle2 size={15} color="#10B981" />
                        <span style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", color: "#065F46", fontWeight: 500 }}>Security check passed — you may proceed</span>
                      </motion.div>
                    )}
                    {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}><p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: "#DC2626" }}>{error}</p></div>}
                    {success && <div style={{ background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}><p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "#065F46", lineHeight: 1.6 }}>{success}</p></div>}
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "white", background: !captchaToken ? "#ccc" : `linear-gradient(135deg,${getMethodColor()},${getMethodColor()}cc)`, padding: "16px", borderRadius: 14, border: "none", cursor: !captchaToken ? "not-allowed" : loading ? "wait" : "pointer", boxShadow: captchaToken ? `0 4px 16px ${getMethodColor()}55` : "none", opacity: loading ? 0.7 : 1, transition: "all 0.3s" }}>
                      {loading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : (<>
                        {method === "website" && <><Heart size={18} style={{ fill: "white" }} />Proceed to Pay {amount ? `₹${parseFloat(amount).toLocaleString()}` : ""}</>}
                        {method === "email" && <><Send size={18} />Send Payment Link {amount ? `for ₹${parseFloat(amount).toLocaleString()}` : ""}</>}
                        {method === "cash" && <><Banknote size={18} />Register Cash Donation {amount ? `of ₹${parseFloat(amount).toLocaleString()}` : ""}</>}
                      </>)}
                    </motion.button>
                  </form>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
                    <ShieldCheck size={14} color="#10B981" />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", color: "var(--c-bark-muted)" }}>Secured by Easebuzz • 256-bit SSL • 80G Receipt auto-generated</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {tab === "bank" && (
            <motion.div key="bank" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div style={card}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ width: 80, height: 80, borderRadius: 22, background: "linear-gradient(145deg,#FFF4EB,#FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)" }}>
                    <Landmark size={36} color="#F3842C" />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.65rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 20, marginBottom: 8 }}>Bank Transfer Details</h2>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#F3842C,#F59E4B)", borderRadius: 2, margin: "0 auto 10px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", color: "var(--c-bark-muted)", maxWidth: 440, margin: "0 auto" }}>Use the details below to make a direct bank transfer.</p>
                </div>
                <div style={{ background: "#FAFAF8", borderRadius: 18, padding: "8px 24px", border: "1px solid rgba(0,0,0,0.04)" }}>
                  {[{ icon: Building2, label: "Organisation Name", value: "United for Animal Welfare" },
                    { icon: CreditCard, label: "Account Number", value: "2602221612905715", copy: true },
                    { icon: Landmark, label: "IFSC Code", value: "AUBL0002216", copy: true }].map(({ icon: Icon, label: lbl, value, copy }) => (
                    <div key={lbl} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(145deg,#FFF4EB,#FFE8D6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={18} color="#F3842C" /></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{lbl}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <p style={{ fontFamily: copy ? "'IBM Plex Mono',monospace" : "inherit", fontSize: "1rem", fontWeight: 600, color: "var(--c-bark)" }}>{value}</p>
                          {copy && <CopyButton text={value} />}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 14, padding: "16px 0" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(145deg,#FFF4EB,#FFE8D6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><MapPin size={18} color="#F3842C" /></div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Branch Address</p>
                      <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--c-bark)", lineHeight: 1.6 }}>Pratap Nagar Jaipur, Ground & First Floor,<br />P. No- 83/141, Haldighati Marg,<br />Sector 8, Pratap Nagar</p>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 28, textAlign: "center" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F3842C", marginBottom: 12 }}>Scan & Pay</p>
                  <div style={{ display: "inline-block", background: "white", borderRadius: 20, padding: 12, border: "2px solid rgba(243,132,44,0.18)", boxShadow: "0 6px 28px rgba(243,132,44,0.10)" }}>
                    <img src="/qr-code.jpg" alt="Scan to pay" style={{ width: 180, borderRadius: 12, display: "block" }} />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--c-bark-muted)", marginTop: 12 }}>Supports Paytm, Google Pay, PhonePe, BHIM & 30+ apps</p>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFF8ED", border: "1px solid rgba(243,132,44,0.15)", borderRadius: 14, padding: "14px 20px", marginTop: 24 }}>
                  <Heart size={16} color="#F3842C" style={{ fill: "#F3842C", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 500, color: "#8B5E3C" }}>100% of your donation goes directly towards animal welfare.</span>
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 20 }}>
                  <Link to="/contact"><motion.span className="btn btn-amber" style={{ display: "inline-flex", fontSize: "0.88rem" }} whileHover={{ scale: 1.04 }}><Heart size={16} style={{ fill: "white" }} /> Need Help? Contact Us</motion.span></Link>
                  <Link to="/"><motion.span className="btn" style={{ display: "inline-flex", fontSize: "0.88rem", background: "transparent", color: "var(--c-bark-muted)", border: "2px solid var(--c-sand-light)" }} whileHover={{ scale: 1.04 }}><ArrowLeft size={16} /> Back to Home</motion.span></Link>
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