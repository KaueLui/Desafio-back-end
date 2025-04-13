import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTasks } from "../services/taskService";
import { getTags } from "../services/tagService";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await getTasks();
        const tagsData = await getTags();
        setTasks(tasksData);
        setTags(tagsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Bem-vindo, {auth?.user || "Usuário"}!
      </h1>
      <div className="flex justify-center space-x-4 mb-8">
        <Link
          to="/tasks"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Gerenciar Tarefas
        </Link>
        <Link
          to="/tags"
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Gerenciar Tags
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;