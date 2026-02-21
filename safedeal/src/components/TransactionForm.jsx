import React from 'react';
import { useState } from 'react';
import { calculateProtectionFee, getTotalAmount } from '../utils/transactionLogic';
import './TransactionForm.css';

const TransactionForm = ({ onCreated }) => {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState(0);
  const [timer, setTimer] = useState(24);
  const [fee, setFee] = useState(0);
  const [total, setTotal] = useState(0);

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    setAmount(value);
    const protectionFee = calculateProtectionFee(value);
    setFee(protectionFee);
    setTotal(getTotalAmount(value, protectionFee));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreated({
      product,
      amount,
      timer,
      fee,
      total,
      transactionId: 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toLocaleString()
    });
  };

  return (
    <div className="transaction-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Create Secure Transaction</h2>
          <p>Lock your payment safely with our escrow protection</p>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label htmlFor="product">Product/Service Details</label>
            <input
              type="text"
              id="product"
              value={product}
              onChange={e => setProduct(e.target.value)}
              placeholder="Describe the item or service"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Transaction Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              min="1"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timer">Protection Timer</label>
            <select
              id="timer"
              value={timer}
              onChange={e => setTimer(Number(e.target.value))}
            >
              <option value={24}>24 hours</option>
              <option value={48}>48 hours</option>
              <option value={72}>72 hours</option>
            </select>
          </div>

          <div className="fee-breakdown">
            <div className="fee-item">
              <span>Transaction Amount:</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <div className="fee-item">
              <span>Protection Fee (2%):</span>
              <span>${fee.toFixed(2)}</span>
            </div>
            <div className="fee-item total">
              <span>Total Locked Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            🔒 Lock Payment Securely
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
