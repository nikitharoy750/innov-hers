import React, { useState, useEffect } from 'react';
import StatusProgressTracker from './StatusProgressTracker';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, setCurrentPage, transactionData, setTransactionData }) => {
  const [protectionScore, setProtectionScore] = useState(95);
  const [disputeFrequency, setDisputeFrequency] = useState(0.02);
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 'TX001',
      amount: 150,
      status: 'completed',
      date: '2024-02-20',
      role: user.role
    },
    {
      id: 'TX002',
      amount: 75,
      status: 'in_progress',
      date: '2024-02-19',
      role: user.role
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setProtectionScore(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateTransaction = () => {
    setCurrentPage('transaction');
  };

  const handleViewDisputes = () => {
    setCurrentPage('dispute');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user.username}!</h1>
          <div className="role-badge">
            <span className="role-icon">{user.role === 'customer' ? '🛒' : '🏪'}</span>
            {user.role === 'customer' ? 'Customer Account' : 'Vendor Account'}
          </div>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Sign Out
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card protection-score">
          <div className="card-header">
            <h3>Protection Score</h3>
            <span className="score-value">{protectionScore.toFixed(1)}%</span>
          </div>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{ width: `${protectionScore}%` }}
            ></div>
          </div>
          <p className="score-description">
            Your transactions are highly protected with our advanced security measures.
          </p>
        </div>

        {user.role === 'customer' && (
          <div className="dashboard-card dispute-frequency">
            <div className="card-header">
              <h3>Dispute Frequency</h3>
              <span className="frequency-value">{(disputeFrequency * 100).toFixed(1)}%</span>
            </div>
            <div className="frequency-indicator">
              <div className="frequency-bar">
                <div
                  className="frequency-fill"
                  style={{ width: `${Math.min(disputeFrequency * 1000, 100)}%` }}
                ></div>
              </div>
              <span className="frequency-label">Very Low</span>
            </div>
            <p className="frequency-description">
              Your dispute rate is well below industry average.
            </p>
          </div>
        )}

        <div className="dashboard-card transaction-overview">
          <h3>Transaction Overview</h3>
          <div className="overview-stats">
            <div className="stat-item">
              <span className="stat-number">{recentTransactions.length}</span>
              <span className="stat-label">Total Transactions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {recentTransactions.filter(t => t.status === 'completed').length}
              </span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                ${recentTransactions.reduce((sum, t) => sum + t.amount, 0)}
              </span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button onClick={handleCreateTransaction} className="action-btn primary">
              <span className="action-icon">➕</span>
              Create Transaction
            </button>
            <button onClick={handleViewDisputes} className="action-btn secondary">
              <span className="action-icon">⚠️</span>
              Dispute Center
            </button>
          </div>
        </div>

        <div className="dashboard-card recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="activity-item">
                <div className="activity-info">
                  <span className="activity-id">{transaction.id}</span>
                  <span className="activity-amount">${transaction.amount}</span>
                </div>
                <div className="activity-meta">
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status.replace('_', ' ')}
                  </span>
                  <span className="activity-date">{transaction.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {transactionData && (
          <div className="dashboard-card current-transaction">
            <h3>Current Transaction</h3>
            <div className="transaction-details">
              <div className="detail-row">
                <span className="label">ID:</span>
                <span className="value">{transactionData.transactionId}</span>
              </div>
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">${transactionData.amount}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className="value status">Active</span>
              </div>
            </div>
            <StatusProgressTracker currentStage="created" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;