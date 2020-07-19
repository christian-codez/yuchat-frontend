import React, { useState } from 'react';
import './sound-settings.style.css';
import ToggleCheckBox from '../../../shared/form-inputs/toggle-checkbox/ToggleCheckBox';
const SoundSettings = () => {
  const [newmessage, setNewMessage] = useState(false);

  const handleNewMessageSoundSettings = checked => {
    console.log('Handle New Message Sound: ' + checked);
  };
  const handleFriendrequestSoundSettings = checked => {
    console.log('Handle Friend Request Sound: ' + checked);
  };
  const handleUserTypingSoundSettings = checked => {
    console.log('Handle User Typing Sound: ' + checked);
  };

  return (
    <section className='settings-section'>
      <div className='settings-item'>
        <span className='settings-label'>New Message</span>
        <ToggleCheckBox
          active='true'
          handleOnClick={handleNewMessageSoundSettings}
          checkedStatus={true}
        />
      </div>
      <div className='settings-item'>
        <span className='settings-label'>Friend Request</span>
        <ToggleCheckBox
          active='true'
          handleOnClick={handleFriendrequestSoundSettings}
          checkedStatus={false}
        />
      </div>{' '}
      <div className='settings-item'>
        <span className='settings-label'>Typing</span>
        <ToggleCheckBox
          active='true'
          handleOnClick={handleUserTypingSoundSettings}
          checkedStatus={true}
        />
      </div>
    </section>
  );
};

export default SoundSettings;
