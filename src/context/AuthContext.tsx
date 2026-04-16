"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "guest" | "host";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: User & { password?: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Mock persistence for demo purposes
  useEffect(() => {
    const savedUser = localStorage.getItem("staywell_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      name: "John Doe",
      email,
      role: "guest",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    };
    setUser(mockUser);
    localStorage.setItem("staywell_user", JSON.stringify(mockUser));
    router.push("/properties");
  };

  const signup = async (userData: User & { password?: string }) => {
    // Mock signup
    setUser(userData);
    localStorage.setItem("staywell_user", JSON.stringify(userData));
    
    if (userData.role === "host") {
      router.push("/dashboard");
    } else {
      router.push("/properties");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("staywell_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
