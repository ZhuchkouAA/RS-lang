import { GET_NAVBAR_STATE, SET_NAVBAR_STATE } from '../actions/types/action-types';

const initialState = {
  state: 'disable',
};

const navBarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NAVBAR_STATE:
      return {
        ...state,
        state: payload,
      };
    case GET_NAVBAR_STATE:
      return state;
    default:
      return state;
  }
};

export default navBarReducer;
