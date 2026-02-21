import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Dispute from "./pages/Dispute";
import SettlrLogo from './components/SettlrLogo';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactionData, setTransactionData] = useState(null);
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or default to system
    const saved = localStorage.getItem('safedeal-theme');
    return saved || 'system';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.setAttribute('data-theme', theme);
    }

    localStorage.setItem('safedeal-theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      root.setAttribute('data-theme', systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setTransactionData(null);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="#" className="navbar-logo settlr-logo-link" onClick={() => setCurrentPage('dashboard')}>
            <SettlrLogo variant="horizontal" size="small" />
          </a>
        </div>

        <div className="navbar-center">
          <div className="navbar-nav">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('transaction')}
              className={`nav-button ${currentPage === 'transaction' ? 'active' : ''}`}
            >
              Transaction
            </button>
            <button
              onClick={() => setCurrentPage('dispute')}
              className={`nav-button ${currentPage === 'dispute' ? 'active' : ''}`}
            >
              Disputes
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="theme-toggle">
            <button
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              ☀️
            </button>
            <button
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              🌙
            </button>
            <button
              className={`theme-option ${theme === 'system' ? 'active' : ''}`}
              onClick={() => handleThemeChange('system')}
            >
              💻
            </button>
          </div>

          <div className="user-profile">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.username}</div>
              <div className="user-role">{user?.role === 'customer' ? 'Customer' : 'Vendor'}</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'dashboard' && (
          <Dashboard
            user={user}
            onLogout={handleLogout}
            setCurrentPage={setCurrentPage}
            transactionData={transactionData}
            setTransactionData={setTransactionData}
          />
        )}
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'transaction' && (
          <Transaction
            user={user}
            setCurrentPage={setCurrentPage}
            setTransactionData={setTransactionData}
          />
        )}
        {currentPage === 'dispute' && <Dispute transactionData={transactionData} />}
      </main>
    </div>
  );
}

export default App;
