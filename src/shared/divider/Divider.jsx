import React from 'react';
import './divider.style.css';

const Divider = ({ size, color }) => {
  return <div className={`divider ${size} ${color}`}></div>;
};

export default Divider;
