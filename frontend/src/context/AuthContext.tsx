import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  user: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Carregar token e nome do usuário do localStorage na inicialização
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("userName");
    
    if (savedToken) {
      setToken(savedToken);
    }
    
    if (savedUser) {
      setUser(savedUser);
    }
    
    console.log("AuthContext inicializado:", { token: savedToken, user: savedUser });
  }, []);

  const login = (token: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", username);
    setToken(token);
    setUser(username);
    console.log("Login realizado:", { token, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUser(null);
    console.log("Logout realizado");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};