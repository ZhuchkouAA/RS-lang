import { DIFFICULTY_NORMAL_VALUE } from '../constants/common';

export const getNewWordDifficulty = (startDifficulty, userChoice, cntErrors) => {
  if (userChoice !== undefined) {
    return startDifficulty + userChoice;
  }

  if (cntErrors === 0) {
    return startDifficulty + DIFFICULTY_NORMAL_VALUE;
  }

  return startDifficulty;
};

export const newFunc = () => {};
