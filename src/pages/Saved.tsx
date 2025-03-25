import React, { useContext } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types';
import { SavedArticlesContext } from '../App';
import { Trash2 } from 'lucide-react';

function Saved() {
  const { savedArticles, setSavedArticles } = useContext(SavedArticlesContext);

  const handleRemove = (article: Article) => {
    setSavedArticles(savedArticles.filter(a => a.id !== article.id));
    alert('Article removed from saved!');
  };

  const handleShare = (article: Article) => {
    alert(`Sharing article: ${article.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Articles</h1>
        {savedArticles.length > 0 && (
          <span className="text-sky-600 font-semibold">
            {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'} saved
          </span>
        )}
      </div>

      {savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <div key={article.id} className="relative group">
              <button
                onClick={() => handleRemove(article)}
                className="absolute -top-2 -right-2 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Remove from saved"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <NewsCard
                article={article}
                onSave={() => handleRemove(article)}
                onShare={handleShare}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">No saved articles yet.</p>
          <p className="text-gray-500 text-sm">Articles you save will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default Saved;