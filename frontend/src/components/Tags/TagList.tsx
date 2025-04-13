import React, { useState } from "react";
import { deleteTag } from "../../services/tagService";

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TagListProps {
  tags: Tag[];
  onTagsChanged: () => void;
}

const TagList = ({ tags, onTagsChanged }: TagListProps) => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta tag?")) {
      setIsDeleting(id);
      try {
        await deleteTag(id);
        onTagsChanged();
      } catch (error) {
        console.error("Erro ao excluir tag:", error);
        alert("Erro ao excluir tag");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  if (tags.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma tag encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tags.map((tag) => (
        <div 
          key={tag.id} 
          className="flex items-center justify-between p-3 bg-white border rounded-md shadow-sm"
          style={{ borderLeftColor: tag.color, borderLeftWidth: '4px' }}
        >
          <div className="flex items-center">
            <div 
              className="w-4 h-4 mr-2 rounded-full" 
              style={{ backgroundColor: tag.color }}
            ></div>
            <span className="font-medium">{tag.name}</span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => {/* mesma coisa, ainda vou por edição */}}
            >
              Editar
            </button>
            <button 
              className="text-red-600 hover:text-red-800 text-sm"
              onClick={() => handleDelete(tag.id)}
              disabled={isDeleting === tag.id}
            >
              {isDeleting === tag.id ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagList;