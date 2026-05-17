import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, RefreshCw, ChevronLeft, ChevronRight, Phone, Filter, ArrowUpDown, CreditCard, Loader2, AlertCircle, CheckCircle2, Clock, XCircle, Banknote, Globe, Send, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDonationHistoryBySort, getDonationHistoryByPhone, getDonationHistoryByMode } from "../lib/api";

const FILTERS = [
  { id: "sort", label: "Date wise Sort", icon: ArrowUpDown },
  { id: "phone", label: "Find by Phone Number", icon: Phone },
  { id: "mode", label: "Find by Payment Mode", icon: Filter },
];

const MODES = ["UPI", "Cash", "NetBanking", "Wallet", "Card"];

const statusBadge = (status) => {
  const s = (status || "").toUpperCase();
  if (s === "SUCCESS") return { bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", color: "#059669", border: "rgba(16,185,129,0.25)", icon: CheckCircle2 };
  if (s === "PENDING") return { bg: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", color: "#D97706", border: "rgba(245,158,11,0.25)", icon: Clock };
  return { bg: "linear-gradient(135deg,#FEF2F2,#FEE2E2)", color: "#DC2626", border: "rgba(220,38,38,0.25)", icon: XCircle };
};

const modeIcon = (mode) => {
  const m = (mode || "").toLowerCase();
  if (m === "cash") return Banknote;
  if (m.includes("upi") || m.includes("website")) return Globe;
  if (m.includes("link") || m.includes("email")) return Send;
  return CreditCard;
};

export default function AdminPanel() {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("sort");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [modeSearch, setModeSearch] = useState("UPI");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const size = 8;

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
    else if (!isAdmin) navigate("/", { replace: true });
  }, [isLoggedIn, isAdmin, navigate]);

  const fetchData = useCallback(async (p = 0) => {
    setLoading(true); setError("");
    try {
      let res;
      if (filter === "sort") res = await getDonationHistoryBySort(p, size, "createdAt");
      else if (filter === "phone") {
        if (!phoneSearch || phoneSearch.length < 10) { setError("Enter a valid 10-digit phone number"); setLoading(false); return; }
        res = await getDonationHistoryByPhone(p, size, phoneSearch);
      } else if (filter === "mode") res = await getDonationHistoryByMode(p, size, modeSearch);
      setData(res);
      setPage(p);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch data");
    } finally { setLoading(false); }
  }, [filter, phoneSearch, modeSearch]);

  useEffect(() => { if (isAdmin) fetchData(0); }, [filter, isAdmin]);

  if (!isLoggedIn || !isAdmin) return null;

  const rows = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;

  const formatDate = (dt) => {
    if (!dt) return "—";
    const d = new Date(dt);
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) + ", " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ background: "var(--c-cream)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page-hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="section-label" style={{ justifyContent: "center", color: "var(--c-amber-light)", marginBottom: 12 }}>Admin</p>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            <span style={{ color: "#F3842C" }}>Admin</span> Panel
          </h1>
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto" }}>View and manage all donation transactions.</p>
        </div>
      </div>

      <div className="section-container" style={{ paddingTop: 50, paddingBottom: 80, maxWidth: 1000 }}>
        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { label: "Total Records", value: totalElements, color: "#F3842C", icon: CreditCard },
            { label: "Current Page", value: `${page + 1} / ${totalPages || 1}`, color: "#3B82F6", icon: ArrowUpDown },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, minWidth: 180, background: "white", borderRadius: 20, padding: "20px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 600, color: "var(--c-bark-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</p>
                <p style={{ fontFamily: "var(--f-display)", fontSize: "1.35rem", fontWeight: 700, color: "var(--c-bark)" }}>{s.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ background: "white", borderRadius: 22, padding: "24px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Shield size={18} color="#F3842C" />
            <span style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-bark-muted)" }}>Filter Transactions</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {FILTERS.map(f => (
              <motion.button key={f.id} onClick={() => { setFilter(f.id); setPage(0); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 12, fontFamily: "var(--f-body)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", border: filter === f.id ? "2px solid #F3842C" : "1.5px solid rgba(0,0,0,0.08)", background: filter === f.id ? "#FFF4EB" : "#FAFAF8", color: filter === f.id ? "#F3842C" : "var(--c-bark-muted)", transition: "all 0.2s" }}>
                <f.icon size={15} /> {f.label}
              </motion.button>
            ))}
          </div>

          {filter === "phone" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                <Phone size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#F3842C", opacity: 0.6 }} />
                <input value={phoneSearch} onChange={e => setPhoneSearch(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10-digit phone number" maxLength={10}
                  style={{ width: "100%", padding: "12px 16px 12px 42px", fontFamily: "var(--f-body)", fontSize: "0.92rem", fontWeight: 500, color: "#111", background: "#FAFAF8", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, outline: "none", boxSizing: "border-box" }} />
              </div>
              <motion.button onClick={() => fetchData(0)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 20px", borderRadius: 12, background: "linear-gradient(135deg,#F3842C,#E67E22)", color: "white", fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(243,132,44,0.3)" }}>
                <Search size={16} /> Search
              </motion.button>
            </motion.div>
          )}

          {filter === "mode" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MODES.map(m => (
                <motion.button key={m} onClick={() => { setModeSearch(m); }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  style={{ padding: "9px 18px", borderRadius: 10, fontFamily: "var(--f-body)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", border: modeSearch === m ? "2px solid #F3842C" : "1.5px solid rgba(0,0,0,0.08)", background: modeSearch === m ? "#FFF4EB" : "#FAFAF8", color: modeSearch === m ? "#F3842C" : "var(--c-bark-muted)", transition: "all 0.2s" }}>
                  {m}
                </motion.button>
              ))}
              <motion.button onClick={() => fetchData(0)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, background: "linear-gradient(135deg,#F3842C,#E67E22)", color: "white", fontFamily: "var(--f-body)", fontSize: "0.84rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(243,132,44,0.3)" }}>
                <Search size={15} /> Search
              </motion.button>
            </motion.div>
          )}

          <motion.button onClick={() => fetchData(page)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 16, padding: "10px 20px", borderRadius: 12, background: "#FAFAF8", border: "1.5px solid rgba(0,0,0,0.08)", fontFamily: "var(--f-body)", fontSize: "0.84rem", fontWeight: 600, color: "var(--c-bark-muted)", cursor: "pointer" }}>
            <RefreshCw size={15} /> Refresh Data
          </motion.button>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 14, padding: "14px 20px", marginBottom: 20 }}>
            <AlertCircle size={18} color="#DC2626" />
            <span style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem", color: "#DC2626", fontWeight: 500 }}>{error}</span>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <Loader2 size={36} color="#F3842C" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        )}

        {/* Transaction Table */}
        {!loading && rows.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ background: "white", borderRadius: 22, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 0.8fr 0.7fr 0.7fr", padding: "16px 24px", background: "linear-gradient(135deg,#1E293B,#334155)", gap: 8 }}>
              {["Donor", "Transaction", "Amount", "Mode", "Status"].map(h => (
                <span key={h} style={{ fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {rows.map((r, i) => {
              const sb = statusBadge(r.status);
              const MIcon = modeIcon(r.paymentMode);
              const StatusIcon = sb.icon;
              return (
                <motion.div key={r.transactionId || i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 0.8fr 0.7fr 0.7fr", padding: "16px 24px", gap: 8, alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.04)", background: i % 2 === 0 ? "#FAFAF8" : "white" }}>
                  {/* Donor */}
                  <div>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--c-bark)", marginBottom: 2 }}>{r.name || "—"}</p>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "0.75rem", color: "var(--c-bark-muted)" }}>{r.phoneNumber || "—"}</p>
                  </div>
                  {/* Transaction */}
                  <div>
                    <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.78rem", fontWeight: 600, color: "var(--c-bark)", marginBottom: 2, wordBreak: "break-all" }}>{r.transactionId || "—"}</p>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "0.72rem", color: "var(--c-bark-muted)" }}>{formatDate(r.createdAt)}</p>
                  </div>
                  {/* Amount */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontFamily: "var(--f-number)", fontSize: "1rem", fontWeight: 700, color: "#F3842C" }}>₹{parseFloat(r.amount || 0).toLocaleString()}</span>
                  </div>
                  {/* Mode */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MIcon size={14} color="var(--c-bark-muted)" />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: "0.78rem", fontWeight: 500, color: "var(--c-bark-muted)", textTransform: "uppercase" }}>{r.paymentMode || "—"}</span>
                  </div>
                  {/* Status */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, background: sb.bg, border: `1px solid ${sb.border}` }}>
                    <StatusIcon size={13} color={sb.color} />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: "0.74rem", fontWeight: 700, color: sb.color }}>{(r.status || "—").toUpperCase()}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && rows.length === 0 && !error && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <CreditCard size={48} color="#D1D5DB" style={{ marginBottom: 16 }} />
            <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)" }}>No transactions found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 24 }}>
            <motion.button onClick={() => fetchData(page - 1)} disabled={page <= 0} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 18px", borderRadius: 12, background: page <= 0 ? "#F3F4F6" : "white", border: "1.5px solid rgba(0,0,0,0.08)", fontFamily: "var(--f-body)", fontSize: "0.84rem", fontWeight: 600, color: page <= 0 ? "#D1D5DB" : "var(--c-bark)", cursor: page <= 0 ? "not-allowed" : "pointer" }}>
              <ChevronLeft size={16} /> Prev
            </motion.button>

            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = page < 3 ? i : page > totalPages - 4 ? totalPages - 5 + i : page - 2 + i;
                if (p < 0 || p >= totalPages) return null;
                return (
                  <motion.button key={p} onClick={() => fetchData(p)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                    style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", border: p === page ? "2px solid #F3842C" : "1.5px solid rgba(0,0,0,0.08)", background: p === page ? "#FFF4EB" : "white", color: p === page ? "#F3842C" : "var(--c-bark-muted)" }}>
                    {p + 1}
                  </motion.button>
                );
              })}
            </div>

            <motion.button onClick={() => fetchData(page + 1)} disabled={page >= totalPages - 1} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 18px", borderRadius: 12, background: page >= totalPages - 1 ? "#F3F4F6" : "white", border: "1.5px solid rgba(0,0,0,0.08)", fontFamily: "var(--f-body)", fontSize: "0.84rem", fontWeight: 600, color: page >= totalPages - 1 ? "#D1D5DB" : "var(--c-bark)", cursor: page >= totalPages - 1 ? "not-allowed" : "pointer" }}>
              Next <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </div>
  );
}
