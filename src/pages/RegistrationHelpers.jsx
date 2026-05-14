import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, IndianRupee, User, LogOut, Globe, Send, Banknote, CheckCircle2, RefreshCw, AlertCircle } from "lucide-react";

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      style={{ background: copied ? "#E8F5E9" : "#FFF4EB", border: copied ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(243,132,44,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
      {copied ? <Check size={14} color="#4CAF50" /> : <Copy size={14} color="#F3842C" />}
      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: copied ? "#4CAF50" : "#F3842C" }}>{copied ? "Copied!" : "Copy"}</span>
    </motion.button>
  );
}

export const AMOUNTS = [100, 500, 1000, 2500, 5000];
export const card = { background: "white", borderRadius: 28, padding: "40px 36px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" };
export const labelStyle = { fontFamily: "var(--f-body)", fontSize: "0.76rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, display: "block" };

export function AmountPicker({ amount, setAmount }) {
  const [custom, setCustom] = useState("");
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>Select Amount</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {AMOUNTS.map(a => (
          <motion.button key={a} type="button" onClick={() => { setAmount(a.toString()); setCustom(""); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ padding: "10px 20px", borderRadius: 12, fontFamily: "var(--f-number)", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", border: amount === a.toString() ? "2px solid #F3842C" : "1.5px solid rgba(0,0,0,0.08)", background: amount === a.toString() ? "#FFF4EB" : "#FAFAF8", color: amount === a.toString() ? "#F3842C" : "var(--c-bark)" }}>
            ₹{a.toLocaleString()}
          </motion.button>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#F3842C", opacity: 0.7, display: "flex" }}><IndianRupee size={17} /></div>
        <input placeholder="Or enter custom amount" type="number" min="1" max="200000" value={custom}
          onChange={e => { setCustom(e.target.value); setAmount(e.target.value); }}
          style={{ width: "100%", padding: "12px 16px 12px 44px", fontFamily: "var(--f-body)", fontSize: "0.92rem", fontWeight: 500, color: "#111827", background: "#FAFAF8", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14, outline: "none", boxSizing: "border-box" }} />
      </div>
    </div>
  );
}

export function UserBar({ user, onLogout }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ECFDF5", borderRadius: 14, padding: "12px 18px", marginBottom: 24, border: "1px solid rgba(16,185,129,0.15)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#10B981,#059669)", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={18} color="white" /></div>
        <div>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 600, color: "#065F46" }}>{user.firstname} {user.lastname}</p>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", color: "#059669" }}>+91 {user.phoneNumber}</p>
        </div>
      </div>
      <motion.button onClick={onLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", fontWeight: 600, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
        <LogOut size={13} /> Logout
      </motion.button>
    </div>
  );
}

export const METHODS = [
  { id: "website", icon: Globe, label: "Pay on Website", desc: "Instant payment via Easebuzz gateway", color: "#F3842C" },
  { id: "email", icon: Send, label: "Pay via Email Link", desc: "Get a payment link sent to your email", color: "#3B82F6" },
  { id: "cash", icon: Banknote, label: "Cash Payment", desc: "Register an offline cash donation", color: "#10B981" },
];

export function MethodCard({ method, selected, onClick }) {
  const Icon = method.icon;
  const active = selected === method.id;
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
      style={{ flex: 1, minWidth: 140, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "18px 12px", borderRadius: 16, border: active ? `2px solid ${method.color}` : "1.5px solid rgba(0,0,0,0.08)", background: active ? `${method.color}10` : "#FAFAF8", cursor: "pointer", transition: "all 0.2s" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: active ? `${method.color}20` : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={22} color={active ? method.color : "#888"} />
      </div>
      <span style={{ fontFamily: "var(--f-body)", fontSize: "0.8rem", fontWeight: 700, color: active ? method.color : "var(--c-bark)", textAlign: "center", lineHeight: 1.3 }}>{method.label}</span>
      <span style={{ fontFamily: "var(--f-body)", fontSize: "0.7rem", color: "var(--c-bark-muted)", textAlign: "center", lineHeight: 1.4 }}>{method.desc}</span>
      {active && <CheckCircle2 size={16} color={method.color} />}
    </motion.button>
  );
}

function generateQuestion() {
  const ops = [{ sym: "+", fn: (a, b) => a + b }, { sym: "-", fn: (a, b) => a - b }, { sym: "×", fn: (a, b) => a * b }];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const a = Math.floor(Math.random() * 9) + 1;
  const b = op.sym === "-" ? Math.floor(Math.random() * a) + 1 : Math.floor(Math.random() * 9) + 1;
  return { text: `${a} ${op.sym} ${b}`, answer: op.fn(a, b) };
}

export function MathCaptcha({ onVerify }) {
  const [q, setQ] = useState(() => generateQuestion());
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("idle");
  const refresh = () => { setQ(generateQuestion()); setVal(""); setStatus("idle"); onVerify(false); };
  const check = (input) => {
    setVal(input);
    if (input === "") { setStatus("idle"); onVerify(false); return; }
    const correct = parseInt(input, 10) === q.answer;
    setStatus(correct ? "correct" : "wrong");
    onVerify(correct);
    if (!correct && input.length >= 3) setTimeout(() => { setVal(""); setStatus("idle"); refresh(); }, 800);
  };
  const bc = status === "correct" ? "#10B981" : status === "wrong" ? "#EF4444" : "rgba(0,0,0,0.12)";
  const bg = status === "correct" ? "#ECFDF5" : status === "wrong" ? "#FEF2F2" : "#FAFAF8";
  return (
    <div style={{ background: "#FAFAF8", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "18px 20px", margin: "16px 0" }}>
      <p style={{ fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-bark-muted)", marginBottom: 12 }}>Security Check</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "linear-gradient(135deg,#F3842C,#E67E22)", borderRadius: 12, padding: "10px 18px", boxShadow: "0 4px 12px rgba(243,132,44,0.3)" }}>
            <span style={{ fontFamily: "var(--f-number)", fontSize: "1.25rem", fontWeight: 700, color: "white" }}>{q.text} = ?</span>
          </div>
          <motion.button type="button" onClick={refresh} whileHover={{ rotate: 180, scale: 1.1 }} transition={{ duration: 0.35 }}
            style={{ width: 34, height: 34, borderRadius: 10, background: "white", border: "1.5px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <RefreshCw size={15} color="#888" />
          </motion.button>
        </div>
        <div style={{ flex: 1, minWidth: 100 }}>
          <input type="number" value={val} onChange={e => check(e.target.value)} placeholder="Your answer"
            style={{ width: "100%", padding: "11px 14px", fontFamily: "var(--f-number)", fontSize: "1.05rem", fontWeight: 600, color: "#111", background: bg, border: `2px solid ${bc}`, borderRadius: 12, outline: "none", transition: "all 0.2s", boxSizing: "border-box" }} />
        </div>
        {status === "correct" && <CheckCircle2 size={22} color="#10B981" />}
        {status === "wrong" && <AlertCircle size={22} color="#EF4444" />}
      </div>
      {status === "correct" && <p style={{ fontFamily: "var(--f-body)", fontSize: "0.76rem", color: "#10B981", fontWeight: 600, marginTop: 8 }}>✓ Correct! You may proceed.</p>}
      {status === "wrong" && <p style={{ fontFamily: "var(--f-body)", fontSize: "0.76rem", color: "#EF4444", marginTop: 8 }}>That's not right — try again.</p>}
    </div>
  );
}
