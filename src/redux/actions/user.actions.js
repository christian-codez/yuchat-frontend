import { user_actions, api_loader_action } from '../types';
import apiConfig from '../../api-config/config';

export const fetchPeopleAction = () => {
  return async dispatch => {
    try {
      dispatch({
        type: user_actions.FETCHING_PEOPLE,
      });

      //setTimeout(async () => {
      let response = await apiConfig.get(`/api/users/people/all`);

      // console.log(response);
      // const people =
      //   Object.keys(response.data).length !== 0 ? response.data : null;

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_PEOPLE,
          payload: response.data,
        });
      }
      //}, 5000);
    } catch (error) {
      dispatch({
        type: user_actions.FETCHING_PEOPLE_ERROR,
        payload: error.response.data,
      });
    }
  };
};

export const sendRequestAction = data => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/notifications', data);

      if (response.status === 201) {
        dispatch({
          type: user_actions.SEND_CONNECTION_REQUEST,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const getFriendRequestAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(
        '/api/notifications/my-notifications/'
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_FRIEND_REQUESTS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const getMyFriendsAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get('/api/users/my/friends');

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_FRIENDS,
          payload: response.data.friends,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const acceptFriendRequestAction = friendRequestID => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users/accept-friend-request', {
        friendRequestID: friendRequestID,
      });

      if (response.status === 200) {
        dispatch({
          type: user_actions.ACCEPT_FRIEND_REQUEST,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const declineFriendRequestAction = friendRequestID => {
  return async dispatch => {
    try {
      let response = await apiConfig.delete(
        `/api/notifications/delete/${friendRequestID}`
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.DECLINE_FRIEND_REQUEST,
          payload: response.data,
        });
      }

      console.log(friendRequestID);
    } catch (e) {
      console.log(e);
    }
  };
};
export const unfriendFriendAction = friend => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(`/api/users/unfriend/${friend.id}`);

      if (response.status === 200) {
        dispatch({ type: user_actions.UNFRIEND_USER, payload: friend });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const undoUnfriendAction = friendRequestID => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users/accept-friend-request', {
        friendRequestID: friendRequestID,
      });

      if (response.status === 200) {
        dispatch({ type: user_actions.UNDO_UNFRIENDES_USER });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const getBlockedFriendsAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get('/api/users/blocked-friends');

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_BLOCKED_FRIENDS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const unblockFriendAction = friendId => {
  return async dispatch => {
    try {
      let response = await apiConfig.post(
        `/api/users/unblock-friend/${friendId}`
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.UNBLOCKED_FRIEND,
          payload: response.data,
        });
      }

      console.log(friendId);
    } catch (e) {
      console.log(e);
    }
  };
};
export const blockFriendAction = friendId => {
  return async dispatch => {
    try {
      let response = await apiConfig.post(
        `/api/users/block-friend/${friendId}`
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.BLOCKED_FRIEND,
          payload: response.data,
        });
      }

      console.log(friendId);
    } catch (e) {
      console.log(e);
    }
  };
};
export const getPendingFriendRequestsAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(
        `/api/notifications/sent-friend-requests`
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_SENT_FRIEND_REQUESTS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const receivedFriendRequestAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(
        `/api/notifications/received-pending-friend-requests`
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_UNACCEPTED_FRIEND_REQUESTS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const removePendingFriendRequestAction = requestId => {
  return async dispatch => {
    try {
      let response = await apiConfig.delete(
        `/api/notifications/remove-my-friend-request/${requestId}`
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.REMOVE_SENT_FRIEND_REQUEST,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const confirmUnfriendingAction = () => {
  return async dispatch => {
    try {
      dispatch({ type: user_actions.CONFIRM_UNFRIENDING_ACTION });
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateUserInfoAction = data => {
  return async dispatch => {
    try {
      dispatch({ type: api_loader_action.USER_INFO_UPDATE_STARTED });

      let response = await apiConfig.patch('/api/users/update/me', data);

      if (200 === response.status) {
        dispatch({
          type: user_actions.UPDATE_USER_INFO,
          payload: response.data,
        });
        dispatch({ type: api_loader_action.USER_INFO_UPDATE_ENDED });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateProfilePhotoAction = data => {
  return async dispatch => {
    try {
      dispatch({ type: api_loader_action.USER_PROFILE_PHOTO_UPDATE_STARTED });

      let response = await apiConfig.post(
        '/api/users/update/profile-photo',
        data
      );

      if (200 === response.status) {
        dispatch({
          type: api_loader_action.USER_PROFILE_PHOTO_UPDATE_ENDED,
          payload: response.data,
        });
      }
    } catch (e) {
      dispatch({ type: api_loader_action.USER_PROFILE_PHOTO_UPDATE_ERROR });
      console.log(e);
    }
  };
};
export const updateCoverPhotoAction = data => {
  return async dispatch => {
    try {
      let response = await apiConfig.post(
        '/api/users/update/cover-photo',
        data
      );

      if (200 === response.status) {
        dispatch({
          type: user_actions.USER_COVER_PHOTO_UPDATED,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
