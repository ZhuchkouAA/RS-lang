import {
  GET_GAME_MODE_STATE,
  SET_GAME_MODE,
  SET_GAME_NAME,
  SET_GAME_WORDS,
} from '../types/action-types';

export const setGameMode = (state) => ({
  type: SET_GAME_MODE,
  payload: state,
});

export const setGameName = (state) => ({
  type: SET_GAME_NAME,
  payload: state,
});

export const setGameWords = (state) => ({
  type: SET_GAME_WORDS,
  payload: state,
});

export const getGameModeState = (state) => ({
  type: GET_GAME_MODE_STATE,
  payload: state,
});
