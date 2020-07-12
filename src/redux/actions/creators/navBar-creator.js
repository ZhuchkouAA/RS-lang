import {
  GET_NAVBAR_STATE,
  SET_NAVBAR_STATE,
  SET_PREV_PAGE_DICTIONARY,
  RESET_PREV_PAGE,
} from '../types/action-types';

export const setNavBarState = (state) => ({
  type: SET_NAVBAR_STATE,
  payload: state,
});

export const getNavBarState = (state) => ({
  type: GET_NAVBAR_STATE,
  payload: state,
});

export const setPrevPageAsDictionary = () => ({
  type: SET_PREV_PAGE_DICTIONARY,
});

export const resetPrevPage = () => ({
  type: RESET_PREV_PAGE,
});
