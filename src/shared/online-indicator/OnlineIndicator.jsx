import React from 'react';
import './online-indicator.style.css';
const OnlineIndicator = ({ status }) => {
  return status === 'online' ? (
    <span className='online-icon'> </span>
  ) : (
    <span className='offline-icon'> </span>
  );
};

export default OnlineIndicator;
