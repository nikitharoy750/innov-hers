import React from 'react';
import { useState } from 'react';
import DisputeReport from '../components/DisputeReport';
import FraudBadge from '../components/FraudBadge';
import './Dispute.css';

const Dispute = ({ transactionData }) => {
  const [disputes] = useState([
    {
      transactionId: 'TX123456',
      customer: 'Alice Johnson',
      vendor: 'Bob Smith',
      reason: 'Mismatch in confirmation',
      date: new Date().toLocaleString(),
      status: 'Open',
      amount: 150,
    },
    {
      transactionId: 'TX654321',
      customer: 'Charlie Brown',
      vendor: 'Diana Prince',
      reason: 'Item not as described',
      date: new Date().toLocaleString(),
      status: 'Closed',
      amount: 75,
    },
  ]);

  const [selectedDispute, setSelectedDispute] = useState(disputes[0]);

  const handleDownload = () => {
    const report = `=== DISPUTE SUMMARY REPORT ===\n\nTransaction ID: ${selectedDispute.transactionId}\nCustomer: ${selectedDispute.customer}\nVendor: ${selectedDispute.vendor}\nAmount: $${selectedDispute.amount}\nReason: ${selectedDispute.reason}\nDate: ${selectedDispute.date}\nStatus: ${selectedDispute.status}\n\n=== FRAUD DETECTION ===\nDispute Frequency Score: 0.25\nCertified Identity: Yes\nFraud Flags: None\n\n=== RESOLUTION ===\nAutomated system reviewed the dispute.\nRecommendation: Refund to customer with $10 credit.`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute_report_${selectedDispute.transactionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dispute-container">
      <div className="dispute-header">
        <h1>⚠️ Dispute Center</h1>
        <p>Manage and resolve transaction disputes with our automated system</p>
      </div>

      <div className="dispute-content">
        <div className="disputes-panel">
          <div className="panel-header">
            <h2>Active Disputes</h2>
            <span className="dispute-count">{disputes.length} total</span>
          </div>

          <div className="disputes-list">
            {disputes.map((d, idx) => (
              <div
                key={idx}
                className={`dispute-item ${selectedDispute.transactionId === d.transactionId ? 'active' : ''}`}
                onClick={() => setSelectedDispute(d)}
              >
                <div className="dispute-item-header">
                  <span className="transaction-id">{d.transactionId}</span>
                  <span className={`status-badge ${d.status.toLowerCase()}`}>
                    {d.status}
                  </span>
                </div>
                <div className="dispute-reason">{d.reason}</div>
                <div className="dispute-amount">${d.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedDispute && (
          <div className="dispute-details-panel">
            <div className="details-header">
              <h2>Dispute Investigation</h2>
              <div className="transaction-badge">
                {selectedDispute.transactionId}
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-card">
                <h3>Transaction Details</h3>
                <div className="detail-rows">
                  <div className="detail-row">
                    <span className="label">Customer:</span>
                    <span className="value">{selectedDispute.customer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Vendor:</span>
                    <span className="value">{selectedDispute.vendor}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Amount:</span>
                    <span className="value">${selectedDispute.amount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Reason:</span>
                    <span className="value">{selectedDispute.reason}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">{selectedDispute.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className="value status">{selectedDispute.status}</span>
                  </div>
                </div>
              </div>

              <div className="detail-card">
                <h3>Fraud Assessment</h3>
                <FraudBadge
                  user={{ certified: true }}
                  disputes={2}
                  transactions={10}
                  refundRate={0.15}
                  paymentIds={['PM001', 'PM002', 'PM003']}
                />
              </div>
            </div>

            <div className="actions-section">
              <button className="download-btn" onClick={handleDownload}>
                📥 Download Investigation Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dispute;
