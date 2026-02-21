import React from 'react';
import './Home.css';

const Home = ({ setCurrentPage }) => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>🛡️ Settlr</h1>
          <h2>Secure Every Transaction</h2>
          <p>Your trusted partner for safe digital commerce. Create, manage, and protect your transactions with our advanced escrow system.</p>
          <div className="hero-actions">
            <button className="cta-button primary" onClick={() => setCurrentPage('transaction')}>
              Create New Transaction
            </button>
            <button className="cta-button secondary" onClick={() => setCurrentPage('dashboard')}>
              View Dashboard
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="security-shield">
            <div className="shield-icon">🛡️</div>
            <div className="shield-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Platform Features</h2>
          <p>Everything you need for secure transactions</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Escrow</h3>
            <p>Funds are safely locked until both parties confirm delivery</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Protection</h3>
            <p>2% protection fee covers fraud prevention and dispute resolution</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Flexible Timers</h3>
            <p>Choose from 24-72 hour transaction windows</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Fraud Prevention</h3>
            <p>AI-powered detection with identity verification</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Smart Disputes</h3>
            <p>Automated resolution with detailed investigation reports</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Tracking</h3>
            <p>Monitor transaction progress from creation to completion</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
