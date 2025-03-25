import NewsCard from '../components/NewsCard';
import { Article } from '../types';
import { SavedArticlesContext } from '../App';
import { useContext } from 'react';

// Mock news data
const newsArticles = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    summary: "Artificial Intelligence is revolutionizing healthcare diagnostics...",
    category: "Technology",
    sentiment: "positive"
  },
  {
    id: 2,
    title: "Sustainable Energy Breakthrough",
    summary: "New solar technology achieves record efficiency...",
    category: "Science",
    sentiment: "positive"
  },
  {
    id: 3,
    title: "Global Market Trends 2024",
    summary: "Analysis of emerging market trends and predictions...",
    category: "Business",
    sentiment: "neutral"
  },
  {
    id: 4,
    title: "Space Exploration Milestone",
    summary: "New discoveries from the latest Mars mission...",
    category: "Science",
    sentiment: "positive"
  },
  {
    id: 5,
    title: "Cybersecurity Threats Evolution",
    summary: "Latest developments in digital security landscape...",
    category: "Technology",
    sentiment: "negative"
  },
  {
    id: 6,
    title: "Environmental Policy Changes",
    summary: "New global initiatives for climate change...",
    category: "Politics",
    sentiment: "neutral"
  }
] as Article[];

function Home() {
  const { savedArticles, setSavedArticles } = useContext(SavedArticlesContext);

  const handleSave = (article: Article) => {
    if (!savedArticles.find(a => a.id === article.id)) {
      setSavedArticles([...savedArticles, article]);
      alert('Article saved successfully!');
    } else {
      alert('Article already saved!');
    }
  };

  const handleShare = (article: Article) => {
    alert(`Sharing article: ${article.title}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {newsArticles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onSave={handleSave}
          onShare={handleShare}
        />
      ))}
    </div>
  );
}

export default Home;