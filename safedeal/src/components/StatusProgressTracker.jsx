import React from 'react';
import './StatusProgressTracker.css';

const StatusProgressTracker = ({ currentStage }) => {
  const stages = [
    { id: 'created', label: 'Created', icon: '📝' },
    { id: 'shipped', label: 'Shipped', icon: '📦' },
    { id: 'delivered', label: 'Delivered', icon: '✅' },
    { id: 'completed', label: 'Completed', icon: '🎉' }
  ];

  const getStageIndex = (stage) => stages.findIndex(s => s.id === stage);

  return (
    <div className="status-progress-tracker">
      <h3>Transaction Progress</h3>
      <div className="progress-container">
        {stages.map((stage, index) => {
          const isActive = getStageIndex(currentStage) >= index;
          const isCurrent = currentStage === stage.id;

          return (
            <div key={stage.id} className={`progress-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="step-icon">
                {stage.icon}
              </div>
              <div className="step-label">
                {stage.label}
              </div>
              {index < stages.length - 1 && (
                <div className={`step-connector ${isActive ? 'active' : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusProgressTracker;