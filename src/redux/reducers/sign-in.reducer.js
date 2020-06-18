import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
} from '../actions/types/action-types';

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
  isSignIn: true,
  message: '',
};

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
