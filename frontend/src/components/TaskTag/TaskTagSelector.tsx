import React, { useState, useEffect } from 'react';
import { getTags } from '../../services/tagService';
import { addTagToTask, removeTagFromTask } from '../../services/taskService';

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TaskTagSelectorProps {
  taskId: number;
  currentTags: Tag[];
  onTagsChanged: () => void;
}

const TaskTagSelector: React.FC<TaskTagSelectorProps> = ({ taskId, currentTags, onTagsChanged }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const allTags = await getTags();
        // Filtrar tags que já estão associadas à tarefa
        const availableTags = allTags.filter(
          (tag: Tag) => !currentTags.some((currentTag) => currentTag.id === tag.id)
        );
        setTags(availableTags);
        if (availableTags.length > 0) {
          setSelectedTagId(availableTags[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar tags:", error);
        setError("Não foi possível carregar as tags disponíveis.");
      }
    };

    loadTags();
  }, [currentTags]);

  const handleAddTag = async () => {
    if (!selectedTagId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await addTagToTask(taskId, selectedTagId);
      onTagsChanged();
    } catch (error) {
      console.error("Erro ao adicionar tag:", error);
      setError("Não foi possível adicionar a tag à tarefa.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTag = async (tagId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await removeTagFromTask(taskId, tagId);
      onTagsChanged();
    } catch (error) {
      console.error("Erro ao remover tag:", error);
      setError("Não foi possível remover a tag da tarefa.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-sm mt-2">{error}</div>;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {currentTags.length > 0 ? (
          currentTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: tag.color + '33', color: tag.color }}
            >
              {tag.name}
              <button
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xs">Nenhuma tag associada</p>
        )}
      </div>

      {tags.length > 0 ? (
        <div className="flex items-center gap-2">
          <select
            value={selectedTagId}
            onChange={(e) => setSelectedTagId(Number(e.target.value))}
            className="block text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading || tags.length === 0}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddTag}
            disabled={isLoading || !selectedTagId}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Adicionando..." : "Adicionar Tag"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-xs">Não há mais tags disponíveis para adicionar</p>
      )}
    </div>
  );
};

export default TaskTagSelector;