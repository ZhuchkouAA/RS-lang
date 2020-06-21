import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  SIGN_IN_RENDER,
  SET_ALERT_MESSAGE,
  BUTTON_ACTIVITY_SWITCH,
} from '../actions/types/action-types';
import { setCookie, getCookie, clearAllCookie } from '../../helpers/cookies-utils';
import { TOKEN, USER_ID } from '../../constants/cookiesNames';

const checkUserData = () => {
  const id = getCookie(USER_ID);
  const token = getCookie(TOKEN);

  if (!(id && token)) {
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
      setCookie(TOKEN, payload.token);
      setCookie(USER_ID, payload.userId);

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
    case BUTTON_ACTIVITY_SWITCH:
      return {
        ...state,
        isButtonDisabled: !state.isButtonDisabled,
      };
    default:
      return state;
  }
};
export default userDataReducer;
