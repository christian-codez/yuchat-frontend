import { reaction_actions } from '../types';

export const updateTypingStartedAction = friendId => {
  return async dispatch => {
    try {
      dispatch({
        type: reaction_actions.TYPING_STARTED,
        payload: friendId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateTypingStoppedAction = friendId => {
  return async dispatch => {
    try {
      dispatch({
        type: reaction_actions.TYPING_STOPPED,
        payload: friendId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
