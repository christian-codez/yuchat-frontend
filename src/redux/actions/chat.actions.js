import { chat_actions } from '../types';
import apiConfig from '../../api-config/config';

export const initialConnectionEstablishedAction = socketId => {
  return async dispatch => {
    try {
      await apiConfig.post('/api/users/update-my-socketid', {
        socketID: socketId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const userItemClicked = user => {
  return async dispatch => {
    try {
      dispatch({ type: chat_actions.USER_ITEM_SELECTED, payload: user });
    } catch (e) {
      console.log(e);
    }
  };
};
export const fetchMessagesAction = (sender, receiver) => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/messages/get-user-messages', {
        senderID: sender,
        receiverID: receiver,
      });

      if (response.status === 200) {
        dispatch({
          type: chat_actions.FETCHED_MESSAGES,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateUnreadMessagesAction = data => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.UPDATE_UNREAD_MESSAGES,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchLastMessagesAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.post(`/api/messages/lastmessages`);

      if (response.status === 200) {
        dispatch({
          type: chat_actions.GET_LAST_MESSAGES,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const readUnreadMessagesAction = data => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.READ_USER_UNREAD_MESSAGES,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateUsersOnlineAction = userId => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.CURRENT_USERS_ONLINE,
        payload: userId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const removeUsersOnlineAction = userId => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.REMOVE_CURRENT_USER_ONLINE,
        payload: userId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const sendChatMessageAction = data => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/messages/send', data);
      if (200 === response.status) {
        dispatch({
          type: chat_actions.SEND_PERSONAL_MESSAGE_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: chat_actions.SEND_PERSONAL_MESSAGE_FAILURE,
        payload: error.response
          ? error.response.data
          : 'Message not successful',
      });
    }
  };
};
export const clearMessageRequestStatus = () => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.CLEAR_MESSAGE_FAILURE,
      });
    } catch (error) {}
  };
};
export const receivedNewMessageAction = data => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.SEND_PERSONAL_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const notifyTypingStartedAction = friendId => {
  return async dispatch => {
    try {
      await apiConfig.post('/api/messages/typing-started', {
        uuid: friendId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const notifyTypingStoppedAction = friendId => {
  return async dispatch => {
    try {
      await apiConfig.post('/api/messages/typing-stopped', {
        uuid: friendId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const clearChatHistoryAction = friendId => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.START_CLEAR_CHAT_HISTORY,
      });

      const response = await apiConfig.delete(
        `/api/messages/clear-chat-history/${friendId}`
      );

      console.log(response.data.deletedCount);

      dispatch({
        type: chat_actions.END_CLEAR_CHAT_HISTORY,
        payload: friendId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const checkUserIsOnlineAction = userId => {
  return async dispatch => {
    try {
      const response = await apiConfig.get(
        `/api/users/check-is-online/${userId}`
      );
      if ('online' === response.data.status) {
        dispatch({
          type: chat_actions.CURRENT_USERS_ONLINE,
          payload: response.data.id,
        });
      } else if ('offline' === response.data.status) {
        dispatch({
          type: chat_actions.REMOVE_CURRENT_USER_ONLINE,
          payload: userId,
        });
      }
    } catch (error) {}
  };
};
export const deleteChatMessageAction = (messageId, currentUserId) => {
  return async dispatch => {
    try {
      const response = await apiConfig.delete(
        `/api/messages/delete/chat/message/${messageId}`
      );
      if (200 === response.status) {
        dispatch({
          type: chat_actions.DELETE_CHAT_MESSAGE,
          payload: { messageId, currentUserId },
        });
      }
    } catch (error) {}
  };
};
export const deleteChatMessageForeverAction = id => {
  return async dispatch => {
    try {
      const response = await apiConfig.delete(
        `/api/messages/delete/chat/message/forever/${id}`
      );

      if (200 === response.status) {
        dispatch({
          type: chat_actions.DELETE_CHAT_MESSAGE_FOREVER,
          payload: id,
        });
      }
    } catch (error) {}
  };
};
