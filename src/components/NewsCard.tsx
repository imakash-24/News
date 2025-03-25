import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bookmark, Share2 } from 'lucide-react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  onSave: (article: Article) => void;
  onShare: (article: Article) => void;
}

function NewsCard({ article, onSave, onShare }: NewsCardProps) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-xl relative"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)'
      }}
    >
      <div 
        className="absolute top-0 left-0 w-2 h-full"
        style={{
          backgroundColor: 
            article.sentiment === 'positive' ? '#22c55e' : 
            article.sentiment === 'negative' ? '#ef4444' : 
            '#f97316'
        }}
      />
      <div className="p-6 pl-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sky-600 text-sm font-semibold font-sans">{article.category}</span>
          <span className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: 
                article.sentiment === 'positive' ? '#dcfce7' : 
                article.sentiment === 'negative' ? '#fee2e2' : 
                '#fff7ed',
              color: 
                article.sentiment === 'positive' ? '#166534' : 
                article.sentiment === 'negative' ? '#991b1b' : 
                '#9a3412'
            }}
          >
            {article.sentiment}
          </span>
        </div>
        <h3 className="text-gray-900 text-xl font-bold mb-3 font-sans">{article.title}</h3>
        <p className="text-gray-600 text-sm font-sans">{article.summary}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-4">
          <button 
            onClick={handleReadMore}
            className="text-sky-600 hover:text-sky-800 transition-colors duration-300" 
            title="Read More"
          >
            <BookOpen className="h-5 w-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave(article);
            }}
            className="text-sky-600 hover:text-sky-800 transition-colors duration-300" 
            title="Save"
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onShare(article);
            }}
            className="text-sky-600 hover:text-sky-800 transition-colors duration-300" 
            title="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;