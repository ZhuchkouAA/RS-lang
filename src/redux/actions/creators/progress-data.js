import {
  DIFFERENT_CARDS_COUNTER_PLUS_ONE,
  REWRITE_DATE_OF_RECEIPT_OF_WORDS,
  REDUCE_LEFT_NEW_WORDS_TODAY,
  REDUCE_LEFT_REPEAT_WORDS_TODAY,
  RESET_PROGRESS,
  QUEUE_NEW_WORDS,
  QUEUE_REPEAT_WORDS,
  REWRITE_PROGRESS,
} from '../types/action-types';

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
