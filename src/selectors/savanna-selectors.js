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
    const a = getRandomInt(0, 250);
    const b = getRandomInt(1, 10);
    const word = {
      originalWordObject: newWord,
      word: newWord.optional.word,
      translation: [
        newWord.optional.wordTranslate,
        randowWords[a].wordTranslate,
        randowWords[a + b].wordTranslate,
        randowWords[a + b * 2].wordTranslate,
      ],
      id: newWord.wordId,
      isCorrectTranslation: newWord.optional.wordTranslate,
    };
    return word;
  });
});

export default savannaWordsQueue;
