import { APPLY_SETTINGS, INIT_SETTINGS } from '../actions/types/action-types';

const initiaSettingState = {
  wordsPerDay: '10',
  newWordsPerDay: '10',
  isAnswerBtnShow: true,
  isDelFromLearnBtnShow: true,
  isFeedBackButtonsShow: true,
  isImageShow: true,
  isAudioShow: true,
  isAudioMeaningShow: true,
  isAudioExampleShow: true,
  isTextMeaningShow: true,
  isTextExampleShow: true,
  isTranscriptionShow: true,
  isWordTranslateShow: true,
  isTextExampleTranslateShow: true,
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
