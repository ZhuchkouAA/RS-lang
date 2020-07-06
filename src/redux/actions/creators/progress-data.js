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
} from '../types/action-types';

export const setLeftNewWordsToday = (value) => ({
  type: SET_LEFT_NEW_WORDS_TODAY,
  payload: value,
});
export const setLeftRepeatWordsToday = (value) => ({
  type: SET_LEFT_REPEAT_WORDS_TODAY,
  payload: value,
});
export const cardsShowedAllTimeIncrease = () => ({
  type: CARDS_SHOW_ALL_TIME_INCREASE,
});

export const rightAnswersAllTimeIncrease = () => ({
  type: RIGHT_ANSWERS_ALLTIME_INCREASE,
});

export const longestTodaySeriesIncrease = () => ({
  type: LONGEST_TODAY_SERIES_INCREASE,
});

export const longestTodaySeriesReset = () => ({
  type: LONGEST_TODAY_SERIES_RESET,
});

export const learnedWordsStatisticIncrease = () => ({
  type: LEANED_WORDS_STATISTIC_INCREASE,
});

export const cardsShowedStatisticIncrease = () => ({
  type: CARDS_SHOWED_STATISTIC_INCREASE,
});

export const newCardsShowedStatisticIncrease = () => ({
  type: NEW_CARDS_SHOWED_STATISTIC_INCREASE,
});

export const rightAnswersStatisticIcrease = () => ({
  type: RIGHT_ANSWERS_STATISTIC_INCREASE,
});

export const differentCardPlusOne = () => ({
  type: DIFFERENT_CARDS_COUNTER_PLUS_ONE,
});

export const rewiteDateOfReceiptOfWords = () => ({
  type: REWRITE_DATE_OF_RECEIPT_OF_WORDS,
});

export const reduceLeftNewWordsToday = () => ({
  type: REDUCE_LEFT_NEW_WORDS_TODAY,
});

export const reduceLeftRepeatWordsToday = () => ({
  type: REDUCE_LEFT_REPEAT_WORDS_TODAY,
});

export const resetProgress = () => ({
  type: RESET_PROGRESS,
});

export const queueNewWords = (newWordsArray) => ({
  type: QUEUE_NEW_WORDS,
  payload: newWordsArray,
});
export const queueRepeatWords = (repeatWordsArray) => ({
  type: QUEUE_REPEAT_WORDS,
  payload: repeatWordsArray,
});

export const rewriteProgress = (newProgress) => ({
  type: REWRITE_PROGRESS,
  payload: newProgress,
});
