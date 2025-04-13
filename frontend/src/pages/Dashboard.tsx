import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTasks } from "../services/taskService";
import { getTags } from "../services/tagService";
import MainLayout from "../components/Layout/MainLayout";
import { ChevronRight, CheckCircle, Clock, AlertTriangle, Star } from "lucide-react";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    highPriority: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [tasksData, tagsData] = await Promise.all([
          getTasks(),
          getTags()
        ]);
        setTasks(tasksData);
        setTags(tagsData);
        
        // Calcular estatísticas
        const total = tasksData.length;
        const completed = tasksData.filter((task: any) => 
          task.status.toLowerCase() === 'finalizado').length;
        const inProgress = tasksData.filter((task: any) => 
          task.status.toLowerCase() === 'Andamento').length;
        const pending = tasksData.filter((task: any) => 
          task.status.toLowerCase() === 'pendente').length;
        const highPriority = tasksData.filter((task: any) => 
          task.priority >= 8).length;
          
        setStats({
          total,
          completed,
          inProgress,
          pending,
          highPriority
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    status = status.toLowerCase();
    if (status === 'finalizado') return <CheckCircle size={16} className="text-green-600" />;
    if (status === 'Andamento') return <Clock size={16} className="text-blue-600" />;
    return <AlertTriangle size={16} className="text-yellow-600" />;
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "text-red-600";
    if (priority >= 5) return "text-orange-500";
    return "text-green-600";
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">
              Olá, <span className="text-indigo-600">{auth?.user || "Usuário"}</span>!
            </h1>
            <p className="mt-2 text-gray-600">Aqui está o resumo da sua produtividade</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="relative">
                <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-sm text-gray-600">Carregando seus dados...</div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-5 border-indigo-500 border-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total de Tarefas</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5 border-green-500 border-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Finalizadas</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5 border-blue-500 border-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Andamento</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5 border-red-500 border-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Alta Prioridade</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.highPriority}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <Star className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Tarefas Recentes</h2>
                        <Link to="/tasks" className="flex items-center text-sm text-blue-100 hover:text-white transition">
                          Ver todas <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      {tasks.length > 0 ? (
                        <div className="space-y-4">
                          {tasks.slice(0, 5).map((task: any) => (
                            <div key={task.id} className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition">
                              <div className="mr-3 mt-0.5">
                                {getStatusIcon(task.status)}
                              </div>
                              <div className="flex-grow min-w-0">
                                <h3 className="font-medium text-gray-800 mb-1 truncate">{task.title}</h3>
                                <p className="text-sm text-gray-500 truncate">{task.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {task.Tags && task.Tags.slice(0, 3).map((tag: any) => (
                                    <span 
                                    key={tag.id} 
                                    className="px-3 py-2 rounded-full text-sm inline-flex items-center transition-transform hover:scale-105"
                                    style={{ backgroundColor: tag.color + '15', color: tag.color, border: `2px solid ${tag.color}` }}
                                    >
                                      {tag.name}
                                    </span>
                                  ))}
                                  {task.Tags && task.Tags.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                      +{task.Tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="ml-4 flex flex-col items-end">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  task.status.toLowerCase() === 'finalizado' ? 'bg-green-100 text-green-800' : 
                                  task.status.toLowerCase() === 'Andamento' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {task.status}
                                </span>
                                <span className={`text-xs mt-2 font-medium ${getPriorityColor(task.priority)}`}>
                                  Prioridade: {task.priority}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma tarefa encontrada</h3>
                          <p className="mt-1 text-sm text-gray-500">Comece criando sua primeira tarefa.</p>
                          <div className="mt-6">
                            <Link to="/tasks" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                              Criar tarefa
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Suas Tags</h2>
                        <Link to="/tags" className="flex items-center text-sm text-purple-100 hover:text-white transition">
                          Ver todas <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      {tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag: any) => (
                            <div 
                            key={tag.id} 
                            className="px-3 py-2 rounded-full text-sm inline-flex items-center transition-transform hover:scale-105"
                            style={{ backgroundColor: tag.color + '15', color: tag.color, border: `2px solid ${tag.color}` }}
                            >
                              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: tag.color }}></span>
                              {tag.name}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma tag encontrada</h3>
                          <p className="mt-1 text-sm text-gray-500">Crie tags para organizar suas tarefas.</p>
                          <div className="mt-6">
                            <Link to="/tags" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                              Criar tag
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;