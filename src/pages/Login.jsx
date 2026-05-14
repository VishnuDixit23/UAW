import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Lock, ArrowRight, CheckCircle, Loader2, ShieldCheck, Heart, Home as HomeIcon, LogIn, UserPlus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, generateOtp, verifyOtp } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

const inputStyle = {
  width: "100%", padding: "14px 16px 14px 48px",
  fontFamily: "var(--f-body)", fontSize: "0.95rem", fontWeight: 500,
  color: "#111827", background: "#FAFAF8",
  border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14,
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
};
const inputFocusStyle = { borderColor: "#F3842C", boxShadow: "0 0 0 3px rgba(243,132,44,0.10)" };
const iconWrap = { position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#F3842C", opacity: 0.7 };
const labelStyle = { fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, display: "block" };

function InputField({ icon: Icon, label, ...props }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={{ position: "relative" }}>
        <div style={iconWrap}><Icon style={{ width: 18, height: 18 }} /></div>
        <input style={{ ...inputStyle, ...(focused ? inputFocusStyle : {}) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
      </div>
    </div>
  );
}

const tabStyle = (active) => ({
  flex: 1, padding: "13px 20px", fontFamily: "var(--f-body)", fontSize: "0.9rem", fontWeight: 600,
  color: active ? "white" : "var(--c-bark-muted)", background: active ? "linear-gradient(135deg, #F3842C, #E67E22)" : "transparent",
  border: active ? "none" : "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, cursor: "pointer",
  transition: "all 0.25s", boxShadow: active ? "0 4px 12px rgba(243,132,44,0.3)" : "none",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
});

const fadeVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggedIn, user } = useAuth();
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [step, setStep] = useState("form"); // "form", "otp", "verified"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstname: "", lastname: "", phoneNumber: "", email: "", address1: "", pincode: "", city: "", state: "" });
  const [loginPhone, setLoginPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verifiedUser, setVerifiedUser] = useState(null);

  // If already logged in, redirect to donate
  useEffect(() => {
    if (isLoggedIn) navigate("/registration", { replace: true });
  }, [isLoggedIn, navigate]);

  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setError(""); };

  // ─── REGISTER FLOW ───
  const handleRegister = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await registerUser(form);
      if (res.success) {
        try { await generateOtp(form.phoneNumber); } catch {}
        setStep("otp");
      } else { setError(res.message || "Registration failed"); }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed";
      if (msg.toLowerCase().includes("already")) {
        setError("This phone number is already registered. Please use the Login tab instead.");
      } else { setError(msg); }
    } finally { setLoading(false); }
  };

  // ─── LOGIN FLOW ───
  const handleLogin = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await generateOtp(loginPhone);
      setStep("otp");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to send OTP";
      if (msg.toLowerCase().includes("not found") || msg.toLowerCase().includes("register")) {
        setError("No account found with this number. Please register first.");
      } else { setError(msg); }
    } finally { setLoading(false); }
  };

  const activePhone = mode === "login" ? loginPhone : form.phoneNumber;

  // ─── OTP VERIFY (shared) ───
  const handleVerifyOtp = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await verifyOtp(activePhone, otp);
      if (res.success) {
        login(res.data, activePhone);
        setVerifiedUser(res.data);
        setStep("verified");
      } else { setError(res.message || "Invalid OTP"); }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally { setLoading(false); }
  };

  const handleResendOtp = async () => {
    setError(""); setLoading(true);
    try { await generateOtp(activePhone); setError("OTP resent successfully!"); }
    catch (err) { setError(err.response?.data?.message || "Failed to resend OTP"); }
    finally { setLoading(false); }
  };

  const switchMode = (newMode) => { setMode(newMode); setStep("form"); setError(""); setOtp(""); };

  if (isLoggedIn) return null; // Will redirect

  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page-hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="section-label" style={{ justifyContent: "center", color: "var(--c-amber-light)", marginBottom: 12 }}>Account</p>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            {step === "verified" ? <><span style={{ color: "#6EE7B7" }}>Welcome</span> Back</> : <><span style={{ color: "#F3842C" }}>{mode === "login" ? "Login" : "Register"}</span> to Donate</>}
          </h1>
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto" }}>
            {step === "verified" ? "Your account has been verified successfully." : mode === "login" ? "Login with your phone number to continue donating." : "Create your account to start donating for animal welfare."}
          </p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 560 }}>
        <AnimatePresence mode="wait">

          {/* ─── FORM STEP ─── */}
          {step === "form" && (
            <motion.div key="form" {...fadeVariant}>
              {/* Tab Switcher */}
              <div style={{ display: "flex", gap: 10, marginBottom: 24, background: "white", borderRadius: 16, padding: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <button onClick={() => switchMode("login")} style={tabStyle(mode === "login")}><LogIn style={{ width: 16, height: 16 }} />Login</button>
                <button onClick={() => switchMode("register")} style={tabStyle(mode === "register")}><UserPlus style={{ width: 16, height: 16 }} />Register</button>
              </div>

              <div style={{ background: "white", borderRadius: 28, padding: "44px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 68, height: 68, borderRadius: 18, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)", border: "1px solid rgba(243,132,44,0.12)" }}>
                    {mode === "login" ? <LogIn style={{ width: 30, height: 30, color: "#F3842C" }} /> : <UserPlus style={{ width: 30, height: 30, color: "#F3842C" }} />}
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 16, marginBottom: 6 }}>
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <div style={{ width: 44, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 8px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--c-bark-muted)" }}>
                    {mode === "login" ? "OTP will be sent to your phone number & Gmail" : "Register with your details to start donating"}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {mode === "login" ? (
                    <motion.form key="login-form" onSubmit={handleLogin} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                      <InputField icon={Phone} label="Phone Number" placeholder="10-digit mobile number" value={loginPhone} onChange={(e) => { setLoginPhone(e.target.value); setError(""); }} required pattern="^[0-9]{10}$" maxLength={10} />
                      {error && <div style={{ background: error.includes("register") ? "#FFFBEB" : "#FEF2F2", border: `1px solid ${error.includes("register") ? "#FDE68A" : "#FECACA"}`, borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: error.includes("register") ? "#92400E" : "#DC2626", fontWeight: 500 }}>{error}</p>
                        {error.includes("register") && <button type="button" onClick={() => switchMode("register")} style={{ background: "none", border: "none", fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 700, color: "#F3842C", cursor: "pointer", marginTop: 4, padding: 0 }}>→ Go to Register</button>}
                      </div>}
                      <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "white", background: "linear-gradient(135deg, #F3842C, #E67E22)", padding: "15px", borderRadius: 14, border: "none", cursor: loading ? "wait" : "pointer", boxShadow: "0 4px 16px rgba(243,132,44,0.35)", opacity: loading ? 0.7 : 1 }}>
                        {loading ? <Loader2 style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} /> : <><ArrowRight style={{ width: 18, height: 18 }} /> Send OTP</>}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.form key="register-form" onSubmit={handleRegister} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                        <InputField icon={User} label="First Name *" placeholder="First name" value={form.firstname} onChange={set("firstname")} required />
                        <InputField icon={User} label="Last Name" placeholder="Last name" value={form.lastname} onChange={set("lastname")} />
                      </div>
                      <InputField icon={Phone} label="Phone Number *" placeholder="10-digit mobile" value={form.phoneNumber} onChange={set("phoneNumber")} required pattern="^[0-9]{10}$" maxLength={10} />
                      <InputField icon={Mail} label="Email *" placeholder="you@gmail.com" type="email" value={form.email} onChange={set("email")} required />
                      <InputField icon={MapPin} label="Address" placeholder="Address line 1" value={form.address1} onChange={set("address1")} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 12px" }}>
                        <InputField icon={MapPin} label="City" placeholder="City" value={form.city} onChange={set("city")} />
                        <InputField icon={MapPin} label="State" placeholder="State" value={form.state} onChange={set("state")} />
                        <InputField icon={MapPin} label="Pincode" placeholder="Pincode" value={form.pincode} onChange={set("pincode")} pattern="^[0-9]{6,10}$" />
                      </div>
                      {error && <div style={{ background: error.includes("Login tab") ? "#FFFBEB" : "#FEF2F2", border: `1px solid ${error.includes("Login tab") ? "#FDE68A" : "#FECACA"}`, borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: error.includes("Login tab") ? "#92400E" : "#DC2626", fontWeight: 500 }}>{error}</p>
                        {error.includes("Login tab") && <button type="button" onClick={() => switchMode("login")} style={{ background: "none", border: "none", fontFamily: "var(--f-body)", fontSize: "0.82rem", fontWeight: 700, color: "#F3842C", cursor: "pointer", marginTop: 4, padding: 0 }}>→ Go to Login</button>}
                      </div>}
                      <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "white", background: "linear-gradient(135deg, #F3842C, #E67E22)", padding: "15px", borderRadius: 14, border: "none", cursor: loading ? "wait" : "pointer", boxShadow: "0 4px 16px rgba(243,132,44,0.35)", opacity: loading ? 0.7 : 1 }}>
                        {loading ? <Loader2 style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} /> : <><UserPlus style={{ width: 18, height: 18 }} /> Register & Get OTP</>}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ─── OTP STEP ─── */}
          {step === "otp" && (
            <motion.div key="otp" {...fadeVariant}>
              <div style={{ background: "white", borderRadius: 28, padding: "44px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 68, height: 68, borderRadius: 18, background: "linear-gradient(145deg, #FFF4EB, #FFE8D6)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(243,132,44,0.15)", border: "1px solid rgba(243,132,44,0.12)" }}>
                    <ShieldCheck style={{ width: 30, height: 30, color: "#F3842C" }} />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--c-bark)", marginTop: 16, marginBottom: 6 }}>Verify Your Identity</h2>
                  <div style={{ width: 44, height: 3, background: "linear-gradient(90deg, #F3842C, #F59E4B)", borderRadius: 2, margin: "0 auto 8px" }} />
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "0.85rem", color: "var(--c-bark-muted)", lineHeight: 1.7 }}>
                    OTP sent to <strong style={{ color: "#F3842C" }}>+91 {activePhone}</strong>
                    {" & "}
                    <strong style={{ color: "#F3842C" }}>{mode === "register" && form.email ? form.email : "Registered email"}</strong>
                  </p>
                </div>
                <form onSubmit={handleVerifyOtp}>
                  <InputField icon={Lock} label="Enter OTP" placeholder="6-digit OTP" value={otp} onChange={(e) => { setOtp(e.target.value); setError(""); }} required pattern="^[0-9]{6}$" maxLength={6} />
                  {error && <div style={{ background: error.includes("resent") ? "#ECFDF5" : "#FEF2F2", border: `1px solid ${error.includes("resent") ? "#A7F3D0" : "#FECACA"}`, borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "0.82rem", color: error.includes("resent") ? "#059669" : "#DC2626", fontWeight: 500 }}>{error}</p>
                  </div>}
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "white", background: "linear-gradient(135deg, #F3842C, #E67E22)", padding: "15px", borderRadius: 14, border: "none", cursor: loading ? "wait" : "pointer", boxShadow: "0 4px 16px rgba(243,132,44,0.35)", opacity: loading ? 0.7 : 1 }}>
                    {loading ? <Loader2 style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} /> : <><CheckCircle style={{ width: 18, height: 18 }} /> Verify OTP</>}
                  </motion.button>
                </form>
                <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 18 }}>
                  <button onClick={handleResendOtp} disabled={loading} style={{ background: "none", border: "none", fontFamily: "var(--f-body)", fontSize: "0.85rem", fontWeight: 600, color: "#F3842C", cursor: "pointer", textDecoration: "underline" }}>Resend OTP</button>
                  <button onClick={() => { setStep("form"); setError(""); setOtp(""); }} style={{ background: "none", border: "none", fontFamily: "var(--f-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--c-bark-muted)", cursor: "pointer" }}>← Back</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── SUCCESS STEP ─── */}
          {step === "verified" && (
            <motion.div key="verified" {...fadeVariant}>
              <div style={{ background: "white", borderRadius: 28, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(145deg, #ECFDF5, #D1FAE5)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 30px rgba(16,185,129,0.2)", marginBottom: 24 }}>
                  <CheckCircle style={{ width: 44, height: 44, color: "#10B981" }} />
                </motion.div>
                <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--c-bark)", marginBottom: 10 }}>
                  Welcome, {verifiedUser?.firstname || "User"}!
                </h2>
                <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #10B981, #34D399)", borderRadius: 2, margin: "0 auto 14px" }} />
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.95rem", color: "var(--c-bark-muted)", lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px" }}>
                  You're now logged in. You can make donations securely anytime.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                  <Link to="/registration" style={{ textDecoration: "none" }}>
                    <motion.span className="btn btn-amber" style={{ display: "inline-flex", fontSize: "0.92rem" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Heart style={{ width: 16, height: 16, fill: "white" }} /> Donate Now
                    </motion.span>
                  </Link>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <motion.span className="btn" style={{ display: "inline-flex", fontSize: "0.88rem", background: "transparent", color: "var(--c-bark-muted)", border: "2px solid var(--c-sand-light)" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <HomeIcon style={{ width: 16, height: 16 }} /> Back to Home
                    </motion.span>
                  </Link>
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
