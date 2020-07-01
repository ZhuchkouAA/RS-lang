import {
  GET_GAME_MODE_STATE,
  SET_GAME_NAME,
  SET_GAME_MODE,
  SET_GAME_WORDS,
} from '../actions/types/action-types';

const initialState = {
  gameName: 'default',
  mode: '0',
  words: [],
};

const gameModeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_GAME_NAME:
      return {
        ...state,
        gameName: payload,
      };
    case SET_GAME_MODE:
      return {
        ...state,
        mode: payload,
      };
    case SET_GAME_WORDS:
      return {
        ...state,
        words: payload,
      };
    case GET_GAME_MODE_STATE:
      return state;
    default:
      return state;
  }
};

export default gameModeReducer;
