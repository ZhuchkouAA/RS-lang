import { APPLY_SETTINGS, RESET_SETTINGS } from '../actions/types/action-types';

const initiaSettingState = {
  wordsPerDay: 20,
  newWordsPerDay: 10,
  isAnswerBtnShow: true,
  isDelFromLearnBtnShow: true,
  isHardWordBtnShow: true,
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
    case RESET_SETTINGS:
      return {
        ...initiaSettingState,
      };
    default:
      return state;
  }
};

export default settingReducer;
