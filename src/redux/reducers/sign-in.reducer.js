import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
} from '../actions/types/action-types';

const initialToken =
  localStorage.getItem('tokenData') &&
  Date.now() < JSON.parse(localStorage.getItem('tokenData')).deathTokenDate
    ? JSON.parse(localStorage.getItem('tokenData')).token
    : null;

const initialState = {
  token: initialToken,
  isSignIn: true,
  message: '',
};

const userDataReducer = (state = initialState, { type, payload }) => {
  const lifeTime = 14400000;
  const deathTokenDate = Date.now() + lifeTime;
  switch (type) {
    case SET_TOKEN:
      localStorage.setItem('tokenData', JSON.stringify({ token: payload.token, deathTokenDate }));
      return {
        ...state,
        token: payload.token,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem('tokenData');
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
