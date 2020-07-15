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
  TRY_SET_LONGEST_TODAY_SERIES,
  LONGEST_TODAY_SERIES_RESET,
  LEANED_WORDS_STATISTIC_INCREASE,
  CARDS_SHOWED_STATISTIC_INCREASE,
  NEW_CARDS_SHOWED_STATISTIC_INCREASE,
  RIGHT_ANSWERS_STATISTIC_INCREASE,
  SET_LEFT_NEW_WORDS_TODAY,
  SET_LEFT_REPEAT_WORDS_TODAY,
  INCREASE_SPRINT_ALL_ANSWERS_STATISTIC,
  INCREASE_SPRINT_RIGHT_ANSWERS_STATISTIC,
  TRY_SET_SPRINT_MAX_SCORE_STATISTIC,
  INCREASE_SAVANNA_ALL_ANSWERS_STATISTIC,
  INCREASE_SAVANNA_RIGHT_ANSWERS_STATISTIC,
  INCREASE_SAVANNA_FULL_LIVE_STATISTIC,
} from '../actions/types/action-types';

import { BASE_EMPTY_ARRAY_15 } from '../../constants/app-settings';
import { MSEC_PER_DAY } from '../../constants/common';
import {
  DEFAULT_COUNT_NEW_WORDS,
  DEFAULT_COUNT_LEFT_REPEAT_WORDS,
} from '../../constants/variables-learning';

const initialProgressState = {
  differentCardsShowedAllTime: 0,
  cardsShowedAllTime: 0,
  rightAnswersAllTime: 0,
  dateOfReceiptOfWords: Date.now() + MSEC_PER_DAY,
  leftNewWordsToday: DEFAULT_COUNT_NEW_WORDS,
  queueNewWords: [],
  queueRepeatWords: [],
  leftRepeatWordsToday: DEFAULT_COUNT_LEFT_REPEAT_WORDS,
  longestTodaySeries: 0,
  learnedWordsStatistic: BASE_EMPTY_ARRAY_15,
  cardsShowedStatistic: BASE_EMPTY_ARRAY_15,
  newCardsShowedStatistic: BASE_EMPTY_ARRAY_15,
  rightAnswersStatistic: BASE_EMPTY_ARRAY_15,

  sprintAllAnswersStatistic: BASE_EMPTY_ARRAY_15,
  sprintRightAnswersStatistic: BASE_EMPTY_ARRAY_15,
  sprintMaxScoreStatistic: BASE_EMPTY_ARRAY_15,

  savannaAllAnswersStatistic: BASE_EMPTY_ARRAY_15,
  savannaRightAnswersStatistic: BASE_EMPTY_ARRAY_15,
  savannaFullLiveStatistic: BASE_EMPTY_ARRAY_15,
};

const progressReducer = (state = initialProgressState, { type, payload }) => {
  const [
    firstSavannaAllAnswersStatistic,
    ...otherSavannaAllAnswersStatistic
  ] = state.savannaAllAnswersStatistic;
  const [
    firstSavannaRightAnswersStatistic,
    ...otherSavannaRightAnswersStatistic
  ] = state.savannaRightAnswersStatistic;
  const [
    firstSavannaFullLiveStatistic,
    ...otherSavannaFullLiveStatistic
  ] = state.savannaFullLiveStatistic;

  const [firstlearnedWordsStatistic, ...otherlearnedWordsStatistic] = state.learnedWordsStatistic;
  const [firstCardShowedStatistic, ...otherCardsShowedStatistic] = state.cardsShowedStatistic;
  const [
    firstNewCardsShowedStatistic,
    ...otherNewCardsShowedStatistic
  ] = state.newCardsShowedStatistic;
  const [firstRightAnswersStatistic, ...otherRightAnswersStatistic] = state.rightAnswersStatistic;

  const [
    firstSprintAllAnswersStatistic,
    ...otherSprintAllAnswersStatistic
  ] = state.sprintAllAnswersStatistic;

  const [
    firstSprintRightAnswersStatistic,
    ...otherSprintRightAnswersStatistic
  ] = state.sprintRightAnswersStatistic;

  const [
    firstSprintMaxScoreStatistic,
    ...otherSprintMaxScoreStatistic
  ] = state.sprintMaxScoreStatistic;

  switch (type) {
    case INCREASE_SAVANNA_ALL_ANSWERS_STATISTIC:
      return {
        ...state,
        savannaAllAnswersStatistic: [
          firstSavannaAllAnswersStatistic + 1,
          ...otherSavannaAllAnswersStatistic,
        ],
      };
    case INCREASE_SAVANNA_RIGHT_ANSWERS_STATISTIC:
      return {
        ...state,
        savannaRightAnswersStatistic: [
          firstSavannaRightAnswersStatistic + 1,
          ...otherSavannaRightAnswersStatistic,
        ],
      };
    case INCREASE_SAVANNA_FULL_LIVE_STATISTIC:
      return {
        ...state,
        savannaFullLiveStatistic: [
          firstSavannaFullLiveStatistic + 1,
          ...otherSavannaFullLiveStatistic,
        ],
      };
    case INCREASE_SPRINT_ALL_ANSWERS_STATISTIC:
      return {
        ...state,
        sprintAllAnswersStatistic: [
          firstSprintAllAnswersStatistic + 1,
          ...otherSprintAllAnswersStatistic,
        ],
      };
    case INCREASE_SPRINT_RIGHT_ANSWERS_STATISTIC:
      return {
        ...state,
        sprintRightAnswersStatistic: [
          firstSprintRightAnswersStatistic + 1,
          ...otherSprintRightAnswersStatistic,
        ],
      };
    case TRY_SET_SPRINT_MAX_SCORE_STATISTIC:
      if (payload > firstSprintMaxScoreStatistic) {
        return {
          ...state,
          sprintMaxScoreStatistic: [payload, ...otherSprintMaxScoreStatistic],
        };
      }
      return {
        ...state,
      };
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
    case TRY_SET_LONGEST_TODAY_SERIES:
      if (payload > state.longestTodaySeries) {
        return {
          ...state,
          longestTodaySeries: payload,
        };
      }
      return {
        ...state,
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
