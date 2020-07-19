import React, { useState, useEffect } from 'react';
import './toggle-checkbox.style.css';
const ToggleCheckBox = ({ active, handleOnClick, checkedStatus }) => {
  const [checked, setChecked] = useState(false);

  const changeInputState = () => {
    return handleOnClick;
    //setChecked(!checked);
  };

  useEffect(() => {
    setChecked(checkedStatus);
  }, []);

  //   useEffect(() => {
  //     handleOnClick(checked);
  //   }, [checked]);

  return (
    <div className='switch'>
      <label>
        Off
        <input
          disabled={!active}
          onClick={changeInputState}
          type='checkbox'
          onChange={changeInputState}
          checked={checked}
        />
        <span className='lever'></span>
        On
      </label>
    </div>
  );
};

export default ToggleCheckBox;
