import { APPLY_SETTINGS, INIT_SETTINGS } from '../actions/types/action-types';

const initiaSettingState = {
  wordsPerDay: '10',
  newWordsPerDay: '10',
  answerBtn: true,
  delFromLearnBtn: true,
  feedBackButtons: true,
  image: true,
  audio: true,
  audioMeaning: true,
  audioExample: true,
  textMeaning: true,
  textExample: true,
  transcription: true,
  wordTranslate: true,
  textExampleTranslate: true,
};

const settingReducer = (state = initiaSettingState, { type, payload }) => {
  switch (type) {
    case APPLY_SETTINGS:
      return {
        ...state,
        ...payload,
      };
    case INIT_SETTINGS:
    default:
      return state;
  }
};

export default settingReducer;
