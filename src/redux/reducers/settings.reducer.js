import { APPLY_SETTINGS, RESET_SETTINGS } from '../actions/types/action-types';
import {
  DEFAULT_COUNT_NEW_WORDS,
  DEFAULT_COUNT_ALL_WORDS,
} from '../../constants/variables-learning';

const initiaSettingState = {
  wordsPerDay: DEFAULT_COUNT_ALL_WORDS,
  newWordsPerDay: DEFAULT_COUNT_NEW_WORDS,
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
