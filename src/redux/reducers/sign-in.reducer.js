import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
} from '../actions/types/action-types';

<<<<<<< HEAD
function returnToken() {
  if (localStorage.getItem('tokenData')) {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const { endedTokenDate } = tokenData;

    if (Date.now() < endedTokenDate) {
      return tokenData.token;
    }
  }
  return null;
}

const initialState = {
  token: returnToken(),
=======
const initialState = {
  token: localStorage.getItem('token'),
>>>>>>> RSL-08: integration with server
  isSignIn: true,
  message: '',
};

<<<<<<< HEAD
const userDataReducer = (state = initialState, { type, payload }) => {
<<<<<<< HEAD
  const lifeTime = 14400000;
  const endedTokenDate = Date.now() + lifeTime;
  switch (type) {
    case SET_TOKEN:
      localStorage.setItem('tokenData', JSON.stringify({ token: payload.token, endedTokenDate }));
=======
  switch (type) {
    case SET_TOKEN:
      localStorage.setItem('token', payload.token);
>>>>>>> RSL-08: refactor v0.4
      return {
        ...state,
        token: payload.token,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem('tokenData');
=======
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
>>>>>>> RSL-08: integration with server
      return {
        ...state,
        token: null,
      };
    case SIGN_IN_RENDER:
      return {
        ...state,
<<<<<<< HEAD
        isSignIn: payload.isSignIn,
=======
        isSignIn: action.isSignIn,
>>>>>>> RSL-08: integration with server
      };
    case SET_ALERT_MESSAGE:
      return {
        ...state,
<<<<<<< HEAD
        message: payload.message,
=======
        message: action.message,
>>>>>>> RSL-08: integration with server
      };
    default:
      return state;
  }
};
export default userDataReducer;
