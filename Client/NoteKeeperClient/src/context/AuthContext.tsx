import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/AuthService";
import type { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a NotesProvider");
  return context;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Bozuk veri varsa temizle
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false); // Loading tamamlandı
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    const loggedInUser = await loginUser(usernameOrEmail, password);
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
