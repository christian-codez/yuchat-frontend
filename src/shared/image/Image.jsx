import React from 'react';

const Image = ({ src, style, alt, imageClass }) => {
  return (
    <img src={src} alt={alt} className={imageClass} style={{ ...style }} />
  );
};

export default Image;
