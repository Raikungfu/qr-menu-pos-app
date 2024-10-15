import { API_BASE_URL } from "@/constants/constant";
import useCheckLoginStatus from "@/hooks/useCheckLoginStatus";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useCheckLoginStatus();
  const [user, setUser] = useState<string | null>(null);  

  if(!isLoggedIn) {
    window.location.href = API_BASE_URL;
    return <div>You are not allowed to access</div>
  }

  const login = (email: string) => {
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = API_BASE_URL;
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
