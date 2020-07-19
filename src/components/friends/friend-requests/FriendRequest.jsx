import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getFriendRequestAction } from '../../../redux/actions/user.actions';
import Loading from '../../../shared/loading/loading';
import FriendRequestListItems from './FriendRequestListItems';

const FriendRequest = ({ friendRequests, getFriendRequestAction }) => {
  useEffect(() => {
    getFriendRequestAction();
  }, []);

  return (
    <section className='people-collection'>
      <ul className='collection scroll'>
        {friendRequests ? (
          friendRequests.map(request => {
            return (
              <FriendRequestListItems
                key={request.created_at}
                request={request}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </ul>
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    friendRequests: state.app.friend_requests,
  };
};

export default connect(mapStateToProps, { getFriendRequestAction })(
  FriendRequest
);
