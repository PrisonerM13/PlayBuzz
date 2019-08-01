import React from 'react';
import ProgressBarItem from './ProgressBarItem';

// value is zero based
const ProgressBar: React.FC<{ length: number; value: number }> = ({
  length,
  value,
}) => {
  return (
    <section className="progress-bar">
      {Array.from({ length }, (val, index) => index).map(index => (
        <ProgressBarItem key={index} isActive={value === index} />
      ))}
    </section>
  );
};

export default ProgressBar;
