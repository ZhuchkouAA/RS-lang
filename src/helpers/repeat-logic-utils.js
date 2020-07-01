import { DIFFICULTY_NORMAL_VALUE } from '../constants/variables-learning';

export const getNewWordDifficulty = (startDifficulty, userChoice, cntErrors) => {
  if (userChoice !== 0) {
    return +startDifficulty + userChoice;
  }

  if (cntErrors === 0) {
    return +startDifficulty + DIFFICULTY_NORMAL_VALUE;
  }

  return +startDifficulty;
};

export const newFunc = () => {};
