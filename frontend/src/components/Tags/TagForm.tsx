import React, { useState } from "react";
import { createTag } from "../../services/tagService";

interface TagFormProps {
  onTagCreated: () => void;
}

const TagForm = ({ onTagCreated }: TagFormProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6D28D9");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await createTag({ name, color });
      setSuccess("Tag criada com sucesso!");
      
      setName("");
      setColor("#6D28D9");
      
      onTagCreated();
    } catch (error) {
      console.error("Erro ao criar tag:", error);
      setError("Erro ao criar tag. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);

      if (success) {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome da Tag
        </label>
        <input
          type="text"
          id="name"
          placeholder="Nome da tag"
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
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Criando..." : "Criar Tag"}
        </button>
      </div>
    </form>
  );
};

export default TagForm;