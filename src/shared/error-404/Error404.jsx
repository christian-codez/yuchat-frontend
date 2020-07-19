import React from 'react';
import './error404.style.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <section className='error-page'>
      <div class='main error-container'>
        <h1 className='error-title'>404</h1>
        <p className='error-message'>Something went wrong!</p>
        <Link className='button' to='/'>
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Error404;
