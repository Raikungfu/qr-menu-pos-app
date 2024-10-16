import { API_BASE_URL } from "@/constants/constant";
import useCheckLoginStatus from "@/hooks/useCheckLoginStatus";
import { routes } from "@/routers";
import { API_LOGOUT } from "@/Service/User";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const { isLoggedIn, loading, error } = useCheckLoginStatus();
  const nav = useNavigate();
  const loc = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  const currentRoute = routes.find((route) => loc.pathname === route.path);

  if (currentRoute?.isAuth) {
    if (error || !isLoggedIn) {
      nav("/login");
      return <div>You are not allowed to access</div>;
    }
  }

  const login = (email: string) => {
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
    API_LOGOUT();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
