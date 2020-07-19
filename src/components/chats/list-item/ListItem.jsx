import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
} from '../../../redux/actions/chat.actions';
import { GetTimeAgo, diff_minutes } from '../../../utils/format-time';
import './list-item.style.css';
import M from 'materialize-css';
import { shortenString } from '../../../utils/text-utils';
import RoundImage from '../../../shared/round-image/RoundImage';
import OnlineIndicator from '../../../shared/online-indicator/OnlineIndicator';
import { checkUserIsOnlineAction } from '../../../redux/actions/chat.actions';
import { useState } from 'react';
import Icon from '../../../shared/icon/Icon';

const ListItem = props => {
  const [userOnlineLastChecked, setUserOnlineLastChecked] = useState(
    new Date()
  );
  const {
    message,
    currentUser,
    unreadMessages,
    usersOnline,
    userTyping,
    userItemClicked,
    fetchMessagesAction,
    readUnreadMessagesAction,
    checkUserIsOnlineAction,
  } = props;
  let instance;

  const user =
    message.sender.id === currentUser.id ? message.receiver : message.sender;

  useEffect(() => {
    checkIsUserOnline();
  }, []);

  const checkIsUserOnline = () => {
    let currentTime = new Date();
    if (user) {
      checkUserIsOnlineAction(user._id);
      setUserOnlineLastChecked(new Date());
    }
  };

  //When a user item is clicked.
  const userClicked = () => {
    const data = { ...user, currentUser: currentUser.id };
    fetchMessagesAction(data.id, data.currentUser);
    userItemClicked(data);
    readUnreadMessagesAction(data);
  };

  const mobileUserClicked = () => {
    const elem = document.querySelector('#chat-messages');
    instance = M.Modal.init(elem, { dismissible: false });

    userClicked();

    if (instance) {
      instance.open();
    }
  };

  const friendOnline = message => {
    let userId =
      message.sender.id === currentUser.id
        ? message.receiver.id
        : message.sender.id;
    return usersOnline && usersOnline.includes(userId);
  };

  return (
    <Fragment>
      <li
        onMouseEnter={checkIsUserOnline}
        onClick={userClicked}
        id={user.id}
        className='chat-listing-single hide-on-small-only'>
        <div className='user-avater'>
          {friendOnline(message) ? (
            <OnlineIndicator status='online' />
          ) : (
            <OnlineIndicator status='offline' />
          )}

          <RoundImage size='50px' url={user.profilePhotoURL} />
        </div>
        <div className='chat-info'>
          <div className='chat-info__single-item'>
            <span className='username'>
              {user.firstname} {user.lastname}
            </span>
            <span className='secondary-content message-time '>
              {GetTimeAgo(message.created_at, 'long')}
            </span>
          </div>
          <p className='last-message'>
            {message.message_type === 'friend' ? (
              <span className='message'>
                {shortenString(message.message, 25)}
              </span>
            ) : (
              <span className='message'>
                {message.sender.id === currentUser.id ? (
                  <Fragment>
                    <Icon icon='call_made' color='primary' size='14px' />
                    <span className='call-leading-text'>
                      {' '}
                      You started a call...
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Icon icon='call_received' color='success' size='14px' />
                    <span className='call-leading-text'>
                      Received a call...
                    </span>
                  </Fragment>
                )}
              </span>
            )}
            {unreadMessages && unreadMessages.length > 0 && (
              <span className='new badge green accent-4'>
                {unreadMessages.length}
              </span>
            )}
          </p>

          {userTyping && userTyping.includes(user.id) && (
            <span className='user-typing'>
              <span className='content'>typing...</span>
            </span>
          )}
        </div>
      </li>

      <li
        onClick={mobileUserClicked}
        id={user.id}
        className='chat-listing-single show-on-medium hide-on-med-and-up'>
        <div className='user-avater'>
          {usersOnline && usersOnline.includes(message.sender.id) ? (
            <span className='online-icon'> </span>
          ) : (
            <span className='offline-icon'> </span>
          )}

          <RoundImage size='50px' url={user.profilePhotoURL} />
        </div>
        <div className='chat-info'>
          <div className='chat-info__single-item'>
            <span className='username'>
              {user.firstname} {user.lastname}
            </span>
          </div>
          <p className='last-message'>
            {message.message_type === 'friend' ? (
              <span className='message'>
                {shortenString(message.message, 25)}
              </span>
            ) : (
              <span className='message'>
                {message.sender.id === currentUser.id ? (
                  <Fragment>
                    <Icon icon='call_made' color='primary' size='14px' />
                    <span className='call-leading-text'>
                      {' '}
                      You started a call...
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Icon icon='call_received' color='success' size='14px' />
                    <span className='call-leading-text'>
                      Received a call...
                    </span>
                  </Fragment>
                )}
              </span>
            )}
            {unreadMessages && unreadMessages.length > 0 && (
              <span className='new badge green accent-4'>
                {unreadMessages.length}
              </span>
            )}
          </p>

          {userTyping && userTyping.includes(user.id) && (
            <span className='user-typing'>
              <span className='content'>{user.firstname} is typing...</span>
            </span>
          )}
        </div>
      </li>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const unreadMessageLists = state.chat.unreadMessages.filter(messageObj => {
    return ownProps.message.sender.id === messageObj.sender.id;
  });
  return {
    currentUser: state.auth.currentUser,
    usersOnline: state.chat.usersOnline,
    userTyping: state.reaction.userTyping,
    unreadMessages: unreadMessageLists,
  };
};

export default connect(mapStateToProps, {
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
  checkUserIsOnlineAction,
})(ListItem);
