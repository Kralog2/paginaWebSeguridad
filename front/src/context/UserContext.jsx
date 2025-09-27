//codigo sugerido por copilot
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
  return password.length >= 8;
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser)
      .catch((error) => {
        console.error("Failed to fetch current user: ", error);
        setUser(null);
      });
  }, []);

  const login = async (email, password) => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      return {
        ok: false,
        data: { message: "Invalid email or password format" },
      };
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }).catch(() => {
        return { ok: false, data: { message: "Error trying login." } };
      });
      const data = await res.json();
      if (res.ok) setUser(data);
      return { ok: res.ok, data };
    } catch {
      console.error("Login error:", err);
      return { ok: false, data: { message: "Ocurred an error" } };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error: ", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
