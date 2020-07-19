import { user_actions, api_loader_action } from '../types';

const INITIAL_STATE = {
  people: [],
  loadingPeople: false,
  fetchingPeopleError: null,
  last_connection_request: null,
  friend_requests: null,
  friends: [],
  blockedFriends: [],
  previousFriendsList: null,
  lastRemovedFriend: [],
  sentFriendRequests: [],
  unacceptedFriendRequests: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_actions.FETCHED_PEOPLE:
      return {
        ...state,
        people: action.payload,
        loadingPeople: false,
        fetchingPeopleError: null,
      };
    case user_actions.FETCHING_PEOPLE:
      return { ...state, loadingPeople: true, fetchingPeopleError: null };
    case user_actions.FETCHING_PEOPLE_ERROR:
      return {
        ...state,
        loadingPeople: false,
        people: [],
        fetchingPeopleError: action.payload,
      };
    case user_actions.SEND_CONNECTION_REQUEST:
      return { ...state, last_connection_request: action.payload };
    case user_actions.FETCHED_FRIEND_REQUESTS:
      return { ...state, friend_requests: action.payload };
    case user_actions.FETCHED_FRIENDS:
      return { ...state, friends: action.payload };
    case user_actions.BLOCKED_FRIEND:
      return {
        ...state,
        friends: state.friends.filter(friend => friend.id !== action.payload),
      };
    case user_actions.UNBLOCKED_FRIEND:
      return {
        ...state,
        blockedFriends: state.blockedFriends.filter(
          friend => friend.id !== action.payload
        ),
      };
    case user_actions.FETCHED_SENT_FRIEND_REQUESTS:
      return { ...state, sentFriendRequests: action.payload };
    case user_actions.REMOVE_SENT_FRIEND_REQUEST:
      return {
        ...state,
        sentFriendRequests: state.sentFriendRequests.filter(
          request => request._id !== action.payload
        ),
      };
    case user_actions.FETCHED_UNACCEPTED_FRIEND_REQUESTS:
      return {
        ...state,
        unacceptedFriendRequests: action.payload,
      };
    case user_actions.FETCHED_BLOCKED_FRIENDS:
      return { ...state, blockedFriends: action.payload };
    case user_actions.UNFRIEND_USER:
      return {
        ...state,
        lastRemovedFriend: action.payload,
        previousFriendsList: state.friends,
        friends: state.friends.filter(friend => {
          return friend.id !== action.payload.id;
        }),
      };
    case user_actions.UNDO_UNFRIENDES_USER:
      return {
        ...state,
        friends: state.previousFriendsList,
        previousFriendsList: null,
        lastRemovedFriend: null,
      };
    case user_actions.CONFIRM_UNFRIENDING_ACTION:
      return {
        ...state,
        friends: state.previousFriendsList.filter(friend => {
          return friend.id !== state.lastRemovedFriend.id;
        }),
        previousFriendsList: null,
        lastRemovedFriend: null,
      };
    case user_actions.ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    case user_actions.DECLINE_FRIEND_REQUEST:
      return {
        ...state,
        unacceptedFriendRequests: state.unacceptedFriendRequests.filter(
          request => {
            return request._id !== action.payload._id;
          }
        ),
      };
    default:
      return state;
  }
};
