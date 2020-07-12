export const DIFFICULTY_REPEAT_VALUE = 100;
export const DIFFICULTY_HARD_VALUE = 25;
export const DIFFICULTY_NORMAL_VALUE = -25;
export const DIFFICULTY_EASY_VALUE = -50;
export const DIFFICULTY_GAME_PENALTY = 10;
export const DIFFICULTY_GAME_REWARD = -10;

export const VOTE_BUTTON = [
  {
    title: 'Еще раз',
    rate: DIFFICULTY_REPEAT_VALUE,
  },
  {
    title: 'Сложно',
    rate: DIFFICULTY_HARD_VALUE,
  },
  {
    title: 'Нормально',
    rate: DIFFICULTY_NORMAL_VALUE,
  },
  {
    title: 'Легко',
    rate: DIFFICULTY_EASY_VALUE,
  },
];

export const LEARN_RATINGS = { bad: 20, normal: 50, good: 70, excellent: 90 };

export const DEFAULT_WORD = {
  optional: {
    word: 'acre',
    wordTranslate: 'акр',
    transcription: '[éikər]',
    textMeaning: 'An <i>acre</i> is a unit for measuring area.',
    textMeaningTranslate: 'Акр - это единица измерения площади',
    textExample: 'They lived on a 150-<b>acre</b> farm.',
    textExampleTranslate: 'Они жили на 150-акровой ферме',
    image: 'files/01_1201.jpg',
    audio: 'files/01_1201.mp3',
    audioMeaning: 'files/01_1201_meaning.mp3',
    audioExample: 'files/01_1201_example.mp3',
  },
};
