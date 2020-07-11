import { createSelector } from 'reselect';

const getRandomWords = ({ gameModeData }) => {
  return gameModeData.randomWords;
};

const getWords = ({ gameModeData }) => {
  return gameModeData.words;
};

const audioCallWordsQueue = createSelector(getRandomWords, getWords, (randowWords, newWords) => {
  const slicedNewWords = newWords.slice(0, 30);

  const wordsForGame = slicedNewWords.map((newWord) => {
    return {
      wordDefault: newWord,
      word: newWord.optional.word,
      wordTranslate: newWord.optional.wordTranslate,
      id: newWord.wordId,
      audio: newWord.optional.audio,
      image: newWord.optional.image,
      transcription: newWord.optional.transcription,
    };
  });

  const wordsForRandom = newWords.slice(0, 300).map((newWord) => {
    return {
      wordDefault: newWord,
      word: newWord.optional.word,
      wordTranslate: newWord.optional.wordTranslate,
      id: newWord.wordId,
      audio: newWord.optional.audio,
      image: newWord.optional.image,
      transcription: newWord.optional.transcription,
    };
  });

  return {
    wordsForGame,
    wordsForRandom,
  };
});

export default audioCallWordsQueue;
