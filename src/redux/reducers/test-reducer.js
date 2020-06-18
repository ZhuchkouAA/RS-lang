const initialState = {
  test: 'state',
  cardsPerDay: '10',
  newWordsPerDay: '10',
  answerBtn: true,
  delFromLearnBtn: true,
  feedBackButtons: true,
  image: true,
  audio: true,
  audioMeaning: true,
  audioExample: true,
  textMeaning: true,
  textExample: true,
  transcription: true,
  wordTranslate: true,
  textExampleTranslate: true,
};

const testReducer = (state = initialState) => state;

export default testReducer;
