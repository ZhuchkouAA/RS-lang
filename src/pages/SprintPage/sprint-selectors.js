import { createSelector } from 'reselect';

const getRandomWords = () => {
  return [
    { id: 'dasdasddas', word: 'channel', wordTranslate: 'канал' },
    { id: 'dasdasddas', word: 'button', wordTranslate: 'кнопка' },
    { id: 'dasd2223', word: 'cat', wordTranslate: 'кот' },
    { id: 'dasdadas223sddas', word: 'dog', wordTranslate: 'собака' },
    { id: 'dasd22323daasddas', word: 'cube', wordTranslate: 'куб' },
    { id: 'dasdasdasd22asddas', word: 'javascript', wordTranslate: 'джаваскрыпт' },
    { id: 'dasd232dsasddas', word: 'doctor', wordTranslate: 'доктор' },
    { id: 'dasddsa223asddas', word: 'letter', wordTranslate: 'буква' },
    { id: 'dasdadsds333sddas', word: 'water', wordTranslate: 'вода' },
  ];
};

const getNewWords = () => {
  return [
    { id: 'dasd2221778asddas', word: 'bike', wordTranslate: 'велосипед' },
    { id: 'dasda87966sddas', word: 'car', wordTranslate: 'машина' },
    { id: 'dasd2754223', word: 'taxi', wordTranslate: 'такси' },
    { id: 'dasdad5579as223sddas', word: 'fish', wordTranslate: 'рыба' },
    { id: 'dasd22323daas00-ddas', word: 'tomat', wordTranslate: 'томат' },
    { id: 'dasdasd--asd22asddas', word: 'terminal', wordTranslate: 'терминал' },
    { id: 'das886d232dsasddas', word: 'печенье', wordTranslate: 'cookie' },
    { id: 'dasd878dsa223asddas', word: 'banana', wordTranslate: 'банан' },
    { id: 'dasdadsd090s333sddas', word: 'color', wordTranslate: 'цвет' },
  ];
};

const sprintWordsQueue = createSelector(getRandomWords, getNewWords, (randowWords, newWords) => {
  return newWords.map((newWord, index) => {
    const word = {
      word: newWord.word,
      wordTranslate: newWord.wordTranslate,
      id: newWord.wordId,
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
