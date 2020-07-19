import { auth_actions, user_actions } from '../types';

const INITIAL_STATE = {
  currentUser: null,
  signinError: null,
  signupError: null,
  deactivateError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case auth_actions.SIGNIN_ACTION:
      return { ...state, currentUser: action.payload };
    case auth_actions.SIGNOUT_ACTION:
      return { ...state, currentUser: null };
    case user_actions.USER_COVER_PHOTO_UPDATED:
      return { ...state, currentUser: action.payload };
    case user_actions.USER_PROFILE_PHOTO_UPDATE_ENDED:
      return { ...state, currentUser: action.payload };
    case auth_actions.SIGNUP_ERROR:
      return { ...state, signupError: action.payload };
    case auth_actions.SIGNUP_RESET_ERROR:
      return { ...state, signupError: null };
    case auth_actions.SIGNIN_RESET_ERROR:
      return { ...state, signinError: null };
    case auth_actions.DEACTIVATE_ACCOUNT_ERROR:
      return { ...state, deactivateError: null };
    case auth_actions.DEACTIVATE_ACCOUNT:
      return { ...state, currentUser: null };
    case auth_actions.SIGNIN_ACTION_ERROR:
      return { ...state, signinError: action.payload };
    case user_actions.UPDATE_USER_INFO:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
