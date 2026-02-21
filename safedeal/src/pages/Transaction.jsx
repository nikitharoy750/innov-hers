import React from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionStatus from '../components/TransactionStatus';
import StatusProgressTracker from '../components/StatusProgressTracker';
import { useState } from 'react';
import './Transaction.css';

const Transaction = ({ user, setTransactionData, setCurrentPage }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleTransactionCreated = (data) => {
    setFormData(data);
    setTransactionData(data);
    setShowStatus(true);
  };

  return (
    <div className="transaction-page">
      <div className="page-header">
        <h1>Secure Transaction</h1>
        <p>Create and manage your escrow-protected transactions</p>
      </div>

      {!showStatus ? (
        <TransactionForm onCreated={handleTransactionCreated} />
      ) : (
        <div className="transaction-content">
          <div className="transaction-summary">
            <div className="summary-card">
              <h2>Transaction Summary</h2>
              <div className="summary-details">
                <div className="detail-item">
                  <span className="label">Transaction ID:</span>
                  <span className="value">{formData?.transactionId}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Product:</span>
                  <span className="value">{formData?.product}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Amount:</span>
                  <span className="value">${formData?.amount}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Protection Fee:</span>
                  <span className="value">${formData?.fee}</span>
                </div>
                <div className="detail-item total">
                  <span className="label">Total Locked:</span>
                  <span className="value">${formData?.total}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Timer:</span>
                  <span className="value">{formData?.timer} hours</span>
                </div>
                <div className="detail-item">
                  <span className="label">Created:</span>
                  <span className="value">{formData?.createdAt}</span>
                </div>
              </div>
            </div>
          </div>

          <TransactionStatus user={user} />

          <div className="action-buttons">
            <button
              className="secondary-btn"
              onClick={() => setShowStatus(false)}
            >
              Create Another Transaction
            </button>
            <button
              className="primary-btn"
              onClick={() => setCurrentPage('dispute')}
            >
              View Dispute Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
