import React, { useState } from 'react';

const FormInput = ({
  label,
  type,
  placeholder,
  id,
  className,
  handleInputChange,
}) => {
  const [input, setinput] = useState('');

  const inputChanged = event => {
    setinput(event.target.value);
    handleInputChange();
  };

  return (
    <div className='input-field'>
      <input
        placeholder={placeholder}
        id={id}
        onChange={inputChanged}
        type={type}
        value={input}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default FormInput;
