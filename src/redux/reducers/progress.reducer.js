import {
  DIFFERENT_CARDS_COUNTER_PLUS_ONE,
  REWRITE_DATE_OF_RECEIPT_OF_WORDS,
  REDUCE_LEFT_NEW_WORDS_TODAY,
  REDUCE_LEFT_REPEAT_WORDS_TODAY,
  RESET_PROGRESS,
  QUEUE_NEW_WORDS,
  QUEUE_REPEAT_WORDS,
  REWRITE_PROGRESS,
  CARDS_SHOW_ALL_TIME_INCREASE,
  RIGHT_ANSWERS_ALLTIME_INCREASE,
  LONGEST_TODAY_SERIES_INCREASE,
  LONGEST_TODAY_SERIES_RESET,
  LEANED_WORDS_STATISTIC_INCREASE,
  CARDS_SHOWED_STATISTIC_INCREASE,
  NEW_CARDS_SHOWED_STATISTIC_INCREASE,
  RIGHT_ANSWERS_STATISTIC_INCREASE,
  SET_LEFT_NEW_WORDS_TODAY,
  SET_LEFT_REPEAT_WORDS_TODAY,
} from '../actions/types/action-types';

import { BASE_EMPTY_ARRAY_15 } from '../../constants/app-settings';
import { MSEC_PER_DAY } from '../../constants/common';

const initialProgressState = {
  differentCardsShowedAllTime: 0,
  cardsShowedAllTime: 0,
  rightAnswersAllTime: 0,
  dateOfReceiptOfWords: Date.now() + MSEC_PER_DAY,
  leftNewWordsToday: 10,
  queueNewWords: [],
  queueRepeatWords: [],
  leftRepeatWordsToday: 10,
  longestTodaySeries: 0,
  learnedWordsStatistic: BASE_EMPTY_ARRAY_15,
  cardsShowedStatistic: BASE_EMPTY_ARRAY_15,
  newCardsShowedStatistic: BASE_EMPTY_ARRAY_15,
  rightAnswersStatistic: BASE_EMPTY_ARRAY_15,
};

const progressReducer = (state = initialProgressState, { type, payload }) => {
  const [firstlearnedWordsStatistic, ...otherlearnedWordsStatistic] = state.learnedWordsStatistic;
  const [firstCardShowedStatistic, ...otherCardsShowedStatistic] = state.cardsShowedStatistic;
  const [
    firstNewCardsShowedStatistic,
    ...otherNewCardsShowedStatistic
  ] = state.newCardsShowedStatistic;
  const [firstRightAnswersStatistic, ...otherRightAnswersStatistic] = state.rightAnswersStatistic;
  switch (type) {
    case SET_LEFT_NEW_WORDS_TODAY:
      return {
        ...state,
        leftNewWordsToday: payload,
      };
    case SET_LEFT_REPEAT_WORDS_TODAY:
      return {
        ...state,
        leftRepeatWordsToday: payload,
      };
    case CARDS_SHOW_ALL_TIME_INCREASE:
      return {
        ...state,
        cardsShowedAllTime: state.cardsShowedAllTime + 1,
      };
    case RIGHT_ANSWERS_ALLTIME_INCREASE:
      return {
        ...state,
        rightAnswersAllTime: state.rightAnswersAllTime + 1,
      };
    case LONGEST_TODAY_SERIES_INCREASE:
      return {
        ...state,
        longestTodaySeries: state.longestTodaySeries + 1,
      };
    case LONGEST_TODAY_SERIES_RESET:
      return {
        ...state,
        longestTodaySeries: 0,
      };
    case LEANED_WORDS_STATISTIC_INCREASE:
      return {
        ...state,
        learnedWordsStatistic: [firstlearnedWordsStatistic + 1, ...otherlearnedWordsStatistic],
      };
    case CARDS_SHOWED_STATISTIC_INCREASE:
      return {
        ...state,
        cardsShowedStatistic: [firstCardShowedStatistic + 1, ...otherCardsShowedStatistic],
      };
    case NEW_CARDS_SHOWED_STATISTIC_INCREASE:
      return {
        ...state,
        newCardsShowedStatistic: [
          firstNewCardsShowedStatistic + 1,
          ...otherNewCardsShowedStatistic,
        ],
      };
    case RIGHT_ANSWERS_STATISTIC_INCREASE:
      return {
        ...state,
        rightAnswersStatistic: [firstRightAnswersStatistic + 1, ...otherRightAnswersStatistic],
      };
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
      };
    case REDUCE_LEFT_REPEAT_WORDS_TODAY:
      return {
        ...state,
        leftRepeatWordsToday: state.leftRepeatWordsToday - 1,
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
