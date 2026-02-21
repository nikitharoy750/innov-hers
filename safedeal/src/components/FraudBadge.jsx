import React from 'react';
import { getDisputeFrequencyScore, isCertifiedIdentity } from '../utils/fraudDetection';
import './FraudBadge.css';

const FraudBadge = ({ user, disputes, transactions, refundRate, paymentIds }) => {
  const certified = isCertifiedIdentity(user);
  const disputeScore = getDisputeFrequencyScore(disputes, transactions);
  const frequentDisputes = disputeScore > 0.3;
  const abnormalRefund = refundRate > 0.2;
  const multiplePayments = paymentIds && paymentIds.length > 3;

  const riskLevel = frequentDisputes || abnormalRefund || multiplePayments ? 'high' : disputeScore > 0.1 ? 'medium' : 'low';

  return (
    <div className="fraud-assessment">
      <div className="assessment-header">
        <div className={`risk-indicator ${riskLevel}`}>
          <span className="risk-dot"></span>
          <span className="risk-label">
            {riskLevel === 'high' ? 'High Risk' : riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'}
          </span>
        </div>
        <div className={`identity-badge ${certified ? 'certified' : 'uncertified'}`}>
          {certified ? '✅ Certified Identity' : '⚠️ Unverified Identity'}
        </div>
      </div>

      <div className="assessment-metrics">
        <div className="metric-item">
          <div className="metric-label">Dispute Frequency</div>
          <div className="metric-value">{disputeScore.toFixed(2)}</div>
          <div className="metric-bar">
            <div
              className="metric-fill"
              style={{ width: `${Math.min(disputeScore * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-item">
          <div className="metric-label">Refund Rate</div>
          <div className="metric-value">{(refundRate * 100).toFixed(1)}%</div>
          <div className="metric-bar">
            <div
              className="metric-fill"
              style={{ width: `${Math.min(refundRate * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-item">
          <div className="metric-label">Total Transactions</div>
          <div className="metric-value">{transactions}</div>
        </div>

        <div className="metric-item">
          <div className="metric-label">Payment Methods</div>
          <div className="metric-value">{paymentIds ? paymentIds.length : 0}</div>
        </div>
      </div>

      {(frequentDisputes || abnormalRefund || multiplePayments) && (
        <div className="fraud-flags">
          <h4>⚠️ Risk Flags Detected</h4>
          <ul>
            {frequentDisputes && <li>Frequent disputes detected</li>}
            {abnormalRefund && <li>Abnormal refund rate</li>}
            {multiplePayments && <li>Multiple payment methods used</li>}
          </ul>
        </div>
      )}

      <div className="assessment-footer">
        <div className="recommendation">
          {riskLevel === 'low' && '✅ Low risk profile - Transaction approved'}
          {riskLevel === 'medium' && '⚠️ Medium risk - Additional verification recommended'}
          {riskLevel === 'high' && '🚫 High risk - Transaction requires manual review'}
        </div>
      </div>
    </div>
  );
};

export default FraudBadge;
