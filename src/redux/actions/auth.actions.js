import { auth_actions } from '../types';
import apiConfig from '../../api-config/config';
import { useHistory } from 'react-router-dom';

export const resetErrorAction = () => {
  return async dispatch => {
    dispatch({
      type: auth_actions.SIGNUP_RESET_ERROR,
    });
  };
};
export const resetLoginErrorAction = () => {
  return async dispatch => {
    dispatch({
      type: auth_actions.SIGNIN_RESET_ERROR,
    });
  };
};
export const registerAction = user => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users', user);

      if (response.status === 201) {
        loginTokenAction(response.data.token);
        dispatch({
          type: auth_actions.SIGNUP_ACTION,
          payload: response.data,
        });
      }

      return true;
    } catch (error) {
      dispatch({
        type: auth_actions.SIGNUP_ERROR,
        payload: error.response
          ? error.response.data
          : 'Registeration failed, please try angain',
      });

      return false;
    }
  };
};
export const loginAction = user => {
  return async dispatch => {
    try {
      localStorage.removeItem('user');
      let response = await apiConfig.post('/api/users/login', user);

      if (response.status === 200) {
        localStorage.setItem('user', response.data.token);
        console.log('setting userId', localStorage.getItem('user'));
        dispatch({
          type: auth_actions.SIGNIN_ACTION,
          payload: response.data,
        });
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: auth_actions.SIGNIN_ACTION_ERROR,
        payload: error.response
          ? error.response.data
          : 'Login failed, please try angain',
      });
    }
  };
};
export const loginTokenAction = token => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(`/api/users/login/${token}`);

      const user =
        Object.keys(response.data).length !== 0 ? response.data : null;

      if (response.status === 200 && user) {
        localStorage.setItem('user', token);
        dispatch({
          type: auth_actions.SIGNIN_ACTION,
          payload: user,
        });
      } else {
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const logoutAction = id => {
  return async dispatch => {
    try {
      localStorage.removeItem('user');
      // let response = await apiConfig.post(`/api/users/logout/${id}`);

      dispatch({
        type: auth_actions.SIGNOUT_ACTION,
      });
    } catch (e) {
      console.log(e);
      localStorage.removeItem('user');
    }
  };
};
export const deactivateMyAccountAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.delete(`/api/users/deactivate/me`);
      localStorage.removeItem('user');

      dispatch({
        type: auth_actions.DEACTIVATE_ACCOUNT,
      });

      return;
    } catch (error) {
      dispatch({
        type: auth_actions.DEACTIVATE_ACCOUNT_ERROR,
        payload: error.response.data,
      });

      return false;
    }
  };
};
