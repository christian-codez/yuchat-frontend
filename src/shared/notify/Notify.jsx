import React from 'react';
import Icon from '../icon/Icon';
import './notify.css';

const Notify = ({
  acceptAction,
  rejectAction,
  message,
  type,
  accept_icon,
  reject_icon,
  accept_title,
  reject_title,
}) => {
  return (
    <div className={`notify ${type}`}>
      <span className='message'>{message}</span>
      <a
        class={`waves-effect ${
          type === 'danger' ? 'blue' : 'green darken-2'
        } btn`}
        onClick={acceptAction}>
        {accept_title}
        <Icon color='#fff' className='right' icon={accept_icon} size='20px' />
      </a>
      <a
        style={{ marginLeft: '10px' }}
        class={`waves-effect ${type === 'danger' ? 'blue' : 'red'} btn`}
        onClick={rejectAction}>
        {reject_title}
        <Icon color='#fff' className='right' icon={reject_icon} size='20px' />
      </a>
    </div>
  );
};

export default Notify;
