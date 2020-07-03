import { createSelector } from 'reselect';
import random300Mock from '../mock';

// const getRandomWords = ({ progress }) => {
//   return progress.queueRandom300;
// };

const getRandomWords = () => {
  return random300Mock;
};

const getWords = ({ gameModeData }) => {
  return gameModeData.words;
};

const sprintWordsQueue = createSelector(getRandomWords, getWords, (randowWords, newWords) => {
  const slicedNewWords = newWords.slice(0, 300);
  return slicedNewWords.map((newWord, index) => {
    const word = {
      word: newWord.optional.word,
      wordTranslate: newWord.optional.wordTranslate,
      id: newWord.optional.wordId,
      isCorrectTranslation: true,
    };
    if (Math.random() > 0.5) {
      return word;
    }
    return {
      ...word,
      wordTranslate: randowWords[index].wordTranslate,
      isCorrectTranslation: false,
    };
  });
});

export default sprintWordsQueue;
