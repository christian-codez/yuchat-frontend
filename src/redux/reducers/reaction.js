import { reaction_actions } from '../types';

const INITIAL_STATE = {
  userTyping: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case reaction_actions.TYPING_STARTED:
      const users = !state.userTyping.includes(action.payload)
        ? [...state.userTyping, action.payload]
        : state.userTyping;
      return { ...state, userTyping: users };
    case reaction_actions.TYPING_STOPPED:
      const newUsers = state.userTyping.includes(action.payload)
        ? state.userTyping.filter(id => id !== action.payload)
        : state.userTyping;
      return { ...state, userTyping: newUsers };
    default:
      return state;
  }
};
