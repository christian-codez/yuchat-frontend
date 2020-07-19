import React, { useEffect, useRef } from 'react';
import Icon from '../../shared/icon/Icon';
import M from 'materialize-css';

const FloatingButton = ({ icon, ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const elems = buttonRef.current;
    M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false,
    });
  }, []);

  const dropDownIcon = icon ? icon : 'more_vert';

  return (
    <div ref={buttonRef} className='fixed-action-btn chat-header-action'>
      <button
        className='btn-floating btn-large'
        style={{ backgroundColor: '#2c3035' }}>
        <Icon color='#fff' icon={dropDownIcon} size='30px' />
      </button>

      <ul>{props.children}</ul>
    </div>
  );
};

export default FloatingButton;
