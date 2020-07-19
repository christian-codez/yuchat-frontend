import React from 'react';
import './stats-item.style.css';
import Icon from '../icon/Icon';
import Badge from '../badge/Badge';
const StatItem = ({ icon, color, title, count }) => {
  return (
    <div className='user-profile-stats'>
      <div className='user-profile-stats__left'>
        <Icon icon={icon} color={color} size='30px' />
      </div>
      <div className='user-profile-stats__right'>
        <span className='title'>{title}</span>{' '}
        <Badge color={color} count={count} />
      </div>
    </div>
  );
};

export default StatItem;
