import { api_loader_action } from '../types';

const INITIAL_STATE = {
  updatingUserInfo: false,
  profilePhotoUpdating: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case api_loader_action.USER_INFO_UPDATE_STARTED:
      return { ...state, updatingUserInfo: true };
    case api_loader_action.USER_INFO_UPDATE_ENDED:
      return { ...state, updatingUserInfo: false };
    case api_loader_action.USER_PROFILE_PHOTO_UPDATE_STARTED:
      return { ...state, profilePhotoUpdating: true };
    case api_loader_action.USER_PROFILE_PHOTO_UPDATE_ENDED:
      return { ...state, profilePhotoUpdating: false };
    default:
      return state;
  }
};
