import React, { useState, Fragment } from 'react';
import './friend-info-box.style.css';
import { connect } from 'react-redux';
import {
  acceptFriendRequestAction,
  unfriendFriendAction,
  unblockFriendAction,
  blockFriendAction,
  removePendingFriendRequestAction,
  declineFriendRequestAction,
} from '../../../redux/actions/user.actions';
import Icon from '../../../shared/icon/Icon';
import { useHistory } from 'react-router-dom';
import { userItemClicked } from '../../../redux/actions/chat.actions';
import { GetTimeAgo } from '../../../utils/format-time';
import Button from '../../../shared/form-inputs/button/Button';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import RoundImage from '../../../shared/round-image/RoundImage';

const FriendInfoBox = props => {
  const {
    friend,
    id,
    type,
    userItemClicked,
    unfriendFriendAction,
    unblockFriendAction,
    blockFriendAction,
    acceptFriendRequestAction,
    declineFriendRequestAction,
    removePendingFriendRequestAction,
  } = props;

  const [unblockRequest, setunblockRequest] = useState(false);
  const [blockRequest, setblockRequest] = useState(false);
  const [cancelRequest, setcancelRequest] = useState(false);
  const [unfriendRequest, setunfriendRequest] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);
  const [declineFriendRequest, setDeclineFriendRequest] = useState(false);

  let history = useHistory();
  const unFriendUser = () => {
    const answer = window.confirm(
      `Are you sure you want to unfriend  ${friend.firstname} ${friend.lastname}?`
    );

    if (answer) {
      setunfriendRequest(true);

      unfriendFriendAction(friend);
      setunfriendRequest(false);
    }
  };

  const unblockFriend = () => {
    console.log('UnBlock user');
    setunblockRequest(true);

    unblockFriendAction(friend.id);
    setunblockRequest(false);
  };

  const blockFriend = () => {
    console.log('Block user');
    setblockRequest(true);

    blockFriendAction(friend.id);
    setblockRequest(false);
  };

  const cancelFriendRequest = () => {
    setcancelRequest(true);

    removePendingFriendRequestAction(id);
    setcancelRequest(false);
  };

  const acceptFriendRequest = () => {
    setAcceptRequest(true);
    setDeclineFriendRequest(true);

    acceptFriendRequestAction(friend.id);
    setAcceptRequest(false);
  };

  const declineUnacceptedFriendRequest = () => {
    setDeclineFriendRequest(true);
    setAcceptRequest(true);
    declineFriendRequestAction(id);
    setDeclineFriendRequest(false);
    setAcceptRequest(false);
  };

  const goToMessenger = () => {
    console.log('Go to message');
    userItemClicked(friend);
    history.push('/messenger');
  };

  const showActionButton = () => {
    if ('unblocked-friends' === type) {
      return (
        <Fragment>
          {unfriendRequest ? (
            <RequestLoading type='circle' style={{ marginBottom: '10px' }} />
          ) : (
            <Button
              type='button'
              name='unfriend-btn'
              className='unfriend_btn'
              color='btn-primary'
              buttonCallback={unFriendUser}>
              Unfriend
              <Icon
                className='right'
                icon='person'
                color='neutral'
                size='21px'
              />
            </Button>
          )}

          {blockRequest ? (
            <RequestLoading type='circle' style={{ marginTop: '10px' }} />
          ) : (
            <Button
              type='button'
              name='block-btn'
              color='btn-danger'
              className='block_friend_btn'
              buttonCallback={blockFriend}>
              block Friend
              <Icon
                className='right'
                icon='phonelink_erase'
                color='neutral'
                size='21px'
              />
            </Button>
          )}
        </Fragment>
      );
    } else if ('blocked-friends' === type) {
      return (
        <Fragment>
          {unblockRequest ? (
            <RequestLoading type='circle' style={{ marginRight: '10px' }} />
          ) : (
            <Button
              type='button'
              name='update_cover_photo'
              color='btn-success'
              className='unblock_friend_btn'
              buttonCallback={unblockFriend}>
              Unblock
              <Icon
                className='right'
                icon='do_not_disturb_alt'
                color='neutral'
                size='21px'
              />
            </Button>
          )}
        </Fragment>
      );
    } else if ('sent-friend-requests' === type) {
      return (
        <Fragment>
          {cancelRequest ? (
            <RequestLoading type='circle' style={{ marginRight: '10px' }} />
          ) : (
            <Button
              type='button'
              name='update_cover_photo'
              color='btn-danger'
              className='cancel_friend_btn'
              buttonCallback={cancelFriendRequest}>
              Cancel
              <Icon
                className='right'
                icon='close'
                color='neutral'
                size='21px'
              />
            </Button>
          )}
        </Fragment>
      );
    } else if ('unaccepted-friend-requests' === type) {
      return (
        <Fragment>
          {acceptRequest ? (
            <RequestLoading type='circle' style={{ marginRight: '10px' }} />
          ) : (
            <Button
              type='button'
              name='update_cover_photo'
              color='btn-success'
              className='accept_friend_btn'
              buttonCallback={acceptFriendRequest}>
              Accept
              <Icon
                className='right'
                icon='check'
                color='neutral'
                size='21px'
              />
            </Button>
          )}
          {declineFriendRequest ? (
            <RequestLoading
              type='circle'
              style={{ marginRight: '10px', marginTop: '10px' }}
            />
          ) : (
            <Button
              style={{ marginTop: '10px' }}
              type='button'
              name='update_cover_photo'
              color='btn-danger'
              className='decline_friend_btn'
              buttonCallback={declineUnacceptedFriendRequest}>
              Decline
              <Icon
                className='right'
                icon='close'
                color='neutral'
                size='21px'
              />
            </Button>
          )}
        </Fragment>
      );
    }
  };
  const showStartChatting = () => {
    if ('unblocked-friends' === type) {
      return (
        <p onClick={goToMessenger} className='start-chatting'>
          <Icon
            color='#e50303'
            className='left'
            icon='question_answer'
            size='27px'
          />{' '}
          <span> Messenger</span>
        </p>
      );
    }
  };

  return (
    <div className='friend-item'>
      <div className='friend-item__left'>
        <RoundImage url={friend.profilePhotoURL} size='150px' />
      </div>

      <div className='friend-item__right'>
        <div className='friend-item__right__user-info'>
          <h4 className='name'>
            {friend.firstname} {friend.lastname}
          </h4>
          <p style={{ fontSize: '20px' }} className='sub-text'>
            <i className='material-icons left'>date_range</i> Joined since{' '}
            {GetTimeAgo(friend.created_at)}
          </p>
          <p style={{ fontSize: '20px' }} className='sub-text'>
            <i className='material-icons left'>people</i>
            {friend.friends.length} friends
          </p>

          {showStartChatting()}
        </div>

        <div className='friend-item__right__action-buttons'>
          {showActionButton()}
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  unfriendFriendAction,
  userItemClicked,
  unblockFriendAction,
  blockFriendAction,
  removePendingFriendRequestAction,
  acceptFriendRequestAction,
  declineFriendRequestAction,
})(FriendInfoBox);
