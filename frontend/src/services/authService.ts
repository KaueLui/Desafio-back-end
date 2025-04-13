import api from "./api";

interface LoginResponse {
  token: string;
  name?: string;
  user?: {
    name: string;
  };
  message: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("Resposta bruta do login:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro no login (service):", error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};