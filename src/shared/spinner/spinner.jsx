import React from 'react';
import './spinner.style.css';

const Spinner = () => {
  return (
    <div className='loading'>
      <div className='spinner-wrapper'>
        <span className='spinner-text'>LOADING...</span>
        <span className='spinner'></span>
      </div>
    </div>
  );
};

export default Spinner;
