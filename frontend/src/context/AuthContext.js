import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [role, setRole] = useState(() => localStorage.getItem("role") || "umkm");
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    // Fungsi login: set state dan localStorage
    const login = (newToken, newRole) => {
        setToken(newToken);
        setRole(newRole);
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", newRole);
    };

    // Fungsi logout: reset state dan localStorage
    const logout = () => {
        setToken("");
        setRole("umkm");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    // Sync state jika localStorage berubah (opsional, multi-tab support)
    useEffect(() => {
        const onStorage = () => {
            setRole(localStorage.getItem("role") || "umkm");
            setToken(localStorage.getItem("token") || "");
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <AuthContext.Provider value={{ role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook custom supaya lebih clean
export function useAuth() {
    return useContext(AuthContext);
}
