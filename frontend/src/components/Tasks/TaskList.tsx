import React, { useState } from "react";
import { deleteTask } from "../../services/taskService";
import TaskTagSelector from "../TaskTag/TaskTagSelector";

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  createdAt: string;
  Tags?: Tag[];
}

interface TaskListProps {
  tasks: Task[];
  onTasksChanged: () => void;
}

const TaskList = ({ tasks, onTasksChanged }: TaskListProps) => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "em andamento": return "bg-blue-100 text-blue-800";
      case "finalizado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "text-red-600";
    if (priority >= 5) return "text-orange-500";
    return "text-green-600";
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setIsDeleting(id);
      try {
        await deleteTask(id);
        onTasksChanged();
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        alert("Erro ao excluir tarefa");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const toggleTaskExpand = (taskId: number) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskId);
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <div key={task.id} className="py-4">
          <div className="flex justify-between items-start">
            <h3 
              className="text-lg font-semibold cursor-pointer hover:text-blue-600"
              onClick={() => toggleTaskExpand(task.id)}
            >
              {task.title}
            </h3>
            <div className="flex space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 ${getPriorityColor(task.priority)}`}>
                P: {task.priority}
              </span>
            </div>
          </div>
          
          {task.description && (
            <p className="mt-2 text-sm text-gray-600">{task.description}</p>
          )}
          
          {task.Tags && task.Tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {task.Tags.map(tag => (
                <span 
                  key={tag.id}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: tag.color + '33', color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Criado em: {new Date(task.createdAt).toLocaleDateString()}</span>
            <div className="flex space-x-2">
              <button 
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {/* Ainda vou colocar a  edição */}}
              >
                Editar
              </button>
              <button 
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(task.id)}
                disabled={isDeleting === task.id}
              >
                {isDeleting === task.id ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
          
          {expandedTask === task.id && (
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <TaskTagSelector 
                taskId={task.id}
                currentTags={task.Tags || []}
                onTagsChanged={onTasksChanged}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;