import {
  DIFFERENT_CARDS_COUNTER_PLUS_ONE,
  REWRITE_DATE_OF_RECEIPT_OF_WORDS,
  REDUCE_LEFT_NEW_WORDS_TODAY,
  REDUCE_LEFT_REPEAT_WORDS_TODAY,
  RESET_PROGRESS,
  QUEUE_NEW_WORDS,
  QUEUE_REPEAT_WORDS,
  REWRITE_PROGRESS,
} from '../actions/types/action-types';

import { MSEC_PER_DAY } from '../../constants/wordConfig';

const initialProgressState = {
  differentCardsShowedAllTime: 0,
  cardsShowedAllTime: 0,
  rightAnswersAllTime: 0,
  dateOfReceiptOfWords: Date.now() + MSEC_PER_DAY,
  leftNewWordsToday: 10,
  queueNewWords: [],
  queueRepeatWords: [],
  queueRandom300: [],
  leftRepeatWordsToday: 10,
  cardsShowedToday: 0,
  rightTodayAnswers: 0,
  longestTodaySeries: 0,
  learnedWords15Days: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  cardsShowed15Days: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  newCardsShowed15Days: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rightAnswers15Days: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const progressReducer = (state = initialProgressState, { type, payload }) => {
  switch (type) {
    case DIFFERENT_CARDS_COUNTER_PLUS_ONE:
      return {
        ...state,
        differentCardsShowedAllTime: state.differentCardsShowedAllTime + 1,
      };
    case REWRITE_DATE_OF_RECEIPT_OF_WORDS:
      return {
        ...state,
        dateOfReceiptOfWords: state.differentCardsShowedAllTime + 1,
      };
    case REDUCE_LEFT_NEW_WORDS_TODAY:
      return {
        ...state,
        leftNewWordsToday: state.leftNewWordsToday - 1,
        queueNewWords: state.queueNewWords.pop(),
      };
    case REDUCE_LEFT_REPEAT_WORDS_TODAY:
      return {
        ...state,
        leftRepeatWordsToday: state.leftRepeatWordsToday - 1,
        queueRepeatWords: state.queueRepeatWords.pop(),
      };
    case QUEUE_NEW_WORDS:
      return {
        ...state,
        queueNewWords: payload,
      };
    case QUEUE_REPEAT_WORDS:
      return {
        ...state,
        queueRepeatWords: payload,
      };
    case REWRITE_PROGRESS:
      return payload;
    case RESET_PROGRESS:
      return initialProgressState;
    default:
      return state;
  }
};

export default progressReducer;
