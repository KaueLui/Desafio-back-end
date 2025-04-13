import React, { useState, useEffect } from "react";
import TagList from "../components/Tags/TagList";
import TagForm from "../components/Tags/TagForm";
import { getTags } from "../services/tagService";

const TagPage = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const data = await getTags();
      setTags(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar tags:", err);
      setError 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Gerenciamento de Tags</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Nova Tag</h2>
          <TagForm onTagCreated={fetchTags} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Minhas Tags</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <TagList tags={tags} onTagsChanged={fetchTags} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TagPage;