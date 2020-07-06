import { createSelector } from 'reselect';

const getRandomWords = ({ gameModeData }) => {
  return gameModeData.randomWords;
};

const getWords = ({ gameModeData }) => {
  return gameModeData.words;
};

const savannaWordsQueue = createSelector(getRandomWords, getWords, (randowWords, newWords) => {
  const slicedNewWords = newWords.slice(0, 20);
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

export default savannaWordsQueue;
