import React from 'react';
import { Image } from './Image.styled';
import { CHAT_API_URL } from '../../utils/api-settings';

const RoundImage = ({ url, borderWidth, size = '50px' }) => {
  const imageURl = url
    ? CHAT_API_URL + '/' + url
    : 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
  return (
    <Image
      url={imageURl}
      borderWidth={borderWidth}
      size={size}
      position='centered'
    />
  );
};

export default RoundImage;
