import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.style.css';
import Icon from '../icon/Icon';
const Modal = ({
  id,
  footer,
  bgImage,
  className,
  header,
  modalClose,
  ...props
}) => {
  return createPortal(
    <div
      style={{ ...bgImage }}
      id={id}
      className={`modal ${className ? className : ''} `}>
      <div className='modal-header'>
        <div className='modal-close-container'>
          <span
            className='left waves-effect waves-green btn-flat close-button'
            onClick={modalClose}>
            <Icon
              icon='arrow_back'
              style={{ marginRight: '5px' }}
              size='22px'
              color='neutral'
              className='left'
            />
          </span>
        </div>
        {header}
      </div>
      <div className='modal-content'>{props.children}</div>
      <div className='modal-footer'>{footer}</div>
    </div>,
    document.getElementById('modal-portal')
  );
};

export default Modal;
