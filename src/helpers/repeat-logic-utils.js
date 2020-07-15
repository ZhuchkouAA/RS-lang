import { DIFFICULTY_NORMAL_VALUE, LEARN_RATINGS } from '../constants/variables-learning';
import colors from '../styles-global/colors.module.scss';

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

export const getRatingColors = (rate) => {
  let passedColor = colors.learningNormalColor;
  let backgroundColor = colors.learningNormalBGColor;

  if (rate < LEARN_RATINGS.bad) {
    passedColor = colors.learningFailColor;
    backgroundColor = colors.learningFailBGColor;
  }

  if (rate >= LEARN_RATINGS.bad && rate < LEARN_RATINGS.normal) {
    passedColor = colors.learningBadColor;
    backgroundColor = colors.learningBadBGColor;
  }

  if (rate >= LEARN_RATINGS.good && rate < LEARN_RATINGS.excellent) {
    passedColor = colors.learningGoodColor;
    backgroundColor = colors.learningGoodBGColor;
  }

  if (rate >= LEARN_RATINGS.excellent) {
    passedColor = colors.learningExcellentColor;
    backgroundColor = colors.learningExcellentBGColor;
  }

  return { passedColor, backgroundColor };
};

export const getHintForCountDaysBeforeNextWordRepeat = (lastRepeatDate) => {
  if (!lastRepeatDate) {
    return '';
  }

  const countHours = Math.round((lastRepeatDate - Date.now()) / (60 * 60 * 1000));

  if (countHours < 24) {
    return `Осталось часов до повторения: ${countHours}`;
  }

  const countDays = Math.round(countHours / 24);

  return `Осталось дней до посторения: ${countDays}`;
};
