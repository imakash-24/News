import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Newspaper, Bell, User, Menu, X } from 'lucide-react';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNotifications = () => {
    navigate('/notifications');
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed position */}
      <header className="fixed top-0 left-0 right-0 bg-sky-500 shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white font-sans">NewsFlow</span>
            </Link>

            <div className="flex items-center">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8 mr-8">
                <Link to="/" className="text-white hover:text-white group transition-all duration-300 font-sans">
                  Home
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                </Link>
                <Link to="/categories" className="text-white hover:text-white group transition-all duration-300 font-sans">
                  Categories
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                </Link>
                <Link to="/saved" className="text-white hover:text-white group transition-all duration-300 font-sans">
                  Saved
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                </Link>
              </nav>

              {/* User actions */}
              <div className="flex items-center space-x-6">
                <button 
                  onClick={handleNotifications}
                  className="text-white hover:text-sky-100 transition-colors duration-300"
                  title="Notifications"
                >
                  <Bell className="h-6 w-6" />
                </button>
                <button 
                  onClick={handleProfile}
                  className="text-white hover:text-sky-100 transition-colors duration-300"
                  title="Profile"
                >
                  <User className="h-6 w-6" />
                </button>
                {/* Mobile menu button */}
                <button 
                  className="md:hidden text-white hover:text-sky-100 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-sky-400">
              <Link to="/" className="block py-2 text-white hover:bg-sky-600 px-4 rounded font-sans" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/categories" className="block py-2 text-white hover:bg-sky-600 px-4 rounded font-sans" onClick={() => setIsMenuOpen(false)}>
                Categories
              </Link>
              <Link to="/saved" className="block py-2 text-white hover:bg-sky-600 px-4 rounded font-sans" onClick={() => setIsMenuOpen(false)}>
                Saved
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main content - with padding for fixed header */}
      <main className="container mx-auto px-4 py-8 mt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;