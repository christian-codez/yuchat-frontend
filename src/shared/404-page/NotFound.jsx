import React from 'react';
import './notfound.style.css';
import Button from '../form-inputs/button/Button';

const NotFound = ({ title, subText }) => {
  return (
    <section className='not-found-section'>
      <div className='content'>
        <h4 className='not-found-section__title'>{title}</h4>
        <p className='not-found-section__sub-text'>{subText}</p>
      </div>
    </section>
  );
};

export default NotFound;
