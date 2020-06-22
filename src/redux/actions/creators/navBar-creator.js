import { GET_NAVBAR_STATE, SET_NAVBAR_STATE } from '../types/action-types';

export const setNavBarState = (state) => ({
  type: SET_NAVBAR_STATE,
  payload: state,
});

export const getNavBarState = (state) => ({
  type: GET_NAVBAR_STATE,
  payload: state,
});
