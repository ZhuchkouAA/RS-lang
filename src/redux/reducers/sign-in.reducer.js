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

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        token: action.token,
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
        isSignIn: action.isSignIn,
      };
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
export default userDataReducer;
