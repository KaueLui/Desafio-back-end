import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      console.log("Tentando fazer login...");
      const response = await login(email, password);
      console.log("Resposta da API:", response);
      
      // Usar o nome do usuário da resposta da API ou um nome padrão se não estiver disponível
      const userName = response.name || email.split('@')[0]; // Se não houver name, usa parte do email
      auth?.login(response.token, userName);
      
      console.log("Token armazenado:", response.token);
      console.log("Nome de usuário armazenado:", userName);
      console.log("Redirecionando para /dashboard...");
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return <Login onSubmit={handleLogin} error={error} isLoading={isLoading} />;
};

export default LoginPage;