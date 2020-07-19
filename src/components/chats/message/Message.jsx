import React, { useEffect, useState, useContext, Fragment } from 'react';
import './message.style.css';
import { connect } from 'react-redux';
import { GetTimeAgo, formatCallTime } from '../../../utils/format-time';
import Icon from '../../../shared/icon/Icon';
import LinkPreview from '../../../shared/link-preview/LinkPreview';
import {
  deleteChatMessageAction,
  deleteChatMessageForeverAction,
} from '../../../redux/actions/chat.actions';
import RoundImage from '../../../shared/round-image/RoundImage';

const Message = ({
  message,
  currentUser,
  deleteChatMessageAction,
  deleteChatMessageForeverAction,
}) => {
  const sender =
    message && message.sender && message.sender.id === currentUser.id
      ? 'owner'
      : 'friend';

  useEffect(() => {
    if (message) {
      scrollToCurrentMessage(message);
    }
  }, [message]);
  const scrollToCurrentMessage = message => {
    if (!message) return;
    const currentMessage = document.getElementById(message.id);
    if (currentMessage) {
      const topPos = currentMessage.offsetTop;
      const container = document.getElementById('messageBody');

      document.getElementById('messageBody').scrollTop =
        topPos - container.offsetTop;
    }
  };

  const messageSender = () => {
    if (message && message.sender.id === currentUser.id) {
      return (
        <Fragment>
          <RoundImage
            borderWidth='1px'
            size='18px'
            url={message.sender.profilePhotoURL}
          />
          <span className='sender-name'>You</span>
        </Fragment>
      );
    }
  };
  const messageReceiver = () => {
    if (message && message.sender.id !== currentUser.id) {
      return (
        <Fragment>
          <RoundImage
            borderWidth='1px'
            size='18px'
            url={message.sender.profilePhotoURL}
          />
          <span className='sender-name'> {message.sender.firstname}</span>
        </Fragment>
      );
    }
  };

  const deleteMessage = () => {
    deleteChatMessageAction(message.id, currentUser.id);
  };

  const deleteMessageForever = () => {
    deleteChatMessageForeverAction(message.id);
  };

  const showMessageAsDeleted = () => {
    if (message.deletedStatus && message.deletedBy.includes(currentUser.id)) {
      return true;
    }
  };

  if (
    message &&
    message.message_type === 'friend' &&
    message.sender &&
    !showMessageAsDeleted()
  ) {
    return (
      <div className={`chat-msg ${sender}`} id={message.id}>
        <div className='chat-msg-content'>
          <div className='chat-msg-text'>
            <div className='message-header'>
              <div className='left'>
                <span className='message-content'>{message.message} </span>
              </div>
              <div
                onClick={deleteMessage}
                className='right message-more-actions'>
                <Icon icon='delete_forever' color='neutral' size='18px' />
              </div>
            </div>
            <div className='link-preview'>
              <LinkPreview message={message.message} />
            </div>
            <div className='message-footer'>
              <small className='chat-msg-date'></small>
              <div className={`message-meta ${sender}`}>
                <div className='left'>
                  <small className='message-time'>
                    {GetTimeAgo(message.created_at, 'long')}
                  </small>
                </div>
                <div className='right' style={{ opacity: '0.8' }}>
                  <small style={{ display: 'flex' }}>
                    {messageReceiver()} {messageSender()}
                  </small>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    );
  } else if (
    message &&
    message.message_type === 'friend' &&
    message.sender &&
    showMessageAsDeleted()
  ) {
    return (
      <div className={`chat-msg ${sender} deleted`} id={message.id}>
        <div className='chat-msg-content'>
          <div className='chat-msg-text'>
            <div className='message-header'>
              <div className='left'>
                <span className='message-content'>message deleted</span>
              </div>
              <div
                onClick={deleteMessageForever}
                className='right message-more-actions'>
                <Icon icon='delete_forever' color='neutral' size='18px' />
              </div>
            </div>
            <div className='link-preview'>
              <LinkPreview message={message.message} />
            </div>
            <div className='message-footer'>
              <small className='chat-msg-date'></small>
              <div className={`message-meta ${sender}`}>
                <div className='left'>
                  <small className='message-time'>
                    {GetTimeAgo(message.created_at, 'long')}
                  </small>
                </div>
                <div className='right' style={{ opacity: '0.5' }}>
                  <small style={{ display: 'flex' }}>
                    {messageReceiver()} {messageSender()}
                  </small>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    );
  } else if (message && message.message_type === 'call' && message.sender) {
    return (
      <p>
        <span className='call-message'>
          {message.sender.id === currentUser.id ? (
            <Fragment>
              <Icon icon='call_made' color='neutral' size='14px' />
              <span className='call-leading-text'> You started a call @ </span>
            </Fragment>
          ) : (
            <Fragment>
              <Icon icon='call_received' color='neutral' size='14px' />
              <span className='call-leading-text'>
                {message.sender.firstname} started a call @
              </span>
            </Fragment>
          )}
          {formatCallTime(message.message)}
        </span>
      </p>
    );
  }

  return <Fragment />;
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  deleteChatMessageAction,
  deleteChatMessageForeverAction,
})(Message);
