import React from 'react';

const CustomButton = props => {
  return (
    <button
      className={`btn ${props.className}`}
      type={props.type}
      name={props.name}>
      {props.children}
    </button>
  );
};

export default CustomButton;
