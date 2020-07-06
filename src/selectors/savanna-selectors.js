import { createSelector } from 'reselect';

const getRandomWords = ({ gameModeData }) => {
  return gameModeData.randomWords;
};

const getWords = ({ gameModeData }) => {
  return gameModeData.words;
};
<<<<<<< HEAD
const wordCounter = 20;
const savannaWordsQueue = createSelector(getRandomWords, getWords, (randowWords, newWords) => {
  const slicedNewWords = newWords.slice(0, wordCounter);
  return slicedNewWords.map((newWord, index) => {
    const word = {
      originalWordObject: newWord,
      word: newWord.optional.word,
      wordTranslate: [
        newWord.optional.wordTranslate,
        randowWords[index + wordCounter].wordTranslate,
        randowWords[index + wordCounter * 2].wordTranslate,
        randowWords[index + wordCounter * 3].wordTranslate,
      ],
      id: newWord.optional.wordId,
      isCorrectTranslation: newWord.optional.wordTranslate,
    };
    return word;
=======

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
>>>>>>> RSL-34: add word queue
  });
});

export default savannaWordsQueue;
