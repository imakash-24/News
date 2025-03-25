export interface Article {
  id: number;
  title: string;
  summary: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  content?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  savedArticles: Article[];
}