import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
} from '../actions/types/action-types';
import setCookie from '../../helpers/cookies-utils/setCookie';
import { token, userId } from '../../constants/cookiesNames';
import clearAllCookie from '../../helpers/cookies-utils/clearAllCookie';
import getCookie from '../../helpers/cookies-utils/getCookie';

const checkUserData = () => {
  const id = getCookie(userId);
  const userToken = getCookie(token);

  if (!(id && userToken)) {
    clearAllCookie();
    return null;
  }

  return true;
};

const initialState = {
  userData: checkUserData(),
  isSignIn: true,
  message: '',
  getUserData: getCookie,
};

const userDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      setCookie(token, payload.token);
      setCookie(userId, payload.userId);

      return {
        ...state,
        userData: true,
      };
    case REMOVE_USER_DATA:
      clearAllCookie();

      return {
        ...state,
        userData: null,
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
