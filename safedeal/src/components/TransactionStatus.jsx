import React from 'react';
import { useState } from 'react';
import StatusProgressTracker from './StatusProgressTracker';
import './TransactionStatus.css';

const TransactionStatus = ({ user }) => {
  const [customerConfirmed, setCustomerConfirmed] = useState(null); // true/false/null
  const [vendorConfirmed, setVendorConfirmed] = useState(null); // true/false/null
  const [status, setStatus] = useState('Locked');
  const [dispute, setDispute] = useState(false);
  const [currentStage, setCurrentStage] = useState('created');

  const handleCustomer = (confirm) => {
    setCustomerConfirmed(confirm);
    updateStatus(confirm, vendorConfirmed);
  };

  const handleVendor = (confirm) => {
    setVendorConfirmed(confirm);
    updateStatus(customerConfirmed, confirm);
  };

  const updateStatus = (customer, vendor) => {
    if (customer === null || vendor === null) return;

    if (customer && vendor) {
      setStatus('Released to Vendor');
      setDispute(false);
      setCurrentStage('completed');
    } else if (!customer && !vendor) {
      setStatus('Refunded to Customer');
      setDispute(false);
      setCurrentStage('completed');
    } else {
      setStatus('Dispute Opened');
      setDispute(true);
      setCurrentStage('created'); // Stay at created if dispute
    }
  };

  // Update stage based on confirmations
  React.useEffect(() => {
    if (vendorConfirmed === true) {
      setCurrentStage('shipped');
    }
    if (customerConfirmed === true && vendorConfirmed === true) {
      setCurrentStage('delivered');
    }
  }, [customerConfirmed, vendorConfirmed]);

  return (
    <div className="transaction-status-container">
      <StatusProgressTracker currentStage={currentStage} />

      <div className="status-card">
        <h3>Transaction Status: {status}</h3>

        <div className="confirmation-section">
          {user.role === 'customer' && (
            <div className="party-section">
              <h4>Your Actions (Customer)</h4>
              <div className="action-buttons">
                <button
                  onClick={() => handleCustomer(true)}
                  disabled={customerConfirmed !== null}
                  className={`confirm-btn ${customerConfirmed === true ? 'confirmed' : ''}`}
                >
                  {customerConfirmed === true ? '✅ Confirmed Delivery' : 'Confirm Delivery'}
                </button>
                <button
                  onClick={() => handleCustomer(false)}
                  disabled={customerConfirmed !== null}
                  className={`decline-btn ${customerConfirmed === false ? 'declined' : ''}`}
                >
                  {customerConfirmed === false ? '❌ Declined' : 'Report Issue'}
                </button>
              </div>
            </div>
          )}

          {user.role === 'vendor' && (
            <div className="party-section">
              <h4>Your Actions (Vendor)</h4>
              <div className="action-buttons">
                <button
                  onClick={() => handleVendor(true)}
                  disabled={vendorConfirmed !== null}
                  className={`confirm-btn ${vendorConfirmed === true ? 'confirmed' : ''}`}
                >
                  {vendorConfirmed === true ? '✅ Confirmed Shipment' : 'Confirm Shipment'}
                </button>
                <button
                  onClick={() => handleVendor(false)}
                  disabled={vendorConfirmed !== null}
                  className={`decline-btn ${vendorConfirmed === false ? 'declined' : ''}`}
                >
                  {vendorConfirmed === false ? '❌ Issue Reported' : 'Report Issue'}
                </button>
              </div>
            </div>
          )}
        </div>

        {dispute && (
          <div className="dispute-alert">
            ⚠️ Dispute Opened! Please visit the Dispute Center to download your report.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionStatus;
