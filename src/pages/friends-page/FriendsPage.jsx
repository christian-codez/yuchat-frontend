import React, { Fragment, useEffect } from 'react';
import './friends-page.style.css';
import { connect } from 'react-redux';
import FriendInfoBox from '../../components/friends/friend-info-box/FriendInfoBox';
import {
  getMyFriendsAction,
  undoUnfriendAction,
  confirmUnfriendingAction,
  getBlockedFriendsAction,
  getPendingFriendRequestsAction,
  receivedFriendRequestAction,
} from '../../redux/actions/user.actions';
import Notify from '../../shared/notify/Notify';
import M from 'materialize-css';
import RequestLoading from '../../shared/request-loading/RequestLoading';
import NotFound from '../../shared/404-page/NotFound';

const FriendsPage = props => {
  const {
    currentUser,
    myfriends,
    blockedFriends,
    sentFriendRequests,
    unacceptedFriendRequests,
    getMyFriendsAction,
    previousFriendsList,
    lastRemovedFriend,
    undoUnfriendAction,
    confirmUnfriendingAction,
    getBlockedFriendsAction,
    getPendingFriendRequestsAction,
    receivedFriendRequestAction,
  } = props;
  useEffect(() => {
    getMyFriendsAction();
    const el = document.getElementById('tabs');
    M.Tabs.init(el, {
      swipeable: false,
    });
  }, []);

  const undoFriendUnfriending = () => {
    undoUnfriendAction(lastRemovedFriend.id);
  };
  const confirmUnfriending = () => {
    confirmUnfriendingAction();
  };

  const getBlockedFriends = () => {
    getBlockedFriendsAction();
  };

  const getSentPendingFriendRequests = () => {
    getPendingFriendRequestsAction();
  };

  const receivedFriendRequest = () => {
    receivedFriendRequestAction();
  };

  return (
    <Fragment>
      {previousFriendsList && (
        <Notify
          type='primary'
          accept_icon='check'
          reject_icon='close'
          accept_title='Yes please!'
          reject_title='No, thanks'
          message='Do you want to undo this action?'
          acceptAction={undoFriendUnfriending}
          rejectAction={confirmUnfriending}
        />
      )}
      <ul className='tabs tabs-fixed-width' id='tabs'>
        <li onClick={getMyFriendsAction} className='tab col s3'>
          <a href='#friends'>Friends</a>
        </li>
        <li onClick={getBlockedFriends} className='tab col s3'>
          <a href='#blockedfriends'>Blocked Friends</a>
        </li>
        <li onClick={receivedFriendRequest} className='tab col s3'>
          <a href='#pendingFriendRequest'>Received Request</a>
        </li>{' '}
        <li onClick={getSentPendingFriendRequests} className='tab col s3'>
          <a href='#sentFriendRequest'>Sent Friends Request</a>
        </li>
      </ul>
      <div id='friends' className='col s12'>
        <div className='my-friend-list'>
          {myfriends ? (
            myfriends.map(friend => {
              return (
                <FriendInfoBox
                  type='unblocked-friends'
                  key={friend.id}
                  friend={friend}
                />
              );
            })
          ) : (
            <RequestLoading type='bar' show='true' />
          )}

          {myfriends.length <= 0 && (
            <NotFound
              title='NO Result FOUND'
              subText='We did not find any result matching your search.'
            />
          )}
        </div>
      </div>
      <div id='blockedfriends' className='col s12'>
        <div className='my-friend-list'>
          {blockedFriends ? (
            blockedFriends.map(friend => {
              return (
                <FriendInfoBox
                  type='blocked-friends'
                  key={friend.id}
                  friend={friend}
                />
              );
            })
          ) : (
            <RequestLoading type='bar' show='true' />
          )}

          {blockedFriends.length <= 0 && (
            <NotFound
              title='NO Result FOUND'
              subText='We did not find any result matching your search.'
            />
          )}
        </div>
      </div>
      <div id='pendingFriendRequest' className='col s12'>
        <div className='my-friend-list'>
          {unacceptedFriendRequests ? (
            unacceptedFriendRequests.map(request => {
              if (request.sender) {
                return (
                  <FriendInfoBox
                    type='unaccepted-friend-requests'
                    key={request.sender.id}
                    friend={request.sender}
                    id={request._id}
                  />
                );
              }
            })
          ) : (
            <RequestLoading type='bar' show='true' />
          )}

          {unacceptedFriendRequests.length <= 0 && (
            <NotFound
              title='NO Result FOUND'
              subText='We did not find any result matching your search.'
            />
          )}
        </div>
      </div>{' '}
      <div id='sentFriendRequest' className='col s12'>
        <div className='my-friend-list'>
          {sentFriendRequests ? (
            sentFriendRequests.map(request => {
              return (
                <FriendInfoBox
                  type='sent-friend-requests'
                  key={request.receiver.id}
                  friend={request.receiver}
                  id={request._id}
                />
              );
            })
          ) : (
            <RequestLoading type='bar' show='true' />
          )}

          {sentFriendRequests.length <= 0 && (
            <NotFound
              title='NO Result FOUND'
              subText='We did not find any result matching your search.'
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    myfriends: state.app.friends,
    blockedFriends: state.app.blockedFriends,
    sentFriendRequests: state.app.sentFriendRequests,
    unacceptedFriendRequests: state.app.unacceptedFriendRequests,
    previousFriendsList: state.app.previousFriendsList,
    lastRemovedFriend: state.app.lastRemovedFriend,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  getMyFriendsAction,
  undoUnfriendAction,
  confirmUnfriendingAction,
  getBlockedFriendsAction,
  getPendingFriendRequestsAction,
  receivedFriendRequestAction,
})(FriendsPage);
