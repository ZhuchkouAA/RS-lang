import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
} from '../actions/types/action-types';

const initialState = {
  token: localStorage.getItem('token'),
  isSignIn: true,
  message: '',
};

const userDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
      };
    case SIGN_IN_RENDER:
      return {
        ...state,
        isSignIn: payload.isSignIn,
      };
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        message: payload.message,
      };
    default:
      return state;
  }
};
export default userDataReducer;
