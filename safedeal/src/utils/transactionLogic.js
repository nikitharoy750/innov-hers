// Transaction state logic for Settlr

export function calculateProtectionFee(amount, rate = 0.02) {
  return Math.round(amount * rate);
}

export function getTotalAmount(amount, fee) {
  return amount + fee;
}

// Add more transaction logic as needed
