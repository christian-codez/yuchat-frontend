import React from 'react';

const Input = ({
  type,
  placeholder,
  id,
  title,
  className,
  label,
  inputCallback,
  value,
  ...props
}) => {
  if (type === 'textarea') {
    return (
      <div className='input-field'>
        <textarea
          style={{ height: '60px', overflowY: 'auto' }}
          placeholder={placeholder}
          id={id}
          defaultValue={value}
          onChange={inputCallback}
          className={`materialize-textarea ${
            className ? className : ''
          }`}></textarea>
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  } else {
    return (
      <div className='input-field'>
        <input
          placeholder={placeholder}
          id={id}
          defaultValue={value}
          type={type}
          onChange={inputCallback}
          className={`validate ${className ? className : ''}`}
        />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  }
};

export default Input;
