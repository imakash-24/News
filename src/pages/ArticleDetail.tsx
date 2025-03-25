import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article } from '../types';
import { ArrowLeft } from 'lucide-react';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock article data - in a real app, this would be fetched based on the ID
  const article: Article = {
    id: Number(id),
    title: "The Future of AI in Healthcare",
    summary: "Artificial Intelligence is revolutionizing healthcare diagnostics...",
    category: "Technology",
    sentiment: "positive",
    content: `Artificial Intelligence is making unprecedented strides in healthcare, 
    transforming everything from diagnostic procedures to patient care management. 
    Recent developments in machine learning algorithms have shown remarkable accuracy 
    in detecting various medical conditions, sometimes surpassing human experts.
    
    The integration of AI in healthcare systems has led to:
    - Faster and more accurate diagnoses
    - Reduced healthcare costs
    - Improved patient outcomes
    - More efficient hospital operations
    
    However, challenges remain in terms of data privacy, regulatory compliance, 
    and ensuring that AI systems remain transparent and explainable to both 
    healthcare providers and patients.`
  };

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sky-600 hover:text-sky-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to articles
      </button>

      <article className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <span className="text-sky-600 text-sm font-semibold">{article.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{article.title}</h1>
        </div>

        <div className="prose max-w-none">
          {article.content?.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;