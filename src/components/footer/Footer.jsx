import React from 'react';
import './footer.style.css';
const Footer = () => {
  return (
    <div className='site-footer'>
      <span> &copy; 2020 Devxtian Technologies / </span>
      <span className='support'>
        For support, email{' '}
        <a href='mailto:dev.christian.uche@gmail.com'>
          dev.christian.uche@gmail.com
        </a>
      </span>
    </div>
  );
};

export default Footer;
