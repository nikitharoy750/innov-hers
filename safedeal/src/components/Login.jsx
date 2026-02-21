import React, { useState, useEffect } from 'react';
import SettlrLogo from './SettlrLogo';
import './Login.css';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('customer');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add fade-in animation on mount
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      onLogin({
        username,
        contactNumber,
        role,
        userId: Math.random().toString(36).substr(2, 9).toUpperCase()
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-container">
            <SettlrLogo variant="vertical" size="large" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="role-selection">
            <h3>Select Your Role</h3>
            <div className="role-buttons">
              <button
                type="button"
                className={`role-btn ${role === 'customer' ? 'active' : ''}`}
                onClick={() => setRole('customer')}
              >
                <span className="role-icon">🛒</span>
                Customer
              </button>
              <button
                type="button"
                className={`role-btn ${role === 'vendor' ? 'active' : ''}`}
                onClick={() => setRole('vendor')}
              >
                <span className="role-icon">🏪</span>
                Vendor
              </button>
            </div>
          </div>

          <div className="form-fields">
            <div className="input-group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="input-group">
              <input
                type="tel"
                id="contact"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="contact">Contact Number</label>
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading || !username || !contactNumber}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In Securely'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>🔒 Your data is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
};

export default Login;