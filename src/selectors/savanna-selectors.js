import { createSelector } from 'reselect';

const getRandomWords = ({ gameModeData }) => {
  return gameModeData.randomWords;
};

const getWords = ({ gameModeData }) => {
  return gameModeData.words;
};

const wordCounter = 20;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const savannaWordsQueue = createSelector(getRandomWords, getWords, (randowWords, newWords) => {
  const slicedNewWords = newWords.slice(0, wordCounter);
  return slicedNewWords.map((newWord) => {
    const word = {
      originalWordObject: newWord,
      word: newWord.optional.word,
      wordTranslate: [
        newWord.optional.wordTranslate,
        randowWords[getRandomInt(0, 300)].wordTranslate,
        randowWords[getRandomInt(0, 300)].wordTranslate,
        randowWords[getRandomInt(0, 300)].wordTranslate,
      ],
      id: newWord.optional.wordId,
      isCorrectTranslation: newWord.optional.wordTranslate,
    };
    return word;
  });
});

export default savannaWordsQueue;
