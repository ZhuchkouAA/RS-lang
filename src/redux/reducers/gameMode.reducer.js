import {
  GET_GAME_MODE_STATE,
  SET_GAME_NAME,
  SET_GAME_MODE,
  SET_GAME_WORDS,
  SET_RANDOM_WORDS,
} from '../actions/types/action-types';

const getGameMode = () => {
  if (localStorage.getItem('gameModeObj')) {
    return localStorage.getItem('gameModeObj');
  }
  localStorage.setItem('gameModeObj', 'Спринт');
  return 'Спринт';
};

const initialState = {
  gameName: getGameMode(),
  mode: '0',
  words: [],
  randomWords: [],
};

const gameModeReducer = (state = initialState, { type, payload }) => {
  let gameName = payload;
  switch (type) {
    case SET_GAME_NAME:
      if (payload === 'Аудио Вызов') {
        localStorage.setItem('gameModeObj', 'Аудио_Вызов');
        gameName = 'Аудио_Вызов';
      } else if (payload === 'Скажи это!') {
        localStorage.setItem('gameModeObj', 'Скажи_это');
        gameName = 'Скажи_это';
      } else {
        localStorage.setItem('gameModeObj', payload);
      }

      return {
        ...state,
        gameName,
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
    case SET_RANDOM_WORDS:
      return {
        ...state,
        randomWords: payload,
      };
    default:
      return state;
  }
};

export default gameModeReducer;
