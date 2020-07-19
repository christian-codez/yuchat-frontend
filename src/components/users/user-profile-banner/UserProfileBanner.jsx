import React from 'react';
import ProfilePhoto from '../profile-photo/ProfilePhoto';
import ProfileBanner from '../profile-banner/ProfileBanner';
import './user-profile-banner.style.css';

const UserProfileBanner = () => {
  return (
    <section className='user-header-banner-container'>
      <ProfileBanner />
      <ProfilePhoto />
    </section>
  );
};

export default UserProfileBanner;
