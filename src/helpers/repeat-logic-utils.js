import { DIFFICULTY_NORMAL_VALUE, LEARN_RATINGS } from '../constants/variables-learning';

export const getNewWordDifficulty = (startDifficulty, userChoice, cntErrors) => {
  if (userChoice !== 0) {
    return +startDifficulty + userChoice;
  }

  if (cntErrors === 0) {
    return +startDifficulty + DIFFICULTY_NORMAL_VALUE;
  }

  return +startDifficulty;
};

export const getRatingColorStyleName = (rate) => {
  if (rate < LEARN_RATINGS.bad) {
    return 'rating-color--fail';
  }

  if (rate >= LEARN_RATINGS.bad && rate < LEARN_RATINGS.normal) {
    return 'rating-color--bad';
  }

  if (rate >= LEARN_RATINGS.good && rate < LEARN_RATINGS.excellent) {
    return 'rating-color--good';
  }

  if (rate >= LEARN_RATINGS.excellent) {
    return 'rating-color--excellent';
  }

  return 'rating-color--normal';
};
