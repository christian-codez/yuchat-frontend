import React from 'react';
import './icon.style.css';
const Icon = ({ icon, color, className, style, size, iconClick }) => {
  const colorValue = color ? color : 'primary';
  return (
    <i
      onClick={iconClick}
      className={` large material-icons friendzspot-icon  ${className} ${colorValue}`}
      style={{
        display: 'inline-block',
        fontSize: size ? size : '',
        ...style,
      }}>
      {icon}
    </i>
  );
};

export default Icon;
