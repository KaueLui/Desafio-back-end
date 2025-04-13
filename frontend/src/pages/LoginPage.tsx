import React, { useState, useContext } from "react";
import Login from "../components/Auth/Login";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await login(email, password);
      auth?.login(response.token, "Usuário");
      console.log("Login bem-sucedido:", response);
      
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      setError("Falha no login. Verifique suas credenciais.");
      setIsLoading(false);
    }
  };

  return <Login onSubmit={handleLogin} error={error} isLoading={isLoading} />;
};

export default LoginPage;