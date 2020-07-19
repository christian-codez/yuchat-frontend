import React, { Fragment } from 'react';
import './button.style.css';
const Button = ({
  size,
  color,
  buttonCallback,
  name,
  type,
  visibility,
  style,
  className,
  ...props
}) => {
  let btn_size = '';
  let btn_color = color ? color : 'btn-primary';
  switch (size) {
    case 'large':
      btn_size = 'btn-large';
      break;
    case 'small':
      btn_size = 'btn-small';
      break;

    default:
      break;
  }

  if (!visibility) {
    return (
      <button
        className={`btn ${btn_size} ${btn_color} ${className}`}
        style={{ ...style }}
        type={type}
        onClick={buttonCallback}
        name='action'>
        {props.children}
      </button>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default Button;
