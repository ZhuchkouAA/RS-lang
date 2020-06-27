import { SHOW_MESSAGE, HIDE_MESSAGE } from '../actions/types/action-types';

const initiaModalWindowState = {
  isMessageeVisible: false,
  message: '',
};

const modalWindowReducer = (state = initiaModalWindowState, { type, payload }) => {
  switch (type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        isMessageeVisible: true,
        message: payload,
      };
    case HIDE_MESSAGE:
      return {
        ...state,
        isMessageeVisible: false,
      };
    default:
      return state;
  }
};

export default modalWindowReducer;
