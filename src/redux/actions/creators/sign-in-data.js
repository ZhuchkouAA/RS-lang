import {
  REMOVE_USER_DATA,
  SET_ALERT_MESSAGE,
  SET_USER_DATA,
  SIGN_IN_RENDER,
  BUTTON_ACTIVITY_SWITCH,
} from '../types/action-types';

export const setUserData = ({ token, userId }) => ({
  type: SET_USER_DATA,
  payload: { token, userId },
});

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
});

export const isSignInRender = (isSignIn) => ({
  type: SIGN_IN_RENDER,
  payload: { isSignIn },
});

export const setAlertMessage = (message) => ({
  type: SET_ALERT_MESSAGE,
  payload: { message },
});

export const buttonActivitySwitch = () => ({
  type: BUTTON_ACTIVITY_SWITCH,
});
