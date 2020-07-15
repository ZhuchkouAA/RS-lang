import { createSelector } from 'reselect';

const getRandomWords = ({ gameModeData }) => {
  return gameModeData.randomWords;
};

const getWords = ({ gameModeData }) => {
  return gameModeData.words;
};

const speakIt = createSelector(getRandomWords, getWords, (randowWords, newWords) => {
  const slicedNewWords = newWords.slice(0, 10);

  const wordsForGame = slicedNewWords.map((newWord) => {
    const path = 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/';

    return {
      wordDefault: newWord,
      word: newWord.optional.word,
      wordTranslate: newWord.optional.wordTranslate,
      id: newWord.wordId,
      audio: path + newWord.optional.audio,
      image: path + newWord.optional.image,
      transcription: newWord.optional.transcription,
      isGuested: false,
      isShow: false,
    };
  });

  return {
    wordsForGame,
  };
});

export default speakIt;
