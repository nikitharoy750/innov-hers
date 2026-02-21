// Fraud prevention logic for Settlr

export function getDisputeFrequencyScore(disputes, transactions) {
  if (transactions === 0) return 0;
  return disputes / transactions;
}

export function isCertifiedIdentity(user) {
  // Simulate identity badge logic
  return user.certified === true;
}

// Add more fraud detection logic as needed
