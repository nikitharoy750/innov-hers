import React from 'react';
import './SettlrLogo.css';

export const SettlrLogo = ({ variant = 'horizontal', size = 'medium' }) => {
  return (
    <div className={`settlr-logo ${variant} ${size}`}>
      {/* SVG Lock Icon with Split Shackle */}
      <svg
        className="settlr-icon"
        viewBox="0 0 100 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Define gradient for glow effect */}
        <defs>
          <radialGradient id="glowGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Shackle (Buyer Side) - Soft Gold */}
        <path
          d="M 35 38 Q 25 25, 25 15"
          stroke="#D4AF37"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Shackle (Vendor Side) - Soft Gold */}
        <path
          d="M 65 38 Q 75 25, 75 15"
          stroke="#D4AF37"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Meeting Point Glow - Brighter */}
        <circle cx="50" cy="30" r="10" fill="url(#glowGradient)" filter="url(#glow)" />

        {/* Main Lock Body - Filled Charcoal Black */}
        <rect
          x="28"
          y="42"
          width="44"
          height="50"
          rx="4"
          fill="#2D2D2D"
          stroke="#1A1A1A"
          strokeWidth="2"
        />

        {/* Lock Keyhole - Larger Royal Blue */}
        <circle cx="50" cy="68" r="7" fill="#4169E1" />

        {/* Bright accent line at top of lock */}
        <line
          x1="30"
          y1="45"
          x2="70"
          y2="45"
          stroke="#4169E1"
          strokeWidth="3"
          opacity="0.8"
        />
      </svg>

      {/* Text Content */}
      <div className="settlr-text">
        <h1 className="settlr-brand">Settlr</h1>
        <p className="settlr-tagline">Secure Every Transaction</p>
      </div>
    </div>
  );
};

export default SettlrLogo;
