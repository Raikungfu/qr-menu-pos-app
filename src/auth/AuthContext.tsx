import { useLocation, useNavigate } from "react-router-dom";
import React, { createContext, useContext, ReactNode, useState } from "react";
import FormData from "form-data";

import useCheckLoginStatus from "@/hooks/useCheckLoginStatus";
import { LoginFormValues } from "@/pages/Login";
import { routes } from "@/routers";
import { API_LOGIN, API_LOGOUT } from "@/Service/User";
import Loading from "@/components/custom/Loading";

interface AuthContextType {
  user: string | null;
  login: (values: LoginFormValues) => void;
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
    return <Loading />;
  }

  const currentRoute = routes.find((route) => loc.pathname === route.path);

  if (currentRoute?.isAuth) {
    if (!isLoggedIn || error) {
      nav("/login");
      console.log("You are not allowed to access");
      return <div>You are not allowed to access</div>;
    }
  }

  const login = async (values: LoginFormValues) => {
    setUser(values.Email);
    const formData = new FormData();
    formData.append("Email", values.Email);
    formData.append("Password", values.Password);

    const result = await API_LOGIN(formData);
    if (result != null) {
      const resultParsed = result as unknown as {
        token: string;
        success: boolean;
      };
      localStorage.setItem("Token", resultParsed.token);
      window.location.href = "/";
    } else {
      console.log("Login failed");
    }
  };
  const logout = () => {
    localStorage.removeItem("Token");
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
