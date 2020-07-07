import {
  GET_NAVBAR_STATE,
  SET_NAVBAR_STATE,
  SET_PREV_PAGE_DICTIONARY,
  RESET_PREV_PAGE,
} from '../actions/types/action-types';

const initialState = {
  navBarState: false,
  isPrevPageDictionary: false,
};

const navBarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NAVBAR_STATE:
      return {
        ...state,
        navBarState: payload,
      };
    case GET_NAVBAR_STATE:
      return state;
    case SET_PREV_PAGE_DICTIONARY:
      return {
        ...state,
        isPrevPageDictionary: true,
      };
    case RESET_PREV_PAGE:
      return {
        ...state,
        isPrevPageDictionary: false,
      };
    default:
      return state;
  }
};

export default navBarReducer;
