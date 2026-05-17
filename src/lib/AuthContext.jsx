import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("uaw_user");
      const phone = localStorage.getItem("uaw_phone");
      if (stored && phone) {
        setUser({ ...JSON.parse(stored), phoneNumber: phone });
      }
    } catch {
      localStorage.removeItem("uaw_user");
      localStorage.removeItem("uaw_phone");
    }
    setLoading(false);
  }, []);

  const login = (userData, phoneNumber) => {
    const u = { ...userData, phoneNumber };
    setUser(u);
    localStorage.setItem("uaw_user", JSON.stringify(userData));
    localStorage.setItem("uaw_phone", phoneNumber);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uaw_user");
    localStorage.removeItem("uaw_phone");
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
