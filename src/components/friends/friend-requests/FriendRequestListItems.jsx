import React from 'react';
import { connect } from 'react-redux';
import { acceptFriendRequestAction } from '../../../redux/actions/user.actions';
const FriendRequestListItems = ({ request, acceptFriendRequestAction }) => {
  const acceptRequest = event => {
    event.preventDefault();
    acceptFriendRequestAction(request.sender.id);
  };
  const declineRequest = event => {
    event.preventDefault();
    console.log(request._id);
  };

  return (
    <li key={request._id} className='collection-item avatar'>
      <span className='list-lefthand-side'>
        <i className='material-icons circle'>folder</i>
        <p>
          {request.sender.firstname} {request.sender.lastname}
        </p>
        <span>Sent on {request.created_at}</span>
      </span>

      <span className='list-lefthand-side secondary-content'>
        <a
          onClick={acceptRequest}
          className='waves-effect waves-light btn-small '>
          Accept
        </a>
        <a
          onClick={declineRequest}
          className='waves-effect red accent-4 btn-small '>
          Decline
        </a>
      </span>
    </li>
  );
};

export default connect(null, { acceptFriendRequestAction })(
  FriendRequestListItems
);
