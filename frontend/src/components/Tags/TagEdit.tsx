import React, { useState, useEffect } from 'react';
import { updateTag } from '../../services/tagService';

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TagEditModalProps {
  tag: Tag;
  onClose: () => void;
  onTagUpdated: () => void;
}

const TagEditModal = ({ tag, onClose, onTagUpdated }: TagEditModalProps) => {
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(tag.name);
    setColor(tag.color);
  }, [tag]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await updateTag(tag.id, { name, color });
      onTagUpdated();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar tag:', error);
      setError('Ocorreu um erro ao atualizar a tag. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Editar Tag</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome da Tag
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Cor da Tag
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 border-0 cursor-pointer rounded"
              />
              <span className="text-sm">{color}</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagEditModal;