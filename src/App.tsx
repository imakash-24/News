import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NhostProvider, useUserData, useAuthenticationStatus } from '@nhost/react';
import { nhost } from './nhost';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Saved from './pages/Saved';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Article } from './types';

// ✅ Export `SavedArticlesContext`
export const SavedArticlesContext = createContext<{
  savedArticles: Article[];
  setSavedArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}>({
  savedArticles: [],
  setSavedArticles: () => {},
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUserData();
  const { isAuthenticated } = useAuthenticationStatus();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.emailVerified === false) {
    return <div>Please verify your email to access the account.</div>;
  }

  return children;
}

function App() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  return (
    <NhostProvider nhost={nhost}>
      <SavedArticlesContext.Provider value={{ savedArticles, setSavedArticles }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="categories" element={<Categories />} />
              <Route path="saved" element={<Saved />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="article/:id" element={<ArticleDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </SavedArticlesContext.Provider>
    </NhostProvider>
  );
}

export default App;
