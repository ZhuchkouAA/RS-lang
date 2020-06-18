import { REMOVE_TOKEN, SET_ALERT_MESSAGE, SET_TOKEN, SIGN_IN_RENDER } from '../types/action-types';

export const setToken = (token) => ({
  type: SET_TOKEN,
<<<<<<< HEAD
<<<<<<< HEAD
  payload: { token },
=======
  token,
>>>>>>> RSL-08: integration with server
=======
  payload: { token },
>>>>>>> RSL-08: refactor v0.4
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const isSignInRender = (isSignIn) => ({
  type: SIGN_IN_RENDER,
<<<<<<< HEAD
<<<<<<< HEAD
  payload: { isSignIn },
=======
  isSignIn,
>>>>>>> RSL-08: integration with server
=======
  payload: { isSignIn },
>>>>>>> RSL-08: refactor v0.4
});

export const setAlertMessage = (message) => ({
  type: SET_ALERT_MESSAGE,
<<<<<<< HEAD
<<<<<<< HEAD
  payload: { message },
=======
  message,
>>>>>>> RSL-08: integration with server
=======
  payload: { message },
>>>>>>> RSL-08: refactor v0.4
});
