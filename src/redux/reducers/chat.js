import { chat_actions, user_actions } from '../types';

const INITIAL_STATE = {
  chattingWith: null,
  sentMessages: [],
  unreadMessages: [],
  usersOnline: [],
  last_messages: [],
  clearingChatHistory: false,
  RequestStatus: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chat_actions.USER_ITEM_SELECTED:
      return { ...state, chattingWith: action.payload };
    case chat_actions.FETCHED_MESSAGES:
      return { ...state, sentMessages: action.payload };
    case chat_actions.FETCHED_MESSAGES_STARTED:
      return { ...state, messages: null };
    case chat_actions.SEND_PERSONAL_MESSAGE_FAILURE:
      return { ...state, RequestStatus: action.payload };
    case chat_actions.CLEAR_MESSAGE_FAILURE:
      return { ...state, RequestStatus: null };
    case chat_actions.READ_USER_UNREAD_MESSAGES:
      const updatedMessages = state.unreadMessages.filter(message => {
        return message.sender.id !== action.payload.id;
      });
      return {
        ...state,
        unreadMessages: updatedMessages,
      };
    case chat_actions.UPDATE_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: [...state.unreadMessages, action.payload],
      };
    case chat_actions.SEND_PERSONAL_MESSAGE_SUCCESS:
      const latestMessage = [action.payload];
      return {
        ...state,
        sentMessages: state.sentMessages !== null && [
          ...state.sentMessages,
          action.payload,
        ],
        last_messages: [...latestMessage, ...state.last_messages],
        RequestStatus: 'Message sent successfully',
      };
    case chat_actions.GET_LAST_MESSAGES:
      return { ...state, last_messages: action.payload };
    case chat_actions.CURRENT_USERS_ONLINE:
      const userExists = state.usersOnline.includes(action.payload);
      if (!userExists) {
        return {
          ...state,
          usersOnline: [...state.usersOnline, action.payload],
        };
      } else {
        return state;
      }
    case chat_actions.REMOVE_CURRENT_USER_ONLINE:
      const userExistOnline = state.usersOnline.includes(action.payload);
      if (userExistOnline) {
        return {
          ...state,
          usersOnline: state.usersOnline.filter(id => id !== action.payload),
        };
      } else {
        return state;
      }

    case chat_actions.END_CLEAR_CHAT_HISTORY:
      const filteredLastMessages = state.last_messages.filter(
        message =>
          message.receiver.id !== action.payload &&
          message.sender.id !== action.payload
      );

      return {
        ...state,
        sentMessages: [],
        last_messages: filteredLastMessages,
        clearingChatHistory: false,
        chattingWith:
          state.last_messages.length <= 0 ? null : state.chattingWith,
      };
    case chat_actions.DELETE_CHAT_MESSAGE:
      return {
        ...state,
        sentMessages: state.sentMessages.map(message => {
          if (message.id === action.payload.messageId) {
            console.log(message);
            return {
              ...message,
              deletedStatus: true,
              deletedBy: [action.payload.currentUserId],
            };
          }

          return message;
        }),
      };

    case chat_actions.DELETE_CHAT_MESSAGE_FOREVER:
      return {
        ...state,
        sentMessages: state.sentMessages.filter(
          message => message.id !== action.payload
        ),
      };

    case chat_actions.START_CLEAR_CHAT_HISTORY:
      return {
        ...state,
        clearingChatHistory: true,
      };

    default:
      return state;
  }
};
