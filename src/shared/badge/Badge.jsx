import React from 'react';
import './badge.style.css';
const Badge = ({ color, count }) => {
  return <span className={`small badge circle-badge ${color} `}>{count}</span>;
};

export default Badge;
