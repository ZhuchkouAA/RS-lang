import { REMOVE_TOKEN, SET_ALERT_MESSAGE, SET_TOKEN, SIGN_IN_RENDER } from '../types/action-types';

export const setToken = (token) => ({
  type: SET_TOKEN,
<<<<<<< HEAD
  payload: { token },
=======
  token,
>>>>>>> RSL-08: integration with server
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const isSignInRender = (isSignIn) => ({
  type: SIGN_IN_RENDER,
<<<<<<< HEAD
  payload: { isSignIn },
=======
  isSignIn,
>>>>>>> RSL-08: integration with server
});

export const setAlertMessage = (message) => ({
  type: SET_ALERT_MESSAGE,
<<<<<<< HEAD
  payload: { message },
=======
  message,
>>>>>>> RSL-08: integration with server
});
