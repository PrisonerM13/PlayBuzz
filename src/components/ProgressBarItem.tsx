import React from 'react';

const ProgressBarItem: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div
    className={`progress-bar__item${
      isActive ? ' progress-bar__item--active' : ''
    }`}
  />
);

export default ProgressBarItem;
