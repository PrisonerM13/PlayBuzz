import React from 'react';

const ProgressTitle: React.FC<{
  maxValue: number;
  currentValue: number;
}> = ({ maxValue, currentValue }) => {
  return (
    <section className="progress-indicator">
      {currentValue}/{maxValue}
    </section>
  );
};

export default ProgressTitle;
