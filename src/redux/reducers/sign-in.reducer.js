import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
} from '../actions/types/action-types';

function returnToken() {
  if (localStorage.getItem('userData')) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { endedTokenDate } = userData;

    if (Date.now() < endedTokenDate) {
      return userData.token;
    }
  }
  return null;
}

function returnUserId() {
  if (localStorage.getItem('userData')) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData.userId;
  }
  return null;
}

const initialState = {
  token: returnToken(),
  userId: returnUserId(),
  isSignIn: true,
  message: '',
};

const userDataReducer = (state = initialState, { type, payload }) => {
  const lifeTime = 14400000;
  const endedTokenDate = Date.now() + lifeTime;

  switch (type) {
    case SET_USER_DATA:
      localStorage.setItem(
        'userData',
        JSON.stringify({ userId: payload.userId, token: payload.token, endedTokenDate })
      );
      return {
        ...state,
        userId: payload.token,
        token: payload.token,
      };
    case REMOVE_USER_DATA:
      localStorage.removeItem('userData');
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
