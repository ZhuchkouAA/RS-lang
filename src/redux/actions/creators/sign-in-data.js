import { REMOVE_TOKEN, SET_ALERT_MESSAGE, SET_TOKEN, SIGN_IN_RENDER } from '../types/action-types';

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const isSignInRender = (isSignIn) => ({
  type: SIGN_IN_RENDER,
  isSignIn,
});

export const setAlertMessage = (message) => ({
  type: SET_ALERT_MESSAGE,
  message,
});
