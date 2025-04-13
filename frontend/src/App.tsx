import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";
import TagPage from "./pages/TagPage";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthReady(true);
  }, []);

  if (!isAuthReady) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/tags" element={<TagPage />} />
      </Routes>
    </Router>
  );
};

export default App;